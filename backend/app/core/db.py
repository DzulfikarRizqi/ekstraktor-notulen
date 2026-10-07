from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import Session, SQLModel

from app.core.config import settings

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(
    bind=engine, class_=Session, autoflush=False, expire_on_commit=False
)


def init_db() -> None:
    # Import model agar terdaftar di metadata sebelum create_all.
    from app.core import models  # noqa: F401

    SQLModel.metadata.create_all(engine)
    _ensure_columns()


def _ensure_columns() -> None:
    with engine.connect() as conn:
        cols = {r[1] for r in conn.exec_driver_sql("PRAGMA table_info(sentences)")}
        if "is_relevant" not in cols:
            conn.exec_driver_sql(
                "ALTER TABLE sentences ADD COLUMN is_relevant BOOLEAN"
            )
            conn.commit()


def get_session() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()