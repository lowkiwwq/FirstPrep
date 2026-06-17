"""Test config: set required env BEFORE the app modules import.

database.py raises if DATABASE_URL is missing, and auth_utils reads JWT_SECRET
at import time. We set both here. The connection pool is created lazily, so no
real database connection is ever opened — tests monkeypatch the query helpers.
"""

import os
import sys
from pathlib import Path

os.environ.setdefault("DATABASE_URL", "postgresql://test:test@localhost:5432/test")
os.environ.setdefault("JWT_SECRET", "test-secret")

# Make the backend package root importable (mirrors how it runs on Railway,
# where uvicorn is launched from inside backend/).
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
