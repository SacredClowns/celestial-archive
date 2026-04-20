# Great Table Observatory — Data Guide
## How to Source, Verify, and Enter the Grid Data

---

## I. THE CHALLENGE

The Great Table is a 25-column × 27-row grid = 675 cells. The Observatory needs this data for 4 historical states = 2,700 cell entries. Every cell needs a letter, an uncertainty level, and optionally a manuscript note.

This data **cannot be produced from memory.** It must be transcribed from published sources and verified against them. This guide specifies exactly where each state's data comes from and how to verify it.

---

## II. GRID STRUCTURE

The Great Table is organized as follows:

```
Columns:  0  1  2  3  4  5  6  7  8  9 10 11 | 12 | 13 14 15 16 17 18 19 20 21 22 23 24
                                              |    |
Rows 0–12:    [Quadrant NW]                   | B  |    [Quadrant NE]
              12 cols × 13 rows               | l  |    12 cols × 13 rows
                                              | a  |
Row 13:  ─────────── Black Cross (horizontal bar) ───────────────────────
                                              | c  |
Rows 14–26:   [Quadrant SW]                   | k  |    [Quadrant SE]
              12 cols × 13 rows               |    |    12 cols × 13 rows
                                              | C  |
                                              | r  |
                                              | o  |
                                              | s  |
                                              | s  |
```

- **Column 12** = vertical bar of the Black Cross (Linea Patris)
- **Row 13** = horizontal bar of the Black Cross (Linea Filii)  
- **Cell [13, 12]** = intersection of the cross

Each quadrant contains one Watchtower Tablet (12 cols × 13 rows).

Within each Watchtower Tablet:
- **Row 1** (of the tablet) = The Linea Spiritus Sancti (horizontal dividing line within the tablet)
- **Column 6** (of the tablet) = Vertical dividing line within the tablet (Linea Dei Patris Filioque)
- These divide each tablet into 4 sub-quadrants (Seniors, Kerubim, etc.)

---

## III. ELEMENTAL QUARTER ASSIGNMENTS

This is where the Golden Dawn and Dee diverge structurally:

### Dee's Original Assignment (State 1 — Sloane 3191)

Scholars debate Dee's exact intended arrangement. The most commonly cited reconstruction (? — Peterson, Leitch):

| Position | Element | Notes |
|----------|---------|-------|
| NW quadrant (rows 0–12, cols 0–11) | To be verified | Scholarly disagreement exists |
| NE quadrant (rows 0–12, cols 13–24) | To be verified | Scholarly disagreement exists |
| SW quadrant (rows 14–26, cols 0–11) | To be verified | Scholarly disagreement exists |
| SE quadrant (rows 14–26, cols 13–24) | To be verified | Scholarly disagreement exists |

**Source:** Peterson's analysis in his edition notes; Leitch's reconstruction in *The Angelical Language* vol. 2.

### Golden Dawn Assignment (States 3 & 4)

| Position | Element | Direction | Tablet Name |
|----------|---------|-----------|-------------|
| NW quadrant (rows 0–12, cols 0–11) | Air | East | Tablet of Air |
| NE quadrant (rows 0–12, cols 13–24) | Water | West | Tablet of Water |
| SW quadrant (rows 14–26, cols 0–11) | Earth | North | Tablet of Earth |
| SE quadrant (rows 14–26, cols 13–24) | Fire | South | Tablet of Fire |

**Note:** The directional assignments (Air=East, etc.) do NOT correspond to the quadrant's physical position on the grid. NW on the grid is "East" in the Golden Dawn system. This is itself a point of confusion in the literature.

**Source:** Regardie, *The Golden Dawn*, Book T; confirmed in Zalewski's *Golden Dawn Enochian Magic*.

---

## IV. DATA SOURCES BY STATE

### State 1: Sloane 3191 (Earliest Grid)
- **Primary source:** Joseph H. Peterson, digital transcriptions at esotericarchives.com
- **Secondary source:** Donald Laycock, *The Complete Enochian Dictionary* (1978/2001)
- **Verification:** Compare Peterson's transcription against published facsimile reproductions
- **Expected uncertainty:** High — manuscript condition means many cells are "uncertain" or "probable"
- **Badge:** ◆

