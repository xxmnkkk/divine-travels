import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import nodemailer, { type SendMailOptions } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { inquiryDefaultValues, type InquiryData } from "../lib/inquiry";
import { buildInquiryMessage, EmailConfigurationError, sendInquiryEmail } from "../lib/inquiry-email";
import { site } from "../content/site";

const sender = "smtp-test@example.com";
const recipient = "consultant-test@example.com";
const syntheticPassword = "abcd efgh\nijkl\tmnop";
const emailEnvironmentKeys = ["EMAIL_USER", "EMAIL_PASS", "EMAIL_TO"] as const;
const savedEmailEnvironment = new Map(emailEnvironmentKeys.map((key) => [key, process.env[key]]));

const inquiry: InquiryData = {
  ...inquiryDefaultValues,
  destination: "italy",
  flexibility: "fixed",
  departureDate: "2027-06-01",
  returnDate: "2027-06-10",
  travelers: 3,
  budget: "4-6-lakh",
  interests: ["Culture & history", "Food & wine"],
  name: "Asha <Lead> & \"Co\"",
  email: "traveler-test@example.com",
  phone: "+91 98765 43210",
  notes: "A <quiet> room & a \"view\" for 'us'.\r\nSecond line.\nThird line.",
};

type Delivery = { accepted?: (string | { address: string })[]; rejected?: string[] };

function mockTransport() {
  const sendMail = mock.fn(async (message: SendMailOptions): Promise<Delivery> => {
    assert.ok(message);
    return { accepted: [process.env.EMAIL_TO?.trim() || process.env.EMAIL_USER!.trim()], rejected: [] };
  });
  const transport = { sendMail } as unknown as ReturnType<typeof nodemailer.createTransport>;
  const createTransport = mock.method(nodemailer, "createTransport", (() => transport) as typeof nodemailer.createTransport);
  return { createTransport, sendMail };
}

describe("inquiry email delivery", { concurrency: false }, () => {
  let smtp: ReturnType<typeof mockTransport>;

  beforeEach(() => {
    process.env.EMAIL_USER = sender;
    process.env.EMAIL_PASS = syntheticPassword;
    process.env.EMAIL_TO = recipient;
    smtp = mockTransport();
  });

  afterEach(() => {
    mock.restoreAll();
    for (const key of emailEnvironmentKeys) {
      const saved = savedEmailEnvironment.get(key);
      if (saved === undefined) delete process.env[key];
      else process.env[key] = saved;
    }
  });

  it("uses authenticated Gmail TLS with a whitespace-normalized app password and bounded timeouts", async () => {
    process.env.EMAIL_USER = ` ${sender} `;
    process.env.EMAIL_TO = ` ${recipient} `;
    await sendInquiryEmail(inquiry);

    const options = smtp.createTransport.mock.calls[0].arguments[0] as SMTPTransport.Options;
    assert.equal(options.host, "smtp.gmail.com");
    assert.equal(options.port, 465);
    assert.equal(options.secure, true);
    assert.deepEqual(options.auth, { user: sender, pass: "abcdefghijklmnop" });
    for (const timeout of [options.connectionTimeout, options.greetingTimeout, options.socketTimeout]) {
      assert.ok(typeof timeout === "number" && timeout > 0 && timeout <= 30_000);
    }
    const message = smtp.sendMail.mock.calls[0].arguments[0];
    assert.deepEqual(message.from, { name: site.name, address: sender });
    assert.equal(message.to, recipient);
    assert.deepEqual(message.replyTo, { name: inquiry.name, address: inquiry.email });
    assert.ok(!JSON.stringify(message).includes("abcdefghijklmnop"));
    assert.ok(!`${message.text}\n${message.html}`.includes(syntheticPassword));
  });

  it("sends to EMAIL_USER when no recipient override is configured", async () => {
    for (const override of [undefined, "   "]) {
      if (override === undefined) delete process.env.EMAIL_TO;
      else process.env.EMAIL_TO = override;
      await sendInquiryEmail(inquiry);
    }
    for (const call of smtp.sendMail.mock.calls) assert.equal(call.arguments[0].to, sender);
  });

  it("accepts a provider-confirmed address regardless of casing or address-object representation", async () => {
    smtp.sendMail.mock.mockImplementation(async () => ({ accepted: [{ address: recipient.toUpperCase() }], rejected: [] }));
    await assert.doesNotReject(sendInquiryEmail(inquiry));
  });

  it("rejects missing acceptance and acceptance of a different mailbox", async () => {
    for (const delivery of [{ rejected: [] }, { accepted: ["somebody-else@example.com"], rejected: [] }]) {
      smtp.sendMail.mock.mockImplementation(async () => delivery);
      await assert.rejects(sendInquiryEmail(inquiry));
    }
  });

  it("raises a configuration error before opening a transport when settings are missing", async () => {
    delete process.env.EMAIL_PASS;
    await assert.rejects(sendInquiryEmail(inquiry), EmailConfigurationError);
    assert.equal(smtp.createTransport.mock.callCount(), 0);
  });
});

