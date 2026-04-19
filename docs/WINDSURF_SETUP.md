# WINDSURF / CURSOR / COPILOT SETUP GUIDE
## Configuring AI Coding Tools for the Celestial Archive
### v1.0 — April 18, 2026

This is a practical setup guide. It tells you exactly how to configure Cursor, Windsurf, or any AI coding copilot so it produces code aligned with this project's architecture, visual language, and constraints.

---

## 1. CONTEXT FILES TO PRELOAD

Before starting any coding session, ensure the AI tool has access to these files in its context window. List them in order of priority — if your tool has limited context, load the first four at minimum.

### Tier 1 — Always Load (Required)
| File | Why |
|------|-----|
| `/.cursorrules` | All coding constraints, color tokens, component rules, forbidden patterns |
| `/docs/GPT_ARCHITECT_BRIEF.md` | The system constitution — architecture, badges, ranks, pillars, commandments |
| `/docs/VISUAL_DIRECTION.md` | Color palette, typography, interaction patterns, mood |
| `/docs/MVP_SCOPE.md` | What to build and what NOT to build |

### Tier 2 — Load for Feature Work
| File | When |
|------|------|
| `/docs/DATA_MODEL.md` | When building database schema, content types, or data pipelines |
| `/docs/EXPERIENCE_PRINCIPLES.md` | When building any user-facing interaction or content display |
| `/lib/lesson-types.ts` | When building lesson-related components |
| `/lib/glossary.ts` | When building glossary features or inline term tooltips |
| `/tailwind.config.ts` | When working on any styling |

### Tier 3 — Load for Content Rendering
| File | When |
|------|------|
| One Seeker lesson (suggest `STAGE_1_SEEKER_LESSON_4.md`) | When building the lesson renderer — this is the real content it must handle |
| `/docs/CONTENT_VOICE_GUIDE.md` | When writing any UI copy, placeholder text, or empty states |

### How to Preload in Cursor:
1. Open the files in tabs (Cursor indexes open files)
2. Or use `@file` references in your prompt: `@.cursorrules @docs/VISUAL_DIRECTION.md`
3. Or add them to `.cursor/context.md` if your version supports it

### How to Preload in Windsurf:
1. Use the "Add Context" panel to attach the Tier 1 files
2. Pin `/docs/GPT_ARCHITECT_BRIEF.md` as a persistent reference
3. Reference specific sections when prompting: "See §III of GPT_ARCHITECT_BRIEF.md for badge rules"

---

## 2. WORKSPACE STRUCTURE

### Files That Should Always Be Open While Coding

Keep these tabs open or pinned during any coding session. They are your reference rails.

| File | Purpose |
|------|---------|
| `/.cursorrules` | Quick reference for all "never do" and "always do" rules |
| `/tailwind.config.ts` | The design tokens — check before using any color or font |
| `/app/globals.css` | Global styles and CSS custom properties |
| `/app/layout.tsx` | Root layout — navigation, footer, global providers |

### Files to Open When Building Specific Features

| Feature | Open These |
|---------|-----------|
| Lesson pages | `lesson-types.ts`, one Seeker lesson `.md`, `EXPERIENCE_PRINCIPLES.md` |
| Badge system | `.cursorrules` (badge section), `GPT_ARCHITECT_BRIEF.md` §III |
| Glossary | `glossary.ts`, `CORE_TERMS.md` |
| Timeline | `MASTER_TIMELINE.md`, `DATA_MODEL.md` |
| Navigation | `SITE_MAP.md`, `MVP_SCOPE.md` |
| Search | `DATA_MODEL.md`, `glossary.ts` |
| Auth / User state | `DATA_MODEL.md`, `MVP_SCOPE.md` |

---

## 3. HOW TO PROMPT CURSOR EFFECTIVELY

### The Golden Rule
**Always reference the project files.** A generic prompt produces generic SaaS UI. A prompt that references `.cursorrules` and `VISUAL_DIRECTION.md` produces Archive-aligned code.

### Good Prompts

```
Build a Badge component following the rules in .cursorrules.
It accepts a type prop (one of: historical, consensus, occult_claim,
later_interpretation, parallel, speculative, disputed, caution).
Renders as a small inline span with a tooltip showing the badge name
and meaning. Use the gold palette from the design tokens.
```

