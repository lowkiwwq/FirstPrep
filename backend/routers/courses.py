from fastapi import APIRouter, HTTPException, Depends

from database import query, query_one
from deps import get_optional_user

router = APIRouter()


def _course_progress(user_id: str, course: dict) -> int:
    lessons_count = query_one(
        "SELECT COUNT(*) AS c FROM lessons WHERE course_id = %s", (course["id"],)
    )["c"]
    if not lessons_count:
        return 0
    done = query_one(
        """
        SELECT COUNT(*) AS c
        FROM user_lesson_progress ulp
        JOIN lessons l ON l.id = ulp.lesson_id
        WHERE l.course_id = %s AND ulp.user_id = %s
        """,
        (course["id"], user_id),
    )["c"]
    total = course["total_lessons"] or lessons_count
    return round((done / total) * 100) if total > 0 else 0


@router.get("/courses")
def get_courses(current_user=Depends(get_optional_user)):
    courses = query("SELECT * FROM courses ORDER BY display_order")
    result = []
    for course in courses:
        row = dict(course)
        row["progress_pct"] = _course_progress(current_user["id"], course) if current_user else 0
        result.append(row)
    return result


@router.get("/courses/{course_id}")
def get_course_detail(course_id: int, current_user=Depends(get_optional_user)):
    course = query_one("SELECT * FROM courses WHERE id = %s", (course_id,))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    lessons = query(
        "SELECT * FROM lessons WHERE course_id = %s ORDER BY display_order", (course_id,)
    )

    completed_ids: set = set()
    if current_user and lessons:
        ids = [l["id"] for l in lessons]
        done = query(
            """
            SELECT lesson_id FROM user_lesson_progress
            WHERE user_id = %s AND lesson_id = ANY(%s)
            """,
            (current_user["id"], ids),
        )
        completed_ids = {r["lesson_id"] for r in done}

    sections: dict = {}
    for lesson in lessons:
        sec = lesson["section_num"]
        sections.setdefault(sec, [])
        sections[sec].append({**lesson, "completed": lesson["id"] in completed_ids})

    progress_pct = _course_progress(current_user["id"], course) if current_user else 0

    return {
        **course,
        "progress_pct": progress_pct,
        "sections": [{"section_num": k, "lessons": v} for k, v in sorted(sections.items())],
    }


@router.get("/lessons/{lesson_id}")
def get_lesson(lesson_id: int, current_user=Depends(get_optional_user)):
    lesson = query_one("SELECT * FROM lessons WHERE id = %s", (lesson_id,))
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    lesson = dict(lesson)
    lesson["completed"] = False
    if current_user:
        done = query_one(
            """
            SELECT lesson_id FROM user_lesson_progress
            WHERE user_id = %s AND lesson_id = %s
            """,
            (current_user["id"], lesson_id),
        )
        lesson["completed"] = bool(done)
    return lesson
