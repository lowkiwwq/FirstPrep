from fastapi import APIRouter, HTTPException, Depends
from database import supabase
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
    tests = supabase.table("tests").select("*").order("id").execute()
    result = []
    for test in tests.data:
        row = dict(test)
        row["attempts_used"] = 0
        row["best_score"] = None
        row["user_status"] = "unavailable" if not test["is_available"] else "available"
        if current_user:
            attempts = supabase.table("test_attempts") \
                .select("*") \
                .eq("user_id", current_user["id"]) \
                .eq("test_id", test["id"]) \
                .execute()
            row["attempts_used"] = len(attempts.data)
            row["best_score"] = max((a["score_pct"] for a in attempts.data), default=None)
            row["user_status"] = _attempt_status(test, attempts.data)
        result.append(row)
    return result


@router.get("/tests/{test_id}/questions")
def get_questions(test_id: int, current_user=Depends(get_current_user)):
    test_res = supabase.table("tests").select("*").eq("id", test_id).execute()
    if not test_res.data:
        raise HTTPException(status_code=404, detail="Test not found")
    test = test_res.data[0]

    if not test["is_available"]:
        raise HTTPException(status_code=403, detail="Test not available")

    attempts = supabase.table("test_attempts").select("id") \
        .eq("user_id", current_user["id"]).eq("test_id", test_id).execute()
    if len(attempts.data) >= test["max_attempts"]:
        raise HTTPException(status_code=403, detail="No attempts remaining")

    questions_res = supabase.table("questions").select("*") \
        .eq("test_id", test_id).order("display_order").execute()

    result = []
    for q in questions_res.data:
        opts = supabase.table("question_options") \
            .select("id, option_text") \
            .eq("question_id", q["id"]) \
            .execute()
        result.append({
            "id": q["id"],
            "question_text": q["question_text"],
            "display_order": q["display_order"],
            "options": opts.data,
        })

    return {"test": test, "questions": result}


@router.post("/tests/{test_id}/submit")
def submit_test(test_id: int, body: SubmitRequest, current_user=Depends(get_current_user)):
    test_res = supabase.table("tests").select("*").eq("id", test_id).execute()
    if not test_res.data:
        raise HTTPException(status_code=404, detail="Test not found")
    test = test_res.data[0]

    if not test["is_available"]:
        raise HTTPException(status_code=403, detail="Test not available")

    attempts = supabase.table("test_attempts").select("id") \
        .eq("user_id", current_user["id"]).eq("test_id", test_id).execute()
    if len(attempts.data) >= test["max_attempts"]:
        raise HTTPException(status_code=403, detail="No attempts remaining")

    question_ids = [q["id"] for q in supabase.table("questions")
                    .select("id").eq("test_id", test_id).execute().data]

    correct_opts = supabase.table("question_options") \
        .select("id, question_id") \
        .eq("is_correct", True) \
        .in_("question_id", question_ids) \
        .execute()
    correct_map = {o["question_id"]: o["id"] for o in correct_opts.data}

    correct_count = sum(
        1 for a in body.answers
        if correct_map.get(a.question_id) == a.option_id
    )
    total = len(question_ids)
    score_pct = round((correct_count / total) * 100, 2) if total > 0 else 0.0
    passed = score_pct >= 60.0
    attempt_num = len(attempts.data) + 1

    supabase.table("test_attempts").insert({
        "user_id": current_user["id"],
        "test_id": test_id,
        "score_pct": score_pct,
        "passed": passed,
        "attempt_num": attempt_num,
        "answers": [{"question_id": a.question_id, "option_id": a.option_id} for a in body.answers],
    }).execute()

    return {
        "score_pct": score_pct,
        "passed": passed,
        "correct": correct_count,
        "total": total,
    }
