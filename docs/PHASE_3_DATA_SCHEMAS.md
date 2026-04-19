# Phase 3 — Data Schemas
## Witness, Manuscript, Comparison, Uncertainty, Transmission
### v1.0 — April 18, 2026

> *These schemas extend the existing DATA_MODEL.md with the structures required by Phase 3's tool layer. They do not replace the entity types already defined (Figure, Letter, Call, etc.) — they sit alongside them and cross-reference them.*

---

## I. DESIGN PRINCIPLES

1. **Every data point declares its confidence.** No field in any schema is allowed to present information without an accompanying uncertainty level.

2. **Every data point traces to a witness.** The witness is the irreducible unit of evidence in the Archive. A claim without a witness is an opinion.

3. **Modification is visible, not hidden.** When one transmission state differs from another, the schema records what changed, who changed it, and what evidence exists for the change.

4. **Incompleteness is data.** A null or absent field is meaningful information. The schemas distinguish between "not applicable," "not yet researched," and "unknown despite research."

5. **No schema implies a verdict.** The comparison structures show states side by side. The transmission structures show chains of transmission. Neither imposes a hierarchy of authority.

---

## II. UNCERTAINTY LEVEL

Used across all Phase 3 schemas. This is the Archive's confidence vocabulary.

```
UncertaintyLevel =
  | "certain"    — The evidence is unambiguous and uncontested.
                    Example: Sloane MS 3188 exists in the British Library.

  | "probable"   — The evidence strongly supports this, but minor ambiguity exists.
                    Example: Dee likely wrote this entry in 1583, based on
                    contextual dating.

  | "uncertain"  — Evidence exists but is genuinely ambiguous.
                    Example: This cell in the Great Table may be "a" or "o" —
                    the manuscript is damaged at this point.

  | "contested"  — Competent authorities actively disagree.
                    Example: Whether Kelley fabricated the sessions is a matter
                    of ongoing scholarly debate.

  | "unknown"    — No evidence has been found, despite research.
                    Example: We do not know what happened to the manuscripts
                    between 1609 and Ashmole's acquisition.
```

### Rules for assigning uncertainty:
- Default to "uncertain" when in doubt. Promotion to "probable" requires a documented justification.
- "Certain" is reserved for physical facts (manuscript exists, page count, repository location) and universally accepted dates.
- "Contested" requires naming at least two parties to the dispute and the grounds of disagreement.
- "Unknown" is never shameful. It is the Archive's most honest word.

---

## III. WITNESS

The witness is the foundational unit of Phase 3. It represents a specific documentary source — not a book in the abstract, but a specific location within a specific document where a specific claim can be verified or examined.

```
Witness {
  id: string
    — Unique identifier. Format: "w-{type-prefix}-{slug}"
    — Examples: "w-ms-sloane-3188-fol-57r", "w-ep-casaubon-1659-p142",
      "w-mc-peterson-2003-ch4", "w-ms-laycock-1978-entry-325"

  type: WitnessType
    — See §III-a below.

  label: string
    — Human-readable name. Should be recognizable to a scholar.
    — Example: "Sloane MS 3188, fol. 57r"

  shortRef: string
    — Abbreviated citation for inline use.
    — Example: "Sloane 3188, 57r"

  fullRef: string
    — Complete bibliographic citation following Chicago Manual of Style (Notes).
    — Example: "London, British Library, Sloane MS 3188, fol. 57r."

  dateRange: DateRange
    — See §III-b below.

  author: string | null
    — The person who produced this specific witness. Null for manuscripts where
      authorship is embedded in the manuscript record itself (i.e., Dee is the
      "author" of Sloane 3188, but the witness is the manuscript, not an authored work).

  editor: string | null
    — For printed editions and critical editions. The person who selected,
      arranged, or annotated the material.

  repository: string | null
    — Physical location. Example: "British Library"

  shelfmark: string | null
    — Catalogue reference. Example: "Sloane MS 3188"

  folio: string | null
    — Specific folio or page. Example: "fol. 57r", "p. 142"

  digitalAccess: string | null
    — URL if the witness is available online. Prefer stable institutional URLs.

  description: string
    — What this witness contains, in one to three sentences. Written by Claude.

  contents: string[]
    — List of what is documented in this witness.
    — Example: ["Action record for 21 November 1582", "Description of
      a figure appearing in the shewstone", "First mention of the name 'Uriel'"]

  epistemicBadge: EpistemicBadge
    — The badge type this witness can support. A primary manuscript can support ◆.
      A modern scholarly work can support ◇. A practitioner-tradition source can
      support ○ or △.
    — See §III-c below.

  uncertaintyLevel: UncertaintyLevel
    — Confidence in the witness itself (not in the claims it makes).
    — A damaged manuscript page is "uncertain." A well-preserved printed edition
      is "certain." A manuscript whose provenance chain has gaps is "probable."

  notes: string
    — Free-form notes. Condition of the manuscript, known errors in the edition,
      scholarly disputes about this specific witness.

  relatedWitnesses: string[]
    — IDs of witnesses that cover the same material from different states.
    — Example: Sloane 3188 fol. 57r and Casaubon 1659 p. 142 may cover
      the same action session.
}
```

