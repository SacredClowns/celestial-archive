"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getSeekerRecordBySlug, SEEKER_PATH } from "@/lib/content-registry";
import { useProgress } from "@/lib/progress/progress-context";
import { LensTabs } from "@/components/lesson/lens-tabs";
import { LessonMarkdownBody } from "@/components/lesson/lesson-markdown-body";
import { LessonProgressBar } from "@/components/lesson/lesson-progress-bar";
import { LessonNavFooter } from "@/components/lesson/lesson-nav-footer";
import { LessonSidebar } from "@/components/lesson/lesson-sidebar";
import { Inscribe } from "@/components/motion/inscribe";
import { splitLensSections } from "@/lib/lesson-markdown/split-lens-sections";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import {
  DiscernmentPracticeBlock,
  MultipleInterpretationsBlock,
  NoticeBlock,
  ReflectionPromptBlock,
  WarningBlock
} from "@/components/discernment/blocks";
import { ClaimSource, GlossaryItem, LessonBlock, LessonSchema } from "@/lib/lesson-types";
import { getGlossaryEntryByTerm } from "@/lib/glossary";

type PanelState =
  | { type: "glossary"; item: GlossaryItem }
  | { type: "claim"; item: ClaimSource }
  | null;

function renderBlock(block: LessonBlock, idx: number) {
  if (block.type === "paragraph") {
    return (
      <p key={idx} className="leading-[1.9] text-gold-pale">
        {block.text}
      </p>
    );
  }

  if (block.type === "notice") return <NoticeBlock key={idx}>{block.text}</NoticeBlock>;
  if (block.type === "discernment") return <DiscernmentPracticeBlock key={idx}>{block.text}</DiscernmentPracticeBlock>;
  if (block.type === "reflection") return <ReflectionPromptBlock key={idx}>{block.text}</ReflectionPromptBlock>;
  if (block.type === "warning") return <WarningBlock key={idx}>{block.text}</WarningBlock>;
  return <MultipleInterpretationsBlock key={idx} items={block.items} />;
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="inscribed-frame bg-ink/35 px-4 py-4">
      <h3 className="font-display text-sm uppercase tracking-[0.12em] text-gold-light">{title}</h3>
      <div className="mt-3 space-y-2 text-sm leading-[1.7] text-gold-pale">{children}</div>
    </section>
  );
}

function LessonWebSections({
  lesson,
  openGlossary
}: {
  lesson: LessonSchema;
  openGlossary: (term: string) => void;
}) {
  return (
    <>
      <SidebarSection title="Key Glossary Terms">
        {lesson.sidebar.glossaryTerms.map((item) => (
          <div key={item.term}>
            <button
              onClick={() => openGlossary(item.term)}
              className="text-left font-display text-gold-light underline decoration-gold-dim underline-offset-4 transition-colors duration-slow ease-gravity hover:text-gold"
            >
              {item.term}
            </button>
            <p className="text-gold-dim">{item.hoverDefinition}</p>
          </div>
        ))}
      </SidebarSection>

      <SidebarSection title="Related People">
        {lesson.sidebar.relatedPeople.map((item) => (
          <div key={item.name}>
            <p className="font-display text-gold-light">{item.name}</p>
            <p className="text-gold-dim">
              {item.role} · {item.lifespan}
            </p>
          </div>
        ))}
      </SidebarSection>

      <SidebarSection title="Related Texts">
        {lesson.sidebar.relatedTexts.map((item) => (
          <div key={item.title} className="border-l border-gold-dim/45 pl-2">
            <p className="text-gold-light">{item.title}</p>
            <p className="text-gold-dim">
              {item.author} · {item.year} · {item.traditionColor}
            </p>
          </div>
        ))}
      </SidebarSection>

      <SidebarSection title="Timeline Anchors">
        {lesson.sidebar.timelineAnchors.map((item) => (
          <p key={item.date} className="text-gold-pale">
            <span className="text-gold-light">{item.date}</span> - {item.event}
          </p>
        ))}
      </SidebarSection>

      <SidebarSection title="Related Questions">
        {lesson.sidebar.relatedQuestions.map((q) => (
          <p key={q} className="italic text-amber">
            ? {q}
          </p>
        ))}
      </SidebarSection>

      <SidebarSection title="Shadowed Future Concepts">
        {lesson.sidebar.shadowItems.map((item) => (
          <div key={item.concept} className="border border-dashed border-gold-dim/45 px-2 py-2 opacity-60">
            <p className="font-display text-gold-dim">{item.concept}</p>
            <p className="text-gold-dim">{item.note}</p>
          </div>
        ))}
      </SidebarSection>
    </>
  );
}

