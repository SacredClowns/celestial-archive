# Liber Loagaeth Structural Viewer — Narrative Content
## All UI Copy, Introductions, and State Messages

---

## I. INTRODUCTION TEXT

### Landing Page — Primary Introduction

Between March and July of 1583, John Dee recorded a manuscript he called Liber Loagaeth — "The Book of Speech from God." ◆ Dictated through Edward Kelley's scrying, the book consists of 49 leaves, most containing grids of 2,401 letters arranged in 49 rows and 49 columns. ◆ The spirits instructed that the book be dictated in reverse order: Leaf 49 first, Leaf 1 last. ◆

The manuscript has never been decoded. ◇ It has never been published in a complete modern critical edition. ◇ Most Enochian practitioners have never seen its contents. What you are looking at is the architecture of an unsolved book — its dimensions, its patterns, its silences. The Viewer does not claim to know what the book says. It shows you what the book looks like, so you can see for yourself what remains unknown.

### Landing Page — Subtitle

*Sloane MS 3189 — British Library, London*

### Landing Page — Structural Summary Line

49 leaves. 96 grid-pages. 2,401 cells per standard grid. One unsolved manuscript.

---

## II. LEAF NAVIGATOR

### Navigator Header

Select a leaf to examine its structure. Leaves are shown in manuscript order (1–49). Toggle to dictation order to see the sequence in which the spirits delivered them.

### Navigator Legend

- **Gold** — Transcription available (cell-level data from published sources)
- **Gold-dim** — Catalogued (grid dimensions confirmed; cell data not yet transcribed)
- **Ink** — Sealed (minimal structural data available)

### Navigator Toggle Labels

- **Manuscript Order** (1 → 49) — The order Dee bound them
- **Dictation Order** (49 → 1) — The order the spirits delivered them

---

## III. LEAF DETAIL VIEW

### Metadata Strip Labels

| Field | Label |
|-------|-------|
| Leaf number | Leaf |
| Side | Side (Recto / Verso) |
| Grid dimensions | Grid |
| Content type | Content |
| Transcription source | Source |
| Uncertainty level | Confidence |
| Dictation order | Dictated |

### Content Type Labels

| Type | Display Label | Description |
|------|---------------|-------------|
| letter-grid | Single-letter grid | Each cell contains one letter |
| word-grid | Word grid | Each cell contains an Enochian word |
| mixed | Mixed content | Some cells contain words, others single letters |
| text | Text (no grid) | Continuous text without grid structure |

### Grid Display — Column/Row Headers

Show row numbers (1–49) along the left margin and column numbers (1–49) along the top margin. Use `text-gold-dim/40 text-[9px]` consistent with the Great Table grid.

### Grid Display — Empty Cells

Cells with no data render as a subtle dot (·) in `text-gold-dim/20`. Cells marked as blank in the manuscript render as empty with no dot.

---

## IV. LEAF 1 — SPECIAL DISPLAY

### Leaf 1 Recto Notice

This leaf was recorded differently from all others. Each cell of the 49×49 grid was meant to contain a complete Enochian word, but the practical impossibility of writing words in tiny grid cells led Dee to record the content as 49 paragraphs of continuous text — one paragraph per row. ◆

What you see below is the text as Dee recorded it, organized by row number. The grid structure is implied, not drawn.

### Leaf 1 Verso Notice

The back of Leaf 1 transitions between two formats: the first 40 rows contain Enochian words per cell, while the last 9 rows contain single letters — matching the format used for all subsequent leaves. ◆

This leaf marks the boundary between the word-grid format used only here and the single-letter format used for the remaining 47 grid-leaves.

---

## V. LEAF 49 — SPECIAL DISPLAY

### Leaf 49 Notice

Leaf 49 contains no grid. It consists of five lines of Enochian text — the only leaf in the manuscript without a tabular structure. ◆

This was the first leaf dictated. ◆ Its distinctive format has led scholars to suggest it functions as an invocation, a key, or an index for the 48 grid-leaves that follow it — though no interpretation has achieved scholarly consensus. ◇

### Leaf 49 Display

Render the five text lines centered, in `font-display` (Cinzel), with generous vertical spacing. Each line on its own row. No grid structure. The visual treatment should feel like an inscription — spare, deliberate, set apart from the dense grid-leaves.

---

## VI. PATTERN OVERLAY DESCRIPTIONS

### Letter Frequency Overlay

**Toggle label:** Letter frequency

**Description panel (shown when toggled on):**
This overlay color-codes each cell by how often its letter appears on this leaf. Common letters appear cooler (closer to the base gold). Rare letters appear warmer (closer to amber). The distribution is calculated per-leaf — what is common on one leaf may be rare on another.

