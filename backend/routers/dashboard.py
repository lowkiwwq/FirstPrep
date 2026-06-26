from fastapi import APIRouter, Depends
from datetime import datetime, timezone

from database import query, query_one
from deps import get_current_user

router = APIRouter()


@router.get("/dashboard")
def get_dashboard(current_user=Depends(get_current_user)):
    uid = current_user["id"]

    lessons_completed = query_one(
        "SELECT COUNT(*) AS c FROM user_lesson_progress WHERE user_id = %s", (uid,)
    )["c"]

    tests_passed = query_one(
        "SELECT COUNT(DISTINCT test_id) AS c FROM test_attempts WHERE user_id = %s AND passed = TRUE",
        (uid,),
    )["c"]

    user = query_one("SELECT display_name, created_at FROM users WHERE id = %s", (uid,))
    display_name = user["display_name"] if user else current_user["email"]

    days_in_platform = 1
    if user and user["created_at"]:
        days_in_platform = max(1, (datetime.now(timezone.utc) - user["created_at"]).days + 1)

    courses = query(
        """
        SELECT c.id, c.title, c.total_lessons,
               (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count,
               (SELECT COUNT(*) FROM user_lesson_progress ulp
                JOIN lessons l ON l.id = ulp.lesson_id
                WHERE l.course_id = c.id AND ulp.user_id = %s) AS done_count
        FROM courses c
        ORDER BY c.display_order
        """,
        (uid,),
    )
    course_progress = []
    for c in courses:
        total = c["total_lessons"] or c["lesson_count"]
        course_progress.append({
            "id": c["id"],
            "title": c["title"],
            "progress_pct": round((c["done_count"] / total) * 100) if total > 0 else 0,
        })

    recent_attempts = query(
        """
        SELECT ta.test_id, t.title AS test_title, ta.score_pct::float AS score_pct,
               ta.passed, ta.completed_at
        FROM test_attempts ta
        JOIN tests t ON t.id = ta.test_id
        WHERE ta.user_id = %s
        ORDER BY ta.completed_at DESC
        LIMIT 10
        """,
        (uid,),
    )

    certs = query("SELECT id, name FROM certificates")
    user_certs = {
        r["certificate_id"]
        for r in query("SELECT certificate_id FROM user_certificates WHERE user_id = %s", (uid,))
    }
    certificates = [{"id": c["id"], "name": c["name"], "earned": c["id"] in user_certs}
                    for c in certs]

    return {
        "display_name": display_name,
        "lessons_completed": lessons_completed,
        "tests_passed": tests_passed,
        "days_in_platform": days_in_platform,
        "course_progress": course_progress,
        "recent_attempts": recent_attempts,
        "certificates": certificates,
    }
