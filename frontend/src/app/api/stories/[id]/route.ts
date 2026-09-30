import { z } from "zod";
import { db } from "@/lib/db";
import { badRequest, notFound } from "@/lib/http";

const updateSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  actor: z.string().trim().min(1).optional(),
  action: z.string().trim().min(1).optional(),
  benefit: z.string().trim().optional(),
});

export async function PATCH(
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
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return badRequest("Tidak ada field yang valid untuk diperbarui.");
  }

  const updated = await db.userStory.update({
    where: { id },
    data: parsed.data,
  });

  return Response.json({ data: { id: updated.id, status: updated.status } });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const story = await db.userStory.findUnique({ where: { id } });
  if (!story) {
    return notFound("User story tidak ditemukan.");
  }
  await db.userStory.delete({ where: { id } });
  return Response.json({ data: { ok: true } });
}