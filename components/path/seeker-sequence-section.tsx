"use client";

import Link from "next/link";
import { Inscribe } from "@/components/motion/inscribe";
import { SEEKER_PATH } from "@/lib/content-registry";
import type { SeekerLessonRecord } from "@/lib/content-registry";

export function SeekerSequenceSection({ rows }: { rows: SeekerLessonRecord[] }) {
  return (
    <section className="space-y-3" aria-label="Seeker sequence">
      {rows.map((row, idx) => {
        const isOpen = row.status === "open";
        const isShadow = row.status === "shadow";
        const delay = Math.min(idx * 100, 500);
        return (
          <Inscribe key={row.id} delay={delay}>
            <article
              className={`px-6 py-5 ${
                isShadow ? "sealed-frame bg-ink/25" : "inscribed-frame bg-deep/45"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-gold-light/60" : "bg-gold-dim/30"}`}
                  />
                  <p className="font-display text-[11px] uppercase tracking-[0.14em] text-gold-light/80">
                    {row.lessonNumber}
                  </p>
                </div>
                <p className="font-display text-[9px] uppercase tracking-[0.16em] text-gold-dim/70">
                  {row.status === "open" ? "Open folio" : isShadow ? "In shadow" : "Not yet"}
                </p>
              </div>
              <h2 className="mt-2.5 font-display text-2xl tracking-[0.04em] text-gold">
                {isOpen ? (
                  <Link
                    href={`${SEEKER_PATH}/${row.slug}`}
                    className="transition-colors duration-slow ease-gravity hover:text-gold-light"
                  >
                    {row.title}
                  </Link>
                ) : (
                  row.title
                )}
              </h2>
              {row.subtitle ? <p className="mt-1.5 text-[14px] text-gold-dim/80">{row.subtitle}</p> : null}
            </article>
          </Inscribe>
        );
      })}
    </section>
  );
}
