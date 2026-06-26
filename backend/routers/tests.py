from fastapi import APIRouter, HTTPException, Depends
from psycopg.types.json import Json

from database import query, query_one, execute
from deps import get_current_user, get_optional_user
from models.test import SubmitRequest

router = APIRouter()


def _attempt_status(test: dict, attempts: list) -> str:
    if not test["is_available"]:
        return "unavailable"
    if any(a["passed"] for a in attempts):
        return "passed"
    if len(attempts) >= test["max_attempts"]:
        return "failed"
    return "available"


@router.get("/tests")
def get_tests(current_user=Depends(get_optional_user)):
    tests = query("SELECT * FROM tests ORDER BY id")
    result = []
    for test in tests:
        row = dict(test)
        row["attempts_used"] = 0
        row["best_score"] = None
        row["user_status"] = "unavailable" if not test["is_available"] else "available"
        if current_user:
            attempts = query(
                "SELECT passed, score_pct::float AS score_pct FROM test_attempts "
                "WHERE user_id = %s AND test_id = %s",
                (current_user["id"], test["id"]),
            )
            row["attempts_used"] = len(attempts)
            row["best_score"] = max((a["score_pct"] for a in attempts), default=None)
            row["user_status"] = _attempt_status(test, attempts)
        result.append(row)
    return result


@router.get("/tests/{test_id}/questions")
def get_questions(test_id: int, current_user=Depends(get_current_user)):
    test = query_one("SELECT * FROM tests WHERE id = %s", (test_id,))
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")

    if not test["is_available"]:
        raise HTTPException(status_code=403, detail="Test not available")

    attempts_used = query_one(
        "SELECT COUNT(*) AS c FROM test_attempts WHERE user_id = %s AND test_id = %s",
        (current_user["id"], test_id),
    )["c"]
    if attempts_used >= test["max_attempts"]:
        raise HTTPException(status_code=403, detail="No attempts remaining")

    questions = query(
        "SELECT * FROM questions WHERE test_id = %s ORDER BY display_order", (test_id,)
    )

    result = []
    for q in questions:
        opts = query(
            "SELECT id, option_text FROM question_options WHERE question_id = %s",
            (q["id"],),
        )
        result.append({
            "id": q["id"],
            "question_text": q["question_text"],
            "display_order": q["display_order"],
            "options": opts,
        })

    return {"test": test, "questions": result}


@router.post("/tests/{test_id}/submit")
def submit_test(test_id: int, body: SubmitRequest, current_user=Depends(get_current_user)):
    test = query_one("SELECT * FROM tests WHERE id = %s", (test_id,))
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")

    if not test["is_available"]:
        raise HTTPException(status_code=403, detail="Test not available")

    attempts_used = query_one(
        "SELECT COUNT(*) AS c FROM test_attempts WHERE user_id = %s AND test_id = %s",
        (current_user["id"], test_id),
    )["c"]
    if attempts_used >= test["max_attempts"]:
        raise HTTPException(status_code=403, detail="No attempts remaining")

    question_ids = [
        q["id"] for q in query("SELECT id FROM questions WHERE test_id = %s", (test_id,))
    ]

    correct_opts = query(
        "SELECT id, question_id FROM question_options "
        "WHERE is_correct = TRUE AND question_id = ANY(%s)",
        (question_ids,),
    )
    correct_map = {o["question_id"]: o["id"] for o in correct_opts}

    correct_count = sum(
        1 for a in body.answers
        if correct_map.get(a.question_id) == a.option_id
    )
    total = len(question_ids)
    score_pct = round((correct_count / total) * 100, 2) if total > 0 else 0.0
    passed = score_pct >= 60.0
    attempt_num = attempts_used + 1

    execute(
        """
        INSERT INTO test_attempts (user_id, test_id, score_pct, passed, attempt_num, answers)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            current_user["id"],
            test_id,
            score_pct,
            passed,
            attempt_num,
            Json([{"question_id": a.question_id, "option_id": a.option_id} for a in body.answers]),
        ),
    )

    return {
        "score_pct": score_pct,
        "passed": passed,
        "correct": correct_count,
        "total": total,
    }
