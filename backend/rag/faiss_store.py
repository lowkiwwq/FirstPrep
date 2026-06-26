"""FAISS-based vector store — замена ChromaDB для векторного поиска.

Использует IndexFlatIP (inner product). text-embedding-3-small возвращает
уже нормализованные векторы, поэтому inner product == cosine similarity.

Хранение:
  data/faiss_db/index.faiss   — FAISS-индекс
  data/faiss_db/metadata.pkl  — параллельный список: id, content, metadata

Интерфейс намеренно совместим с ChromaDB-обёрткой в retriever.py,
чтобы переключение было минимальным.
"""

import pickle
import sys
from pathlib import Path
from typing import Any

import faiss
import numpy as np

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import EMBEDDING_MODEL, FAISS_DIR

_FAISS_INDEX_PATH = FAISS_DIR / "index.faiss"
_FAISS_META_PATH  = FAISS_DIR / "metadata.pkl"


def _dim_for_model(model: str) -> int:
    """Размерность эмбеддинга по имени модели."""
    return {
        "text-embedding-3-small": 1536,
        "text-embedding-3-large": 3072,
        "text-embedding-ada-002": 1536,
    }.get(model, 1536)


class FAISSStore:
    """Обёртка над FAISS-индексом с хранением метаданных и полных текстов."""

    def __init__(self, dim: int | None = None) -> None:
        self._dim = dim or _dim_for_model(EMBEDDING_MODEL)
        self._index: faiss.Index = faiss.IndexFlatIP(self._dim)
        # Параллельные списки (позиция = внутренний FAISS id)
        self._ids:      list[str]       = []
        self._docs:     list[str]       = []
        self._metas:    list[dict]      = []

    # ── build / add ──────────────────────────────────────────────────────────

    def add(
        self,
        ids:        list[str],
        embeddings: list[list[float]],
        documents:  list[str],
        metadatas:  list[dict],
    ) -> None:
        """Добавляет векторы в индекс. Дубли по id пропускаются."""
        existing = set(self._ids)
        new_idx = [i for i, uid in enumerate(ids) if uid not in existing]
        if not new_idx:
            return

        vecs = np.array([embeddings[i] for i in new_idx], dtype="float32")
        # Нормализуем на случай если эмбеддинги не единичные
        norms = np.linalg.norm(vecs, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        vecs /= norms

        self._index.add(vecs)
        for i in new_idx:
            self._ids.append(ids[i])
            self._docs.append(documents[i])
            self._metas.append(metadatas[i])

    # ── search ───────────────────────────────────────────────────────────────

    def search(
        self,
        embedding: list[float],
        top_k: int,
        filter_meta: dict | None = None,
    ) -> list[dict[str, Any]]:
        """Возвращает top_k ближайших чанков. Поле distance = 1 - cosine_sim."""
        if self._index.ntotal == 0:
            return []

        vec = np.array([embedding], dtype="float32")
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec /= norm

        # Запрашиваем с запасом если нужна фильтрация по метаданным
        k = min(top_k * 3 if filter_meta else top_k, self._index.ntotal)
        scores, indices = self._index.search(vec, k)

        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < 0:
                continue
            meta = self._metas[idx]
            if filter_meta and not all(meta.get(k) == v for k, v in filter_meta.items()):
                continue
            results.append({
                "id":       self._ids[idx],
                "content":  self._docs[idx],
                "metadata": meta,
                "score":    float(score),          # cosine similarity
                "distance": float(1.0 - score),    # cosine distance
                "method":   "vector",
            })
            if len(results) >= top_k:
                break

        return results

    def get_all(self) -> tuple[list[str], list[str], list[dict]]:
        """Возвращает (ids, documents, metadatas) — для построения BM25."""
        return self._ids, self._docs, self._metas

    @property
    def count(self) -> int:
        return self._index.ntotal

    # ── persistence ──────────────────────────────────────────────────────────

    def save(self, index_path: Path = _FAISS_INDEX_PATH,
             meta_path: Path = _FAISS_META_PATH) -> None:
        faiss.write_index(self._index, str(index_path))
        with open(meta_path, "wb") as f:
            pickle.dump({
                "ids":   self._ids,
                "docs":  self._docs,
                "metas": self._metas,
                "dim":   self._dim,
            }, f)

    @classmethod
    def load(cls, index_path: Path = _FAISS_INDEX_PATH,
             meta_path: Path = _FAISS_META_PATH) -> "FAISSStore":
        store = cls.__new__(cls)
        with open(meta_path, "rb") as f:
            meta = pickle.load(f)
        store._dim   = meta["dim"]
        store._ids   = meta["ids"]
        store._docs  = meta["docs"]
        store._metas = meta["metas"]
        store._index = faiss.read_index(str(index_path))
        return store

    @classmethod
    def exists(cls) -> bool:
        return _FAISS_INDEX_PATH.exists() and _FAISS_META_PATH.exists()
