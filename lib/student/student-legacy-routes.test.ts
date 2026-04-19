import { describe, expect, it } from "vitest";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";

describe("Student legacy lesson-id paths", () => {
  it("maps each catalogue lesson id to a canonical slug for redirects", () => {
    const pairs = studentLessonRegistry.map((r) => [r.id, r.slug] as const);
    expect(pairs).toEqual([
      ["student-2-1", "the-seven-kings"],
      ["student-2-2", "the-book-that-cannot-be-read"],
      ["student-2-3", "a-grammar-of-invocation"],
      ["student-2-4", "the-architecture-of-the-world"],
      ["student-2-5", "the-inheritors"],
      ["student-2-6", "the-voice-and-the-abyss"]
    ]);
  });
});
