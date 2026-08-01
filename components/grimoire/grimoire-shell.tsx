"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Starfield } from "@/components/motion/starfield";
import { Sigillum } from "@/components/instrumentarium/sigillum";

export function GrimoireShell({
  children,
  title,
  subtitle
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="grimoire-chamber relative min-h-screen text-gold-pale">
      <Starfield />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(160,104,32,0.12),transparent_60%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[900px] px-6 py-12 sm:px-10 sm:py-16">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="shrink-0 text-gold/70">
            <Sigillum className="h-20 w-20" />
          </div>
          <div className="space-y-2">
            <p className="font-display text-[10px] uppercase tracking-[0.38em] text-gold-dim">
              Your Grimoire · Private chamber
            </p>
            <h1 className="font-display text-3xl tracking-[0.06em] text-gold sm:text-4xl">{title}</h1>
            {subtitle ? (
              <p className="max-w-xl text-base italic leading-relaxed text-gold-pale/85">{subtitle}</p>
            ) : null}
            <Link
              href="/archive"
              className="inline-block pt-1 font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim/70 hover:text-gold"
            >
              ← Return to the public Archive
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
