from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from deps import get_current_user

router = APIRouter()


@router.post("/lessons/{lesson_id}/complete")
def complete_lesson(lesson_id: int, current_user=Depends(get_current_user)):
    lesson_res = supabase.table("lessons").select("id, course_id").eq("id", lesson_id).execute()
    if not lesson_res.data:
        raise HTTPException(status_code=404, detail="Lesson not found")
    course_id = lesson_res.data[0]["course_id"]

    existing = supabase.table("user_lesson_progress") \
        .select("lesson_id") \
        .eq("user_id", current_user["id"]) \
        .eq("lesson_id", lesson_id) \
        .execute()

    if not existing.data:
        supabase.table("user_lesson_progress").insert({
            "user_id": current_user["id"],
            "lesson_id": lesson_id,
        }).execute()

    course_res = supabase.table("courses").select("total_lessons").eq("id", course_id).execute()
    all_lessons = supabase.table("lessons").select("id").eq("course_id", course_id).execute()
    lesson_ids = [l["id"] for l in all_lessons.data]
    done = supabase.table("user_lesson_progress") \
        .select("lesson_id") \
        .eq("user_id", current_user["id"]) \
        .in_("lesson_id", lesson_ids) \
        .execute()
    total = (course_res.data[0]["total_lessons"] if course_res.data else None) or len(lesson_ids)
    progress_pct = round((len(done.data) / total) * 100) if total > 0 else 0

    return {"lesson_id": lesson_id, "course_id": course_id, "progress_pct": progress_pct}
