"use client";

import Link from "next/link";
import { Inscribe } from "@/components/motion/inscribe";
import type { LanguageChamberContent } from "@/lib/language/language-types";

export function LanguageChamberPanels({
  panels
}: {
  panels: LanguageChamberContent["chamberPanels"];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {panels.map((panel, index) => (
        <Inscribe key={panel.href} delay={index * 80}>
          <Link
            href={panel.href}
            className="group flex h-[200px] flex-col justify-end rounded-sm border border-gold-dim/20 bg-ink/20 p-6 transition-[border-color,box-shadow] duration-slow ease-gravity hover:border-gold/40 hover:shadow-gold"
          >
            <h2 className="font-display text-xl text-gold transition-colors duration-slow group-hover:text-gold-light">
              {panel.title}
            </h2>
            <p className="mt-2 text-sm text-gold-dim">{panel.subtitle}</p>
          </Link>
        </Inscribe>
      ))}
    </div>
  );
}
