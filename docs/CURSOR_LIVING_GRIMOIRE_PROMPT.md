# Cursor Implementation Prompt: The Living Grimoire Motion System

> **Copy this entire document into Cursor as the prompt for implementation.**

---

## Context

You are implementing the animation and motion system for **Enochian: The Celestial Archive** — a Next.js 16 app (App Router, Turbopack) with Tailwind CSS. The app is a dark-themed scholarly grimoire exploring the Enochian magical system. It currently has no meaningful animation beyond a single `archival-fade-in` opacity transition and a slow star twinkle.

Your job is to make the manuscript come alive.

The full motion specification is at `/docs/LIVING_GRIMOIRE_MOTION_SPEC.md`. Read it completely before writing any code. This prompt distills the spec into implementation tasks.

---

## The One Rule That Governs Everything

**Does this feel like a manuscript becoming visible, or a website animating?**

If it feels like a website animating, cut it. Every motion must feel like it was already happening before the reader arrived. Nothing "pops in." Nothing announces itself. The Archive is not reacting to the user — it is simply allowing them to notice what was already there.

### Physical sources (all motion must trace to one of these):
1. **Candlelight** — slow, warm fluctuation. Not strobing. Not pulsing.
2. **Ink on parchment** — text that appears as if being drawn. Not typed, not dropped in.
3. **The astronomer's sky** — drift so slow you don't notice until you look away and back.

### Absolute prohibitions:
- No bounce, spring, or elastic easing
- No slide-in from off-screen (content *reveals*, it does not arrive)
- No pulse or throb animations
- No particle explosions or bursts
- No confetti, fireworks, or celebration
- No Material Design ripple effects
- No skeleton screens or loading spinners

---

## Existing Codebase State

### Files you will modify:

| File | What's there now |
|------|-----------------|
| `tailwind.config.ts` | 3 keyframes (`slow-spin`, `twinkle`, `archival-fade-in`), 3 animations, custom colors, `gravity` easing, `slow` duration |
| `app/globals.css` | CSS variables, radial gradient background, `.inscribed-frame` (corner decorations with `::before`/`::after`), `.sealed-frame` (dashed border), scrollbar styling, `::selection` |
| `app/layout.tsx` | Root layout with `<AppChrome>` wrapper. Cinzel (display) + Cormorant Garamond (body) fonts |
| `components/layout/app-chrome.tsx` | Header nav + `<main>` + footer. No animation currently |
| `components/home/opening-experience.tsx` | Client component, `animate-archival-fade-in`, click-to-dismiss |
| `components/ui/surface-card.tsx` | `inscribed-frame` or `sealed-frame` based on `locked` prop |
| `components/lesson/lesson-markdown-body.tsx` | ReactMarkdown with custom renderers. Headings, paragraphs, blockquotes, tables, divs, badges |
| `components/lesson/student-lesson-renderer.tsx` | Lesson page layout: header, markdown body, closing passage, source strip, sidebar, glossary panel |
| `components/lesson/semantic-lesson-block.tsx` | Switch on block name → styled containers |
| `components/discernment/blocks.tsx` | DiscernmentPracticeBlock, NoticeBlock, WarningBlock, etc. |
| `components/student/lesson-safety-frame.tsx` | Border-l aside with title + italic content |
| `components/student/pending-comparative-arrangement.tsx` | Empty state placeholder |

### Files you will create:

| File | Purpose |
|------|---------|
| `components/motion/use-inscribe.ts` | Custom hook: IntersectionObserver-based scroll reveal |
| `components/motion/inscribe.tsx` | Wrapper component for scroll-triggered reveal |
| `components/motion/starfield.tsx` | Ambient starfield background layer |
| `components/motion/candlelight-card.tsx` | Card wrapper with cursor-tracking radial gradient |
| `components/motion/room-transition.tsx` | Route transition provider using Next.js App Router patterns |

---

## Implementation Order

Do these in sequence. Each phase should be committable independently.

---

### PHASE 1: Foundation — Keyframes and Tailwind Config

**File: `tailwind.config.ts`**

Add these keyframes and animations to the existing `extend` block:

