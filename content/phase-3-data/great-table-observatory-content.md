# Great Table Observatory — Narrative Content
## Content Deliverable for Cursor Implementation

---

## I. OBSERVATORY INTRODUCTION

*Displayed above the state selector when the reader first arrives.*

The Great Table of Earth is a 25-column by 27-row grid of letters — the largest single structural artifact in the Enochian system. ◆ It encodes the names of angels, governors, and elemental hierarchies across four quadrants, each governing a Watchtower.

◆ John Dee recorded the first surviving version during the Cracow sessions (c. 1584), letter by letter, as Edward Kelley scried. △ Three centuries later, the Golden Dawn reorganized it — changing elemental assignments, introducing the Tablet of Union, and creating the form that most modern practitioners encounter. ◇ The table that most people study today is not the table Dee recorded.

The Observatory presents the Great Table in multiple historical states, side by side. You select two states. The tool shows you, cell by cell, what each state contains — and where they differ. It does not tell you which state is correct.

---

## II. STATE SELECTOR CARDS

### Card 1: Sloane 3191 — Earliest Surviving Grid

- **Label:** Sloane 3191 — Earliest Surviving Grid
- **Date:** c. 1583–1584
- **Producer:** John Dee
- **Badge:** ◆
- **Card description:** The Great Table as Dee first recorded it during the Cracow-period actions. Dictated through Kelley's scrying and written in Dee's own hand. Some cells are difficult to read due to manuscript condition; uncertain readings are marked.
- **Card note (small text):** British Library, Sloane MS 3191

### Card 2: Dee's Reformed Table

- **Label:** Dee's Reformed Table — Post-1587 Revision
- **Date:** Post-1587
- **Producer:** John Dee (following received instructions)
- **Badge:** ◆ (existence); ? (specific cell attributions)
- **Card description:** After the 1587 disruption, Dee received instructions to reform the Great Table — a revised version with specific letter changes. Not all scholars agree on which changes belong to the reform and which are scribal corrections.
- **Card note (small text):** Also called the Tabula Recensa

### Card 3: Golden Dawn Arrangement

- **Label:** Golden Dawn — Reorganized Table
- **Date:** c. 1888–1900
- **Producer:** S.L. MacGregor Mathers / Golden Dawn
- **Badge:** △
- **Card description:** The Golden Dawn reorganized the table's elemental quarters, changed directional correspondences, and introduced the Tablet of Union. This arrangement diverges structurally from Dee's recording and became the dominant form in 20th-century Western occultism.
- **Card note (small text):** Golden Dawn internal papers; published by Regardie

### Card 4: Regardie's Published Version

- **Label:** Regardie — The Published Standard
- **Date:** 1937–1984
- **Producer:** Israel Regardie
- **Badge:** △
- **Card description:** Regardie's publication of the Golden Dawn papers made the reorganized Great Table widely available. His version follows the Golden Dawn arrangement with some editorial standardizations. For most modern practitioners, this is the only Great Table they have seen.
- **Card note (small text):** *The Golden Dawn*, various editions (1937–40, 1971, 1984)

---

## III. COMPARISON VIEW HEADER COPY

### Summary strip template:
`{X} cells differ between these two states. {Y} cells have uncertain readings in one or both states.`

### When no states selected:
`Select two states above to compare them side by side.`

### When one state selected:
`Select a second state to begin comparison.`

---

## IV. CELL DETAIL OVERLAY COPY

### Header:
`Cell [{row}, {col}]`

### Section labels:
- **State A reading** — `{state_label}`
- **State B reading** — `{state_label}`
- **Provenance** — What the manuscript evidence shows
- **Derived names** — Angel or entity names that include this position
- **Change note** — What differs and why (only if differing)

### When cell matches:
`This cell reads "{letter}" in both states.`

### When cell differs:
`This cell reads "{letter_a}" in {state_a_label} and "{letter_b}" in {state_b_label}.`

### When cell is uncertain:
`The reading at this position is uncertain in {state_label}. {manuscript_note}`

---

## V. UNCERTAINTY SURFACE TOGGLE COPY

### Toggle label:
`Show uncertainty surface`

### Legend (when active):
- **Solid** — Reading is certain or probable
- **Hatched** — Reading is uncertain
- **Marked** — Reading is contested between scholars

### Explanation (collapsible):
`The uncertainty surface shows where the manuscript evidence is strong and where it is fragile. Cells with certain readings are visually quiet. Cells where the reading depends on damaged manuscript, scribal ambiguity, or scholarly disagreement are visually prominent. This is not a defect map — it is an evidence map.`

---

## VI. QUARTER COMPARISON VIEW COPY

### Toggle label:
`Show elemental quarters`

### Explanation (collapsible):
`The Great Table is divided into four quadrants, each associated with an element and a compass direction. Dee's original arrangement and the Golden Dawn's arrangement assign different elements to different quadrants. This view colors each quadrant by its elemental assignment in each selected state, making the structural difference immediately visible.`

### Quarter legend labels:
- Fire — typically rendered in warm amber
- Water — typically rendered in cool blue-tinted gold
- Air — typically rendered in pale gold
- Earth — typically rendered in deep green-tinted gold

*Note for Cursor: The quarter colors should be subtle variations within the existing gold palette, not primary colors. The Archive does not use saturated blue, red, or green. Use opacity and warmth shifts within the gold-dim to gold-light range.*

---

## VII. EMPTY AND EDGE STATES

### No grid data available:
`Grid data for this state has not yet been entered into the Observatory. The state description and provenance are available; cell-level comparison will appear when the data is placed on the shelf.`

### Only one state has data:
`Cell-level comparison requires data for both selected states. {missing_state_label} does not yet have grid data in the Observatory.`

### Mobile viewport warning:
`The Great Table is a 25×27 grid. On narrow screens, you may need to scroll horizontally to see both states. For the best experience, use a wider viewport.`

---

## VIII. VOICE COMPLIANCE NOTES

Per the spec (GREAT_TABLE_OBSERVATORY_SPEC.md §VIII):

- **State labels** use "Source — Descriptor" format. Never "The Original" or "The Correct Version."
- **Difference language** says "reads X in State A and Y in State B." Never "State B changed this from X to Y."
- **Uncertainty language** says "uncertain" or "scholars disagree." Never "damaged" (unless specifically referring to physical damage).
- **Quarter language** says "assigned to [Element] in this state." Never "moved" or "corrected."
- **No cell or state is ever called "wrong."** The Observatory presents. It does not rank.
