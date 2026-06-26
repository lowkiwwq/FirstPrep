"""Полный RAG-пайплайн: классификация → поиск → reranking → ответ.

Архитектура:
  1. Семантический кэш — проверяется до любых LLM-вызовов
  2. Волна 1 (параллельно): classify+translate ‖ HyDE+paraphrase ‖ main_search
  3. Доп. поиск с переведённым запросом если он отличается от оригинала (для BM25)
  4. Волна 2: поиск по парафразам (с early-exit если основной нашёл сильное)
  5. Reranking с двухуровневым confidence threshold
  6. Fallback на чисто векторный поиск если reranker всё отфильтровал
  7. Генерация ответа с указанием источников
  8. Сохранение результата в семантический кэш
"""

import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import (
    RERANK_THRESHOLD_HIGH,
    RERANK_THRESHOLD_LOW,
    RETRIEVAL_FINAL_TOP_K,
    RETRIEVAL_VECTOR_TOP_K,
)
from rag.clarifier import classify_and_translate
from rag.generator import generate_answer
from rag.query_expander import expand_and_paraphrase
from rag.reranker import rerank_or_truncate
from rag.retriever import _embed_query, hybrid_search, vector_fallback
from rag.semantic_cache import get_cache

# Early-exit threshold: если основной поиск дал >=N чанков с cosine >= score,
# поиск по парафразам пропускается (~600ms экономии)
_EARLY_EXIT_SCORE = 0.55
_EARLY_EXIT_COUNT = 3

# Минимальная норма embedding-вектора — если ниже, embed failed, не используем кэш
_MIN_EMBED_NORM = 1e-6


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


def _vector_norm(v: list[float]) -> float:
    return sum(x * x for x in v) ** 0.5


def _ambiguous_response(clarifying_questions: list[str]) -> dict[str, Any]:
    return {
        "needs_clarification": True,
        "status": "ambiguous",
        "answer": "Запрос слишком общий. Уточните, пожалуйста:",
        "clarifying_questions": clarifying_questions,
        "sources": [],
        "has_answer": False,
        "chunks_used": 0,
        "candidates_count": 0,
        "streamed": False,
    }


def _out_of_domain_response() -> dict[str, Any]:
    return {
        "needs_clarification": False,
        "status": "out_of_domain",
        "answer": (
            "Этот вопрос не относится к предоставленным материалам "
            "(документация FIRST Tech Challenge и руководства по робототехнике)."
        ),
        "clarifying_questions": [],
        "sources": [],
        "has_answer": False,
        "chunks_used": 0,
        "candidates_count": 0,
        "streamed": False,
    }