```ts
keyframes: {
  // ... keep existing slow-spin, twinkle, archival-fade-in ...

  // Layer 2: Reveal
  inscribe: {
    "0%": { opacity: "0", transform: "translateY(8px)" },
    "100%": { opacity: "1", transform: "translateY(0)" }
  },
  "inscribe-mobile": {
    "0%": { opacity: "0", transform: "translateY(5px)" },
    "100%": { opacity: "1", transform: "translateY(0)" }
  },
  "divider-extend": {
    "0%": { transform: "scaleX(0)", opacity: "0.2" },
    "100%": { transform: "scaleX(1)", opacity: "1" }
  },
  "badge-materialize": {
    "0%": { opacity: "0", filter: "brightness(2)" },
    "40%": { opacity: "1", filter: "brightness(1.6)" },
    "100%": { opacity: "1", filter: "brightness(1)" }
  },

  // Layer 3: Transitions
  "room-exit": {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" }
  },
  "room-enter": {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" }
  },
  "lesson-exit": {
    "0%": { opacity: "1", transform: "translateY(0)" },
    "100%": { opacity: "0", transform: "translateY(-4px)" }
  },
  "lesson-enter": {
    "0%": { opacity: "0", transform: "translateY(4px)" },
    "100%": { opacity: "1", transform: "translateY(0)" }
  },

  // Layer 1: Ambient
  "star-drift": {
    "0%": { transform: "translate(0, 0)" },
    "100%": { transform: "translate(-30px, -15px)" }
  },
  "star-breathe": {
    "0%, 100%": { opacity: "var(--star-min, 0.03)" },
    "50%": { opacity: "var(--star-max, 0.14)" }
  },
  "vignette-breathe": {
    "0%, 100%": { opacity: "0.85" },
    "50%": { opacity: "0.92" }
  }
},
animation: {
  // ... keep existing ...
  inscribe: "inscribe 0.7s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards",
  "inscribe-mobile": "inscribe-mobile 0.7s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards",
  "divider-extend": "divider-extend 0.5s ease-out forwards",
  "badge-materialize": "badge-materialize 0.4s ease-out forwards",
  "room-exit": "room-exit 0.3s ease-in forwards",
  "room-enter": "room-enter 0.5s ease-out forwards",
  "lesson-exit": "lesson-exit 0.3s ease-in forwards",
  "lesson-enter": "lesson-enter 0.5s ease-out forwards",
  "star-drift": "star-drift 240s linear infinite",
  "vignette-breathe": "vignette-breathe 25s ease-in-out infinite"
}
```

**File: `app/globals.css`**

Add at the end:

```css
/* ── Motion: reduced-motion respect ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ── Motion: inscribe reveal ── */
.inscribe-ready {
  opacity: 0;
}
.inscribe-visible {
  animation: inscribe 0.7s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
}

@media (max-width: 640px) {
  .inscribe-visible {
    animation-name: inscribe-mobile;
  }
}

/* ── Motion: staggered children ── */
.inscribe-stagger-1 { animation-delay: 0ms; }
.inscribe-stagger-2 { animation-delay: 100ms; }
.inscribe-stagger-3 { animation-delay: 200ms; }
.inscribe-stagger-4 { animation-delay: 300ms; }

/* ── Motion: divider extend ── */
.divider-extend-ready {
  transform: scaleX(0);
  transform-origin: center;
}
.divider-extend-visible {
  animation: divider-extend 0.5s ease-out forwards;
}

/* ── Motion: inscribed-frame corner draw ── */
.inscribed-frame {
  transition: border-color var(--transition-slow);
}
.inscribed-frame::before,
.inscribed-frame::after {
  transition: opacity var(--transition-slow);
}
.inscribed-frame:hover::before,
.inscribed-frame:hover::after {
  opacity: 0.50;
}

/* ── Motion: sealed-frame non-response ── */
.sealed-frame {
  cursor: default;
}
.sealed-frame:hover {
  /* Intentionally empty. Locked things do not respond. */
}
```

---

### PHASE 2: Scroll Reveal System (Layer 2 — highest impact)

**Create `components/motion/use-inscribe.ts`:**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type InscribeOptions = {
  /** Delay before the animation starts, in ms. Default 0. */
  delay?: number;
  /** Only animate once. Default true. */
  once?: boolean;
  /** IntersectionObserver threshold. Default 0.15. */
  threshold?: number;
  /** Root margin. Default "0px 0px -40px 0px" (trigger slightly before fully visible). */
  rootMargin?: string;
};

/**
 * Returns a ref and a visibility flag.
 * Attach the ref to any element; when it enters the viewport,
 * `isVisible` becomes true (and stays true if `once` is set).
 */
