import { seekerLessonRegistry } from "@/lib/content-registry";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";
import type { DiscoveryEntry } from "@/lib/discovery/discovery-types";
import type { FormulaEntry } from "@/lib/grimoire/formula-types";
import type { JournalEntry } from "@/lib/journal/journal-types";
import type { ProgressStore } from "@/lib/progress/progress-types";

export type GrimoireMetrics = {
  rank: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  seekerProgress: { done: number; total: number };
  studentProgress: { done: number; total: number };
  journalEntries: number;
  discoveries: number;
  formulae: number;
  formulaShares: number;
  meditationDepthAvg: number | null;
  lastVisitedLessonId: string | null;
  clearChannelScore: number;
};

export function computeGrimoireMetrics(opts: {
  progress: ProgressStore;
  isLessonComplete: (id: string) => boolean;
  journalEntries: JournalEntry[];
  discoveries: DiscoveryEntry[];
  formulae: FormulaEntry[];
}): GrimoireMetrics {
  const { progress, isLessonComplete, journalEntries, discoveries, formulae } = opts;

  const seekerOpen = seekerLessonRegistry.filter((l) => l.status === "open");
  const seekerDone = seekerOpen.filter((l) => isLessonComplete(l.id)).length;
  const studentDone = studentLessonRegistry.filter((l) => isLessonComplete(l.id)).length;
  const lessonsCompleted = seekerDone + studentDone;
  const lessonsTotal = seekerOpen.length + studentLessonRegistry.length;

  const formulaShares = formulae.reduce(
    (n, f) =>
      n +
      f.analytics.sharedTwitter +
      f.analytics.sharedBluesky +
      f.analytics.sharedLinkedIn +
      f.analytics.sharedGeneric,
    0
  );

  const depths = formulae.map((f) => f.meditationDepth);
  const meditationDepthAvg =
    depths.length > 0 ? depths.reduce((a, b) => a + b, 0) / depths.length : null;

  const clearChannelScore = Math.min(
    100,
    Math.round(
      lessonsCompleted * 8 +
        journalEntries.length * 5 +
        discoveries.length * 4 +
        formulae.length * 10 +
        (meditationDepthAvg ?? 1) * 6
    )
  );

  return {
    rank: progress.rank,
    lessonsCompleted,
    lessonsTotal,
    seekerProgress: { done: seekerDone, total: seekerOpen.length },
    studentProgress: { done: studentDone, total: studentLessonRegistry.length },
    journalEntries: journalEntries.length,
    discoveries: discoveries.length,
    formulae: formulae.length,
    formulaShares,
    meditationDepthAvg,
    lastVisitedLessonId: progress.lastVisitedLessonId,
    clearChannelScore
  };
}
