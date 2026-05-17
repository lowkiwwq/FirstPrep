"""Rate limiter для публичного сайта.

Два уровня защиты:
  1. Глобальный семафор  — максимум MAX_CONCURRENT одновременных запросов.
  2. Per-client лимит   — максимум MAX_PER_MINUTE запросов в минуту с одного IP.

Использование (CLI):
    from rag.rate_limiter import RateLimiter
    limiter = RateLimiter()
    ok, msg, wait = limiter.check("127.0.0.1")
    if not ok:
        print(msg)
    else:
        with limiter.concurrent_slot():
            result = ask(question)

Использование (web, напр. FastAPI):
    @app.post("/ask")
    async def endpoint(req: Request, body: AskBody):
        ip = req.client.host
        ok, msg, wait = limiter.check(ip)
        if not ok:
            raise HTTPException(429, detail={"error": msg, "retry_after": wait})
        with limiter.concurrent_slot():
            return ask(body.question)
"""

import threading
import time
from collections import defaultdict, deque
from contextlib import contextmanager

MAX_CONCURRENT  = 3    # максимум одновременных запросов глобально
MAX_PER_MINUTE  = 10   # максимум запросов в минуту с одного IP
_WINDOW_SECONDS = 60   # окно для подсчёта запросов


class RateLimiter:
    def __init__(
        self,
        max_concurrent: int = MAX_CONCURRENT,
        max_per_minute: int = MAX_PER_MINUTE,
    ) -> None:
        self._semaphore = threading.Semaphore(max_concurrent)
        self._max_concurrent = max_concurrent
        self._max_per_minute = max_per_minute
        self._lock = threading.Lock()
        # {client_id: deque of timestamps}
        self._history: dict[str, deque] = defaultdict(deque)
        self._active = 0   # счётчик активных запросов

    def check(self, client_id: str = "local") -> tuple[bool, str, float]:
        """Проверяет лимиты. Возвращает (allowed, message, wait_seconds)."""
        now = time.monotonic()
        with self._lock:
            # --- per-client sliding window ---
            q = self._history[client_id]
            # Удаляем старые записи
            while q and now - q[0] > _WINDOW_SECONDS:
                q.popleft()

            if len(q) >= self._max_per_minute:
                oldest = q[0]
                wait = _WINDOW_SECONDS - (now - oldest)
                return (
                    False,
                    f"Превышен лимит: {self._max_per_minute} запросов в минуту. "
                    f"Подождите {wait:.0f} секунд.",
                    round(wait, 1),
                )

            # --- global concurrent ---
            if self._active >= self._max_concurrent:
                return (
                    False,
                    f"Система занята ({self._active}/{self._max_concurrent} одновременных запросов). "
                    "Попробуйте через несколько секунд.",
                    3.0,
                )

            # Всё ОК — регистрируем
            q.append(now)
            self._active += 1
            return True, "", 0.0

    def release(self, client_id: str = "local") -> None:
        """Освобождает слот одновременного запроса."""
        with self._lock:
            self._active = max(0, self._active - 1)

    @contextmanager
    def concurrent_slot(self, client_id: str = "local"):
        """Context manager: автоматически освобождает слот по выходу."""
        try:
            yield
        finally:
            self.release(client_id)

    def stats(self) -> dict:
        with self._lock:
            return {
                "active": self._active,
                "max_concurrent": self._max_concurrent,
                "max_per_minute": self._max_per_minute,
                "clients_tracked": len(self._history),
            }


# Глобальный синглтон
_limiter: RateLimiter | None = None


def get_limiter() -> RateLimiter:
    global _limiter
    if _limiter is None:
        _limiter = RateLimiter()
    return _limiter
