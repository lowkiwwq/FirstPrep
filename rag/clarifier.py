"""Классификатор запроса: ясный, расплывчатый, или вне домена.

Если запрос расплывчатый — возвращает 2-3 уточняющих вопроса вместо ответа.
Если вне домена — отказывает сразу, не тратя поиск.

classify_and_translate() — объединённый вызов: классификация + перевод за один
LLM-запрос вместо двух отдельных (экономия ~300ms).
"""

import json
import re
import sys
from pathlib import Path
from typing import Literal, TypedDict

from openai import OpenAI

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import LLM_MODEL, OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)


class ClarifierResult(TypedDict):
    status: Literal["clear", "ambiguous", "out_of_domain"]
    reason: str
    clarifying_questions: list[str]


_DOMAIN_DESCRIPTION = (
    "Корпус знаний — официальное руководство соревнования FIRST Tech Challenge "
    "DECODE 2025-2026. Содержит: правила игры, описание поля и SCORING ELEMENTS, "
    "правила постройки и безопасности роботов, моторы и электронику, штрафы и "
    "нарушения, награды, формат турниров и MATCH'ей."
)

_CLASSIFY_PROMPT = """Ты — классификатор запросов для RAG-системы. Будь МАКСИМАЛЬНО либеральным — уточнения нужны только в крайних случаях.

ДОМЕН: {domain}

Специфические термины этого домена (всегда "clear" если встречается хотя бы один):
OBELISK, ARTIFACT, MOTIF, ALLIANCE, MATCH, FIELD, ROBOT, SCORING ELEMENT, TELEOP, AUTO,
AUTONOMOUS, PWM, REFEREE, DRIVETEAM, FOUL, PENALTY, YELLOW CARD, RED CARD, DISABLED,
DISQUALIFIED, LAUNCHLINE, GOAL, RAMP, PATTERN, CLASSIFIED, OVERFLOW, ARENA, INSPECTION,
PORTFOLIO, AWARDS, INSPIRE, FTC, FIRST, andymark, goBILDA, REV Robotics, TETRIX, MATRIX

Правила классификации:

"clear" — назначай ПОЧТИ ВСЕГДА. Любой из этих признаков достаточен:
  • Любое слово из списка терминов выше (в любом регистре)
  • Есть хоть одно существительное или тема (штрафы, матч, очки, робот, поле, судьи, детали, моторы, награды, правила, команда, матч, инспекция...)
  • Вопрос про длительность/количество/состав ("сколько команд?", "как долго матч?")
  • Вопрос про последствия/правила ("что будет если...?", "можно ли...?")
  • Разговорный вопрос про игру/соревнование ("там судьи есть?", "а что если я уроню?")

"ambiguous" — ТОЛЬКО если буквально невозможно понять о чём вопрос (нет ни одной темы):
  • "расскажи всё" / "расскажи об игре" / "что нужно сделать?" без контекста
  • "это сложно?" / "как победить?" — без указания аспекта
  • "что происходит?" / "ну и как?" / "расскажи всё"

"out_of_domain" — ТОЛЬКО если тема однозначно вне FTC-соревнования:
  погода, рецепты, политика, знаменитости, цены на потребтовары, история, литература...
  ВАЖНО: незнакомый термин ≠ out_of_domain. Если не уверен — выбирай "clear".

Если "ambiguous" — сгенерируй 2-3 уточняющих вопроса на ЯЗЫКЕ ИСХОДНОГО ЗАПРОСА.

ЗАПРОС: {query}

Ответь СТРОГО JSON без обёрток:
{{"status": "clear|ambiguous|out_of_domain", "reason": "краткое обоснование", "clarifying_questions": ["вопрос 1", "вопрос 2"]}}

Для "clear" и "out_of_domain" поле clarifying_questions = []."""


def _heuristic_check(query: str) -> str | None:
    """Быстрая эвристика — если очевидно расплывчатый, возвращаем 'ambiguous' без LLM."""
    q = query.strip().lower()
    words = q.split()
    if len(words) <= 2:
        return "ambiguous"
    return None