export function useInscribe<T extends HTMLElement = HTMLDivElement>(
  options: InscribeOptions = {}
) {
  const { delay = 0, once = true, threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once, threshold, rootMargin]);

  return { ref, isVisible };
}
```

**Create `components/motion/inscribe.tsx`:**

```tsx
"use client";

import type { ReactNode } from "react";
import { useInscribe } from "./use-inscribe";
import type { InscribeOptions } from "./use-inscribe";

type InscribeProps = InscribeOptions & {
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "p" | "li";
  className?: string;
};

/**
 * Wrap any content block in <Inscribe> to give it the scroll-triggered
 * ink-on-parchment reveal animation. The element starts invisible and
 * fades in with a gentle upward drift when it enters the viewport.
 *
 * The ink, once written, stays. Elements only animate on first appearance.
 */
export function Inscribe({
  children,
  as: Tag = "div",
  className = "",
  ...options
}: InscribeProps) {
  const { ref, isVisible } = useInscribe<HTMLElement>(options);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`${isVisible ? "inscribe-visible" : "inscribe-ready"} ${className}`}
    >
      {children}
    </Tag>
  );
}
```

**Now integrate `<Inscribe>` into the lesson renderer.**

**File: `components/lesson/student-lesson-renderer.tsx`**

Wrap the major content sections in `<Inscribe>` with staggered delays. The header is above the fold, so it uses the route transition (not scroll reveal). Wrap these sections:

1. The `<header>` block — do NOT wrap (above fold, uses route transition)
2. The lesson markdown body (`<div className="lesson-markdown-root">`) — wrap in `<Inscribe>`
3. The comparison slots section — wrap in `<Inscribe delay={100}>`
4. The closing passage section — wrap in `<Inscribe>`
5. The source strip section — wrap in `<Inscribe>`

Import at the top:
```tsx
import { Inscribe } from "@/components/motion/inscribe";
```

**File: `components/lesson/lesson-markdown-body.tsx`**

In the ReactMarkdown `components` config, add the inscribe animation to:

- **`h2`**: Add `className` including `inscribe-ready` → use `useInscribe` inline, OR simpler: wrap each heading in `<Inscribe as="div">`. The simpler approach: leave the markdown renderers as-is for now and let the parent `<Inscribe>` wrapper on the markdown body handle the initial reveal. Individual heading reveals can be added in a later polish pass.

- **`hr` (dividers)**: Change the `hr` renderer to use the divider-extend animation:
```tsx
hr: () => {
  // Divider extends from center
  return <hr className="my-10 border-gold-dim/35 divider-extend-ready inscribe-visible" />;
}
```
Better approach — since we need IntersectionObserver for the divider too, use the `Inscribe` wrapper:
```tsx
hr: () => (
  <Inscribe>
    <hr className="my-10 border-gold-dim/35 divider-extend-ready divider-extend-visible" />
  </Inscribe>
)
```
Actually, the cleanest approach: keep `hr` simple and let the parent `<Inscribe>` handle it. Only add individual element animation in a polish pass. **For Phase 2, wrap the top-level content containers only.**

**File: `app/page.tsx` (home page)**

Wrap each `<section className="section-depth">` in `<Inscribe>` with staggered delays:
- First section (title): NOT wrapped — above fold
- OpeningExperience: already has its own animation
- Observatory: `<Inscribe>`
- Progression + path: `<Inscribe delay={100}>`
- Pillar cards: `<Inscribe delay={200}>`

**File: `app/path/seeker/page.tsx` and `app/path/student/page.tsx`**

Wrap lesson card grids in `<Inscribe>`. Individual cards can use staggered delays if desired (100ms per card).

---

### PHASE 3: Route Transitions (Layer 3)

**Create `components/motion/room-transition.tsx`:**

This is the most architecturally complex piece. In Next.js App Router, route transitions require wrapping the page content and coordinating with `usePathname()`.

```tsx
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type TransitionStage = "idle" | "exiting" | "threshold" | "entering";

/**
 * Wraps page content and provides room-to-room transitions.
 * The starfield and navigation bar are OUTSIDE this wrapper —
 * they remain constant during transitions.
 */
