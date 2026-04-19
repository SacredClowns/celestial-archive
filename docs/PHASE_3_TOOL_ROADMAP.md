# ENOCHIAN: THE CELESTIAL ARCHIVE
## Phase 3 — The Tool Layer
### v1.0 — April 18, 2026

> *The course layer teaches. The tool layer lets the reader do what the course described. Phase 3 transforms the Archive from a lesson sequence into a living archival instrument.*

---

## I. THE SHIFT

Phase 1 delivered Seeker (Stage 1): five lessons that teach the story of Dee and Kelley, introduce the epistemic badge system, and establish the three discernment practices. Phase 2 delivered Student (Stage 2): six lessons that begin structural encounter with the Heptarchia Mystica, the Great Table's first appearance, and the comparative tradition layer.

Both phases are *learning paths* — guided, sequential, authored. The reader follows a designed route through curated material.

Phase 3 is different. Phase 3 builds the surfaces where the reader works with the material directly.

The distinction matters:

| Layer | Metaphor | Activity | Claude's role |
|-------|----------|----------|---------------|
| Learn | A guided walk through the library | Read, reflect, badge-check | Author of the walk |
| Compare | A reading table with manuscripts open side by side | Juxtapose, notice, question | Provider of the manuscripts and their frames |
| Trace | A card catalogue with threads between entries | Follow a claim from source to reception to interpretation | Archivist of the threads |
| Search | A librarian's desk | Ask a question, receive badged results | Builder of the index |
| Reflect | A private study | Write, annotate, revisit | Designer of the room, not present in it |

The five modes are not features. They are postures the reader can adopt in the Archive. Each mode has its own tools, but all five share the same epistemic system, the same badge discipline, and the same refusal to collapse ambiguity.

---

## II. THE FIVE MODES

### Mode 1: Learn (Complete — Stages 1–2)

The sequential curriculum. Seeker and Student are built, authored, and rendering. Future stages (Observer through Archivist) extend this mode.

**Status:** Shipping. No Phase 3 work required except continued stage authoring.

---

### Mode 2: Compare

**What it is:** Surfaces that place two or more states of the same object side by side so the reader can see what changed, what was added, and what was lost — without the interface telling them what to conclude.

**Why it matters:** The Enochian system exists in multiple transmission states. Dee's original manuscripts, Casaubon's 1659 printed edition, the Golden Dawn's reorganized tablets, Crowley's experiential record, and modern scholarly reconstructions all present different versions of the same objects. The Archive does not pick a winner. It shows the states.

**Tools in this mode:**

#### 2a. The Great Table Comparison Observatory

The Great Table is the signature cartographic object of the Enochian system — a 25×27 grid of letters that encodes the names of angels, governors, and elemental hierarchies. But the Table has never been stable. Dee's original in Sloane 3191 differs from Dee's "reformed" version (post-1587), which differs from the Golden Dawn's rearrangement, which differs from Regardie's published version.

The Observatory presents these states as parallel surfaces, not as a timeline of corrections. No state is marked "right" or "wrong."

**Comparison states (initial):**
1. Sloane 3191 — the earliest surviving grid
2. Dee's Reformed Table — the post-Raphael revision
3. Golden Dawn arrangement — Mathers' reassignment of elemental quarters
4. Regardie's published version — the form most modern practitioners use

**Interaction model:**
- The reader selects two states for side-by-side view
- Cells that differ between selected states are visually marked (not highlighted as "errors" — marked as *differences*)
- Clicking a differing cell opens a provenance note: what each state says, what the earliest manuscript evidence is, and who made the change
- An "uncertainty surface" shows cells where the manuscript evidence is ambiguous, damaged, or contested
- Every cell carries its epistemic badge

**What Claude delivers:** Specification document, cell-level data for all four states (as far as scholarship permits), uncertainty annotations, provenance notes for significant divergences.

**What Cursor builds:** The interactive grid component, diff engine, cell detail overlay.

---

#### 2b. The Liber Loagaeth Structural Viewer

Liber Loagaeth (Sloane MS 3189) is a 49-leaf manuscript that Dee identified as the "Book of Speech from God." It has never been fully deciphered. Most of its leaves contain grids of letters and numbers in patterns that may be linguistic, numerical, or purely symbolic. No scholarly consensus exists on what the book *is*.

The Viewer does not attempt to decode Loagaeth. It presents its structure so the reader can see the patterns for themselves.

