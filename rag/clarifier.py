"""Классификатор запроса: ясный, расплывчатый, или вне домена.

Если запрос расплывчатый — возвращает 2-3 уточняющих вопроса вместо ответа.
Если вне домена — отказывает сразу, не тратя поиск.

classify_and_translate() — объединённый вызов: классификация + перевод за один
LLM-запрос вместо двух отдельных (экономия ~300ms).
"""

import json
import sys
from pathlib import Path
from typing import Literal, TypedDict

sys.path.insert(0, str(Path(__file__).parent.parent))
from rag.openai_client import chat


class ClarifierResult(TypedDict):
    status: Literal["clear", "ambiguous", "out_of_domain"]
    reason: str
    clarifying_questions: list[str]


class ClassifyTranslateResult(TypedDict):
    status: Literal["clear", "ambiguous", "out_of_domain"]
    reason: str
    clarifying_questions: list[str]
    translated: str   # English version; equals original if already English


# Универсальное описание домена — покрывает все сезоны FTC сразу
_DOMAIN_DESCRIPTION = (
    "Корпус знаний — официальная документация FIRST Tech Challenge (FTC), "
    "включая руководства соревнований нескольких сезонов (DECODE 2025-2026, "
    "INTO THE DEEP 2024-2025 и др.), мануалы по электронике REV Robotics, "
    "учебники по робототехнике. Содержит: правила игры, описание поля и игровых "
    "элементов, правила постройки и безопасности роботов, моторы и электронику, "
    "штрафы и нарушения, награды, формат турниров и MATCH'ей."
)

# Объединённый список FTC-терминов из всех сезонов и техдокументации
_FTC_TERMS = (
    "OBELISK, ARTIFACT, MOTIF, ALLIANCE, MATCH, FIELD, ROBOT, SCORING ELEMENT, TELEOP, "
    "AUTO, AUTONOMOUS, PWM, REFEREE, DRIVETEAM, FOUL, MINOR FOUL, MAJOR FOUL, PENALTY, "
    "YELLOW CARD, RED CARD, DISABLED, DISQUALIFIED, LAUNCHLINE, GOAL, RAMP, BASE ZONE, "
    "PATTERN, CLASSIFIED, OVERFLOW, ARENA, INSPECTION, PORTFOLIO, AWARDS, INSPIRE, "
    # INTO THE DEEP термины
    "SAMPLE, SPECIMEN, ASCENT, BASKET, NET ZONE, CHAMBER, RUNG, OBSERVATION ZONE, "
    "SUBMERSIBLE, "
    # Электроника / hardware
    "FTC, FIRST, andymark, goBILDA, REV Robotics, TETRIX, MATRIX, Control Hub, "
    "Expansion Hub, SPARK, SPARKmini, BLINKIN, RIOduino, MORE Board, UltraUSB, "
    "Smart Robot Servo, MINIBOT"
)


_CLASSIFY_TRANSLATE_PROMPT = """Ты — классификатор и переводчик запросов для RAG-системы. Будь МАКСИМАЛЬНО либеральным — уточнения нужны только в крайних случаях.

ДОМЕН: {domain}

Специфические термины (всегда "clear" если встречается хотя бы один):
{terms}

Правила классификации:

"clear" — назначай ПОЧТИ ВСЕГДА:
  • Есть хоть одно существительное или тема (штрафы, матч, очки, робот, моторы, судьи, моторы, контроллеры, инспекция, награды, штрафы, образцы, экземпляры, восхождение...)
  • Вопрос про длительность/количество/состав
  • Вопрос про последствия/правила ("что будет если...?", "можно ли...?")
  • Разговорный вопрос про игру/соревнование/робота
  • Технический вопрос про электронику FTC

"ambiguous" — ТОЛЬКО если буквально невозможно понять о чём вопрос:
  • "расскажи всё" / "что нужно сделать?" без контекста
  • "это сложно?" / "как победить?" без указания аспекта

"out_of_domain" — ТОЛЬКО если тема однозначно вне FTC/робототехники:
  погода, рецепты, политика, знаменитости, история, литература, медицина, финансы...
  ВАЖНО: незнакомый термин ≠ out_of_domain. Не уверен — ставь "clear".

Если "ambiguous" — сгенерируй 2-3 уточняющих вопроса на ЯЗЫКЕ ИСХОДНОГО ЗАПРОСА.

Поле "translated": переведи запрос на английский. Если запрос уже на английском — оставь без изменений. Сохрани технические термины (FOUL, ROBOT, AUTO, SAMPLE и т.п.) как есть.

ЗАПРОС: {query}

Ответь СТРОГО JSON без обёрток:
{{"status": "clear|ambiguous|out_of_domain", "reason": "краткое обоснование", "clarifying_questions": [], "translated": "English version"}}"""


def _parse_classification(raw: str, fallback_query: str) -> ClassifyTranslateResult:
    """Парсинг JSON-ответа с fallback. Изолирован для тестирования."""
    try:
        data = json.loads(raw) if raw else {}
        status = data.get("status", "clear")
        if status not in ("clear", "ambiguous", "out_of_domain"):
            status = "clear"
        translated = data.get("translated") or fallback_query
        if not isinstance(translated, str) or not translated.strip():
            translated = fallback_query
        questions = data.get("clarifying_questions") or []
        if not isinstance(questions, list):
            questions = []
        return {
            "status": status,
            "reason": str(data.get("reason", "")),
            "clarifying_questions": [str(q) for q in questions][:3],
            "translated": translated,
        }
    except (json.JSONDecodeError, AttributeError, TypeError):
        return {
            "status": "clear",
            "reason": "parse error",
            "clarifying_questions": [],
            "translated": fallback_query,
        }


def classify_and_translate(query: str) -> ClassifyTranslateResult:
    """Классификация + перевод за ОДИН LLM-вызов с retry/timeout."""
    prompt = _CLASSIFY_TRANSLATE_PROMPT.format(
        domain=_DOMAIN_DESCRIPTION,
        terms=_FTC_TERMS,
        query=query,
    )
    raw = chat(
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=400,
        response_format={"type": "json_object"},
        fallback="",
    )
    return _parse_classification(raw, fallback_query=query)


def classify(query: str) -> ClarifierResult:
    """Только классификация (для обратной совместимости)."""
    full = classify_and_translate(query)
    return {
        "status": full["status"],
        "reason": full["reason"],
        "clarifying_questions": full["clarifying_questions"],
    }
