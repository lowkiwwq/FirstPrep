"""Password hashing (bcrypt) and JWT issuing/decoding.

Self-contained replacement for Supabase Auth. Tokens are signed with our own
JWT_SECRET (HS256) and carry the user id in ``sub`` plus ``email``.
"""

import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

JWT_SECRET = os.getenv("JWT_SECRET", "dev-insecure-secret-change-me")
JWT_ALGORITHM = "HS256"
TOKEN_TTL = timedelta(days=7)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    except (ValueError, TypeError):
        return False


def create_access_token(user_id: str, email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "email": email,
        "iat": now,
        "exp": now + TOKEN_TTL,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Decode and validate a token. Raises jwt exceptions on failure."""
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
