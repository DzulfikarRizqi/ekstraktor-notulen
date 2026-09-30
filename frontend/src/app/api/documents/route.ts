import { z } from "zod";
import { db } from "@/lib/db";
import { badRequest } from "@/lib/http";
import type { DocumentListItem } from "@/types";

const MAX_CONTENT_LENGTH = 50_000;

const createSchema = z.object({
  title: z.string().trim().max(200).optional(),
  content: z.string().min(1).max(MAX_CONTENT_LENGTH),
});

export async function GET() {
  const documents = await db.document.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { userStories: true } } },
  });

  const list: DocumentListItem[] = documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    status: doc.status as DocumentListItem["status"],
    truncated: doc.truncated,
    createdAt: doc.createdAt.toISOString(),
    storyCount: doc._count.userStories,
  }));

  return Response.json({ data: list });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Body harus berupa JSON.");
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const code =
      issue?.path[0] === "content" && issue?.code === "too_big"
        ? "CONTENT_TOO_LONG"
        : "VALIDATION_ERROR";
    const message =
      issue?.code === "too_big"
        ? `Konten melebihi ${MAX_CONTENT_LENGTH.toLocaleString("id-ID")} karakter.`
        : issue?.message ?? "Input tidak valid.";
    return Response.json(
      { error: { code, message } },
      { status: issue?.code === "too_big" ? 422 : 400 },
    );
  }

  const document = await db.document.create({
    data: {
      title: parsed.data.title || "Tanpa Judul",
      content: parsed.data.content,
    },
  });

  return Response.json({ data: { id: document.id } }, { status: 201 });
}