# Cursor Implementation Prompt — Great Table Comparison Observatory
## Phase 3, Tool #1

---

## WHAT YOU ARE BUILDING

An interactive comparison tool that displays the Great Table of Earth — a 25×27 grid of letters — in multiple historical states, side by side. The reader selects two states, and the tool visually marks every cell that differs between them. Clicking a cell opens a detail overlay with provenance information.

This is the most visually dramatic surface in the Archive. Build it with the same restraint and gravity as every other surface — gold on dark, no confetti, no bounce.

---

## GOVERNING DOCUMENTS

Read these before writing any code:

1. `/docs/GREAT_TABLE_OBSERVATORY_SPEC.md` — Full product specification
2. `/docs/PHASE_3_DATA_SCHEMAS.md` §V-a — GreatTableStateData schema
3. `/content/phase-3-data/GREAT_TABLE_DATA_GUIDE.md` — Data structure and sourcing
4. `/docs/LIVING_GRIMOIRE_MOTION_SPEC.md` — Motion system rules
5. `/docs/EXPERIENCE_PRINCIPLES.md` — UX commandments
6. `/content/phase-3-data/great-table-observatory-content.md` — All narrative copy

---

## ROUTE

`/observatory/great-table`

Also accessible from the Observatory landing page at `/observatory` (already has a stub).

---

## IMPLEMENTATION PHASES

### Phase 1: TypeScript Types and Data Loading

**File:** `lib/observatory/great-table-types.ts`

Define TypeScript types that exactly mirror the JSON schemas:

```typescript
type UncertaintyLevel = "certain" | "probable" | "uncertain" | "contested" | "unknown";

type GreatTableCell = {
  letter: string;
  uncertaintyLevel: UncertaintyLevel;
  manuscriptNote: string | null;
  derivedNames: string[];
};

type ElementalQuarter = {
  label: string;
  element: string;
  direction: string;
  rowRange: [number, number];
  colRange: [number, number];
  seniorNames?: string[];
  kingName?: string;
  notes?: string;
};

type GreatTableStateData = {
  type: "great-table";
  rows: number;
  columns: number;
  elementalQuarters: ElementalQuarter[];
  tabletOfUnion?: {
    note?: string;
    grid: string[][];
  } | null;
  cells: GreatTableCell[][] | "PENDING_TRANSCRIPTION";
};

type ComparisonState = {
  id: string;
  objectId: string;
  label: string;
  description: string;
  witnessId: string;
  dateRange: { earliest: number; latest: number; precision: string; notes: string | null };
  producer: string;
  tradition: string | null;
  provenance: string;
  modifications: Modification[];
  uncertaintyLevel: UncertaintyLevel;
  stateData: GreatTableStateData;
};

type CellDiffResult = "matching" | "differing" | "uncertain" | "structural";

type CellComparison = {
  row: number;
  col: number;
  diff: CellDiffResult;
  stateA: GreatTableCell | null;
  stateB: GreatTableCell | null;
};
```

**File:** `lib/observatory/great-table-data.ts`

Load state data from the JSON files in `/content/phase-3-data/`. Export an array of available states and a function to get state data by ID.

**Important:** Handle the `"PENDING_TRANSCRIPTION"` case gracefully. When a state's cells are pending, the UI should show the state card in the selector but display a "data forthcoming" message instead of the grid.

---

### Phase 2: State Selector

**File:** `components/observatory/great-table-state-selector.tsx`

A card-based selector. The reader selects two states to compare.

**Layout:**
- 4 cards in a 2×2 grid (desktop) or stacked (mobile)
- Each card shows: label, date range, producer, badge, short description
- Cards use `inscribed-frame` when unselected, highlighted border when selected
- Selected cards show a small ordinal: "A" / "B"
- "Compare" button appears when two states are selected

**Card styling:**
- Use `CandlelightCard` wrapper for hover warmth
- Badge displayed using the existing `EpistemicBadge` component
- Card note (small text) in `text-gold-dim text-[11px]`

**Copy:** Pull from `great-table-observatory-content.md` §II.

---

### Phase 3: Grid Renderer

**File:** `components/observatory/great-table-grid.tsx`

Renders a single 25×27 grid from `GreatTableStateData`.

**Critical design decisions:**

1. **Cell size:** Each cell must be large enough to display a single letter legibly. On desktop, aim for ~28px cells. On mobile, ~20px cells with horizontal scroll.

