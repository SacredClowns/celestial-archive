"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { InteractiveQuiz } from "@/components/lesson/interactive-quiz";
import { MatchingQuiz } from "@/components/lesson/matching-quiz";
import { parseFullKnowledgeCheck } from "@/lib/lesson/knowledge-check-parser";
import { reactNodeToPlainText } from "@/lib/lesson/react-node-text";
import { useJournal } from "@/lib/journal/journal-context";
import { getSeekerRecordBySlug } from "@/lib/content-registry";
import { getStudentRecordBySlug } from "@/lib/student/student-lesson-registry";

function lessonSlugToId(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  const seeker = getSeekerRecordBySlug(slug);
  if (seeker) return seeker.id;
  const student = getStudentRecordBySlug(slug);
  if (student) return student.id;
  return undefined;
}

export function KnowledgeCheck({
  children,
  lessonSlug,
  reflectionTitle
}: {
  children: ReactNode;
  lessonSlug?: string;
  reflectionTitle?: string;
}) {
  const [engaged, setEngaged] = useState(false);
  const { addEntry } = useJournal();
  const [savedId, setSavedId] = useState<string | null>(null);

  const plain = useMemo(() => reactNodeToPlainText(children), [children]);
  const parsed = useMemo(() => parseFullKnowledgeCheck(plain), [plain]);
  const lessonId = lessonSlugToId(lessonSlug);
  const hasQuiz = parsed.mcq.length > 0 || parsed.matching !== null;

  function saveToJournal() {
    const title =
      reflectionTitle?.trim() ||
      (typeof children === "string" ? children.slice(0, 80) : "Reflection");
    const entry = addEntry({
      type: "reflection",
      title,
      body: plain.slice(0, 4000),
      tags: lessonSlug ? ["lesson"] : [],
      linkedLesson: lessonSlug
    });
    setSavedId(entry.id);
  }

  if (hasQuiz) {
    return (
      <section className="my-10 space-y-4">
        <p className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-light">
          Knowledge check
        </p>
        {!engaged ? (
          <button
            type="button"
            onClick={() => setEngaged(true)}
            className="rounded-sm border border-gold-dim/40 bg-deep/40 px-4 py-2 font-display text-xs uppercase tracking-[0.12em] text-gold-dim transition-colors hover:border-gold/50 hover:text-gold"
          >
            Begin — retake anytime
          </button>
        ) : null}
        {engaged ? (
          <>
            {parsed.mcq.length > 0 ? (
              <InteractiveQuiz questions={parsed.mcq} lessonId={lessonId} />
            ) : null}
            {parsed.matching ? (
              <MatchingQuiz
                prompt={parsed.matching.prompt}
                pairs={parsed.matching.pairs}
                lessonId={parsed.mcq.length === 0 ? lessonId : undefined}
              />
            ) : null}
            <p className="text-xs italic text-gold-dim">
              Explanations appear after you choose. No score is stored — only your own judgment.
            </p>
          </>
        ) : null}
      </section>
    );
  }

  return (
    <CandlelightCard className="my-10 rounded-sm border border-gold-dim/30 bg-ink/25">
      <div className="space-y-4 p-6 sm:p-8">
        <p className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-light">Consider</p>
        {!engaged ? (
          <button
            type="button"
            onClick={() => setEngaged(true)}
            className="rounded-sm border border-gold-dim/40 bg-deep/40 px-4 py-2 font-display text-xs uppercase tracking-[0.12em] text-gold-dim transition-colors hover:border-gold/50 hover:text-gold"
          >
            Open reflection
          </button>
        ) : null}
        <div className={`text-gold-pale transition-opacity ${engaged ? "opacity-100" : "opacity-40"}`}>
          {children}
        </div>
        {engaged ? (
          <>
            <p className="text-xs italic text-gold-dim">
              These mirrors are not tests. No answer is recorded; hold the perspectives in parallel.
            </p>
            {savedId ? (
              <Link
                href={`/journal/${savedId}`}
                className="inline-block text-xs uppercase tracking-wider text-gold hover:text-amber"
              >
                View in journal →
              </Link>
            ) : (
              <button
                type="button"
                onClick={saveToJournal}
                className="rounded-sm border border-gold-dim/40 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.12em] text-gold-dim transition-colors hover:border-gold/50 hover:text-gold"
              >
                Save to journal
              </button>
            )}
          </>
        ) : null}
      </div>
    </CandlelightCard>
  );
}
