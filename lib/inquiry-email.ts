import nodemailer, { type SendMailOptions } from "nodemailer";
import { z } from "zod";
import { inquiryBudgets, inquiryContent, inquiryDestinations } from "@/content/inquiry";
import { site } from "@/content/site";
import type { InquiryData } from "@/lib/inquiry";

export class EmailConfigurationError extends Error {
  constructor() {
    super("The inquiry email settings are missing or invalid.");
    this.name = "EmailConfigurationError";
  }
}

type InquiryMailConfig = { user: string; recipient: string };

function readEmailConfig() {
  const user = process.env.EMAIL_USER?.trim() ?? "";
  const pass = process.env.EMAIL_PASS?.replace(/\s/g, "") ?? "";
  const recipient = process.env.EMAIL_TO?.trim() || user;
  const email = z.string().email();
  if (!email.safeParse(user).success || !email.safeParse(recipient).success || !pass) {
    throw new EmailConfigurationError();
  }
  return { user, pass, recipient };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function buildInquiryMessage(data: InquiryData, config: InquiryMailConfig): SendMailOptions {
  const destination = inquiryDestinations.find(option => option.value === data.destination)?.label ?? data.destination;
  const budget = inquiryBudgets.find(option => option.value === data.budget)?.label ?? data.budget;
  const flexibility = inquiryContent.flexibility.options.find(option => option.value === data.flexibility)?.label ?? data.flexibility;
  const fields: [string, string][] = [
    ["Traveler", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Destination", destination],
    ["Date preference", flexibility],
    ["Departure date", data.departureDate || "Not decided"],
    ["Return date", data.returnDate || "Not decided"],
    ["Travelers", String(data.travelers)],
    ["Budget per traveler", `${budget} · INR, excluding international flights`],
    ["Interests", data.interests.length ? data.interests.join(", ") : "No preferences selected"],
    ["Notes", data.notes || "None"],
  ];
  const rows = fields.map(([label, value]) => `<tr>
    <th scope="row" style="width:34%;padding:16px 0;vertical-align:top;border-bottom:1px solid #e8d9c0;text-align:left;font:11px Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;color:#6b655c;">${escapeHtml(label)}</th>
    <td style="padding:16px 0 16px 20px;vertical-align:top;border-bottom:1px solid #e8d9c0;font:15px/1.7 Arial,sans-serif;color:#2b2a28;overflow-wrap:anywhere;">${escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />")}</td>
  </tr>`).join("");

  return {
    // Authenticate as the agency mailbox; replies go to the traveler.
    from: { name: site.name, address: config.user },
    to: config.recipient,
    replyTo: { name: data.name.replace(/[\r\n]/g, " "), address: data.email },
    subject: `New trip inquiry — ${destination.replace(/[\r\n]/g, " ")}`,
    text: `${site.name}\nNew trip inquiry\n\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n\n")}\n\nSent from the website trip planner. Reply to this email to respond to the traveler.`,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8" /></head><body style="margin:0;padding:0;background:#f4ebdd;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4ebdd;"><tr><td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border:1px solid #e8d9c0;border-radius:22px;background:#fffdf8;">
          <tr><td style="padding:32px;border-bottom:1px solid #e8d9c0;">
            <p style="margin:0 0 12px;font:11px Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#6b655c;">${escapeHtml(site.name)}</p>
            <h1 style="margin:0;font:32px Georgia,serif;color:#2b2a28;">A new journey begins.</h1>
            <p style="margin:14px 0 0;font:14px/1.7 Arial,sans-serif;color:#6b655c;">A traveler has shared a trip brief through your website.</p>
          </td></tr>
          <tr><td style="padding:12px 32px 28px;"><table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${rows}</table></td></tr>
          <tr><td style="padding:22px 32px;border-top:1px solid #e8d9c0;font:12px/1.7 Arial,sans-serif;color:#6b655c;">Reply directly to this email to respond to the traveler.</td></tr>
        </table>
      </td></tr></table>
    </body></html>`,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

/** Server-side only: credentials are read at request time, never from public env. */
export async function sendInquiryEmail(data: InquiryData) {
  const config = readEmailConfig();
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    logger: false,
    debug: false,
  });
  const info = await transporter.sendMail(buildInquiryMessage(data, config));
  const accepted = info.accepted?.some(address => (typeof address === "string" ? address : address.address).toLowerCase() === config.recipient.toLowerCase());
  if (!accepted || info.rejected?.length) {
    throw new Error("The SMTP server did not accept the inquiry recipient.");
  }
}
