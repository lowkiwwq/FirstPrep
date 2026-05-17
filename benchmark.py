"""Замер времени каждого этапа RAG-пайплайна — ДО и ПОСЛЕ оптимизации.

Запуск: python benchmark.py
"""

import sys
import warnings
warnings.filterwarnings("ignore")
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

QUESTIONS = [
    "How long does a match last?",
    "Какие моторы разрешены для робота?",
    "Are there referees and what do they do?",
]


def run_with_timings(question: str) -> tuple[dict, float]:
    from rag.timer import StepTimer
    from concurrent.futures import ThreadPoolExecutor
    timer = StepTimer()

    with timer.measure("TRANSLATE"):
        from rag.query_translator import prepare_query
        search_query, _ = prepare_query(question)

    with timer.measure("HYDE+PARA"):
        # Fix 2: HYDE и PARAPHRASE параллельно
        from rag.query_expander import maybe_expand, generate_paraphrases
        with ThreadPoolExecutor(max_workers=2) as ex:
            hyde_f = ex.submit(maybe_expand, search_query)
            para_f = ex.submit(generate_paraphrases, search_query)
            expanded   = hyde_f.result()
            paraphrases = para_f.result()

    with timer.measure("SEARCH"):
        # Fix 2: main + para поиски параллельно
        from rag.retriever import hybrid_search
        from rag.rag_pipeline import _merge_unique
        with ThreadPoolExecutor(max_workers=1 + len(paraphrases)) as ex:
            main_f = ex.submit(hybrid_search, expanded, 8)
            para_fs = [ex.submit(hybrid_search, p, 4) for p in paraphrases]
            all_lists = [main_f.result()] + [f.result() for f in para_fs]
        candidates = _merge_unique(all_lists)

    with timer.measure("RERANK"):
        from rag.reranker import rerank_or_truncate
        top_chunks = rerank_or_truncate(expanded, candidates, top_k=5)

    with timer.measure("GENERATE"):
        from rag.generator import generate_answer
        import io, contextlib
        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):   # глушим стриминг в консоль
            result = generate_answer(question, top_chunks)

    print(f"\nQ: {question}")
    print(f"   translated: {search_query}")
    print(f"   candidates: {len(candidates)} -> top_chunks: {len(top_chunks)}")
    timer.print()
    return timer.steps, timer.total()


if __name__ == "__main__":
    print("=" * 60)
    print("WARMUP (одноразовая загрузка моделей)")
    print("=" * 60)
    from rag.startup import warmup
    warmup(verbose=True)

    print()
    print("=" * 60)
    print("ТАЙМИНГИ ПОСЛЕ ОПТИМИЗАЦИИ")
    print("=" * 60)

    all_timings = []
    for q in QUESTIONS:
        steps, total = run_with_timings(q)
        all_timings.append((q, steps, total))

    print()
    print("=" * 60)
    print("СВОДНАЯ ТАБЛИЦА (ПОСЛЕ)")
    print("=" * 60)
    step_names = list(all_timings[0][1].keys())
    header = f"{'Этап':<12}" + "".join(f"{'Q'+str(i+1):>8}" for i in range(len(QUESTIONS)))
    print(header)
    print("-" * (12 + 8 * len(QUESTIONS)))
    for s in step_names:
        row = f"{s:<12}" + "".join(f"{t[1].get(s, 0):>7.2f}c" for t in all_timings)
        print(row)
    print("-" * (12 + 8 * len(QUESTIONS)))
    totals = f"{'TOTAL':<12}" + "".join(f"{t[2]:>7.2f}c" for t in all_timings)
    print(totals)

    print()
    print("=" * 60)
    print("СРАВНЕНИЕ: ДО vs ПОСЛЕ")
    print("=" * 60)
    before = {
        "TRANSLATE":  [1.31, 0.82, 0.00],
        "HYDE":       [0.18, 0.00, 0.00],
        "PARAPHRASE": [3.88, 3.10, 1.56],
        "VECTOR":     [2.01, 0.98, 0.88],
        "BM25":       [0.03, 0.01, 0.01],
        "RERANK":     [18.74, 1.77, 1.52],
        "GENERATE":   [2.04, 7.71, 5.50],
        "TOTAL":      [31.18, 17.63, 12.48],
    }
    after_totals = [t[2] for t in all_timings]
    for i, q in enumerate(QUESTIONS):
        label = q[:40]
        b = before["TOTAL"][i]
        a = after_totals[i]
        speedup = b / a if a > 0 else 0
        print(f"  Q{i+1}: {b:.1f}c -> {a:.1f}c  (x{speedup:.1f} быстрее)")
