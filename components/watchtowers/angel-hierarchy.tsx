"use client";

import { useState } from "react";
import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { dictionaryHref } from "@/lib/language/dictionary-links";
import { HIERARCHY_NOTES } from "@/lib/watchtowers/hierarchy-data";
import type { WatchtowerTablet } from "@/lib/watchtowers/watchtower-types";

function DictLink({ name }: { name: string }) {
  const href = dictionaryHref(name);
  if (href) {
    return (
      <Link href={href} className="font-mono text-gold hover:underline">
        {name}
      </Link>
    );
  }
  return <span className="font-mono text-gold-pale">{name}</span>;
}

function AngelGroupSection({
  title,
  note,
  group
}: {
  title: string;
  note: string;
  group: {
    godNames: string[];
    angels: { name: string; alternate?: string | null }[];
    cacodemons: string[];
    godNamesReversed: string[];
  };
}) {
  const [showCaco, setShowCaco] = useState(false);

  return (
    <CandlelightCard className="space-y-4 rounded-sm border border-gold-dim/20 bg-ink/20 p-5">
      <h3 className="font-display text-lg text-gold">{title}</h3>
      <p className="text-sm italic text-gold-dim">{note}</p>
      <div>
        <p className="text-xs uppercase text-gold-dim">God-names</p>
        <p className="font-mono text-gold-pale">{group.godNames.join(" · ")}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {group.angels.map((a) => (
          <div key={a.name} className="text-sm">
            <DictLink name={a.name} />
            {a.alternate ? (
              <span className="text-gold-dim/70"> / {a.alternate}</span>
            ) : null}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setShowCaco((v) => !v)}
        className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold-dim hover:text-amber"
      >
        <EpistemicBadge tone="caution" compact />
        Cacodemons {showCaco ? "−" : "+"}
      </button>
      {showCaco ? (
        <div className="border-l-2 border-amber/40 pl-3">
          <p className="text-xs text-gold-dim">{HIERARCHY_NOTES.cacodemons}</p>
          <p className="mt-2 font-mono text-sm text-amber/80">{group.cacodemons.join(" · ")}</p>
        </div>
      ) : null}
    </CandlelightCard>
  );
}

export function AngelHierarchy({
  tablet,
  hierarchy
}: {
  tablet: WatchtowerTablet;
  hierarchy: NonNullable<ReturnType<typeof import("@/lib/watchtowers/hierarchy-data").getHierarchyForQuadrant>>;
}) {
  return (
    <div className="space-y-6">
      <CandlelightCard className="space-y-3 rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
        <p className="text-xs uppercase text-gold-dim">
          {hierarchy.direction} · {hierarchy.element}
        </p>
        <div>
          <p className="text-xs text-gold-dim">Divine / King names</p>
          <p className="font-mono text-lg text-gold">
            {hierarchy.seniors.godName.join(" · ")}
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs text-gold-dim">Six Seniors</p>
          <ul className="grid gap-1 sm:grid-cols-2">
            {hierarchy.seniors.names.map((s, i) => (
              <li key={s} className="font-mono text-sm text-gold-pale">
                <DictLink name={s} />
                {hierarchy.seniors.alternateNames?.[i] ? (
                  <span className="text-gold-dim/60"> ({hierarchy.seniors.alternateNames[i]})</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        {tablet.angelicKing ? (
          <p className="text-sm text-gold-dim">
            King (tablet): <span className="font-mono text-gold">{tablet.angelicKing}</span>
          </p>
        ) : null}
      </CandlelightCard>

      <AngelGroupSection
        title="Angels of Medicine"
        note={HIERARCHY_NOTES.medicine}
        group={hierarchy.angelsOfMedicine}
      />
      <AngelGroupSection
        title="Angels of Precious Stones"
        note={HIERARCHY_NOTES.preciousStones}
        group={hierarchy.angelsOfPreciousStones}
      />
      <AngelGroupSection
        title="Angels of Transformation"
        note={HIERARCHY_NOTES.transformation}
        group={hierarchy.angelsOfTransformation}
      />
    </div>
  );
}
