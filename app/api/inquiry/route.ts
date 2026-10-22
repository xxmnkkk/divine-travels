import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry";
import { EmailConfigurationError, sendInquiryEmail } from "@/lib/inquiry-email";

export const runtime = "nodejs";

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

  // The legacy "website" field can be autofilled by browsers/password managers.
  // Ignore it; use the dedicated form check, and never claim email was sent here.
  if (payload && typeof payload === "object" && "_formCheck" in payload && typeof payload._formCheck === "string" && payload._formCheck.trim()) {
    return NextResponse.json(
      { accepted: false, error: "We couldn’t submit your request. Please refresh the form and try again, or contact us directly." },
      { status: 400 },
    );
  }

  const result = inquirySchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please review your trip details.", fields: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    await sendInquiryEmail(result.data);
    return NextResponse.json({ accepted: true, mode: "email" });
  } catch (error) {
    // Do not log SMTP errors verbatim: they can include addresses or credentials.
    const unconfigured = error instanceof EmailConfigurationError;
    console.error(unconfigured ? "[inquiry] Email is not configured." : "[inquiry] SMTP delivery failed.");
    return NextResponse.json(
      { error: "We couldn’t send your trip brief. Please try again or contact us directly." },
      { status: unconfigured ? 503 : 502 },
    );
  }
}
