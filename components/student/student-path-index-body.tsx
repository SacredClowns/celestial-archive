import Link from "next/link";
import { SEEKER_PATH } from "@/lib/content-registry";
import { STUDENT_PATH } from "@/lib/lessons/student-path";
import { studentLessonFilingSnapshot } from "@/lib/student/student-content-flags";
import { comparisonSurfaceShortSummary } from "@/lib/student/student-registry-helpers";
import type { StudentIndexFraming } from "@/lib/curriculum/load-student-framing";
import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";
import { StudentFramingMarkdown } from "@/components/student/student-framing-markdown";
import { StudentStageMapList } from "@/components/student/student-stage-map-list";

type StudentPathIndexBodyProps = {
  lessons: StudentLessonRecord[];
  framing: StudentIndexFraming | null;
};

export function StudentPathIndexBody({ lessons, framing }: StudentPathIndexBodyProps) {
  const stageMapRows = lessons.map((lesson) => {
    const snap = studentLessonFilingSnapshot(lesson);
    return {
      lesson,
      lessonOnDisk: snap.lessonOnDisk,
      sourcePackOnDisk: snap.sourcePackOnDisk,
      comparison: comparisonSurfaceShortSummary(lesson)
    };
  });

  return (
    <div className="reading-column mx-auto min-w-0 space-y-12 px-1 py-6 sm:px-0">
      <header className="space-y-5 border-b border-gold-dim/30 pb-10">
        <p className="font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim">Stage 2</p>
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold sm:text-5xl">Student</h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-gold-pale/95">
          <span className="text-gold-light">Start anywhere on the map</span> — each row opens a folio. Read in order when
          you can; mid-entry is allowed if you accept the cross-references each room assumes.
        </p>
        <p className="max-w-2xl text-pretty text-[14px] leading-relaxed text-gold-pale/85">
          Same manuscripts as Seeker — here the Archive foregrounds structure, comparison, and later arrangements.
        </p>
      </header>

      {framing ? (
        <div className="space-y-10">
          <section
            className="border border-gold-dim/20 bg-ink/15 px-5 py-7 sm:px-7 sm:py-8"
            aria-labelledby="student-placard-heading"
          >
            <h2 id="student-placard-heading" className="sr-only">
              Student placard
            </h2>
            <StudentFramingMarkdown markdown={framing.introTeaser} />
            {framing.introRest ? (
              <details className="group mt-6 border-t border-gold-dim/20 pt-5">
                <summary className="cursor-pointer list-none font-display text-[10px] uppercase tracking-[0.16em] text-gold-dim transition-colors duration-slow ease-gravity hover:text-gold-light marker:content-none [&::-webkit-details-marker]:hidden">
                  Continue reading this placard
                </summary>
                <div className="mt-5">
                  <StudentFramingMarkdown markdown={framing.introRest} />
                </div>
              </details>
            ) : null}
          </section>

          {framing.bridge ? (
            <aside
              className="border-l-2 border-gold-dim/25 pl-5 sm:pl-6"
              aria-label="Between Seeker and Student"
            >
              <StudentFramingMarkdown
                markdown={framing.bridge}
                className="text-[14px] leading-[1.82] text-gold-pale/95 [&_h2]:mt-0 [&_h2]:border-t-0 [&_h2]:pt-0 [&_h2]:text-base [&_h3]:text-[15px] [&_p]:mt-3"
              />
            </aside>
          ) : null}

          {framing.fieldGuide ? (
            <details className="border border-gold-dim/15 bg-ink/10 open:border-gold-dim/25">
              <summary className="cursor-pointer list-none px-5 py-4 font-display text-[10px] uppercase tracking-[0.16em] text-gold-dim transition-colors duration-slow ease-gravity hover:text-gold-light marker:content-none [&::-webkit-details-marker]:hidden sm:px-6">
                How to read this archive — field guide
              </summary>
              <div className="border-t border-gold-dim/15 px-5 pb-7 pt-5 sm:px-6 sm:pb-8">
                <StudentFramingMarkdown markdown={framing.fieldGuide} />
              </div>
            </details>
          ) : null}
        </div>
      ) : (
        <p className="border border-gold-dim/25 bg-ink/20 px-5 py-4 text-[14px] text-gold-dim">
          The Student placard could not be loaded from the curriculum shelf.
        </p>
      )}

      <section className="space-y-5" aria-labelledby="student-stage-map-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="student-stage-map-heading" className="font-display text-base tracking-[0.1em] text-gold-light">
            Stage map
          </h2>
          <p className="max-w-md text-pretty text-[11px] text-gold-dim/80 sm:text-right">
            Marks describe shelf posture — not rank, merit, or completion.
          </p>
        </div>
        <StudentStageMapList rows={stageMapRows} />
      </section>

      <nav className="border-t border-gold-dim/20 pt-7 text-[13px] text-gold-dim" aria-label="Related paths">
        <p className="font-display text-[9px] uppercase tracking-[0.14em] text-gold-dim/60">Earlier stage</p>
        <p className="mt-2">
          <Link href={SEEKER_PATH} className="text-gold-light underline decoration-gold-dim/40 underline-offset-4 transition-colors duration-slow ease-gravity hover:text-gold">
            Seeker path
          </Link>
        </p>
      </nav>
    </div>
  );
}
