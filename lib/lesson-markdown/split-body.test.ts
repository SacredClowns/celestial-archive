import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import {
  extractClosingPassage,
  extractMainReaderColumn,
  extractPostface
} from "./split-body";

const lesson2Path = path.join(
  process.cwd(),
  "content",
  "curriculum",
  "stage-1-seeker",
  "STAGE_1_SEEKER_LESSON_2.md"
);

const student22Path = path.join(
  process.cwd(),
  "content",
  "curriculum",
  "stage-2-student",
  "STAGE_2_STUDENT_LESSON_2.md"
);

const student24Path = path.join(
  process.cwd(),
  "content",
  "curriculum",
  "stage-2-student",
  "STAGE_2_STUDENT_LESSON_4.md"
);

describe("split-body (Lesson 1.2 file)", () => {
  it("extracts main reader column before Companion Elements", () => {
    const raw = readFileSync(lesson2Path, "utf8");
    const body = matter(raw).content;
    const main = extractMainReaderColumn(body);
    expect(main).toContain("### Learning Goals");
    expect(main).toContain(":::discernment");
    expect(main).not.toContain("## Companion Elements");
    expect(main).not.toContain("# COMPANION ELEMENTS");
  });

  it("extracts closing passage without epistemic tail", () => {
    const raw = readFileSync(lesson2Path, "utf8");
    const body = matter(raw).content;
    const closing = extractClosingPassage(body);
    expect(closing).toContain(":::closing-passage");
    expect(closing).toContain("On the night of March 10, 1582");
    expect(closing).not.toContain("*Epistemic status");
    expect(closing).not.toContain(":::source-strip");
  });

  it("extracts postface with source-strip wrapper", () => {
    const raw = readFileSync(lesson2Path, "utf8");
    const body = matter(raw).content;
    const post = extractPostface(body);
    expect(post).toContain(":::source-strip");
    expect(post).toContain("*Epistemic status");
    expect(post).toContain("**Sources cited in this lesson:**");
  });
});

describe("split-body (Student Lesson 2.2 file)", () => {
  it("extracts main, closing, and postface", () => {
    const raw = readFileSync(student22Path, "utf8");
    const body = matter(raw).content;
    const main = extractMainReaderColumn(body);
    const closing = extractClosingPassage(body);
    const post = extractPostface(body);
    expect(main).toContain("### Learning Goals");
    expect(main).toContain("Liber Loagaeth");
    expect(closing).toContain(":::closing-passage");
    expect(post).toContain("*Epistemic status");
    expect(post).toContain("Laycock");
  });
});

describe("split-body (Student Lesson 2.4 file)", () => {
  it("extracts main, closing, and postface", () => {
    const raw = readFileSync(student24Path, "utf8");
    const body = matter(raw).content;
    const main = extractMainReaderColumn(body);
    const closing = extractClosingPassage(body);
    const post = extractPostface(body);
    expect(main).toContain("### Learning Goals");
    expect(main).toContain("Great Table");
    expect(closing).toContain(":::closing-passage");
    expect(post).toContain("*Epistemic status");
    expect(post).toContain("SOURCE_PACK_4_STUDENT_2_4");
  });
});
