import { beforeEach, describe, expect, it } from "vitest";
import { MIN_FILL_MS, isSubmittedTooFast, parseContact } from "@/lib/contact";
import { rateLimit, resetRateLimits } from "@/lib/rate-limit";

const valid = {
  name: "Amina Otieno",
  email: "amina@example.org",
  organization: "",
  topic: "Technology project",
  message: "We track approvals in spreadsheets and want a proper system.",
};

describe("contact validation", () => {
  it("accepts a complete message and trims input", () => {
    const result = parseContact({ ...valid, name: "  Amina Otieno  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).toBe("Amina Otieno");
  });

  it("reports one clear error per invalid field", () => {
    const result = parseContact({ name: "A", email: "not-an-email", topic: "Spam", message: "short" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["email", "message", "name", "topic"]);
      expect(result.fieldErrors.email).toMatch(/valid email/);
    }
  });

  it("rejects oversized messages", () => {
    const result = parseContact({ ...valid, message: "x".repeat(5001) });
    expect(result.ok).toBe(false);
  });

  it("treats very fast submissions as automated, but not missing timestamps", () => {
    const now = 1_000_000;
    expect(isSubmittedTooFast(String(now - 500), now)).toBe(true);
    expect(isSubmittedTooFast(String(now - MIN_FILL_MS - 1), now)).toBe(false);
    expect(isSubmittedTooFast("", now)).toBe(false);
    expect(isSubmittedTooFast("garbage", now)).toBe(false);
  });
});

describe("rate limit", () => {
  beforeEach(() => resetRateLimits());

  it("allows up to the limit within a window, then blocks", () => {
    const now = 0;
    for (let i = 0; i < 5; i++) expect(rateLimit("ip", 5, 1000, now)).toBe(true);
    expect(rateLimit("ip", 5, 1000, now)).toBe(false);
    expect(rateLimit("other-ip", 5, 1000, now)).toBe(true);
  });

  it("resets after the window", () => {
    for (let i = 0; i < 5; i++) rateLimit("ip", 5, 1000, 0);
    expect(rateLimit("ip", 5, 1000, 1001)).toBe(true);
  });
});
