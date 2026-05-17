"""OCR для сканированных PDF через pytesseract (fallback если нет surya-ocr)."""

import json
import sys
from pathlib import Path

import fitz

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import EXTRACTED_DIR, IMAGES_ORIGINALS_DIR


def _ocr_page_image(pix: fitz.Pixmap) -> str:
    """Запускаем OCR на растровом изображении страницы."""
    try:
        import pytesseract
        from PIL import Image
        import io

        img_bytes = pix.tobytes("png")
        img = Image.open(io.BytesIO(img_bytes))
        text = pytesseract.image_to_string(img, lang="rus+eng")
        return text
    except ImportError:
        print("  pytesseract не установлен, попробуй: pip install pytesseract")
        return ""


def extract_scan(pdf_path: str | Path) -> dict:
    pdf_path = Path(pdf_path)
    doc = fitz.open(str(pdf_path))
    source_name = doc.metadata.get("title") or pdf_path.stem

    images_dir = IMAGES_ORIGINALS_DIR / pdf_path.stem
    images_dir.mkdir(parents=True, exist_ok=True)

    pages = []
    for page_num, page in enumerate(doc, start=1):
        mat = fitz.Matrix(2.0, 2.0)  # 2x upscale for better OCR
        pix = page.get_pixmap(matrix=mat)

        page_img_path = images_dir / f"{pdf_path.stem}_scan_p{page_num}.png"
        pix.save(str(page_img_path))

        text = _ocr_page_image(pix)
        pages.append({
            "page": page_num,
            "text_blocks": [{"text": text, "is_heading": False, "bbox": None}] if text.strip() else [],
            "images": [{"path": str(page_img_path), "xref": None, "page": page_num}],
        })
        pix = None
        print(f"  OCR page {page_num}/{len(doc)}", end="\r")

    doc.close()
    print()

    result = {
        "source": source_name,
        "file": str(pdf_path),
        "author": "",
        "pages": pages,
    }
    return result


def run(pdf_path: str | Path) -> Path:
    pdf_path = Path(pdf_path)
    result = extract_scan(pdf_path)
    out_path = EXTRACTED_DIR / f"{pdf_path.stem}_ocr.json"
    out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OCR extracted: {out_path}  ({len(result['pages'])} pages)")
    return out_path


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_scan.py <path_to_scan_pdf>")
        sys.exit(1)
    run(sys.argv[1])
