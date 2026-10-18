import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { escapeHtml } from "@/lib/utils";

export const runtime = "nodejs";

// Simple in-memory limiter: 5 requests / 10 minutes / IP per server instance.
// For multi-instance or serverless production, swap for a shared store (e.g. Upstash Redis).
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return false;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) return NextResponse.json({ error: "Message too large." }, { status: 413 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (typeof body === "object" && body && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form email delivery is not configured");
    return NextResponse.json({ error: "Messages cannot be sent right now. Please try again later." }, { status: 503 });
  }

  const { name, email, subject, message } = parsed.data;
  const clean = (s: string) => s.replace(/[\r\n]+/g, " ");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `[EEM website] ${clean(subject)}`,
        html: `<p><strong>From:</strong> ${escapeHtml(clean(name))} (${escapeHtml(email)})</p><p><strong>Subject:</strong> ${escapeHtml(clean(subject))}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });
    if (!res.ok) {
      console.error(`Email provider responded with status ${res.status}`);
      return NextResponse.json({ error: "Your message could not be sent. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    console.error("Email provider request failed");
    return NextResponse.json({ error: "Your message could not be sent. Please try again later." }, { status: 502 });
  }
}
