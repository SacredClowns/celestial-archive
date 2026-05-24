# CURSOR PROMPT 7 — MEGA BUILD: Four Pillars
## Call Viewer Upgrade + Aethyr Explorer + Watchtower Map + Curriculum Viewer

**Priority:** CRITICAL — Production Build  
**Estimated Scope:** 10–14 prompts worth of work  
**Date:** May 23, 2026

---

## CONTEXT

The Celestial Archive now has **complete word-by-word data for all 19 Enochian Calls** — 1,195 words with pronunciation, English translation, and 71 textual-critical footnotes from James's 1984 manuscript edition. The Language Chamber's Call Viewer currently shows "Text Pending" for all Calls. We need to wire this data in and then build three entirely new interactive pillars.

This prompt covers **four major build tracks**:

1. **TRACK A** — Call Viewer Upgrade (wire real Call data into the existing Language Chamber)
2. **TRACK B** — Aethyr Explorer (new pillar: 30 Aethyrs interactive journey)
3. **TRACK C** — Watchtower Interactive Map (new pillar: Great Table drill-down)
4. **TRACK D** — Curriculum / Lesson Viewer (Stage 1 + Stage 2 reading experience)

---

## TRACK A: CALL VIEWER UPGRADE

### A.1 — Load the New Call Text Data

A new data file exists at `content/phase-4-data/calls-text-data.json`. It has this structure:

```typescript
// calls-text-data.json schema
{
  source: string;
  manuscriptSource: string;
  badge: string;
  note: string;
  calls: {
    number: number;           // 1–19
    title: string;            // "The First Key", etc.
    enochianText: string;     // Full continuous Enochian text
    words: {
      pos: string;            // James's position: "1.1", "1.2", etc.
      enochian: string;       // Enochian word (uppercase)
      pronunciation: string;  // James/Laycock pronunciation
      english: string;        // Dee's English translation
    }[];
    footnotes: string[];      // Textual-critical footnotes from James
  }[];
}
```

**Create a new type** in `lib/language/language-types.ts`:

```typescript
export type CallWordEntry = {
  pos: string;
  enochian: string;
  pronunciation: string;
  english: string;
};

export type CallTextData = {
  number: number;
  title: string;
  enochianText: string;
  words: CallWordEntry[];
  footnotes: string[];
};

export type CallsTextDataFile = {
  source: string;
  manuscriptSource: string;
  badge: string;
  note: string;
  calls: CallTextData[];
};
```

**Update `lib/language/language-data.ts`** to import and merge the two data files:

```typescript
import callsTextRaw from "@/content/phase-4-data/calls-text-data.json";

const callsTextData = callsTextRaw as CallsTextDataFile;

export function getCallTextData(callNumber: number): CallTextData | undefined {
  return callsTextData.calls.find(c => c.number === callNumber);
}

export function getAllCallTextData(): CallTextData[] {
  return callsTextData.calls;
}
```

### A.2 — Rebuild the Call Viewer Component

Replace the empty grid in `components/language/call-viewer.tsx` (lines 90–92, which currently show nothing when lines are NOT pending) with a full word-by-word interactive display.

**The new Call Viewer must show:**

1. **Full Enochian text block** — The continuous `enochianText` rendered in the Enochian font (`font-enochian`) at large size, with `text-gold` color. This is the "manuscript view" — the whole Call as one flowing text.

2. **Word-by-word table** below the text block:
   - Each row: position number (dim), Enochian word (gold, Enochian font), pronunciation (italic, gold-dim), English translation (gold-pale)
   - Clicking/hovering an Enochian word highlights it in the full text block above AND checks if it exists in the dictionary (`getDictionaryEntry(word)`) — if so, show a tooltip with dictionary data
   - Use a responsive grid: on mobile, stack vertically. On desktop, show in a 4-column layout

3. **Footnotes panel** — Collapsible section at the bottom showing all textual-critical footnotes from James. Style as `CandlelightCard` with amber/gold-dim text. Each footnote references a position number (e.g., "1.16: OD for 'and' missing in Sloane MS 3191").

