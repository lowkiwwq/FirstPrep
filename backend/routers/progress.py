from fastapi import APIRouter, HTTPException, Depends

from database import query, query_one, execute
from deps import get_current_user

router = APIRouter()


@router.post("/lessons/{lesson_id}/complete")
def complete_lesson(lesson_id: int, current_user=Depends(get_current_user)):
    lesson = query_one("SELECT id, course_id FROM lessons WHERE id = %s", (lesson_id,))
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    course_id = lesson["course_id"]

    execute(
        """
        INSERT INTO user_lesson_progress (user_id, lesson_id)
        VALUES (%s, %s)
        ON CONFLICT (user_id, lesson_id) DO NOTHING
        """,
        (current_user["id"], lesson_id),
    )

    course = query_one("SELECT total_lessons FROM courses WHERE id = %s", (course_id,))
    lesson_count = query_one(
        "SELECT COUNT(*) AS c FROM lessons WHERE course_id = %s", (course_id,)
    )["c"]
    done = query_one(
        """
        SELECT COUNT(*) AS c FROM user_lesson_progress ulp
        JOIN lessons l ON l.id = ulp.lesson_id
        WHERE l.course_id = %s AND ulp.user_id = %s
        """,
        (course_id, current_user["id"]),
    )["c"]
    total = (course["total_lessons"] if course else None) or lesson_count
    progress_pct = round((done / total) * 100) if total > 0 else 0

    return {"lesson_id": lesson_id, "course_id": course_id, "progress_pct": progress_pct}