**What the Viewer shows:**
- A leaf-by-leaf navigator (49 leaves, recto and verso where applicable)
- Grid structure for each leaf (dimensions vary; the Viewer shows the actual grid as transcribed)
- Color-coding by letter frequency, repetition patterns, or positional symmetry (reader-selectable)
- Links to scholarship: which leaves have been studied, by whom, with what conclusions
- Cross-references to the lesson curriculum where Loagaeth is discussed

**Comparison surfaces:**
- Dee's original (Sloane 3189) vs. later transcription attempts
- Individual leaf symmetry analysis (rotational, reflective, diagonal)

**What Claude delivers:** Specification document, leaf-by-leaf structural notes (for the subset of leaves where transcriptions exist in published scholarship), uncertainty annotations.

**What Cursor builds:** Leaf navigator, grid renderer, pattern-analysis overlays.

---

### Mode 3: Trace

**What it is:** Surfaces that follow a single concept, claim, or object through its full transmission history — from manuscript origin through printed publication through tradition-specific interpretation to modern scholarly assessment.

**Why it matters:** The most common source of confusion in Enochian studies is not that the material is obscure. It is that later traditions modified the material and presented their modifications as original. The Archive's trace tools make the transmission chain visible.

**Tools in this mode:**

#### 3a. Source Witness Explorer

Every factual claim in the Archive can be traced to one or more *witnesses* — a specific page in a specific manuscript, a specific paragraph in a specific edition, a specific passage in a specific scholarly work. The Source Witness Explorer lets the reader follow that chain.

**Data model:**
- **Witness**: A specific documentary source (e.g., Sloane MS 3188, fol. 57r)
- **Witness Type**: Primary manuscript / Early printed edition / Modern critical edition / Modern scholarly commentary / Practitioner-tradition source
- **Claim**: A specific assertion made in a lesson or Archive page
- **Citation Chain**: The ordered sequence of witnesses through which a claim has been transmitted
- **Uncertainty Level**: Certain / Probable / Uncertain / Contested / Unknown
- **Modification Log**: Where in the chain the claim was altered, by whom, and how

**Interaction model:**
- From any badged claim in the Archive, the reader can open the Source Witness Explorer
- The Explorer shows the claim's citation chain as a vertical timeline
- Each witness in the chain shows: who, when, what they said, how it differs from the previous witness
- Modification points are visually marked
- The reader can compare any two witnesses in the chain side by side

**What Claude delivers:** Data model specification, 10–20 example witness records covering claims from Lessons 1.1–2.2, the witness taxonomy.

**What Cursor builds:** The explorer component, the citation-chain timeline, the comparison overlay.

---

#### 3b. Transmission Observatory

A high-level map of how the Enochian system moved through history. Not a timeline (the Timeline pillar handles chronology). The Transmission Observatory is a *network* — nodes are people, institutions, manuscripts, and publications; edges are acts of transmission (copying, editing, publishing, teaching, modifying).

**Nodes (initial set):**
- John Dee
- Edward Kelley
- The Sloane manuscripts (3188, 3189, 3191, etc.)
- The Cotton Appendix XLVI manuscripts
- Elias Ashmole (collector)
- Méric Casaubon (*A True & Faithful Relation*, 1659)
- Samuel Liddell MacGregor Mathers
- The Hermetic Order of the Golden Dawn
- Aleister Crowley (*The Vision and the Voice*, 1911/1952)
- Israel Regardie (*The Golden Dawn*, 1937–40)
- Geoffrey James (*The Enochian Evocation of Dr John Dee*, 1984)
- Donald Laycock (*The Complete Enochian Dictionary*, 1978/1994)
- Joseph Peterson (digital manuscript editions, 1990s–present)

**Edge types:**
- Copied (faithful transcription)
- Edited (modified during transcription)
- Published (made public)
- Reorganized (structural changes to arrangement)
- Interpreted (added meaning not in original)
- Practiced (used operationally)

**What Claude delivers:** The node/edge data for the initial transmission network, provenance notes for each edge, uncertainty annotations.

**What Cursor builds:** The network visualization component (force-directed or hierarchical layout), node/edge detail overlays.

---

#### 3c. Concept Lineage Tool

A simpler, focused version of the Transmission Observatory. Instead of mapping the entire system's transmission, the Concept Lineage Tool follows a single concept through its history.

**Initial concept lineages to build:**
1. **The Great Table** — from Dee's reception → manuscript recording → Casaubon → Golden Dawn reorganization → Regardie → modern practitioners → scholarly reconstruction
2. **Liber Loagaeth** — from Dee's reception → Sloane MS 3189 → near-total neglect → Laycock → modern scholarship
3. **The Angelic Language** — from the sessions → Dee's phonetic notes → Casaubon → Laycock's linguistic analysis → comparative linguistic studies

