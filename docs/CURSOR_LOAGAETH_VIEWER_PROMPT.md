# Cursor Implementation Prompt — Liber Loagaeth Structural Viewer
## Phase 3, Tool #2

---

## WHAT YOU ARE BUILDING

A leaf-by-leaf structural viewer for Liber Loagaeth (Sloane MS 3189) — a 49-leaf manuscript containing mostly 49×49 letter grids. The reader navigates between leaves, examines grid structures, toggles pattern-analysis overlays, and reads scholarship notes. Two leaves are structurally exceptional: Leaf 1 (word-grid format) and Leaf 49 (text-only, no grid).

This is an archival instrument for an unsolved manuscript. Build it with the same restraint as the Great Table Observatory — gold on dark, no decoration that the manuscript itself would not recognize.

---

## GOVERNING DOCUMENTS

Read these before writing any code:

1. `/docs/LIBER_LOAGAETH_VIEWER_SPEC.md` — Full product specification
2. `/docs/PHASE_3_DATA_SCHEMAS.md` §V-b — LoagaethLeafStateData schema
3. `/content/phase-3-data/loagaeth-viewer-data.json` — All leaf structural data
4. `/content/phase-3-data/loagaeth-viewer-content.md` — All narrative copy
5. `/docs/LIVING_GRIMOIRE_MOTION_SPEC.md` — Motion system rules
6. `/docs/EXPERIENCE_PRINCIPLES.md` — UX commandments

---

## ROUTE

`/observatory/loagaeth`

Also accessible from the Observatory landing page at `/observatory`.

---

## IMPLEMENTATION PHASES

### Phase 1: TypeScript Types and Data Loading

**File:** `lib/observatory/loagaeth-types.ts`

```typescript
type TranscriptionStatus = "transcribed" | "partially-transcribed" | "catalogued" | "unverified";
type ContentType = "letter-grid" | "word-grid" | "mixed" | "text";
type UncertaintyLevel = "certain" | "probable" | "uncertain" | "contested" | "unknown";
type SymmetryType = "rotational" | "reflective" | "diagonal" | "positional" | "other";

type LoagaethCell = {
  character: string;
  row: number;
  col: number;
  uncertaintyLevel: UncertaintyLevel;
  note: string | null;
};

type SymmetryNote = {
  type: SymmetryType;
  description: string;
  discoveredBy: string | null;
  uncertaintyLevel: UncertaintyLevel;
};

type ScholarshipNote = {
  scholar: string;
  observation: string;
  badge: string;
};

type LeafSide = {
  gridRows: number | null;
  gridColumns: number | null;
  contentType: ContentType;
  description: string;
  transcriptionSource: string | null;
  transcriptionStatus: TranscriptionStatus;
  uncertaintyLevel: UncertaintyLevel;
  cells: LoagaethCell[][] | "PENDING_TRANSCRIPTION" | null;
  structuralNotes: string | null;
};

type LoagaethLeaf = {
  leafNumber: number;
  dictationOrder: number;
  recto: LeafSide;
  verso: LeafSide;
  scholarshipNotes: ScholarshipNote[];
  symmetryAnalysis: SymmetryNote[] | null;
};

type LoagaethViewerData = {
  id: string;
  title: string;
  subtitle: string;
  totalLeaves: number;
  totalGridPages: number;
  standardGridDimensions: { rows: number; columns: number };
  dictationOrder: string;
  leaves: LoagaethLeaf[];
};
```

**File:** `lib/observatory/loagaeth-data.ts`

Load the viewer data from `/content/phase-3-data/loagaeth-viewer-data.json`. Export functions:
- `getLeafByNumber(n: number): LoagaethLeaf`
- `getAllLeaves(): LoagaethLeaf[]`
- `getLeavesInDictationOrder(): LoagaethLeaf[]`

---

### Phase 2: Leaf Navigator

**File:** `components/observatory/loagaeth-leaf-navigator.tsx`

A horizontal strip showing all 49 leaves as numbered cells.

