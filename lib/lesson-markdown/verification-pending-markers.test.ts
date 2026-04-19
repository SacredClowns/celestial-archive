import { describe, expect, it } from "vitest";
import {
  VERIFICATION_PENDING_SENTINEL_PREFIX,
  preprocessVerificationPendingInMarkdown
} from "./verification-pending-markers";

describe("preprocessVerificationPendingInMarkdown", () => {
  it("replaces Peterson name placeholder", () => {
    const input = "x [Name to be confirmed against Peterson 2003.] y";
    const out = preprocessVerificationPendingInMarkdown(input);
    expect(out).toContain(`${VERIFICATION_PENDING_SENTINEL_PREFIX}peterson-name`);
    expect(out).not.toContain("[Name to be confirmed against Peterson");
  });

  it("replaces planetary/diurnal placeholder", () => {
    const input = "[Planetary and diurnal assignments to be confirmed against Peterson 2003.]";
    const out = preprocessVerificationPendingInMarkdown(input);
    expect(out).toContain(`${VERIFICATION_PENDING_SENTINEL_PREFIX}peterson-planetary`);
  });

  it("replaces table layout placeholder", () => {
    const input = "See [Table layout to be verified.]";
    const out = preprocessVerificationPendingInMarkdown(input);
    expect(out).toContain(`${VERIFICATION_PENDING_SENTINEL_PREFIX}table-layout`);
  });

  it("replaces generic name placeholder", () => {
    const input = "[Name to be confirmed.]";
    const out = preprocessVerificationPendingInMarkdown(input);
    expect(out).toContain(`${VERIFICATION_PENDING_SENTINEL_PREFIX}name-generic`);
  });
});
