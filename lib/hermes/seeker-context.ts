import { seekerLessonRegistry } from "@/lib/content-registry";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";
import type { DiscoveryEntry } from "@/lib/discovery/discovery-types";
import type { FormulaEntry } from "@/lib/grimoire/formula-types";
import type { JournalEntry } from "@/lib/journal/journal-types";
import type { ProgressStore } from "@/lib/progress/progress-types";
import { computeGrimoireMetrics } from "@/lib/grimoire/grimoire-metrics";
import { pickHostForProgress } from "@/lib/grimoire/host-intelligences";

export type SeekerContextBundle = {
  narrative: string;
  hostId: string;
  suggestedNextLessonHref: string | null;
};

export function buildSeekerContext(opts: {
  progress: ProgressStore;
  isLessonComplete: (id: string) => boolean;
  journalEntries: JournalEntry[];
  discoveries: DiscoveryEntry[];
  formulae: FormulaEntry[];
  hermesMemorySummary?: string;
  learningFocus?: string;
}): SeekerContextBundle {
  const metrics = computeGrimoireMetrics({
    progress: opts.progress,
    isLessonComplete: opts.isLessonComplete,
    journalEntries: opts.journalEntries,
    discoveries: opts.discoveries,
    formulae: opts.formulae
  });

  const host = pickHostForProgress({
    rank: opts.progress.rank,
    completedLessons: metrics.lessonsCompleted,
    formulaCount: metrics.formulae,
    journalCount: metrics.journalEntries
  });

  const completedIds = opts.progress.completedLessonIds;
  const lastVisited = opts.progress.lastVisitedLessonId;

  const nextSeeker = seekerLessonRegistry.find(
    (l) => l.status === "open" && !completedIds.includes(l.id)
  );
  const nextStudent = studentLessonRegistry.find((l) => !completedIds.includes(l.id));
  const nextLesson = nextSeeker ?? nextStudent;
  const suggestedNextLessonHref = nextSeeker
    ? `/path/seeker/${nextSeeker.slug}`
    : nextStudent
      ? `/path/student/${nextStudent.slug}`
      : null;

  const recentFormulae = opts.formulae
    .slice(0, 3)
    .map((f) => `• [depth ${f.meditationDepth}] ${f.spark}`)
    .join("\n");

  const recentJournal = opts.journalEntries
    .slice(0, 2)
    .map((j) => `• ${j.title} (${j.type})`)
    .join("\n");

  const narrative = `
SEEKER PROFILE (this person only):
- Rank: ${metrics.rank}
- Lessons completed: ${metrics.lessonsCompleted} / ${metrics.lessonsTotal}
- Clear channel index: ${metrics.clearChannelScore}
- Last visited lesson id: ${lastVisited ?? "none"}
- Journal entries: ${metrics.journalEntries}
- Discoveries logged: ${metrics.discoveries}
- Formulae (aha moments) inscribed: ${metrics.formulae}
- Primary host persona for this season: ${host.name} — ${host.domain}
${opts.hermesMemorySummary ? `- Hermes remembers: ${opts.hermesMemorySummary}` : ""}
${opts.learningFocus ? `- Stated learning focus: ${opts.learningFocus}` : ""}

Recent formulae:
${recentFormulae || "• none yet"}

Recent journal:
${recentJournal || "• none yet"}

Suggested next folio: ${nextLesson ? `${nextLesson.lessonNumber} ${nextLesson.title}` : "threshold / review"}
`.trim();

  return {
    narrative,
    hostId: host.id,
    suggestedNextLessonHref
  };
}
