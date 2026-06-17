"""Apply schema.sql (idempotent) and seed.sql (only if empty) to a Postgres DB.

Usage:
    python db/apply.py                 # uses DATABASE_URL from env / .env
    python db/apply.py "<conn-url>"    # explicit connection string

Run once after provisioning the database (locally or against Railway via the
public proxy URL).
"""

import os
import sys
from pathlib import Path

import psycopg
from dotenv import load_dotenv

HERE = Path(__file__).resolve().parent


def _statements(sql: str):
    """Yield individual SQL statements. Statements are ';'-terminated; our
    .sql files never contain ';' inside string literals, so a simple split is
    safe. PostgreSQL ignores leading '--' line comments within a chunk."""
    for chunk in sql.split(";"):
        if chunk.strip():
            yield chunk


def main():
    load_dotenv()
    url = sys.argv[1] if len(sys.argv) > 1 else os.getenv("DATABASE_URL")
    if not url:
        sys.exit("No connection string: pass one as an argument or set DATABASE_URL")

    schema = (HERE / "schema.sql").read_text(encoding="utf-8")
    seed = (HERE / "seed.sql").read_text(encoding="utf-8")

    with psycopg.connect(url, connect_timeout=30, autocommit=True) as conn:
        with conn.cursor() as cur:
            for stmt in _statements(schema):
                cur.execute(stmt)
            print("schema applied")

            cur.execute("SELECT COUNT(*) FROM courses")
            if cur.fetchone()[0] == 0:
                for stmt in _statements(seed):
                    cur.execute(stmt)
                print("seed applied")
            else:
                print("seed skipped (courses already populated)")


if __name__ == "__main__":
    main()
