"""Оценка качества RAG-системы на наборе тестовых вопросов."""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from rag.rag_pipeline import ask, format_response

QUESTIONS_FILE = Path(__file__).parent / "test_questions.json"
RESULTS_FILE = Path(__file__).parent / "eval_results.json"


def run_evaluation(questions_path: Path = QUESTIONS_FILE,
                   verbose: bool = False) -> dict:
    questions = json.loads(questions_path.read_text(encoding="utf-8"))
    results = []
    correct_refusals = 0
    correct_answers = 0
    total_with_answer = 0
    total_without_answer = 0

    for q in questions:
        print(f"\n[{q['id']}] {q['type'].upper()}: {q['question']}")
        try:
            result = ask(q["question"], verbose=verbose)
            response_text = format_response(result)

            expected = q.get("expected_has_answer", True)
            actual = result["has_answer"]
            correct = expected == actual

            if expected:
                total_with_answer += 1
                if actual:
                    correct_answers += 1
            else:
                total_without_answer += 1
                if not actual:
                    correct_refusals += 1

            print(f"  has_answer={actual} (expected={expected}) | {'OK' if correct else 'FAIL'}")
            if verbose:
                print(f"  Answer: {response_text[:200]}...")

            results.append({
                **q,
                "has_answer": actual,
                "expected_has_answer": expected,
                "correct": correct,
                "candidates": result.get("candidates_count", 0),
                "chunks_used": result.get("chunks_used", 0),
                "answer_preview": result["answer"][:300],
                "sources": result.get("sources", []),
            })
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({**q, "error": str(e), "correct": False})

    total = len(questions)
    accuracy = sum(1 for r in results if r.get("correct")) / total if total else 0
    refusal_rate = correct_refusals / total_without_answer if total_without_answer else 1.0
    answer_rate = correct_answers / total_with_answer if total_with_answer else 0

    summary = {
        "total": total,
        "accuracy": round(accuracy, 3),
        "refusal_accuracy": round(refusal_rate, 3),
        "answer_accuracy": round(answer_rate, 3),
        "results": results,
    }

    RESULTS_FILE.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\n{'='*50}")
    print(f"Total questions: {total}")
    print(f"Overall accuracy: {accuracy:.1%}")
    print(f"Correct answers (has_answer=True):  {correct_answers}/{total_with_answer} ({answer_rate:.1%})")
    print(f"Correct refusals (has_answer=False): {correct_refusals}/{total_without_answer} ({refusal_rate:.1%})")
    print(f"Results saved: {RESULTS_FILE}")

    return summary


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--verbose", "-v", action="store_true")
    parser.add_argument("--questions", default=str(QUESTIONS_FILE))
    args = parser.parse_args()
    run_evaluation(Path(args.questions), verbose=args.verbose)
