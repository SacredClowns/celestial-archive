import type { ReactNode } from "react";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import type { EpistemicTone } from "@/lib/lesson-types";

export function ReturnToGround({
  title = "Before you leave this room",
  badge = "historical",
  children
}: {
  title?: string;
  badge?: EpistemicTone;
  children: ReactNode;
}) {
  return (
    <aside className="mt-12 border-t border-gold-dim/30 pt-10">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-gold-dim">Return to ground</p>
        <EpistemicBadge tone={badge} compact />
      </div>
      <h2 className="mt-3 font-display text-xl text-gold-light">{title}</h2>
      <div className="mt-4 max-w-reading space-y-4 leading-[1.9] text-gold-pale">{children}</div>
    </aside>
  );
}