### III-a. Witness Types

```
WitnessType =
  | "primary-manuscript"
      — A manuscript in the hand of Dee, Kelley, or a contemporary copyist.
      — Can support ◆ badge.
      — Examples: Sloane 3188, Sloane 3189, Sloane 3191, Cotton Appendix XLVI

  | "early-printed"
      — A printed edition published before 1800.
      — Can support ◆ when reproducing manuscript content faithfully,
        or △ when the editor added interpretive material.
      — Examples: Casaubon, A True & Faithful Relation (1659)

  | "modern-critical"
      — A modern scholarly edition that transcribes and annotates primary sources.
      — Can support ◆ when transcribing, ◇ when commenting.
      — Examples: Peterson's digital editions, James's Enochian Evocation

  | "modern-scholarly"
      — A modern academic work that analyzes the material.
      — Can support ◇ badge.
      — Examples: Harkness (1999), Woolley (2001), Szönyi (2004)

  | "practitioner-tradition"
      — A work produced within a practicing magical tradition.
      — Can support ○ or △ badge. Never ◆ or ◇ on its own.
      — Examples: Regardie's Golden Dawn, Crowley's Vision and the Voice
```

### III-b. Date Range

```
DateRange {
  earliest: number
    — Earliest possible year. Use negative numbers for BCE.

  latest: number
    — Latest possible year. If exact date is known, earliest === latest.

  precision: "exact" | "year" | "decade" | "century" | "unknown"
    — How precise the dating is.

  notes: string | null
    — Explanation of dating evidence if not "exact."
}
```

### III-c. Epistemic Badge Types (for schema reference)

```
EpistemicBadge =
  | "historical"    — ◆ — Primary source evidence
  | "consensus"     — ◇ — Strong scholarly consensus (2+ modern academic sources)
  | "occult"        — ○ — Traditional occult claim (named tradition/practitioner)
  | "later"         — △ — Later interpretation (named tradition that modified it)
  | "parallel"      — ◎ — Parallel (meets four qualification criteria)
  | "speculative"   — ~ — Speculative (explicitly framed as conjecture)
  | "disputed"      — ? — Disputed/contested (named parties and grounds)
  | "caution"       — ⚠ — Caution (explained risk or care needed)
```

---

## IV. MANUSCRIPT

A physical or notional manuscript object. Distinguished from Witness: a Manuscript is a *thing* (a bound volume, a collection of leaves). A Witness is a *specific evidentiary point* within that thing or derived from it.

```
Manuscript {
  id: string
    — Format: "ms-{slug}"
    — Example: "ms-sloane-3188"

  shelfmark: string
    — Example: "Sloane MS 3188"

  repository: string
    — Example: "British Library, London"

  title: string
    — The conventional title used by scholars.
    — Example: "Mysteriorum Libri Quinque"
      (noting that this title was applied later, not by Dee)

  alternateTitles: string[]
    — Other names by which the manuscript has been known.

  dateRange: DateRange
    — When the manuscript was produced.

  creator: string
    — Who wrote it. Usually "John Dee" for the Dee-Kelley manuscripts.

  folioCount: number | null
    — Null when unknown or when the manuscript is fragmentary.

  format: string
    — Physical description. Example: "Folio, paper, approx. 300 × 200mm"

  condition: string
    — Current condition. Example: "Good overall; some water damage to early
      folios; ink fading on fols. 23r–25v"

  description: string
    — What the manuscript contains, 2–5 sentences. Written by Claude.

  contents: string[]
    — Structured list of what the manuscript contains.
    — Example: ["Spirit action records, April–November 1583",
      "Tables of angelic names", "Dee's notes on equipment and preparation"]

  provenanceChain: ProvenanceLink[]
    — See §IV-a below.

  digitalAccess: string | null
    — URL if digitized.

  relatedManuscripts: string[]
    — IDs of manuscripts that contain related or overlapping material.

  derivedWitnesses: string[]
    — IDs of Witness records that cite this manuscript.

  uncertaintyLevel: UncertaintyLevel
    — Confidence in the manuscript's attribution and dating.

  notes: string
    — Free-form scholarly notes.
}
```