4. **Pronunciation tradition selector** — The existing tradition buttons should now work. When the user selects a tradition, check if the word exists in the dictionary and show the tradition-specific pronunciation. The default pronunciation from `calls-text-data.json` maps to the "dee" tradition.

5. **Call 19 Aethyr variable** — For Call 19 (number === 19), position 30.4 contains "LIL" as the default. When the user selects a different Aethyr from the AethyrCallSelector, replace the word at position 30.4 with the selected Aethyr name in the display.

**Import and pass the data:**

Update `components/language/language-calls-shell.tsx` (or wherever the Call Viewer is mounted) to load `getCallTextData(call.number)` and pass it as a prop:

```typescript
<CallViewer 
  call={call} 
  callText={getCallTextData(call.number)} 
  aethyrs={aethyrs} 
/>
```

### A.3 — Call Statistics Dashboard

Add a small statistics panel to the `/language/calls` page (above or below the Call selector). Show:

- Total unique Enochian words across all 19 Calls
- Average words per Call
- Longest Call (Call 19: 181 words) and shortest (Call 15: 32 words)  
- Word frequency highlights (most common words: OD, CHIS, DS, ZACAR, etc.)
- A mini bar chart showing word count per Call (use a simple CSS bar chart, no charting library needed)

### A.4 — Shared Closing Formula Indicator

Calls 11–18 share an identical closing formula: `ZACAR ... ZAMRAN ... ODO CICLE QAA ZORGE LAP ZIRDO NOCO MAD HOATH IAIDA`. When viewing any Call 11–18, show a subtle indicator noting "This Call shares the standard closing formula with Calls 11–18" and visually distinguish the closing formula words (e.g., slightly different background, or a thin left border in amber).

---

## TRACK B: AETHYR EXPLORER (New Pillar)

### B.1 — Route Structure

Create the following routes:

```
/aethyrs                    → Aethyr Explorer landing page
/aethyrs/[name]             → Individual Aethyr detail page (e.g., /aethyrs/LIL)
```

Add "Aethyrs" to the main navigation in `components/layout/app-chrome.tsx`.

### B.2 — Aethyr Data Types

Create `lib/aethyrs/aethyr-types.ts`:

```typescript
export type AethyrGovernor = {
  name: string;
  sigil?: string;
  regions: string[];        // Parts of Earth assigned
  ministers: number;         // Number of angelic ministers
  letterExtraction: string;  // How name is extracted from Great Table
};

export type AethyrData = {
  number: number;            // 1 (LIL, highest) to 30 (TEX, lowest)
  name: string;              // Three-letter name: LIL, ARN, ZOM, etc.
  governors: AethyrGovernor[];  // 3 governors per Aethyr (91 total across 30)
  callVariant: string;       // The Aethyr name inserted into Call 19 at position 30.4
  order: "supernal" | "middle" | "lower";  // Rough classification
  badge: string;
};

export type AethyrExplorerData = {
  totalAethyrs: number;
  totalGovernors: number;
  aethyrs: AethyrData[];
};
```

### B.3 — Aethyr Data File

Create `content/phase-4-data/aethyr-explorer-data.json`. The 30 Aethyr names are already in `enochian-calls-data.json` under `aethyrNames`. For now, create the file with the 30 Aethyrs and their names, numbered 1–30 (LIL=1 as highest, TEX=30 as lowest). Set governors to empty arrays — Claude will fill in the governor data in a future content pass. Include a `_dataStatus` noting which fields are complete and which are pending.

### B.4 — Aethyr Explorer Landing Page

The `/aethyrs` page should show:

1. **Page header** — Title: "The 30 Aethyrs", subtitle: "The Concentric Heavens of the Enochian Cosmos". Use the same `ChamberPageHeader` pattern from the Language Chamber.

2. **Concentric ring visualization** — The 30 Aethyrs arranged as concentric rings, with TEX (30) as the outermost and LIL (1) as the innermost. This should be an SVG component. Each ring is clickable and navigates to `/aethyrs/[name]`.
   - Rings should have subtle gold borders on the dark background
   - The currently hovered ring should glow with `shadow-gold`
   - Each ring shows the Aethyr name (e.g., "TEX", "RII") and number
   - The center could show a small celestial symbol or the text "LIL — The First Aethyr"

