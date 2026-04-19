# ENOCHIAN: THE CELESTIAL ARCHIVE
## Human-in-Control Protocol
### v1.0 — April 15, 2026

> *No agent builds without a mandate. No content publishes without review. No architecture changes without sign-off. The human is the keeper of the vision.*

---

## I. DECISION GATE SYSTEM

### Gate 1: INFORM

**Agent acts. Human is notified afterward.**

| Applies To | Examples |
|-----------|---------|
| Trivial fixes | Typo corrections, formatting fixes, CSS adjustments |
| Documentation updates | Updating a doc to reflect a decision already made |
| Test writing | Adding tests for existing functionality |
| Dependency updates | Non-breaking package updates |

**Protocol**: Agent completes the work, logs it in the weekly report. Human reviews at next Weekly Pulse. Can revert if needed.

---

### Gate 2: REVIEW

**Agent completes the work. Human reviews before it goes live.**

| Applies To | Examples |
|-----------|---------|
| New content pages | Any new article, entity profile, or lesson |
| UI component changes | Visual changes to existing components |
| Database migrations | Schema changes to existing tables |
| Search index updates | Changes to search weighting or facets |
| New glossary entries | New terms added to the glossary |
| Bug fixes with UX impact | Fixes that change user-facing behavior |

**Protocol**: Agent completes the work in a staging/draft state. Submits for review with a summary of what changed and why. Human approves, requests changes, or rejects. Work goes live only after approval.

---

### Gate 3: APPROVE

**Agent proposes. Human approves before any work begins.**

| Applies To | Examples |
|-----------|---------|
| New features | Any feature not in the current phase's scope |
| Architecture changes | Changes to the data model, folder structure, or pillar definitions |
| Intelligence Observatory content | Any content about the nature of intelligence |
| Historical claims | Any content asserting historical facts |
| Discernment System changes | Changes to badges, lenses, or anti-dogma patterns |
| Progression system changes | Changes to ranks, requirements, or XP |
| Three.js scenes | Any new 3D implementation |
| Aethyr Journey content | Content involving visionary/psychological material |
| New agent onboarding | Adding a new AI agent to the workflow |

**Protocol**: Agent writes a proposal (what, why, how, what it affects, risks). Human reviews the proposal. Human approves, modifies, or rejects. Only after approval does work begin. The proposal and decision are logged in DECISION_LOG.md.

---

### Gate 4: CO-CREATE

**Human and agent work together in real-time. Human directs.**

| Applies To | Examples |
|-----------|---------|
| Product vision changes | Any modification to PRODUCT_VISION.md |
| Rank system redesign | Changing the rank names, sequence, or philosophy |
| New pillar definitions | Adding, removing, or fundamentally altering a pillar |
| Monetization decisions | Any decision about pricing, gating, or monetization |
| Community guidelines | Rules for community features |
| Psychological safety content | Any content that could affect seeker wellbeing |
| Public-facing messaging | Marketing copy, landing page text, app store descriptions |
| Brand identity decisions | Name, domain, logo, core visual identity changes |

**Protocol**: Human initiates the session. Agent provides options, analysis, and recommendations. Human makes decisions in real-time. All decisions are logged immediately.

---

## II. CHECKPOINT SCHEDULE

### Weekly Pulse (Every Monday)

| Item | Detail |
|------|--------|
| **Duration** | 30 minutes max |
| **Content** | What was completed last week; what's planned this week; any blockers; any drift concerns |
| **Participants** | Human + Claude (primary); other agents' work summarized by Claude |
| **Output** | Brief log entry in DECISION_LOG.md; updated task list |
| **Trigger for escalation** | Any item that doesn't match the current phase plan |

### Phase Gate (At each phase transition)

| Item | Detail |
|------|--------|
| **Duration** | As long as needed |
| **Content** | Full review of all phase deliverables; readiness assessment for next phase; unresolved decisions; risk review |
| **Process** | 1. Review all deliverables against phase goals. 2. Identify gaps. 3. Decide: proceed, extend, or restructure. 4. Update roadmap |
| **Output** | Phase completion report; next phase plan locked; any deferred items documented |
| **No-go criteria** | Any non-negotiable deliverable incomplete; any unresolved Gate 4 decision; content accuracy concerns |

### Content Review (Before any content publishes)

