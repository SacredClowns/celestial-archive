# GPT ARCHITECT BRIEF
## The Constitution of Enochian: The Celestial Archive
### v1.0 — April 18, 2026

> *This document is the single source of truth for any AI agent working on the Celestial Archive. If your instructions conflict with this document, this document wins. If this document is silent, escalate to the human founder (Sacred Clowns) before building.*

---

## PREAMBLE: WHAT YOU ARE BUILDING

You are building an immersive educational app called **Enochian: The Celestial Archive**. It covers the Enochian magickal system — the body of material produced through the partnership of the Elizabethan polymath John Dee and the scryer Edward Kelley between 1581 and 1587, as well as its reception, transformation, and practice across subsequent centuries (the Golden Dawn, Aleister Crowley, modern hermetic orders, and contemporary scholarship).

The Archive is not an occult instruction manual. It is not a debunking exercise. It is not a New Age product. It is not a wiki.

**The Archive is an instrument for learning how to remain with mystery without collapsing into it.**

That sentence is the product's soul. Every feature, every page, every interaction, every visual choice, and every line of code serves that sentence or should not exist.

---

## I. SYSTEM ARCHITECTURE — THE TEN PILLARS

The Archive is organized into ten content pillars. Each pillar is a distinct section of the app with its own purpose, content type, and interaction model. They are not siloed — content cross-references across pillars — but each pillar owns its domain.

| # | Pillar | Purpose | Content Type | Key Feature |
|---|--------|---------|-------------|-------------|
| 1 | **The Archive** | The reference library | Entity profiles, sessions, manuscripts, bibliography | Source-badged reference pages |
| 2 | **The Timeline** | Historical narrative | Events, eras, connections | Interactive chronological navigation |
| 3 | **The Celestial Map** | Spatial/structural navigation | Watchtowers, Great Table, Tablet of Union, hierarchies | Interactive 2D grids (3D enhancement deferred) |
| 4 | **The Language Chamber** | The Enochian language | Alphabet, vocabulary, pronunciation, grammar | Letter explorer, pronunciation guide |
| 5 | **The Initiation Path** | The curriculum | Lessons, quizzes, reflections, progression | 7-rank learning journey |
| 6 | **The Aethyr Journey** | The 30 Aethyrs | Guided explorations of each Aethyr | Visionary material with full discernment framing |
| 7 | **The Intelligence Observatory** | The nature-of-intelligence question | Comparative frameworks for what "angels" and "spirits" might be | 8 intelligence types, no resolution forced |
| 8 | **Documentary Mode** | Cinematic narrative experience | Voiceover-ready narrative sequences | Audio-visual storytelling layer |
| 9 | **The Research Lens** | Scholarly apparatus | Academic sources, open questions, methodology | For the scholarly reader |
| 10 | **The Labyrinth** | Hidden/discoverable content | Unlockable material, symbolic puzzles, Easter eggs | Gamified exploration layer |

### Rules for Pillars:
- Every pillar must function independently (a user who only uses the Timeline still gets value)
- Every pillar must cross-link to relevant content in other pillars
- No pillar may contradict another pillar's factual claims
- The Discernment System (see §IV) operates across all pillars uniformly

---

## II. THE PROGRESSION SYSTEM — SEVEN RANKS

### The Ranks

| Rank | Name | Stage | Core Activity |
|------|------|-------|--------------|
| 1 | **Seeker** | Stage 1 | Narrative encounter — learn the story, the people, the basic shape of the system, and three discernment practices |
| 2 | **Student** | Stage 2 | Structural encounter — the Heptarchia Mystica, first formal hierarchies, operational material (bracketed), comparative traditions thicken |
| 3 | **Observer** | Stage 3 | Cartographic encounter — the Watchtowers, the Great Table, spatial/structural mapping of the system |
| 4 | **Interpreter** | Stage 4 | Hermeneutic encounter — the Aethyrs, the Calls, interpretive frameworks, deep comparative material |
| 5 | **Cartographer** | Stage 5 | Synthetic encounter — mapping connections across the system, cross-tradition synthesis |
| 6 | **Adept** | Stage 6 | Contemplative encounter — the operational and experiential dimension, held with full discernment |
| 7 | **Archivist** | Stage 7 | Stewardship — the seeker becomes a custodian of the material, capable of teaching and transmitting |

