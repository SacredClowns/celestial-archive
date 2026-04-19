# The Living Grimoire
## Animation & Motion Direction for The Celestial Archive
### v1.0 — April 18, 2026

> *A grimoire is not a website with a dark theme. A grimoire is a manuscript that knows it has been opened. This document defines how the Archive moves — and, more importantly, when it stays still.*

---

## I. THE PRINCIPLE

The Celestial Archive is a living manuscript. Not a movie, not a game, not a dashboard — a manuscript. Its motion language comes from three physical sources:

1. **Candlelight** — light that flickers, breathes, shifts. Not strobing. Not pulsing. The slow, warm fluctuation of a flame in a room with no wind.

2. **Ink on parchment** — text that appears as if being written. Not typed, not dropped in from above. Drawn. Letters that arrive with the speed and weight of a nib on paper.

3. **The astronomer's sky** — stars that drift, not bounce. Constellations that rotate so slowly you don't notice the motion until you look away and look back. The celestial sphere is in motion, but it moves at the speed of the real sky.

Every animation in the Archive must trace its lineage to one of these three sources. If a proposed motion cannot be described in terms of candlelight, ink, or starfield, it does not belong.

### What the Archive does NOT do:

- **Bounce, spring, or snap.** No elastic easing. No Material Design spring physics. The Archive is stone and parchment, not rubber and glass.
- **Slide in from off-screen.** Content does not arrive from the left, right, or bottom like a mobile app card. Content *reveals* — it was always there, but now you can see it.
- **Pulse or throb.** No heartbeat animations. No "breathing" circles. The Archive is alive, but it is calm.
- **Particle-explode.** No bursts, showers, or scatter effects. The closest thing to particles is dust — and dust drifts, it does not explode.
- **Celebrate.** No confetti, no fireworks, no "you did it" animations. The Archive acknowledges progress with stillness and opening — a new door is visible, not a party.

---

## II. THE FOUR MOTION LAYERS

### Layer 1: Ambient — The Room Breathes

These animations run constantly, beneath everything. They are not noticed consciously. They create the feeling that the Archive is a place, not a page.

#### 1a. Starfield Drift

The background of every page contains a sparse field of gold-pale points (not white — gold). These points:
- Are distributed randomly but not densely (40–80 per viewport)
- Drift very slowly (0.02–0.05px per frame) in a consistent direction per session
- Have individual twinkle cycles: opacity oscillates between 0.03 and 0.14, with periods between 4 and 12 seconds, randomized per point
- Never move fast enough to be consciously tracked
- Are rendered as CSS or SVG, not canvas (performance on mobile matters)

**Tailwind/CSS specification:**
```css
@keyframes star-drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-30px, -15px); }
}

@keyframes star-breathe {
  0%, 100% { opacity: var(--star-min, 0.03); }
  50% { opacity: var(--star-max, 0.14); }
}
```
Duration: drift 180–300s linear infinite; breathe 4–12s ease-in-out infinite (randomized per star via CSS custom properties or inline styles).

#### 1b. Parchment Grain

A very subtle noise texture on elevated surfaces (cards, panels, article containers). Not animated — static. But with a slight opacity shift on scroll: as the reader scrolls down, the grain becomes marginally more visible (0.02 → 0.04 opacity), as if the parchment is aging under their gaze.

#### 1c. Vignette Breathing

The radial gradient vignette on the page background has a very slow opacity oscillation:
```css
@keyframes vignette-breathe {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 0.92; }
}
```
Duration: 20–30s. This creates the candlelight effect — the room dims and brightens almost imperceptibly.

---

### Layer 2: Reveal — Content Becomes Visible

These animations fire once, when content enters the viewport. They are the "ink appearing" moments.

#### 2a. Paragraph Fade-In

As the reader scrolls, paragraphs and content blocks do not just appear — they fade in with a slight upward drift (not a slide — a drift: 8–12px, not 40px).

```css
@keyframes inscribe {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```
Duration: 600–800ms. Easing: `cubic-bezier(0.25, 0.1, 0.25, 1.0)` (a gentle deceleration, not a snap). Triggered via `IntersectionObserver` when the element enters the viewport.

**Rules:**
- Headers fire first, then body text 100ms later, then subsidiary elements (badges, captions) 100ms after that. This creates a cascade: title inscribes, then text fills in beneath it.
- Elements only animate on their first appearance. Scrolling back up does not re-trigger. The ink, once written, stays.
- On mobile, reduce the translateY to 4–6px. The effect should be perceptible but not distracting on a small screen.
- The very first screen of content (above the fold) does NOT use scroll-triggered reveal. It uses the route transition (see Layer 3). This prevents the "everything fades in at once" problem.

#### 2b. Border Draw

When an `inscribed-frame` element enters the viewport, its corner decorations draw in:
- The corner lines extend from zero length to full length over 400ms
- The lines appear to be drawn from the corner point outward
- Timing: starts 200ms after the content inside the frame begins its fade-in