**What to look for:** Laycock (1978) observed that letter frequencies in Loagaeth do not match random distribution, suggesting linguistic or structural organization rather than arbitrary filling. ◇

### Positional Symmetry Overlay

**Toggle label:** Symmetry analysis

**Description panel:**
This overlay highlights cells whose positions correspond to symmetric counterparts — rotational (180°), reflective (horizontal or vertical axis), or diagonal mirror positions. Highlighted pairs share the same color.

**What to look for:** Burns and Moore observed partial rotational symmetry in selected leaves — rotating the grid 180° produces patterns that partially mirror the original orientation. ○ This does not occur uniformly across all leaves, and the degree of correspondence varies. Where symmetry has been specifically noted by a published scholar, the overlay is based on their observations. Where no published analysis exists, the overlay computes geometric symmetry without claiming significance.

### Repetition Pattern Overlay

**Toggle label:** Repeated sequences

**Description panel:**
This overlay highlights letter sequences (4+ characters) that appear more than once on the same leaf or across multiple leaves. Matching sequences share the same highlight color.

**What to look for:** Computerized analysis of the full manuscript text identified recurring combinations up to 17 characters long. ◇ The longest recurring sequence is "adnachephalzednoc." ◇ Most recurring combinations appear embedded in longer strings rather than as isolated words, suggesting either compound word structure or systematic encoding. ◇

---

## VII. CROSS-LEAF VIEW

### Header

All 49 leaves at a glance. Each thumbnail shows the grid structure at small scale — shape, not content. Leaves with transcription data render their letter patterns; catalogued leaves render as outlined grids; sealed leaves render as solid blocks.

### What This View Shows

This is a structural overview, not a content overview. It shows which leaves share dimensions, where structural breaks occur, and how Leaf 1 and Leaf 49 differ from the standard format. The two distinctive leaves — Leaf 1 (word-grid) and Leaf 49 (text-only) — are visually marked.

### Sort Options

- **Manuscript order** (1–49) — default
- **Dictation order** (49–1)
- **Grid density** (cells with content vs. empty cells)

---

## VIII. SCHOLARSHIP PANEL

### Header

What scholars have said about this leaf.

### Empty State

No published scholarship has been identified for this specific leaf. The grid structure is shown based on the manuscript's standard 49×49 format.

### Citation Format

Each scholarship note renders as:

> **[Scholar name]** ([year]) — [observation]
> Badge: [epistemic badge]

---

## IX. COMPARISON MODE

### Header

Compare two transcriptions of the same leaf side by side.

### When Available

Comparison mode appears only when two independent transcriptions exist for the same leaf (e.g., Peterson vs. Laycock for Leaves 1–2). Cells that differ between transcriptions are marked. The same diff-marking system used in the Great Table Observatory applies here.

### When Unavailable

Only one published transcription has been identified for this leaf. Comparison mode requires at least two independent sources.

---

## X. EMPTY AND EDGE STATES

### No Transcription Available

No published transcription is available for this leaf. The grid dimensions shown (49 rows × 49 columns) follow the manuscript's standard format. ◇ Cell-level data awaits transcription from manuscript images or published scholarship.

### Partial Transcription

This leaf has been partially transcribed. Cells with published data are shown; cells without data are marked with the sealed indicator (·).

### Manuscript Image Unavailable

No digitized image has been confirmed available for this leaf through the British Library's public access. The structural data shown is based on the manuscript's standard format and published catalogue descriptions.

### Grid Too Large for Mobile

This grid contains 2,401 cells. On narrow screens, use pinch-to-zoom or rotate to landscape for the full view. A simplified frequency-map view is available as an alternative.

---

## XI. SOURCE NOTE

### Footer Text

Structural data sourced from Joseph Peterson's transcription of Sloane MS 3189 (esotericarchives.com), Donald Laycock's *The Complete Enochian Dictionary* (1978/1994), Aaron Leitch's *The Angelical Language* Vol. 1 (2010), and the computerized analysis published by the Pyramid Vault project. Symmetry observations attributed to Teresa Burns and J. Alan Moore. All claims carry epistemic badges indicating their evidence basis.

---

## XII. VOICE COMPLIANCE

This content follows the Liber Loagaeth Viewer Spec §VIII voice guidelines:

- **Status language:** "has never been decoded" — not "has not yet been decoded" or "cannot be decoded"
- **Pattern language:** "This symmetry has been observed by [scholar]" — not "This leaf exhibits symmetry"
- **Absence language:** "No published transcription is available" — not "has not been transcribed"
- **Purpose language:** Always attributed — "Dee understood Loagaeth as the Book of Enoch" (◆), not presented as fact about the manuscript's actual nature
