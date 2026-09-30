from app.core.models import Document, StorySentence, UserStory
from app.core.schemas import (
    CitationDto,
    DocumentDto,
    SentenceDto,
    UserStoryDto,
)


def to_document_dto(doc: Document) -> DocumentDto:
    sentences = [SentenceDto(id=s.id, index=s.index, text=s.text)
                 for s in sorted(doc.sentences, key=lambda x: x.index)]
    stories = [to_story_dto(s)
               for s in sorted(doc.user_stories, key=lambda x: x.story_code)]
    return DocumentDto(
        id=doc.id,
        title=doc.title,
        status=doc.status,
        truncated=doc.truncated,
        error=doc.error,
        createdAt=doc.created_at.isoformat(),
        updatedAt=doc.updated_at.isoformat(),
        sentences=sentences,
        userStories=stories,
    )


def to_story_dto(story: UserStory) -> UserStoryDto:
    return UserStoryDto(
        id=story.id,
        storyCode=story.story_code,
        actor=story.actor,
        action=story.action,
        benefit=story.benefit,
        status=story.status,
        citations=[to_citation_dto(c) for c in story.story_sentences],
    )


def to_citation_dto(c: StorySentence) -> CitationDto:
    return CitationDto(
        id=c.id,
        sentenceId=c.sentence_id,
        llmVerdict=c.llm_verdict,
        confidenceScore=c.confidence_score,
        llmReason=c.llm_reason,
        embeddingSimilarity=c.embedding_similarity,
        verificationStatus=c.verification_status,
    )