2. **Font:** Use `font-display` (Cinzel) for the letters. They are occult script — they should feel inscribed, not typed.

3. **Cell colors by diff status:**
   - `matching`: `text-gold-pale bg-transparent`
   - `differing`: `text-gold border-l-2 border-amber` (the quiet structural mark)
   - `uncertain`: `border border-dashed border-gold-dim/40`
   - `structural`: A small glyph (◊) in the corner indicating quarter assignment differs

4. **Black Cross:** Row 13 and Column 12 should be visually distinct — a darker background stripe (`bg-ink/60`) to make the cross visible as a structural element.

5. **Quarter labels:** Along the edges of the grid, show the elemental assignment for each quadrant in the selected state. Use `font-display text-[9px] uppercase tracking-[0.14em]`.

6. **Row/Column numbers:** Optional toggle. When on, show numbers in `text-gold-dim/40 text-[9px]` along the margins. Off by default.

**Interaction:**
- Cells are clickable
- Hover shows a subtle brightening (no tooltip — the click opens the detail panel)
- Use `Inscribe` wrapper for the grid's initial reveal

---

### Phase 4: Diff Engine

**File:** `lib/observatory/great-table-diff.ts`

Pure function. Takes two `GreatTableStateData` objects, returns a 27×25 array of `CellComparison` objects.

```typescript
function diffGreatTables(
  stateA: GreatTableStateData,
  stateB: GreatTableStateData
): CellComparison[][] {
  // For each cell:
  // 1. If both cells have the same letter: "matching"
  // 2. If different letters: "differing"
  // 3. If either cell is uncertain/contested: "uncertain"
  // 4. If same letter but different quarter assignment: "structural"
  // Priority: uncertain > differing > structural > matching
}
```

Also export a summary function:
```typescript
function diffSummary(diff: CellComparison[][]): {
  matching: number;
  differing: number;
  uncertain: number;
  structural: number;
}
```

---

### Phase 5: Comparison View

**File:** `components/observatory/great-table-comparison.tsx`

The main comparison surface. Two grids side by side.

**Layout:**
- Desktop: Two grids in parallel columns with a thin vertical divider
- Mobile: Stacked vertically with a label for each
- Summary strip above the grids (see content doc §III)
- Toolbar below the summary strip with toggles

**Toolbar toggles:**
- `Show uncertainty surface` — overlays uncertainty heat map
- `Show elemental quarters` — colors quadrants by element
- `Show row/column numbers` — adds grid coordinates

**Scrolling:** Both grids scroll in sync (linked scroll). When the reader scrolls one grid horizontally, the other follows.

---

### Phase 6: Cell Detail Overlay

**File:** `components/observatory/great-table-cell-detail.tsx`

Slide-in panel from the right, reusing the pattern from `lesson-renderer.tsx` and `student-lesson-renderer.tsx` glossary panels.

**Content:**
- Cell position: `[row, col]`
- State A reading (letter, uncertainty, manuscript note)
- State B reading (letter, uncertainty, manuscript note)
- Provenance note (if the cell differs)
- Derived angel/entity names
- Epistemic badge

**Styling:**
- Use `panel-enter` and `panel-backdrop-enter` animations (already defined in globals.css)
- Close button in top-right
- Click outside to close

---

### Phase 7: Uncertainty Surface

**File:** `components/observatory/great-table-uncertainty-overlay.tsx`

When toggled on, overlays the grid with visual indicators:
- `certain` / `probable`: No change (base rendering)
- `uncertain`: Cell gets a hatched background pattern (CSS `repeating-linear-gradient` with gold-dim at very low opacity)
- `contested`: Cell gets a double-border

This is a CSS overlay layer, not a re-render. It should toggle instantly.

---

### Phase 8: Quarter Comparison View

**File:** `components/observatory/great-table-quarter-overlay.tsx`

When toggled on, colors each quadrant by its elemental assignment in the selected state.

**Colors (within the gold palette — no saturated primaries):**
- Fire: `rgba(160, 104, 32, 0.15)` — warm amber tint
- Water: `rgba(76, 120, 168, 0.10)` — cool blue-tint (very subtle)
- Air: `rgba(245, 232, 192, 0.08)` — pale gold brighten
- Earth: `rgba(58, 96, 48, 0.10)` — green-tint (very subtle)

When comparing two states with different quarter assignments, the difference is immediately visible because the same grid position is colored differently in each column.

