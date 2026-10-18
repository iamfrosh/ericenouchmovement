import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Called by a Sanity webhook on publish: POST /api/revalidate?secret=...&tag=articles|leaders|gallery */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || url.searchParams.get("secret") !== secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tag = url.searchParams.get("tag");
  if (!tag || !["articles", "leaders", "gallery"].includes(tag)) return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
  revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: tag });
}