**Layout:**
- Desktop: All 49 cells in a single scrollable row, grouped in sevens (7 groups of 7) with subtle dividers
- Mobile: Scrollable horizontal strip with momentum scrolling
- Each cell shows the leaf number
- Cells are color-coded by transcription status:
  - `transcribed`: `bg-gold/20 border-gold` (warm, available)
  - `partially-transcribed`: `bg-gold-dim/10 border-gold-dim` (dim, partial)
  - `catalogued`: `bg-ink/40 border-gold-dim/30` (dark, structural only)
  - `unverified`: `bg-ink/60 border-ink` (sealed)
- Active leaf has a brighter border and a small indicator below

**Toggle:** A switch above the navigator to toggle between manuscript order (1→49) and dictation order (49→1). When toggled, cells animate to reorder with `transition-all duration-slow ease-gravity`.

**Special markers:** Leaf 1 and Leaf 49 get small glyphs (◊ or similar) indicating their exceptional format.

---

### Phase 3: Leaf Detail View — Grid Renderer

**File:** `components/observatory/loagaeth-grid.tsx`

Renders a single 49×49 grid from a `LeafSide` object.

**Critical design decisions:**

1. **Cell size:** 49×49 = 2,401 cells. On desktop, aim for ~14px cells (the grid is ~686px wide). On mobile, ~10px cells with pinch-to-zoom.

2. **Font:** Use `font-display` (Cinzel) for letter content. At 14px cell size, the letter must be legible — use `text-[10px]` or `text-[11px]`.

3. **Cell colors by transcription status:**
   - Transcribed cell with content: `text-gold-pale bg-transparent`
   - Empty cell (blank in manuscript): `bg-transparent` (no dot)
   - Untranscribed cell: render a dot (·) in `text-gold-dim/20`

4. **Row/Column numbers:** Always visible along margins in `text-gold-dim/40 text-[8px]`.

5. **Border cells:** When scholarship notes mention distinctive border patterns, the outermost ring of cells gets a subtle `border-l border-gold-dim/15` to visually distinguish the border region.

**Special rendering for Leaf 1:**
- Recto: Render as 49 numbered paragraphs (one per row), not as a visual grid. Use `text-[13px] leading-relaxed text-gold-pale` for the text.
- Verso: Render rows 1-40 as text lines and rows 41-49 as a grid strip (9×49).

**Special rendering for Leaf 49:**
- Render five text lines centered, in `font-display text-[18px]` with generous spacing. No grid. The treatment should feel like an inscription.

**Interaction:**
- Cells are not individually clickable in the base view (too small at 14px)
- Hover shows a zoomed tooltip with the cell's letter, position [row, col], and any note
- Pinch-to-zoom on mobile and scroll-to-zoom on desktop

---

### Phase 4: Pattern Overlay Engine

**File:** `components/observatory/loagaeth-overlays.tsx`

Three toggleable overlays that modify the grid's visual rendering.

#### Overlay 1: Letter Frequency

When active, color-codes each cell by the frequency of its letter on the current leaf:
- Most common letters: `bg-gold-dim/8` (barely visible — the common is quiet)
- Medium frequency: `bg-gold/15`
- Rare letters: `bg-amber/25` (warmer — the rare draws attention)

Compute frequency per-leaf (not across the manuscript). The frequency map recalculates when switching leaves.

#### Overlay 2: Positional Symmetry

When active, highlights symmetric cell pairs:
- 180° rotational pairs: cells at `[r, c]` and `[49-r, 49-c]` that share the same letter get a shared highlight color
- Reflective pairs (horizontal axis): cells at `[r, c]` and `[49-r, c]`
- Reflective pairs (vertical axis): cells at `[r, c]` and `[r, 49-c]`

Use four distinct but subtle highlight colors (all within the gold palette, ~10% opacity). Only highlight pairs where both cells contain the same letter.

A small legend below the grid shows: "● Rotational   ● H-Reflective   ● V-Reflective   ● Diagonal"

