"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  breatheDelay: number;
  breatheDuration: number;
  minOpacity: number;
  maxOpacity: number;
};

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.2 + 0.4,
    breatheDelay: Math.random() * -12,
    breatheDuration: Math.random() * 8 + 4,
    minOpacity: Math.random() * 0.04 + 0.02,
    maxOpacity: Math.random() * 0.08 + 0.06
  }));
}

/**
 * A sparse field of gold-pale points. They drift and breathe.
 * Rendered as absolute-positioned divs with CSS animations.
 *
 * Placed OUTSIDE the RoomTransition wrapper so the sky remains
 * constant when the reader moves between rooms.
 */
export function Starfield() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [count, setCount] = useState(40);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setCount(window.innerWidth < 640 ? 25 : 50);
  }, []);

  const stars = useMemo(() => generateStars(count), [count]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "#f5e8c0",
              opacity: star.minOpacity,
              "--star-min": String(star.minOpacity),
              "--star-max": String(star.maxOpacity),
              animation: reducedMotion
                ? "none"
                : `star-breathe ${star.breatheDuration}s ease-in-out ${star.breatheDelay}s infinite, star-drift 240s linear infinite`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