---

### Phase 9: Observatory Page Assembly

**File:** `app/observatory/great-table/page.tsx`

Server component that loads the state data and renders:

1. **Introduction text** (from content doc §I)
2. **State selector** (Phase 2)
3. **Comparison view** (Phase 5, shown when two states selected)
4. **Source note** at bottom: "Data sources and verification status for each comparison state are documented in the Observatory data guide."

**Route transition:** Wrap in `Inscribe` for scroll reveal. Use `animate-room-enter` for route entry.

---

## COMPONENT TREE

```
app/observatory/great-table/page.tsx (server)
├── Introduction text (static markdown)
├── GreatTableStateSelector (client)
│   └── StateCard × 4
│       └── CandlelightCard + EpistemicBadge
├── GreatTableComparison (client, shown when 2 states selected)
│   ├── SummaryStrip
│   ├── Toolbar (toggles)
│   ├── GridContainer (linked scroll)
│   │   ├── GreatTableGrid (state A)
│   │   │   ├── QuarterOverlay (conditional)
│   │   │   └── UncertaintyOverlay (conditional)
│   │   └── GreatTableGrid (state B)
│   │       ├── QuarterOverlay (conditional)
│   │       └── UncertaintyOverlay (conditional)
│   └── CellDetailOverlay (slide-in panel)
└── Source note
```

---

## DATA FILES

All in `/content/phase-3-data/`:

- `great-table-state-sloane-3191.json` — State 1
- `great-table-state-reformed.json` — State 2
- `great-table-state-golden-dawn.json` — State 3
- `great-table-state-regardie.json` — State 4
- `great-table-observatory-content.md` — All narrative copy
- `GREAT_TABLE_DATA_GUIDE.md` — Data sourcing and verification protocol

---

## HANDLING PENDING DATA

The cell data for all four states is marked `"PENDING_TRANSCRIPTION"`. The UI must handle this gracefully:

1. State cards appear in the selector normally
2. When both selected states have pending data: show "Cell-level comparison data is being transcribed. State descriptions and provenance are available."
3. When one state has data and the other is pending: show the single grid with a note about the pending state
4. The diff engine returns null when either input has pending cells

**This means the full UI can be built and tested before the cell data is entered.** Use mock data during development:

```typescript
function generateMockGrid(): GreatTableCell[][] {
  return Array.from({ length: 27 }, () =>
    Array.from({ length: 25 }, () => ({
      letter: String.fromCharCode(97 + Math.floor(Math.random() * 26)),
      uncertaintyLevel: "certain" as const,
      manuscriptNote: null,
      derivedNames: []
    }))
  );
}
```

The mock grid lets you test all the visual states (matching, differing, uncertain, structural) without real data.

---

## VISUAL REFERENCE

The Observatory should feel like a celestial cartography table — two ancient charts laid side by side, with a scholar's careful annotations marking where they diverge.

- The grids themselves are the stars — dense, quiet, full of information
- The diff markers are the scholar's ink — precise, restrained, meaningful
- The detail overlay is the scholar's notebook — opened only when needed
- The uncertainty surface is the cartographer's honest confession — here be uncertain waters

---

## MOTION

Follow the Living Grimoire Motion Spec. Specifically:

- Grid reveals with `inscribe` animation (scroll-triggered, staggered by row)
- Cell detail panel enters with `panel-enter`
- Toggle overlays fade in with `transition-opacity duration-slow`
- No bounce, no spring, no confetti. The table has existed for 400 years. It does not need to announce itself.

---

## PERFORMANCE

- The grid is 675 cells × 2 = 1,350 DOM elements for a comparison. This is within budget.
- The diff engine runs once on state selection, not on every render
- Overlay toggles are CSS-only — no re-computation
- On mobile (< 640px), consider rendering only one grid at a time with a tab switcher instead of side-by-side

---

## TESTING

1. Mock data renders correctly in both grids
2. Diff engine correctly identifies matching, differing, uncertain, and structural cells
3. Linked scroll works on both desktop and mobile
4. Cell detail panel opens/closes without layout shift
5. All toggle overlays work independently and in combination
6. `PENDING_TRANSCRIPTION` state renders the forthcoming message, not a crash
7. Accessibility: all interactive cells have `role="button"` and keyboard handlers
8. Reduced motion: all animations respect `prefers-reduced-motion`
