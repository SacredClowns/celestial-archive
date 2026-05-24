"use client";

import { useState } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import type { KnowledgeCheckQuestion } from "@/lib/lesson/knowledge-check-parser";
import { useProgress } from "@/lib/progress/progress-context";

export function InteractiveQuiz({
  questions,
  lessonId
}: {
  questions: KnowledgeCheckQuestion[];
  lessonId?: string;
}) {
  const { markLessonComplete } = useProgress();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const answeredCount = Object.keys(revealed).length;
  const allRevealed = answeredCount >= questions.length;

  function choose(questionId: string, optionId: string) {
    if (revealed[questionId]) return;
    setAnswers((a) => ({ ...a, [questionId]: optionId }));
    setRevealed((r) => ({ ...r, [questionId]: true }));
  }

  function markComplete() {
    if (lessonId) markLessonComplete(lessonId);
    setFinished(true);
  }

  return (
    <div className="space-y-8">
      {questions.map((q, idx) => {
        const chosen = answers[q.id];
        const show = revealed[q.id];
        return (
          <CandlelightCard
            key={q.id}
            className="rounded-sm border border-gold-dim/25 bg-ink/20 p-5 sm:p-6"
          >
            <p className="font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim">
              Question {idx + 1}
            </p>
            <p className="mt-2 font-display text-lg text-gold-light">{q.prompt}</p>
            <ul className="mt-4 space-y-2">
              {q.options.map((opt) => {
                const isChosen = chosen === opt.id;
                const showResult = show && isChosen;
                let stateClass = "border-gold-dim/25 hover:border-gold/40";
                if (showResult) {
                  stateClass = opt.correct
                    ? "border-amber/50 bg-amber/10"
                    : "border-gold-dim/40 bg-ink/40";
                } else if (show && opt.correct) {
                  stateClass = "border-amber/30 bg-amber/5";
                }
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      disabled={show}
                      onClick={() => choose(q.id, opt.id)}
                      className={`w-full rounded-sm border px-4 py-3 text-left text-sm leading-relaxed transition-colors ${stateClass} ${
                        show ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span className="font-display text-gold-dim">{opt.label})</span>{" "}
                      <span className="text-gold-pale">{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {show && q.explanation ? (
              <p className="mt-4 border-l-2 border-gold-dim/40 pl-4 text-sm italic leading-relaxed text-gold-dim">
                {q.explanation}
              </p>
            ) : null}
          </CandlelightCard>
        );
      })}

      {allRevealed && !finished ? (
        <div className="flex flex-wrap items-center gap-4 border-t border-gold-dim/30 pt-6">
          <p className="text-sm text-gold-dim">
            You have considered each mirror. Mark this lesson complete when you are ready to move on.
          </p>
          {lessonId ? (
            <button
              type="button"
              onClick={markComplete}
              className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 font-display text-xs uppercase tracking-[0.12em] text-gold hover:bg-gold/20"
            >
              Mark lesson complete
            </button>
          ) : null}
        </div>
      ) : null}

      {finished ? (
        <p className="font-display text-sm text-gold">Recorded in your path progress.</p>
      ) : null}
    </div>
  );
}
