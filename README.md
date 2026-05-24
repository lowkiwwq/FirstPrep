# Robotics RAG Assistant

Production-ready Retrieval-Augmented Generation system for FIRST Tech Challenge (FTC) technical documentation. Answers user questions strictly from internal knowledge base, minimizing LLM hallucinations.

## Features

- **Hybrid retrieval**: FAISS dense vector search + BM25 lexical search
- **Cross-encoder reranking** with dual confidence threshold (high / low / filtered)
- **Query understanding**: classification (clear / ambiguous / out-of-domain) + translation + HyDE + paraphrasing — all in parallel
- **Multi-season aware**: handles DECODE 2025-26, INTO THE DEEP 2024-25, plus REV Robotics hardware manuals
- **Semantic answer cache** with automatic invalidation when the database changes
- **Multilingual**: accepts Russian and English questions on English corpus
- **Source attribution** on every answer: document, section, page range
- **Rate limiting**: 10 req/min per IP + 3 concurrent global
- **Graceful degradation** on OpenAI API failures
- **34 unit tests + 11 integration tests** covering all critical paths

## Architecture

```
User question
    ↓
┌── Semantic cache check (< 1ms) ───┐
│                                   │  hit → instant answer
└───────── miss ────────────────────┘
    ↓
┌── Parallel wave 1 ────────────────────────────────────┐
│  • classify + translate (1 LLM call)                  │
│  • HyDE + paraphrase    (1 LLM call)                  │
│  • main hybrid search   (FAISS + BM25)                │
└───────────────────────────────────────────────────────┘
    ↓
Translated search (if RU input)
    ↓
Paraphrase searches (skipped on strong primary hits)
    ↓
Cross-encoder reranking (dual threshold)
    ↓
Streaming answer generation (with source citations)
    ↓
Save to semantic cache
```

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
# Edit .env: add OPENAI_API_KEY
```

## Usage

```bash
# Single question
python main.py ask "What is a MAJOR FOUL?"

# Interactive chat (one warmup, many questions)
python main.py chat

# Process new documents
python main.py process

# DB statistics
python main.py stats
```

## Tests

```bash
# Unit tests (no API calls)
python -m unittest tests.test_unit -v

# Integration tests (uses OpenAI API)
python -m unittest tests.test_integration -v
```

## Stack

Python 3.14 · OpenAI API · FAISS · sentence-transformers · rank-bm25 · PyMuPDF · Tesseract OCR
