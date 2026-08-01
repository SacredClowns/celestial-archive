"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Starfield } from "@/components/motion/starfield";
import { Sigillum } from "@/components/instrumentarium/sigillum";

export function AdminShell({
  children,
  title = "Enochia Command"
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="admin-chamber relative min-h-screen text-gold-pale">
      <Starfield />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,rgba(201,168,76,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-10 sm:px-8 sm:py-14">
        <header className="mb-10 flex flex-col gap-6 border-b border-gold-dim/25 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-5">
            <Sigillum className="h-16 w-16 shrink-0 text-gold/80" />
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.45em] text-gold-dim">
                Enochia.io · Keeper Command
              </p>
              <h1 className="mt-1 font-display text-3xl tracking-[0.06em] text-gold sm:text-4xl">{title}</h1>
              <p className="mt-2 max-w-xl text-sm italic text-gold-pale/75">
                Analytics dynamo · CRM · newsletter · course roster · Hermes & agent desk · content factory
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-3 text-[10px] font-display uppercase tracking-[0.16em]">
            <Link href="/admin" className="text-gold hover:text-gold-light">
              Command
            </Link>
            <Link href="/grimoire" className="text-gold-dim hover:text-gold">
              Grimoire
            </Link>
            <Link href="/archive" className="text-gold-dim/60 hover:text-gold-dim">
              Public Archive
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