3. **List fallback** — Below the rings visualization, show a simple table/list of all 30 Aethyrs with their numbers, names, and governor count (for accessibility and mobile).

4. **Epistemic notice** — A `CandlelightCard` at the top explaining: "The 30 Aethyrs represent concentric regions of the Enochian cosmos, received during the angelic sessions in Kraków, 1584. Each is accessed by inserting its name into the 19th Call. ◆" Badge: historical.

### B.5 — Individual Aethyr Page

The `/aethyrs/[name]` page should show:

1. **Aethyr header** — Number, name, classification (supernal/middle/lower)
2. **The Call** — Show Call 19 with THIS Aethyr's name substituted at position 30.4. Reuse the `CallViewer` component with the Aethyr pre-selected.
3. **Governors section** — List the 3 governors (when data is available; show "Governor data pending" placeholder when empty)
4. **Navigation** — Previous/Next Aethyr links (by number)
5. **Back to explorer** link

### B.6 — Aethyr Data Loader

Create `lib/aethyrs/aethyr-data.ts`:

```typescript
export function getAllAethyrs(): AethyrData[]
export function getAethyrByName(name: string): AethyrData | undefined
export function getAethyrByNumber(num: number): AethyrData | undefined
```

---

## TRACK C: WATCHTOWER INTERACTIVE MAP (New Pillar)

### C.1 — Route Structure

```
/watchtowers                 → Watchtower Map landing page  
/watchtowers/[quadrant]      → Individual quadrant detail (air, water, earth, fire)
```

Add "Watchtowers" to the main navigation.

### C.2 — Leverage Existing Great Table Data

There are already 4 Great Table JSON files in `content/phase-4-data/` from the Observatory build:
- `great-table-sloane-3191.json` (original 1583)
- `great-table-golden-dawn.json` (Golden Dawn version)
- `great-table-regardie.json` (Regardie version)  
- `great-table-reformed.json` (1587 Raphael correction)

**Also already built:**
- `components/student/great-table-version-demo.tsx` — Has version toggle logic
- `components/student/version-toggle.tsx` — Toggle UI component

### C.3 — Watchtower Types

Create `lib/watchtowers/watchtower-types.ts`:

```typescript
export type WatchtowerQuadrant = "air" | "water" | "earth" | "fire";

export type WatchtowerTablet = {
  quadrant: WatchtowerQuadrant;
  direction: "East" | "West" | "North" | "South";
  divineName: string;          // God-name from the tablet
  seniors: string[];           // 6 Seniors (Seniores) per quadrant
  angelicKing: string;
  grid: string[][];            // The letter grid (usually 12×13 or 13×12)
  calls: number[];             // Which Calls invoke this quadrant
  badge: string;
};

export type TabletOfUnion = {
  grid: string[][];            // 4×5 or 5×4 grid
  purpose: string;
  badge: string;
};

export type WatchtowerSystemData = {
  tablets: WatchtowerTablet[];
  tabletOfUnion: TabletOfUnion;
  greatTableVersions: string[];  // References to the 4 JSON files
};
```

### C.4 — Watchtower Landing Page

The `/watchtowers` page should show:

1. **The Great Table** — A large interactive grid showing all four Watchtower Tablets arranged in their traditional cross formation, with the Tablet of Union at the center. This is the signature visual of the page.
   - Each quadrant has a distinct subtle color accent (gold for Air/East, blue-tint for Water/West, green-tint for Earth/North, red-tint for Fire/South) — keep colors very muted within the gold-and-ink palette
   - Hovering over a cell shows the letter and its position
   - Clicking a quadrant navigates to `/watchtowers/[quadrant]`

2. **Version selector** — Allow switching between the 4 Great Table versions (Sloane 3191, Golden Dawn, Regardie, Reformed). Reuse the existing `VersionToggle` component from the student components.

3. **Orientation panel** — A `CandlelightCard` explaining what the Watchtowers are:
   "The four Watchtower Tablets represent the four elemental quarters of the Enochian cosmos. Together they form the Great Table — a master grid from which hundreds of angel names can be extracted through specific letter-reading rules. ◆"

