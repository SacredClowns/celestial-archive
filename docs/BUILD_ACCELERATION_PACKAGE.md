# BUILD ACCELERATION PACKAGE
## Onboarding Packet for Every Future Collaborator
### Enochian: The Celestial Archive
### v1.0 — April 18, 2026

> *Read this document first. It compresses the entire project into a form you can absorb in ten minutes. Then read the source documents it points to. Then build.*

---

## I. ONE-PAGE PROJECT OVERVIEW

**What it is.** An immersive educational app covering the Enochian magickal system — the body of material produced by John Dee and Edward Kelley (1581–1587) and its four-century afterlife through the Golden Dawn, Aleister Crowley, and contemporary scholarship.

**What it is not.** Not a wiki. Not an occult instruction manual. Not a debunking exercise. Not a SaaS product. Not a New Age storefront.

**What it does.** The Archive is an instrument for learning how to remain with mystery without collapsing into it. It makes the user more perceptive, more disciplined, less easily captured by certainty, and more capable of holding complexity. It does this through a combination of rigorous historical content, an eight-badge epistemic system, a five-lens interpretive framework, three trained discernment practices, and a seven-rank progression path.

**The soul in one sentence.** The seeker leaves wiser, less certain, more disciplined, and more capable of remaining with mystery without collapsing into it.

**The relationship to the user.** The Archive is a mirror, an observatory, a library, an instrument, and a threshold. It is never an oracle, never a guru, never a machine for manufacturing belief.

**Stack.** Next.js 14+ · TypeScript · Tailwind CSS · Supabase · Framer Motion · D3.js · Meilisearch. Three.js deferred from MVP.

**Current state.** Stage 1 (Seeker) content complete: 5 lessons, 4 content packets, 4 source packs. Design system specified. App shell initialized. Foundational documents written. Ready for Phase 1 development.

**Source documents.** Everything flows from `/docs/GPT_ARCHITECT_BRIEF.md` — the project constitution.

---

## II. CORE LAWS — THE NON-NEGOTIABLES

These cannot be overridden by any agent, any timeline, or any feature request.

**1. Every claim carries a badge.** Eight epistemic badges (◆◇○△◎~?⚠) mark every factual assertion in the Archive. No unbadged claims. Ever.

**2. No single lens wins.** Five interpretive lenses (Historical, Traditional Occult, Psychological, Symbolic, Speculative) are always available. No content page presents only one reading when multiple exist.

**3. No gamified language.** No "Congratulations." No "Level up." No XP. No leaderboards. Rank advancement is described as reaching a threshold, not winning a prize.

**4. Every rank is complete on its own.** A Seeker who stops at Seeker has received something whole. The hidden test of every stage: "I could stop here."

**5. The reader's autonomy is sacred.** The Archive makes the reader more capable of forming their own judgment. It never forms judgment on their behalf.

**6. Content never ships without a Source Pack.** No lesson goes live without a rigor layer documenting claims, badges, and sources.

**7. Beauty serves attention, not seduction.** The design supports the content. It never competes with it or compensates for it.

**8. The Archive is a mirror, not an oracle.** It does not claim to know the user. It does not prescribe belief. It shows material and trusts the reader.

**9. 2D first, always.** Every feature works without WebGL. Three.js is enhancement, never requirement.

**10. Nothing out of scope without Gate 3.** `/docs/MVP_SCOPE.md` is law. Anything not listed requires a written proposal and human approval.

---

## III. QUICK-START SETUP

### For a Coding Agent (Cursor / Windsurf / Copilot)

1. Read `/.cursorrules` — all coding constraints, color tokens, forbidden patterns
2. Read `/docs/GPT_ARCHITECT_BRIEF.md` §VII (Tech Stack), §IX (Visual Direction), §XII (MVP Build Priority)
3. Read `/docs/VISUAL_DIRECTION.md` — color system, typography, interaction rules
4. Open and pin: `/.cursorrules`, `/tailwind.config.ts`, `/app/globals.css`, `/app/layout.tsx`
5. Before writing any component, verify colors against the palette. No blue. No green. No white backgrounds.
6. Read `/docs/WINDSURF_SETUP.md` for prompt templates, the Drift Checklist, and examples of good/bad prompts

### For a Content Agent (Claude / Future Content Writer)

1. Read `/CLAUDE.md` — role definition, content pipeline, badge and lens discipline
2. Read `/docs/CONTENT_VOICE_GUIDE.md` — the Archive's voice spec
3. Read one Seeker lesson (recommend `STAGE_1_SEEKER_LESSON_4.md`) — to internalize the actual voice
4. Read `/docs/GPT_ARCHITECT_BRIEF.md` §III (Badges), §IV (Lenses), §V (Discernment Practices)
5. Before writing any content, confirm you can explain the difference between ◆ and ◇, between ○ and △, and between ◎ and ~