### IV-a. Provenance Link

```
ProvenanceLink {
  holder: string
    — Name of person or institution.

  dateRange: DateRange

  acquisitionMethod: string | null
    — How they came to hold it. Examples: "inherited," "purchased,"
      "deposited by," "unknown"

  notes: string | null

  uncertaintyLevel: UncertaintyLevel
}
```

---

## V. COMPARISON STATE

A specific state of a compared object. Used by the Great Table Comparison Observatory and the Liber Loagaeth Structural Viewer.

```
ComparisonState {
  id: string
    — Format: "cs-{object}-{state-slug}"
    — Example: "cs-great-table-sloane-3191-original"

  objectId: string
    — What is being compared. Examples: "great-table", "liber-loagaeth-leaf-1"

  label: string
    — Human-readable name for this state.
    — Example: "Sloane 3191 — Earliest Surviving Grid"

  description: string
    — 2–5 sentences explaining what this state is and where it comes from.

  witnessId: string
    — The Witness record that documents this state.

  dateRange: DateRange
    — When this state was produced.

  producer: string
    — Who produced this state. Examples: "John Dee", "S.L. MacGregor Mathers",
      "Israel Regardie (publishing Mathers)"

  tradition: string | null
    — The tradition this state belongs to, if applicable.
    — Examples: "Golden Dawn", "Thelema", null (for Dee's originals)

  stateData: ComparisonStateData
    — The actual data for this state. Structure depends on the object type.
    — See §V-a and §V-b below.

  provenance: string
    — How this state was produced. One paragraph.
    — Example: "This is the Great Table as it appears in Sloane MS 3191, the
      earliest surviving copy of the full grid. The table was dictated during
      the Cracow sessions and recorded by Dee in his own hand."

  modifications: Modification[]
    — See §V-c below. Empty array for the earliest known state.

  uncertaintyLevel: UncertaintyLevel
    — Confidence in this state's accuracy as a representation of what it
      claims to be.
}
```

### V-a. Great Table State Data

```
GreatTableStateData {
  type: "great-table"

  rows: number
    — Should be 27 for a standard Great Table.

  columns: number
    — Should be 25 for a standard Great Table.

  cells: GreatTableCell[][]
    — 2D array, [row][column]. Each cell contains:

  elementalQuarters: {
    label: string
    rowRange: [number, number]
    colRange: [number, number]
  }[]
    — How this state divides the table into elemental quarters.
    — Differs between Dee's original and the Golden Dawn arrangement.
}

GreatTableCell {
  letter: string
    — The letter in this cell. Single character.

  uncertaintyLevel: UncertaintyLevel
    — Confidence in this specific cell's reading.

  manuscriptNote: string | null
    — If the cell is damaged, corrected, or ambiguous in the source.

  derivedNames: string[]
    — Angel/entity names derived from this cell's position.
    — Example: ["Part of the name 'ORO' (East king)"]
}
```

### V-b. Loagaeth Leaf State Data

```
LoagaethLeafStateData {
  type: "loagaeth-leaf"

  leafNumber: number
    — 1–49.

  side: "recto" | "verso" | "both"

  gridRows: number | null
    — Null if the leaf structure has not been transcribed.

  gridColumns: number | null

  cells: LoagaethCell[][] | null
    — Null if the leaf has not been transcribed.
    — If transcribed, 2D array.

  structuralNotes: string
    — Claude-authored description of the leaf's visual structure.
    — Example: "Leaf 1 recto contains a 49×49 grid of letters. The border
      letters differ from the interior. Rotational symmetry has been observed
      by Laycock (1994) and Peterson."

  transcriptionSource: string | null
    — Who transcribed this leaf and where published.

  symmetryAnalysis: SymmetryNote[] | null
    — See §V-b-i below.
}

LoagaethCell {
  character: string
  row: number
  col: number
  uncertaintyLevel: UncertaintyLevel
  note: string | null
}

SymmetryNote {
  type: "rotational" | "reflective" | "diagonal" | "positional" | "other"
  description: string
  discoveredBy: string | null
  uncertaintyLevel: UncertaintyLevel
}
```

