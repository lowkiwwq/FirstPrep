"""Извлечение таблиц из PDF (pdfplumber) и конвертация в текст/markdown."""

import json
import sys
from pathlib import Path

import pdfplumber

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import CLEANED_DIR


def _table_to_markdown(table: list[list]) -> str:
    if not table or not table[0]:
        return ""
    rows = [[str(c or "").strip() for c in row] for row in table]
    col_widths = [max(len(r[i]) for r in rows if i < len(r)) for i in range(len(rows[0]))]
    lines = []
    for idx, row in enumerate(rows):
        cells = [row[i].ljust(col_widths[i]) if i < len(row) else " " * col_widths[i]
                 for i in range(len(rows[0]))]
        lines.append("| " + " | ".join(cells) + " |")
        if idx == 0:
            lines.append("|" + "|".join("-" * (w + 2) for w in col_widths) + "|")
    return "\n".join(lines)


def _table_to_text(table: list[list], caption: str = "") -> str:
    """Маленькие таблицы (<=5 строк) → текстовое перечисление."""
    header = table[0] if table else []
    lines = [caption] if caption else []
    for row in table[1:]:
        for h, v in zip(header, row):
            h = str(h or "").strip()
            v = str(v or "").strip()
            if h and v:
                lines.append(f"- {h}: {v}")
    return "\n".join(lines)


def extract_tables_from_pdf(pdf_path: str | Path) -> list[dict]:
    """Возвращает список таблиц с метаданными."""
    pdf_path = Path(pdf_path)
    tables = []
    with pdfplumber.open(str(pdf_path)) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            for t in page.extract_tables():
                if not t or len(t) < 2:
                    continue
                row_count = len(t)
                if row_count <= 5:
                    text = _table_to_text(t)
                    fmt = "text"
                else:
                    text = _table_to_markdown(t)
                    fmt = "markdown"
                tables.append({
                    "page": page_num,
                    "format": fmt,
                    "content": text,
                    "raw": t,
                })
    return tables


def enrich_cleaned_with_tables(cleaned_path: str | Path, pdf_path: str | Path) -> Path:
    """Добавляем таблицы в cleaned JSON как отдельные блоки content_type=table."""
    cleaned_path = Path(cleaned_path)
    data = json.loads(cleaned_path.read_text(encoding="utf-8"))
    tables = extract_tables_from_pdf(pdf_path)

    page_tables: dict[int, list] = {}
    for t in tables:
        page_tables.setdefault(t["page"], []).append(t)

    for page in data["pages"]:
        pnum = page["page"]
        for t in page_tables.get(pnum, []):
            page["text_blocks"].append({
                "text": t["content"],
                "is_heading": False,
                "content_type": "table",
                "bbox": None,
            })

    cleaned_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Added {len(tables)} tables to {cleaned_path}")
    return cleaned_path


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python process_tables.py <cleaned.json> <original.pdf>")
        sys.exit(1)
    enrich_cleaned_with_tables(sys.argv[1], sys.argv[2])