describe("inquiry email content", () => {
  it("includes the complete trip brief with readable destination, budget, and date-preference labels", () => {
    const message = buildInquiryMessage(inquiry, { user: sender, recipient });
    const { text, html } = message;
    assert.ok(typeof text === "string" && typeof html === "string");
    assert.equal(message.subject, "New trip inquiry — Italy");

    for (const [label, value] of [
      ["Traveler", inquiry.name],
      ["Email", inquiry.email],
      ["Phone", inquiry.phone],
      ["Destination", "Italy"],
      ["Date preference", "Dates are set"],
      ["Departure date", inquiry.departureDate],
      ["Return date", inquiry.returnDate],
      ["Travelers", "3"],
      ["Budget per traveler", "₹4–6 lakh · INR, excluding international flights"],
      ["Interests", "Culture & history, Food & wine"],
      ["Notes", inquiry.notes],
    ]) {
      assert.ok(text.includes(`${label}: ${value}`), `Missing plain-text detail: ${label}`);
      assert.ok(html.includes(`>${label}</th>`), `Missing HTML detail label: ${label}`);
    }
    for (const value of [inquiry.email, inquiry.phone, "Italy", "Dates are set", inquiry.departureDate, inquiry.returnDate, "₹4–6 lakh · INR, excluding international flights", "Culture &amp; history, Food &amp; wine"]) {
      assert.ok(html.includes(value), `Missing HTML detail value: ${value}`);
    }
    assert.match(html, />3<\/td>/);
  });

  it("escapes visitor HTML and preserves every notes line break", () => {
    const message = buildInquiryMessage(inquiry, { user: sender, recipient });
    assert.ok(typeof message.html === "string");
    assert.ok(message.html.includes("Asha &lt;Lead&gt; &amp; &quot;Co&quot;"));
    assert.ok(message.html.includes("A &lt;quiet&gt; room &amp; a &quot;view&quot; for &#39;us&#39;.<br />Second line.<br />Third line."));
    assert.doesNotMatch(message.html, /<Lead>|<quiet>/);
    assert.equal(message.disableFileAccess, true);
    assert.equal(message.disableUrlAccess, true);
  });

  it("provides clear values when optional trip details are not yet supplied", () => {
    const message = buildInquiryMessage({
      ...inquiry, departureDate: "", returnDate: "", flexibility: "deciding", phone: "", interests: [], notes: "",
    }, { user: sender, recipient });
    assert.ok(typeof message.text === "string" && typeof message.html === "string");
    for (const detail of ["Phone: Not provided", "Departure date: Not decided", "Return date: Not decided", "Interests: No preferences selected", "Notes: None"]) {
      assert.ok(message.text.includes(detail));
    }
    for (const fallback of ["Not provided", "Not decided", "No preferences selected", "None"]) {
      assert.ok(message.html.includes(fallback));
    }
  });

  it("keeps visitor line breaks out of reply-to display-name headers", () => {
    const message = buildInquiryMessage({ ...inquiry, name: "Asha\r\nTraveler" }, { user: sender, recipient });
    assert.deepEqual(message.replyTo, { name: "Asha  Traveler", address: inquiry.email });
    assert.deepEqual(message.from, { name: site.name, address: sender });
  });
});
