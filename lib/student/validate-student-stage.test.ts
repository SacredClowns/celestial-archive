import { describe, expect, it } from "vitest";
import { validateStudentStage } from "./validate-student-stage";

describe("validateStudentStage", () => {
  it("reports no issues for the current Stage 2 registry and curriculum files", () => {
    const issues = validateStudentStage();
    expect(issues, JSON.stringify(issues, null, 2)).toEqual([]);
  });
});
