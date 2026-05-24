"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress/progress-context";
import { seekerLessonRegistry } from "@/lib/content-registry";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";

export function PathProgressDashboard() {
  const { progress, isLessonComplete, completedCount } = useProgress();

  const seekerTotal = seekerLessonRegistry.filter((l) => l.status === "open").length;
  const studentTotal = studentLessonRegistry.length;
  const seekerDone = seekerLessonRegistry.filter((l) => isLessonComplete(l.id)).length;
  const studentDone = studentLessonRegistry.filter((l) => isLessonComplete(l.id)).length;

  return (
    <div className="rounded-sm border border-gold-dim/25 bg-ink/20 p-6">
      <p className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim">Progress on this device</p>
      <p className="mt-2 font-display text-2xl text-gold">
        {completedCount} lesson{completedCount === 1 ? "" : "s"} marked complete
      </p>
      <p className="mt-1 text-sm text-gold-dim">
        Current rank: <span className="text-gold-pale">{progress.rank}</span>
      </p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase text-gold-dim">Seeker</dt>
          <dd className="font-display text-lg text-gold">
            {seekerDone} / {seekerTotal}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gold-dim">Student</dt>
          <dd className="font-display text-lg text-gold">
            {studentDone} / {studentTotal}
          </dd>
        </div>
      </dl>
      {progress.lastVisitedLessonId ? (
        <p className="mt-4 text-xs text-gold-dim">
          Last visited lesson id: {progress.lastVisitedLessonId}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-4">
        <Link
          href="/path/seeker"
          className="font-display text-xs uppercase tracking-[0.14em] text-gold hover:text-gold-light"
        >
          Continue on the path →
        </Link>
        <Link
          href="/path/settings"
          className="font-display text-xs uppercase tracking-[0.14em] text-gold-dim hover:text-gold"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