```css
@keyframes corner-draw {
  0% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
```
(Actual clip-path values will depend on the corner element's geometry. The principle is: lines extend from a point, not appear all at once.)

#### 2c. Divider Extend

Horizontal rules and section dividers extend from their center point outward:
```css
@keyframes divider-extend {
  0% {
    transform: scaleX(0);
    opacity: 0.2;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
```
Duration: 500ms. `transform-origin: center`. This makes dividers feel like a pen stroke drawn across the page.

#### 2d. Badge Materialize

Epistemic badges (◆ ◇ ○ △ ◎ ~ ? ⚠) materialize with a brief glow that fades:
```css
@keyframes badge-materialize {
  0% {
    opacity: 0;
    filter: brightness(2);
  }
  40% {
    opacity: 1;
    filter: brightness(1.6);
  }
  100% {
    opacity: 1;
    filter: brightness(1);
  }
}
```
Duration: 400ms. The badge arrives slightly too bright, then settles to its resting luminance. This is the closest thing to "glow" the Archive permits — and it lasts less than half a second.

---

### Layer 3: Transition — Moving Between Rooms

Page-to-page navigation should feel like moving between rooms in a library, not like loading a new webpage.

#### 3a. Route Transition: The Threshold

When navigating between pages:
1. Current page fades to ink-black over 300ms (opacity 1 → 0)
2. Brief darkness: 100ms of pure `#080604` background (the "threshold")
3. New page fades in over 500ms (opacity 0 → 1)

The threshold moment is important. It is the blink between rooms. Without it, the Archive feels like a SPA swapping divs. With it, the Archive feels like spaces.

```css
@keyframes room-exit {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes room-enter {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**Rules:**
- The starfield layer does NOT fade during transitions. It remains constant. This grounds the reader — the sky is the same; only the room changed.
- The navigation bar does NOT fade. It is the constant frame.
- On mobile, reduce the threshold to 50ms. The effect should be perceptible but fast.

#### 3b. Lesson Sequence Transition

When moving from one lesson to the next (via the "next lesson" link), the transition is slightly different:
1. Current lesson fades while drifting very slightly upward (4px over 300ms) — the page is being turned
2. Threshold: 100ms
3. Next lesson fades in while drifting slightly downward from above (4px over 500ms) — the new page is settling

This creates the feeling of a page turn without literally animating a page-turn effect (which would be kitsch).

#### 3c. Panel Slide

Side panels (glossary, cell details, source witness) slide in from the right edge:
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
```
Duration: 350ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (fast start, gentle deceleration — the panel is pulled open, not pushed).

The backdrop overlay (the semi-transparent ink behind the panel) fades in over 200ms simultaneously.

---

### Layer 4: Interaction — The Manuscript Responds

Hover, focus, and click responses. These are the moments where the reader touches the grimoire and it acknowledges the touch.

#### 4a. Link and Button Hover

Gold text brightens on hover. But not instantly — over 400–600ms (`transition-duration: slow` is already defined as 600ms in the existing config). The easing is `ease-in-out` (already defined as `gravity`).

This timing is correct and already implemented. It should remain.

#### 4b. Card Hover: Inner Light

When a card (surface-card, lesson card, pillar card) is hovered:
- A very faint radial gradient appears at the cursor position, as if a candle is being held near the card
- The gradient: radial, 200px radius, from `rgba(201, 168, 76, 0.04)` to transparent
- The gradient follows the cursor position within the card
- On mouse leave, the gradient fades over 400ms

This is the "candlelight follows your hand" effect. It must be extremely subtle — the reader should feel warmth, not see a spotlight.

**Implementation note:** This requires a `mousemove` handler that updates a CSS custom property (`--mouse-x`, `--mouse-y`) on the card element, with the gradient rendered via `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ...)`.

#### 4c. Click Ripple: Ink Drop

When the reader clicks an interactive element (button, link, card):
- A small circular expansion from the click point, gold-dim at 0.08 opacity, expanding from 0 to ~60px radius over 400ms, then fading
- Not a Material Design ripple (which is too geometric and too visible). This is an ink drop — organic, barely visible, gone quickly.

#### 4d. Inscribed Frame Hover

When an `inscribed-frame` is hovered, its corner decorations increase in opacity slightly (0.35 → 0.50) over 600ms. The frame acknowledges attention without changing shape.

#### 4e. Sealed Frame Hover

When a `sealed-frame` (locked content) is hovered:
- No opacity change. The frame does not brighten. Locked content does not respond to attention.
- The cursor should change to `default`, not `pointer`. The sealed frame is not interactive.

This absence of response *is* the interaction. The reader learns: sealed things do not answer.

#### 4f. Grid Cell Hover (Observatory Tools)

When hovering over a cell in the Great Table Observatory or Loagaeth Viewer:
- The cell's border brightens from `gold-dim/20` to `gold-dim/50` over 200ms
- The cell's background shifts to `ink/30`
- Adjacent cells in the same row and column receive a very faint highlight (`ink/10`) — a crosshair effect that helps the reader locate their position in a large grid
- If the cell differs between comparison states, the difference marker pulses once (a single brightness oscillation, 300ms) to draw attention

---

## III. LOADING AND EMPTY STATES

### 3a. Route Loading: The Shelf Prepares

When content is loading (server-side data fetch, etc.):
- No spinner. No loading bar. No skeleton screens.
- The page shows the navigation and the starfield, with a centered micro-label:

```
THE SHELF ARRANGES ITSELF
```

Set in the display font, `text-[9px]`, uppercase, tracking wide, gold-dim at 0.5 opacity. The label has a slow opacity oscillation (0.35 → 0.55 over 3s). It is breathing, not blinking.

### 3b. Content Loading Within a Page

If a section of a page is loading (lazy-loaded comparison data, search results):
- A thin horizontal line (1px, gold-dim/30) extends from center over 2s, then retracts, then extends again. This is the pen waiting to write.
- No text label. The line is enough.

### 3c. Empty States

When a page has no content (the reader navigates to a section that hasn't been built yet):
- The `sealed-frame` treatment applies
- Inside the frame: a single line of text in the display font, italic, gold-dim:

The copy for empty states is authored per-surface (Claude's domain). The motion is: the frame draws in (border-draw animation), then the text inscribes (paragraph fade-in), then both rest.

---

## IV. SPECIAL SURFACES

### 4a. The Opening Experience

The first time the reader visits the Archive in a session, the opening experience shows:
1. Pure darkness (1s)
2. The title "CELESTIAL ARCHIVE" inscribes — letter by letter, left to right, 60ms per character, in the display font
3. The subtitle fades in beneath (500ms delay, 600ms duration)
4. The starfield fades in behind both (starting at step 2, reaching full density by step 3)
5. A "Touch to continue" label appears at the bottom (after the subtitle, 800ms delay)

This is the grimoire being opened. It takes about 4 seconds total. The reader can tap/click at any point to skip.

### 4b. Lesson Opening Sequence

Each lesson begins with:
1. The lesson number and stage label inscribe (gold-dim, small)
2. The lesson title inscribes (large, gold)
3. The subtitle fades in (if present)
4. Badges materialize in sequence, left to right, 100ms apart
5. A decorative divider extends beneath the header
6. The first paragraph of content inscribes after a 200ms pause

Total header animation: ~2s. The content then uses standard scroll-triggered reveals.

### 4c. Observatory Grid Entrance

When the Great Table Observatory or Loagaeth Viewer first renders a grid:
1. The grid border draws in (border-draw animation)
2. Cells populate column by column, left to right, with each column appearing over 30ms (total grid fill: ~750ms for 25 columns)
3. Difference markers appear last, after all cells have populated, with badge-materialize timing

This is the table being *written* — the grimoire drawing its own diagram.

### 4d. Source Witness Chain

When the Source Witness Explorer renders a citation chain:
1. The claim text inscribes at the top
2. A vertical line draws downward from the claim (the chain's spine)
3. Each witness node materializes along the line, top to bottom, 200ms apart
4. Modification markers appear at the connection points with the badge-materialize effect

This is the lineage being *traced* — a finger drawing a line through a manuscript margin.

---

## V. PERFORMANCE BUDGET

### Rules:
- **No animation may cause layout shift.** All animated properties must be `opacity`, `transform`, or `filter` only. No animating `width`, `height`, `margin`, `padding`, or `top/left`.
- **Total simultaneous animations per viewport: ≤ 20.** The starfield counts as 1 (not per-star). Each scroll-revealed element counts as 1 during its animation, then 0 after completion.
- **No animation on elements below the fold on initial load.** Scroll-triggered animations are initialized but not running until triggered.
- **All animations respect `prefers-reduced-motion`.** When the user's OS requests reduced motion, all Layer 1 (ambient) and Layer 2 (reveal) animations are disabled. Layer 3 (transitions) reduce to instant cuts. Layer 4 (interactions) retain hover color transitions but disable movement.
- **Mobile: reduce ambient layer density by 50%.** Fewer starfield points, longer breathe cycles, no parchment grain shift.
- **Target: 60fps on a 2020 mid-range phone.** If an animation causes frame drops on a test device, reduce or remove it.

### Implementation priority:
1. Layer 2 (reveal) — highest impact, lowest cost
2. Layer 3 (transitions) — critical for the "rooms" feeling
3. Layer 4 (interactions) — polish layer
4. Layer 1 (ambient) — atmospheric layer, add last, profile carefully

---

## VI. WHAT THIS DOCUMENT IS NOT

This is a motion *direction* document. It defines what should move, why, and how fast. It does not contain React components, CSS files, or implementation code. Cursor implements. Claude specifies.

The keyframe definitions above are illustrative — they show the shape of the motion. Cursor may adjust timing, easing curves, and implementation strategy (CSS vs. Framer Motion vs. GSAP vs. native Web Animations API) based on performance testing.

---

## VII. THE GOVERNING IMAGE

Close your eyes. You are sitting at a desk in a dark room. A single candle. An open manuscript. The gold ink on the page catches the candlelight differently as the flame moves. The stars outside the window drift. You turn a page. The next page has already been written, but it was waiting for you to arrive before it let you see it.

That is the motion language of the Celestial Archive.
