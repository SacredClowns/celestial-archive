import { seekerLessonRegistry } from "@/lib/content-registry";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";

/** Compact course map Hermes carries — grows when lessons are added to registries. */
export function buildCourseCorpus(): string {
  const seeker = seekerLessonRegistry
    .filter((l) => l.status === "open")
    .map((l) => `- ${l.lessonNumber}: ${l.title}${l.subtitle ? ` — ${l.subtitle}` : ""}`)
    .join("\n");

  const student = studentLessonRegistry
    .map((l) => `- ${l.lessonNumber}: ${l.title}`)
    .join("\n");

  return `INITIATION PATH (living curriculum — expands over time)

Stage 1 Seeker:
${seeker}

Stage 2 Student:
${student}

Stage 3+ Observer and beyond: in preparation (watchtowers, sessions archive, aethyrs, observatory available as spatial tools).

Core practices woven through the path: Source Discernment, Single-Witness Discernment, The Strange Feeling (intensity vs truth).`;
}
