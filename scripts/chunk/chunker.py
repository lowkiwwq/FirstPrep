"""Структурный чанкинг с метаданными по разделам и специальными правилами для робототехники."""

import json
import re
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

import tiktoken

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import (
    CHUNK_MAX_TOKENS, CHUNK_MIN_TOKENS, CHUNK_OVERLAP_TOKENS,
    CHUNK_TARGET_TOKENS, CHUNKS_DIR, CLEANED_DIR, EMBEDDING_MODEL,
)

_enc = tiktoken.encoding_for_model("gpt-4o")

_SPECIAL_CONTENT_TYPES = {"table", "formula", "image_description", "code"}
_STEP_PATTERN = re.compile(r"^\s*(\d+[\.\)]\s|Шаг\s|Step\s)", re.IGNORECASE)

# Технические ключевые слова для автоматического извлечения keywords
_TECH_TERMS = re.compile(
    r"\b(servo|servoprivod|сервопривод|PWM|GPIO|I2C|SPI|UART|CAN|USB|"
    r"Arduino|Raspberry|ROS|PID|encoder|энкодер|stepper|шаговый|"
    r"BLDC|brushless|манипулятор|manipulator|кинематика|kinematics|"
    r"одометрия|odometry|lidar|лидар|IMU|акселерометр|гироскоп|"
    r"напряжение|ток|момент|torque|скорость|velocity|угол|angle)\b",
    re.IGNORECASE,
)


def _count_tokens(text: str) -> int:
    return len(_enc.encode(text))


def _extract_keywords(text: str) -> list[str]:
    return list(set(m.group(0) for m in _TECH_TERMS.finditer(text)))


def _detect_language(text: str) -> str:
    cyrillic = len(re.findall(r"[а-яёА-ЯЁ]", text))
    latin = len(re.findall(r"[a-zA-Z]", text))
    if cyrillic > latin:
        return "ru"
    if latin > cyrillic:
        return "en"
    return "mixed"


def _is_step_list(text: str) -> bool:
    lines = [l for l in text.splitlines() if l.strip()]
    return sum(1 for l in lines if _STEP_PATTERN.match(l)) >= 3


def _split_by_overlap(text: str, target: int, max_tok: int, overlap: int) -> list[str]:
    """Разбиваем длинный текст на чанки с перекрытием."""
    paragraphs = re.split(r"\n\n+", text)
    chunks = []
    current = []
    current_tokens = 0

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        ptok = _count_tokens(para)
        if current_tokens + ptok > max_tok and current:
            chunks.append("\n\n".join(current))
            # overlap: оставляем последний параграф
            current = current[-1:] if overlap > 0 else []
            current_tokens = _count_tokens("\n\n".join(current))
        current.append(para)
        current_tokens += ptok

    if current:
        chunks.append("\n\n".join(current))

    return chunks or [text]


def _make_chunk(content: str, meta_base: dict, content_type: str = "text",
                page_start: int = 0, page_end: int = 0, chunk_idx: int = 0) -> dict:
    keywords = _extract_keywords(content)
    lang = _detect_language(content)
    return {
        "id": f"chunk_{uuid.uuid4().hex[:8]}",
        "content": content,
        "metadata": {
            **meta_base,
            "language": lang,
            "page_start": page_start,
            "page_end": page_end,
            "content_type": content_type,
            "keywords": keywords,
            "embedding_model": EMBEDDING_MODEL,
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
    }


def chunk_document(cleaned_data: dict) -> list[dict]:
    source = cleaned_data.get("source", "unknown")
    author = cleaned_data.get("author", "")
    pages = cleaned_data["pages"]

    meta_base = {"source": source, "author": author, "chapter": "", "section": ""}

    current_chapter = ""
    current_section = ""
    current_blocks: list[str] = []
    current_type = "text"
    page_start = 1
    chunks: list[dict] = []

    def flush(page_end: int) -> None:
        nonlocal current_blocks, current_type, page_start
        if not current_blocks:
            return
        text = "\n\n".join(current_blocks).strip()
        if not text:
            current_blocks = []
            return

        tok = _count_tokens(text)
        m = {**meta_base, "chapter": current_chapter, "section": current_section}

        if current_type in _SPECIAL_CONTENT_TYPES or _is_step_list(text):
            # Особые типы — один чанк целиком
            if tok >= CHUNK_MIN_TOKENS:
                chunks.append(_make_chunk(text, m, current_type, page_start, page_end))
        elif tok <= CHUNK_MAX_TOKENS:
            if tok >= CHUNK_MIN_TOKENS:
                chunks.append(_make_chunk(text, m, current_type, page_start, page_end))
        else:
            for sub in _split_by_overlap(text, CHUNK_TARGET_TOKENS, CHUNK_MAX_TOKENS, CHUNK_OVERLAP_TOKENS):
                if _count_tokens(sub) >= CHUNK_MIN_TOKENS:
                    chunks.append(_make_chunk(sub, m, current_type, page_start, page_end))

        current_blocks = []
        current_type = "text"
        page_start = page_end

    for page in pages:
        pnum = page["page"]
        for block in page.get("text_blocks", []):
            text = block["text"].strip()
            if not text:
                continue

            btype = block.get("content_type", "text")
            is_heading = block.get("is_heading", False)

            if is_heading:
                # Новый заголовок — сбрасываем текущий буфер
                flush(pnum)
                level = len(re.match(r"^(#+)", text).group(1)) if text.startswith("#") else 1
                if level <= 2:
                    current_chapter = text.lstrip("#").strip()
                    current_section = ""
                else:
                    current_section = text.lstrip("#").strip()
                page_start = pnum
                continue

            if btype in _SPECIAL_CONTENT_TYPES:
                # Спецтипы идут отдельным чанком
                flush(pnum)
                if _count_tokens(text) >= CHUNK_MIN_TOKENS:
                    m = {**meta_base, "chapter": current_chapter, "section": current_section}
                    chunks.append(_make_chunk(text, m, btype, pnum, pnum))
                page_start = pnum
                continue

            # Обычный текст: добавляем в буфер
            current_blocks.append(text)
            tok = _count_tokens("\n\n".join(current_blocks))
            if tok >= CHUNK_TARGET_TOKENS:
                flush(pnum)
                page_start = pnum

    flush(pages[-1]["page"] if pages else 1)
    return chunks


def run(cleaned_path: str | Path) -> Path:
    cleaned_path = Path(cleaned_path)
    data = json.loads(cleaned_path.read_text(encoding="utf-8"))
    chunks = chunk_document(data)
    out_path = CHUNKS_DIR / cleaned_path.name
    out_path.write_text(json.dumps(chunks, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Chunked: {out_path}  ({len(chunks)} chunks)")
    return out_path


def run_all() -> None:
    for f in CLEANED_DIR.glob("*.json"):
        run(f)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        run_all()
    else:
        run(sys.argv[1])
