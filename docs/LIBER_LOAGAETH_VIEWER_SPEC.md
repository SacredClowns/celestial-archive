# Liber Loagaeth Structural Viewer
## Tool Specification — Phase 3
### v1.0 — April 18, 2026

> *The book has never been read. The Viewer does not attempt to read it. It makes the structure visible so the reader can see what remains unsolved.*

---

## I. WHAT THIS TOOL IS

The Liber Loagaeth Structural Viewer is a leaf-by-leaf navigator for Sloane MS 3189 — the manuscript Dee identified as "Liber Loagaeth" or "The Book of Speech from God." The Viewer presents each leaf's grid structure, offers pattern-analysis overlays, and links to published scholarship on the manuscript.

It is not a decoder. It is not a translation tool. It is a *structural viewer* — a way of seeing the book's architecture that is not possible by reading about it.

---

## II. WHY THIS TOOL EXISTS

Liber Loagaeth is the most neglected major artifact in the Enochian system. It consists of 49 leaves (plus a title page), most containing grids of letters and numbers in patterns that may be linguistic, numerical, ceremonial, or purely decorative. Dee understood it as the "Book of Enoch" — the text the biblical patriarch received from the angels — dictated to him in reverse order, one leaf at a time, through Kelley's scrying.

The manuscript has never been decoded. It has never been fully published in a modern critical edition. Most Enochian practitioners have never seen it. Most Enochian scholarship mentions it briefly and moves on to the Calls and the Watchtowers.

The Viewer exists because the Archive does not skip what it cannot explain. Loagaeth is present in the historical record. It is central to Dee's understanding of what he was receiving. The Archive shows it.

---

## III. THE 49 LEAVES

### What Exists

Sloane MS 3189 contains 49 leaves (numbered by Dee), each with one or two sides of content (recto and verso). The structure varies leaf by leaf:

- **Leaves 1–2:** Large grids (approximately 49×49) of letters. These are the most studied leaves.
- **Leaves 3–48:** Variable structures. Some contain letter grids, some contain mixed letter/number grids, some contain what appear to be tables or charts. The internal logic, if any, is not understood.
- **Leaf 49:** A distinctive final leaf, sometimes described as a summary or key page. Its relationship to the preceding leaves is unclear.

### What Has Been Transcribed

Published transcription data exists for a subset of the leaves. The primary sources are:

- **Donald Laycock** (1978, 1994): Partial transcription and analysis of selected leaves. Laycock focused on the first two leaves and their potential linguistic properties.
- **Joseph Peterson** (digital editions): Transcriptions of some leaves, available via his website and publications.
- **Aaron Leitch** (2009): Discussion of the structure in *The Angelical Language, Volume I*, with some transcription data.

For leaves where no published transcription exists, the Viewer shows the leaf number, any available structural metadata (grid dimensions, general description from manuscript catalogues), and a note: "No published transcription available for this leaf."

---

## IV. INTERACTION MODEL

### A. Leaf Navigator

The reader arrives at the Viewer and sees:
- A brief introduction (3–4 sentences: what Loagaeth is, its place in the Enochian system, its unsolved status)
- A horizontal leaf navigator showing all 49 leaves as numbered cells
- Cells are color-coded by data availability: transcribed (gold), partially transcribed (gold-dim), not transcribed (ink/sealed)

Clicking a leaf number opens that leaf's detail view.

### B. Leaf Detail View

For a transcribed leaf:
- **Grid display:** The full grid as transcribed, rendered as a table of cells
- **Metadata strip:** Leaf number, side (recto/verso), grid dimensions, transcription source, uncertainty level
- **Pattern overlays** (toggleable):
  - *Letter frequency:* Color-codes cells by how often that letter appears on this leaf
  - *Positional symmetry:* Highlights cells that are symmetrically placed (rotational, reflective, diagonal) — based on published observations
  - *Repetition patterns:* Highlights sequences of letters that repeat elsewhere on the same leaf or across leaves
- **Scholarship notes:** What published scholars have said about this specific leaf, with citations and badges
- **Cross-references:** Links to lessons in the curriculum where this leaf is discussed

