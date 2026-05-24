import type { ReactNode } from "react";
import {
  ClosingPassageBlock,
  DiscernmentPracticeBlock,
  MultipleInterpretationsFreeformBlock,
  NoticeBlock,
  ReflectionPromptBlock,
  SourceStripBlock,
  UnlocksBlock,
  WarningBlock
} from "@/components/discernment/blocks";
import { KnowledgeCheck } from "@/components/lesson/knowledge-check";
import { SaveToJournalButton } from "@/components/journal/save-to-journal-button";

const HEADINGLESS = true;

type SemanticLessonBlockProps = {
  name: string;
  children: ReactNode;
  lessonSlug?: string;
};

export function SemanticLessonBlock({ name, children, lessonSlug }: SemanticLessonBlockProps) {
  switch (name) {
    case "discernment":
      return <DiscernmentPracticeBlock headingless={HEADINGLESS}>{children}</DiscernmentPracticeBlock>;
    case "notice":
      return <NoticeBlock headingless={HEADINGLESS}>{children}</NoticeBlock>;
    case "warning":
      return <WarningBlock headingless={HEADINGLESS}>{children}</WarningBlock>;
    case "reflection":
      return (
        <>
          <ReflectionPromptBlock headingless={HEADINGLESS}>{children}</ReflectionPromptBlock>
          <SaveToJournalButton lessonSlug={lessonSlug} title="Reflection prompt" />
        </>
      );
    case "knowledge-check":
      return <KnowledgeCheck lessonSlug={lessonSlug}>{children}</KnowledgeCheck>;
    case "unlocks":
      return <UnlocksBlock headingless={HEADINGLESS}>{children}</UnlocksBlock>;
    case "source-strip":
      return <SourceStripBlock>{children}</SourceStripBlock>;
    case "closing-passage":
      return <ClosingPassageBlock>{children}</ClosingPassageBlock>;
    case "multiple-interpretations":
      return <MultipleInterpretationsFreeformBlock>{children}</MultipleInterpretationsFreeformBlock>;
    default:
      return (
        <div className="my-8 border-l border-gold-dim/25 bg-ink/15 px-5 py-4 text-gold-pale/90" data-lesson-block={name}>
          {children}
        </div>
      );
  }
}
