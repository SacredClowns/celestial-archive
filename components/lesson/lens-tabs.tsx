"use client";

import { useState } from "react";
import { LessonMarkdownBody } from "@/components/lesson/lesson-markdown-body";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import type { LensSection } from "@/lib/lesson-markdown/split-lens-sections";
import { useTraditionSettings } from "@/lib/settings/tradition-settings-context";

export function LensTabs({
  lenses,
  glossaryTermSet,
  onGlossaryTerm,
  verificationPending,
  lessonSlug
}: {
  lenses: LensSection[];
  glossaryTermSet: Set<string>;
  onGlossaryTerm: (term: string) => void;
  verificationPending?: boolean;
  lessonSlug?: string;
}) {
  const { isLensVisible } = useTraditionSettings();
  const visibleLenses = lenses.filter(isLensVisible);
  const [active, setActive] = useState(0);

  if (visibleLenses.length === 0) {
    return (
      <p className="my-8 text-sm italic text-gold-dim">
        Additional lenses are hidden in your{" "}
        <a href="/path/settings" className="text-gold underline hover:text-gold-light">
          path settings
        </a>
        .
      </p>
    );
  }

  const safeActive = Math.min(active, visibleLenses.length - 1);
  const current = visibleLenses[safeActive] ?? visibleLenses[0];

  return (
    <section className="my-12 space-y-4">
      <div className="hidden gap-1 border-b border-gold-dim/30 md:flex" role="tablist">
        {visibleLenses.map((lens, i) => (
          <button
            key={lens.id}
            type="button"
            role="tab"
            aria-selected={i === safeActive}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 font-display text-xs uppercase tracking-[0.1em] transition-colors ${
              i === safeActive
                ? "border-gold text-gold"
                : "border-transparent text-gold-dim hover:text-gold-pale"
            }`}
          >
            <EpistemicBadge tone={lens.tone} compact />
            <span className="max-w-[140px] truncate">{lens.title.replace(/Lens:?\s*/i, "")}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2 md:hidden">
        {visibleLenses.map((lens, i) => (
          <details key={lens.id} className="rounded-sm border border-gold-dim/25 bg-ink/20" open={i === 0}>
            <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 font-display text-sm text-gold-light">
              <EpistemicBadge tone={lens.tone} compact />
              {lens.title}
            </summary>
            <div className="border-t border-gold-dim/20 px-4 pb-4">
              <LessonMarkdownBody
                markdown={lens.markdown}
                glossaryTermSet={glossaryTermSet}
                onGlossaryTerm={onGlossaryTerm}
                verificationPending={verificationPending}
                lessonSlug={lessonSlug}
              />
            </div>
          </details>
        ))}
      </div>

      <div className="hidden md:block" role="tabpanel">
        <LessonMarkdownBody
          markdown={current.markdown}
          glossaryTermSet={glossaryTermSet}
          onGlossaryTerm={onGlossaryTerm}
          verificationPending={verificationPending}
          lessonSlug={lessonSlug}
        />
      </div>
    </section>
  );
}
