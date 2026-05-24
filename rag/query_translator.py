"""Перевод запросов пользователя на язык корпуса (по умолчанию — английский).

Используется в редкой ветке `skip_clarifier=True`. В основном flow перевод делает
classify_and_translate (один объединённый вызов).
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from rag.openai_client import chat

_CYRILLIC_RE = re.compile(r"[а-яёА-ЯЁ]")

_TRANSLATE_PROMPT = (
    "Translate the following query to English. "
    "Keep technical terms (FOUL, ROBOT, AUTO, SAMPLE, OBELISK, servo, PWM, etc.) as-is. "
    "Output ONLY the translation, no explanations.\n\nQuery: {q}"
)


def is_russian(text: str) -> bool:
    """Определяем русский по доле кириллицы."""
    cyr = len(_CYRILLIC_RE.findall(text))
    return cyr >= 3 and cyr / max(len(text), 1) > 0.2


def translate_to_english(query: str) -> str:
    """Переводим русский запрос на английский. Английские оставляем как есть.
    При сбое API возвращаем оригинал."""
    if not is_russian(query):
        return query

    result = chat(
        messages=[{"role": "user", "content": _TRANSLATE_PROMPT.format(q=query)}],
        temperature=0,
        max_tokens=200,
        fallback=query,
    )
    return result.strip() or query


def prepare_query(query: str) -> tuple[str, str]:
    """Возвращает (search_query, original_query)."""
    translated = translate_to_english(query)
    return translated, query
