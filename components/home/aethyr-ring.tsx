"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllAethyrs } from "@/lib/aethyrs/aethyr-data";
import type { AethyrData } from "@/lib/aethyrs/aethyr-types";

const SIZE = 800;
const CENTER = SIZE / 2;
const RADIUS = 316;
const LABEL_RADIUS = RADIUS + 34;

function tierColor(order: string): string {
  const o = order.toLowerCase();
  if (o.includes("supernal") || o.includes("first")) return "#f5e8c0";
  if (o.includes("middle") || o.includes("second")) return "#e8cc7d";
  return "#c9a84c";
}

export function AethyrRing() {
  const router = useRouter();
  const [active, setActive] = useState<AethyrData | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  const nodes = useMemo(() => {
    // number 1 (LIL) at the top, descending clockwise to 30 (TEX)
    return getAllAethyrs()
      .slice()
      .sort((a, b) => a.number - b.number)
      .map((a, i) => {
        const angle = (i / 30) * Math.PI * 2 - Math.PI / 2;
        return {
          aethyr: a,
          x: CENTER + Math.cos(angle) * RADIUS,
          y: CENTER + Math.sin(angle) * RADIUS,
          lx: CENTER + Math.cos(angle) * LABEL_RADIUS,
          ly: CENTER + Math.sin(angle) * LABEL_RADIUS,
          color: tierColor(a.order)
        };
      });
  }, []);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (frame.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    frame.current = requestAnimationFrame(() => {
      setTilt({ x, y });
      frame.current = null;
    });
  }

  const shown = active;

  return (
    <section className="inscribed-frame relative overflow-hidden bg-ink" aria-label="The Thirty Aethyrs">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.07),transparent_60%)]" />

      <div
        className="relative mx-auto aspect-square w-full max-w-[680px] touch-none"
        onPointerMove={onMove}
        onPointerLeave={() => {
          setTilt({ x: 0, y: 0 });
          setActive(null);
        }}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `perspective(1100px) rotateY(${tilt.x * 4}deg) rotateX(${-tilt.y * 4}deg)` }}
          role="img"
          aria-label="Interactive ring of the thirty Aethyrs"
        >
          <defs>
            <radialGradient id="ring-heart">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.12" />
              <stop offset="70%" stopColor="#c9a84c" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
            </radialGradient>
            <filter id="node-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx={CENTER} cy={CENTER} r={RADIUS + 60} fill="url(#ring-heart)" />

          {/* rotating geometry, decorative */}
          <g className="origin-center animate-slow-spin" opacity="0.5">
            <circle cx={CENTER} cy={CENTER} r={RADIUS - 44} fill="none" stroke="#7a6230" strokeWidth="1" strokeDasharray="3 9" />
            <circle cx={CENTER} cy={CENTER} r={RADIUS - 86} fill="none" stroke="#7a6230" strokeWidth="0.75" strokeDasharray="1 6" opacity="0.7" />
          </g>
          <g className="origin-center animate-slow-spin" style={{ animationDirection: "reverse", animationDuration: "90s" }} opacity="0.4">
            <polygon
              points={Array.from({ length: 7 })
                .map((_, i) => {
                  const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
                  return `${CENTER + Math.cos(a) * (RADIUS - 130)},${CENTER + Math.sin(a) * (RADIUS - 130)}`;
                })
                .join(" ")}
              fill="none"
              stroke="#7a6230"
              strokeWidth="1"
            />
          </g>

          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#c9a84c" strokeOpacity="0.28" strokeWidth="1" />

          {/* spokes to hovered node */}
          {shown ? (
            <line
              x1={CENTER}
              y1={CENTER}
              x2={nodes.find((n) => n.aethyr.number === shown.number)?.x}
              y2={nodes.find((n) => n.aethyr.number === shown.number)?.y}
              stroke="#e8cc7d"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          ) : null}

          {/* aethyr nodes */}
          {nodes.map((n) => {
            const isActive = shown?.number === n.aethyr.number;
            return (
              <g
                key={n.aethyr.number}
                className="cursor-pointer"
                onPointerEnter={() => setActive(n.aethyr)}
                onFocus={() => setActive(n.aethyr)}
                onClick={() => router.push(`/aethyrs/${n.aethyr.name}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") router.push(`/aethyrs/${n.aethyr.name}`);
                }}
                tabIndex={0}
                role="link"
                aria-label={`Aethyr ${n.aethyr.number}: ${n.aethyr.name}`}
              >
                {/* generous invisible hit area */}
                <circle cx={n.x} cy={n.y} r={26} fill="transparent" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isActive ? 9 : 4.5}
                  fill={n.color}
                  filter={isActive ? "url(#node-glow)" : undefined}
                  className="transition-all duration-300"
                  opacity={shown && !isActive ? 0.45 : 1}
                />
                <text
                  x={n.lx}
                  y={n.ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? "#f5e8c0" : "#7a6230"}
                  fontSize={isActive ? 17 : 13}
                  letterSpacing="2"
                  className="select-none font-display transition-all duration-300"
                  opacity={shown && !isActive ? 0.5 : 1}
                >
                  {n.aethyr.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* center readout */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[46%] text-center">
            {shown ? (
              <div key={shown.number} className="animate-archival-fade-in">
                <p className="font-display text-[9px] uppercase tracking-[0.3em] text-gold-dim">
                  Aethyr {shown.number} of 30
                </p>
                <p className="mt-2 font-display text-4xl tracking-[0.22em] text-gold-pale sm:text-5xl">{shown.name}</p>
                <p className="mt-2 font-display text-[9px] uppercase tracking-[0.24em] text-gold-light/70">{shown.order}</p>
                <div className="mx-auto mt-4 h-px w-14 bg-gold-dim/50" />
                <p className="mt-4 text-sm leading-relaxed text-gold-light/80">
                  {shown.governors.map((g) => g.name).join(" · ")}
                </p>
                <p className="mt-2 text-xs text-gold-dim">
                  {shown.governors.length} governors
                  {shown.totalMinisters ? ` · ${shown.totalMinisters.toLocaleString()} ministers` : ""}
                </p>
                <p className="pointer-events-auto mt-4 font-display text-[9px] uppercase tracking-[0.24em] text-gold underline decoration-gold-dim/40 underline-offset-4">
                  Enter {shown.name}
                </p>
              </div>
            ) : (
              <div className="animate-archival-fade-in">
                <p className="font-display text-[9px] uppercase tracking-[0.3em] text-gold-dim">The Thirty Aethyrs</p>
                <p className="mt-3 font-display text-2xl tracking-[0.18em] text-gold sm:text-3xl">91 GOVERNORS</p>
                <p className="mt-3 text-sm text-gold-light/70">
                  Thirty concentric heavens, LIL innermost, TEX at the edge of the world.
                </p>
                <p className="mt-4 font-display text-[8px] uppercase tracking-[0.26em] text-gold-dim/70">
                  Touch an Aethyr to read its seal · click to enter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gold-dim/25 px-4 py-3 text-center">
        <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold-dim/60">
          Celestial projection · Sloane MS 3191 · hover to read, click to descend
        </p>
      </div>
    </section>
  );
}