```
Create the lesson page layout at /path/[stage]/[lesson]/page.tsx.
It should parse a markdown file from /content/curriculum/ and render:
- The metadata header table from YAML frontmatter
- Section navigation in a left sidebar on desktop
- Sidebar cards (blockquotes with "Sidebar" in the title) as right-margin
  floating cards on desktop, collapsible cards on mobile.
See .cursorrules for sidebar rules and animation limits.
Use the color tokens from tailwind.config.ts. No colors outside the palette.
```

```
Build the glossary tooltip component. When a glossary term appears in
lesson text, it renders with a subtle gold underline. Hover shows a
tooltip with the short definition. Click navigates to /glossary/[term-slug].
Tooltip uses --parchment-dark background and --gold-pale text.
On mobile, use a bottom-sheet instead of hover tooltip.
Glossary data comes from /lib/glossary.ts.
```

```
Build the empty state for a locked lesson. The message should say:
"This room is not yet open. Complete [prerequisite lesson name] to enter."
Use --gold-dim for the text. No icons, no illustrations.
Center vertically. Fade in over 400ms.
```

### Bad Prompts (And Why)

```
❌ "Build a lesson page"
```
Too vague. Cursor will produce a generic article layout with sans-serif text, blue links, and a white background. It has no idea about badges, sidebars, the gold palette, or the atmospheric feel.

```
❌ "Make it look cool and mystical"
```
Subjective. Will produce glowing text, particle effects, purple gradients, and pentagram imagery — all explicitly forbidden by the visual direction.

```
❌ "Add a congratulations modal when the user finishes a lesson"
```
Violates Commandment 5 (no gamified language). Rank advancement says "You have reached the threshold of [Rank Name]." There is no modal. There is a quiet transition.

```
❌ "Create a login page with social auth buttons"
```
Not wrong, but not referenced. Better version: "Create a login page following VISUAL_DIRECTION.md. Background --deep. Form fields with --gold-dim borders. Button uses --gold background with --ink text. No social auth icons — just email/password for now. Label the submit button 'Enter the Archive'."

```
❌ "Build the Watchtower 3D visualization"
```
Three.js is DEFERRED from MVP. Build the 2D interactive grid first. If you want 3D, you need Gate 3 approval from the human.

---

## 4. PREVENTING AI DRIFT INTO GENERIC SaaS UI

This is the most common failure mode. AI coding tools default to clean, flat, blue-and-white SaaS interfaces. The Archive is none of those things. Here's how to prevent drift:

### The Drift Checklist — Run After Every Session

