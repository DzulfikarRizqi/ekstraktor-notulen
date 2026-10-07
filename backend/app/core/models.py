import uuid
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Boolean, Column, Float, Integer, Text, UniqueConstraint
from sqlmodel import Field, Relationship, SQLModel


def _new_id() -> str:
    return uuid.uuid4().hex


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Document(SQLModel, table=True):
    __tablename__ = "documents"

    id: str = Field(default_factory=_new_id, primary_key=True)
    title: str = Field(default="")
    content: str = Field(default="", sa_column=Column(Text))
    status: str = Field(default="pending")  # pending | processing | completed | failed
    truncated: bool = Field(default=False)
    error: Optional[str] = Field(default=None, sa_column=Column(Text))
    created_at: datetime = Field(default_factory=_utcnow)
    updated_at: datetime = Field(default_factory=_utcnow)

    sentences: list["Sentence"] = Relationship(
        back_populates="document",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )
    user_stories: list["UserStory"] = Relationship(
        back_populates="document",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )


class Sentence(SQLModel, table=True):
    __tablename__ = "sentences"
    __table_args__ = (
        UniqueConstraint("document_id", "index", name="uq_document_index"),
    )

    id: str = Field(default_factory=_new_id, primary_key=True)
    document_id: str = Field(foreign_key="documents.id", index=True)
    index: int = Field(sa_column=Column(Integer))
    text: str = Field(sa_column=Column(Text))
    is_relevant: Optional[bool] = Field(default=None, sa_column=Column(Boolean, nullable=True))

    document: Optional[Document] = Relationship(back_populates="sentences")
    story_sentences: list["StorySentence"] = Relationship(
        back_populates="sentence"
    )


class UserStory(SQLModel, table=True):
    __tablename__ = "user_stories"

    id: str = Field(default_factory=_new_id, primary_key=True)
    document_id: str = Field(foreign_key="documents.id", index=True)
    story_code: str = Field(default="")
    actor: str = Field(default="")
    action: str = Field(default="")
    benefit: str = Field(default="")
    status: str = Field(default="pending")  # pending | approved | rejected

    document: Optional[Document] = Relationship(back_populates="user_stories")
    story_sentences: list["StorySentence"] = Relationship(
        back_populates="story",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )


class StorySentence(SQLModel, table=True):
    __tablename__ = "story_sentences"
    __table_args__ = (
        UniqueConstraint("story_id", "sentence_id", name="uq_story_sentence"),
    )

    id: str = Field(default_factory=_new_id, primary_key=True)
    story_id: str = Field(foreign_key="user_stories.id", index=True)
    sentence_id: str = Field(foreign_key="sentences.id", index=True)
    llm_verdict: bool = Field(default=False)
    confidence_score: Optional[float] = Field(default=None, sa_column=Column(Float))
    llm_reason: Optional[str] = Field(default=None, sa_column=Column(Text))
    embedding_similarity: Optional[float] = Field(
        default=None, sa_column=Column(Float)
    )
    verification_status: str = Field(default="needs_review")  # valid | needs_review

    story: Optional[UserStory] = Relationship(back_populates="story_sentences")
    sentence: Optional[Sentence] = Relationship(back_populates="story_sentences")