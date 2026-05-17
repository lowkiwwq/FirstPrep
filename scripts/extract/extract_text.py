"""Извлечение текста из .txt и .md файлов."""

import json
import re
import sys
from pathlib import Path

import chardet

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import EXTRACTED_DIR


def _detect_encoding(raw: bytes) -> str:
    detected = chardet.detect(raw)
    return detected.get("encoding") or "utf-8"


def _parse_markdown(text: str) -> list[dict]:
    """Разбиваем markdown на блоки: заголовки и параграфы."""
    blocks = []
    current_lines = []
    for line in text.splitlines():
        if re.match(r"^#{1,6}\s", line):
            if current_lines:
                blocks.append({"text": "\n".join(current_lines).strip(), "is_heading": False})
                current_lines = []
            blocks.append({"text": line.strip(), "is_heading": True})
        else:
            current_lines.append(line)
    if current_lines:
        blocks.append({"text": "\n".join(current_lines).strip(), "is_heading": False})
    return [b for b in blocks if b["text"]]


def extract_text_file(file_path: str | Path) -> dict:
    file_path = Path(file_path)
    raw = file_path.read_bytes()
    encoding = _detect_encoding(raw)
    text = raw.decode(encoding, errors="replace")

    is_md = file_path.suffix.lower() == ".md"
    if is_md:
        blocks = _parse_markdown(text)
    else:
        blocks = [{"text": para.strip(), "is_heading": False}
                  for para in re.split(r"\n{2,}", text) if para.strip()]

    return {
        "source": file_path.stem,
        "file": str(file_path),
        "author": "",
        "pages": [{"page": 1, "text_blocks": blocks, "images": []}],
    }


def run(file_path: str | Path) -> Path:
    file_path = Path(file_path)
    result = extract_text_file(file_path)
    out_path = EXTRACTED_DIR / f"{file_path.stem}.json"
    out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Extracted: {out_path}")
    return out_path


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_text.py <path_to_file.txt|.md>")
        sys.exit(1)
    run(sys.argv[1])
