import type { Prisma } from "@/generated/prisma/client";
import type {
  DocumentDto,
  SentenceDto,
  StorySentenceDto,
  UserStoryDto,
} from "@/types";

type DocumentWithDetails = Prisma.DocumentGetPayload<{
  include: {
    sentences: true;
    userStories: {
      include: { storySentences: { include: { sentence: true } } };
    };
  };
}>;

const toSentenceDto = (s: { id: string; index: number; text: string }): SentenceDto => ({
  id: s.id,
  index: s.index,
  text: s.text,
});

const toCitationDto = (c: {
  id: string;
  sentenceId: string;
  llmVerdict: boolean;
  confidenceScore: number | null;
  llmReason: string | null;
  embeddingSimilarity: number | null;
  verificationStatus: string;
  sentence?: { id: string; index: number; text: string };
}): StorySentenceDto => ({
  id: c.id,
  sentenceId: c.sentenceId,
  llmVerdict: c.llmVerdict,
  confidenceScore: c.confidenceScore,
  llmReason: c.llmReason,
  embeddingSimilarity: c.embeddingSimilarity,
  verificationStatus: c.verificationStatus as StorySentenceDto["verificationStatus"],
});

const toStoryDto = (s: {
  id: string;
  storyCode: string;
  actor: string;
  action: string;
  benefit: string;
  status: string;
  storySentences: {
    id: string;
    sentenceId: string;
    llmVerdict: boolean;
    confidenceScore: number | null;
    llmReason: string | null;
    embeddingSimilarity: number | null;
    verificationStatus: string;
    sentence: { id: string; index: number; text: string };
  }[];
}): UserStoryDto => ({
  id: s.id,
  storyCode: s.storyCode,
  actor: s.actor,
  action: s.action,
  benefit: s.benefit,
  status: s.status as UserStoryDto["status"],
  citations: s.storySentences.map(toCitationDto),
});

export function toDocumentDetailDto(doc: DocumentWithDetails): DocumentDto {
  return {
    id: doc.id,
    title: doc.title,
    status: doc.status as DocumentDto["status"],
    truncated: doc.truncated,
    error: doc.error,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    sentences: doc.sentences.map(toSentenceDto),
    userStories: doc.userStories.map(toStoryDto),
  };
}