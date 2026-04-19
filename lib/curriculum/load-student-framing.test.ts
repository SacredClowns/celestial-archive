import { describe, expect, it } from "vitest";
import { buildStudentIndexFraming, loadStudentIntroFolioRaw } from "@/lib/curriculum/load-student-framing";

describe("Student index framing (K/L/M)", () => {
  it("loads placard and splits continuation before What Student Is", () => {
    const raw = loadStudentIntroFolioRaw();
    expect(raw).toBeTruthy();
    expect(raw).toMatch(/What Student Is/);

    const framing = buildStudentIndexFraming();
    expect(framing).not.toBeNull();
    expect(framing!.introTeaser.length).toBeGreaterThan(40);
    expect(framing!.introRest).toBeTruthy();
    expect(framing!.introRest).toMatch(/^## What Student Is/m);
    expect(framing!.bridge).toBeTruthy();
    expect(framing!.bridge).toMatch(/Seeker rank/);
    expect(framing!.fieldGuide).toBeTruthy();
    expect(framing!.fieldGuide).toMatch(/The Badges/);
  });
});
