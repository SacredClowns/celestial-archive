"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { LensTabs } from "@/components/lesson/lens-tabs";
import { LessonMarkdownBody } from "@/components/lesson/lesson-markdown-body";
import { LessonNavFooter } from "@/components/lesson/lesson-nav-footer";
import { LessonProgressBar } from "@/components/lesson/lesson-progress-bar";
import { splitLensSections } from "@/lib/lesson-markdown/split-lens-sections";
import { StudentComparisonSlots } from "@/components/student/student-comparison-slots";
import { StudentLessonSidebar } from "@/components/student/student-lesson-sidebar";
import { Inscribe } from "@/components/motion/inscribe";
import { LessonSafetyFrame } from "@/components/student/lesson-safety-frame";
import { PendingComparativeArrangement } from "@/components/student/pending-comparative-arrangement";
import { SEEKER_PATH } from "@/lib/content-registry";
import { getGlossaryEntryByTerm } from "@/lib/glossary";
import { useProgress } from "@/lib/progress/progress-context";
import { STUDENT_PATH } from "@/lib/lessons/student-path";
import type { GlossaryItem } from "@/lib/lesson-types";
import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";
import { studentComparisonSurfaceCount } from "@/lib/student/student-registry-helpers";
import type { StudentLessonViewModel } from "@/lib/student/student-lesson-view";

type Panel = { type: "glossary"; item: GlossaryItem } | null;

function entryToGlossaryItem(term: string): GlossaryItem | null {
  const e = getGlossaryEntryByTerm(term);
  if (!e) return null;
  return {
    term: e.term,
    definition: e.definition,
    category: e.category,
    beginnerLevel: e.level,
    relatedTerms: e.relatedTerms,
    badge: e.primaryBadge
  };
}

function DefaultStudentScaffold({ record }: { record: StudentLessonRecord }) {
  const n = studentComparisonSurfaceCount(record);
  return (
    <div className="space-y-6">
      <p className="leading-[1.95] text-gold-pale">
        The catalogue names this folio, but its reader manuscript is not on the shelf in this preview. When{" "}
        <span className="font-mono text-gold-light/90">{record.markdownFileName ?? "the folio file"}</span> is placed
        beside the other Stage 2 manuscripts, the reader column will appear here unchanged in route.
      </p>
      {n > 0 ? (
        <p className="text-sm text-gold-dim">
          Demonstrations below follow the folio&apos;s declared surfaces. They hold arrangement in view — not verdict.
        </p>
      ) : null}
    </div>
  );
}