class ClassifyTranslateResult(TypedDict):
    status: Literal["clear", "ambiguous", "out_of_domain"]
    reason: str
    clarifying_questions: list[str]
    translated: str   # English version; equals original if already English


_CLASSIFY_TRANSLATE_PROMPT = """Ты — классификатор и переводчик запросов для RAG-системы. Будь МАКСИМАЛЬНО либеральным — уточнения нужны только в крайних случаях.

ДОМЕН: {domain}

Специфические термины (всегда "clear" если встречается хотя бы один):
OBELISK, ARTIFACT, MOTIF, ALLIANCE, MATCH, FIELD, ROBOT, SCORING ELEMENT, TELEOP, AUTO,
AUTONOMOUS, PWM, REFEREE, DRIVETEAM, FOUL, PENALTY, YELLOW CARD, RED CARD, DISABLED,
DISQUALIFIED, LAUNCHLINE, GOAL, RAMP, PATTERN, CLASSIFIED, OVERFLOW, ARENA, INSPECTION,
PORTFOLIO, AWARDS, INSPIRE, FTC, FIRST, andymark, goBILDA, REV Robotics, TETRIX, MATRIX

Правила классификации:

"clear" — назначай ПОЧТИ ВСЕГДА:
  • Есть хоть одно существительное или тема (штрафы, матч, очки, робот, моторы, судьи...)
  • Вопрос про длительность/количество/состав
  • Вопрос про последствия/правила ("что будет если...?", "можно ли...?")
  • Разговорный вопрос про игру/соревнование

"ambiguous" — ТОЛЬКО если буквально невозможно понять о чём вопрос:
  • "расскажи всё" / "что нужно сделать?" без контекста
  • "это сложно?" / "как победить?" без указания аспекта

"out_of_domain" — ТОЛЬКО если тема однозначно вне FTC:
  погода, рецепты, политика, знаменитости, история, литература...
  ВАЖНО: незнакомый термин ≠ out_of_domain. Не уверен — ставь "clear".

Если "ambiguous" — сгенерируй 2-3 уточняющих вопроса на ЯЗЫКЕ ИСХОДНОГО ЗАПРОСА.

Поле "translated": переведи запрос на английский. Если запрос уже на английском — оставь без изменений. Сохрани технические термины (FOUL, ROBOT, AUTO и т.п.) как есть.

ЗАПРОС: {query}

Ответь СТРОГО JSON без обёрток:
{{"status": "clear|ambiguous|out_of_domain", "reason": "краткое обоснование", "clarifying_questions": [], "translated": "English version"}}"""


def classify_and_translate(query: str) -> ClassifyTranslateResult:
    """Классификация + перевод за ОДИН LLM-вызов."""
    prompt = _CLASSIFY_TRANSLATE_PROMPT.format(domain=_DOMAIN_DESCRIPTION, query=query)
    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=400,
        response_format={"type": "json_object"},
    )
    raw = response.choices[0].message.content
    try:
        data = json.loads(raw)
        status = data.get("status", "clear")
        if status not in ("clear", "ambiguous", "out_of_domain"):
            status = "clear"
        translated = data.get("translated") or query
        return {
            "status": status,
            "reason": data.get("reason", ""),
            "clarifying_questions": data.get("clarifying_questions", []) or [],
            "translated": translated,
        }
    except (json.JSONDecodeError, AttributeError):
        return {"status": "clear", "reason": "parse error",
                "clarifying_questions": [], "translated": query}


def classify(query: str) -> ClarifierResult:
    """Классифицируем запрос. Использует LLM."""
    prompt = _CLASSIFY_PROMPT.format(domain=_DOMAIN_DESCRIPTION, query=query)

    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=400,
        response_format={"type": "json_object"},
    )
    raw = response.choices[0].message.content

    try:
        data = json.loads(raw)
        status = data.get("status", "clear")
        if status not in ("clear", "ambiguous", "out_of_domain"):
            status = "clear"
        return {
            "status": status,
            "reason": data.get("reason", ""),
            "clarifying_questions": data.get("clarifying_questions", []) or [],
        }
    except (json.JSONDecodeError, AttributeError):
        # Если LLM сломался — пропускаем как clear
        return {"status": "clear", "reason": "parse error", "clarifying_questions": []}
