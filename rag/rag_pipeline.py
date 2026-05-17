"""Полный RAG-пайплайн: классификация → поиск → reranking → ответ.

Улучшения:
  1. Двухуровневый порог reranker (high / low confidence)
  2. Fallback на векторный поиск при cosine similarity > 0.75
  3. Paraphrasing запроса — поиск по 3 переформулировкам + оригинал
  4. Максимальный параллелизм: classify+translate / expand+paraphrase / main_search
     — все три стартуют одновременно, критический путь = max(LLM1, LLM2, search)
  5. Early exit: пропускаем поиск по парафразам если основной уже нашёл сильные совпадения
  6. Disk-persistent embedding cache
"""

import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import RERANK_THRESHOLD_HIGH, RERANK_THRESHOLD_LOW, RETRIEVAL_FINAL_TOP_K, RETRIEVAL_VECTOR_TOP_K
from rag.clarifier import classify, classify_and_translate
from rag.generator import generate_answer
from rag.query_expander import expand_and_paraphrase
from rag.reranker import rerank_or_truncate
from rag.retriever import hybrid_search, vector_fallback, _embed_query
from rag.semantic_cache import get_cache


def _merge_unique(lists: list[list[dict]]) -> list[dict]:
    """Объединяет несколько списков чанков, убирая дубли по id."""
    seen: set[str] = set()
    merged = []
    for lst in lists:
        for item in lst:
            if item["id"] not in seen:
                seen.add(item["id"])
                merged.append(item)
    return merged


