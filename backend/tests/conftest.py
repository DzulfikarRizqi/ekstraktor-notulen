import os
import sys
from pathlib import Path

# Lingkungan uji: di-set SEBELUM modul app apa pun diimpor.
os.environ["GEMINI_API_KEY"] = "test-key"
os.environ["GEMINI_MODEL"] = "gemini-2.5-flash"
os.environ["LM_STUDIO_BASE_URL"] = "http://localhost:1/v1"
os.environ["LM_STUDIO_MODEL"] = "test-model"
os.environ["USE_EMBEDDING_FALLBACK"] = "false"
os.environ["CONF_THRESHOLD"] = "0.6"
os.environ["EMBED_VERIFY_THRESHOLD"] = "0.5"

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

_TEST_DB = BACKEND_DIR / "test.db"
os.environ["DATABASE_URL"] = f"sqlite:///{_TEST_DB}"

# Ambil app setelah env ditentukan.
from app.core.config import settings  # noqa: E402

settings.conf_threshold = 0.6
settings.embed_verify_threshold = 0.5


def _clean_db() -> None:
    for suffix in ("", "-journal"):
        path = Path(f"{_TEST_DB}{suffix}")
        if path.exists():
            path.unlink()


import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.core.db import engine  # noqa: E402
from app.main import app  # noqa: E402


@pytest.fixture(scope="session")
def client():
    _clean_db()
    with TestClient(app) as c:
        yield c
    _clean_db()


@pytest.fixture(autouse=True)
def fresh_db(client):
    from app.core import models  # noqa: F401
    from sqlmodel import SQLModel

    # Setiap test dimulai dari tabel kosong.
    yield
    with engine.begin() as conn:
        for table in reversed(SQLModel.metadata.sorted_tables):
            conn.execute(table.delete())