- [ ] Are all backgrounds using the palette? (--ink, --deep, --parchment-dark — never white)
- [ ] Is body text --gold-pale? (Never #fff, #333, or any gray)
- [ ] Are headings using a serif font? (Never sans-serif)
- [ ] Are interactive elements using --gold? (Never blue, green, or the browser default)
- [ ] Do hover states use --gold-light? (Never opacity changes or blue highlights)
- [ ] Are loading states atmospheric fades? (Never spinners)
- [ ] Is empty-state copy in the Archive's voice? (Never "No results found")
- [ ] Are buttons labeled with Archive language? ("Enter", "Continue", "Return" — never "Submit", "Next", "Go")
- [ ] Is the layout layered and warm? (Never flat-white cards with drop shadows)
- [ ] Are all border colors from the palette? (--gold-dim for subtle, --gold for emphasis)

### When Drift Happens (And It Will)

1. Stop the session
2. Run the Drift Checklist
3. Paste the failed items back to the AI with: "These elements have drifted from the design system. Fix using .cursorrules and VISUAL_DIRECTION.md."
4. Verify the fix against the checklist
5. If drift keeps recurring, paste the full color token section from `.cursorrules` directly into the prompt

### Phrases That Prevent Drift

Include one of these in every prompt:

- "Follow the design tokens in tailwind.config.ts. No colors outside the palette."
- "This is a dark, warm, atmospheric UI — not a SaaS dashboard."
- "Refer to .cursorrules for all styling constraints."
- "Use serif typography. No sans-serif fonts."
- "The feel is an ancient library, not a modern web app."

---

## 5. HANDLING BUILD PHASES

### Phase 1 — Foundation (Current)
**What to build:** Design system tokens, base components, content rendering pipeline, navigation shell, lesson pages.
**Cursor's job:** Implement component architecture and content rendering.
**What to test:** Render one full Seeker lesson (Lesson 1.4 is the best test — it has badges, sidebars, tables, the Strange Feeling practice, and multiple lenses).
**Success criteria:** The lesson renders beautifully, badges display correctly, sidebars float/collapse properly, mobile is readable, and the feel is atmospheric.

### Phase 2 — Core Features
**What to build:** Glossary, timeline, celestial map, quiz engine, progress tracking.
**Cursor's job:** Build interactive components and data displays.
**What to test:** Glossary tooltips work inline in lesson text. Timeline is navigable. Celestial Map cells are clickable.
**Success criteria:** All pillar routes render content. Cross-links between pillars work.

### Phase 3 — User State
**What to build:** Auth, journal, bookmarks, search.
**Cursor's job:** Supabase integration, user state management, search UI.
**What to test:** A user can sign up, complete a lesson, write a journal entry, bookmark a page, and search the glossary.
**Success criteria:** User state persists across sessions. Search returns badge-aware results.

### Phase 4 — Polish
**What to build:** Documentary Mode, atmospheric transitions, mobile optimization, accessibility.
**Cursor's job:** Animation, responsive fixes, WCAG compliance.
**What to test:** Lighthouse scores. Screen reader compatibility. Mobile layout at 375px.
**Success criteria:** WCAG 2.1 AA. Performance score > 90. No layout shift.

### Between Phases
- Review all code against `.cursorrules` and the Drift Checklist
- Run the full lesson renderer test
- Human reviews the visual output (screenshots or live demo)
- Human approves phase advancement before Phase N+1 begins

---

## 6. WHEN TO STOP AND ASK FOR HUMAN REVIEW

### Always Stop When:
- You're about to build something not in `/docs/MVP_SCOPE.md`
- You're uncertain about a color, font, or interaction pattern
- You need to write UI copy for a state not covered in the voice guide
- You're building something that affects how content is displayed (badge rendering, lens switching, sidebar layout)
- A component is getting complex enough to need its own architectural decision
- You're touching the data model or database schema
- You're adding a new package or dependency
- You realize the design requires a choice between two approaches and neither is specified

### Always Stop When You Notice:
- You're using a color not in the palette
- You're writing text that sounds like a SaaS product
- You've built a spinner instead of an atmospheric fade
- A component works on desktop but you haven't tested mobile
- You've written "Coming Soon" instead of "This room is not yet open"
- The lesson page looks like a blog post instead of an ancient archive

### The One-Sentence Test:
Before committing any UI work, ask: **"Does this look like it belongs in a Renaissance occult archive, or does it look like it belongs in a Notion template?"**

If the answer is Notion, stop and fix it.

---

## 7. QUICK REFERENCE CARD

```
PALETTE:     --ink → --deep → --parchment-dark → --gold-dim → --gold → --gold-light → --gold-pale
FONTS:       Cinzel (headings) / Cormorant (body) / JetBrains Mono (code)
ANIMATIONS:  Max 600ms. Fade + translateY(8px). No particles. No parallax.
BUTTONS:     "Enter" / "Continue" / "Return" — never "Submit" / "Next" / "Go"
LOADING:     Atmospheric fade (opacity 0→1, 300-600ms) — never spinners
EMPTY STATE: "This room is not yet open" — never "Coming soon" or "No results"
ERRORS:      "The Archive cannot find this page" — never "404 Not Found"
RANK UP:     "You have reached the threshold of [Name]" — never "Congratulations!"
BADGES:      ◆◇○△◎~?⚠ — always visible, always tooltipped, always inline
3D:          DEFERRED. Build 2D. No WebGL. No Three.js.
SCOPE:       /docs/MVP_SCOPE.md is law. Everything else needs Gate 3.
```

---

*End of WINDSURF_SETUP.md*
