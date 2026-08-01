"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Starfield } from "@/components/motion/starfield";
import { Sigillum } from "@/components/instrumentarium/sigillum";

export function InstrumentariumChrome({
  children,
  title,
  subtitle
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="instrumentarium-chamber relative min-h-screen text-gold-pale">
      <Starfield />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,168,76,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,168,76,0.15) 2px, rgba(201,168,76,0.15) 3px)"
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-12 sm:px-10 sm:py-16">
        <header className="mb-12 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="relative shrink-0 text-gold/80">
            <Sigillum className="h-24 w-24 sm:h-28 sm:w-28" />
          </div>
          <div className="space-y-2">
            <p className="font-display text-[10px] uppercase tracking-[0.42em] text-gold-dim">
              Instrumentarium · Keeper&apos;s Chamber
            </p>
            <h1 className="font-display text-3xl tracking-[0.08em] text-gold sm:text-4xl">{title}</h1>
            {subtitle ? (
              <p className="max-w-xl text-base italic leading-relaxed text-gold-pale/80">{subtitle}</p>
            ) : null}
            <Link
              href="/archive"
              className="inline-block pt-2 font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim/70 transition-colors hover:text-gold"
            >
              ← Return to the public Archive
            </Link>
          </div>
        </header>

        <div className="inscribed-frame rounded-sm border border-gold-dim/30 bg-deep/50 p-6 shadow-gold backdrop-blur-sm sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
