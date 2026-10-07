from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import documents, stories
from app.core.db import init_db
from app.core.logging import setup_logging


@asynccontextmanager
async def lifespan(_app: FastAPI):
    setup_logging()
    init_db()
    yield


app = FastAPI(title="Ekstraktor Notulen", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router, prefix="/api")
app.include_router(stories.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}