"""Одноразовая инициализация тяжёлых объектов при старте приложения.

Импортируй и вызови `warmup()` один раз в начале — все модели загрузятся
заранее и не будут пересоздаваться при каждом запросе.
"""

import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))


def warmup(verbose: bool = True) -> None:
    """Предзагружает ChromaDB, BM25, CrossEncoder в фоне при старте."""
    t0 = time.perf_counter()
    if verbose:
        print("Инициализация RAG-системы...", end=" ", flush=True)

    # 1. Vector store + BM25 (FAISS если смигрирован, иначе ChromaDB)
    from rag.retriever import _get_faiss, _get_collection, _get_bm25_index
    faiss_store = _get_faiss()
    if faiss_store is None:
        col = _get_collection()
        _get_bm25_index(col)
    else:
        _get_bm25_index()  # читает из FAISS

    # 2. CrossEncoder — загружает веса (~50 МБ)
    from rag.reranker import _get_model
    _get_model()

    # 3. Принудительный eager-импорт всех openai-подмодулей.
    # Python's import lock — per-module: если два потока одновременно впервые
    # импортируют разные части openai (chat + embeddings), возникает deadlock.
    # Импортируем всё из главного потока до запуска любых ThreadPoolExecutor.
    import openai                          # noqa: F401
    import openai.resources                # noqa: F401
    import openai.resources.chat           # noqa: F401
    import openai.resources.chat.completions  # noqa: F401
    import openai.resources.embeddings     # noqa: F401
    from rag.clarifier import classify_and_translate  # noqa: F401  — eager import
    from rag.query_expander import expand_and_paraphrase  # noqa: F401

    # 4. Семантический кэш — загружаем с диска
    from rag.semantic_cache import get_cache
    sc = get_cache()

    elapsed = time.perf_counter() - t0
    if verbose:
        cache_info = f", semantic cache: {sc.size} entries" if sc.size else ""
        print(f"готово за {elapsed:.1f}с{cache_info}")