4. **Quick stats** — Total angel names extractable, total letters, number of Seniors (24), number of Calls that invoke the Watchtowers (Calls 1–18, with Call 19 for the Aethyrs).

### C.5 — Quadrant Detail Page

Each `/watchtowers/[quadrant]` page shows:

1. **The Tablet grid** — The specific quadrant's letter grid, rendered as an interactive table
   - God-names highlighted (extracted from specific rows/columns per the Golden Dawn system)
   - Seniors highlighted (6 per tablet)
   - Clicking a highlighted name opens a tooltip/popover with the angel's name, rank, and badge

2. **Angel hierarchy** for this quadrant:
   - Divine Name
   - 6 Seniors (Seniores)
   - King
   - Angels of Medicine, Precious Stones, Transformation (when data available)

3. **Associated Calls** — Which of the 19 Calls invoke this quadrant, with links to the Call Viewer

4. **Version comparison** — Show differences between the 4 Great Table versions for this specific quadrant

### C.6 — Watchtower Data Loader

Create `lib/watchtowers/watchtower-data.ts`:

```typescript
export function getWatchtowerSystem(): WatchtowerSystemData
export function getTabletByQuadrant(quadrant: WatchtowerQuadrant): WatchtowerTablet
export function getTabletOfUnion(): TabletOfUnion
export function getGreatTableVersion(version: string): any  // loads the specific JSON
```

For the initial build, extract the grid data from the existing Great Table JSONs. The angel hierarchy data may not be fully populated yet — use placeholder arrays and a `_dataStatus` field.

---

## TRACK D: CURRICULUM / LESSON VIEWER

### D.1 — Existing Infrastructure

The lesson rendering pipeline is partially built:
- `lib/lesson-types.ts` — Full lesson schema with blocks, sections, glossary, claims, knowledge checks
- `lib/lesson-markdown/` — Markdown loader, body splitter, remark plugin for directives
- `lib/lessons/seeker/` — 5 lesson data files (lesson-1-1.ts through lesson-1-5.ts)
- `lib/content-registry.ts` — Registry of seeker lessons with slugs and navigation
- `components/lesson/` — `lesson-renderer.tsx`, `lesson-markdown-body.tsx`, `semantic-lesson-block.tsx`, `verification-pending-chip.tsx`
- Routes: `/path/seeker/page.tsx`, `/path/seeker/[slug]/page.tsx`, `/path/seeker/threshold/page.tsx`
- Student routes also exist: `/path/student/page.tsx`, `/path/student/[slug]/page.tsx`

**The full lesson markdown files exist** in `content/curriculum/stage-1-seeker/` (5 lessons, 7000–12000 words each) and `content/curriculum/stage-2-student/` (6 lessons).

### D.2 — Upgrade the Lesson Reading Experience

The current lesson renderer needs to be elevated to production quality. Here's what needs to happen:

#### D.2a — Badge Rendering in Prose

The lesson markdown uses inline badge glyphs: `◆`, `◇`, `○`, `△`, `◎`, `~`, `?`, `⚠`. These need to be detected in the rendered markdown and replaced with styled `EpistemicBadge` components.

**Implementation:** Create a remark/rehype plugin (or extend the existing `remark-lesson-directives.ts`) that:
- Detects badge glyphs in text nodes
- Wraps them in a `<span data-badge="historical">` (mapping glyph to badge type)
- The React component then renders these as styled inline badges with tooltips showing the badge name

Badge mapping:
```
◆ → historical    "Historical Evidence"
◇ → consensus     "Scholarly Consensus"  
○ → occult        "Traditional Occult Claim"
△ → later         "Later Interpretation"
◎ → parallel      "Parallel"
~ → speculative   "Speculative"
? → disputed      "Disputed/Contested"
⚠ → caution       "Caution"
```

#### D.2b — Glossary Tooltips

When a glossary term appears in lesson text, it should be clickable/hoverable to show its definition. The lesson frontmatter or the content registry lists which glossary terms are introduced in each lesson.

