"""PostgreSQL access layer (Railway).

Replaces the Supabase client. Exposes a tiny query helper API used by the
routers:

    query(sql, params)      -> list[dict]   (all rows)
    query_one(sql, params)  -> dict | None   (first row)
    execute(sql, params)    -> None          (write, no result needed)

A single psycopg connection pool is created from DATABASE_URL. Rows come back
as plain dicts (psycopg ``dict_row`` factory) so router code can treat them
like the old Supabase ``.data`` rows.
"""

import os

from dotenv import load_dotenv
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL must be set (Railway Postgres connection string)")

# Railway sometimes provides the URL with the "postgres://" scheme; psycopg
# wants "postgresql://". Normalise it so either works.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = "postgresql://" + DATABASE_URL[len("postgres://"):]

_pool: ConnectionPool | None = None


def _get_pool() -> ConnectionPool:
    """Lazily create the connection pool on first use.

    Lazy creation keeps imports cheap and lets tests monkeypatch the query
    helpers below without ever opening a real connection.
    """
    global _pool
    if _pool is None:
        _pool = ConnectionPool(
            conninfo=DATABASE_URL,
            min_size=1,
            max_size=10,
            kwargs={"row_factory": dict_row},
            open=True,
        )
    return _pool


def query(sql: str, params: tuple | list | None = None) -> list[dict]:
    """Run a SELECT and return all rows as dicts."""
    with _get_pool().connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            return cur.fetchall()


def query_one(sql: str, params: tuple | list | None = None) -> dict | None:
    """Run a SELECT and return the first row (or None)."""
    with _get_pool().connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            return cur.fetchone()


def execute(sql: str, params: tuple | list | None = None) -> None:
    """Run a write statement. Commit is automatic on context exit."""
    with _get_pool().connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)
