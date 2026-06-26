import routers.courses as courses_router
from routers.courses import _course_progress


def _wire(monkeypatch, lesson_count, done_count):
    def fake_query_one(sql, params=None):
        if "FROM lessons WHERE course_id" in sql:
            return {"c": lesson_count}
        if "user_lesson_progress" in sql:
            return {"c": done_count}
        raise AssertionError("unexpected query_one: " + sql)
    monkeypatch.setattr(courses_router, "query_one", fake_query_one)


def test_progress_uses_actual_lesson_count_when_total_unset(monkeypatch):
    _wire(monkeypatch, lesson_count=5, done_count=3)
    assert _course_progress("u", {"id": 1, "total_lessons": None}) == 60


def test_progress_respects_course_total_lessons(monkeypatch):
    _wire(monkeypatch, lesson_count=5, done_count=3)
    # total_lessons=10 overrides actual count -> 3/10 = 30
    assert _course_progress("u", {"id": 1, "total_lessons": 10}) == 30


def test_progress_zero_when_no_lessons(monkeypatch):
    _wire(monkeypatch, lesson_count=0, done_count=0)
    assert _course_progress("u", {"id": 1, "total_lessons": 6}) == 0


def test_progress_rounds(monkeypatch):
    _wire(monkeypatch, lesson_count=3, done_count=1)
    # 1/3 = 33.33 -> rounds to 33
    assert _course_progress("u", {"id": 1, "total_lessons": None}) == 33
