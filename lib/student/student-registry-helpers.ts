import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";

/** Ordered Stage 2 folios (Lesson 2.1–2.6). */
export function listStudentLessonsOrdered(): StudentLessonRecord[] {
  return [...studentLessonRegistry].sort((a, b) => a.order - b.order);
}

export function getStudentLessonByOrder(order: number): StudentLessonRecord | undefined {
  return studentLessonRegistry.find((r) => r.order === order);
}

export function getNeighboringStudentLessons(id: string): {
  previous: StudentLessonRecord | null;
  next: StudentLessonRecord | null;
} {
  const ordered = listStudentLessonsOrdered();
  const i = ordered.findIndex((r) => r.id === id);
  if (i === -1) return { previous: null, next: null };
  return {
    previous: i > 0 ? ordered[i - 1]! : null,
    next: i < ordered.length - 1 ? ordered[i + 1]! : null
  };
}

/** One mounted block in `StudentComparisonSlots` (Great Table demo merges version + source layout). */
export function studentComparisonSurfaceCount(record: StudentLessonRecord): number {
  const c = record.comparisonRequirements;
  const greatTableSlot =
    c.requiresSourceComparisonLayout || c.requiresVersionToggle ? 1 : 0;
  return (
    greatTableSlot +
    (c.requiresInteractiveGrid ? 1 : 0) +
    (c.requiresRelationshipWeb ? 1 : 0)
  );
}

/** Human-readable labels for sidebar / slots (no dashboard tone). */
export function comparisonRequirementLabels(record: StudentLessonRecord): string[] {
  const c = record.comparisonRequirements;
  const out: string[] = [];
  if (c.requiresSourceComparisonLayout || c.requiresVersionToggle) {
    out.push("Historical witness vs later arrangement (table fragment)");
  }
  if (c.requiresInteractiveGrid) out.push("Letter grid (structural fragment)");
  if (c.requiresRelationshipWeb) out.push("Transmission map (local slice)");
  return out;
}

/** Short labels for index rows — calm, non-marketing. */
export function comparisonSurfaceShortSummary(record: StudentLessonRecord): string {
  const parts: string[] = [];
  const c = record.comparisonRequirements;
  if (c.requiresSourceComparisonLayout || c.requiresVersionToggle) parts.push("Table fragment");
  if (c.requiresInteractiveGrid) parts.push("Grid");
  if (c.requiresRelationshipWeb) parts.push("Transmission");
  return parts.length ? parts.join(" · ") : "None declared";
}