export function StudentLessonRenderer({ viewModel }: { viewModel: StudentLessonViewModel }) {
  const { record, markdown, readerColumnParseFailed } = viewModel;
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileContextOpen, setMobileContextOpen] = useState(false);
  const { setLastVisited } = useProgress();
  const storageKey = `student-lesson-context:${record.slug}`;

  useEffect(() => {
    setLastVisited(record.id);
  }, [record.id, setLastVisited]);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === "1") setMobileContextOpen(true);
  }, [storageKey]);

  const toggleMobileContext = () => {
    const next = !mobileContextOpen;
    setMobileContextOpen(next);
    sessionStorage.setItem(storageKey, next ? "1" : "0");
  };

  const openGlossary = (term: string) => {
    const item = entryToGlossaryItem(term);
    if (item) setPanel({ type: "glossary", item });
  };

  const fullGlossarySlug = useMemo(() => {
    if (panel?.type !== "glossary") return null;
    return getGlossaryEntryByTerm(panel.item.term)?.slug ?? null;
  }, [panel]);

  const relatedCount = useMemo(() => {
    if (panel?.type !== "glossary") return 0;
    return panel.item.relatedTerms?.length ?? 0;
  }, [panel]);

  const glossaryTermSet = useMemo(
    () => new Set(viewModel.displayGlossaryTerms),
    [viewModel.displayGlossaryTerms]
  );

  const lensParts = useMemo(
    () => splitLensSections(markdown?.main ?? ""),
    [markdown?.main]
  );

  const hasMarkdown = Boolean(markdown?.main?.trim());
  const showComparisonSlots = studentComparisonSurfaceCount(record) > 0;
  const showPendingComparativeOnly =
    studentComparisonSurfaceCount(record) === 0 && !hasMarkdown && !readerColumnParseFailed;

  return (
    <>
      <LessonProgressBar />
    <div className="grid min-w-0 gap-10 px-1 pb-4 sm:px-0 lg:grid-cols-[minmax(0,820px)_minmax(0,280px)] lg:gap-14">
      <article
        className="inscribed-frame mx-auto min-w-0 w-full max-w-[820px] scroll-mt-14 bg-deep/50 px-6 py-12 sm:px-12 sm:py-16"
        aria-labelledby="student-lesson-title"
      >
        <header className="mb-14 space-y-6 border-b border-gold-dim/30 pb-10">
          <p className="font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim/70">
            <Link href="/archive" className="transition-colors duration-slow ease-gravity hover:text-gold-light">
              Archive
            </Link>
            <span className="text-gold-dim/35"> · </span>
            <Link href={STUDENT_PATH} className="transition-colors duration-slow ease-gravity hover:text-gold-light">
              Student
            </Link>
            <span className="text-gold-dim/35"> · </span>
            <span className="text-gold-dim/50">{record.lessonNumber}</span>
          </p>
          <h1 id="student-lesson-title" className="font-display text-4xl tracking-[0.06em] text-gold sm:text-[2.75rem]">
            {viewModel.displayTitle}
          </h1>
          {viewModel.displaySubtitle ? (
            <p className="text-balance text-lg leading-snug text-gold-light/85 sm:text-xl">{viewModel.displaySubtitle}</p>
          ) : null}
          <div className="flex items-center gap-4">
            <p className="text-[13px] text-gold-dim/80">
              Stage 2 · {record.lessonNumber} · {viewModel.displayDuration}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {viewModel.displayEpistemicTonesHeader.map((tone) => (
              <EpistemicBadge key={tone} tone={tone} compact />
            ))}
          </div>
        </header>

        {readerColumnParseFailed ? (
          <blockquote className="mb-12 border-l-2 border-amber/50 bg-parchment-dark/35 px-5 py-4 text-sm leading-relaxed text-gold-pale">
            This folio is catalogued, but the reader column could not be opened — frontmatter, required sections, or the
            split contract failed validation. The file remains on the shelf; only the display is withheld until repair.
          </blockquote>
        ) : !hasMarkdown ? (
          <blockquote className="mb-12 border-l-2 border-gold-dim/60 bg-parchment/30 px-5 py-4 font-display text-sm italic leading-relaxed tracking-[0.04em] text-gold-pale">
            Student rank does not ask for more belief. It asks for more care.
          </blockquote>
        ) : null}

        {hasMarkdown && markdown && !readerColumnParseFailed ? (
          <Inscribe>
            <div className="lesson-markdown-root min-w-0 space-y-4 pb-2">
              {lensParts.before ? (
                <LessonMarkdownBody
                  markdown={lensParts.before}
                  glossaryTermSet={glossaryTermSet}
                  onGlossaryTerm={openGlossary}
                  verificationPending
                  lessonSlug={record.slug}
                />
              ) : null}
              <LensTabs
                lenses={lensParts.lenses}
                glossaryTermSet={glossaryTermSet}
                onGlossaryTerm={openGlossary}
                verificationPending
                lessonSlug={record.slug}
              />
              {lensParts.after ? (
                <LessonMarkdownBody
                  markdown={lensParts.after}
                  glossaryTermSet={glossaryTermSet}
                  onGlossaryTerm={openGlossary}
                  verificationPending
                  lessonSlug={record.slug}
                />
              ) : null}
              {lensParts.lenses.length === 0 && !lensParts.before && !lensParts.after ? (
                <LessonMarkdownBody
                  markdown={markdown.main}
                  glossaryTermSet={glossaryTermSet}
                  onGlossaryTerm={openGlossary}
                  verificationPending
                  lessonSlug={record.slug}
                />
              ) : null}
            </div>
          </Inscribe>
        ) : readerColumnParseFailed ? null : (
          <Inscribe>
            <DefaultStudentScaffold record={record} />
          </Inscribe>
        )}

        {showComparisonSlots ? (
          <Inscribe delay={100}>
          <section
            className={`${hasMarkdown && !readerColumnParseFailed ? "mt-16" : "mt-12"} space-y-6`}
            aria-labelledby="student-comparison-study-heading"
          >
            <h2 id="student-comparison-study-heading" className="sr-only">
              Structural study for this folio
            </h2>
            <LessonSafetyFrame title="How to read this structure">
              The surfaces below map surviving transmission states. They demonstrate arrangement, not absolute truth.
              Gaps and contradictions are intentional features of the Archive, not puzzles to be solved.
            </LessonSafetyFrame>
            <StudentComparisonSlots record={record} />
          </section>
          </Inscribe>
        ) : showPendingComparativeOnly ? (
          <Inscribe>
          <section className="mt-12" aria-labelledby="student-pending-comparison-heading">
            <h2 id="student-pending-comparison-heading" className="sr-only">
              Comparative demonstrations
            </h2>
            <PendingComparativeArrangement />
          </section>
          </Inscribe>
        ) : null}

        {hasMarkdown && markdown && !readerColumnParseFailed && markdown.closing.trim() ? (
          <Inscribe>
          <section className="mt-28 border-t border-gold-dim/30 pt-16" aria-label="Closing passage">
            <div className="mx-auto mb-10 h-px w-16 bg-gold-dim/30" />

            <LessonMarkdownBody
              markdown={markdown.closing}
              glossaryTermSet={glossaryTermSet}
              onGlossaryTerm={openGlossary}
              verificationPending
            />
          </section>
          </Inscribe>
        ) : null}

        {hasMarkdown && markdown && !readerColumnParseFailed && markdown.postface.trim() ? (
          <Inscribe>
          <div
            className="mt-20 border border-gold-dim/20 bg-ink/20 px-5 py-8 sm:px-8"
            role="region"
            aria-label="Sources and epistemic footing"
          >
            <p className="mb-6 font-display text-[10px] uppercase tracking-[0.16em] text-gold-dim/70">
              {"Sources and epistemic footing"}
            </p>
            <LessonMarkdownBody
              markdown={markdown.postface}
              glossaryTermSet={glossaryTermSet}
              onGlossaryTerm={openGlossary}
              verificationPending
              tieredSourcePostface
            />
          </div>
          </Inscribe>
        ) : null}

        <section className="inscribed-frame mt-12 bg-ink/30 px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={toggleMobileContext}
            className="flex w-full items-center justify-between gap-3 text-left font-display text-sm uppercase tracking-[0.14em] text-gold-light"
            aria-expanded={mobileContextOpen}
            aria-controls="student-mobile-context-panel"
          >
            <span>Folio context</span>
            <span className="text-gold-dim" aria-hidden>
              {mobileContextOpen ? "−" : "+"}
            </span>
          </button>
          {mobileContextOpen ? (
            <div
              id="student-mobile-context-panel"
              className="mt-5 space-y-4 border-t border-gold-dim/40 pt-4"
            >
              <StudentLessonSidebar viewModel={viewModel} onOpenGlossary={openGlossary} />
            </div>
          ) : null}
        </section>

        <LessonNavFooter
          stageLabel="Return to Student path"
          stageHref={STUDENT_PATH}
          previous={
            viewModel.previousLesson?.href
              ? {
                  href: viewModel.previousLesson.href,
                  title: viewModel.previousLesson.label.replace(/^←\s*/, ""),
                  label: "Previous lesson"
                }
              : null
          }
          next={
            viewModel.nextLesson?.href
              ? {
                  href: viewModel.nextLesson.href,
                  title: viewModel.nextLesson.label.replace(/\s*→$/, ""),
                  label: viewModel.nextLesson.note ?? "Next lesson"
                }
              : null
          }
        />
      </article>

      <aside className="hidden min-w-0 space-y-4 lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-5.5rem)] lg:overflow-y-auto">
        <StudentLessonSidebar viewModel={viewModel} onOpenGlossary={openGlossary} />
      </aside>

      {panel ? (
        <div
          className="panel-backdrop-enter fixed inset-0 z-50 flex justify-end bg-ink/70"
          onClick={() => setPanel(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-glossary-panel-title"
        >
          <section
            className="panel-enter h-full w-full max-w-md overflow-y-auto border-l border-gold-dim/55 bg-deep px-5 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 id="student-glossary-panel-title" className="font-display text-2xl tracking-[0.04em] text-gold">
                {panel.item.term}
              </h3>
              <button
                type="button"
                onClick={() => setPanel(null)}
                aria-label="Close panel"
                className="text-gold-dim transition-colors duration-slow ease-gravity hover:text-gold-light"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm text-gold-dim">{panel.item.category}</p>
            <p className="mt-4 leading-[1.9] text-gold-pale">{panel.item.definition}</p>
            <p className="mt-3 text-xs text-gold-dim">Related terms in glossary: {relatedCount}</p>
            <div className="mt-8 border-t border-gold-dim/40 pt-5">
              {fullGlossarySlug ? (
                <Link
                  href={`/glossary/${fullGlossarySlug}`}
                  onClick={() => setPanel(null)}
                  className="inline-flex border border-gold-dim/60 bg-ink/30 px-4 py-2 font-display text-sm uppercase tracking-[0.18em] text-gold-light transition-colors duration-slow ease-gravity hover:border-gold/80 hover:text-gold"
                >
                  Open full glossary entry {"→"}
                </Link>
              ) : (
                <p className="text-xs italic text-gold-dim">
                  Full entry forthcoming. This term has a lesson surface only at present.
                </p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </div>
    </>
  );
}