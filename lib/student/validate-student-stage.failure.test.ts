import { describe, expect, it, vi } from "vitest";
import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";

describe("validateStudentStage (failure modes)", () => {
  it("fails loudly when a glossary term is missing from the index", async () => {
    vi.resetModules();
    vi.doMock("@/lib/glossary", async () => {
      const actual = await vi.importActual<typeof import("@/lib/glossary")>("@/lib/glossary");
      return {
        ...actual,
        getGlossaryEntryByTerm: () => null
      };
    });
    const { validateStudentStage } = await import("./validate-student-stage");
    const issues = validateStudentStage();
    expect(issues.some((i) => i.code === "GLOSSARY_TERM")).toBe(true);
  });

  it("fails loudly when a source pack file goes missing", async () => {
    vi.resetModules();
    vi.doMock("@/lib/student/student-content-flags", async () => {
      const actual = await vi.importActual<typeof import("@/lib/student/student-content-flags")>(
        "@/lib/student/student-content-flags"
      );
      return {
        ...actual,
        studentSourcePackFileExists: () => false
      };
    });
    const { validateStudentStage } = await import("./validate-student-stage");
    const issues = validateStudentStage();
    expect(issues.some((i) => i.code === "SOURCE_PACK_MISSING")).toBe(true);
  });

  it("fails loudly when an unsupported directive is introduced", async () => {
    vi.resetModules();
    const { validateStudentManuscript } = await import("./validate-student-stage");

    const record: StudentLessonRecord = {
      id: "student-2-4",
      stage: "student",
      order: 4,
      slug: "the-architecture-of-the-world",
      title: "The Architecture of the World",
      subtitle: "The Great Table and the Watchtower system",
      lessonNumber: "Lesson 2.4",
      status: "shadow",
      sourcePackId: "SOURCE_PACK_4_STUDENT_2_4",
      sourcePackFileName: "SOURCE_PACK_4_STUDENT_2_4.md",
      previousLessonId: "student-2-3",
      nextLessonId: "student-2-5",
      relationshipNodeIds: ["great-table"],
      comparisonRequirements: {
        requiresVersionToggle: false,
        requiresInteractiveGrid: true,
        requiresSourceComparisonLayout: true,
        requiresRelationshipWeb: true
      },
      glossaryTerms: [],
      timelineAnchors: [],
      epistemicTonesHeader: ["historical"],
      markdownFileName: "STAGE_2_STUDENT_LESSON_4.md",
      internalPreviewOnly: true
    };

    const raw = `---\n+id: student-2-4\n+slug: the-architecture-of-the-world\n+title: The Architecture of the World\n+subtitle: The Great Table and the Watchtower system\n+stage: student\n+lessonNumber: \"Lesson 2.4\"\n+duration: \"32-42 minutes\"\n+sourcePackId: SOURCE_PACK_4_STUDENT_2_4\n+---\n+\n+### Learning Goals\n+\n+:::mystery-box\n+No.\n+:::\n+\n+# COMPANION ELEMENTS\n+\n+# CLOSING PASSAGE\n+\n+:::closing-passage\n+Close.\n+:::\n+\n+:::source-strip\n+*Epistemic status*\n+:::\n+`.replace(/^\+/gm, "");

    const issues = validateStudentManuscript(record, raw);
    expect(issues.some((i) => i.code === "UNSUPPORTED_DIRECTIVE")).toBe(true);
  });
});