### V-c. Modification

Records a specific change between one comparison state and another.

```
Modification {
  id: string

  fromStateId: string
  toStateId: string

  location: string
    — Where in the object the change occurred.
    — For Great Table: "row 5, col 12" or "entire Eastern quarter"
    — For Loagaeth: "leaf 3, recto, row 7"

  changeType: "letter-changed" | "structure-changed" | "arrangement-changed"
    | "added" | "removed" | "reinterpreted"

  description: string
    — What changed, in one to three sentences.

  attributedTo: string
    — Who made this change.

  reason: string | null
    — Why they made it, if known.

  witnessId: string | null
    — The witness that documents this change.

  uncertaintyLevel: UncertaintyLevel
}
```

---

## VI. TRANSMISSION

Structures for the Transmission Observatory and Concept Lineage Tool.

### VI-a. Transmission Node

```
TransmissionNode {
  id: string
    — Format: "tn-{type-prefix}-{slug}"
    — Examples: "tn-person-dee", "tn-ms-sloane-3188",
      "tn-pub-casaubon-1659", "tn-inst-golden-dawn"

  type: "person" | "institution" | "manuscript" | "publication" | "tradition"

  label: string
    — Human-readable. Example: "John Dee (1527–1608)"

  shortLabel: string
    — For network visualization labels. Example: "Dee"

  dateRange: DateRange

  description: string
    — 1–3 sentences. Written by Claude.

  entityRef: string | null
    — Cross-reference to existing DATA_MODEL entity, if one exists.
    — Example: "figure-john-dee" (links to the Figure entity in DATA_MODEL.md)

  manuscriptRef: string | null
    — Cross-reference to Manuscript record, if this node represents a manuscript.

  outgoingEdges: string[]
    — Edge IDs where this node is the source.

  incomingEdges: string[]
    — Edge IDs where this node is the target.
}
```

### VI-b. Transmission Edge

```
TransmissionEdge {
  id: string
    — Format: "te-{source-slug}-{target-slug}-{type}"
    — Example: "te-dee-sloane3188-created"

  sourceNodeId: string
  targetNodeId: string

  edgeType: TransmissionEdgeType

  label: string
    — Human-readable description of the transmission act.
    — Example: "Dee recorded the action sessions in this manuscript"

  dateRange: DateRange

  description: string
    — 2–5 sentences explaining what happened in this transmission.

  witnessId: string | null
    — The witness that documents this transmission act, if one exists.

  modifications: string[]
    — What was changed during this transmission. Empty for faithful copies.
    — Example: ["Reordered the elemental quarters",
      "Added Hebrew letter correspondences"]

  uncertaintyLevel: UncertaintyLevel

  notes: string | null
}

TransmissionEdgeType =
  | "created"       — The source produced the target from scratch.
  | "copied"        — Faithful transcription or reproduction.
  | "edited"        — Transcribed with modifications.
  | "published"     — Made available to a wider audience.
  | "reorganized"   — Structural changes to arrangement or organization.
  | "interpreted"   — Added meaning, commentary, or symbolic associations
                       not present in the source.
  | "practiced"     — Used the material operationally in a magical context.
  | "collected"     — Acquired and preserved the material.
  | "digitized"     — Produced a digital reproduction.
  | "analyzed"      — Subjected to scholarly or critical analysis.
```

### VI-c. Concept Lineage

A curated subset of the transmission network, focused on a single concept's journey through history.

