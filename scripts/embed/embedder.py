"""Создание эмбеддингов через OpenAI API и загрузка в ChromaDB."""

import json
import sys
from pathlib import Path
from typing import Any

import chromadb
from openai import OpenAI

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import (
    CHROMA_COLLECTION, CHROMA_PERSIST_DIR,
    CHUNKS_DIR, EMBEDDING_MODEL, OPENAI_API_KEY,
)

client = OpenAI(api_key=OPENAI_API_KEY)


def _get_collection() -> chromadb.Collection:
    chroma = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)
    return chroma.get_or_create_collection(
        name=CHROMA_COLLECTION,
        metadata={"hnsw:space": "cosine"},
    )


def _embed_batch(texts: list[str]) -> list[list[float]]:
    response = client.embeddings.create(model=EMBEDDING_MODEL, input=texts)
    return [r.embedding for r in response.data]


def _sanitize_metadata(meta: dict) -> dict:
    """ChromaDB принимает только str/int/float/bool в метаданных."""
    clean = {}
    for k, v in meta.items():
        if isinstance(v, (str, int, float, bool)):
            clean[k] = v
        elif isinstance(v, list):
            clean[k] = ", ".join(str(x) for x in v)
        elif v is None:
            clean[k] = ""
        else:
            clean[k] = str(v)
    return clean


def load_chunks_to_chroma(chunks_path: str | Path, batch_size: int = 100) -> int:
    chunks_path = Path(chunks_path)
    chunks: list[dict] = json.loads(chunks_path.read_text(encoding="utf-8"))
    if not chunks:
        print(f"No chunks in {chunks_path}")
        return 0

    collection = _get_collection()

    existing_ids = set(collection.get(ids=[c["id"] for c in chunks])["ids"])
    new_chunks = [c for c in chunks if c["id"] not in existing_ids]

    if not new_chunks:
        print(f"All {len(chunks)} chunks already in DB, skipping.")
        return 0

    total = 0
    for i in range(0, len(new_chunks), batch_size):
        batch = new_chunks[i : i + batch_size]
        texts = [c["content"] for c in batch]
        ids = [c["id"] for c in batch]
        metadatas = [_sanitize_metadata(c["metadata"]) for c in batch]

        print(f"  Embedding batch {i // batch_size + 1}/{(len(new_chunks) - 1) // batch_size + 1}...", end="\r")
        embeddings = _embed_batch(texts)

        collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=texts,
            metadatas=metadatas,
        )
        total += len(batch)

    print(f"\nLoaded {total} new chunks from {chunks_path.name}")
    return total


def load_all() -> None:
    total = 0
    for f in CHUNKS_DIR.glob("*.json"):
        total += load_chunks_to_chroma(f)
    print(f"\nTotal loaded: {total} chunks")


def collection_stats() -> dict[str, Any]:
    col = _get_collection()
    return {"count": col.count(), "name": col.name}


if __name__ == "__main__":
    if len(sys.argv) < 2:
        load_all()
    else:
        load_chunks_to_chroma(sys.argv[1])
    print("Stats:", collection_stats())
