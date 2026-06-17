from fastapi import APIRouter, Depends
from database import supabase
from deps import get_current_user
from datetime import datetime, timezone

router = APIRouter()


@router.get("/dashboard")
def get_dashboard(current_user=Depends(get_current_user)):
    uid = current_user["id"]

    lessons_res = supabase.table("user_lesson_progress") \
        .select("lesson_id", count="exact").eq("user_id", uid).execute()
    lessons_completed = lessons_res.count or 0

    attempts_res = supabase.table("test_attempts").select("*") \
        .eq("user_id", uid).order("completed_at", desc=True).execute()
    tests_passed = len({a["test_id"] for a in attempts_res.data if a["passed"]})

    profile_res = supabase.table("profiles").select("display_name, created_at").eq("id", uid).execute()
    profile = profile_res.data[0] if profile_res.data else {}
    display_name = profile.get("display_name", current_user["email"])

    days_in_platform = 1
    if profile.get("created_at"):
        created = datetime.fromisoformat(profile["created_at"].replace("Z", "+00:00"))
        days_in_platform = max(1, (datetime.now(timezone.utc) - created).days + 1)

    courses_res = supabase.table("courses").select("*").order("display_order").execute()
    course_progress = []
    for c in courses_res.data:
        ids = [l["id"] for l in supabase.table("lessons").select("id").eq("course_id", c["id"]).execute().data]
        done_count = 0
        if ids:
            done_count = len(supabase.table("user_lesson_progress")
                            .select("lesson_id").eq("user_id", uid).in_("lesson_id", ids).execute().data)
        total = c["total_lessons"] or len(ids)
        course_progress.append({
            "id": c["id"],
            "title": c["title"],
            "progress_pct": round((done_count / total) * 100) if total > 0 else 0,
        })

    recent_attempts = []
    for a in attempts_res.data[:10]:
        test_res = supabase.table("tests").select("title").eq("id", a["test_id"]).execute()
        recent_attempts.append({
            "test_id": a["test_id"],
            "test_title": test_res.data[0]["title"] if test_res.data else "Unknown",
            "score_pct": a["score_pct"],
            "passed": a["passed"],
            "completed_at": a["completed_at"],
        })

    certs_res = supabase.table("certificates").select("*").execute()
    user_certs = {r["certificate_id"] for r in
                  supabase.table("user_certificates").select("certificate_id").eq("user_id", uid).execute().data}
    certificates = [{"id": c["id"], "name": c["name"], "earned": c["id"] in user_certs}
                    for c in certs_res.data]

    return {
        "display_name": display_name,
        "lessons_completed": lessons_completed,
        "tests_passed": tests_passed,
        "days_in_platform": days_in_platform,
        "course_progress": course_progress,
        "recent_attempts": recent_attempts,
        "certificates": certificates,
    }
