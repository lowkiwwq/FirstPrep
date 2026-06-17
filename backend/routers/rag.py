"""Прокси-роутер к RAG-ассистенту Phoenix AI.

Переменная окружения:
  RAG_API_URL — URL задеплоенного RAG-сервиса, напр.
                https://firstprep-rag.up.railway.app
"""

import os

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/rag", tags=["rag"])


class AskRequest(BaseModel):
    question: str


@router.post("/ask")
async def ask_question(body: AskRequest):
    rag_url = os.getenv("RAG_API_URL", "").rstrip("/")
    if not rag_url:
        raise HTTPException(status_code=503, detail="RAG service not configured (set RAG_API_URL)")

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{rag_url}/ask",
                json={"question": body.question},
            )
            response.raise_for_status()
            return response.json()
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="RAG service timed out")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"RAG service returned {e.response.status_code}")
    except Exception:
        raise HTTPException(status_code=502, detail="RAG service unavailable")
