from fastapi.testclient import TestClient

import auth_utils
from main import app
import routers.tests as tests_router
from routers.tests import _attempt_status

client = TestClient(app)
AUTH = {"Authorization": "Bearer " + auth_utils.create_access_token("user-1", "u@e.com")}


def test_attempt_status_unavailable():
    assert _attempt_status({"is_available": False, "max_attempts": 2}, []) == "unavailable"


def test_attempt_status_passed():
    test = {"is_available": True, "max_attempts": 2}
    assert _attempt_status(test, [{"passed": False}, {"passed": True}]) == "passed"


def test_attempt_status_failed_when_attempts_exhausted():
    test = {"is_available": True, "max_attempts": 2}
    assert _attempt_status(test, [{"passed": False}, {"passed": False}]) == "failed"


def test_attempt_status_available():
    test = {"is_available": True, "max_attempts": 2}
    assert _attempt_status(test, [{"passed": False}]) == "available"


def _wire_submit_db(monkeypatch, correct_option_per_question):
    """Fake DB so submit_test sees an available test, no prior attempts,
    questions 1..N, and the given correct option per question."""
    def fake_query_one(sql, params=None):
        if "FROM tests WHERE id" in sql:
            return {"id": 1, "title": "T", "is_available": True, "max_attempts": 2}
        if "COUNT(*) AS c FROM test_attempts" in sql:
            return {"c": 0}
        raise AssertionError("unexpected query_one: " + sql)

    def fake_query(sql, params=None):
        if "SELECT id FROM questions" in sql:
            return [{"id": qid} for qid in correct_option_per_question]
        if "question_options" in sql:
            return [{"id": opt, "question_id": qid}
                    for qid, opt in correct_option_per_question.items()]
        raise AssertionError("unexpected query: " + sql)

    monkeypatch.setattr(tests_router, "query_one", fake_query_one)
    monkeypatch.setattr(tests_router, "query", fake_query)
    monkeypatch.setattr(tests_router, "execute", lambda sql, params=None: None)


def test_submit_all_correct(monkeypatch):
    correct = {1: 10, 2: 20, 3: 30}  # question_id -> correct option_id
    _wire_submit_db(monkeypatch, correct)
    res = client.post("/tests/1/submit", headers=AUTH, json={
        "answers": [{"question_id": 1, "option_id": 10},
                    {"question_id": 2, "option_id": 20},
                    {"question_id": 3, "option_id": 30}],
    })
    assert res.status_code == 200, res.text
    body = res.json()
    assert body == {"score_pct": 100.0, "passed": True, "correct": 3, "total": 3}


def test_submit_partial_is_passing_boundary(monkeypatch):
    correct = {1: 10, 2: 20, 3: 30, 4: 40, 5: 50}
    _wire_submit_db(monkeypatch, correct)
    # 3/5 correct = 60.0 -> passed (>= 60)
    res = client.post("/tests/1/submit", headers=AUTH, json={
        "answers": [{"question_id": 1, "option_id": 10},
                    {"question_id": 2, "option_id": 20},
                    {"question_id": 3, "option_id": 30},
                    {"question_id": 4, "option_id": 999},
                    {"question_id": 5, "option_id": 999}],
    })
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["score_pct"] == 60.0
    assert body["passed"] is True
    assert body["correct"] == 3


def test_submit_requires_auth():
    res = client.post("/tests/1/submit", json={"answers": []})
    assert res.status_code == 401
