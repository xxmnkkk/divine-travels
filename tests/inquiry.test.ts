import assert from "node:assert/strict";
import { describe, it } from "node:test";
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

function request(payload: unknown, headers: Record<string,string> = {}) {
  return new Request("http://0.0.0.0:3001/api/inquiry", {
    method: "POST",
    headers: { "Content-Type":"application/json", host:"localhost:3001", origin:"http://localhost:3001", ...headers },
    body: JSON.stringify(payload),
  });
}

describe("inquiry endpoint", () => {
  it("accepts the browser public host when Next binds to an internal address", async () => {
    const response = await POST(request(valid));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {accepted:true, mode:"demo"});
  });
  it("rejects a cross-origin submission", async () => {
    assert.equal((await POST(request(valid,{origin:"https://other.example"}))).status,403);
  });
  it("rejects malformed origins without throwing", async () => {
    assert.equal((await POST(request(valid,{origin:"null"}))).status,403);
  });
  it("rejects invalid destinations and missing contact details", async () => {
    const response=await POST(request({...valid,destination:"unknown",email:""}));
    assert.equal(response.status,422);
    const result=await response.json();
    assert.ok(result.fields.destination);
    assert.ok(result.fields.email);
  });
  it("quietly accepts a honeypot without processing its data", async () => {
    const response=await POST(request({website:"spam"}));
    assert.equal(response.status,200);
    assert.deepEqual(await response.json(),{accepted:true,mode:"demo"});
  });
  it("enforces content type and payload size", async () => {
    assert.equal((await POST(request(valid,{"Content-Type":"text/plain"}))).status,415);
    assert.equal((await POST(request({...valid,notes:"x".repeat(17000)}))).status,413);
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
