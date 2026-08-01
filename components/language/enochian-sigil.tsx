"use client";

import { useEffect, useRef, useState } from "react";
import { GLYPH_PATHS } from "@/lib/language/glyph-paths";

/**
 * One stylized Enochian letterform, inscribed stroke by stroke when it
 * enters the viewport (or on hover, re-inscribed). Stroke-based so the
 * drawing itself becomes the animation.
 */
export function EnochianSigil({
  name,
  size = 96,
  inscribeOnView = true,
  className = ""
}: {
  name: string;
  size?: number;
  inscribeOnView?: boolean;
  className?: string;
}) {
  const paths = GLYPH_PATHS[name.toLowerCase()];
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(!inscribeOnView);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inscribeOnView || drawn) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inscribeOnView, drawn]);

  if (!paths) return null;

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Stylized Enochian letter ${name}`}
      onPointerEnter={() => setCycle((c) => c + 1)}
    >
      {paths.map((d, i) => (
        <path
          key={`${i}-${cycle}`}
          d={d}
          fill="none"
          stroke="#e8cc7d"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={
            drawn
              ? {
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: `sigil-inscribe 0.9s ease forwards`,
                  animationDelay: `${i * 0.35}s`,
                  filter: "drop-shadow(0 0 6px rgba(201,168,76,0.55))"
                }
              : { opacity: 0 }
          }
        />
      ))}
    </svg>
  );
}