### For an Architect / Design Agent (GPT / Planning Role)

1. Read `/docs/GPT_ARCHITECT_BRIEF.md` in full — this is the constitution
2. Read `/docs/OCCULT_EFFICACY_STRATEGY.md` — how immersive features must be designed
3. Read `/docs/EXPERIENCE_PRINCIPLES.md` — the seven equilibrium principles
4. Read `/docs/HUMAN_CONTROL_PROTOCOL.md` — the four-tier gate system
5. Read `/docs/MVP_SCOPE.md` — what ships and what doesn't

### For Any Agent — The 60-Second Orientation

The Archive has **ten pillars** (content sections), **seven ranks** (progression), **eight badges** (epistemic markers), **five lenses** (interpretive frameworks), and **three discernment practices** (trained skills). It uses a **dark gold-on-ink palette**, **serif typography**, and **atmospheric transitions** (no spinners, no gamification, no bright colors). Content is authored as **Markdown with YAML frontmatter**, built through a **five-stage pipeline** (Content Packet → Lesson → Source Pack → Verification → Human Review), and never ships without a Source Pack.

---

## IV. AGENT ROLES AND HANDOFF FLOW

```
┌──────────────────────────────────────────────────────────┐
│                     HUMAN (Sacred Clowns)                │
│           Founder · Final Authority · All Gates          │
└──────────────┬───────────────────────────┬───────────────┘
               │                           │
    ┌──────────▼──────────┐     ┌──────────▼──────────┐
    │      CLAUDE          │     │       GPT            │
    │  Content Lead        │────▶│  Head Architect      │
    │  Curriculum Architect│     │  Lead Developer      │
    │                      │     │                      │
    │  Writes: prose,      │     │  Designs: types,     │
    │  blueprints, source  │     │  components, schema, │
    │  packs, badges,      │     │  rendering, deploy   │
    │  UI copy guidelines  │     │                      │
    └──────────────────────┘     └──────────┬───────────┘
                                            │
                                 ┌──────────▼──────────┐
                                 │  CURSOR / WINDSURF   │
                                 │  Code Implementation │
                                 │                      │
                                 │  Builds: components, │
                                 │  routes, styles,     │
                                 │  interactions        │
                                 └──────────────────────┘
```

**The boundary:** Claude writes the *what* and *why*. GPT builds the *how*. Cursor executes the *build*. Human approves the *whether*.

**Handoff format:** Claude produces Markdown with YAML frontmatter → GPT designs TypeScript interfaces and component architecture → Cursor implements as React components → Human reviews before anything goes live.

**Supporting agents:** Antigravity (3D, deferred), Gemini (fact-checking), Kimi (consistency auditing). See `/docs/AGENT_ORCHESTRATION.md` for full protocol.

---

## V. CONTENT PIPELINE SUMMARY

```
STAGE 1: CONTENT PACKET (Blueprint)
  Purpose, emotional arc, themes, learning goals, section structure,
  sidebar manifest, shadow concepts, central challenge.
  Does NOT contain prose.
                    ↓
STAGE 2: FULL LESSON DRAFT
  7,000–12,000 words (Seeker). 10 structural elements:
  Header · Opening · Cores · Lenses · Discernment · Reflections ·
  Knowledge Check · Unlocks · Companions · Closing Passage.
                    ↓
STAGE 3: SOURCE PACK (Rigor Layer)
  Source overview · Claim-by-claim evidence · Badge audit ·
  Precision-upgrade recommendations · Human-review flags.
  Verdict: CLEARED / CLEARED WITH CAVEATS / NOT YET CLEARED.
                    ↓
STAGE 4: VERIFICATION PASS
  Cross-check ◆ against primary sources. Verify ◇ against scholarship.
  Confirm ◎ meets four criteria. Flag badge inflation.
                    ↓
STAGE 5: HUMAN REVIEW
  Founder reads, approves, requests changes, or rejects.
  Only human-approved content goes to publication.
```

**No stage may be skipped.** No lesson ships without a Source Pack. No Source Pack is optional.

---

## VI. BUILD-PHASE ROADMAP

