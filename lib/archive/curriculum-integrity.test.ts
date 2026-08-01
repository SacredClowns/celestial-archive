import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";

/**
 * Curriculum file integrity.
 *
 * The prose is the product. These specs guard the files themselves: that a
 * lesson's cited Source Pack actually exists on disk, that nothing points at
 * a superseded stub, and that no file has been silently corrupted by an
 * interrupted write. Lesson 2.3 once carried 249 trailing NUL bytes and
 * nothing noticed — greps reported it as "binary" and moved on.
 */

const CURRICULUM = path.join(process.cwd(), "content", "curriculum");

function allMarkdown(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...allMarkdown(full));
    } else if (entry.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

describe("curriculum files", () => {
  const files = allMarkdown(CURRICULUM);

  it("finds the curriculum on disk", () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it("carries no NUL bytes — nothing half-written", () => {
    const corrupt = files.filter((f) => readFileSync(f).includes(0x00)).map((f) => path.basename(f));
    expect(corrupt, `corrupted files: ${corrupt.join(", ")}`).toEqual([]);
  });

  it("decodes cleanly as UTF-8", () => {
    for (const file of files) {
      const buf = readFileSync(file);
      const text = buf.toString("utf8");
      expect(text.includes("�"), `${path.basename(file)} has invalid UTF-8`).toBe(false);
    }
  });

  it("leaves no lesson file empty", () => {
    const lessons = files.filter((f) => /LESSON_\d+\.md$/.test(path.basename(f)));
    expect(lessons.length).toBeGreaterThan(0);
    for (const lesson of lessons) {
      expect(
        readFileSync(lesson, "utf8").trim().length,
        `${path.basename(lesson)} is empty`
      ).toBeGreaterThan(1000);
    }
  });
});

describe("Student source packs", () => {
  const dir = path.join(CURRICULUM, "stage-2-student");

  it("gives every registered folio a Source Pack that exists", () => {
    for (const record of studentLessonRegistry) {
      if (!record.sourcePackFileName) continue;
      const full = path.join(dir, record.sourcePackFileName);
      expect(existsSync(full), `${record.slug} cites a missing pack: ${record.sourcePackFileName}`).toBe(true);
    }
  });

  it("never cites a superseded stub", () => {
    for (const record of studentLessonRegistry) {
      if (!record.sourcePackFileName) continue;
      const full = path.join(dir, record.sourcePackFileName);
      const lines = readFileSync(full, "utf8").split("\n").length;
      // The retired stubs were 44 lines of scaffolding; real packs run 480+.
      expect(lines, `${record.sourcePackFileName} looks like a stub (${lines} lines)`).toBeGreaterThan(200);
    }
  });

  it("keeps each lesson's frontmatter pointing at its real pack", () => {
    for (const record of studentLessonRegistry) {
      if (!record.sourcePackFileName) continue;
      const lessonFiles = readdirSync(dir).filter((f) => /^STAGE_2_STUDENT_LESSON_\d+\.md$/.test(f));
      const match = lessonFiles.find((f) =>
        readFileSync(path.join(dir, f), "utf8").includes(`sourcePackId: ${record.sourcePackId}`)
      );
      expect(match, `no lesson declares sourcePackId ${record.sourcePackId}`).toBeDefined();
    }
  });
});
