"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gold-dim/40 bg-deep/90 text-gold-dim shadow-lg transition-opacity hover:border-gold/50 hover:text-gold"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
