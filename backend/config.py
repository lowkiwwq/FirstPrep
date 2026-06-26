import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).parent

DATA_DIR = BASE_DIR / "data"
RAW_DIR = DATA_DIR / "raw"
EXTRACTED_DIR = DATA_DIR / "extracted"
CLEANED_DIR = DATA_DIR / "cleaned"
CHUNKS_DIR = DATA_DIR / "chunks"
IMAGES_DIR = DATA_DIR / "images"
IMAGES_ORIGINALS_DIR = IMAGES_DIR / "originals"
IMAGES_DESCRIPTIONS_DIR = IMAGES_DIR / "descriptions"
CHROMA_DIR = DATA_DIR / "chroma_db"

for d in [EXTRACTED_DIR, CLEANED_DIR, CHUNKS_DIR, IMAGES_ORIGINALS_DIR, IMAGES_DESCRIPTIONS_DIR, CHROMA_DIR]:
    d.mkdir(parents=True, exist_ok=True)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")
CHROMA_PERSIST_DIR = str(CHROMA_DIR)
CHROMA_COLLECTION = "robotics"

FAISS_DIR = DATA_DIR / "faiss_db"
FAISS_DIR.mkdir(parents=True, exist_ok=True)

SEMANTIC_CACHE_PATH      = DATA_DIR / "semantic_cache.pkl"
SEMANTIC_CACHE_MAX       = 500    # максимум записей (LRU)
SEMANTIC_CACHE_THRESHOLD = 0.92   # cosine similarity для cache hit

CHUNK_TARGET_TOKENS = 700
CHUNK_MAX_TOKENS = 1500
CHUNK_MIN_TOKENS = 200
CHUNK_OVERLAP_TOKENS = 120

RETRIEVAL_VECTOR_TOP_K = 12  # баланс скорость/качество (было 20, min 8)
RETRIEVAL_BM25_TOP_K   = 12
RETRIEVAL_FINAL_TOP_K  = 5

# Двухуровневый порог reranker (логиты cross-encoder до sigmoid)
# > HIGH  → уверенный ответ, без пометок
# LOW..HIGH → ответ с пометкой "найдено с низкой уверенностью"
# < LOW   → отказать (не по теме или реально нет в базе)
RERANK_THRESHOLD_HIGH = 0.0
RERANK_THRESHOLD_LOW  = -3.0

# Fallback: cosine distance < этого значения → similarity > 0.75
VECTOR_FALLBACK_DISTANCE = 0.25
VECTOR_FALLBACK_TOP_K    = 3
