#!/usr/bin/env python3
"""CLI для RAG-системы по робототехнике.

Команды:
  python main.py ask "вопрос"          — задать вопрос
  python main.py process [файлы...]    — обработать данные (extract→clean→chunk→embed)
  python main.py eval                  — запустить оценку качества
  python main.py stats                 — статистика базы знаний
"""

import argparse
import sys
from pathlib import Path


def cmd_ask(args: argparse.Namespace) -> None:
    from rag.rag_pipeline import ask, format_response
    from rag.rate_limiter import get_limiter

    question = " ".join(args.question)
    print(f"\nВопрос: {question}\n")

    limiter = get_limiter()
    ok, msg, wait = limiter.check("localhost")
    if not ok:
        print(f"[RATE LIMIT] {msg}")
        return

    with limiter.concurrent_slot("localhost"):
        result = ask(question, verbose=args.verbose)
    print(format_response(result))

    # Интерактивный диалог при уточнении
    if result.get("needs_clarification") and not args.no_interactive:
        print("\nВведите уточнение (или Enter чтобы выйти):")
        try:
            clarification = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            return
        if clarification:
            combined = f"{question}\n\nУточнение: {clarification}"
            print(f"\nЗадаю уточнённый вопрос...\n")
            result2 = ask(combined, verbose=args.verbose, skip_clarifier=True)
            print(format_response(result2))


def cmd_process(args: argparse.Namespace) -> None:
    from scripts.pipeline import process_file, run_all
    if args.files:
        for fp in args.files:
            process_file(Path(fp), is_scan=args.scan)
    else:
        run_all()


def cmd_eval(args: argparse.Namespace) -> None:
    from eval.evaluate import run_evaluation
    run_evaluation(verbose=args.verbose)


def cmd_chat(args: argparse.Namespace) -> None:
    from rag.rag_pipeline import ask, format_response
    from rag.rate_limiter import get_limiter

    limiter = get_limiter()
    print("Интерактивный режим. Введите вопрос или 'выход'/'exit'/'q' для выхода.\n")

    while True:
        try:
            question = input(">>> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nВыход.")
            break

        if not question:
            continue
        if question.lower() in ("выход", "exit", "quit", "q"):
            print("Выход.")
            break

        ok, msg, _ = limiter.check("localhost")
        if not ok:
            print(f"[RATE LIMIT] {msg}\n")
            continue

        print()
        with limiter.concurrent_slot("localhost"):
            result = ask(question, verbose=args.verbose)
        print(format_response(result))
        print()


def cmd_stats(args: argparse.Namespace) -> None:
    from scripts.embed.embedder import collection_stats
    stats = collection_stats()
    print(f"ChromaDB collection: {stats['name']}")
    print(f"Total chunks: {stats['count']}")


def main() -> None:
    from rag.startup import warmup
    warmup(verbose=True)

    parser = argparse.ArgumentParser(
        description="Robotics RAG Assistant",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_ask = sub.add_parser("ask", help="Задать вопрос")
    p_ask.add_argument("question", nargs="+", help="Вопрос (можно в кавычках)")
    p_ask.add_argument("--verbose", "-v", action="store_true", help="Показать детали поиска")
    p_ask.add_argument("--no-interactive", action="store_true", help="Не запрашивать уточнения интерактивно")
    p_ask.set_defaults(func=cmd_ask)

    p_proc = sub.add_parser("process", help="Обработать файлы и загрузить в базу")
    p_proc.add_argument("files", nargs="*", help="Файлы для обработки (по умолчанию: всё в data/raw/)")
    p_proc.add_argument("--scan", action="store_true", help="PDF — скан (использовать OCR)")
    p_proc.set_defaults(func=cmd_process)

    p_eval = sub.add_parser("eval", help="Оценить качество системы")
    p_eval.add_argument("--verbose", "-v", action="store_true")
    p_eval.set_defaults(func=cmd_eval)

    p_chat = sub.add_parser("chat", help="Интерактивный режим (один запуск — много вопросов)")
    p_chat.add_argument("--verbose", "-v", action="store_true", help="Показать детали поиска")
    p_chat.set_defaults(func=cmd_chat)

    p_stats = sub.add_parser("stats", help="Статистика базы знаний")
    p_stats.set_defaults(func=cmd_stats)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
