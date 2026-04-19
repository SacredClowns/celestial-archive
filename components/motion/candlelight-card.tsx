"use client";

import type { ReactNode } from "react";
import { useCallback, useRef } from "react";

/**
 * A card wrapper that tracks the cursor and renders a faint
 * radial gradient at the cursor position — as if a candle is
 * being held near the card.
 *
 * The gradient is extremely subtle: rgba(201, 168, 76, 0.04).
 * The reader should feel warmth, not see a spotlight.
 */
export function CandlelightCard({
  children,
  className = "",
  locked = false
}: {
  children: ReactNode;
  className?: string;
  locked?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (locked) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.setProperty("--candle-opacity", "1");
    },
    [locked]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--candle-opacity", "0");
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--candle-opacity": "0"
        } as React.CSSProperties
      }
    >
      {!locked ? (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-[400ms]"
          style={{
            background:
              "radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(201, 168, 76, 0.04), transparent)",
            opacity: "var(--candle-opacity)"
          }}
          aria-hidden
        />
      ) : null}
      {children}
    </div>
  );
}