def ask(
    question: str,
    top_k_search: int = RETRIEVAL_VECTOR_TOP_K,
    top_k_final: int = RETRIEVAL_FINAL_TOP_K,
    filter_meta: dict | None = None,
    skip_clarifier: bool = False,
    verbose: bool = False,
    use_cache: bool = True,
) -> dict[str, Any]:
    """Главная точка входа."""
    if not isinstance(question, str) or not question.strip():
        return {
            "needs_clarification": False,
            "status": "empty",
            "answer": "Пустой запрос. Задайте вопрос.",
            "clarifying_questions": [],
            "sources": [],
            "has_answer": False,
            "chunks_used": 0,
            "candidates_count": 0,
            "streamed": False,
        }
    question = question.strip()

    # ── 1. Embedding запроса + проверка кэша ───────────────────────────────
    q_embedding = _embed_query(question)
    embed_ok = _vector_norm(q_embedding) > _MIN_EMBED_NORM

    sem_cache = get_cache()
    if use_cache and embed_ok:
        cached = sem_cache.get(question, q_embedding)
        if cached is not None:
            sim = cached.get("cache_similarity", 0.0)
            print(f"[CACHE HIT] similarity={sim:.3f} — ответ из кэша ({sem_cache.size} записей)")
            cached["needs_clarification"] = False
            cached["status"] = cached.get("status", "answered")
            cached["clarifying_questions"] = []
            return cached

    # ── 2. Волна 1: classify+translate ‖ expand+paraphrase ‖ main_search ──
    with ThreadPoolExecutor(max_workers=3) as ex:
        cls_future = ex.submit(classify_and_translate, question) if not skip_clarifier else None
        expand_future = ex.submit(expand_and_paraphrase, question)
        search_future = ex.submit(hybrid_search, question, top_k_search, filter_meta)

        # Классификатор: при ambiguous/out_of_domain выходим сразу
        if cls_future is not None:
            cls = cls_future.result()
            if verbose:
                print(f"  Classifier: status={cls['status']}, reason={cls['reason']}")
            if cls["status"] == "ambiguous":
                _peek = search_future.result()
                if not any(c.get("score", 0) >= _EARLY_EXIT_SCORE for c in _peek):
                    return _ambiguous_response(cls["clarifying_questions"])
                if verbose:
                    print(f"  Ambiguous overridden: strong retrieval hit, proceeding")
            if cls["status"] == "out_of_domain":
                return _out_of_domain_response()
            search_query = cls["translated"]
            if verbose and search_query != question:
                print(f"  Translated: {search_query}")
        else:
            from rag.query_translator import prepare_query
            search_query, _ = prepare_query(question)

        expanded_query, paraphrases = expand_future.result()
        orig_results = search_future.result()

    if verbose:
        if expanded_query != question:
            print(f"  HyDE expanded (first 120 chars): {expanded_query[:120]}...")
        print(f"  Paraphrases: {paraphrases}")

    # ── 3. Доп. поиск по переведённому запросу (для BM25) ──────────────────
    if search_query != question:
        translated_results = hybrid_search(
            search_query, top_k_each=top_k_search, filter_meta=filter_meta
        )
        main_results = _merge_unique([orig_results, translated_results])
    else:
        main_results = orig_results

    # ── 4. Волна 2: парафразы (или early exit) ─────────────────────────────
    strong_hits = sum(1 for c in main_results if c.get("score", 0) >= _EARLY_EXIT_SCORE)
    if strong_hits >= _EARLY_EXIT_COUNT:
        if verbose:
            print(f"  Early exit: {strong_hits} strong hits, skipping paraphrase search")
        para_results_list: list[list[dict]] = []
    elif paraphrases:
        with ThreadPoolExecutor(max_workers=len(paraphrases)) as ex:
            futures = [
                ex.submit(hybrid_search, p, top_k_search // 2, filter_meta)
                for p in paraphrases
            ]
            para_results_list = [f.result() for f in futures]
    else:
        para_results_list = []

    candidates = _merge_unique([main_results] + para_results_list)
    if verbose:
        print(f"  Total unique candidates: {len(candidates)}")

    # ── 5. Reranking с двухуровневым порогом ───────────────────────────────
    top_chunks = rerank_or_truncate(expanded_query, candidates, top_k=top_k_final)

    if verbose:
        for i, c in enumerate(top_chunks, 1):
            score = c.get("rerank_score", c.get("score", 0))
            conf = c.get("confidence", "?")
            page = c["metadata"].get("page_start", "")
            src = c["metadata"].get("source", "")[:35]
            preview = c["content"][:60].replace("\n", " ")
            print(f"  [{i}] score={score:+.3f} conf={conf} | {src} p.{page}: {preview}...")

    # ── 6. Fallback: чисто векторный поиск если reranker всё отфильтровал ──
    if not top_chunks:
        fallback = vector_fallback(search_query)
        if fallback:
            top_chunks = fallback
            if verbose:
                print(f"  Fallback: {len(top_chunks)} chunks from vector similarity > 0.75")

    # ── 7. Определение уверенности и генерация ─────────────────────────────
    low_confidence = bool(top_chunks) and all(
        c.get("confidence") in ("low", None)
        and c.get("rerank_score", 0) < RERANK_THRESHOLD_HIGH
        for c in top_chunks
    )

    result = generate_answer(question, top_chunks, low_confidence=low_confidence)
    result["needs_clarification"] = False
    result["status"] = "answered" if result["has_answer"] else "no_results"
    result["clarifying_questions"] = []
    result["candidates_count"] = len(candidates)
    result["chunks_used"] = len(top_chunks)
    result["low_confidence"] = low_confidence

    # ── 8. Сохраняем в кэш (только успешные ответы и только если embed работал) ──
    if use_cache and embed_ok and result["has_answer"]:
        sem_cache.put(question, q_embedding, result)

    return result


def format_response(result: dict[str, Any]) -> str:
    """Форматирует результат для вывода в CLI."""
    if result.get("needs_clarification"):
        lines = [result["answer"]]
        for i, q in enumerate(result.get("clarifying_questions", []), 1):
            lines.append(f"  {i}. {q}")
        return "\n".join(lines)

    # Если ответ уже стримился — текст печатать не нужно, только источники
    lines = [] if result.get("streamed") else [result.get("answer", "")]

    if result.get("sources") and result.get("has_answer"):
        lines.append("\n**Источники:**")
        seen = set()
        for s in result["sources"]:
            key = (s.get("source", ""), s.get("page_start", ""))
            if key in seen:
                continue
            seen.add(key)
            parts: list[str] = [s.get("source") or "—"]
            if s.get("chapter"):
                parts.append(str(s["chapter"]))
            if s.get("section"):
                parts.append(str(s["section"]))
            if s.get("page_start"):
                pg = f"стр. {s['page_start']}"
                if s.get("page_end") and s["page_end"] != s["page_start"]:
                    pg += f"-{s['page_end']}"
                parts.append(pg)
            lines.append(f"- {' / '.join(parts)}")

    return "\n".join(lines)