```
ConceptLineage {
  id: string
    — Format: "cl-{concept-slug}"
    — Example: "cl-great-table"

  label: string
    — Example: "The Great Table: From Dee's Reception to Modern Practice"

  concept: string
    — The concept being traced. Example: "The Great Table of Earth"

  description: string
    — 2–5 sentences introducing this lineage.

  nodes: TransmissionNode[]
    — The subset of nodes relevant to this concept's history.

  edges: TransmissionEdge[]
    — The subset of edges relevant to this concept's history.

  narrativeSummary: string
    — Claude-authored prose (500–1500 words) that walks the reader through
      the lineage in narrative form. Fully badged.

  keyDivergences: Divergence[]
    — See §VI-c-i below.

  openQuestions: string[]
    — Unresolved questions about this concept's transmission.
    — Badged ~ or ?.

  uncertaintyLevel: UncertaintyLevel
    — Overall confidence in the lineage as reconstructed.
}
```

### VI-c-i. Divergence

A point in the lineage where the concept's transmission split into distinct paths.

```
Divergence {
  id: string

  nodeId: string
    — The node where the divergence occurs.

  description: string
    — What happened. Example: "Mathers reorganized the elemental quarters,
      assigning Air to East (where Dee had a different arrangement). This
      became the standard Golden Dawn configuration."

  branches: {
    label: string
    tradition: string | null
    description: string
  }[]
    — The paths that emerge from this divergence.

  uncertaintyLevel: UncertaintyLevel
}
```

---

## VII. CITATION CHAIN

The structure that the Source Witness Explorer renders. A chain traces a single claim through its witnesses.

```
CitationChain {
  id: string
    — Format: "cc-{claim-slug}"

  claim: string
    — The claim being traced. One sentence.
    — Example: "The Great Table contains the names of the angels who govern
      the four elemental Watchtowers."

  epistemicBadge: EpistemicBadge
    — The badge assigned to this claim in the Archive's lessons.

  links: CitationLink[]
    — Ordered from earliest to most recent.

  currentAssessment: string
    — Claude-authored summary (1–3 sentences) of the claim's current
      scholarly standing. Fully badged.

  uncertaintyLevel: UncertaintyLevel
    — Confidence in the chain's completeness (not in the claim itself).
}

CitationLink {
  witnessId: string

  position: number
    — Order in the chain (1 = earliest).

  whatThisWitnessSays: string
    — Summary of how this witness presents the claim. 1–3 sentences.

  diffFromPrevious: string | null
    — How this witness differs from the previous link. Null for the first link.

  modificationType: "faithful" | "minor-edit" | "reinterpretation"
    | "structural-change" | "contradiction" | null

  notes: string | null
}
```

---

## VIII. SEARCH INDEX ENTRY

The structure that Full Archive Search indexes.

```
SearchIndexEntry {
  id: string
  contentType: "lesson" | "archive-entry" | "glossary" | "timeline-event"
    | "witness" | "manuscript" | "comparison-state" | "concept-lineage"

  title: string
  excerpt: string
    — 1–2 sentence preview of the content.

  epistemicBadges: EpistemicBadge[]
    — Badges present in this content.

  traditions: string[]
    — Traditions referenced. Example: ["dee-original", "golden-dawn", "scholarly"]

  rankRequired: string
    — Minimum rank to access full content. Example: "seeker"

  witnessCount: number
    — How many independent witnesses support claims in this content.

  url: string
    — Route within the app.
}
```

---

## IX. CROSS-REFERENCES TO EXISTING DATA MODEL

These Phase 3 schemas connect to the existing DATA_MODEL.md entity types as follows:

| Phase 3 Schema | Connects To | Via |
|----------------|-------------|-----|
| Witness | Figure | `author` field → Figure.id |
| Manuscript | Figure | `creator` field → Figure.id |
| TransmissionNode | Figure, Manuscript | `entityRef`, `manuscriptRef` fields |
| ComparisonState | Manuscript (via Witness) | `witnessId` → Witness.shelfmark |
| CitationChain | Lesson content | Claims traced from lesson badge markers |
| SearchIndexEntry | All content types | `contentType` + `id` fields |

No existing entity type is modified. Phase 3 extends the model; it does not break it.

---

## X. STORAGE NOTES

Phase 3 data can be stored as:
- **Static JSON files** in `/public/data/phase-3/` for the initial build
- **Supabase tables** when the Archive moves to a database-backed model

The schemas above are storage-agnostic. They define the *shape* of the data, not where it lives. Cursor's TypeScript types should match these schemas exactly. Claude's content deliverables (witness records, lineage maps, comparison states) will be authored as JSON files conforming to these schemas.
