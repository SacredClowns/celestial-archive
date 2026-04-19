# Source Witness Explorer
## Tool Specification — Phase 3
### v1.0 — April 18, 2026

> *Every claim in the Archive has a chain. The Explorer makes the chain visible.*

---

## I. WHAT THIS TOOL IS

The Source Witness Explorer lets the reader follow any badged claim in the Archive backward through its citation chain — from the lesson text to the scholarly source to the printed edition to the original manuscript (where such a chain exists).

It is the Archive's provenance tool. It answers the question: *How do we know this?*

---

## II. WHY THIS TOOL EXISTS

The Enochian system's most persistent problem is not obscurity but *mediation*. Most readers encounter the material through Regardie (1937), who published the Golden Dawn's version (c. 1888), which was based on Mathers' reading of Dee's manuscripts (1580s), which were copied and edited by Ashmole, catalogued by the British Museum, partially published by Casaubon (1659), and reinterpreted by every tradition that touched them.

At each link in that chain, something changed. Sometimes deliberately. Sometimes through error. Sometimes through editorial judgment that was never documented.

The Source Witness Explorer makes the chain visible. The reader sees who said what, when, and — where the evidence permits — what changed at each handoff.

---

## III. ENTRY POINTS

The Explorer is not a standalone page the reader navigates to. It is a *contextual tool* accessible from any badged claim in the Archive.

### Entry Point A: Badge Click

Every epistemic badge in the lesson text is a link. Clicking a badge opens the Explorer panel for that claim's citation chain.

### Entry Point B: Source Strip

Every lesson's source strip (the "Sources and epistemic footing" section at the bottom of Student-rank lessons) contains links that open the Explorer for the relevant claim.

### Entry Point C: Direct URL

Each citation chain has a stable URL (e.g., `/witness/cc-great-table-contains-angel-names`) so readers can bookmark and share specific chains.

### Entry Point D: Glossary Cross-Reference

Glossary entries that make factual claims include Explorer links for those claims.

---

## IV. INTERACTION MODEL

### A. The Chain View

When the Explorer opens, it displays:

**Header:**
- The claim text (one sentence, as it appears in the lesson)
- The claim's epistemic badge
- A one-sentence summary of the claim's current scholarly standing

**Chain spine:**
A vertical timeline, reading top to bottom, earliest to most recent. Each node on the spine represents a witness.

**Witness nodes:**
Each node shows:
- Witness type icon (manuscript scroll, printed book, academic paper, tradition sigil)
- Witness label (e.g., "Sloane MS 3188, fol. 57r")
- Date range
- 1–3 sentence summary of what this witness says about the claim
- Uncertainty level indicator
- If this witness differs from the previous: a modification marker with a brief description of what changed

**Modification markers:**
Displayed between two witness nodes where the claim was altered:
- A colored accent mark (gold-dim for minor edits, amber for reinterpretations, ember for structural changes)
- A label: "Minor edit," "Reinterpretation," "Structural change," or "Contradiction"
- A 1–2 sentence description of the modification

### B. Witness Detail

Clicking a witness node expands it to show:
- Full bibliographic citation
- What this witness says about the claim (fuller text, 1–5 sentences)
- The witness's epistemic badge capability (what badge type this witness can support)
- Digital access link (if the witness is available online)
- Related witnesses (other witnesses that cover the same material)
- Notes on the witness's reliability and condition

### C. Comparison View

The reader can select any two witnesses in the chain and see them side by side:
- Left column: Witness A's statement
- Right column: Witness B's statement
- Between them: a difference summary highlighting what changed

### D. Chain Completeness Indicator

At the bottom of the chain, a note on completeness:
- "This chain traces X witnesses across Y centuries" (when the chain is well-documented)
- "Gaps in this chain: [description]" (when intermediate witnesses are unknown)
- "This chain is incomplete — the claim's earliest manuscript source has not been identified" (when provenance is uncertain)

The chain never claims to be complete when it is not.

---

## V. DATA MODEL

The Source Witness Explorer renders `CitationChain` objects (see PHASE_3_DATA_SCHEMAS.md §VII). Each chain consists of ordered `CitationLink` entries, each referencing a `Witness` record.

### Relationship to other schemas:

```
Lesson text (badged claim)
  → CitationChain.claim
    → CitationLink[]
      → Witness (via witnessId)
        → Manuscript (via shelfmark, for primary manuscript witnesses)
```

---

## VI. CONTENT CLAUDE DELIVERS

### A. Citation Chains for Existing Lessons

Claude delivers citation chains for claims in the published Seeker and Student lessons. Priority claims:

**From Stage 1 (Seeker):**
1. "Dee kept detailed records of the angelic sessions in a series of manuscripts" (Lesson 1.1)
2. "Kelley was the sole scryer — Dee never saw anything in the stone himself" (Lesson 1.2)
3. "The Enochian language was dictated backward, letter by letter" (Lesson 1.4)
4. "The partnership ended after the cross-matching incident of 1587" (Lesson 1.5)

**From Stage 2 (Student):**
5. "The Heptarchia Mystica describes seven planetary kings and their princes" (Lesson 2.1)
6. "The Great Table was received during the Cracow sessions" (lesson reference)
7. "Liber Loagaeth was never decoded by Dee or any subsequent scholar" (Lesson 2.2)

**Future:** As new lessons are published, Claude delivers citation chains for their key claims within the Source Pack.

### B. Witness Records

Claude delivers the individual Witness records referenced by the citation chains. See Task #60 (10–20 example witness records) for the initial set.

### C. Narrative Introductions

Brief contextual text for the Explorer's help/about section, explaining:
- What a citation chain is
- What a witness is
- How to read modification markers
- What the uncertainty levels mean

---

## VII. WHAT CURSOR BUILDS

1. **Explorer panel component** — slide-in panel (reuse the existing glossary panel pattern from `student-lesson-renderer.tsx`)
2. **Chain timeline renderer** — vertical spine with witness nodes
3. **Witness detail expander** — click-to-expand within the chain
4. **Comparison overlay** — two-witness side-by-side view
5. **Badge-to-chain linking** — wiring badge clicks in lesson text to open the Explorer with the correct chain
6. **Chain route** — `/witness/[chain-id]` for direct access

---

## VIII. WHAT THE EXPLORER DOES NOT DO

- It does not rank witnesses by authority. Chronological order is the organizing principle, not a hierarchy of trustworthiness.
- It does not resolve disputes. When two witnesses contradict each other, the Explorer shows both. It does not pick a winner.
- It does not display full manuscript page images (that would require image licensing and digitization agreements). It links to external digital access where available.
- It does not provide AI-generated summaries of what the witnesses "really mean." The summaries are authored by Claude and reviewed by the human founder.

---

## IX. VOICE AND COPY GUIDELINES

**Chain language:** "This claim traces through X witnesses" — not "This claim is supported by X witnesses" (which implies all witnesses agree; they may not).

**Modification language:** "At this point in the chain, [person/tradition] modified the claim" — not "At this point, the claim was corrupted/improved." Modification is a neutral word. The reader decides whether the modification was helpful, harmful, or neither.

**Uncertainty language:** "The connection between Witness A and Witness B is uncertain — no intermediate witnesses have been identified for this period" — not "There is a gap in the evidence." The word "gap" implies something is missing; "uncertain" correctly describes the state of knowledge.

**Completeness language:** Never state that a chain is "complete." Use "This chain traces all witnesses currently known to scholarship." New witnesses may be discovered.
