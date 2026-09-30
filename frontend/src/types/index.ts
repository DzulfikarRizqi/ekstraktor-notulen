export interface SentenceDto {
  id: string;
  index: number;
  text: string;
}

export type VerificationStatus = "valid" | "needs_review";

export interface StorySentenceDto {
  id: string;
  sentenceId: string;
  llmVerdict: boolean;
  confidenceScore: number | null;
  llmReason: string | null;
  embeddingSimilarity: number | null;
  verificationStatus: VerificationStatus;
}

export interface UserStoryDto {
  id: string;
  storyCode: string;
  actor: string;
  action: string;
  benefit: string;
  status: "pending" | "approved" | "rejected";
  citations: StorySentenceDto[];
}

export type DocumentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export interface DocumentDto {
  id: string;
  title: string;
  status: DocumentStatus;
  truncated: boolean;
  error: string | null;
  createdAt: string;
  updatedAt: string;
  sentences: SentenceDto[];
  userStories: UserStoryDto[];
}

export interface DocumentListItem {
  id: string;
  title: string;
  status: DocumentStatus;
  truncated: boolean;
  createdAt: string;
  storyCount: number;
}

export interface ApiError {
  error: { code: string; message: string };
}

export interface ApiOk<T> {
  data: T;
}