**What Claude delivers:** The lineage maps (narrative + structured data) for all three initial concepts, with badges and uncertainty annotations at every node.

**What Cursor builds:** The lineage viewer component (vertical timeline with branching where traditions diverge).

---

### Mode 4: Search

**What it is:** A unified search layer across all Archive content — lessons, archive entries, glossary, timeline events, source citations — with results that carry their epistemic badges.

**Tools in this mode:**

#### 4a. Full Archive Search

Not a generic text search. A search engine that understands the Archive's epistemic system.

**Search features:**
- Full-text search across all published content
- Results carry their epistemic badges (the reader sees at a glance whether a result is ◆ historical evidence or ○ traditional occult claim)
- Filter by badge type, rank level, content pillar, tradition
- Results show the claim's source witness count (how many independent witnesses support it)
- "Related concepts" sidebar on search results

**What Claude delivers:** The search taxonomy and badge-display specification.

**What Cursor builds:** Search indexing, query engine, results UI.

---

#### 4b. Concordance

A specialized search tool for the Enochian language. Given an Enochian word, the Concordance shows every occurrence of that word across the Calls, the manuscripts, and the scholarly literature, with context and translation variants.

**What Claude delivers:** Vocabulary specification and translation-variant data (building on the existing glossary and Laycock's dictionary as the scholarly baseline).

**What Cursor builds:** Concordance search component, context-display UI.

---

### Mode 5: Reflect

**What it is:** Private workspace tools that let the reader develop their own relationship with the material. The Archive provides the room. It does not enter it.

**Tools in this mode:**

#### 5a. Study Notebook

A journaling and annotation tool integrated with the Archive. The reader can:
- Write free-form entries
- Annotate any lesson, Archive page, or search result
- Tag entries with concepts, lessons, or badges
- Review their own annotation history chronologically or by concept

**Design principle:** The notebook is private. The Archive never reads the reader's notebook to "personalize" their experience. No AI summarization. No "insights." The reader's own thinking is sovereign.

---

#### 5b. Personal Archive Trail

A visual map of the reader's journey through the Archive — which lessons they've completed, which tools they've used, which concepts they've explored. Not a gamification surface. A *memory* surface.

**Design principle:** The trail shows where the reader has been, not where the Archive thinks they should go next. No recommendation engine. No "you might also like." The reader navigates by their own curiosity.

---

## III. DATA CONTRACTS — PHASE 3 BACKBONE

All five modes share a common set of data structures. These are the backbone contracts that content (Claude), architecture (GPT), and implementation (Cursor) must agree on before building begins.

### Core Data Types

> *The schemas below are summaries. The authoritative field-level specification is `PHASE_3_DATA_SCHEMAS.md`. Where this roadmap's shorthand diverges from the schemas doc, the schemas doc wins.*

```
Witness
├── id: string (unique)
├── type: "primary-manuscript" | "early-printed" | "modern-critical" | "modern-scholarly" | "practitioner-tradition"
├── label: string (human-readable name)
├── shortRef: string (abbreviated citation, e.g., "Sloane 3188, fol. 57r")
├── fullRef: string (complete bibliographic citation)
├── dateRange: { earliest: number; latest: number } (year range)
├── author: string | null
├── repository: string | null (e.g., "British Library")
├── shelfmark: string | null
├── digitalAccess: string | null (URL if digitized)
├── notes: string
└── uncertaintyLevel: UncertaintyLevel

Manuscript
├── id: string
├── shelfmark: string
├── repository: string
├── title: string
├── dateRange: { earliest: number; latest: number }
├── folioCount: number | null
├── description: string
├── contents: string[] (list of what the manuscript contains)
├── relatedManuscripts: string[] (ids)
├── digitalAccess: string | null
└── witnesses: string[] (witness ids derived from this manuscript)

ComparisonState
├── id: string
├── objectId: string (what is being compared — e.g., "great-table")
├── label: string (e.g., "Sloane 3191 Original")
├── witnessId: string (the source witness for this state)
├── stateData: unknown (structure depends on the object — grid for Great Table, leaf set for Loagaeth)
├── dateRange: { earliest: number; latest: number }
├── provenance: string (who produced this state and how)
└── uncertaintyLevel: UncertaintyLevel

UncertaintyLevel = "certain" | "probable" | "uncertain" | "contested" | "unknown"

TransmissionEdge
├── id: string
├── sourceNodeId: string
├── targetNodeId: string
├── edgeType: "copied" | "edited" | "published" | "reorganized" | "interpreted" | "practiced"
├── dateRange: { earliest: number; latest: number }
├── description: string
├── witnessId: string | null (the witness that documents this transmission)
└── uncertaintyLevel: UncertaintyLevel

TransmissionNode
├── id: string
├── type: "person" | "institution" | "manuscript" | "publication" | "tradition"
├── label: string
├── dateRange: { earliest: number; latest: number }
├── description: string
├── outgoingEdges: string[] (edge ids)
└── incomingEdges: string[] (edge ids)

ConceptLineage
├── conceptId: string
├── label: string
├── description: string
├── nodes: TransmissionNode[]
├── edges: TransmissionEdge[]
└── narrativeSummary: string (Claude-authored prose summary of the lineage)
```

### Shared Contracts

All data rendered in Phase 3 tools carries:
1. **Epistemic badges** — every factual claim is badged
2. **Uncertainty levels** — every data point declares its confidence
3. **Witness references** — every data point can trace to its source
4. **Modification visibility** — where something was changed, the change is visible

These contracts are not optional. A tool that displays unbadged data violates the Archive's constitution.

---

## IV. WHAT CLAUDE DELIVERS FOR PHASE 3

Claude's deliverables are content, specification, and data — not code.

| # | Deliverable | Type | Status |
|---|-------------|------|--------|
| 1 | This document (PHASE_3_TOOL_ROADMAP.md) | Governing document | **Complete** |
| 2 | "Why The Celestial Archive Refuses To Solve The Archive" | Philosophy document | Pending |
| 3 | Core data schemas (witness, manuscript, comparison, uncertainty, transmission) | Data specification | Pending |
| 4 | Great Table Comparison Observatory specification | Tool specification | Pending |
| 5 | Liber Loagaeth Structural Viewer specification | Tool specification | Pending |
| 6 | Source Witness Explorer data model and specification | Tool specification | Pending |
| 7 | 10–20 example witness records | Content data | Pending |
| 8 | Concept lineage maps: Great Table, Liber Loagaeth, Angelic Language | Content data | Pending |
| 9 | Cross-verification pass | Quality assurance | Pending |

### Delivery order:
1. Philosophy document (governs all design decisions)
2. Data schemas (backbone contracts that specs depend on)
3. Tool specifications (Great Table, Loagaeth, Witness Explorer)
4. Example records and lineage maps (concrete data that validates the schemas)
5. Cross-verification (internal consistency check)

---

## V. WHAT CURSOR BUILDS FOR PHASE 3

Cursor's deliverables are route shells, data contracts, and shared components.

| # | Deliverable | Type |
|---|-------------|------|
| 1 | Route stubs for Compare, Trace, Search, Reflect modes | Next.js routes |
| 2 | TypeScript types for all data contracts in §III | Type definitions |
| 3 | Shared grid component (used by Great Table Observatory and Loagaeth Viewer) | React component |
| 4 | Citation-chain timeline component | React component |
| 5 | Network visualization component (Transmission Observatory) | React component |
| 6 | Search indexing and query infrastructure | Backend |
| 7 | Notebook data model and CRUD | Backend |

---

## VI. WHAT THE ARCHIVE DOES NOT BUILD IN PHASE 3

- **AI-powered features.** No chatbot. No "ask the Archive." No AI summarization of the reader's notes. The Archive is an instrument, not an oracle.
- **Social features.** No comments, no sharing, no user profiles visible to other users. The Archive is a private study, not a forum.
- **Recommendation engine.** No "you might also like." The reader navigates by curiosity, not by algorithm.
- **Gamification.** No achievements, no streaks, no XP for using tools. The tools exist because the material demands them.
- **3D visualization.** The Great Table Observatory and Transmission Observatory use 2D layouts. 3D enhancement is a future phase, gated behind user research.

---

## VII. SUCCESS CRITERIA

Phase 3 is complete when a reader can:

1. Open the Great Table Comparison Observatory and see two transmission states side by side, with every differing cell annotated
2. Open the Liber Loagaeth Viewer and navigate leaf by leaf, with structural patterns visible
3. Click any badged claim in a lesson and follow its citation chain through the Source Witness Explorer
4. Search the Archive and receive results that carry their epistemic badges
5. Open the Study Notebook and write an annotation linked to a specific lesson passage
6. View the Transmission Observatory and trace how Dee's manuscript became Casaubon's printed edition became the Golden Dawn's reorganized system

None of these tools tell the reader what to think. All of them show the reader what to see.

---

## VIII. THE GOVERNING SENTENCE

The same sentence that governs the entire Archive governs Phase 3:

> *The Archive is an instrument for learning how to remain with mystery without collapsing into it.*

The tool layer is the instrument. The course layer teaches the reader how to hold it. Phase 3 puts it in their hands.