**Implementation:**
- After markdown is parsed, scan for words that match glossary entries (from `lib/glossary.ts`)
- Wrap matches in a component that shows a tooltip on hover with: term, one-line definition, badge, and a "See full entry →" link to `/glossary/[slug]`
- Only highlight the FIRST occurrence of each term per section (not every instance)

#### D.2c — Lens Tabs

The lessons contain sections organized by lens (Historical, Traditional Occult, Psychological, Symbolic, Speculative). These are currently rendered as sequential markdown sections. Upgrade to a tabbed interface:

- Detect lens sections by their headers (e.g., "### The Historical Lens", "### The Occult Lens")
- Render them as tabs within the lesson — the reader can switch between lenses
- Default to the Historical Lens tab being open
- On mobile, collapse to an accordion pattern instead of tabs
- Each tab/section should show the lens name and a subtle icon

#### D.2d — Sidebar Panels

The lessons have sidebar content (biographical frames, source notes, practice summaries). Create a lesson sidebar component:

- On desktop (>1024px): Show sidebar content in a right-side panel alongside the main lesson text, using a 2/3 + 1/3 grid layout
- On mobile: Collapse sidebar content into expandable sections interspersed within the lesson flow
- Sidebar panels should be styled as `CandlelightCard` with slightly different border color (gold-dim/30)

#### D.2e — Knowledge Check Component

The lessons include knowledge check questions. Build a `KnowledgeCheck` component:

- Shows the question
- Presents options (if multiple choice) or a reflection prompt
- Does NOT show "correct/incorrect" — instead shows all perspectives after the reader engages
- Styled to feel like contemplation, not testing: "Consider:" rather than "Quiz:"
- No scores, no progress bars, no gamification language

#### D.2f — Lesson Navigation

- At the bottom of each lesson: "Previous Lesson" / "Next Lesson" links with titles
- A sticky/fixed progress indicator showing approximate reading position (a thin gold line at the top of the viewport, CSS only, based on scroll position)
- Breadcrumb: Archive → Initiation Path → Stage 1: Seeker → Lesson 1.1

### D.3 — Stage Index Pages

#### Seeker Stage Index (`/path/seeker`)

Show all 5 Seeker lessons as cards:
- Lesson number, title, estimated duration
- Brief description (from `seekerLessonRegistry`)
- Status indicator (use a subtle glyph — all Seeker lessons are currently "open")
- The page intro text should set the tone: "Stage 1: Seeker — You begin at the threshold."

#### Student Stage Index (`/path/student`)

Show all 6 Student lessons similarly. Student lessons require completing Stage 1 (in the future — for now, show them all as accessible).

### D.4 — Lesson Markdown Loading

Ensure the markdown loader (`lib/lesson-markdown/load-seeker-lesson-md.ts`) correctly:
- Reads from `content/curriculum/stage-1-seeker/STAGE_1_SEEKER_LESSON_[N].md`
- Parses YAML frontmatter (the files already have it)
- Splits the body into sections
- Processes custom directives

Create a matching loader for Student lessons:
- `lib/lesson-markdown/load-student-lesson-md.ts`
- Reads from `content/curriculum/stage-2-student/`

---

## GLOBAL REQUIREMENTS

### Theme Compliance

