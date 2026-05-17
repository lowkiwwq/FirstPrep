"""Семантический кэш ответов RAG-системы.

Принцип работы:
  1. Вычислить эмбеддинг нового вопроса.
  2. Сравнить с эмбеддингами кэшированных вопросов (cosine similarity).
  3. Если max_similarity >= THRESHOLD → cache hit: вернуть готовый ответ за ~50ms.
  4. Иначе → cache miss: выполнить полный пайплайн, сохранить в кэш.

Хранение: semantic_cache.pkl (pickle).
Ёмкость:  500 записей, при переполнении удаляется самая старая (FIFO).
Thread-safety: threading.Lock защищает все операции.
"""

import pickle
import sys
import threading
import time
from collections import OrderedDict
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import SEMANTIC_CACHE_MAX, SEMANTIC_CACHE_PATH, SEMANTIC_CACHE_THRESHOLD


def _cosine(a: list[float], b: list[float]) -> float:
    """Cosine similarity для уже нормализованных векторов = inner product."""
    return sum(x * y for x, y in zip(a, b))


class SemanticCache:
    """Thread-safe семантический кэш с персистентностью на диск."""

    def __init__(
        self,
        path: Path = SEMANTIC_CACHE_PATH,
        threshold: float = SEMANTIC_CACHE_THRESHOLD,
        max_size: int = SEMANTIC_CACHE_MAX,
    ) -> None:
        self._path = path
        self._threshold = threshold
        self._max_size = max_size
        self._lock = threading.Lock()
        # OrderedDict: key = question str, value = {embedding, result, ts}
        self._cache: OrderedDict[str, dict[str, Any]] = OrderedDict()
        self._load()

    # ── persistence ──────────────────────────────────────────────────────────

    def _load(self) -> None:
        if self._path.exists():
            try:
                with open(self._path, "rb") as f:
                    self._cache = pickle.load(f)
                # Убеждаемся что тип правильный после загрузки
                if not isinstance(self._cache, OrderedDict):
                    self._cache = OrderedDict(self._cache)
            except Exception:
                self._cache = OrderedDict()

    def _save(self) -> None:
        try:
            with open(self._path, "wb") as f:
                pickle.dump(self._cache, f)
        except Exception:
            pass

    # ── public API ────────────────────────────────────────────────────────────

    def get(self, question: str, embedding: list[float]) -> dict[str, Any] | None:
        """Ищет кэшированный ответ. Возвращает result-dict или None при cache miss."""
        with self._lock:
            if not self._cache:
                return None

            best_sim = -1.0
            best_key: str | None = None
            for key, entry in self._cache.items():
                sim = _cosine(embedding, entry["embedding"])
                if sim > best_sim:
                    best_sim = sim
                    best_key = key

            if best_sim >= self._threshold and best_key is not None:
                # Переносим в конец (LRU — самый старый = начало)
                self._cache.move_to_end(best_key)
                entry = self._cache[best_key]
                cached_result = dict(entry["result"])
                # Кэшированный ответ не стримился сейчас — показываем как текст
                cached_result["from_cache"] = True
                cached_result["cache_similarity"] = round(best_sim, 4)
                cached_result["streamed"] = False
                return cached_result

            return None

    def put(self, question: str, embedding: list[float], result: dict[str, Any]) -> None:
        """Сохраняет ответ в кэш."""
        with self._lock:
            # Не кэшируем отказы и ошибки
            if not result.get("has_answer"):
                return

            # Удаляем самую старую запись при переполнении
            while len(self._cache) >= self._max_size:
                self._cache.popitem(last=False)

            self._cache[question] = {
                "embedding": embedding,
                "result": {k: v for k, v in result.items()
                           if k not in ("streamed",)},
                "ts": time.time(),
            }
            self._cache.move_to_end(question)
            self._save()

    @property
    def size(self) -> int:
        with self._lock:
            return len(self._cache)

    def clear(self) -> None:
        with self._lock:
            self._cache.clear()
            self._save()


# Глобальный синглтон — инициализируется один раз при импорте
_cache: SemanticCache | None = None


def get_cache() -> SemanticCache:
    global _cache
    if _cache is None:
        _cache = SemanticCache()
    return _cache
