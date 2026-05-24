"""Семантический кэш ответов RAG-системы.

Принцип работы:
  1. Вычислить эмбеддинг нового вопроса.
  2. Сравнить с эмбеддингами кэшированных вопросов (cosine similarity).
  3. Если max_similarity >= THRESHOLD и совпадает версия БД → cache hit.
  4. Иначе → cache miss: выполнить полный пайплайн, сохранить в кэш.

Версионирование (ВАЖНО!):
  Кэш хранит "db_version" — хеш состояния векторной БД (число чанков + ids).
  При изменении БД (загружены новые документы) кэш АВТОМАТИЧЕСКИ инвалидируется
  записи со старой версией БД игнорируются.

Хранение: data/semantic_cache.pkl (pickle, атомарная запись через tmp).
Ёмкость:  500 записей, при переполнении удаляется самая старая (FIFO).
Thread-safety: threading.Lock на всех операциях.
"""

import hashlib
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
    """Cosine similarity для нормализованных векторов = inner product."""
    return sum(x * y for x, y in zip(a, b))


def _compute_db_version() -> str:
    """Хеш текущего состояния БД. Используется для инвалидации кэша при изменении БД.

    Берём от FAISS-стора если доступен, иначе от ChromaDB."""
    try:
        from rag.retriever import _get_faiss
        store = _get_faiss()
        if store is not None:
            ids = store.get_all()[0]
            sig = f"faiss|{len(ids)}|" + ",".join(sorted(ids)[:5]) + "..." + ",".join(sorted(ids)[-5:])
            return hashlib.md5(sig.encode()).hexdigest()[:16]
    except Exception:
        pass

    try:
        from rag.retriever import _get_collection
        col = _get_collection()
        count = col.count()
        return hashlib.md5(f"chroma|{count}".encode()).hexdigest()[:16]
    except Exception:
        return "unknown"


class SemanticCache:
    """Thread-safe семантический кэш с инвалидацией по версии БД."""

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
        self._cache: OrderedDict[str, dict[str, Any]] = OrderedDict()
        self._db_version: str | None = None
        self._load()

    def _ensure_db_version(self) -> str:
        if self._db_version is None:
            self._db_version = _compute_db_version()
        return self._db_version

    def refresh_db_version(self) -> None:
        """Вызывать после загрузки новых документов."""
        with self._lock:
            self._db_version = _compute_db_version()

    # ── persistence (атомарная запись через tmp+rename) ─────────────────────

    def _load(self) -> None:
        if self._path.exists():
            try:
                with open(self._path, "rb") as f:
                    data = pickle.load(f)
                if isinstance(data, dict) and "entries" in data:
                    self._cache = data["entries"]
                else:
                    # Migration from old format (raw OrderedDict)
                    if isinstance(data, OrderedDict) or isinstance(data, dict):
                        # Эти записи без db_version → они потенциально протухли
                        # Безопаснее очистить
                        self._cache = OrderedDict()
                if not isinstance(self._cache, OrderedDict):
                    self._cache = OrderedDict(self._cache)
            except Exception:
                self._cache = OrderedDict()

    def _save(self) -> None:
        """Вызывать только под self._lock."""
        try:
            tmp = self._path.with_suffix(".pkl.tmp")
            with open(tmp, "wb") as f:
                pickle.dump({"entries": self._cache, "format": 2}, f)
            tmp.replace(self._path)
        except Exception as e:
            print(f"[CACHE] semantic cache save failed: {e}")

    # ── public API ────────────────────────────────────────────────────────────

    def get(self, question: str, embedding: list[float]) -> dict[str, Any] | None:
        """Cache hit только если db_version совпадает И similarity >= threshold."""
        current_db = self._ensure_db_version()
        with self._lock:
            if not self._cache:
                return None

            best_sim = -1.0
            best_key: str | None = None
            for key, entry in self._cache.items():
                if entry.get("db_version") != current_db:
                    continue  # запись от старой версии БД — игнор
                sim = _cosine(embedding, entry["embedding"])
                if sim > best_sim:
                    best_sim = sim
                    best_key = key

            if best_sim >= self._threshold and best_key is not None:
                self._cache.move_to_end(best_key)
                entry = self._cache[best_key]
                cached_result = dict(entry["result"])
                cached_result["from_cache"] = True
                cached_result["cache_similarity"] = round(best_sim, 4)
                cached_result["streamed"] = False  # текст не стримился, выведем заново
                return cached_result

            return None

    def put(self, question: str, embedding: list[float], result: dict[str, Any]) -> None:
        """Сохраняет успешный ответ. has_answer=False не кэшируется."""
        if not result.get("has_answer"):
            return
        current_db = self._ensure_db_version()
        with self._lock:
            while len(self._cache) >= self._max_size:
                self._cache.popitem(last=False)
            self._cache[question] = {
                "embedding":  embedding,
                "result":     {k: v for k, v in result.items() if k != "streamed"},
                "ts":         time.time(),
                "db_version": current_db,
            }
            self._cache.move_to_end(question)
            self._save()

    @property
    def size(self) -> int:
        with self._lock:
            return len(self._cache)

    def valid_size(self) -> int:
        """Сколько записей актуальны (db_version совпадает с текущей)."""
        current = self._ensure_db_version()
        with self._lock:
            return sum(1 for e in self._cache.values() if e.get("db_version") == current)

    def clear(self) -> None:
        with self._lock:
            self._cache.clear()
            self._save()

    def stats(self) -> dict[str, Any]:
        current = self._ensure_db_version()
        with self._lock:
            return {
                "total":       len(self._cache),
                "valid":       sum(1 for e in self._cache.values() if e.get("db_version") == current),
                "db_version":  current,
                "threshold":   self._threshold,
                "max_size":    self._max_size,
            }


_cache: SemanticCache | None = None


def get_cache() -> SemanticCache:
    global _cache
    if _cache is None:
        _cache = SemanticCache()
    return _cache
