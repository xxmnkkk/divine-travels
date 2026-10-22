import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import nodemailer, { type SendMailOptions } from "nodemailer";
import { POST } from "../app/api/inquiry/route";
import { inquiryDefaultValues, inquirySchema } from "../lib/inquiry";

const valid = {
  ...inquiryDefaultValues,
  destination: "italy",
  travelers: 2,
  budget: "4-6-lakh",
  name: "Preview Traveler",
  email: "preview@example.com",
};

const emailEnvironmentKeys = ["EMAIL_USER", "EMAIL_PASS", "EMAIL_TO"] as const;
const savedEmailEnvironment = new Map(emailEnvironmentKeys.map((key) => [key, process.env[key]]));
const sender = "smtp-test@example.com";
const recipient = "consultant-test@example.com";

function configureTestEmail() {
  process.env.EMAIL_USER = sender;
  process.env.EMAIL_PASS = "synthetic app password";
  process.env.EMAIL_TO = recipient;
}

function acceptedDelivery() {
  return { accepted: [recipient], rejected: [] as string[] };
}

function mockTransport() {
  const sendMail = mock.fn(async (message: SendMailOptions) => {
    assert.ok(message);
    return acceptedDelivery();
  });
  const transport = { sendMail } as unknown as ReturnType<typeof nodemailer.createTransport>;
  const createTransport = mock.method(nodemailer, "createTransport", (() => transport) as typeof nodemailer.createTransport);
  return { createTransport, sendMail };
}

function request(payload: unknown, headers: Record<string,string> = {}) {
  return new Request("http://0.0.0.0:3001/api/inquiry", {
    method: "POST",
    headers: { "Content-Type":"application/json", host:"localhost:3001", origin:"http://localhost:3001", ...headers },
    body: JSON.stringify(payload),
  });
}

