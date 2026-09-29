import { db } from "@/lib/db";
import { notFound } from "@/lib/http";

type StoryFilter = "approved" | "all" | "pending" | "needs_review";

const parseFilter = (value: string | null): StoryFilter => {
  switch (value) {
    case "approved":
    case "all":
    case "pending":
      return value;
    default:
      return "approved";
  }
};

const needsReview = (s: {
  storySentences: { verificationStatus: string }[];
}): boolean =>
  s.storySentences.some((c) => c.verificationStatus === "needs_review");

const filterStories = <
  T extends { status: string; storySentences: { verificationStatus: string }[] },
>(
  stories: T[],
  filter: StoryFilter,
): T[] => {
  switch (filter) {
    case "approved":
      return stories.filter((s) => s.status === "approved");
    case "pending":
      return stories.filter((s) => s.status === "pending");
    case "needs_review":
      return stories.filter(needsReview);
    default:
      return stories;
  }
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const document = await db.document.findUnique({ where: { id } });
  if (!document) {
    return notFound("Dokumen tidak ditemukan.");
  }

  const url = new URL(request.url);
  const format = url.searchParams.get("format") ?? "md";
  const filter = parseFilter(url.searchParams.get("filter"));
  const asCsv = format === "csv";

  const stories = await db.userStory.findMany({
    where: { documentId: id },
    orderBy: { storyCode: "asc" },
    include: { storySentences: { include: { sentence: true } } },
  });

  const selected = filterStories(stories, filter);

  let content: string;
  if (asCsv) {
    const lines = [
      ["story_code", "actor", "action", "benefit", "status", "source_indices"],
      ...selected.map((s) => [
        s.storyCode,
        s.actor,
        s.action,
        s.benefit,
        s.status,
        s.storySentences.map((c) => c.sentence.index).join(";"),
      ]),
    ];
    content = lines.map((row) => row.map(escapeCsv).join(",")).join("\n");
  } else {
    const blocks = selected.map((s) => {
      const sources = s.storySentences
        .map((c) => {
          const verdict = c.verificationStatus === "valid" ? "valid" : "needs_review";
          return `  - \`kalimat ke-${c.sentence.index + 1}\` (\`[${c.sentence.index}]\` "${c.sentence.text}") — ${verdict}`;
        })
        .join("\n");
      return [
        `### ${s.storyCode}`,
        `**Sebagai** ${s.actor}, **saya ingin** ${s.action} **agar** ${s.benefit}`,
        ``,
        `Status: ${s.status}`,
        sources ? `Sumber:\n${sources}` : `Sumber: -`,
      ].join("\n");
    });
    content = [
      `# User Story — ${document.title}`,
      ``,
      blocks.length > 0 ? blocks.join("\n\n---\n\n") : "_Tidak ada user story._",
      ``,
    ].join("\n");
  }

  const contentType = asCsv ? "text/csv" : "text/plain";
  const extension = asCsv ? "csv" : "md";
  const filename = encodeURIComponent(`${document.title.replace(/[^\w\- ]+/g, "")}-${filter}.${extension}`);

  return new Response(content, {
    headers: {
      "Content-Type": `${contentType}; charset=utf-8`,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

const escapeCsv = (value: string): string => {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};