All new components MUST use the existing Tailwind theme:
- **Background:** `bg-ink` (#080604) or `bg-deep` (#0d0a05) or `bg-parchment` (#140f07)
- **Text:** `text-gold` (primary), `text-gold-pale` (body), `text-gold-dim` (secondary), `text-amber` (accents/alerts)
- **Borders:** `border-gold-dim/20` (subtle), `border-gold-dim/40` (medium), `border-gold` (emphasis)
- **Cards:** Use `CandlelightCard` component for all card-like UI
- **Headers:** Use `font-display` (Cinzel) for all headings, `font-body` (Cormorant) for prose
- **Enochian text:** Use `font-enochian` class for any Enochian script display
- **Shadows:** `shadow-gold` for hover/glow effects
- **Max-width:** `max-w-reading` (720px) for prose/lesson content

### No External Dependencies

Do NOT add:
- Charting libraries (use CSS/SVG for simple visualizations)
- Animation libraries (use CSS animations + existing Tailwind config)
- State management libraries (use React state + context)
- CSS-in-JS libraries

You MAY use:
- Everything already in package.json (react-markdown, remark plugins, gray-matter, etc.)
- Native SVG for the Aethyr rings and Watchtower grid visualizations
- CSS Grid and Flexbox for layouts

### File Organization

```
lib/
  aethyrs/
    aethyr-types.ts
    aethyr-data.ts
  watchtowers/
    watchtower-types.ts
    watchtower-data.ts
  language/
    language-types.ts        ← UPDATE (add CallWordEntry types)
    language-data.ts         ← UPDATE (add callsTextData loader)

components/
  language/
    call-viewer.tsx          ← MAJOR UPDATE (word-by-word display)
    call-statistics.tsx      ← NEW
    call-footnotes.tsx       ← NEW
  aethyrs/
    aethyr-rings.tsx         ← NEW (SVG concentric ring viz)
    aethyr-detail.tsx        ← NEW
    aethyr-governor-card.tsx ← NEW
  watchtowers/
    great-table-grid.tsx     ← NEW (interactive grid)
    quadrant-detail.tsx      ← NEW
    angel-hierarchy.tsx      ← NEW
    tablet-cell.tsx          ← NEW
  lesson/
    lesson-markdown-body.tsx ← UPDATE (badge rendering, glossary tooltips)
    lens-tabs.tsx            ← NEW
    lesson-sidebar.tsx       ← NEW
    knowledge-check.tsx      ← NEW
    lesson-progress-bar.tsx  ← NEW
    lesson-nav-footer.tsx    ← NEW

app/
  aethyrs/
    page.tsx                 ← NEW
    [name]/
      page.tsx               ← NEW
  watchtowers/
    page.tsx                 ← NEW
    [quadrant]/
      page.tsx               ← NEW

content/
  phase-4-data/
    aethyr-explorer-data.json ← NEW (create with structure, governors pending)
```

### Navigation Update

Update `components/layout/app-chrome.tsx` to add navigation items:

```typescript
// Add to the nav items array:
{ label: "Watchtowers", href: "/watchtowers" },
{ label: "Aethyrs", href: "/aethyrs" },
// Existing:
{ label: "Language", href: "/language" },
{ label: "Path", href: "/path/seeker" },
```

### Build Verification

After completing each track, verify:
1. `npm run build` succeeds with no errors
2. All new routes appear in the build output
3. No TypeScript errors
4. No missing imports
5. All new pages are responsive (test at 375px and 1440px viewport widths)

---

## EXECUTION ORDER

Suggested order to minimize dependencies:

1. **Track A first** (Call Viewer) — it's a contained upgrade to existing code, and Track B depends on the Call Viewer for displaying Call 19 per-Aethyr
2. **Track B second** (Aethyr Explorer) — reuses the upgraded Call Viewer
3. **Track C third** (Watchtower Map) — leverages existing Great Table data files
4. **Track D last** (Curriculum) — the most complex track, touching the most files

But if you want to parallelize, Tracks C and D are independent of each other and of Tracks A/B.

---

## WHAT CLAUDE WILL PROVIDE NEXT

After Cursor completes this build:
- Claude will populate the Aethyr governor data (91 governors across 30 Aethyrs)
- Claude will populate the Watchtower angel hierarchy data (Seniors, Kings, Angels of Medicine/Stones/Transformation)
- Claude will verify all Call transcription data against additional manuscript sources
- Claude will write narrative content for the Aethyr Explorer and Watchtower Map pages
- Claude will continue building Stage 3+ curriculum content

---

*This prompt was prepared by Claude (Content Lead) for Cursor (Build Lead). All architectural decisions should follow the GPT Architect Brief (`/docs/GPT_ARCHITECT_BRIEF.md`). All visual decisions should follow the Experience Principles (`/docs/EXPERIENCE_PRINCIPLES.md`). The dark celestial theme (ink/gold/parchment palette) is non-negotiable.*
