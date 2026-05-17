"""Перевод запросов пользователя на язык корпуса (по умолчанию — английский).

Используется когда корпус и запросы на разных языках: BM25 чисто лексический,
а cross-encoder лучше работает на языке, на котором обучался (англ.).
"""

import re
import sys
from pathlib import Path

from openai import OpenAI

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import LLM_MODEL, OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

_CYRILLIC_RE = re.compile(r"[а-яёА-ЯЁ]")

_TRANSLATE_PROMPT = (
    "Translate the following query to English. "
    "Keep technical terms (servo, PWM, ROS, Arduino, etc.) as-is. "
    "Output ONLY the translation, no explanations.\n\nQuery: {q}"
)


def is_russian(text: str) -> bool:
    """Определяем русский по доле кириллицы."""
    cyr = len(_CYRILLIC_RE.findall(text))
    return cyr >= 3 and cyr / max(len(text), 1) > 0.2


def translate_to_english(query: str) -> str:
    """Переводим русский запрос на английский. Английские оставляем как есть."""
    if not is_russian(query):
        return query

    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": _TRANSLATE_PROMPT.format(q=query)}],
        temperature=0,
        max_tokens=200,
    )
    return response.choices[0].message.content.strip()


def prepare_query(query: str) -> tuple[str, str]:
    """Возвращает (search_query, original_query). search_query — для поиска."""
    translated = translate_to_english(query)
    return translated, query
