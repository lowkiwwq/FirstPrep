"""40 разных вопросов — полные диалоги с системой."""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from rag.rag_pipeline import ask, format_response

QUESTIONS = [
    # --- Конкретные технические (en) ---
    "What is the OBELISK and where is it placed on the field?",
    "What motors are allowed for the robot?",
    "How does the scoring work in DECODE?",
    "What are the rules for ROBOT construction?",
    "What happens if a robot causes damage to the field?",

    # --- Конкретные (ru) ---
    "Что такое OBELISK?",
    "Какие моторы можно использовать?",
    "Как считаются очки в этой игре?",
    "Какие награды можно получить на соревновании?",
    "Что такое ALLIANCE и как они формируются?",

    # --- Полуконкретные (люди знают тему но формулируют грубо) ---
    "расскажи про штрафы",
    "а что там за робот нужен?",
    "про очки расскажи подробнее",
    "чё такое autonomous period?",
    "а что если робот сломался во время матча?",

    # --- Расплывчатые (система должна уточнить) ---
    "расскажи об игре",
    "Как победить?",
    "Это сложно?",
    "Что нужно сделать?",
    "Расскажи всё",

    # --- Очень короткие ---
    "штрафы?",
    "правила?",
    "награды?",
    "поле?",
    "моторы?",

    # --- «Не самые умные» / бытовой язык ---
    "ну там типа как очки зарабатываются вообще?",
    "а роботов можно из чего угодно делать или нет?",
    "если я уроню чужого робота мне что-то будет?",
    "там судьи есть? они что делают?",
    "а можно ли использовать свои самодельные детали?",

    # --- Пограничные / смешанные ---
    "расскажи про field и scoring",
    "что важнее — дизайн робота или стратегия в матче?",
    "какие ошибки чаще всего совершают команды?",
    "как долго длится матч?",
    "сколько команд играет одновременно?",

    # --- Вне домена (система должна отказать) ---
    "как приготовить борщ?",
    "кто такой Илон Маск?",
    "какая сегодня погода?",
    "напиши мне код на Python",
    "сколько стоит iPhone 15?",
]


def run_all():
    total = len(QUESTIONS)
    stats = {"answered": 0, "ambiguous": 0, "out_of_domain": 0, "no_results": 0}

    for i, question in enumerate(QUESTIONS, 1):
        print(f"\n{'='*70}")
        print(f"[{i:02d}/{total}] ВОПРОС: {question}")
        print("-" * 70)

        result = ask(question, verbose=False)
        status = result.get("status", "?")
        stats[status] = stats.get(status, 0) + 1

        if result.get("needs_clarification"):
            print(f"[СИСТЕМА УТОЧНЯЕТ] {result['answer']}")
            for j, cq in enumerate(result.get("clarifying_questions", []), 1):
                print(f"  {j}. {cq}")
        else:
            formatted = format_response(result)
            print(formatted[:700] + ("..." if len(formatted) > 700 else ""))

        print(f"\n  >> Статус: {status} | chunks_used={result.get('chunks_used', 0)}")

    print(f"\n{'='*70}")
    print("ИТОГ:")
    for k, v in stats.items():
        label = {
            "answered": "Ответил",
            "ambiguous": "Попросил уточнить",
            "out_of_domain": "Отказал (вне домена)",
            "no_results": "Не нашёл в базе",
        }.get(k, k)
        print(f"  {label}: {v}/{total}")


if __name__ == "__main__":
    run_all()
