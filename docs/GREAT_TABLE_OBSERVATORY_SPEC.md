# Great Table Comparison Observatory
## Tool Specification — Phase 3
### v1.0 — April 18, 2026

> *The Great Table has never been stable. The Observatory makes that instability visible — not as a defect, but as a feature of the material's history.*

---

## I. WHAT THIS TOOL IS

The Great Table Comparison Observatory is the Archive's first structural comparison tool. It presents the Great Table of Earth — a 25-column × 27-row grid of letters that encodes the names of angels, governors, and elemental hierarchies — in multiple historical states, side by side.

The reader selects two (or more) comparison states. The Observatory displays them in parallel columns, visually marking cells that differ between states. Clicking a differing cell opens a provenance note explaining what each state contains, who made the change, and what the manuscript evidence shows.

The Observatory does not rank the states. It does not mark any state as "original" or "correct." It presents comparison states.

---

## II. WHY THIS TOOL EXISTS

The Great Table is the most widely used structural artifact in the Enochian system. Virtually every modern practitioner's experience of it is mediated through Israel Regardie's 1937–40 publication of the Golden Dawn's version — which differs from Dee's original in the arrangement of elemental quarters, the assignment of directional correspondences, and numerous individual letter readings.

Most practitioners do not know this. Most scholarly sources assume the reader already does.

The Observatory exists to close that gap. It lets a reader see, cell by cell, what Dee recorded, what the Golden Dawn changed, and what the manuscript evidence supports. No other tool in the Enochian landscape does this.

---

## III. COMPARISON STATES (INITIAL SET)

### State 1: Sloane 3191 — The Earliest Surviving Grid

- **Witness:** Sloane MS 3191, British Library
- **Date:** c. 1583–1584
- **Producer:** John Dee
- **Description:** The Great Table as Dee first received and recorded it during the Cracow-period actions. This is the earliest complete surviving grid. Individual cells may be difficult to read due to manuscript condition; where readings are uncertain, the Observatory marks them.
- **Badge support:** ◆

### State 2: Dee's Reformed Table

- **Witness:** Sloane MS 3191 (later entries) and related manuscripts
- **Date:** Post-1587 (the "Raphael" revision)
- **Producer:** John Dee, following instructions received after the 1587 disruption
- **Description:** Dee received instructions to reform the Great Table — a revised version with specific letter changes. The relationship between this reform and the original is itself a matter of scholarly discussion. Not all scholars agree on which changes belong to the reform and which are scribal corrections.
- **Badge support:** ◆ for the existence of the reform; ? for specific cell attributions

### State 3: Golden Dawn Arrangement

- **Witness:** Golden Dawn papers (various); Regardie's *The Golden Dawn* (1937–40)
- **Date:** c. 1888–1900 (Golden Dawn period)
- **Producer:** S.L. MacGregor Mathers and the Golden Dawn
- **Description:** The Golden Dawn reorganized the Great Table's elemental quarters, changing which quadrant corresponds to which element and compass direction. They also introduced the Tablet of Union as a central coordinating device and assigned Hebrew letter correspondences not present in Dee's original. This version became the dominant form in 20th-century Western occultism.
- **Badge support:** △ (later interpretation by a named tradition)

### State 4: Regardie's Published Version

