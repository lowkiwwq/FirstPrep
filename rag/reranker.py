"""Реранкинг результатов поиска через кросс-энкодер sentence-transformers.

Двухуровневый порог:
  score >= RERANK_THRESHOLD_HIGH  → уверенный результат
  score in [LOW, HIGH)            → низкая уверенность, пометим чанк
  score < RERANK_THRESHOLD_LOW    → отфильтровать
"""

import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import RERANK_THRESHOLD_HIGH, RERANK_THRESHOLD_LOW, RETRIEVAL_FINAL_TOP_K

_MODEL_NAME = "cross-encoder/ms-marco-MiniLM-L-6-v2"
_model = None


def _get_model():
    global _model
    if _model is None:
        from sentence_transformers import CrossEncoder
        _model = CrossEncoder(_MODEL_NAME)
    return _model


def rerank(query: str, candidates: list[dict[str, Any]],
           top_k: int = RETRIEVAL_FINAL_TOP_K,
           threshold: float = RERANK_THRESHOLD_LOW) -> list[dict[str, Any]]:
    """Rerank + двухуровневая фильтрация. Помечает чанки с низкой уверенностью."""
    if not candidates:
        return []

    model = _get_model()
    pairs = [(query, c["content"]) for c in candidates]
    scores = model.predict(pairs)

    for c, score in zip(candidates, scores):
        c["rerank_score"] = float(score)
        # Метка уверенности — используется в generator для пометки ответа
        if float(score) >= RERANK_THRESHOLD_HIGH:
            c["confidence"] = "high"
        elif float(score) >= RERANK_THRESHOLD_LOW:
            c["confidence"] = "low"
        else:
            c["confidence"] = "none"

    ranked = sorted(candidates, key=lambda x: x["rerank_score"], reverse=True)
    filtered = [r for r in ranked if r["rerank_score"] >= threshold]
    return filtered[:top_k]


def rerank_or_truncate(query: str, candidates: list[dict[str, Any]],
                       top_k: int = RETRIEVAL_FINAL_TOP_K) -> list[dict[str, Any]]:
    """Reranking с fallback — если модель недоступна, берём top_k по vector score."""
    try:
        return rerank(query, candidates, top_k)
    except Exception as e:
        print(f"Reranking error: {e}, using top-{top_k} by vector score")
        return candidates[:top_k]