| Item | Detail |
|------|--------|
| **Applies to** | Every content page before it goes from "draft" to "published" |
| **Checklist** | Factual accuracy verified (Gemini report clean); Discernment badges applied correctly; Source citations present for all claims; Contemplation prompt included; "Questions This Raises" section present; Voice/tone consistent (Kimi audit clean); Cross-links working |
| **Sign-off** | Human reads the page and approves. No delegating this to agents |

### Architecture Review (Before any structural change)

| Item | Detail |
|------|--------|
| **Applies to** | Any change to data model, pillar structure, navigation, or progression system |
| **Process** | 1. Impact analysis: what does this change affect? 2. Consistency check: does it conflict with any existing documents? 3. Migration plan: what existing content/code needs updating? 4. Human approval |
| **Sign-off** | Human approves the change AND the migration plan |

### Experience Review (Before any new interaction pattern)

| Item | Detail |
|------|--------|
| **Applies to** | Any new page type, interaction pattern, or user-facing behavior |
| **Questions** | Does it serve the seeker? Does it feel consistent with the rest of the app? Does it support equilibrium (the 7 Principles)? Does it accidentally create a dark pattern? |
| **Sign-off** | Human tests the interaction and approves |

---

## III. DRIFT PREVENTION

### Scope Drift

**Detection**: Any feature request or "improvement" that isn't in MVP_SCOPE.md or the current phase plan.
**Prevention**: Gate 3 required for all new features. The question "Is this in scope?" must be answered before any work begins.
**Recovery**: If drift is detected mid-build, stop work, assess impact, and either formally add to scope (with trade-offs documented) or revert.

### Tone Drift

**Detection**: Content that doesn't match CONTENT_VOICE_GUIDE.md.
**Prevention**: Kimi audits every 20 content pages. Claude self-checks against voice samples before submitting.
**Recovery**: Flagged content is revised before publishing.

### Technical Drift

**Detection**: Code that doesn't follow the established patterns, uses unauthorized dependencies, or breaks performance budgets.
**Prevention**: Cursor runs self-audits. Claude reviews architectural consistency.
**Recovery**: Technical debt is addressed in the next sprint, not deferred indefinitely.

### Vision Drift

**Detection**: The hardest to detect. The product slowly becomes something other than what was envisioned.
**Prevention**: At every Phase Gate, PRODUCT_VISION.md and PHASE_1_MASTER_BLUEPRINT.md are re-read. Current work is evaluated: "Does this still feel like a hidden Renaissance library? Does this still teach discernment? Is this still beautiful?"
**Recovery**: Vision drift requires a Gate 4 session to realign or intentionally evolve the vision.

### Over-Building

**Detection**: Features that are more complex, polished, or expansive than the current phase requires.
**Prevention**: Every Three.js scene requires a written justification. Every feature beyond the phase plan requires a Gate 3 proposal. "Good enough for this phase" is explicitly valued.
**Recovery**: Over-built features are completed but deployment may be deferred to a later phase.

### Under-Building

**Detection**: Core principles being skipped "for now" — especially the Discernment System.
**Prevention**: The Content Review checklist includes Discernment requirements. No content publishes without badges and sources.
**Recovery**: Under-built content is not published. It is completed first.

---

## IV. DECISION LOG FORMAT

File: `docs/DECISION_LOG.md`

Each entry follows this format:

```markdown
---

## [YYYY-MM-DD] [Decision Title]

**Gate Level**: [1/2/3/4]
**Proposed By**: [Human/Claude/Cursor/etc.]
**Context**: [Why this decision was needed]
**Options Considered**:
  1. [Option A] — [pros/cons]
  2. [Option B] — [pros/cons]
  3. [Option C] — [pros/cons]
**Decision**: [What was decided]
**Rationale**: [Why]
**Impact**: [What documents/code/content needs to change]
**Decided By**: Human
**Status**: [Implemented / Pending Implementation / Superseded by [date]]
```

---

## V. EMERGENCY PROTOCOL

If an agent produces content or code that violates a core principle (presents speculation as fact, removes the Discernment System, creates psychologically unsafe content, or fundamentally misrepresents the Enochian system):

1. **Stop all related work immediately**
2. **Document the violation**: What happened, which principle was violated, what content was affected
3. **Review the root cause**: Was the agent's prompt unclear? Was a source document ambiguous? Did the agent hallucinate?
4. **Fix the content/code**: Revert or correct
5. **Update the prompt/source document**: Prevent recurrence
6. **Log in DECISION_LOG.md**: As a "Violation & Recovery" entry

---

*Control is not micromanagement. Control is the assurance that every piece of the Celestial Archive reflects the same sacred, rigorous, and beautiful intention.*
