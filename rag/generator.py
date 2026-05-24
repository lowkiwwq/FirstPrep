"""Генерация ответов через LLM на основе найденных чанков.

Особенности:
  • Streaming output для быстрого ответа
  • Token budget control: обрезаем контекст если он слишком длинный
  • Низкоуверенный режим с другим системным промптом
  • Robust no-answer detection (regex-pattern, не subscring)
  • Graceful degradation при сбое OpenAI
"""

import re
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import LLM_MODEL
from rag.openai_client import chat_stream

# Максимальный размер контекста в символах (≈ tokens × 4)
# 16k токенов = ~64k символов; gpt-4o-mini имеет 128k но мы оставляем запас
_MAX_CONTEXT_CHARS = 24000
_MAX_CHUNK_CHARS   = 6000   # один чанк не должен забирать всё окно

_SYSTEM_PROMPT = """Ты — ассистент по FIRST Tech Challenge (FTC) и робототехнике. Отвечай ТОЛЬКО на основе предоставленного контекста.

ПРАВИЛА:
1. Используй ТОЛЬКО информацию из контекста ниже. Не добавляй знания от себя.
2. Если в контексте нет ответа — скажи: "В предоставленных материалах нет информации по этому вопросу."
3. Если вопрос относится к одному сезону FTC (DECODE / INTO THE DEEP / др.), но в контексте есть информация только из другого сезона — явно укажи: "Это правило относится к сезону X, для вашего сезона информации в базе нет."
4. Указывай источник: название документа, раздел, страницу.
5. Если фрагменты противоречат друг другу — укажи на противоречие.
6. Давай понятные объяснения. Если вопрос технический — объясняй терминологию.
7. Если к фрагменту есть связанное изображение — упомяни это."""

_SYSTEM_PROMPT_LOW_CONFIDENCE = """Ты — ассистент по FIRST Tech Challenge (FTC) и робототехнике. Отвечай ТОЛЬКО на основе предоставленного контекста.

ПРАВИЛА:
1. Используй ТОЛЬКО информацию из контекста ниже. Не добавляй знания от себя.
2. Контекст найден с НИЗКОЙ уверенностью — он может быть лишь частично релевантным.
   Отвечай осторожно: если прямого ответа нет — так и скажи.
3. Если есть смешение сезонов — явно укажи к какому сезону относится найденная информация.
4. Указывай источник: название документа, раздел, страницу.
5. Если фрагменты противоречат — укажи на противоречие.
6. Если уверенность очень низкая, рекомендуй уточнить вопрос."""

# Pattern-based no-answer detection: реагирует на полные фразы, не подстроки
# Каждый паттерн = регулярка которая должна находиться в начале строки/предложения
_NO_INFO_PATTERNS = [
    re.compile(r"^\s*в\s+предоставленн", re.IGNORECASE),
    re.compile(r"^\s*в\s+(?:этих|данных)\s+материалах\s+нет", re.IGNORECASE),
    re.compile(r"^\s*the\s+provided\s+(?:context|materials?)\s+(?:does\s+not|do\s+not|don'?t)\s+contain",
               re.IGNORECASE),
    re.compile(r"^\s*there\s+is\s+no\s+information", re.IGNORECASE),
    re.compile(r"^\s*информаци[яи]\s+(?:по|об|о)\s+.+\s+отсутствует", re.IGNORECASE),
    re.compile(r"^\s*контекст\s+не\s+содержит", re.IGNORECASE),
]


def _truncate(text: str, limit: int) -> str:
    """Обрезает текст по символам, добавляя маркер если что-то было отрезано."""
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + " […обрезано…]"


def _format_chunk(chunk: dict[str, Any], char_limit: int = _MAX_CHUNK_CHARS) -> str:
    meta = chunk.get("metadata", {}) or {}
    source = meta.get("source", "")
    chapter = meta.get("chapter", "")
    section = meta.get("section", "")
    page_start = meta.get("page_start", "")
    page_end = meta.get("page_end", "")

    header_parts = [str(p) for p in [source, chapter, section] if p]
    header = ", ".join(header_parts) if header_parts else "Источник не указан"
    page_info = ""
    if page_start:
        page_info = f", стр. {page_start}"
        if page_end and page_end != page_start:
            page_info += f"-{page_end}"

    body = _truncate(chunk.get("content", ""), char_limit)
    lines = [f"--- Источник: {header}{page_info} ---", body]

    img_desc = meta.get("related_image_description", "")
    if img_desc:
        lines.append(f"[Связанное изображение: {img_desc}]")
    lines.append("---")
    return "\n".join(lines)


def _build_context(chunks: list[dict[str, Any]], max_total: int = _MAX_CONTEXT_CHARS) -> str:
    """Собирает контекст, не превышая max_total символов.

    Чанки добавляются по порядку (они уже отсортированы reranker'ом),
    при превышении лимита — оставшиеся отбрасываются с пометкой.
    """
    parts: list[str] = []
    total = 0
    for i, c in enumerate(chunks):
        # Динамический лимит для последних чанков чтобы влезть в общий бюджет
        remaining = max_total - total
        if remaining <= 200:
            parts.append(f"\n[…ещё {len(chunks) - i} чанков опущено из-за лимита контекста…]")
            break
        chunk_limit = min(_MAX_CHUNK_CHARS, remaining - 100)
        formatted = _format_chunk(c, char_limit=chunk_limit)
        parts.append(formatted)
        total += len(formatted) + 2  # \n\n separator
    return "\n\n".join(parts)


def _is_no_answer(text: str) -> bool:
    """Robust детекция отказа модели. Использует regex-паттерны вместо подстрок."""
    if not text:
        return True
    # Проверяем первое предложение/абзац
    head = text.strip()[:300]
    return any(p.search(head) for p in _NO_INFO_PATTERNS)


def _extract_sources(chunks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Собирает уникальные источники для отображения."""
    sources = []
    seen: set[tuple] = set()
    for c in chunks:
        meta = c.get("metadata", {}) or {}
        key = (meta.get("source", ""), meta.get("page_start", ""))
        if key in seen:
            continue
        seen.add(key)
        sources.append({
            "source":       meta.get("source", ""),
            "chapter":      meta.get("chapter", ""),
            "section":      meta.get("section", ""),
            "page_start":   meta.get("page_start", ""),
            "page_end":     meta.get("page_end", ""),
            "content_type": meta.get("content_type", "text"),
        })
    return sources


def generate_answer(
    question: str,
    chunks: list[dict[str, Any]],
    model: str = LLM_MODEL,
    low_confidence: bool = False,
) -> dict[str, Any]:
    """Главная точка генерации ответа.

    При пустых chunks или сбое API возвращает honest "нет информации" без галлюцинаций.
    """
    if not chunks:
        return {
            "answer": "В предоставленных материалах нет информации по этому вопросу.",
            "sources": [],
            "has_answer": False,
            "streamed": False,
        }

    context = _build_context(chunks)
    system = _SYSTEM_PROMPT_LOW_CONFIDENCE if low_confidence else _SYSTEM_PROMPT
    messages = [
        {"role": "system", "content": system},
        {"role": "user",   "content": f"КОНТЕКСТ:\n{context}\n\nВОПРОС: {question}"},
    ]

    answer, success = chat_stream(
        messages=messages,
        model=model,
        temperature=0.1,
        max_tokens=1500,
        print_stream=True,
    )

    has_answer = success and not _is_no_answer(answer)
    sources = _extract_sources(chunks) if has_answer else []

    return {
        "answer": answer,
        "sources": sources,
        "has_answer": has_answer,
        "streamed": success,
    }
