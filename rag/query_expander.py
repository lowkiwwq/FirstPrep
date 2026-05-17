"""Расширение запроса двумя методами:

1. HyDE (Hypothetical Document Embeddings) — всегда.
   LLM генерирует гипотетический ответ с FTC-терминологией,
   cross-encoder использует его для точного reranking'а.

2. Paraphrasing — 3 переформулировки для дополнительного поиска.

expand_and_paraphrase() — объединённый вызов: оба результата за ОДИН LLM-запрос
вместо двух отдельных (экономия ~400ms).
"""

import json
import sys
from pathlib import Path

from openai import OpenAI

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import LLM_MODEL, OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

# --- Комбинированный промпт HyDE + Paraphrase ---

_EXPAND_PROMPT = (
    "You are assisting a search system for the FIRST Tech Challenge (FTC) DECODE competition manual.\n"
    "Given the user's question (may be in any language), produce TWO things IN ENGLISH:\n"
    "1. hyde: A SHORT hypothetical answer paragraph (3-5 sentences) as it would appear in the manual. "
    "Use FTC-specific terminology: MATCH, ALLIANCE, ROBOT, FOUL, MINOR FOUL, MAJOR FOUL, "
    "YELLOW CARD, RED CARD, DISABLED, DISQUALIFIED, FIELD STAFF, REFEREE, HEAD REFEREE, "
    "TELEOP, AUTO, SCORING ELEMENT, ARTIFACT, OBELISK, RAMP, GOAL, LAUNCHLINE, etc. "
    "If the question is completely unrelated to robotics/FTC, set hyde to empty string.\n"
    "2. paraphrases: 3 different English ways to ask the same question using varied vocabulary "
    "and FTC-relevant technical terms where appropriate.\n\n"
    "Question: {q}\n\n"
    "Respond with ONLY valid JSON, no markdown:\n"
    '{{"hyde": "...", "paraphrases": ["...", "...", "..."]}}'
)

# --- Одиночные вызовы (для обратной совместимости / fallback) ---

_HYDE_PROMPT = (
    "You are helping a search system find relevant passages in the FIRST Tech Challenge (FTC) "
    "DECODE competition manual.\n"
    "Given the user's question, write a SHORT hypothetical answer paragraph (3-5 sentences) "
    "as it would appear in the manual. Use FTC-specific terminology: "
    "MATCH, ALLIANCE, ROBOT, FOUL, MAJOR FOUL, YELLOW CARD, RED CARD, DISABLED, "
    "FIELD STAFF, REFEREE, HEAD REFEREE, TELEOP, AUTO, SCORING ELEMENT, ARTIFACT, OBELISK, etc.\n"
    "If the question is unrelated to robotics/competition, output EXACTLY: NO_DOMAIN.\n\n"
    "Question: {q}\n\nHypothetical answer:"
)


def expand_and_paraphrase(query: str) -> tuple[str, list[str]]:
    """HyDE + 3 парафраза за ОДИН LLM-вызов.

    Returns:
        (expanded_query, paraphrases)
        expanded_query — оригинал + гипотетический ответ (или просто оригинал если NO_DOMAIN)
        paraphrases    — список строк (до 3)
    """
    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": _EXPAND_PROMPT.format(q=query)}],
        temperature=0.4,
        max_tokens=400,
        response_format={"type": "json_object"},
    )
    raw = response.choices[0].message.content.strip()
    try:
        data = json.loads(raw)
        hyde = (data.get("hyde") or "").strip()
        paraphrases = [p.strip() for p in (data.get("paraphrases") or []) if str(p).strip()][:3]
        expanded = f"{query}\n\n{hyde}" if hyde else query
        return expanded, paraphrases
    except (json.JSONDecodeError, AttributeError):
        return query, []


def hyde_expand(query: str) -> str:
    """Только HyDE (одиночный вызов). Используется как fallback."""
    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": _HYDE_PROMPT.format(q=query)}],
        temperature=0.3,
        max_tokens=200,
    )
    hypo = response.choices[0].message.content.strip()
    if hypo == "NO_DOMAIN" or "NO_DOMAIN" in hypo:
        return query
    return f"{query}\n\n{hypo}"


def generate_paraphrases(query: str) -> list[str]:
    """Только парафразы (одиночный вызов). Используется как fallback."""
    expanded, paraphrases = expand_and_paraphrase(query)
    return paraphrases
