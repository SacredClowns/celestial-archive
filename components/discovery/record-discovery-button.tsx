"use client";

import Link from "next/link";
import { useState } from "react";
import { useDiscovery } from "@/lib/discovery/discovery-context";
import type { DiscoveryKind } from "@/lib/discovery/discovery-types";

export function RecordDiscoveryButton({
  title,
  note = "",
  href,
  kind = "insight"
}: {
  title: string;
  note?: string;
  href?: string;
  kind?: DiscoveryKind;
}) {
  const { addDiscovery } = useDiscovery();
  const [savedId, setSavedId] = useState<string | null>(null);

  if (savedId) {
    return (
      <Link
        href="/discovery"
        className="inline-block font-display text-[10px] uppercase tracking-[0.12em] text-gold hover:text-gold-light"
      >
        Recorded in discovery log →
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        const entry = addDiscovery({ kind, title, note, href });
        setSavedId(entry.id);
      }}
      className="rounded-sm border border-gold-dim/35 bg-ink/20 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.12em] text-gold-dim transition-colors hover:border-gold/45 hover:text-gold"
    >
      Record discovery
    </button>
  );
}