### Rules for Ranks:
- **No rank is a reward.** Ranks describe readiness, not achievement.
- **Every rank must be completable and honorable on its own.** A Seeker who stops at Seeker has received something whole.
- **No gamified language.** No "Congratulations! You leveled up!" No XP bars. No leaderboards. Progression is qualitative, not quantitative.
- **The final rank is Archivist, not Magus.** The highest posture is stewardship, not mastery. This is a deliberate anti-inflation choice.
- **Content gating is soft, not hard.** A Student-rank reader can see that Observer content exists and what it covers. They cannot access its full content until they've completed the prerequisite lessons. The gate is a threshold, not a wall.

### Stage 1 — Seeker: What Has Been Built

The complete Seeker stage (5 lessons + 4 source packs + 4 content packets) has been drafted and represents the Archive's voice, philosophy, and epistemic system at full resolution. These files are the canonical reference for the Archive's tone, structure, and approach:

**Lessons:**
- `STAGE_1_SEEKER_LESSON_1.md` — "A Man at a Desk" (John Dee's life)
- `STAGE_1_SEEKER_LESSON_2.md` — "The Man Who Saw" (Edward Kelley + partnership)
- `STAGE_1_SEEKER_LESSON_3.md` — "The First Transmissions" (the sessions begin)
- `STAGE_1_SEEKER_LESSON_4.md` — "The Enochian Language Emerges" (alphabet, Loagaeth, reverse dictation)
- `STAGE_1_SEEKER_LESSON_5.md` — "The Long Arc and the Breaking" (Continental years, 1587, the break, manuscript afterlife)

**Content Packets (blueprints):**
- `STAGE_1_CONTENT_PACKET_2.md` — blueprint for Lesson 1.2
- `STAGE_1_CONTENT_PACKET_3.md` — blueprint for Lesson 1.4 (includes the Strange Feeling Problem)
- `STAGE_1_CONTENT_PACKET_4.md` — blueprint for Lesson 1.5 (includes the Breaking Problem)

**Source Packs (rigor layers):**
- `SOURCE_PACK_2_LESSON_1_2.md` — citations and evidence for Lesson 1.2
- `SOURCE_PACK_2_VERIFICATION_PASS.md` — verification protocol for Lesson 1.2
- `SOURCE_PACK_3_LESSON_1_3.md` — citations, evidence, and the canonical ◎ Parallel badge definition
- `SOURCE_PACK_4_LESSON_1_4.md` — citations, evidence, the Madimi Problem, the "Not Nothing" audit

**Location:** `/content/curriculum/stage-1-seeker/`

**These files are the ground truth for the Archive's voice.** Any future content, UI copy, or feature design should be tested against the tone and posture established in these lessons.

---

## III. THE EPISTEMIC BADGE SYSTEM — THE EIGHT BADGES

This is the most important system in the entire Archive. It is the mechanism by which the Archive preserves intellectual honesty in the presence of material that invites credulity, cynicism, or both.

Every factual claim, interpretation, or assertion in the Archive carries one of eight epistemic badges:

| Badge | Name | Meaning | Example |
|:---:|------|---------|---------|
| **◆** | Historical Evidence | Documented in primary sources (manuscripts, diaries, artifacts) | "Dee recorded sessions in Sloane MS 3188" |
| **◇** | Strong Scholarly Consensus | Widely accepted by modern academic historians | "Dee was among the most learned men of Elizabethan England" |
| **○** | Traditional Occult Claim | Asserted by occult practitioners, not independently verified | "The Calls open gates to angelic realms" |
| **△** | Later Interpretation | Added or modified by post-Dee traditions (Golden Dawn, Crowley, etc.) | "The Watchtowers correspond to the four classical elements" |
| **◎** | Parallel | A structural resemblance to another tradition that is specific, documented, and non-trivial — but where causal influence is unproven or deliberately bracketed | "The 21-letter Enochian alphabet parallels but does not match the 22-letter Hebrew alphabet" |
| **~** | Speculative | Conjecture, hypothesis, or thought experiment | "What if Kelley invented the language unconsciously?" |
| **?** | Disputed / Contested | Experts disagree; evidence points in multiple directions | "Whether Rudolf II personally received Dee is disputed" |
| **⚠** | Caution | Material requiring psychological or ethical care | "Content involving altered states or ritual practice" |

### Rules for Badges:
- **Every claim on every content page must carry a badge.** No exceptions.
- **Badges are not hidden metadata — they are visible to the user.** The badge appears inline or in a margin, always legible.
- **A claim's badge cannot be changed without a Source Pack justification.**
- **The ◎ Parallel badge has formal qualification criteria** (defined canonically in `SOURCE_PACK_3_LESSON_1_3.md`, §III): Specificity, Documentary Presence, Scholarly Recognition, and Epistemic Humility. A parallel must be specific enough to be non-trivial, documented in primary sources, recognized in at least one scholarly treatment, and presented without implying causal influence where none is proven.
- **Badge inflation is a systemic risk.** If ◇ starts appearing where only ○ is warranted, or ◎ starts being used for vague resemblances, the system loses its value. Every badge placement should be defensible to a skeptical academic.

### Implementation Notes for Developers:
- Badges should be stored as metadata on content blocks, not as inline characters
- The UI renders badges as small, elegant glyphs — consistent with the visual direction
- A badge glossary is accessible from any badge via tooltip or tap
- The Discernment System settings page allows the user to filter content by badge (e.g., "show me only ◆ Historical Evidence")
- Future: badges can be used for search filtering ("find all ◎ Parallel claims in the Archive")

---

## IV. THE FIVE LENSES

The Five Lenses are the Archive's multi-perspective viewing system. On any piece of content where multiple valid interpretive frameworks exist, the Archive offers the reader multiple lenses rather than collapsing to a single view.

| Lens | Symbol | What It Shows |
|------|--------|--------------|
| **Historical** | ◆ | What the primary sources document. Dates, names, manuscripts, chains of transmission. |
| **Traditional Occult** | ○ | How practitioners within the occult tradition interpret the material. |
| **Psychological** | — | What modern psychology, cognitive science, or phenomenology might say about the experiences described. |
| **Symbolic** | — | Structural, archetypal, and cross-traditional patterns — without mystifying. |
| **Speculative** | ~ | What-if questions, counterfactuals, imaginative expansions — always clearly marked. |

### Rules for Lenses:
- **No lens is permitted to "win."** No single lens is presented as the correct or primary reading. The Historical Lens is the ground (it comes first), but it is not the ceiling.
- **Every lens must be internally honest.** The Traditional Occult Lens does not ridicule occult claims; the Psychological Lens does not pathologize the practitioners; the Symbolic Lens does not mystify the historical record.
- **The reader chooses which lens(es) to engage.** The app defaults to the Historical Lens but makes others available.

### Implementation — The Multi-Lens Viewer:
- On content pages with multiple interpretive frameworks, a lens selector appears in the margin or header
- Selecting a lens re-renders the interpretive content for that section (not the facts — facts don't change between lenses)
- Side-by-side mode (desktop) shows two lenses in adjacent columns
- Mobile: toggle between lenses with a swipe or tap

---

## V. THE THREE SEEKER DISCERNMENT PRACTICES

These are the Archive's signature pedagogical invention. They are not abstract concepts — they are trained skills, introduced across the Seeker path and used at every subsequent rank.

### Practice 1: Source Discernment (Lesson 1.2)
**Core question:** *What is this document? Who is transmitting it? Through what chain? What is lost, changed, or added at each link?*

### Practice 2: Single-Witness Discernment (Lesson 1.3)
**Core question:** *When only one person reports this event, how do I hold sincerity and accuracy as separate questions? What are the four quadrants of the sincerity × accuracy grid — and which one am I assuming?*

### Practice 3: The Strange Feeling (Lesson 1.4)
**Core question:** *What is the difference between the intensity of what I feel and the truth of the claim producing it? Am I collapsing into belief (Collapse A) or collapsing into dismissal (Collapse B)?*

### Rules:
- These three practices are referenced and cued throughout the Archive, not just in the Seeker lessons
- The app should surface them contextually (e.g., when a user encounters a ? or ◎ badge, a subtle prompt could say "This is a good moment for Source Discernment")
- A permanent "Seeker's Toolkit" reference card is available at all ranks after completing Stage 1

---

## VI. THE CONTENT PIPELINE

### How Content Is Produced

Content for the Archive follows a strict pipeline. No content goes from idea to published without passing through every stage:

```
1. CONTENT PACKET (Blueprint)
   ↓
2. FULL LESSON DRAFT (Prose)
   ↓
3. SOURCE PACK (Rigor Layer)
   ↓
4. VERIFICATION PASS (Fact-check + Badge Audit)
   ↓
5. HUMAN REVIEW (Founder Approval)
   ↓
6. PUBLICATION
```

### Content Packet:
- Defines purpose, emotional arc, key themes, learning goals, section structure, lens structure, sidebar manifest, relationship chains, shadow concepts
- Names the central pedagogical or ethical challenge of the lesson (e.g., "The Strange Feeling Problem," "The Breaking Problem")
- Does NOT contain final prose — it is the scaffold, not the building

### Full Lesson Draft:
- Written against the Content Packet
- Target word counts: 7,000–12,000 words per Seeker lesson (may vary by rank)
- Must include: Header with metadata, Opening Sequence, Core Sections, Lens Sections, Discernment Practice (where applicable), Reflection Prompts, Knowledge Check, Unlocks, Companion Elements ("Who Says This?" tables), Closing Passage
- Must carry the Archive's voice (see §VIII)

### Source Pack:
- The rigor layer beneath each lesson
- Contains: Source Overview (organized by type), Claim-by-Claim evidence tables, Badge audits, Precision-upgrade recommendations, Verification Pass
- Flags passages requiring human review
- Issues a publication verdict: CLEARED / CLEARED WITH CAVEATS / NOT YET CLEARED

### The Lesson Numbering System:
- `STAGE_{n}_SEEKER_LESSON_{m}.md` — full lessons
- `STAGE_{n}_CONTENT_PACKET_{m}.md` — blueprints
- `SOURCE_PACK_{m}_LESSON_{n}_{m}.md` — rigor layers

---

## VII. TECH STACK

### Confirmed Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 14+ (App Router) | Already initialized in repo |
| **Language** | TypeScript | Strict mode |
| **Styling** | Tailwind CSS | Custom design tokens from VISUAL_DIRECTION.md |
| **Database** | Supabase (PostgreSQL + Auth + Storage) | |
| **Search** | Meilisearch | Full-text search with badge filtering |
| **Animation** | Framer Motion | For UI transitions, reveals, atmospheric effects |
| **Data Viz** | D3.js | For Timeline, Celestial Map, interactive diagrams |
| **3D** | Three.js | **DEFERRED from MVP** — 2D versions first, 3D as enhancement layer |
| **Hosting** | Vercel | |
| **CMS** | Markdown → JSON pipeline | Content authored as .md, parsed to structured JSON for the app |

### Current Repo Structure

```
/enochian-celestial-archive (root = "Enocchian Magick" on disk)
├── /app                    # Next.js App Router
│   ├── /archive            # Archive pillar routes
│   ├── /curriculum         # Initiation Path routes
│   ├── /glossary           # Glossary routes
│   ├── /lesson             # Individual lesson routes
│   ├── /observatory        # Intelligence Observatory routes
│   ├── /style-guide        # Design system documentation
│   ├── /timeline           # Timeline routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home/landing
│   └── globals.css         # Global styles
├── /components             # Reusable React components
│   ├── /discernment        # Badge display, lens viewer
│   ├── /glossary           # Glossary components
│   ├── /home               # Landing page components
│   ├── /layout             # Navigation, footer, sidebar
│   ├── /lesson             # Lesson rendering components
│   ├── /observatory        # Observatory components
│   ├── /progression        # Rank display, progress tracking
│   └── /ui                 # Base UI components
├── /lib                    # Shared utilities
│   ├── content.ts          # Content loading
│   ├── glossary.ts         # Glossary data
│   ├── lesson-types.ts     # TypeScript types for lessons
│   └── /lessons            # Lesson data files
├── /content                # Authored content (Markdown)
│   ├── /archive            # Archive pillar content
│   ├── /curriculum         # Lesson files (the Seeker stage lives here)
│   │   └── /stage-1-seeker # ← ALL Seeker content
│   ├── /glossary           # Glossary entries
│   └── /timeline           # Timeline events
├── /docs                   # Project documentation
│   ├── PHASE_1_MASTER_BLUEPRINT.md
│   ├── EXPERIENCE_PRINCIPLES.md
│   ├── AGENT_ORCHESTRATION.md
│   ├── HUMAN_CONTROL_PROTOCOL.md
│   ├── MVP_SCOPE.md
│   ├── DECISION_LOG.md
│   ├── PRODUCT_VISION.md
│   ├── SITE_MAP.md
│   ├── PROGRESSION_SYSTEM.md
│   ├── FEATURE_LIST.md
│   ├── VISUAL_DIRECTION.md
│   ├── DATA_MODEL.md
│   ├── CONTENT_VOICE_GUIDE.md
│   ├── CORE_TERMS.md
│   ├── MASTER_TIMELINE.md
│   └── GPT_ARCHITECT_BRIEF.md  ← THIS DOCUMENT
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

### Data Model Principles:
- Content is authored as Markdown with YAML frontmatter
- A build step parses Markdown → structured JSON for the app
- Every content node has: `id`, `title`, `type`, `rank_required`, `badges[]`, `lenses[]`, `sources[]`, `cross_links[]`
- The Supabase database stores user state (progress, journal entries, bookmarks) — NOT content. Content lives in the repo.
- Glossary terms are stored in `lib/glossary.ts` as a typed array — this will migrate to Supabase for search integration

---

## VIII. THE ARCHIVE'S VOICE

### Tone

The Archive speaks as a knowledgeable, careful guide — neither a professor lecturing nor a mystic whispering. Think of a librarian in a Renaissance archive who knows where everything is, respects the material, and trusts the reader to form their own judgment.

**The voice is:**
- Warm but not casual
- Precise but not clinical
- Confident in what it knows; honest about what it does not
- Capable of beauty and emotional depth without losing rigor
- Patient — the voice never rushes the reader
- Respectful of the reader's intelligence

**The voice is NOT:**
- Academic jargon
- New Age platitudes
- Sensational ("and then things got REALLY weird")
- Condescending ("as any scholar knows...")
- Winking or ironic about the material
- Performatively neutral (pretending not to care about a subject it clearly cares about)

### Content Voice Rules (extracted from the Seeker lessons):
1. **Ground before sky.** Always state what is historically documented before what is interpreted.
2. **Name, don't judge.** When presenting a claim the Archive does not endorse, name it and badge it. Do not editorialize.
3. **Address the reader as "you" or "the seeker."** Never "the student" at Seeker rank. The form of address matches the rank.
4. **Use plain language for emotional moments.** The 1587 Breaking is told in simple sentences. The Strange Feeling is described without jargon. Emotional weight comes from restraint, not from adjectives.
5. **Every lesson opens with a composed image.** Not a thesis statement. Not a summary. An image the reader can see.
6. **Every lesson closes with a composed posture.** Not a summary. Not a quiz. An image or a position the reader is left standing in.
7. **The closing lines of the Seeker path are:** *"Close the book. The letters are still strange. The story is still unfinished. The silence this Archive began in has not been broken — only, for a while, interrupted. Welcome to the threshold."*

### UI Copy Guidelines:
- Buttons say "Enter" or "Continue," not "Start" or "Next"
- Error states say "The Archive cannot find this page" not "404 Not Found"
- Loading states feel atmospheric, not mechanical — a slow fade, not a spinner
- Empty states say "This room is not yet open" not "Coming soon"
- Rank advancement says "You have reached the threshold of [Rank Name]" not "Congratulations! You've unlocked [Rank Name]!"

### Reference Document:
The full Content Voice Guide is at `/docs/CONTENT_VOICE_GUIDE.md`. It is the canonical voice reference. Read it before writing any content or UI copy.

---

## IX. VISUAL DIRECTION — SUMMARY

Full specification in `/docs/VISUAL_DIRECTION.md`. Key principles for developers:

### The Feeling:
Ancient, alive, and slightly dangerous — like you've found something you weren't entirely supposed to find, but the Archive seems to have been waiting for you.

### Color System:

| Token | Hex | Usage |
|-------|-----|-------|
| `--ink` | `#080604` | Deepest background |
| `--deep` | `#0d0a05` | Primary background |
| `--parchment-dark` | `#140f07` | Card backgrounds |
| `--gold` | `#c9a84c` | Primary accent |
| `--gold-light` | `#e8cc7d` | Hover states |
| `--gold-pale` | `#f5e8c0` | Body text |
| `--gold-dim` | `#7a6230` | Disabled states |
| `--amber` | `#a06820` | Warm accent |
| `--ember` | `#7a3510` | Urgent/active |
| `--blood` | `#5c1a10` | Danger, Abyss, ZAX |
| `--ash` | `#3a3020` | Muted backgrounds |

### Typography:
- Headings: Serif (Cinzel or Cormorant Garamond)
- Body: Humanist serif (Cormorant or EB Garamond)
- Code/glyphs: Monospace with ligatures
- The Enochian alphabet renders in a custom font (to be produced)

### What It Is NOT:
- Not neon occultism (no glowing pentagrams)
- Not New Age pastel
- Not flat/modern minimalism
- Not dark fantasy
- Not steampunk

### Interaction Principles:
- Reveals, not loads. Content appears as if uncovered, not loaded.
- Depth, not flatness. Layered shadows, subtle parallax, atmospheric depth.
- Quiet animation. Motion is slow, deliberate, and meaningful.
- Every interactive element must have a 2D fallback. No WebGL requirement for core functionality.

---

## X. AGENT RESPONSIBILITIES

### Who Does What

| Agent | Role | Owns | Does NOT Do |
|-------|------|------|------------|
| **GPT (OpenAI)** | Head Architect / Lead Developer | App architecture, component design, feature implementation, database schema, deployment, performance, build pipeline | Write final content prose, change badge definitions, alter the progression system, modify the discernment practices without human approval |
| **Claude (Anthropic)** | Content Lead / Curriculum Architect | All curriculum content, research, content voice, epistemic system design, lesson pipeline, source packs, philosophical architecture | Write production code, make deployment decisions, override GPT's architectural choices |
| **Cursor / Windsurf** | AI Code Assistants | Code generation under GPT's direction, component implementation, CSS, rapid prototyping | Make architectural decisions independently, write content, change the data model without review |
| **Antigravity** | 3D / Immersive Specialist | Three.js scenes, shaders, 3D assets, immersive enhancements | Touch 2D UI, modify content, implement features outside 3D scope |
| **Gemini (Google)** | Research Verifier | Fact-checking, source cross-referencing, contradiction detection | Write final content, make architectural decisions, resolve editorial disputes |
| **Human (Sacred Clowns)** | Founder / Final Authority | Vision, all Gate 3+ decisions, brand, monetization, community, final content approval | Everything else is delegated but reversible |

### Handoff Protocol Between Claude and GPT:

**Claude produces:**
- Markdown content files with YAML frontmatter
- Content Packets (blueprints)
- Source Packs (rigor layers)
- Epistemic system definitions
- UI copy guidelines
- Voice and tone specifications

**GPT receives Claude's output and:**
- Designs the TypeScript interfaces to represent the content model
- Builds React components that render the content with proper badge display, lens switching, sidebar rendering, and responsive layout
- Implements the quiz engine, progress tracking, and journal system
- Designs the database schema for user state
- Makes all deployment and infrastructure decisions
- Directs Cursor/Windsurf for implementation

**The handoff boundary:** Claude writes the *what* and *why*. GPT builds the *how*. The human approves the *whether*.

### Decision Gate Quick Reference:

| Gate | Who Acts | Example |
|------|----------|---------|
| **Gate 1: INFORM** | Agent acts, human notified after | Typo fixes, formatting, dependency updates |
| **Gate 2: REVIEW** | Agent completes, human reviews before live | New content pages, UI changes, database migrations |
| **Gate 3: APPROVE** | Agent proposes, human approves before work begins | New features, architecture changes, badge system changes, new 3D scenes |
| **Gate 4: CO-CREATE** | Human directs in real-time | Vision changes, rank system changes, monetization, brand identity |

Full protocol at `/docs/HUMAN_CONTROL_PROTOCOL.md`.

---

## XI. WHAT MUST NEVER BE VIOLATED

These are the Archive's inviolable constraints. No agent, no timeline pressure, no feature request overrides these. If you are uncertain whether something violates these constraints, stop and ask the human.

### The Ten Commandments of the Celestial Archive:

**1. Never present an unverified historical claim without a badge.**
Every factual assertion carries an epistemic badge. If the badge cannot be determined, the claim is badged `?` (Disputed) or `~` (Speculative), never left unmarked.

**2. Never let a single lens dominate.**
No content page presents only one interpretive framework when multiple are available. The Historical Lens is the ground; it is not the ceiling.

**3. Never sensationalize.**
The material is inherently dramatic. It does not need rhetorical inflation. The 1587 incident is told plainly. The Aethyrs are described carefully. The language is respected, not spectacularized.

**4. Never moralize.**
The Archive does not tell the reader what to think about the material. It does not conclude that Dee was a saint or a fool. It does not conclude that Kelley was a fraud or a genius. It does not conclude that the angels were real or hallucinated. It presents what can be known, names what cannot, and hands the judgment to the reader.

**5. Never use gamified language for progression.**
No "Congratulations!" No "Level up!" No XP bars. No leaderboards. Rank advancement is described as reaching a threshold, not winning a prize.

**6. Never break the 2D fallback requirement.**
Every feature must work without WebGL. 3D is enhancement, never requirement.

**7. Never ship content without a Source Pack.**
No lesson goes live without a rigor layer documenting its claims, badges, and sources. The Source Pack is not optional. It is structural.

**8. Never collapse the Archive into a single interpretation.**
The Archive's signature virtue is holding multiple readings simultaneously. The moment it secretly endorses one reading (skeptical, believing, psychological, symbolic) as "the real truth," it has failed.

**9. Never sacrifice the reader's autonomy.**
The Archive is designed to make the reader *more capable of forming their own judgment*, not to form judgment on their behalf. Every lesson ends by handing the work back.

**10. Never build a feature not in MVP_SCOPE.md without Gate 3 approval.**
Scope discipline is structural integrity. Features not in `/docs/MVP_SCOPE.md` require a written proposal and human approval before any work begins.

---

## XII. THE MVP — WHAT TO BUILD FIRST

The full MVP scope is locked in `/docs/MVP_SCOPE.md`. Here is the priority order for development:

### Phase 1 — Foundation (Build First)
1. **Design system** — Tailwind tokens matching VISUAL_DIRECTION.md, base components (buttons, cards, modals, badge display, sidebar)
2. **Content rendering pipeline** — Markdown → JSON parser, lesson renderer, badge inline display, sidebar rendering
3. **Navigation shell** — Global nav, pillar routing, breadcrumbs, responsive layout
4. **Lesson pages** — Render the 5 Seeker lessons with full formatting, badges, lenses, sidebars, and companion tables

### Phase 2 — Core Features
5. **Glossary** — 100+ terms, searchable, cross-linked to lessons
6. **Timeline** — Interactive Dee/Kelley era (1527–1609) with event detail cards
7. **Celestial Map** — 2D Watchtower grids, Great Table, Tablet of Union
8. **Quiz engine** — Multiple choice + matching, retakable, explanations
9. **Progress tracking** — Rank display, completed lessons, readiness indicators

### Phase 3 — User State
10. **Auth** — Supabase auth (email + social)
11. **Journal** — Free-form entries, reflection responses linked to lessons
12. **Bookmarks** — Save any page
13. **Search** — Meilisearch integration, badge-aware filtering

### Phase 4 — Polish
14. **Documentary Mode** — Atmospheric narrative sequences (start with Lesson 1.1)
15. **Atmospheric loading/transitions** — Framer Motion reveals, ambient effects
16. **Mobile optimization** — Full responsive pass
17. **Accessibility** — WCAG 2.1 AA compliance

### Phase 5 — Enhancement (Post-MVP)
18. **Three.js scenes** — Celestial Map 3D upgrade, Labyrinth entrance
19. **Language Chamber audio** — Pronunciation recordings
20. **Stage 2 content** — Student lessons (content pipeline resumes)
21. **Intelligence Observatory** — Full 8-intelligence-type framework

---

## XIII. KEY DOCUMENTS — WHERE TO FIND EVERYTHING

| Document | Location | What It Contains |
|----------|----------|-----------------|
| **This Brief** | `/docs/GPT_ARCHITECT_BRIEF.md` | The system constitution — read this first |
| **Master Blueprint** | `/docs/PHASE_1_MASTER_BLUEPRINT.md` | The original master plan (v2, all 13 sections) |
| **Experience Principles** | `/docs/EXPERIENCE_PRINCIPLES.md` | UX philosophy, 7 equilibrium principles, discernment system spec |
| **Content Voice Guide** | `/docs/CONTENT_VOICE_GUIDE.md` | How the Archive speaks |
| **Visual Direction** | `/docs/VISUAL_DIRECTION.md` | Colors, typography, interaction patterns, mood |
| **MVP Scope** | `/docs/MVP_SCOPE.md` | Locked feature list — what ships and what doesn't |
| **Data Model** | `/docs/DATA_MODEL.md` | Repo structure, entity types, database schema |
| **Agent Orchestration** | `/docs/AGENT_ORCHESTRATION.md` | Who does what, handoff protocols |
| **Human Control Protocol** | `/docs/HUMAN_CONTROL_PROTOCOL.md` | 4-tier gate system |
| **Decision Log** | `/docs/DECISION_LOG.md` | Running log of architectural decisions |
| **Core Terms** | `/docs/CORE_TERMS.md` | Master glossary of Enochian terminology |
| **Master Timeline** | `/docs/MASTER_TIMELINE.md` | Comprehensive Dee/Kelley chronology |
| **Seeker Lessons** | `/content/curriculum/stage-1-seeker/` | The 5 complete Seeker lessons — canonical voice reference |

---

## XIV. HOW TO ONBOARD A NEW AI AGENT

When a new AI agent joins the project (a new Cursor instance, a new GPT session, a new specialist), they receive the following onboarding sequence:

1. **Read this document** (`GPT_ARCHITECT_BRIEF.md`) — the constitution
2. **Read** `VISUAL_DIRECTION.md` — the visual language
3. **Read** `MVP_SCOPE.md` — what they are and are not allowed to build
4. **Read** `HUMAN_CONTROL_PROTOCOL.md` — the gate system
5. **Read one Seeker lesson** (suggest Lesson 1.4 or 1.5) — to internalize the voice
6. **Read** `EXPERIENCE_PRINCIPLES.md` — the UX commandments
7. **Confirm** they understand the badge system, the lens system, and the three discernment practices
8. **Confirm** they know what the Ten Commandments are (§XI)
9. **Begin work only on tasks approved for their role**

Any agent that cannot articulate the difference between ◆ and ◇, or between ○ and △, is not ready to work on this project.

---

## XV. THE SOUL OF THE PROJECT

This section is not a feature spec. It is the reason the project exists.

The Enochian material is one of the most extraordinary bodies of work in the Western esoteric tradition. It was produced under conditions that resist easy explanation. It has been the subject of scholarly study, occult practice, and popular fascination for over four centuries. It deserves an instrument worthy of it — something that is as rigorous as a university archive, as immersive as a documentary, as navigable as a modern app, and as psychologically intelligent as the material itself requires.

The Celestial Archive is being built to be that instrument.

The founder's vision is not to create a wiki. It is not to create an occult manual. It is not to create a debunking exercise. It is to create the most intelligent, beautiful, and honest encounter with this material that has ever been built — and to do so in a way that makes the reader *more discerning*, not less.

The signature quality of the Archive is this:

**The seeker leaves wiser, less certain, more disciplined, and more capable of remaining with mystery without collapsing into it.**

Every feature, every page, every line of code either serves that sentence or should be questioned.

Build accordingly.

---

*End of GPT_ARCHITECT_BRIEF.md*
*Version 1.0 — April 18, 2026*
*Authored by Claude (Anthropic) on behalf of Sacred Clowns*
*Status: ACTIVE — this is the governing document for all development work*
