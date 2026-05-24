"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AethyrData } from "@/lib/aethyrs/aethyr-types";

const SIZE = 420;
const CENTER = SIZE / 2;
const MAX_R = 190;
const MIN_R = 48;
const RING_GAP = (MAX_R - MIN_R) / 30;

export function AethyrRings({ aethyrs }: { aethyrs: AethyrData[] }) {
  const router = useRouter();
  const ordered = [...aethyrs].sort((a, b) => b.number - a.number);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full"
        role="img"
        aria-label="Concentric map of the 30 Aethyrs from TEX outward to LIL at the center"
      >
        {ordered.map((aethyr, index) => {
          const r = MAX_R - index * RING_GAP;
          const active = hovered === aethyr.name;
          return (
            <circle
              key={aethyr.name}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke={active ? "rgba(201, 168, 76, 0.85)" : "rgba(122, 98, 48, 0.35)"}
              strokeWidth={RING_GAP - 1}
              className="cursor-pointer transition-[stroke,filter] duration-slow"
              style={active ? { filter: "drop-shadow(0 0 8px rgba(201,168,76,0.35))" } : undefined}
              onMouseEnter={() => setHovered(aethyr.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push(`/aethyrs/${aethyr.name}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/aethyrs/${aethyr.name}`);
                }
              }}
            >
              <title>
                {aethyr.name} — Aethyr {aethyr.number}
              </title>
            </circle>
          );
        })}
        <text
          x={CENTER}
          y={CENTER - 6}
          textAnchor="middle"
          className="fill-gold font-display text-[11px] tracking-widest"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          LIL
        </text>
        <text x={CENTER} y={CENTER + 12} textAnchor="middle" className="fill-gold-dim text-[9px]">
          First Aethyr
        </text>
      </svg>
      {hovered ? (
        <p className="mt-4 text-center font-display text-sm text-gold">
          {hovered} — Aethyr {ordered.find((a) => a.name === hovered)?.number}
        </p>
      ) : (
        <p className="mt-4 text-center text-sm text-gold-dim">Hover or select a ring · TEX (30) is outermost</p>
      )}
    </div>
  );
}
