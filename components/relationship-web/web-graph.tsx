"use client";

import { useState } from "react";
import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import {
  RELATIONSHIP_WEB_EDGES,
  RELATIONSHIP_WEB_NODES,
  getRelationshipWebNodeById
} from "@/lib/relationship-web/seed";

const NODE_LINKS: Record<string, string> = {
  dee: "/path/seeker/the-partnership",
  kelley: "/path/seeker/the-partnership",
  "enochian-system": "/language",
  "sloane-3191": "/observatory",
  "great-table": "/watchtowers",
  "seven-kings": "/path/student/the-seven-kings",
  "nineteen-calls": "/language/calls",
  "thirty-aethyrs": "/aethyrs",
  casaubon: "/timeline",
  "golden-dawn": "/watchtowers",
  crowley: "/path/student/the-voice-and-the-abyss",
  laycock: "/language/dictionary",
  "seven-princes": "/path/student/the-seven-kings",
  "true-faithful-relation": "/archive/sources",
  mathers: "/watchtowers",
  regardie: "/archive/sources"
};

export function WebGraph() {
  const [selected, setSelected] = useState<string | null>(null);
  const node = selected ? getRelationshipWebNodeById(selected) : null;
  const edges = selected
    ? RELATIONSHIP_WEB_EDGES.filter((e) => e.fromNodeId === selected || e.toNodeId === selected)
    : [];

  const positions = RELATIONSHIP_WEB_NODES.map((_, i) => ({
    x: 40 + (i % 4) * 140,
    y: 40 + Math.floor(i / 4) * 90
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="relative min-h-[360px] rounded-sm border border-gold-dim/20 bg-ink/15">
        <svg viewBox="0 0 600 360" className="h-full w-full" aria-hidden>
          {RELATIONSHIP_WEB_EDGES.map((e) => {
            const fromIdx = RELATIONSHIP_WEB_NODES.findIndex((n) => n.id === e.fromNodeId);
            const toIdx = RELATIONSHIP_WEB_NODES.findIndex((n) => n.id === e.toNodeId);
            if (fromIdx < 0 || toIdx < 0) return null;
            const p1 = positions[fromIdx];
            const p2 = positions[toIdx];
            return (
              <line
                key={e.id}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="rgba(122, 98, 48, 0.35)"
                strokeWidth={1}
              />
            );
          })}
          {RELATIONSHIP_WEB_NODES.map((n, i) => {
            const p = positions[i];
            const active = selected === n.id;
            return (
              <g key={n.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 10 : 7}
                  fill={active ? "rgba(201, 168, 76, 0.35)" : "rgba(13, 10, 5, 0.9)"}
                  stroke={active ? "rgba(201, 168, 76, 0.9)" : "rgba(122, 98, 48, 0.5)"}
                  strokeWidth={1.5}
                />
                <text
                  x={p.x}
                  y={p.y + 22}
                  textAnchor="middle"
                  className="fill-gold-dim text-[8px]"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {n.label.length > 14 ? `${n.label.slice(0, 12)}…` : n.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 lg:hidden">
          {RELATIONSHIP_WEB_NODES.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSelected(n.id)}
              className="pointer-events-auto rounded-sm border border-gold-dim/20 bg-deep/80 p-2 text-left text-xs text-gold-dim"
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="absolute inset-0 hidden lg:grid lg:grid-cols-4 lg:gap-0">
          {RELATIONSHIP_WEB_NODES.map((n, i) => {
            const p = positions[i];
            return (
              <button
                key={n.id}
                type="button"
                style={{
                  position: "absolute",
                  left: `${(p.x / 600) * 100}%`,
                  top: `${(p.y / 360) * 100}%`,
                  transform: "translate(-50%, -50%)"
                }}
                onClick={() => setSelected(n.id)}
                className="h-8 w-8 rounded-full border border-transparent hover:border-gold/40"
                aria-label={n.label}
              />
            );
          })}
        </div>
      </div>

      <CandlelightCard className="h-fit rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
        {node ? (
          <>
            <h2 className="font-display text-xl text-gold">{node.label}</h2>
            {NODE_LINKS[node.id] ? (
              <Link href={NODE_LINKS[node.id]} className="mt-2 inline-block text-sm text-gold hover:underline">
                Open in Archive →
              </Link>
            ) : null}
            <h3 className="mt-6 font-display text-xs uppercase tracking-wider text-gold-dim">Connections</h3>
            <ul className="mt-2 space-y-2 text-sm text-gold-pale">
              {edges.map((e) => {
                const otherId = e.fromNodeId === selected ? e.toNodeId : e.fromNodeId;
                const other = getRelationshipWebNodeById(otherId);
                return (
                  <li key={e.id}>
                    <span className="text-gold-dim">{e.label}</span> →{" "}
                    <button
                      type="button"
                      onClick={() => setSelected(otherId)}
                      className="text-gold hover:underline"
                    >
                      {other?.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p className="text-sm text-gold-dim">
            Select a node on the map — or use the list on small screens — to trace how ideas move from Dee&apos;s
            manuscripts through later traditions.
          </p>
        )}
      </CandlelightCard>
    </div>
  );
}
