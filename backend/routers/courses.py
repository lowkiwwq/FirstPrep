from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from deps import get_optional_user

router = APIRouter()


def _course_progress(user_id: str, course: dict) -> int:
    lessons = supabase.table("lessons").select("id").eq("course_id", course["id"]).execute()
    lesson_ids = [l["id"] for l in lessons.data]
    if not lesson_ids:
        return 0
    done = supabase.table("user_lesson_progress") \
        .select("lesson_id") \
        .eq("user_id", user_id) \
        .in_("lesson_id", lesson_ids) \
        .execute()
    total = course["total_lessons"] or len(lesson_ids)
    return round((len(done.data) / total) * 100) if total > 0 else 0


@router.get("/courses")
def get_courses(current_user=Depends(get_optional_user)):
    courses = supabase.table("courses").select("*").order("display_order").execute()
    result = []
    for course in courses.data:
        row = dict(course)
        row["progress_pct"] = _course_progress(current_user["id"], course) if current_user else 0
        result.append(row)
    return result


@router.get("/courses/{course_id}")
def get_course_detail(course_id: int, current_user=Depends(get_optional_user)):
    course_res = supabase.table("courses").select("*").eq("id", course_id).execute()
    if not course_res.data:
        raise HTTPException(status_code=404, detail="Course not found")
    course = course_res.data[0]

    lessons_res = supabase.table("lessons").select("*").eq("course_id", course_id).order("display_order").execute()

    completed_ids: set = set()
    if current_user and lessons_res.data:
        ids = [l["id"] for l in lessons_res.data]
        done = supabase.table("user_lesson_progress") \
            .select("lesson_id") \
            .eq("user_id", current_user["id"]) \
            .in_("lesson_id", ids) \
            .execute()
        completed_ids = {r["lesson_id"] for r in done.data}

    sections: dict = {}
    for lesson in lessons_res.data:
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
    lesson_res = supabase.table("lessons").select("*").eq("id", lesson_id).execute()
    if not lesson_res.data:
        raise HTTPException(status_code=404, detail="Lesson not found")
    lesson = dict(lesson_res.data[0])
    lesson["completed"] = False
    if current_user:
        done = supabase.table("user_lesson_progress") \
            .select("lesson_id") \
            .eq("user_id", current_user["id"]) \
            .eq("lesson_id", lesson_id) \
            .execute()
        lesson["completed"] = bool(done.data)
    return lesson