export function RoomTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<TransitionStage>("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayChildren(children);
      return;
    }

    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;

      // Exit current room
      setStage("exiting");

      const exitTimer = setTimeout(() => {
        // Brief darkness (the threshold)
        setStage("threshold");

        const thresholdTimer = setTimeout(() => {
          // Swap content and enter new room
          setDisplayChildren(children);
          setStage("entering");

          const enterTimer = setTimeout(() => {
            setStage("idle");
          }, 500);

          return () => clearTimeout(enterTimer);
        }, 100);

        return () => clearTimeout(thresholdTimer);
      }, 300);

      return () => clearTimeout(exitTimer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  const stageClass = {
    idle: "",
    exiting: "animate-room-exit",
    threshold: "opacity-0",
    entering: "animate-room-enter"
  }[stage];

  return (
    <div className={stageClass}>
      {displayChildren}
    </div>
  );
}
```

**File: `components/layout/app-chrome.tsx`**

Wrap the `<main>` content in `<RoomTransition>`:

```tsx
import { RoomTransition } from "@/components/motion/room-transition";

// ... inside AppChrome:
<main className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
  <RoomTransition>{children}</RoomTransition>
</main>
```

The `<header>` and `<footer>` stay OUTSIDE `<RoomTransition>`. They do not fade. They are the constant frame.

**Important:** The starfield (Phase 4) will also be placed outside `<RoomTransition>`, behind everything. The sky does not change when you move between rooms.

---

### PHASE 4: Interaction Layer (Layer 4)

**Create `components/motion/candlelight-card.tsx`:**

```tsx
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (locked) return; // Sealed things do not respond
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--candle-opacity", "1");
  }, [locked]);

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
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--candle-opacity": "0"
      } as React.CSSProperties}
    >
      {/* The candlelight gradient */}
      {!locked && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-[400ms]"
          style={{
            background: "radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(201, 168, 76, 0.04), transparent)",
            opacity: "var(--candle-opacity)"
          }}
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}
```

**File: `components/ui/surface-card.tsx`**

Wrap the card content in `<CandlelightCard>`:

```tsx
import { CandlelightCard } from "@/components/motion/candlelight-card";

