-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "truncated" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "Sentence_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserStory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "storyCode" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserStory_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StorySentence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storyId" TEXT NOT NULL,
    "sentenceId" TEXT NOT NULL,
    "llmVerdict" BOOLEAN NOT NULL,
    "confidenceScore" REAL,
    "llmReason" TEXT,
    "embeddingSimilarity" REAL,
    "verificationStatus" TEXT NOT NULL DEFAULT 'needs_review',
    CONSTRAINT "StorySentence_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "UserStory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StorySentence_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EvaluationRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "docCount" INTEGER NOT NULL,
    "metricsJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Document_createdAt_idx" ON "Document"("createdAt");

-- CreateIndex
CREATE INDEX "Sentence_documentId_idx" ON "Sentence"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Sentence_documentId_index_key" ON "Sentence"("documentId", "index");

-- CreateIndex
CREATE INDEX "UserStory_documentId_idx" ON "UserStory"("documentId");

-- CreateIndex
CREATE INDEX "StorySentence_sentenceId_idx" ON "StorySentence"("sentenceId");

-- CreateIndex
CREATE UNIQUE INDEX "StorySentence_storyId_sentenceId_key" ON "StorySentence"("storyId", "sentenceId");
