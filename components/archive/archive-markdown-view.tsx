"use client";

import { LessonMarkdownBody } from "@/components/lesson/lesson-markdown-body";

const EMPTY = new Set<string>();

export function ArchiveMarkdownView({ markdown }: { markdown: string }) {
  return (
    <div className="lesson-markdown-root min-w-0 max-w-reading space-y-4">
      <LessonMarkdownBody
        markdown={markdown}
        glossaryTermSet={EMPTY}
        onGlossaryTerm={() => {}}
      />
    </div>
  );
}