- **Witness:** Israel Regardie, *The Golden Dawn*, various editions (1937–40, 1971, 1984)
- **Date:** 1937–1984
- **Producer:** Israel Regardie (publishing Mathers' arrangement with editorial choices)
- **Description:** Regardie's publication of the Golden Dawn papers introduced the Great Table to a wide audience. His version follows the Golden Dawn arrangement but includes some editorial standardizations and corrections that differ from the Golden Dawn's own internal documents. For most modern practitioners, this *is* the Great Table.
- **Badge support:** △

### Future States (Not in Initial Build)

- Aleister Crowley's working arrangement (from *The Vision and the Voice* notes)
- Modern scholarly reconstructions (Peterson's digital editions)
- The Tabula Recensa (an alternative reconstruction from the reformed table)

---

## IV. INTERACTION MODEL

### A. Default View: State Selector

The reader arrives at the Observatory and sees a brief introduction (3–4 sentences explaining what the Great Table is and why it exists in multiple states). Below the introduction: a state selector.

The selector presents the available states as cards, each showing:
- State name (label)
- Date range
- Producer
- One-sentence description
- Badge type this state can support

The reader selects two states. The Observatory enters comparison view.

### B. Comparison View: Side-by-Side Grids

Two 25×27 grids displayed in parallel columns. Each grid is fully labeled (row/column numbers, elemental quarter labels per the selected state).

**Cell states:**
- **Matching:** Cells that contain the same letter in both states. Rendered in the base gold-on-dark palette. No special marking.
- **Differing:** Cells that contain different letters. Rendered with a subtle left-border accent (not a highlight, not a glow — a quiet structural mark that says "look here"). The differing letter is shown in both grids; the reader sees what each state says.
- **Uncertain:** Cells where one or both states have uncertain readings. Rendered with a dashed border and the uncertainty indicator.
- **Structural difference:** Cells where the elemental quarter assignment differs between states (same letter, different structural meaning). Rendered with a distinct marker — perhaps a small glyph indicating the quarter assignment changed.

**Above the grids:** A summary strip: "X cells differ between these two states. Y cells have uncertain readings in one or both states."

### C. Cell Detail Overlay

Clicking any cell opens a detail overlay (not a modal — a slide-in panel, consistent with the glossary panel pattern already established in the lesson renderer).

The overlay shows:
- **Cell position:** Row, column
- **State A reading:** Letter, uncertainty level, manuscript note
- **State B reading:** Letter, uncertainty level, manuscript note
- **Provenance:** Who recorded this cell, in what manuscript, with what level of confidence
- **If differing:** What changed, who changed it, and any known reason
- **Derived names:** Angel/entity names that include this cell's position, if any
- **Badge:** The epistemic badge for the information displayed

### D. Uncertainty Surface

A toggle that overlays the grid with a heat map of uncertainty levels. Cells with "certain" readings are visually quiet. Cells with "uncertain" or "contested" readings are visually prominent. This lets the reader see, at a glance, where the evidence is strong and where it is fragile.

### E. Quarter Comparison View

When the two selected states have different elemental quarter assignments (Dee vs. Golden Dawn), the Observatory offers a "quarter view" toggle that colors each quadrant by its elemental assignment in each state. This makes the Golden Dawn's reorganization immediately visible as a structural change, not just a cell-level difference.

---

## V. CONTENT CLAUDE DELIVERS

### A. Cell-Level Data

For each of the four initial comparison states, Claude delivers a JSON file conforming to the `GreatTableStateData` schema (see PHASE_3_DATA_SCHEMAS.md §V-a). This means:
- A 27×25 array of `GreatTableCell` objects for each state
- Every cell annotated with its uncertainty level
- Manuscript notes where applicable
- Elemental quarter assignments for each state

**Scope note:** Complete cell-level data for all four states requires access to the manuscript evidence. Claude will:
1. Produce complete data for States 3 and 4 (Golden Dawn/Regardie) — these are published and well-documented
2. Produce best-available data for State 1 (Sloane 3191) — using Peterson's transcriptions and published facsimile studies
3. Produce partial data for State 2 (Reformed Table) — flagging cells where the reform attribution is uncertain

### B. Provenance Notes

For every cell where the four states diverge, Claude delivers a provenance note explaining:
- What each state says
- Who made the change (if applicable)
- What the manuscript evidence is
- The uncertainty level

Estimated volume: 50–80 provenance notes for the initial four-state comparison.

### C. Narrative Introduction

The 3–4 sentence introduction that appears above the state selector. Fully badged.

### D. State Descriptions

The card descriptions for each comparison state. 2–5 sentences each. Fully badged.

---

## VI. WHAT CURSOR BUILDS

1. **Route:** `/observatory/great-table` (or within the Compare mode route structure)
2. **State selector component** — card-based selection UI
3. **Grid renderer** — renders a 25×27 grid from `GreatTableStateData`
4. **Diff engine** — computes cell-level differences between two `GreatTableStateData` objects
5. **Cell detail overlay** — slide-in panel (reuse the pattern from `student-lesson-renderer.tsx` glossary panel)
6. **Uncertainty overlay** — toggle-able heat map layer
7. **Quarter comparison view** — elemental-quarter color overlay

---

## VII. WHAT THE OBSERVATORY DOES NOT DO

- It does not tell the reader which state is "correct."
- It does not rank the states by authority or reliability.
- It does not use the words "original," "corrupted," "authentic," or "distorted."
- It does not provide a "merged" or "best-reading" table. Each state is presented as it is.
- It does not attempt 3D visualization in this phase.
- It does not include practitioner commentary on which arrangement "works better" in ritual.

---

## VIII. VOICE AND COPY GUIDELINES

**State labels:** Use the format "Source — Descriptor." Example: "Sloane 3191 — Earliest Surviving Grid." Not: "The Original Great Table" (implies a verdict).

**Difference language:** "This cell reads [x] in State A and [y] in State B." Not: "State B changed this cell from [x] to [y]" (implies State A is the baseline from which B deviated — which may be true chronologically but should not be assumed structurally).

**Uncertainty language:** "The manuscript reading at this position is uncertain" or "Scholars disagree on this cell's reading." Not: "This cell is damaged" (may not be the reason for uncertainty).

**Quarter language:** "In this state, the eastern quadrant is assigned to [Element]." Not: "The Golden Dawn moved Air to the East" (implies the move was aberrant).