export function SurfaceCard({ title, children, locked }: { title: string; children: React.ReactNode; locked?: boolean }) {
  return (
    <CandlelightCard
      locked={locked}
      className={`relative px-6 py-6 transition-opacity duration-slow ease-gravity ${
        locked
          ? "sealed-frame bg-ink/30 text-gold-dim"
          : "inscribed-frame bg-parchment/30"
      }`}
    >
      {/* ... existing content unchanged ... */}
    </CandlelightCard>
  );
}
```

**Ink-drop click effect** — add to `globals.css`:

```css
/* ── Motion: ink drop click ── */
@keyframes ink-drop {
  0% {
    transform: scale(0);
    opacity: 0.08;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.ink-drop-target {
  position: relative;
  overflow: hidden;
}

.ink-drop-target::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
  transform: scale(0);
  pointer-events: none;
  /* Position is set via JS on click */
}
```

For the ink-drop, the simplest approach is a small utility hook that adds a temporary element on click. However, this is a polish item — **implement the candlelight cursor effect first**, then add ink-drop as a final pass if time permits.

---

### PHASE 5: Ambient Layer (Layer 1 — add last, profile carefully)

**Create `components/motion/starfield.tsx`:**

```tsx
"use client";

import { useEffect, useMemo, useRef } from "react";

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
 * This component is placed OUTSIDE the RoomTransition wrapper
 * so the sky remains constant when the reader moves between rooms.
 *
 * Performance notes:
 * - 50 elements on desktop, 25 on mobile
 * - Uses only opacity and transform (compositor-friendly)
 * - Respects prefers-reduced-motion (renders static, no animation)
 */
export function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const stars = useMemo(() => generateStars(isMobile ? 25 : 50), [isMobile]);

  useEffect(() => {
    // If reduced motion is preferred, stars are static at their min opacity
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "#f5e8c0",
            opacity: star.minOpacity,
            "--star-min": String(star.minOpacity),
            "--star-max": String(star.maxOpacity),
            animation: `star-breathe ${star.breatheDuration}s ease-in-out ${star.breatheDelay}s infinite, star-drift 240s linear infinite`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
```

**File: `components/layout/app-chrome.tsx`**

Add the starfield behind everything:

```tsx
import { Starfield } from "@/components/motion/starfield";
import { RoomTransition } from "@/components/motion/room-transition";

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ink text-gold-pale">
      <Starfield />
      <div className="relative z-10">
        <header className="...">
          {/* ... existing nav ... */}
        </header>
        <main className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
          <RoomTransition>{children}</RoomTransition>
        </main>
        <footer className="...">
          {/* ... existing footer ... */}
        </footer>
      </div>
    </div>
  );
}
```

**Vignette breathing** — modify the existing background gradient in `globals.css`:

```css
html, body {
  /* existing gradient stays */
}

/* Add a vignette overlay that breathes */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(8, 6, 4, 0.6) 100%);
  animation: vignette-breathe 25s ease-in-out infinite;
}
```

---

### PHASE 6: Opening Experience Enhancement

**File: `components/home/opening-experience.tsx`**

Replace the simple fade-in with the full grimoire-opening sequence:

1. Start with pure darkness (the `<div>` is fully opaque ink-black)
2. After 1s, the "Threshold" label inscribes
3. After 1.5s, the title text inscribes
4. After 2s, the body text fades in
5. After 3s, the "Touch to continue" label appears
6. User can click/tap at any point to dismiss

Use a series of `useState` + `setTimeout` to sequence the reveals, or CSS animation-delay on child elements. The CSS approach is simpler and more performant:

```tsx
// Add stagger classes to each paragraph:
<p className="... inscribe-ready inscribe-visible inscribe-stagger-1">Threshold</p>
<p className="... inscribe-ready inscribe-visible inscribe-stagger-2">You have entered...</p>
<p className="... inscribe-ready inscribe-visible inscribe-stagger-3">This is a structured...</p>
<p className="... inscribe-ready inscribe-visible inscribe-stagger-4">Touch to continue</p>
```

But the stagger delays defined in globals.css (0–300ms) are too fast for the opening. Create opening-specific delays:

```css
.opening-stagger-1 { animation-delay: 1000ms; }
.opening-stagger-2 { animation-delay: 1500ms; }
.opening-stagger-3 { animation-delay: 2200ms; }
.opening-stagger-4 { animation-delay: 3000ms; }
```

---

### PHASE 7: Glossary Panel Slide

The glossary panel in `student-lesson-renderer.tsx` currently appears instantly. Add the panel-enter animation.

In `globals.css`:

```css
@keyframes panel-enter {
  0% {
    transform: translateX(100%);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes panel-backdrop {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.panel-enter {
  animation: panel-enter 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.panel-backdrop-enter {
  animation: panel-backdrop 0.2s ease-out forwards;
}
```

**File: `components/lesson/student-lesson-renderer.tsx`**

On the panel overlay `<div className="fixed inset-0 z-50 ...">`, add `panel-backdrop-enter`.
On the panel `<section>`, add `panel-enter`.

---

### PHASE 8: Loading State

**File: Create a loading state component or modify `app/loading.tsx`:**

If using App Router's `loading.tsx` convention:

```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p
        className="font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim/50"
        style={{ animation: "vignette-breathe 3s ease-in-out infinite" }}
      >
        The shelf arranges itself
      </p>
    </div>
  );
}
```

No spinner. No skeleton. Just a breathing label.

---

## Quality Checks

After each phase, verify:

1. **`prefers-reduced-motion` works.** Set it in your browser dev tools and confirm all animations are disabled.
2. **No layout shift.** Open Chrome DevTools → Performance → check for CLS. All animations use only `opacity`, `transform`, and `filter`.
3. **Mobile performance.** Test on Chrome mobile emulation. The starfield should render 25 points max. All animations should hit 60fps.
4. **The nav and starfield persist across route changes.** Navigate between pages and confirm neither the header nor the background flickers or re-renders.
5. **Sealed frames do NOT respond to hover.** Check that `.sealed-frame` cards show no visual change on hover — no cursor change, no gradient, no opacity shift.
6. **Scroll reveals fire once.** Scroll down past animated content, then scroll back up. The content should remain visible, not re-animate.

---

## The Final Test

Open the Archive. Navigate to a lesson. Scroll through it. Navigate to another lesson. Open the glossary panel. Close it. Scroll to the bottom.

Ask yourself: **Did that feel like turning pages in a manuscript in a dark room? Or did it feel like clicking through a website?**

If the answer is "manuscript" — ship it.
If the answer is "website" — find the motion that broke the spell, and either slow it down, make it subtler, or remove it entirely.

The Archive was already there before you opened it. Your animations just let the reader notice.
