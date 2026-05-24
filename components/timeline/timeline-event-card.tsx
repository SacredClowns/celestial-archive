"use client";

import Link from "next/link";
import { useState } from "react";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { badgeKindToEpistemicTone } from "@/lib/language/language-badges";
import type { TimelineEvent } from "@/lib/timeline/timeline-types";

const CATEGORY_CLASS: Record<string, string> = {
  biographical: "text-gold-pale",
  session: "text-amber",
  publication: "text-gold-dim",
  political: "text-gold-dim/80",
  legacy: "text-gold-dim/60",
  comparative: "text-gold-dim/70"
};

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article id={event.id} className="relative scroll-mt-24 pl-8">
      <span
        className="absolute left-0 top-2 h-3 w-3 rounded-full border border-gold/50 bg-gold/30"
        aria-hidden
      />
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left"
      >
        <time className={`font-display text-xs uppercase tracking-wider ${CATEGORY_CLASS[event.category] ?? "text-gold-dim"}`}>
          {event.dateDisplay}
        </time>
        <h3 className="mt-1 font-display text-lg text-gold-light">
          {event.title}
          {event.comingSoon ? (
            <span className="ml-2 font-display text-[10px] uppercase tracking-wider text-gold-dim">
              · Coming
            </span>
          ) : null}
        </h3>
        <div className="mt-1 flex flex-wrap gap-1">
          {event.actors.map((a) => (
            <span
              key={a}
              className="rounded-full border border-gold-dim/20 px-2 py-0.5 text-[10px] text-gold-dim"
            >
              {a}
            </span>
          ))}
        </div>
      </button>
      {expanded ? (
        <div className="mt-3 space-y-3 rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
          <EpistemicBadge tone={badgeKindToEpistemicTone(event.badge)} compact />
          <p className="leading-[1.85] text-gold-pale">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            {event.linkedLesson ? (
              <Link href={event.linkedLesson} className="text-xs text-gold hover:underline">
                Related lesson →
              </Link>
            ) : null}
            {event.linkedCall ? (
              <Link
                href={`/language/calls?call=${event.linkedCall}`}
                className="text-xs text-gold hover:underline"
              >
                Call {event.linkedCall} →
              </Link>
            ) : null}
            {event.linkedAethyr ? (
              <Link href={`/aethyrs/${event.linkedAethyr}`} className="text-xs text-gold hover:underline">
                Aethyr {event.linkedAethyr} →
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