| Phase | Name | What to Build | Success Criteria |
|-------|------|--------------|------------------|
| **1** | **Foundation** | Design system tokens, base UI components, Markdown→JSON pipeline, lesson renderer, navigation shell | One Seeker lesson (1.4) renders beautifully with badges, sidebars, lenses, and mobile layout |
| **2** | **Core Features** | Glossary (100+ terms), Timeline (interactive Dee/Kelley era), Celestial Map (2D grids), Quiz engine, Progress tracking | All pillar routes render content. Cross-links work. Glossary tooltips appear inline. |
| **3** | **User State** | Supabase auth, Journal, Bookmarks, Meilisearch integration | User can sign up, complete a lesson, write a journal entry, bookmark a page, search the glossary |
| **4** | **Polish** | Documentary Mode (Lesson 1.1), Framer Motion transitions, mobile responsive pass, WCAG 2.1 AA | Lighthouse > 90. Screen reader compatible. No layout shift. |
| **5** | **Enhancement** | Three.js (Celestial Map 3D), Language Chamber audio, Stage 2 content, Intelligence Observatory | Immersive layer works with 2D fallback intact. New content follows full pipeline. |

**Between every phase:** Run the Drift Checklist (see `/docs/WINDSURF_SETUP.md` §4). Human reviews visual output. Human approves phase advancement.

---

## VII. DANGER LIST — DRIFT WARNINGS

These are the ways this project goes wrong. Every agent should know them.

### Visual Drift
- **Symptom:** White backgrounds, blue links, sans-serif fonts, flat cards, loading spinners, green success states.
- **Cause:** AI coding tools defaulting to generic SaaS patterns.
- **Fix:** Re-read `/.cursorrules` color token section. Run the Drift Checklist. Paste the full palette into the prompt.

### Tone Drift
- **Symptom:** "Congratulations!" "You've unlocked!" "Level up!" "Amazing job!" "Welcome back, Seeker!"
- **Cause:** Gamification habits from other apps bleeding into UI copy.
- **Fix:** Re-read `/docs/CONTENT_VOICE_GUIDE.md`. Replace with: "You have reached the threshold of [Name]." "This room is now open." "Continue."

### Badge Inflation
- **Symptom:** ◆ appearing on claims that should be ◇. ◎ appearing on vague resemblances. ~ claims presented with unearned confidence.
- **Cause:** Content writers defaulting to the strongest badge that seems plausible.
- **Fix:** Re-read `/CLAUDE.md` badge discipline section. When uncertain, badge conservatively. ◇ before ◆. ○ before ◇. Always.

### Scope Creep
- **Symptom:** "While I'm at it, I'll also build..." "It would be nice to add..." "This feature would really enhance..."
- **Cause:** Agents optimizing for completeness over discipline.
- **Fix:** Check `/docs/MVP_SCOPE.md`. If the feature isn't listed, write a Gate 3 proposal. Do not build first.

### Efficacy Drift
- **Symptom:** Features that create urgency, scarcity, FOMO, chosen-one energy, or emotional dependency. Notifications that say "You haven't visited in 3 days!"
- **Cause:** Growth-hacking patterns from other products.
- **Fix:** Re-read `/docs/OCCULT_EFFICACY_STRATEGY.md` §8 (Safeguards). Apply the four tests: exit test, completion test, beauty test, handoff test.

### Lens Collapse
- **Symptom:** Content that presents only the Historical Lens, or only the Occult Lens, or that secretly endorses one reading as "the real truth."
- **Cause:** Writers defaulting to the lens that feels most comfortable or "correct."
- **Fix:** Re-read `/docs/GPT_ARCHITECT_BRIEF.md` §IV. No lens wins. Every content page with multiple valid readings must offer multiple lenses.

---

## VIII. BEFORE YOU BUILD ANYTHING — CHECKLIST

Run this before writing your first line of code or content.

- [ ] I have read `GPT_ARCHITECT_BRIEF.md` (the constitution)
- [ ] I have read `.cursorrules` (coding constraints)
- [ ] I have read `MVP_SCOPE.md` (what I am and am not allowed to build)
- [ ] I have read `HUMAN_CONTROL_PROTOCOL.md` (the gate system)
- [ ] I have read at least one Seeker lesson to internalize the voice
- [ ] I can explain the difference between ◆ (Historical Evidence) and ◇ (Scholarly Consensus)
- [ ] I can explain the difference between ○ (Occult Claim) and △ (Later Interpretation)
- [ ] I can explain what the ◎ (Parallel) badge requires and why it has four qualification criteria
- [ ] I know the color palette and can name at least five tokens without looking
- [ ] I know that the Archive uses serif typography, not sans-serif
- [ ] I know that loading states are atmospheric fades, not spinners
- [ ] I know that "Congratulations" is forbidden and "Welcome to the threshold" is canonical
- [ ] I know what Three.js decision applies (DEFERRED — build 2D first)
- [ ] I know my role (content / architecture / code) and what I do NOT do
- [ ] I know where to find the source documents if I need more detail

