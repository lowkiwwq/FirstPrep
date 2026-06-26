"""Расширение запроса двумя методами:

1. HyDE (Hypothetical Document Embeddings) — всегда.
   LLM генерирует гипотетический ответ с FTC-терминологией для всех сезонов,
   cross-encoder использует его для точного reranking'а.

2. Paraphrasing — 3 переформулировки для дополнительного поиска.

expand_and_paraphrase() — оба результата за ОДИН LLM-запрос вместо двух отдельных
(экономия ~400ms), с retry/graceful degradation.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from rag.openai_client import chat

# Универсальный HyDE-промпт: упоминает термины обоих сезонов FTC + REV Robotics
_EXPAND_PROMPT = (
    "You are assisting a search system for FIRST Tech Challenge (FTC) documentation, "
    "covering multiple seasons (DECODE 2025-26, INTO THE DEEP 2024-25) and "
    "REV Robotics hardware manuals.\n"
    "Given the user's question (may be in any language), produce TWO things IN ENGLISH:\n"
    "1. hyde: A SHORT hypothetical answer paragraph (3-5 sentences) as it would appear in "
    "official FTC documentation. Use FTC-specific terminology relevant to the question, "
    "from any season:\n"
    "   • DECODE: ARTIFACT, OBELISK, MOTIF, GOAL, LAUNCHLINE, RAMP\n"
    "   • INTO THE DEEP: SAMPLE, SPECIMEN, BASKET, NET ZONE, CHAMBER, SUBMERSIBLE, ASCENT\n"
    "   • General: MATCH, ALLIANCE, ROBOT, FOUL, MINOR FOUL, MAJOR FOUL, YELLOW CARD, "
    "RED CARD, DISABLED, DISQUALIFIED, FIELD STAFF, REFEREE, HEAD REFEREE, TELEOP, AUTO, "
    "SCORING ELEMENT, INSPECTION, AWARDS\n"
    "   • Hardware: Control Hub, Expansion Hub, SPARK, BLINKIN, RIOduino, Smart Servo\n"
    "If the question is completely unrelated to robotics/FTC, set hyde to empty string.\n"
    "2. paraphrases: 3 different English ways to ask the same question using varied "
    "vocabulary and FTC-relevant technical terms where appropriate.\n\n"
    "Question: {q}\n\n"
    "Respond with ONLY valid JSON, no markdown:\n"
    '{{"hyde": "...", "paraphrases": ["...", "...", "..."]}}'
)


# Одиночный HyDE-промпт (fallback)
_HYDE_PROMPT = (
    "You are helping a search system find relevant passages in FIRST Tech Challenge (FTC) "
    "documentation across multiple seasons.\n"
    "Given the user's question, write a SHORT hypothetical answer paragraph (3-5 sentences) "
    "as it would appear in the manual. Use FTC-specific terminology relevant to the question.\n"
    "If the question is unrelated to robotics/competition, output EXACTLY: NO_DOMAIN.\n\n"
    "Question: {q}\n\nHypothetical answer:"
)


def _parse_expansion(raw: str, fallback_query: str) -> tuple[str, list[str]]:
    """Парсит JSON-ответ HyDE+paraphrase. Возвращает (expanded_query, paraphrases)."""
    try:
        data = json.loads(raw) if raw else {}
        hyde = (data.get("hyde") or "").strip()
        paras_raw = data.get("paraphrases") or []
        if not isinstance(paras_raw, list):
            paras_raw = []
        paraphrases = [str(p).strip() for p in paras_raw if str(p).strip()][:3]
        expanded = f"{fallback_query}\n\n{hyde}" if hyde else fallback_query
        return expanded, paraphrases
    except (json.JSONDecodeError, AttributeError, TypeError):
        return fallback_query, []


def expand_and_paraphrase(query: str) -> tuple[str, list[str]]:
    """HyDE + 3 парафраза за ОДИН LLM-вызов с retry.

    При сбое API возвращает (query, []) — pipeline продолжает работу,
    просто без HyDE/paraphrase обогащения.
    """
    raw = chat(
        messages=[{"role": "user", "content": _EXPAND_PROMPT.format(q=query)}],
        temperature=0.4,
        max_tokens=400,
        response_format={"type": "json_object"},
        fallback="",
    )
    return _parse_expansion(raw, fallback_query=query)


def hyde_expand(query: str) -> str:
    """Только HyDE (одиночный вызов). Используется как fallback."""
    raw = chat(
        messages=[{"role": "user", "content": _HYDE_PROMPT.format(q=query)}],
        temperature=0.3,
        max_tokens=200,
        fallback="",
    )
    hypo = raw.strip()
    if not hypo or hypo == "NO_DOMAIN" or "NO_DOMAIN" in hypo:
        return query
    return f"{query}\n\n{hypo}"


def generate_paraphrases(query: str) -> list[str]:
    """Только парафразы. Возвращает [] при сбое."""
    _, paraphrases = expand_and_paraphrase(query)
    return paraphrases
