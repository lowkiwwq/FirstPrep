from fastapi.testclient import TestClient

import auth_utils
from main import app
import routers.auth as auth_router

client = TestClient(app)


def test_password_hash_roundtrip():
    h = auth_utils.hash_password("hunter2")
    assert h != "hunter2"
    assert auth_utils.verify_password("hunter2", h) is True
    assert auth_utils.verify_password("wrong", h) is False


def test_verify_password_handles_garbage_hash():
    assert auth_utils.verify_password("x", "not-a-bcrypt-hash") is False


def test_register_returns_decodable_token(monkeypatch):
    def fake_query_one(sql, params=None):
        if "SELECT id FROM users WHERE email" in sql:
            return None  # no existing user
        if "INSERT INTO users" in sql:
            return {"id": "11111111-1111-1111-1111-111111111111",
                    "email": params[0], "display_name": params[2]}
        raise AssertionError("unexpected query: " + sql)

    monkeypatch.setattr(auth_router, "query_one", fake_query_one)

    res = client.post("/auth/register", json={
        "name": "Ada", "email": "ada@example.com", "password": "secret123",
    })
    assert res.status_code == 200, res.text
    body = res.json()
    decoded = auth_utils.decode_access_token(body["access_token"])
    assert decoded["sub"] == "11111111-1111-1111-1111-111111111111"
    assert body["user"]["display_name"] == "Ada"


def test_register_rejects_duplicate_email(monkeypatch):
    monkeypatch.setattr(auth_router, "query_one", lambda sql, params=None: {"id": "x"})
    res = client.post("/auth/register", json={
        "name": "Ada", "email": "dup@example.com", "password": "secret123",
    })
    assert res.status_code == 400


def test_login_wrong_password_401(monkeypatch):
    stored = {
        "id": "22222222-2222-2222-2222-222222222222",
        "email": "bob@example.com",
        "password_hash": auth_utils.hash_password("correct-horse"),
        "display_name": "Bob",
    }
    monkeypatch.setattr(auth_router, "query_one", lambda sql, params=None: stored)

    ok = client.post("/auth/login", json={"email": "bob@example.com", "password": "correct-horse"})
    assert ok.status_code == 200, ok.text

    bad = client.post("/auth/login", json={"email": "bob@example.com", "password": "nope"})
    assert bad.status_code == 401


def test_protected_endpoint_rejects_bad_token():
    res = client.get("/auth/me", headers={"Authorization": "Bearer not.a.jwt"})
    assert res.status_code == 401


def test_health():
    assert client.get("/health").json() == {"status": "ok"}
