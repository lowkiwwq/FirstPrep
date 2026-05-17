"""Генерация ответов через LLM на основе найденных чанков."""

import sys
from pathlib import Path
from typing import Any

from openai import OpenAI

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import LLM_MODEL, OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

_SYSTEM_PROMPT = """Ты — ассистент по робототехнике. Отвечай ТОЛЬКО на основе предоставленного контекста.

ПРАВИЛА:
1. Используй ТОЛЬКО информацию из контекста ниже. Не добавляй знания от себя.
2. Если в контексте нет ответа — скажи: "В предоставленных материалах нет информации по этому вопросу."
3. Указывай источник: название книги, раздел, страницу.
4. Если фрагменты противоречат друг другу — укажи на противоречие.
5. Давай понятные объяснения. Если вопрос технический — объясняй терминологию.
6. Если к фрагменту есть связанное изображение — упомяни это."""

_SYSTEM_PROMPT_LOW_CONFIDENCE = """Ты — ассистент по робототехнике. Отвечай ТОЛЬКО на основе предоставленного контекста.

ПРАВИЛА:
1. Используй ТОЛЬКО информацию из контекста ниже. Не добавляй знания от себя.
2. Контекст найден с НИЗКОЙ уверенностью — он может быть лишь частично релевантным.
   Отвечай осторожно: если прямого ответа нет — так и скажи.
3. Указывай источник: название книги, раздел, страницу.
4. Если фрагменты противоречат друг другу — укажи на противоречие.
5. Давай понятные объяснения. Если вопрос технический — объясняй терминологию.
6. Если к фрагменту есть связанное изображение — упомяни это."""

_NO_INFO_PHRASES = [
    "нет информации",
    "no information",
    "не нашёл",
    "не содержит",
]


def _format_chunk(chunk: dict[str, Any]) -> str:
    meta = chunk.get("metadata", {})
    source = meta.get("source", "")
    chapter = meta.get("chapter", "")
    section = meta.get("section", "")
    page_start = meta.get("page_start", "")
    page_end = meta.get("page_end", "")

    header_parts = [p for p in [source, chapter, section] if p]
    header = ", ".join(header_parts)
    page_info = f"стр. {page_start}" + (f"-{page_end}" if page_end and page_end != page_start else "")

    lines = [f"--- Источник: {header}, {page_info} ---"]
    lines.append(chunk["content"])

    img_desc = meta.get("related_image_description", "")
    if img_desc:
        lines.append(f"[Связанное изображение: {img_desc}]")

    lines.append("---")
    return "\n".join(lines)


def _build_context(chunks: list[dict[str, Any]]) -> str:
    return "\n\n".join(_format_chunk(c) for c in chunks)


def generate_answer(question: str, chunks: list[dict[str, Any]],
                    model: str = LLM_MODEL,
                    low_confidence: bool = False) -> dict[str, Any]:
    if not chunks:
        return {
            "answer": "В предоставленных материалах нет информации по этому вопросу.",
            "sources": [],
            "has_answer": False,
        }

    context = _build_context(chunks)
    system = _SYSTEM_PROMPT_LOW_CONFIDENCE if low_confidence else _SYSTEM_PROMPT
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": f"КОНТЕКСТ:\n{context}\n\nВОПРОС: {question}"},
    ]

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.1,
        max_tokens=1500,
        stream=True,
    )
    parts = []
    for chunk in response:
        delta = chunk.choices[0].delta.content
        if delta:
            parts.append(delta)
            print(delta, end="", flush=True)
    print()
    answer = "".join(parts)
    _streamed = True

    has_answer = not any(phrase in answer.lower() for phrase in _NO_INFO_PHRASES)

    sources = []
    for c in chunks:
        meta = c.get("metadata", {})
        sources.append({
            "source": meta.get("source", ""),
            "chapter": meta.get("chapter", ""),
            "section": meta.get("section", ""),
            "page_start": meta.get("page_start", ""),
            "page_end": meta.get("page_end", ""),
            "content_type": meta.get("content_type", "text"),
        })

    return {"answer": answer, "sources": sources, "has_answer": has_answer, "streamed": True}
