import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry";

const MAX_PAYLOAD_BYTES = 16_384;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next.js may use an internal bind address in request.url. The Host header is
  // the public origin the browser actually reached (including its port).
  const publicHost = request.headers.get("host") ?? new URL(request.url).host;
  const originUrl = origin && URL.canParse(origin) ? new URL(origin) : null;
  if (origin && (!originUrl || !["http:", "https:"].includes(originUrl.protocol) || originUrl.host !== publicHost)) {
    return NextResponse.json({ error: "This form must be submitted from our website." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Please submit the form as JSON." }, { status: 415 });
  }
  const advertisedLength = Number(request.headers.get("content-length") ?? 0);
  if (advertisedLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: "Your trip brief is too long." }, { status: 413 });
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ error: "Your trip brief is too long." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "We couldn’t read your trip brief." }, { status: 400 });
  }

  // Quietly accept the honeypot so automated submissions receive no useful feedback.
  if (payload && typeof payload === "object" && "website" in payload && typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ accepted: true, mode: "demo" });
  }

  const result = inquirySchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please review your trip details.", fields: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // TODO: connect an email/CRM provider (for example, Resend) before enabling real
  // inquiries. Only claim delivery after that provider confirms successful handling.
  // Keep names, email addresses, phone numbers, and free-text notes out of logs.
  console.info("[inquiry] Demo trip brief validated", {
    destination: result.data.destination,
    travelers: result.data.travelers,
    budget: result.data.budget,
    interests: result.data.interests.length,
    hasDates: Boolean(result.data.departureDate),
  });

  return NextResponse.json({ accepted: true, mode: "demo" });
}
