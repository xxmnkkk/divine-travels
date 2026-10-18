import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatDisplayDate, parseLocalDate, serializeLocalDate } from "../lib/calendar";

describe("date picker calendar values", () => {
  it("rejects impossible dates and values outside the date-only format", () => {
    for (const value of ["", "2027-02-29", "2026-04-31", "2026-13-01", "2026-00-01", "2026-02-00", "2026-2-01", "2026-10-18T00:00:00Z"]) {
      assert.equal(parseLocalDate(value), undefined, value);
    }
  });

  it("retains local calendar dates across leap days, year changes, and DST boundaries", () => {
    for (const value of ["2028-02-29", "2027-01-01", "2026-12-31", "2026-03-08", "2026-11-01", "0099-03-01"]) {
      const date = parseLocalDate(value);
      assert.ok(date, value);
      assert.equal(date.getFullYear(), Number(value.slice(0, 4)));
      assert.equal(date.getMonth() + 1, Number(value.slice(5, 7)));
      assert.equal(date.getDate(), Number(value.slice(8, 10)));
      assert.equal(serializeLocalDate(date), value);
    }
  });

  it("formats the local day for the field and safely handles an invalid Date", () => {
    assert.equal(formatDisplayDate(new Date(2026, 9, 18)), "18 Oct 2026");
    assert.equal(serializeLocalDate(new Date(Number.NaN)), "");
  });
});