For an untranscribed leaf:
- Leaf number and any available metadata from manuscript catalogues
- A note explaining that no published transcription is available
- Links to the manuscript's digital access (if available)
- A note on what scholarship exists about this leaf, even if no transcription has been published

### C. Comparison Mode

When transcription data exists for a leaf from two different sources (e.g., Laycock's transcription vs. Peterson's), the Viewer offers side-by-side comparison using the same ComparisonState model as the Great Table Observatory. Differing cells are marked. Provenance notes explain the discrepancies.

### D. Cross-Leaf View

A view that shows all 49 leaves as thumbnails (grid structures rendered at small scale), allowing the reader to see structural patterns across the entire manuscript:
- Which leaves have similar grid dimensions
- Which leaves share letter frequency profiles
- Where structural breaks or transitions occur

This is a *structural overview*, not a content overview. It shows shape, not meaning.

---

## V. CONTENT CLAUDE DELIVERS

### A. Leaf-by-Leaf Structural Notes

For each of the 49 leaves, Claude delivers a structured JSON record conforming to the `LoagaethLeafStateData` schema:

- **For transcribed leaves (estimated 8–12):** Full cell data, structural notes, symmetry analysis, scholarship notes
- **For partially documented leaves (estimated 10–15):** Grid dimensions, structural description from catalogue entries and published discussions, scholarship notes
- **For undocumented leaves (remaining):** Leaf number, minimal description, "not yet transcribed" flag

### B. Scholarship Survey

A narrative document (1500–2500 words) summarizing the state of Loagaeth scholarship:
- Who has studied it, when, with what methods
- What has been claimed about its structure
- What remains genuinely unknown
- Fully badged

### C. Pattern Analysis Notes

For the transcribed leaves, Claude delivers notes on observed patterns:
- Symmetry observations (attributed to the scholars who identified them)
- Frequency anomalies
- Structural comparisons between leaves
- All marked with uncertainty levels and badges

### D. Narrative Introduction

The 3–4 sentence introduction for the Viewer's landing page. Fully badged.

---

## VI. WHAT CURSOR BUILDS

1. **Route:** `/observatory/loagaeth` (or within Compare mode structure)
2. **Leaf navigator** — horizontal 49-cell strip with color-coding
3. **Grid renderer** — renders a variable-dimension grid from `LoagaethLeafStateData`
4. **Pattern overlay engine** — frequency, symmetry, repetition overlays
5. **Cross-leaf thumbnail view** — 49 small-scale grid thumbnails
6. **Comparison mode** (reuse Great Table Observatory's diff engine and comparison pattern)

---

## VII. WHAT THE VIEWER DOES NOT DO

- It does not decode Loagaeth. No tool in the Archive claims to.
- It does not present any single interpretation of the manuscript's purpose as authoritative.
- It does not offer machine-learning pattern analysis. The overlays are based on published scholarly observations, not algorithmic discovery.
- It does not speculate on whether the manuscript is "real" (genuinely angelic), "constructed" (fabricated by Kelley), or "something else." The Viewer shows structure. The reader provides interpretation.
- It does not fill gaps. Leaves without transcription data show their absence honestly.

---

## VIII. VOICE AND COPY GUIDELINES

**The book's status:** "Liber Loagaeth has never been decoded" — not "has not yet been decoded" (which implies eventual resolution) and not "cannot be decoded" (which forecloses possibility). The neutral verb is "has not been."

**Pattern language:** "This symmetry has been observed by [scholar]" — not "This leaf exhibits symmetry" (which implies the symmetry is an objective feature rather than an observed pattern that may depend on the transcription's accuracy).

**Absence language:** "No published transcription is available for this leaf" — not "This leaf has not been transcribed" (the leaf may have been transcribed in unpublished work we don't have access to).

**The manuscript's purpose:** Always attributed. "Dee understood Loagaeth as the Book of Enoch, dictated by angels" — ◆ for Dee's claim, ○ for the identification as the Book of Enoch, ~ for any interpretation of what the grids "actually are."
