"use client";

import Link from "next/link";
import { Inscribe } from "@/components/motion/inscribe";

const panels = [
  {
    href: "/language/alphabet",
    title: "The Alphabet",
    subtitle: "21 letters. One lost script."
  },
  {
    href: "/language/dictionary",
    title: "The Dictionary",
    subtitle: "~250 words. One attested corpus."
  },
  {
    href: "/language/calls",
    title: "The Calls",
    subtitle: "19 keys. 48 gates."
  },
  {
    href: "/language/pronunciation",
    title: "The Pronunciation Guide",
    subtitle: "Three traditions. One uncertain voice."
  }
] as const;

export function LanguageChamberPanels() {
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
