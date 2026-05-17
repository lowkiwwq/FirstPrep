"""Миграция: ChromaDB -> FAISS.

Читает все векторы и метаданные из текущей ChromaDB-коллекции,
записывает их в FAISS-индекс. ChromaDB остаётся нетронутой (fallback).

Запуск:
    python scripts/migrate_to_faiss.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

import chromadb
from config import CHROMA_COLLECTION, CHROMA_PERSIST_DIR, FAISS_DIR
from rag.faiss_store import FAISSStore


def migrate() -> None:
    print("Читаем ChromaDB...")
    chroma = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)
    col = chroma.get_or_create_collection(name=CHROMA_COLLECTION)
    total = col.count()
    print(f"  Найдено {total} чанков")

    if total == 0:
        print("  Коллекция пустая, нечего мигрировать.")
        return

    # ChromaDB возвращает всё за один вызов (нет батчинга при чтении)
    result = col.get(include=["embeddings", "documents", "metadatas"])

    ids        = result["ids"]
    embeddings = result["embeddings"]   # list[list[float]]
    documents  = result["documents"]
    metadatas  = result["metadatas"]

    print(f"  Прочитано: {len(ids)} векторов, dim={len(embeddings[0])}")

    print("Строим FAISS-индекс...")
    store = FAISSStore(dim=len(embeddings[0]))
    store.add(ids, embeddings, documents, metadatas)
    print(f"  В индексе: {store.count} векторов")

    print(f"Сохраняем в {FAISS_DIR}...")
    store.save()
    print("  Готово: index.faiss + metadata.pkl")

    # Быстрая проверка: поиск по первому вектору должен вернуть его же
    hits = store.search(embeddings[0], top_k=1)
    if hits and hits[0]["id"] == ids[0]:
        print(f"  Проверка OK: поиск вернул id={ids[0][:30]}... similarity={hits[0]['score']:.4f}")
    else:
        print("  ВНИМАНИЕ: проверка не прошла!")

    print(f"\nМиграция завершена. {store.count} векторов в FAISS.")
    print("retriever.py автоматически переключится на FAISS при следующем запуске.")


if __name__ == "__main__":
    migrate()
