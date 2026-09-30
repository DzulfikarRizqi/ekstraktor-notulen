from typing import List, Optional

from pydantic import BaseModel


# ---- Response DTO (kontrak API, camelCase) ----

class DocumentListItem(BaseModel):
    id: str
    title: str
    status: str
    truncated: bool
    createdAt: str
    storyCount: int


class SentenceDto(BaseModel):
    id: str
    index: int
    text: str


class CitationDto(BaseModel):
    id: str
    sentenceId: str
    llmVerdict: bool
    confidenceScore: Optional[float] = None
    llmReason: Optional[str] = None
    embeddingSimilarity: Optional[float] = None
    verificationStatus: str


class UserStoryDto(BaseModel):
    id: str
    storyCode: str
    actor: str
    action: str
    benefit: str
    status: str
    citations: List[CitationDto]


class DocumentDto(BaseModel):
    id: str
    title: str
    status: str
    truncated: bool
    error: Optional[str] = None
    createdAt: str
    updatedAt: str
    sentences: List[SentenceDto]
    userStories: List[UserStoryDto]


# ---- Request (dibaca manual agar pesan/status identik dengan versi TS) ----

class CreateDocument(BaseModel):
    title: Optional[str] = None
    content: str


class UpdateStory(BaseModel):
    status: Optional[str] = None
    actor: Optional[str] = None
    action: Optional[str] = None
    benefit: Optional[str] = None


class AddSource(BaseModel):
    sentenceId: str