#### Overlay 3: Repeated Sequences

When active, highlights sequences of 4+ identical characters that appear more than once on the leaf. Matching sequences share the same highlight color. Maximum 10 distinct colors; additional matches cycle.

**Implementation:** All overlays are CSS class toggles on the grid cells, not re-renders. They should toggle instantly.

---

### Phase 5: Scholarship Panel

**File:** `components/observatory/loagaeth-scholarship-panel.tsx`

A panel below the grid showing scholarship notes for the current leaf.

**Layout:**
- Each note renders as a card with: scholar name, year, observation text, epistemic badge
- Cards use `CandlelightCard` wrapper
- Badge displayed using `EpistemicBadge` component
- Empty state: "No published scholarship has been identified for this specific leaf."

---

### Phase 6: Cross-Leaf View

**File:** `components/observatory/loagaeth-cross-leaf-view.tsx`

Shows all 49 leaves as thumbnails in a 7×7 grid.

**Layout:**
- Desktop: 7 columns × 7 rows, each thumbnail ~80px
- Mobile: 4 columns, scrollable
- Each thumbnail renders a miniature representation of the leaf's grid structure:
  - Transcribed leaves: tiny pixel-map of letter density (dark dots where letters exist)
  - Catalogued leaves: outlined grid shape (empty rectangle with grid lines suggested)
  - Sealed leaves: solid dark rectangle
  - Leaf 49: rendered as horizontal text lines (visually distinct from grids)

**Interaction:**
- Click a thumbnail to navigate to that leaf's detail view
- Hover shows leaf number, content type, and transcription status

**Sort options:** Three buttons above the grid — Manuscript Order (default), Dictation Order, Grid Density (cells with content, descending).

---

### Phase 7: Comparison Mode

**File:** `components/observatory/loagaeth-comparison.tsx`

Reuse the comparison pattern from the Great Table Observatory.

**When to show:** Only when two independent transcriptions exist for the same leaf side. In the current data, this applies to Leaves 1-2 (Peterson vs. Laycock).

**Layout:**
- Two grids side by side (desktop) or stacked (mobile)
- Diff marking uses the same `CellDiffResult` system as the Great Table
- Summary strip shows: matching cells, differing cells, uncertain cells

**When not available:** Show a note: "Only one published transcription has been identified for this leaf. Comparison mode requires at least two independent sources."

---

### Phase 8: Page Assembly

**File:** `app/observatory/loagaeth/page.tsx`

Server component that loads the viewer data and renders:

1. **Introduction text** (from content doc §I)
2. **Leaf navigator** (Phase 2)
3. **Leaf detail view** (Phase 3, shown for selected leaf)
4. **Pattern overlays toolbar** (Phase 4, shown when viewing a grid)
5. **Scholarship panel** (Phase 5)
6. **Cross-leaf view** (Phase 6, accessible via tab or scroll)
7. **Source note** at bottom

**Route transition:** Wrap in `Inscribe` for scroll reveal. Use `animate-room-enter` for route entry.

**Default state:** On first load, show the introduction text and cross-leaf view. No leaf is selected until the reader clicks one.

---

## COMPONENT TREE

```
app/observatory/loagaeth/page.tsx (server)
├── Introduction text (static markdown)
├── LoagaethLeafNavigator (client)
│   ├── OrderToggle (manuscript / dictation)
│   └── LeafCell × 49
├── LoagaethLeafDetail (client, shown when leaf selected)
│   ├── MetadataStrip
│   ├── SideToggle (recto / verso)
│   ├── LoagaethGrid (standard grid)
│   │   ├── FrequencyOverlay (conditional)
│   │   ├── SymmetryOverlay (conditional)
│   │   └── RepetitionOverlay (conditional)
│   ├── OverlayToolbar (toggle buttons)
│   ├── ScholarshipPanel
│   └── ComparisonMode (conditional, when 2 transcriptions exist)
├── LoagaethCrossLeafView (client)
│   ├── SortControls
│   └── LeafThumbnail × 49
└── Source note
```

