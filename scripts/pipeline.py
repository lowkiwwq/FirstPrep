"""Полный пайплайн обработки данных: extract → clean → chunk → embed."""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import RAW_DIR

from scripts.clean.clean_text import run as clean
from scripts.chunk.chunker import run as chunk
from scripts.embed.embedder import load_chunks_to_chroma
from scripts.extract.extract_html import run as extract_html
from scripts.extract.extract_pdf import run as extract_pdf
from scripts.extract.extract_scan import run as extract_scan
from scripts.extract.extract_text import run as extract_text


def _refresh_faiss() -> None:
    """Перестраивает FAISS-индекс из актуального состояния ChromaDB.
    Также инвалидирует семантический кэш (db_version меняется)."""
    try:
        from scripts.migrate_to_faiss import migrate
        migrate()
        # Сбрасываем singleton чтобы retriever подхватил обновлённый индекс
        import rag.retriever as _ret
        _ret._faiss_store = None
        _ret._bm25_index = None
        # Обновляем версию БД в семантическом кэше → старые записи будут проигнорированы
        try:
            from rag.semantic_cache import get_cache
            get_cache().refresh_db_version()
            print("  [Cache] semantic cache db_version refreshed (old entries invalidated)")
        except Exception:
            pass
    except Exception as e:
        print(f"  [FAISS rebuild skipped: {e}]")


def process_file(file_path: Path, is_scan: bool = False) -> None:
    suffix = file_path.suffix.lower()
    print(f"\n=== Processing: {file_path.name} ===")

    if suffix == ".pdf":
        if is_scan:
            extracted = extract_scan(file_path)
        else:
            extracted = extract_pdf(file_path)
    elif suffix in (".txt", ".md"):
        extracted = extract_text(file_path)
    elif suffix in (".html", ".htm"):
        extracted = extract_html(str(file_path))
    else:
        print(f"  Unsupported format: {suffix}, skipping.")
        return

    cleaned = clean(extracted)
    chunks_path = chunk(cleaned)
    load_chunks_to_chroma(chunks_path)
    _refresh_faiss()
    print(f"  Done: {file_path.name}")


def run_all(scan_dir: Path | None = None) -> None:
    """Обрабатываем все файлы в data/raw/ рекурсивно."""
    extensions = {".pdf", ".txt", ".md", ".html", ".htm"}
    scan_names = {f.name for f in scan_dir.glob("*")} if scan_dir else set()

    files = [f for f in RAW_DIR.rglob("*") if f.suffix.lower() in extensions and f.is_file()]
    print(f"Found {len(files)} files to process.")

    for f in files:
        is_scan = f.name in scan_names
        try:
            process_file(f, is_scan=is_scan)
        except Exception as e:
            print(f"  ERROR processing {f.name}: {e}")

    # Финальная синхронизация FAISS после всей пакетной обработки
    print("\nПерестраиваем FAISS-индекс...")
    _refresh_faiss()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="RAG data pipeline")
    parser.add_argument("files", nargs="*", help="Specific files to process (default: all in data/raw/)")
    parser.add_argument("--scan", action="store_true", help="Treat PDF as scanned (use OCR)")
    args = parser.parse_args()

    if args.files:
        for fp in args.files:
            process_file(Path(fp), is_scan=args.scan)
    else:
        run_all()
