"""Извлечение текста из HTML-файлов или веб-страниц."""

import json
import sys
from pathlib import Path

import html2text
import requests
from bs4 import BeautifulSoup

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import EXTRACTED_DIR

_NOISE_TAGS = ["script", "style", "nav", "footer", "header", "aside", "form", "noscript"]


def _fetch(source: str) -> tuple[str, str]:
    """Возвращает (html_text, source_url)."""
    if source.startswith("http://") or source.startswith("https://"):
        resp = requests.get(source, timeout=15)
        resp.raise_for_status()
        return resp.text, source
    path = Path(source)
    return path.read_text(encoding="utf-8", errors="replace"), str(path)


def extract_html(source: str) -> dict:
    html_text, url = _fetch(source)
    soup = BeautifulSoup(html_text, "html.parser")

    for tag in soup(NOISE_TAGS := _NOISE_TAGS):
        tag.decompose()

    title = soup.title.string.strip() if soup.title and soup.title.string else Path(source).stem

    converter = html2text.HTML2Text()
    converter.ignore_links = False
    converter.ignore_images = True
    converter.body_width = 0
    md_text = converter.handle(str(soup))

    paragraphs = [p.strip() for p in md_text.split("\n\n") if p.strip()]
    blocks = []
    for p in paragraphs:
        is_heading = p.startswith("#")
        blocks.append({"text": p, "is_heading": is_heading})

    return {
        "source": title,
        "file": url,
        "author": "",
        "pages": [{"page": 1, "text_blocks": blocks, "images": []}],
    }


def run(source: str) -> Path:
    result = extract_html(source)
    safe_name = result["source"][:50].replace("/", "_").replace("\\", "_")
    out_path = EXTRACTED_DIR / f"{safe_name}.json"
    out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Extracted: {out_path}")
    return out_path


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_html.py <url_or_path_to_html>")
        sys.exit(1)
    run(sys.argv[1])
