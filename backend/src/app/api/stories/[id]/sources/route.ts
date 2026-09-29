import { z } from "zod";
import { db } from "@/lib/db";
import { config } from "@/lib/config";
import { embedTexts } from "@/lib/embedding/embedder";
import { cosineSimilarity } from "@/lib/embedding/similarity";
import { badRequest, conflict, notFound } from "@/lib/http";

const createSchema = z.object({
  sentenceId: z.string().min(1),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const story = await db.userStory.findUnique({ where: { id } });
  if (!story) {
    return notFound("User story tidak ditemukan.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Body harus berupa JSON.");
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Field 'sentenceId' wajib diisi.");
  }

  const sentence = await db.sentence.findFirst({
    where: { id: parsed.data.sentenceId, documentId: story.documentId },
  });
  if (!sentence) {
    return badRequest("Kalimat tidak dikenal dalam dokumen ini.");
  }

  const existing = await db.storySentence.findUnique({
    where: { storyId_sentenceId: { storyId: story.id, sentenceId: sentence.id } },
  });
  if (existing) {
    return conflict("Tautan kalimat sudah ada.");
  }

  let similarity: number | null = null;
  if (config.USE_EMBEDDING_FALLBACK) {
    try {
      const [storyVec, sentenceVec] = await embedTexts([
        `query: ${story.actor} ${story.action} ${story.benefit}`,
        `passage: ${sentence.text}`,
      ]);
      similarity = cosineSimilarity(storyVec, sentenceVec);
    } catch (e) {
      console.warn("[sources] embedding gagal, simpan tanpa similarity:", e);
    }
  }

  const link = await db.storySentence.create({
    data: {
      storyId: story.id,
      sentenceId: sentence.id,
      llmVerdict: false,
      llmReason: "Sumber ditambahkan manual (perlu review).",
      confidenceScore: null,
      embeddingSimilarity: similarity,
      verificationStatus: "needs_review",
    },
  });

  return Response.json({ data: { id: link.id } }, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(request.url);
  const sentenceId = url.searchParams.get("sentenceId");
  if (!sentenceId) {
    return badRequest("Parameter 'sentenceId' wajib diisi.");
  }

  const story = await db.userStory.findUnique({ where: { id } });
  if (!story) {
    return notFound("User story tidak ditemukan.");
  }

  await db.storySentence.delete({
    where: { storyId_sentenceId: { storyId: id, sentenceId } },
  });

  return Response.json({ data: { ok: true } });
}