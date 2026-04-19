"use client";

import { useId } from "react";

/**
 * Flat, cartographic relationship surface — not a proof graph.
 * No animation, no WebGL. Labels state relationship type only.
 */

const STROKE = "#7a6230";
const INK = "#140f07";
const LABEL = "#f5e8c0";
const GOLD = "#c9a84c";

const DEFAULT_CAPTION =
  "This diagram represents transmission and structural dependency, not causality or truth.";

export type TransmissionSchematicProps = {
  /** Override default caption under the SVG. */
  caption?: string;
};

export function TransmissionSchematic({ caption = DEFAULT_CAPTION }: TransmissionSchematicProps) {
  const rid = useId().replace(/:/g, "");
  const patternId = `schematic-grid-${rid}`;
  const markerId = `schematic-arrow-${rid}`;
  const titleId = `transmission-schematic-title-${rid}`;

  return (
    <figure className="border border-gold-dim/20 bg-ink/10 p-4 md:p-6">
      <svg
        viewBox="0 0 560 220"
        className="mx-auto h-auto w-full max-w-[560px]"
        role="img"
        aria-labelledby={titleId}
      >
        <title id={titleId}>
          Structural relationships between Dee, the Great Table tradition, Golden Dawn, and Crowley
        </title>
        <defs>
          <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={STROKE} strokeOpacity="0.12" strokeWidth="0.5" />
          </pattern>
          <marker id={markerId} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={STROKE} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.9" />

        {/* Orthogonal edges — blueprint style */}
        <path
          d="M 116 98 H 200"
          fill="none"
          stroke={STROKE}
          strokeWidth="1.25"
          markerEnd={`url(#${markerId})`}
        />
        <text x="158" y="88" textAnchor="middle" fill={LABEL} className="font-display text-[10px] tracking-widest uppercase opacity-80">
          Derived from
        </text>

        <path
          d="M 312 98 H 404"
          fill="none"
          stroke={STROKE}
          strokeWidth="1.25"
          markerEnd={`url(#${markerId})`}
        />
        <text x="358" y="72" textAnchor="middle" fill={LABEL} className="font-display text-[10px] tracking-widest uppercase opacity-80">
          Reorganized by
        </text>

        <path
          d="M 476 122 V 162"
          fill="none"
          stroke={STROKE}
          strokeWidth="1.25"
          markerEnd={`url(#${markerId})`}
        />
        <text x="398" y="148" textAnchor="start" fill={LABEL} className="font-display text-[10px] tracking-widest uppercase opacity-80">
          Expanded by
        </text>

        {/* Nodes */}
        <rect x="24" y="74" width="92" height="48" rx="1" fill={INK} stroke={GOLD} strokeWidth="1" />
        <text x="70" y="104" textAnchor="middle" fill={LABEL} className="font-display text-[13px] tracking-[0.12em]">
          Dee
        </text>

        <rect x="208" y="74" width="104" height="48" rx="1" fill={INK} stroke={GOLD} strokeWidth="1" />
        <text x="260" y="104" textAnchor="middle" fill={LABEL} className="font-display text-[12px] tracking-[0.1em]">
          Great Table
        </text>

        <rect x="416" y="74" width="120" height="48" rx="1" fill={INK} stroke={GOLD} strokeWidth="1" />
        <text x="476" y="104" textAnchor="middle" fill={LABEL} className="font-display text-[11px] tracking-[0.08em]">
          Golden Dawn
        </text>

        <rect x="416" y="168" width="120" height="44" rx="1" fill={INK} stroke={STROKE} strokeWidth="1" />
        <text x="476" y="196" textAnchor="middle" fill={LABEL} className="font-display text-[12px] tracking-[0.1em]">
          Crowley
        </text>
      </svg>
      <figcaption className="mt-3 max-w-prose text-pretty text-xs leading-relaxed text-gold-dim">{caption}</figcaption>
    </figure>
  );
}
