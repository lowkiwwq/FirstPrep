"""Роутер Phoenix AI — прямые вызовы RAG-пайплайна."""

import sys
from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel

# backend/ должен быть в sys.path чтобы работали импорты rag.* и config
_BACKEND_DIR = str(Path(__file__).parent.parent)
if _BACKEND_DIR not in sys.path:
    sys.path.insert(0, _BACKEND_DIR)

router = APIRouter(prefix="/rag", tags=["rag"])


class AskRequest(BaseModel):
    question: str


@router.post("/ask")
def ask_question(body: AskRequest):
    from rag.rag_pipeline import ask

    result = ask(body.question)
    return {
        "answer": result.get("answer", ""),
        "has_answer": result.get("has_answer", False),
        "needs_clarification": result.get("needs_clarification", False),
        "clarifying_questions": result.get("clarifying_questions", []),
        "sources": result.get("sources", []),
        "status": result.get("status", ""),
        "low_confidence": result.get("low_confidence", False),
    }
