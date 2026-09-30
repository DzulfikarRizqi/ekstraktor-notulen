import re

from app.llm.prompts import IndexedSentence


def segment_text(content: str) -> list[IndexedSentence]:
    normalized = content.replace("\r\n", "\n")
    normalized = re.sub(r"[ \t]+", " ", normalized)
    parts: list[str] = []
    for chunk in re.split(r"(?<=[.!?…])\s+", normalized.strip()):
        text = chunk.strip()
        if text:
            parts.append(text)
    return [{"index": i, "text": t} for i, t in enumerate(parts)]