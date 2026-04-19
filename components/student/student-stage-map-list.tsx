"use client";

import Link from "next/link";
import { Inscribe } from "@/components/motion/inscribe";
import { STUDENT_PATH } from "@/lib/lessons/student-path";
import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";

export type StudentStageMapRow = {
  lesson: StudentLessonRecord;
  lessonOnDisk: boolean;
  sourcePackOnDisk: boolean;
  comparison: string;
};

function stageLabel(lesson: StudentLessonRecord): string {
  if (lesson.status === "open") return "Open folio";
  if (lesson.status === "shadow") return "Draft folio";
  if (lesson.status === "locked") return "Closed to visitors";
  if (lesson.status === "prototype") return "Bench copy";
  return "In preparation";
}

export function StudentStageMapList({ rows }: { rows: StudentStageMapRow[] }) {
  return (
    <ol className="space-y-0 border border-gold-dim/20 bg-ink/10" aria-label="Student lessons in catalogue order">
      {rows.map((row, idx) => {
        const { lesson, lessonOnDisk, sourcePackOnDisk, comparison } = row;
        const delay = Math.min(idx * 100, 400);
        return (
          <Inscribe
            key={lesson.id}
            as="li"
            delay={delay}
            className="border-b border-gold-dim/15 px-6 py-5 last:border-b-0 transition-colors duration-slow ease-gravity hover:bg-ink/20"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <Link
                href={`${STUDENT_PATH}/${lesson.slug}`}
                className="min-w-0 font-display text-gold-light underline decoration-gold-dim/40 underline-offset-4 outline-none ring-gold/0 transition-colors duration-slow ease-gravity hover:text-gold hover:decoration-gold-dim/60 focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <span className="text-balance">
                  {lesson.lessonNumber} — {lesson.title}
                </span>
              </Link>
              <span className="shrink-0 self-start font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim/70 sm:self-auto">
                {stageLabel(lesson)}
              </span>
            </div>
            {lesson.subtitle ? (
              <p className="mt-1.5 text-pretty text-[13px] leading-snug text-gold-dim/80">{lesson.subtitle}</p>
            ) : null}
            <dl className="mt-3 grid grid-cols-1 gap-3 text-[11px] text-gold-dim/90 sm:grid-cols-3 sm:gap-2">
              <div className="min-w-0">
                <dt className="font-display text-[9px] uppercase tracking-[0.12em] text-gold-dim/60">Reader column</dt>
                <dd className="mt-0.5 break-words text-gold-pale/80">{lessonOnDisk ? "On shelf" : "Not on shelf"}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-display text-[9px] uppercase tracking-[0.12em] text-gold-dim/60">Source pack</dt>
                <dd className="mt-0.5 break-words text-gold-pale/80">
                  {sourcePackOnDisk ? "Verification folio on shelf" : "Pending"}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="font-display text-[9px] uppercase tracking-[0.12em] text-gold-dim/60">Demonstrations</dt>
                <dd className="mt-0.5 break-words text-gold-pale/80">{comparison}</dd>
              </div>
            </dl>
          </Inscribe>
        );
      })}
    </ol>
  );
}
