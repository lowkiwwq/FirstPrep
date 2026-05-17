"""Очистка и нормализация текста: переносы, колонтитулы, артефакты PDF."""

import json
import re
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import CLEANED_DIR, EXTRACTED_DIR

# Замена лигатур и типографических артефактов
_LIGATURE_MAP = str.maketrans({
    "ﬀ": "ff", "ﬁ": "fi", "ﬂ": "fl",
    "ﬃ": "ffi", "ﬄ": "ffl",
    "‘": "'", "’": "'",
    "“": '"', "”": '"',
    "–": "-", "—": "-",
    "­": "",  # soft hyphen
})

_TECH_HYPHEN_PATTERN = re.compile(
    r"\b(I2C|SPI|PWM|GPIO|UART|CAN|USB|ROS|PID|PCB|RPM|DC|AC|3D|CAD|CAM)\b",
    re.IGNORECASE,
)


def _fix_ligatures(text: str) -> str:
    return text.translate(_LIGATURE_MAP)


def _fix_hyphenation(text: str) -> str:
    """Склеиваем перенос слова через дефис в конце строки."""
    def _rejoin(m: re.Match) -> str:
        before = m.group(1)
        after = m.group(2)
        # Технические термины с дефисом не трогаем
        if _TECH_HYPHEN_PATTERN.search(before) or _TECH_HYPHEN_PATTERN.search(after):
            return m.group(0)
        # Следующее слово с маленькой буквы — склеиваем
        if after and after[0].islower():
            return before + after
        return m.group(0)

    return re.sub(r"(\w+)-\n(\w+)", _rejoin, text)


def _normalize_whitespace(text: str) -> str:
    text = re.sub(r"[ \t]+", " ", text)          # множественные пробелы
    text = re.sub(r"\n{3,}", "\n\n", text)        # больше 2 пустых строк
    return text.strip()


def _detect_headers_footers(pages: list) -> set[str]:
    """Находим повторяющийся текст (колонтитулы) — встречается на 3+ страницах."""
    counter: Counter = Counter()
    for page in pages:
        seen = set()
        for block in page.get("text_blocks", []):
            t = block["text"].strip()
            if t and t not in seen:
                counter[t] += 1
                seen.add(t)
    threshold = max(3, len(pages) * 0.3)
    return {t for t, c in counter.items() if c >= threshold}


def _restore_paragraphs(text: str) -> str:
    """Склеиваем строки, разбитые PDF'ом, если нет признака нового абзаца."""
    lines = text.split("\n")
    result = []
    for i, line in enumerate(lines):
        line = line.rstrip()
        if not line:
            result.append("")
            continue
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            # Склеиваем если текущая строка не заканчивается на знак конца предложения
            ends_sentence = line[-1] in ".!?:»)"
            next_starts_upper = next_line and next_line[0].isupper()
            next_is_empty = not next_line
            if ends_sentence or next_is_empty or next_starts_upper:
                result.append(line)
            else:
                result.append(line + " ")
        else:
            result.append(line)
    return "".join(result)


def clean_extracted(data: dict) -> dict:
    headers_footers = _detect_headers_footers(data["pages"])
    cleaned_pages = []
    for page in data["pages"]:
        clean_blocks = []
        for block in page.get("text_blocks", []):
            text = block["text"].strip()
            if text in headers_footers:
                continue
            if len(text) < 5:
                continue
            text = _fix_ligatures(text)
            text = _fix_hyphenation(text)
            text = _restore_paragraphs(text)
            text = _normalize_whitespace(text)
            if text:
                clean_blocks.append({**block, "text": text})
        cleaned_pages.append({**page, "text_blocks": clean_blocks})

    return {**data, "pages": cleaned_pages}


def run(extracted_path: str | Path) -> Path:
    extracted_path = Path(extracted_path)
    data = json.loads(extracted_path.read_text(encoding="utf-8"))
    cleaned = clean_extracted(data)
    out_path = CLEANED_DIR / extracted_path.name
    out_path.write_text(json.dumps(cleaned, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Cleaned: {out_path}")
    return out_path


def run_all() -> None:
    for f in EXTRACTED_DIR.glob("*.json"):
        run(f)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        run_all()
    else:
        run(sys.argv[1])