---

## DATA FILES

All in `/content/phase-3-data/`:

- `loagaeth-viewer-data.json` — Complete structural data for all 49 leaves
- `loagaeth-viewer-content.md` — All narrative copy and UI text

---

## HANDLING PENDING DATA

The cell data for all leaves is marked `"PENDING_TRANSCRIPTION"` or `null`. The UI must handle this gracefully:

1. Leaves with `cells: "PENDING_TRANSCRIPTION"` show the grid outline (49×49 empty structure) with the sealed indicator (·) in each cell
2. Leaves with `cells: null` (Leaf 49 verso) show the "unverified" message
3. Pattern overlays are disabled when cell data is pending — the toggle buttons appear grayed out with a tooltip: "Overlays available when cell data is transcribed"
4. The cross-leaf view renders catalogued leaves as outlined grids (no letter density data to show)

**Mock data for development:**

```typescript
function generateMockLeafGrid(): LoagaethCell[][] {
  return Array.from({ length: 49 }, (_, row) =>
    Array.from({ length: 49 }, (_, col) => ({
      character: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      row,
      col,
      uncertaintyLevel: "certain" as const,
      note: null
    }))
  );
}
```

---

## VISUAL REFERENCE

The Viewer should feel like examining a sealed manuscript through a magnifying glass — dense, quiet, full of unanswered questions.

- The grids are the manuscript itself — dense fields of letters, not colorful charts
- The overlays are the scholar's colored pencils — laid over the grid, not replacing it
- The cross-leaf view is the archivist's overview — seeing the whole book's shape at once
- The scholarship panel is the catalogue card — who has looked at this, what did they notice

---

## MOTION

Follow the Living Grimoire Motion Spec. Specifically:

- Leaf navigator cells enter with staggered `inscribe` animation
- Grid reveals row-by-row with `inscribe` stagger (fast — ~8ms per row for a 49-row grid)
- Overlay toggles fade in with `transition-opacity duration-slow`
- Leaf transitions use a subtle cross-fade (no slide — the manuscript doesn't move, the reader's attention shifts)
- Cross-leaf thumbnails enter with a grid stagger pattern (top-left to bottom-right)

---

## PERFORMANCE

- A single 49×49 grid = 2,401 DOM elements. This is within budget.
- The cross-leaf view renders 49 thumbnails, each simplified (~100 elements per thumbnail at most). Total: ~4,900 elements. Acceptable but watch paint performance.
- Pattern overlays are CSS-only class toggles — no re-computation of the grid
- Frequency computation runs once per leaf selection, cached
- On mobile (< 640px): render the grid at smaller cell size (10px) with pinch-to-zoom rather than scroll. Consider a "frequency map" simplified view as an alternative to the full grid.

---

## ACCESSIBILITY

1. All leaf navigator cells have `role="button"` and `aria-label="Leaf [n]"`
2. Grid cells have `role="gridcell"` with `aria-label="Row [r], Column [c]: [letter]"`
3. Overlay toggles are proper `<button>` elements with `aria-pressed` state
4. The order toggle uses `role="switch"` with appropriate labels
5. All animations respect `prefers-reduced-motion`
6. Keyboard navigation: arrow keys move between leaves in the navigator, Tab moves between interactive elements

---

## TESTING

1. All 49 leaves render without errors (including special Leaf 1 and Leaf 49)
2. Order toggle correctly reorders the navigator
3. Recto/verso toggle switches the displayed grid
4. All three pattern overlays toggle independently and in combination
5. Cross-leaf view renders all 49 thumbnails
6. `PENDING_TRANSCRIPTION` state renders sealed indicators, not crashes
7. Mock data enables all overlay calculations
8. Grid renders legibly at both desktop (14px) and mobile (10px) cell sizes
9. Pinch-to-zoom works on mobile for the full grid
10. Scholarship panel shows correct notes per leaf (empty state for leaves without notes)