### State 2: Dee's Reformed Table (Post-1587)
- **Primary source:** Peterson's transcription of the reformed/revised entries in Sloane 3191
- **Secondary source:** Leitch, *The Angelical Language* vol. 2, Appendix
- **Verification:** Cross-reference with Peterson's notes on which cells Dee marked as changed
- **Expected uncertainty:** Very high — disagreement about which changes are "reform" vs. "scribal correction"
- **Badge:** ◆ (existence) / ? (specific attributions)

### State 3: Golden Dawn Arrangement
- **Primary source:** Regardie, *The Golden Dawn* (1984 Llewellyn edition, most complete)
- **Secondary source:** Pat Zalewski, *Golden Dawn Enochian Magic*
- **Verification:** Compare Regardie against Zalewski and against surviving GD papers
- **Expected uncertainty:** Low — this is a published, widely-reproduced document
- **Badge:** △

### State 4: Regardie's Published Version
- **Primary source:** Regardie, *The Golden Dawn*, 1st edition (1937–40) vs. 4th edition (1984)
- **Note:** States 3 and 4 are very similar. The difference is that State 3 represents the Golden Dawn's internal version, while State 4 represents Regardie's specific published rendition. Where they differ is primarily in editorial standardization (e.g., capitalization, formatting).
- **Expected uncertainty:** Very low
- **Badge:** △

**Implementation note:** For the initial build, States 3 and 4 can share cell data with a flag for the ~20 cells where Regardie's editorial choices differ from the GD source documents. This reduces the initial data entry to effectively 3 grids, not 4.

---

## V. DATA ENTRY FORMAT

Each state's data is stored as a JSON file conforming to the schema in PHASE_3_DATA_SCHEMAS.md §V-a.

The cell array is `cells[row][col]` where:
- `row` ranges from 0 to 26
- `col` ranges from 0 to 24

Each cell object:
```json
{
  "letter": "a",
  "uncertaintyLevel": "certain",
  "manuscriptNote": null,
  "derivedNames": []
}
```

### Entering data efficiently:

Since the full table is large, consider entering data as four Watchtower tablets plus the Black Cross:

1. **NW Tablet** (13 rows × 12 cols) → maps to rows 0–12, cols 0–11
2. **NE Tablet** (13 rows × 12 cols) → maps to rows 0–12, cols 13–24
3. **SW Tablet** (13 rows × 12 cols) → maps to rows 14–26, cols 0–11
4. **SE Tablet** (13 rows × 12 cols) → maps to rows 14–26, cols 13–24
5. **Horizontal Cross** (1 row × 25 cols) → row 13
6. **Vertical Cross** (27 rows × 1 col) → col 12

The assembly script (for Cursor) composes these into the full 27×25 grid.

---

## VI. DIFF ENGINE NOTES

The diff engine compares two states cell by cell and classifies each cell:

| Classification | Condition | Visual Treatment |
|---------------|-----------|-----------------|
| `matching` | Same letter in both states | Base palette, no marker |
| `differing` | Different letter | Left-border accent mark |
| `uncertain` | One or both readings uncertain | Dashed border |
| `structural` | Same letter but different quarter assignment | Quarter-shift glyph |

The diff should be computed client-side (no API needed) since all data is loaded as static JSON.

---

## VII. PRIORITY ORDER FOR DATA ENTRY

1. **Golden Dawn / Regardie (States 3/4)** — Most complete, lowest uncertainty, unblocks the most impressive demo
2. **Sloane 3191 Original (State 1)** — Core scholarly value, medium uncertainty
3. **Reformed Table (State 2)** — Highest uncertainty, most scholarly — can ship with "data forthcoming" state

This means the Observatory can launch with a 2-state comparison (GD vs. Sloane) and add the other states progressively.

---

## VIII. VERIFICATION PROTOCOL

Before any state's data is marked as "entered," it must pass:

1. **Cell count verification:** Exactly 675 cells (27 × 25)
2. **Cross-reference check:** At least 2 independent sources agree on each "certain" cell
3. **Uncertainty audit:** Any cell with only one source must be "probable" at best
4. **Name derivation check:** At least the 12 major angel names (Kings, Seniors) correctly derive from the cell positions
5. **Quarter boundary check:** The elemental quarter assignments produce the correct Watchtower tablet contents
