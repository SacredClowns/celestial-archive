"use client";

import { useEffect, useState } from "react";

export function OpeningExperience() {
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      setVisible(!sessionStorage.getItem("archive-opening-seen"));
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("archive-opening-seen", "1");
    } catch {
      /* ignore */
    }
  };

  if (!hydrated || !visible) {
    return null;
  }

  return (
    <div
      className="inscribed-frame mx-auto reading-column cursor-pointer bg-ink px-8 py-10 sm:px-12 sm:py-12"
      onClick={dismiss}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") dismiss();
      }}
    >
      <p className="font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim inscribe-ready inscribe-visible opening-stagger-1">
        Threshold
      </p>
      <p className="mt-4 font-display text-xl tracking-[0.05em] text-gold inscribe-ready inscribe-visible opening-stagger-2 sm:text-2xl">
        You have entered the Celestial Archive.
      </p>
      <p className="mt-5 text-[16px] leading-[1.95] text-gold-pale inscribe-ready inscribe-visible opening-stagger-3">
        This is a structured exploration of one of the most complex and least understood systems in the Western esoteric
        tradition — the Enochian system recorded by John Dee and Edward Kelley.
      </p>
      <p className="mt-4 text-[16px] leading-[1.95] text-gold-pale/90 inscribe-ready inscribe-visible opening-stagger-4">
        Nothing here asks you to believe. Everything here asks you to look carefully.
      </p>
      <p className="mt-8 font-display text-[9px] uppercase tracking-[0.15em] text-gold-dim/60 inscribe-ready inscribe-visible opening-stagger-5">
        Touch anywhere to enter
      </p>
    </div>
  );
}