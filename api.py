"""FastAPI-обёртка для RAG-ассистента по робототехнике.

Endpoints:
  GET  /health      — проверка работоспособности
  POST /ask         — задать вопрос

Переменные окружения (Railway dashboard):
  OPENAI_API_KEY    — обязательно
  API_KEY           — необязательно; если задан, клиент обязан передавать
                      заголовок X-API-Key с этим значением
  ALLOWED_ORIGINS   — через запятую, напр. "https://site.com,https://www.site.com"
                      По умолчанию: * (разрешено всем)
"""

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator


# ── Startup / shutdown ────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    from rag.startup import warmup
    warmup(verbose=True)
    yield


app = FastAPI(
    title="Robotics RAG API",
    description="AI-ассистент по документации FIRST Tech Challenge",
    version="1.0.0",
    lifespan=lifespan,
)


# ── CORS ──────────────────────────────────────────────────────────────────────

_raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
_origins = [o.strip() for o in _raw_origins.split(",")] if _raw_origins != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ── Схемы ─────────────────────────────────────────────────────────────────────

class AskRequest(BaseModel):
    question: str

    @field_validator("question")
    @classmethod
    def not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("question must not be empty")
        return v.strip()


class AskResponse(BaseModel):
    answer: str
    has_answer: bool
    status: str
    needs_clarification: bool
    clarifying_questions: list[str]
    sources: list[dict]
    low_confidence: bool = False


# ── Auth helper ───────────────────────────────────────────────────────────────

def _check_api_key(x_api_key: str | None) -> None:
    required = os.getenv("API_KEY", "")
    if required and x_api_key != required:
        raise HTTPException(status_code=401, detail="Invalid or missing X-API-Key header")


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/ask", response_model=AskResponse)
def ask_endpoint(
    body: AskRequest,
    request: Request,
    x_api_key: str | None = Header(default=None),
):
    _check_api_key(x_api_key)

    from rag.rag_pipeline import ask
    from rag.rate_limiter import get_limiter

    client_ip = request.client.host if request.client else "unknown"
    limiter = get_limiter()
    ok, msg, _ = limiter.check(client_ip)
    if not ok:
        raise HTTPException(status_code=429, detail=msg)

    with limiter.concurrent_slot(client_ip):
        result = ask(body.question)

    return AskResponse(
        answer=result.get("answer", ""),
        has_answer=result.get("has_answer", False),
        status=result.get("status", "unknown"),
        needs_clarification=result.get("needs_clarification", False),
        clarifying_questions=result.get("clarifying_questions", []),
        sources=result.get("sources", []),
        low_confidence=result.get("low_confidence", False),
    )