export function LessonRenderer({ lesson }: { lesson: LessonSchema }) {
  const [panel, setPanel] = useState<PanelState>(null);
  const [mobileWebOpen, setMobileWebOpen] = useState(false);
  const { setLastVisited } = useProgress();
  const seekerRecord = getSeekerRecordBySlug(lesson.slug);

  useEffect(() => {
    if (seekerRecord) setLastVisited(seekerRecord.id);
  }, [seekerRecord, setLastVisited]);

  useEffect(() => {
    const key = `lesson-web-open:${lesson.slug}`;
    const priorState = sessionStorage.getItem(key);
    if (priorState === "1") setMobileWebOpen(true);
  }, [lesson.slug]);

  const glossaryLookup = useMemo(() => {
    const map = new Map<string, GlossaryItem>();
    lesson.glossarySurface.forEach((item) => map.set(item.term, item));
    return map;
  }, [lesson.glossarySurface]);

  const claimLookup = useMemo(() => {
    const map = new Map<string, ClaimSource>();
    lesson.sourceClaims.forEach((item) => map.set(item.claimId, item));
    return map;
  }, [lesson.sourceClaims]);

  const openGlossary = (term: string) => {
    let item = glossaryLookup.get(term);
    if (!item) {
      const entry = getGlossaryEntryByTerm(term);
      if (entry) {
        item = {
          term: entry.term,
          definition: entry.definition,
          category: entry.category,
          beginnerLevel: entry.level,
          relatedTerms: entry.relatedTerms,
          badge: entry.primaryBadge
        };
      }
    }
    if (item) setPanel({ type: "glossary", item });
  };

  const openClaim = (id: string) => {
    const item = claimLookup.get(id);
    if (item) setPanel({ type: "claim", item });
  };

  const fullGlossarySlug = useMemo(() => {
    if (panel?.type !== "glossary") return null;
    const entry = getGlossaryEntryByTerm(panel.item.term);
    return entry?.slug ?? null;
  }, [panel]);

  const featuredTerms =
    lesson.contentMode === "markdown" ? [] : lesson.glossarySurface.slice(0, 5);

  const glossaryTermSet = useMemo(() => {
    const s = new Set<string>();
    lesson.sidebar.glossaryTerms.forEach((g) => s.add(g.term));
    const rec = getSeekerRecordBySlug(lesson.slug);
    rec?.glossaryTerms.forEach((t) => s.add(t));
    return s;
  }, [lesson.slug, lesson.sidebar.glossaryTerms]);

  const lensParts = useMemo(
    () => splitLensSections(lesson.markdownMain ?? ""),
    [lesson.markdownMain]
  );

  const toggleMobileWeb = () => {
    const nextState = !mobileWebOpen;
    setMobileWebOpen(nextState);
    sessionStorage.setItem(`lesson-web-open:${lesson.slug}`, nextState ? "1" : "0");
  };

  return (
    <>
      <LessonProgressBar />
    <div className="grid gap-8 lg:grid-cols-[minmax(0,720px)_280px]">
      <article className="inscribed-frame mx-auto w-full reading-column bg-deep/55 px-5 py-8 sm:px-8 sm:py-10">
        <header className="mb-16 space-y-4 border-b border-gold-dim/45 pb-8">
          <p className="font-display text-xs uppercase tracking-[0.15em] text-gold-dim">
            <Link href="/archive" className="hover:text-gold-light transition-colors duration-slow ease-gravity">
              Archive
            </Link>
            {" — "}
            <Link href={SEEKER_PATH} className="hover:text-gold-light transition-colors duration-slow ease-gravity">
              Seeker path
            </Link>
            {" — "}
            {lesson.lessonNumber} — {lesson.title}
          </p>
          <p className="font-display text-xs text-gold-dim">
            <Link href={SEEKER_PATH} className="border-b border-gold-dim/50 transition-colors duration-slow ease-gravity hover:text-gold-light">
              Return to Seeker path
            </Link>
          </p>
          <div className="flex flex-wrap gap-2">
            {lesson.epistemicTones.map((tone) => (
              <EpistemicBadge key={tone} tone={tone} compact />
            ))}
          </div>
          <h1 className="font-display text-4xl tracking-[0.06em] text-gold">{lesson.title}</h1>
          {lesson.subtitle ? <p className="text-gold-light">{lesson.subtitle}</p> : null}
          <p className="text-gold-light">
            {lesson.stage} · {lesson.lessonNumber} · {lesson.duration}
          </p>
          {lesson.sourcePackId ? (
            <aside className="border border-gold-dim/40 bg-ink/30 px-4 py-3 text-sm text-gold-dim">
              <span className="font-display uppercase tracking-[0.14em] text-gold-light">Source pack</span>
              <p className="mt-2 font-mono text-gold-pale">{lesson.sourcePackId}</p>
              <p className="mt-1 text-xs italic">
                Citations, badge audit, and verification live in the pack; this folio follows the published lesson text.
              </p>
            </aside>
          ) : null}
        </header>

        <section className="inscribed-frame mb-12 bg-deep/45 px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={toggleMobileWeb}
            className="flex w-full items-center justify-between gap-3 text-left font-display text-sm uppercase tracking-[0.14em] text-gold-light"
            aria-expanded={mobileWebOpen}
          >
            <span>Lesson Web</span>
            <span className="text-gold-dim" aria-hidden>
              {mobileWebOpen ? "-" : "+"}
            </span>
          </button>
          {mobileWebOpen ? (
            <div className="mt-5 space-y-4 border-t border-gold-dim/40 pt-4">
              <LessonWebSections lesson={lesson} openGlossary={openGlossary} />
            </div>
          ) : null}
        </section>

        <section className="mb-16 border-l border-gold-dim/40 pl-4">
          <h2 className="font-display text-xl tracking-[0.06em] text-gold-light">Timeline anchors</h2>
          <ul className="mt-4 space-y-2 text-gold-pale">
            {lesson.sidebar.timelineAnchors.map((a) => (
              <li key={`${a.date}-${a.event}`}>
                <span className="text-gold-light">{a.date}</span>
                {" — "}
                {a.event}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gold-dim">
            Full chronology:{" "}
            <Link
              href={lesson.timelineHookHref ?? "/timeline"}
              className="border-b border-gold-dim text-gold-light transition-colors duration-slow ease-gravity hover:text-gold"
            >
              Timeline pillar
            </Link>{" "}
            (under construction — hook preserved for integration).
          </p>
        </section>

        {lesson.contentMode === "markdown" ? (
          <>
            <Inscribe>
              <div className="lesson-body mb-8 space-y-4">
                {lensParts.before ? (
                  <LessonMarkdownBody
                    markdown={lensParts.before}
                    glossaryTermSet={glossaryTermSet}
                    onGlossaryTerm={openGlossary}
                    lessonSlug={lesson.slug}
                  />
                ) : null}
                <LensTabs
                  lenses={lensParts.lenses}
                  glossaryTermSet={glossaryTermSet}
                  onGlossaryTerm={openGlossary}
                  lessonSlug={lesson.slug}
                />
                {lensParts.after ? (
                  <LessonMarkdownBody
                    markdown={lensParts.after}
                    glossaryTermSet={glossaryTermSet}
                    onGlossaryTerm={openGlossary}
                    lessonSlug={lesson.slug}
                  />
                ) : null}
                {lensParts.lenses.length === 0 && !lensParts.before && !lensParts.after ? (
                  <LessonMarkdownBody
                    markdown={lesson.markdownMain ?? ""}
                    glossaryTermSet={glossaryTermSet}
                    onGlossaryTerm={openGlossary}
                    lessonSlug={lesson.slug}
                  />
                ) : null}
              </div>
            </Inscribe>

            <Inscribe delay={100}>
              <section className="mb-20 space-y-4 border-l border-gold-dim/45 pl-4">
                <div className="space-y-3">
                  {lesson.sourceClaims.map((claim) => (
                    <div key={claim.claimId} className="flex items-start gap-3 border border-gold-dim/40 bg-ink/30 px-3 py-2">
                      <button onClick={() => openClaim(claim.claimId)} aria-label={`Who says this for ${claim.claimText}`}>
                        <EpistemicBadge tone={claim.tone} compact />
                      </button>
                      <p className="text-sm leading-[1.8] text-gold-pale">{claim.claimText}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Inscribe>

            {lesson.markdownClosing ? (
              <Inscribe>
                <section className="mt-16 border-t border-gold-dim/45 pt-10">
                  <h2 className="mb-8 text-center font-display text-2xl tracking-[0.05em] text-gold-light">Closing passage</h2>
                  <div className="mx-auto max-w-2xl space-y-6 text-center leading-[1.95] text-gold-pale">
                    <LessonMarkdownBody
                      markdown={lesson.markdownClosing}
                      glossaryTermSet={glossaryTermSet}
                      onGlossaryTerm={openGlossary}
                      lessonSlug={lesson.slug}
                    />
                  </div>
                </section>
              </Inscribe>
            ) : null}

            {lesson.markdownPostface ? (
              <Inscribe>
                <section className="mt-16 border-t border-gold-dim/45 pt-10">
                  <div className="text-sm leading-relaxed text-gold-dim">
                    <LessonMarkdownBody
                      markdown={lesson.markdownPostface}
                      glossaryTermSet={glossaryTermSet}
                      onGlossaryTerm={openGlossary}
                      lessonSlug={lesson.slug}
                    />
                  </div>
                </section>
              </Inscribe>
            ) : null}

            <section className="mb-12 border-t border-gold-dim/40 pt-10">
              <h2 className="font-display text-2xl tracking-[0.05em] text-gold-light">Relationship Prototype</h2>
              <p className="mt-4 border border-gold-dim/40 bg-ink/25 px-4 py-3 font-display text-sm tracking-[0.06em] text-gold-light">
                {lesson.relationshipChain.join(" -> ")}
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="mb-20">
              <h2 className="font-display text-2xl tracking-[0.05em] text-gold-light">Learning Goals</h2>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-gold-pale">
                {(lesson.goals ?? []).map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </section>

            <section className="mb-20 space-y-4 border-l border-gold-dim/45 pl-4">
              <p className="leading-[1.9] text-gold-pale">
                This folio introduces{" "}
                {featuredTerms.map((term, idx) => (
                  <span key={term.term}>
                    <button className="border-b border-gold-dim text-gold-light" onClick={() => openGlossary(term.term)}>
                      {term.term}
                    </button>
                    {idx < featuredTerms.length - 2 ? ", " : idx === featuredTerms.length - 2 ? ", and " : " "}
                  </span>
                ))}
                as linked concepts within the lesson surface.
              </p>

              <div className="space-y-3">
                {lesson.sourceClaims.map((claim) => (
                  <div key={claim.claimId} className="flex items-start gap-3 border border-gold-dim/40 bg-ink/30 px-3 py-2">
                    <button onClick={() => openClaim(claim.claimId)} aria-label={`Who says this for ${claim.claimText}`}>
                      <EpistemicBadge tone={claim.tone} compact />
                    </button>
                    <p className="text-sm leading-[1.8] text-gold-pale">{claim.claimText}</p>
                  </div>
                ))}
              </div>
            </section>

            {(lesson.sections ?? []).map((section) => (
              <section key={section.heading} className="mb-24 space-y-6">
                <h2 className="font-display text-2xl tracking-[0.05em] text-gold-light">{section.heading}</h2>
                {section.blocks.map((block, idx) => renderBlock(block, idx))}
              </section>
            ))}

            <section className="mb-20 border-t border-gold-dim/40 pt-10">
              <h2 className="font-display text-2xl tracking-[0.05em] text-gold-light">Knowledge Check</h2>
              <ol className="mt-6 list-decimal space-y-2 pl-6 text-gold-pale">
                {(lesson.knowledgeChecks ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>

            <section className="mb-20 border-t border-gold-dim/40 pt-10">
              <h2 className="font-display text-2xl tracking-[0.05em] text-gold-light">Relationship Prototype</h2>
              <p className="mt-4 border border-gold-dim/40 bg-ink/25 px-4 py-3 font-display text-sm tracking-[0.06em] text-gold-light">
                {lesson.relationshipChain.join(" -> ")}
              </p>
            </section>

            <section className="mb-20 border-t border-gold-dim/40 pt-10">
              <h2 className="font-display text-2xl tracking-[0.05em] text-gold-light">In Shadow</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {lesson.sidebar.shadowItems.map((item) => (
                  <article key={item.concept} className="border border-dashed border-gold-dim/45 bg-ink/20 px-4 py-3 opacity-60">
                    <p className="font-display tracking-[0.05em] text-gold-dim">{item.concept}</p>
                    <p className="text-sm italic text-gold-dim">{item.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-t border-gold-dim/40 pt-10">
              <h2 className="font-display text-2xl tracking-[0.05em] text-gold-light">Unlocks</h2>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-gold-pale">
                {(lesson.unlocks ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        <LessonNavFooter
          stageLabel="Return to Seeker path"
          stageHref={SEEKER_PATH}
          previous={
            lesson.previousLesson?.href
              ? {
                  href: lesson.previousLesson.href,
                  title: lesson.previousLesson.label.replace(/^←\s*/, ""),
                  label: "Previous lesson"
                }
              : null
          }
          next={
            lesson.nextLesson?.href
              ? {
                  href: lesson.nextLesson.href,
                  title: lesson.nextLesson.label.replace(/\s*→$/, ""),
                  label: lesson.nextLesson.note ?? "Next lesson"
                }
              : null
          }
        />
      </article>

      <div className="hidden lg:sticky lg:top-8 lg:block lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        <LessonSidebar lesson={lesson} openGlossary={openGlossary} />
      </div>

      {panel && (
        <div
          className="panel-backdrop-enter fixed inset-0 z-50 flex justify-end bg-ink/70"
          onClick={() => setPanel(null)}
          role="dialog"
          aria-modal="true"
        >
          <section
            className="panel-enter h-full w-full max-w-md overflow-y-auto border-l border-gold-dim/55 bg-deep px-5 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            {panel.type === "glossary" ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-[0.04em] text-gold">{panel.item.term}</h3>
                  <button
                    onClick={() => setPanel(null)}
                    aria-label="Close panel"
                    className="text-gold-dim transition-colors duration-slow ease-gravity hover:text-gold-light"
                  >
                    X
                  </button>
                </div>
                <p className="mt-4 leading-[1.9] text-gold-pale">{panel.item.definition}</p>
                <p className="mt-3 text-sm text-gold-dim">Category: {panel.item.category}</p>
                <p className="text-sm text-gold-dim">Beginner level: {panel.item.beginnerLevel}</p>
                <p className="mt-5 font-display text-sm uppercase tracking-[0.16em] text-gold-light">Related terms</p>
                <ul className="mt-2 list-disc pl-5 text-gold-pale">
                  {panel.item.relatedTerms.map((rel) => {
                    const target = getGlossaryEntryByTerm(rel);
                    return (
                      <li key={rel}>
                        {target ? (
                          <Link
                            href={`/glossary/${target.slug}`}
                            className="border-b border-gold-dim text-gold-light transition-colors duration-slow ease-gravity hover:text-gold"
                            onClick={() => setPanel(null)}
                          >
                            {rel}
                          </Link>
                        ) : (
                          rel
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 border-t border-gold-dim/40 pt-5">
                  {fullGlossarySlug ? (
                    <Link
                      href={`/glossary/${fullGlossarySlug}`}
                      onClick={() => setPanel(null)}
                      className="inline-flex items-center gap-2 border border-gold-dim/60 bg-ink/30 px-4 py-2 font-display text-sm uppercase tracking-[0.18em] text-gold-light transition-colors duration-slow ease-gravity hover:border-gold/80 hover:text-gold"
                    >
                      Open full glossary entry {"->"}
                    </Link>
                  ) : (
                    <p className="text-xs italic text-gold-dim">
                      Full entry forthcoming. This term has a lesson surface only at present.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-gold">Who Says This?</h3>
                  <button
                    onClick={() => setPanel(null)}
                    aria-label="Close panel"
                    className="text-gold-dim transition-colors duration-slow ease-gravity hover:text-gold-light"
                  >
                    X
                  </button>
                </div>
                <p className="mt-3 text-gold-pale">{panel.item.claimText}</p>
                <div className="mt-4 space-y-2 text-sm text-gold-pale">
                  <p>
                    <span className="text-gold-light">Who made the claim:</span> {panel.item.who}
                  </p>
                  <p>
                    <span className="text-gold-light">Source:</span> {panel.item.source}
                  </p>
                  <p>
                    <span className="text-gold-light">Confidence level:</span> {panel.item.confidence}
                  </p>
                  <p>
                    <span className="text-gold-light">Competing interpretation:</span>{" "}
                    {panel.item.competingInterpretation ?? "None recorded."}
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
    </>
  );
}