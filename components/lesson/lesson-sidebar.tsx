import { CandlelightCard } from "@/components/motion/candlelight-card";
import type { LessonSchema } from "@/lib/lesson-types";

export function LessonSidebarPanel({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <CandlelightCard className="rounded-sm border border-gold-dim/30 bg-ink/25 p-4">
      <h3 className="font-display text-[10px] uppercase tracking-[0.14em] text-gold-light">{title}</h3>
      <div className="mt-3 space-y-2 text-sm leading-[1.7] text-gold-pale">{children}</div>
    </CandlelightCard>
  );
}

export function LessonSidebar({
  lesson,
  openGlossary
}: {
  lesson: LessonSchema;
  openGlossary: (term: string) => void;
}) {
  return (
    <aside className="hidden space-y-4 lg:block">
      <LessonSidebarPanel title="Key Glossary Terms">
        {lesson.sidebar.glossaryTerms.map((item) => (
          <div key={item.term}>
            <button
              type="button"
              onClick={() => openGlossary(item.term)}
              className="text-left font-display text-gold-light underline decoration-gold-dim/50 underline-offset-4 hover:text-gold"
            >
              {item.term}
            </button>
            <p className="text-gold-dim">{item.hoverDefinition}</p>
          </div>
        ))}
      </LessonSidebarPanel>

      <LessonSidebarPanel title="Timeline Anchors">
        {lesson.sidebar.timelineAnchors.map((item) => (
          <p key={item.date}>
            <span className="text-gold-light">{item.date}</span> — {item.event}
          </p>
        ))}
      </LessonSidebarPanel>

      {lesson.sidebar.relatedQuestions.length > 0 ? (
        <LessonSidebarPanel title="Related Questions">
          {lesson.sidebar.relatedQuestions.map((q) => (
            <p key={q} className="italic text-amber">
              ? {q}
            </p>
          ))}
        </LessonSidebarPanel>
      ) : null}
    </aside>
  );
}