If any checkbox is unchecked, read before building. Ten minutes of reading prevents hours of rework.

---

## IX. WHEN TO STOP AND ASK THE HUMAN — CHECKLIST

Stop immediately and escalate to the human founder when:

### Architecture
- [ ] You are about to build a feature not in `MVP_SCOPE.md`
- [ ] You are about to change the data model or database schema
- [ ] You are about to add a new route, pillar, or major section
- [ ] You are about to add a new npm dependency that changes the stack

### Content
- [ ] You are about to create a new badge, lens, glyph, or discernment practice
- [ ] You are about to write content about the Intelligence Observatory
- [ ] You are about to write content involving the Aethyrs, altered states, or psychological safety
- [ ] You are uncertain whether a claim should be badged ◆ or ◇

### Design
- [ ] You are about to change the color palette or typography
- [ ] You are about to implement Three.js or any 3D rendering
- [ ] You are about to build an animation that exceeds 600ms
- [ ] You notice the design drifting toward generic SaaS and cannot fix it

### Product
- [ ] You are about to build any notification system
- [ ] You are about to build any social or comparison feature
- [ ] You are about to write UI copy that could create urgency, scarcity, or FOMO
- [ ] You are about to describe the user's rank as an identity rather than a capability

### The Universal Rule
If you are uncertain whether something aligns with the Archive's soul, stop. Re-read the relevant source document. If still uncertain, ask the human. The cost of asking is ten minutes. The cost of building the wrong thing is days.

---

## X. SOURCE DOCUMENT INDEX

| Document | Location | Read When |
|----------|----------|-----------|
| **GPT Architect Brief** | `/docs/GPT_ARCHITECT_BRIEF.md` | First — the constitution |
| **Cursor Rules** | `/.cursorrules` | Before any coding session |
| **Claude Operating Rules** | `/CLAUDE.md` | Before any content work |
| **Windsurf Setup Guide** | `/docs/WINDSURF_SETUP.md` | When configuring AI coding tools |
| **Occult Efficacy Strategy** | `/docs/OCCULT_EFFICACY_STRATEGY.md` | Before building any immersive feature |
| **Content Voice Guide** | `/docs/CONTENT_VOICE_GUIDE.md` | Before writing any UI copy or content |
| **Experience Principles** | `/docs/EXPERIENCE_PRINCIPLES.md` | Before designing any interaction |
| **Visual Direction** | `/docs/VISUAL_DIRECTION.md` | Before any design or styling work |
| **MVP Scope** | `/docs/MVP_SCOPE.md` | Before building anything — checks what's in scope |
| **Human Control Protocol** | `/docs/HUMAN_CONTROL_PROTOCOL.md` | When uncertain about authority to act |
| **Agent Orchestration** | `/docs/AGENT_ORCHESTRATION.md` | When coordinating with other agents |
| **Data Model** | `/docs/DATA_MODEL.md` | When working with database or content types |
| **Master Timeline** | `/docs/MASTER_TIMELINE.md` | When working on Timeline pillar or chronological content |
| **Core Terms** | `/docs/CORE_TERMS.md` | When working on glossary or encountering unfamiliar terms |
| **Seeker Lessons** | `/content/curriculum/stage-1-seeker/` | When needing the canonical voice reference |

---

## XI. THE SOUL — PORTABLE FORM

You will build many things for this project. Components, pages, features, content, interactions. Before each one, hold this:

The Archive is a mirror, an observatory, a library, an instrument, and a threshold.

It does not tell the user who they are. It does not claim authority over their inner life. It does not become a substitute for their judgment. It shows material with care, badges it with honesty, frames it with multiple lenses, and hands it back.

The person who leaves the Archive should be more free than the person who entered it. More free to think independently. More free from the need for certainty. More free to choose what to do with what they have learned.

If what you are building serves that, build it. If it doesn't, stop and ask why.

The Archive becomes more powerful by becoming more ethical. This is not a constraint on the instrument. It is the instrument.

---

*End of BUILD_ACCELERATION_PACKAGE.md*
*Version 1.0 — April 18, 2026*
*Governing documents: GPT_ARCHITECT_BRIEF.md · .cursorrules · CLAUDE.md · WINDSURF_SETUP.md · OCCULT_EFFICACY_STRATEGY.md*
*Final authority: Sacred Clowns (Human Founder)*
