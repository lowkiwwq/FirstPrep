"""Извлечение текста, таблиц и изображений из цифровых PDF через PyMuPDF."""

import json
import sys
from pathlib import Path

import fitz  # pymupdf

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import EXTRACTED_DIR, IMAGES_ORIGINALS_DIR


def _is_heading(block: dict, page_avg_font: float) -> bool:
    """Определяем заголовок по размеру шрифта — крупнее среднего по странице."""
    for line in block.get("lines", []):
        for span in line.get("spans", []):
            if span["size"] > page_avg_font * 1.15:
                return True
    return False


def _avg_font_size(blocks: list) -> float:
    sizes = []
    for b in blocks:
        if b["type"] != 0:
            continue
        for line in b.get("lines", []):
            for span in line.get("spans", []):
                sizes.append(span["size"])
    return sum(sizes) / len(sizes) if sizes else 12.0


def extract_pdf(pdf_path: str | Path) -> dict:
    pdf_path = Path(pdf_path)
    doc = fitz.open(str(pdf_path))
    meta = doc.metadata
    source_name = meta.get("title") or pdf_path.stem

    images_dir = IMAGES_ORIGINALS_DIR / pdf_path.stem
    images_dir.mkdir(parents=True, exist_ok=True)

    pages = []
    img_index = 0

    for page_num, page in enumerate(doc, start=1):
        blocks_raw = page.get_text("dict")["blocks"]
        avg_font = _avg_font_size(blocks_raw)

        text_blocks = []
        for b in blocks_raw:
            if b["type"] != 0:
                continue
            text = ""
            is_heading = _is_heading(b, avg_font)
            for line in b.get("lines", []):
                line_text = "".join(s["text"] for s in line.get("spans", []))
                text += line_text + "\n"
            text = text.strip()
            if text:
                text_blocks.append({"text": text, "is_heading": is_heading, "bbox": b["bbox"]})

        images = []
        for img_info in page.get_images(full=True):
            xref = img_info[0]
            try:
                pix = fitz.Pixmap(doc, xref)
                if pix.n > 4:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                img_filename = f"{pdf_path.stem}_p{page_num}_img{img_index}.png"
                img_path = images_dir / img_filename
                pix.save(str(img_path))
                images.append({"path": str(img_path), "xref": xref, "page": page_num})
                img_index += 1
                pix = None
            except Exception:
                pass

        pages.append({"page": page_num, "text_blocks": text_blocks, "images": images})

    doc.close()

    result = {
        "source": source_name,
        "file": str(pdf_path),
        "author": meta.get("author", ""),
        "pages": pages,
    }
    return result


def run(pdf_path: str | Path) -> Path:
    pdf_path = Path(pdf_path)
    result = extract_pdf(pdf_path)
    out_path = EXTRACTED_DIR / f"{pdf_path.stem}.json"
    out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Extracted: {out_path}  ({len(result['pages'])} pages)")
    return out_path


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf.py <path_to_pdf>")
        sys.exit(1)
    run(sys.argv[1])
