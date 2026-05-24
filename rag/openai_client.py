"""Централизованный OpenAI клиент с retry, timeout и graceful degradation.

Все обращения к OpenAI API должны идти через эти обёртки. Это даёт:
  • Единая точка для retry/timeout/logging
  • Graceful degradation: при сбое API возвращаем безопасный fallback,
    а не крашим весь пайплайн
  • Контроль расходов: один клиент = один счётчик/лимит

Каждый метод имеет своё дефолтное поведение при сбое — описано в docstring.
"""

import sys
import time
from pathlib import Path
from typing import Any

from openai import APIConnectionError, APIError, APITimeoutError, OpenAI, RateLimitError

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import EMBEDDING_MODEL, LLM_MODEL, OPENAI_API_KEY

# Default settings
_DEFAULT_TIMEOUT       = 30.0   # seconds per call
_DEFAULT_RETRIES       = 2      # повторов при retryable error
_DEFAULT_BACKOFF       = 1.5    # секунд между повторами (exponential)
_RETRYABLE_EXCEPTIONS  = (APIConnectionError, APITimeoutError, RateLimitError)

_client = OpenAI(api_key=OPENAI_API_KEY, timeout=_DEFAULT_TIMEOUT)


def _retry(fn, *args, **kwargs):
    """Универсальный retry с экспоненциальным backoff."""
    last_exc = None
    for attempt in range(_DEFAULT_RETRIES + 1):
        try:
            return fn(*args, **kwargs)
        except _RETRYABLE_EXCEPTIONS as e:
            last_exc = e
            if attempt < _DEFAULT_RETRIES:
                wait = _DEFAULT_BACKOFF ** attempt
                time.sleep(wait)
                continue
            raise
        except APIError as e:
            # Non-retryable API error (bad request, auth, etc.)
            raise
    raise last_exc  # unreachable


# ── Embeddings ────────────────────────────────────────────────────────────────

def embed(text: str, model: str = EMBEDDING_MODEL) -> list[float] | None:
    """Возвращает embedding-вектор или None если API недоступен."""
    try:
        response = _retry(_client.embeddings.create, model=model, input=[text])
        return response.data[0].embedding
    except Exception as e:
        print(f"[OPENAI ERROR] embed failed: {type(e).__name__}: {e}")
        return None


def embed_batch(texts: list[str], model: str = EMBEDDING_MODEL) -> list[list[float]] | None:
    """Batch embedding. Возвращает список векторов или None при ошибке."""
    if not texts:
        return []
    try:
        response = _retry(_client.embeddings.create, model=model, input=texts)
        return [r.embedding for r in response.data]
    except Exception as e:
        print(f"[OPENAI ERROR] embed_batch failed ({len(texts)} items): {type(e).__name__}: {e}")
        return None


# ── Chat completions ──────────────────────────────────────────────────────────

def chat(
    messages: list[dict[str, str]],
    model: str = LLM_MODEL,
    temperature: float = 0.1,
    max_tokens: int = 1000,
    response_format: dict | None = None,
    fallback: str = "",
) -> str:
    """Один обычный (non-streaming) chat-запрос.

    Возвращает text-content или fallback при сбое.
    """
    kwargs: dict[str, Any] = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    if response_format is not None:
        kwargs["response_format"] = response_format

    try:
        response = _retry(_client.chat.completions.create, **kwargs)
        content = response.choices[0].message.content
        return content if content is not None else fallback
    except Exception as e:
        print(f"[OPENAI ERROR] chat failed: {type(e).__name__}: {e}")
        return fallback


def chat_stream(
    messages: list[dict[str, str]],
    model: str = LLM_MODEL,
    temperature: float = 0.1,
    max_tokens: int = 1500,
    print_stream: bool = True,
) -> tuple[str, bool]:
    """Streaming chat. Возвращает (full_text, success).

    Если API упал в процессе стриминга — возвращает то что успели получить + False.
    """
    try:
        response = _retry(
            _client.chat.completions.create,
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            stream=True,
        )
        parts: list[str] = []
        for chunk in response:
            delta = chunk.choices[0].delta.content
            if delta:
                parts.append(delta)
                if print_stream:
                    print(delta, end="", flush=True)
        if print_stream:
            print()
        return "".join(parts), True
    except Exception as e:
        print(f"\n[OPENAI ERROR] chat_stream failed: {type(e).__name__}: {e}")
        return "Сервис временно недоступен. Попробуйте через минуту.", False


# Backward-compat: некоторые модули хотят сам raw client
client = _client