describe("inquiry endpoint", { concurrency: false }, () => {
  let smtp: ReturnType<typeof mockTransport>;

  beforeEach(() => {
    configureTestEmail();
    smtp = mockTransport();
    mock.method(console, "error", () => {});
  });

  afterEach(() => {
    mock.restoreAll();
    for (const key of emailEnvironmentKeys) {
      const saved = savedEmailEnvironment.get(key);
      if (saved === undefined) delete process.env[key];
      else process.env[key] = saved;
    }
  });

  it("accepts the browser public host when Next binds to an internal address", async () => {
    const response = await POST(request(valid));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { accepted: true, mode: "email" });
    assert.equal(smtp.sendMail.mock.callCount(), 1);
    assert.equal(smtp.sendMail.mock.calls[0].arguments[0].to, recipient);
  });
  it("waits for SMTP acceptance before returning success", async () => {
    let finishDelivery: ((delivery: ReturnType<typeof acceptedDelivery>) => void) | undefined;
    smtp.sendMail.mock.mockImplementation(() => new Promise((resolve) => { finishDelivery = resolve; }));
    let settled = false;
    const pending = POST(request(valid)).then((response) => {
      settled = true;
      return response;
    });

    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(smtp.sendMail.mock.callCount(), 1);
    assert.equal(settled, false);
    assert.ok(finishDelivery);
    finishDelivery(acceptedDelivery());

    const response = await pending;
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { accepted: true, mode: "email" });
  });
  it("returns a retryable failure when SMTP rejects the send", async () => {
    smtp.sendMail.mock.mockImplementation(async () => { throw new Error("Synthetic provider rejection"); });
    const response = await POST(request(valid));
    assert.equal(response.status, 502);
    const body = await response.text();
    assert.doesNotMatch(body, /Synthetic provider rejection|synthetic app password/);
    assert.notEqual(JSON.parse(body).accepted, true);
  });
  it("does not report success for empty acceptance or rejected recipients", async () => {
    for (const delivery of [
      { accepted: [], rejected: [] },
      { accepted: [], rejected: [recipient] },
      { accepted: [recipient], rejected: [recipient] },
    ]) {
      smtp.sendMail.mock.mockImplementation(async () => delivery);
      const response = await POST(request(valid));
      assert.equal(response.status, 502);
      assert.notEqual((await response.json()).accepted, true);
    }
  });
  it("returns unavailable for missing or invalid email configuration without opening SMTP", async () => {
    const invalidConfiguration: Partial<Record<typeof emailEnvironmentKeys[number], string | undefined>>[] = [
      { EMAIL_USER: undefined },
      { EMAIL_USER: "not-an-email" },
      { EMAIL_PASS: undefined },
      { EMAIL_PASS: " \t\n " },
      { EMAIL_TO: "not-an-email" },
    ];
    for (const configuration of invalidConfiguration) {
      configureTestEmail();
      for (const [key, value] of Object.entries(configuration)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
      const response = await POST(request(valid));
      assert.equal(response.status, 503);
      assert.notEqual((await response.json()).accepted, true);
    }
    assert.equal(smtp.createTransport.mock.callCount(), 0);
    assert.equal(smtp.sendMail.mock.callCount(), 0);
  });
  it("rejects a cross-origin submission", async () => {
    assert.equal((await POST(request(valid,{origin:"https://other.example"}))).status,403);
    assert.equal(smtp.createTransport.mock.callCount(), 0);
  });
  it("rejects malformed origins without throwing", async () => {
    assert.equal((await POST(request(valid,{origin:"null"}))).status,403);
    assert.equal(smtp.createTransport.mock.callCount(), 0);
  });
  it("rejects invalid destinations and missing contact details", async () => {
    const response=await POST(request({...valid,destination:"unknown",email:""}));
    assert.equal(response.status,422);
    const result=await response.json();
    assert.ok(result.fields.destination);
    assert.ok(result.fields.email);
    assert.equal(smtp.createTransport.mock.callCount(), 0);
  });
  it("quietly accepts a honeypot without processing its data", async () => {
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASS;
    const response=await POST(request({website:"spam"}));
    assert.equal(response.status,200);
    assert.deepEqual(await response.json(),{accepted:true,mode:"email"});
    assert.equal(smtp.createTransport.mock.callCount(), 0);
  });
  it("enforces content type and payload size", async () => {
    assert.equal((await POST(request(valid,{"Content-Type":"text/plain"}))).status,415);
    assert.equal((await POST(request({...valid,notes:"x".repeat(17000)}))).status,413);
    assert.equal((await POST(request(valid,{"content-length":"17000"}))).status,413);
    assert.equal(smtp.createTransport.mock.callCount(), 0);
  });
  it("rejects unreadable JSON before opening SMTP", async () => {
    const malformed = new Request("http://localhost:3001/api/inquiry", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
    });
    assert.equal((await POST(malformed)).status, 400);
    assert.equal(smtp.createTransport.mock.callCount(), 0);
  });
});

describe("trip details", () => {
  it("allows a traveler still deciding on dates", () => {
    assert.ok(inquirySchema.safeParse({...valid,flexibility:"deciding"}).success);
  });
  it("requires real, ordered dates when dates are fixed", () => {
    assert.equal(inquirySchema.safeParse({...valid,flexibility:"fixed"}).success,false);
    assert.equal(inquirySchema.safeParse({...valid,departureDate:"2027-02-30"}).success,false);
    assert.equal(inquirySchema.safeParse({...valid,departureDate:"2027-06-05",returnDate:"2027-06-01"}).success,false);
    assert.ok(inquirySchema.safeParse({...valid,flexibility:"fixed",departureDate:"2027-06-01",returnDate:"2027-06-10"}).success);
  });
  it("rejects unsupported interests and fractional or empty traveler counts", () => {
    assert.equal(inquirySchema.safeParse({...valid,interests:["arbitrary"]}).success,false);
    for(const travelers of [0,1.5,25,NaN]) assert.equal(inquirySchema.safeParse({...valid,travelers}).success,false);
  });
});