def ask(question: str,
        top_k_search: int = RETRIEVAL_VECTOR_TOP_K,
        top_k_final: int = RETRIEVAL_FINAL_TOP_K,
        filter_meta: dict | None = None,
        skip_clarifier: bool = False,
        verbose: bool = False) -> dict[str, Any]:

    # ── Семантический кэш — проверяем до любых LLM-вызовов ─────────────────
    sem_cache = get_cache()
    q_embedding = _embed_query(question)   # быстро: in-memory или 1 API-вызов
    cached = sem_cache.get(question, q_embedding)
    if cached is not None:
        sim = cached["cache_similarity"]
        saved = cached.get("_time_saved_ms", "?")
        print(f"[CACHE HIT] similarity={sim:.3f} — ответ из кэша ({sem_cache.size} записей)")
        cached["needs_clarification"] = False
        cached["status"] = cached.get("status", "answered")
        cached["clarifying_questions"] = []
        return cached

    from concurrent.futures import ThreadPoolExecutor, as_completed

    _EARLY_EXIT_SCORE = 0.55   # cosine similarity — порог «сильного» совпадения
    _EARLY_EXIT_COUNT = 3      # достаточно N сильных чанков → пропускаем para_search

    # ── ВОЛНА 1: все три задачи стартуют одновременно ──────────────────────
    # expand_and_paraphrase работает с ОРИГИНАЛЬНЫМ запросом: промпт принудительно
    # выводит АНГЛИЙСКИЙ текст (HyDE + паrafrazы), не зависит от перевода.
    # classify_and_translate определяет статус и возвращает английский перевод.
    # main_search использует оригинал; если перевод отличается — добавим 2-й поиск.

    with ThreadPoolExecutor(max_workers=3) as ex:
        if not skip_clarifier:
            cls_future    = ex.submit(classify_and_translate, question)
        expand_future = ex.submit(expand_and_paraphrase, question)
        search_future = ex.submit(hybrid_search, question, top_k_search, filter_meta)

        # Классификатор нужен первым — если out_of_domain возвращаем сразу
        if not skip_clarifier:
            cls = cls_future.result()
            if verbose:
                print(f"  Classifier: status={cls['status']}, reason={cls['reason']}")

            if cls["status"] == "ambiguous":
                # Отменяем оставшиеся задачи (они всё равно уже запущены, просто игнорируем)
                return {
                    "needs_clarification": True,
                    "status": "ambiguous",
                    "answer": "Запрос слишком общий. Уточните, пожалуйста:",
                    "clarifying_questions": cls["clarifying_questions"],
                    "sources": [],
                    "has_answer": False,
                    "chunks_used": 0,
                    "candidates_count": 0,
                }
            if cls["status"] == "out_of_domain":
                return {
                    "needs_clarification": False,
                    "status": "out_of_domain",
                    "answer": "Этот вопрос не относится к предоставленным материалам (руководство FIRST Tech Challenge DECODE).",
                    "clarifying_questions": [],
                    "sources": [],
                    "has_answer": False,
                    "chunks_used": 0,
                    "candidates_count": 0,
                }
            search_query = cls["translated"]
            if verbose and search_query != question:
                print(f"  Translated: {search_query}")
        else:
            from rag.query_translator import prepare_query
            search_query, _ = prepare_query(question)

        (expanded_query, paraphrases) = expand_future.result()
        orig_results                  = search_future.result()

    if verbose:
        if expanded_query != question:
            print(f"  HyDE expanded (first 120 chars): {expanded_query[:120]}...")
        print(f"  Paraphrases: {paraphrases}")

    # ── Дополнительный поиск по ПЕРЕВЕДЁННОМУ запросу (если отличается) ──
    # Нужен для BM25: оригинальный русский запрос не матчит английский корпус лексически.
    if search_query != question:
        translated_results = hybrid_search(search_query, top_k_each=top_k_search,
                                           filter_meta=filter_meta)
        main_results = _merge_unique([orig_results, translated_results])
    else:
        main_results = orig_results

    # ── ВОЛНА 2 (опционально): поиск по парафразам ────────────────────────
    # Early exit: пропускаем если основной поиск уже дал достаточно сильных совпадений
    strong_hits = sum(1 for c in main_results if c.get("score", 0) >= _EARLY_EXIT_SCORE)
    if strong_hits >= _EARLY_EXIT_COUNT:
        if verbose:
            print(f"  Early exit: {strong_hits} strong hits (score>={_EARLY_EXIT_SCORE}), skipping paraphrase search")
        para_results_list = []
    elif paraphrases:
        with ThreadPoolExecutor(max_workers=len(paraphrases)) as ex:
            futures = [ex.submit(hybrid_search, p, top_k_search // 2, filter_meta)
                       for p in paraphrases]
            para_results_list = [f.result() for f in futures]
    else:
        para_results_list = []

    all_candidates_lists = [main_results] + para_results_list

    candidates = _merge_unique(all_candidates_lists)
    if verbose:
        print(f"  Total unique candidates after paraphrasing: {len(candidates)}")

    # 3. Reranking с двухуровневым порогом
    top_chunks = rerank_or_truncate(expanded_query, candidates, top_k=top_k_final)

    if verbose:
        for i, c in enumerate(top_chunks, 1):
            score = c.get("rerank_score", c.get("score", 0))
            conf = c.get("confidence", "?")
            print(f"  [{i}] score={score:+.3f} conf={conf} | p.{c['metadata'].get('page_start','')}: {c['content'][:80]}...")

    # 4. Fallback: если reranker всё отфильтровал → пробуем чисто векторный
    if not top_chunks:
        fallback = vector_fallback(search_query)
        if fallback:
            top_chunks = fallback
            if verbose:
                print(f"  Fallback: using {len(top_chunks)} chunks from vector search (similarity > 0.75)")

    # 5. Генерация
    # Определяем уверенность по лучшему чанку
    low_confidence = bool(top_chunks) and all(
        c.get("confidence") in ("low", None) and c.get("rerank_score", 0) < RERANK_THRESHOLD_HIGH
        for c in top_chunks
    )

    result = generate_answer(question, top_chunks, low_confidence=low_confidence)
    result["needs_clarification"] = False
    result["status"] = "answered" if result["has_answer"] else "no_results"
    result["clarifying_questions"] = []
    result["candidates_count"] = len(candidates)
    result["chunks_used"] = len(top_chunks)
    result["low_confidence"] = low_confidence

    # Сохраняем в семантический кэш (только успешные ответы)
    sem_cache.put(question, q_embedding, result)

    return result


def format_response(result: dict[str, Any]) -> str:
    if result.get("needs_clarification"):
        lines = [result["answer"]]
        for i, q in enumerate(result.get("clarifying_questions", []), 1):
            lines.append(f"  {i}. {q}")
        return "\n".join(lines)

    # Если ответ уже распечатан стримингом — выводим только источники
    lines = [] if result.get("streamed") else [result["answer"]]
    if result.get("sources") and result.get("has_answer"):
        lines.append("\n**Источники:**")
        seen = set()
        for s in result["sources"]:
            key = (s["source"], s.get("page_start"))
            if key in seen:
                continue
            seen.add(key)
            parts = [s["source"]]
            if s.get("chapter"):
                parts.append(s["chapter"])
            if s.get("section"):
                parts.append(s["section"])
            if s.get("page_start"):
                pg = f"стр. {s['page_start']}"
                if s.get("page_end") and s["page_end"] != s["page_start"]:
                    pg += f"-{s['page_end']}"
                parts.append(pg)
            lines.append(f"- {' / '.join(parts)}")
    return "\n".join(lines)
