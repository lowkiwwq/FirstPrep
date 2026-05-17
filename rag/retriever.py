"""Гибридный поиск: векторный (FAISS / ChromaDB fallback) + BM25.

Приоритет:
  1. FAISS-индекс (data/faiss_db/) — быстрее, C++-код под капотом.
  2. ChromaDB (data/chroma_db/)   — fallback если FAISS не смигрирован.

Для перехода на FAISS запусти: python scripts/migrate_to_faiss.py
"""

import json
import sys
from pathlib import Path
from typing import Any

import chromadb
from openai import OpenAI
from rank_bm25 import BM25Okapi

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import (
    CHROMA_COLLECTION, CHROMA_PERSIST_DIR, CHUNKS_DIR,
    EMBEDDING_MODEL, OPENAI_API_KEY,
    RETRIEVAL_BM25_TOP_K, RETRIEVAL_VECTOR_TOP_K,
    VECTOR_FALLBACK_DISTANCE, VECTOR_FALLBACK_TOP_K,
)
from rag.faiss_store import FAISSStore

client = OpenAI(api_key=OPENAI_API_KEY)

# Disk-persistent embedding cache
import hashlib as _hashlib
import pickle as _pickle

_CACHE_PATH = Path(__file__).parent.parent / "data" / "embedding_cache.pkl"
_embedding_cache: dict[str, list[float]] = {}


def _load_embedding_cache() -> None:
    global _embedding_cache
    if _CACHE_PATH.exists():
        try:
            with open(_CACHE_PATH, "rb") as f:
                _embedding_cache = _pickle.load(f)
        except Exception:
            _embedding_cache = {}


def _save_embedding_cache() -> None:
    try:
        with open(_CACHE_PATH, "wb") as f:
            _pickle.dump(_embedding_cache, f)
    except Exception:
        pass


_load_embedding_cache()


# ── Backend selection ─────────────────────────────────────────────────────

_faiss_store: FAISSStore | None = None


def _get_faiss() -> FAISSStore | None:
    """Возвращает загруженный FAISSStore или None если не смигрирован."""
    global _faiss_store
    if _faiss_store is None and FAISSStore.exists():
        _faiss_store = FAISSStore.load()
    return _faiss_store


def _get_collection() -> chromadb.Collection:
    chroma = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)
    return chroma.get_or_create_collection(name=CHROMA_COLLECTION)


def _embed_query(query: str) -> list[float]:
    key = _hashlib.md5(query.encode()).hexdigest()
    if key not in _embedding_cache:
        response = client.embeddings.create(model=EMBEDDING_MODEL, input=[query])
        _embedding_cache[key] = response.data[0].embedding
        _save_embedding_cache()   # persist immediately
    return _embedding_cache[key]


class BM25Index:
    """Лёгкий BM25 поверх всех чанков в ChromaDB."""

    def __init__(self) -> None:
        self._docs: list[dict] = []
        self._bm25: BM25Okapi | None = None

    def build(self, collection: chromadb.Collection) -> None:
        result = collection.get(include=["documents", "metadatas"])
        self._ids = result["ids"]
        self._docs = result["documents"] or []
        self._metas = result["metadatas"] or []
        tokenized = [doc.lower().split() for doc in self._docs]
        self._bm25 = BM25Okapi(tokenized)

    def search(self, query: str, top_k: int) -> list[dict[str, Any]]:
        if not self._bm25 or not self._docs:
            return []
        tokens = query.lower().split()
        scores = self._bm25.get_scores(tokens)
        top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:top_k]
        results = []
        for idx in top_indices:
            if scores[idx] > 0:
                results.append({
                    "id": self._ids[idx],
                    "content": self._docs[idx],
                    "metadata": self._metas[idx],
                    "score": float(scores[idx]),
                    "method": "bm25",
                })
        return results


_bm25_index: BM25Index | None = None


def _get_bm25_index(collection: chromadb.Collection | None = None) -> BM25Index:
    global _bm25_index
    if _bm25_index is None:
        _bm25_index = BM25Index()
        faiss_store = _get_faiss()
        if faiss_store is not None:
            # Строим BM25 из FAISS-хранилища (нет лишнего network round-trip)
            ids, docs, metas = faiss_store.get_all()
            _bm25_index._ids   = ids
            _bm25_index._docs  = docs
            _bm25_index._metas = metas
            tokenized = [doc.lower().split() for doc in docs]
            from rank_bm25 import BM25Okapi
            _bm25_index._bm25 = BM25Okapi(tokenized)
        else:
            col = collection or _get_collection()
            _bm25_index.build(col)
    return _bm25_index


def vector_search(query: str, top_k: int = RETRIEVAL_VECTOR_TOP_K,
                  filter_meta: dict | None = None) -> list[dict[str, Any]]:
    embedding = _embed_query(query)

    # Приоритет: FAISS
    faiss_store = _get_faiss()
    if faiss_store is not None:
        return faiss_store.search(embedding, top_k, filter_meta)

    # Fallback: ChromaDB
    collection = _get_collection()
    kwargs: dict[str, Any] = {"query_embeddings": [embedding], "n_results": top_k,
                               "include": ["documents", "metadatas", "distances"]}
    if filter_meta:
        kwargs["where"] = filter_meta
    result = collection.query(**kwargs)
    hits = []
    for i, doc_id in enumerate(result["ids"][0]):
        hits.append({
            "id": doc_id,
            "content": result["documents"][0][i],
            "metadata": result["metadatas"][0][i],
            "score": 1 - result["distances"][0][i],
            "distance": result["distances"][0][i],
            "method": "vector",
        })
    return hits


def vector_fallback(query: str) -> list[dict[str, Any]]:
    """Fallback: возвращает топ чанки с cosine distance < VECTOR_FALLBACK_DISTANCE.

    Используется когда reranker не пропустил ни одного чанка, но векторный
    поиск нашёл семантически близкие документы (similarity > 0.75).
    """
    hits = vector_search(query, top_k=VECTOR_FALLBACK_TOP_K * 3)
    close = [h for h in hits if h.get("distance", 1.0) < VECTOR_FALLBACK_DISTANCE]
    for h in close:
        h["confidence"] = "low"
        h["method"] = "vector_fallback"
    return close[:VECTOR_FALLBACK_TOP_K]


def bm25_search(query: str, top_k: int = RETRIEVAL_BM25_TOP_K) -> list[dict[str, Any]]:
    index = _get_bm25_index()
    return index.search(query, top_k)


def hybrid_search(query: str, top_k_each: int = RETRIEVAL_VECTOR_TOP_K,
                  filter_meta: dict | None = None) -> list[dict[str, Any]]:
    """Объединяем vector + BM25 параллельно, убираем дубли, сортируем по vector score."""
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=2) as ex:
        vec_future  = ex.submit(vector_search, query, top_k_each, filter_meta)
        bm25_future = ex.submit(bm25_search,   query, top_k_each)
        vec_results  = vec_future.result()
        bm25_results = bm25_future.result()

    seen_ids: set[str] = set()
    merged = []
    for r in vec_results:
        if r["id"] not in seen_ids:
            seen_ids.add(r["id"])
            merged.append(r)
    for r in bm25_results:
        if r["id"] not in seen_ids:
            seen_ids.add(r["id"])
            merged.append(r)

    merged.sort(key=lambda x: x["score"], reverse=True)
    return merged


def invalidate_bm25_cache() -> None:
    global _bm25_index
    _bm25_index = None
