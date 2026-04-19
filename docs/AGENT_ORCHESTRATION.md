# ENOCHIAN: THE CELESTIAL ARCHIVE
## Agent Orchestration Plan
### v1.0 — April 15, 2026

> *This document governs how multiple AI systems collaborate on the Celestial Archive without stepping on each other, drifting from the vision, or producing inconsistent work.*

---

## I. CORE PRINCIPLE

**One vision, one architect, one human authority.**

All agents serve the same product vision (PRODUCT_VISION.md). All agents receive their instructions from the same source documents. All agents report their work to the human for review. No agent overrides another agent's decisions without human mediation.

---

## II. AGENT ROLES

### CLAUDE (Anthropic — Opus/Sonnet)
**Role**: Principal Architect & Content Lead

| Attribute | Detail |
|-----------|--------|
| **Owns** | Product architecture, content strategy, research writing, curriculum design, philosophical content (Intelligence Observatory, Discernment System), documentary scripts, Aethyr Journey content, content model, information architecture |
| **Produces** | Architecture documents, content markdown/JSON, research briefs, prompt engineering for other agents, quality standards |
| **Reviews** | All content written by other agents before publication; Cursor's implementation of content display; any architectural changes proposed by any agent |
| **Does Not** | Write production code for the app; make final visual design decisions; deploy to production; implement Three.js scenes |
| **Communication Style** | Receives full context briefs with references to source documents. Produces structured markdown with clear sections. Always includes source citations and epistemic status |
| **Failure Mode to Watch** | Overwriting when told to be brief; philosophical tangents that delay production; not flagging when asked to do something that contradicts the source documents |

### CURSOR (AI Code Editor)
**Role**: Lead Developer & Design System Builder

| Attribute | Detail |
|-----------|--------|
| **Owns** | Frontend codebase, component library, design system implementation, API routes, database migrations, responsive design, performance optimization |
| **Produces** | React components, Next.js pages, Tailwind configurations, Supabase queries, interactive features (map, timeline, quiz engine) |
| **Reviews** | Its own code quality (linting, testing); performance benchmarks; accessibility compliance |
| **Does Not** | Write or modify content; change the data model without Claude's review; alter the Discernment System's behavior; make UX decisions about how content is presented without human approval |
| **Communication Style** | Receives task briefs with file paths, component specs, and acceptance criteria. References DATA_MODEL.md and VISUAL_DIRECTION.md for all styling and data decisions |
| **Failure Mode to Watch** | Implementing features not in MVP_SCOPE.md; making "minor UX improvements" that actually change how content is consumed; CSS that drifts from the design tokens |

### ANTIGRAVITY (3D / Creative Tooling)
**Role**: Immersive Experience Specialist

| Attribute | Detail |
|-----------|--------|
| **Owns** | Three.js scenes, 3D assets, shaders, camera systems, particle effects, 3D performance optimization |
| **Produces** | Embeddable Three.js components, 3D scene files, performance reports, 2D fallback specifications |
| **Reviews** | 3D performance on target hardware; visual consistency with the design language; loading time budgets |
| **Does Not** | Touch any 2D UI; modify content; change navigation; implement features outside of 3D scenes; skip the 2D fallback requirement |
| **Communication Style** | Receives concept briefs with reference imagery, interaction specs, and performance budgets. Delivers self-contained Three.js components with documented APIs |
| **Failure Mode to Watch** | Scope creep (making scenes more elaborate than specified); breaking performance budgets; creating experiences that can't be reduced to 2D fallbacks; treating 3D as primary rather than enhancement |

### GEMINI (Google)
**Role**: Research Verifier & Cross-Reference Engine

| Attribute | Detail |
|-----------|--------|
| **Owns** | Fact verification, source cross-referencing, manuscript comparison, bibliography completeness |
| **Produces** | Fact-check reports, annotated corrections, source suggestions, contradiction flags, "missing coverage" reports |
| **Reviews** | All content Claude produces, checking for: factual accuracy, unsupported claims, missing attributions, contradictions between pages, bibliography gaps |
| **Does Not** | Write final content (voice/tone may differ); make architecture decisions; resolve disputes (that's the human's job); rewrite Claude's content without flagging changes |
| **Communication Style** | Receives content batches to review. Returns structured reports in a standard format: VERIFIED / CORRECTION NEEDED / ADDITIONAL SOURCE FOUND / CONTRADICTION WITH [page] / UNSUPPORTED CLAIM |
| **Failure Mode to Watch** | Presenting its own interpretation as a "correction"; conflating scholarly consensus with certainty; not distinguishing between "I can't verify this" and "this is wrong" |

### KIMI (Moonshot AI)
**Role**: Content Editor & Consistency Auditor

| Attribute | Detail |
|-----------|--------|
| **Owns** | Content consistency, voice and tone compliance, cross-content coherence, Discernment System compliance (badges applied correctly), structural completeness |
| **Produces** | Consistency audit reports, voice/tone deviation flags, structural gap analyses, badge compliance checks, cross-link verification |
| **Reviews** | Content batches for: consistent voice/tone, correct use of Discernment badges, structural completeness (does every page have sources? questions? prompts?), cross-linking accuracy |
| **Does Not** | Create original content; change content meaning; modify architecture; make philosophical decisions about the Intelligences Framework |
| **Communication Style** | Receives the full content corpus (or large batches) with the CONTENT_VOICE_GUIDE.md and EXPERIENCE_PRINCIPLES.md as reference. Returns line-by-line edit suggestions and compliance reports |
| **Failure Mode to Watch** | Homogenizing content (making everything sound the same vs. maintaining a consistent voice with appropriate variation); flagging stylistic choices as "errors"; not understanding that some inconsistency is intentional (e.g., different traditions should sound different in the Multi-Lens Viewer) |

---

## III. HANDOFF PROTOCOLS

### Content Creation Flow

```
HUMAN (decides what to build)
  │
  ▼
CLAUDE (writes content draft)
  │
  ├──► GEMINI (fact-checks draft) ──► returns report to CLAUDE
  │
  ▼
CLAUDE (incorporates corrections, flags disputes)
  │
  ▼
HUMAN (resolves disputes, approves content)
  │
  ▼
KIMI (audits for consistency, badges, structure)
  │
  ▼
CLAUDE (incorporates edits)
  │
  ▼
HUMAN (final approval)
  │
  ▼
CURSOR (implements in the app)
  │
  ▼
HUMAN (reviews implementation)
```

### Feature Development Flow

```
HUMAN (defines feature from FEATURE_LIST.md)
  │
  ▼
CLAUDE (writes spec: component behavior, data requirements, content integration)
  │
  ▼
HUMAN (approves spec)
  │
  ▼
CURSOR (implements feature)
  │
  ├──► [if Three.js involved] ──► ANTIGRAVITY (implements 3D component) ──► CURSOR (integrates)
  │
  ▼
HUMAN (reviews implementation)
  │
  ▼
KIMI (verifies content displays correctly)
  │
  ▼
HUMAN (final approval)
```

### Architecture Change Flow

```
ANY AGENT (proposes change)
  │
  ▼
CLAUDE (evaluates impact against source documents)
  │
  ▼
HUMAN (decides: approve / reject / modify)
  │
  ▼
CLAUDE (updates relevant source documents)
  │
  ▼
ALL AFFECTED AGENTS (notified of change)
```

---

## IV. COMMUNICATION TEMPLATES

### Task Brief (Human → Agent)

```markdown
## Task: [descriptive title]
**Agent**: [Claude/Cursor/Antigravity/Gemini/Kimi]
**Gate Level**: [1-Inform / 2-Review / 3-Approve / 4-Co-Create]
**Source Documents**: [list of relevant docs]
**Acceptance Criteria**:
  - [specific, testable criteria]
**Constraints**:
  - [what NOT to do]
**Deliverable Format**: [markdown / JSON / React component / report]
**Deadline**: [date or "when ready"]
```

### Verification Report (Gemini → Claude)

```markdown
## Fact-Check Report: [content title]
**Pages Reviewed**: [count]
**Status**: [Clean / Issues Found]

### Verified Claims
- [claim]: ✓ Confirmed via [source]

### Corrections Needed
- [claim]: ✗ [what's wrong] → Suggested correction: [correction] (Source: [source])

### Additional Sources Found
- [source] may be relevant to [section]

### Contradictions Detected
- [page A] says X, but [page B] says Y. These are inconsistent.

### Unsupported Claims
- [claim] has no source cited and I cannot verify it independently
```

### Consistency Audit (Kimi → Claude)

```markdown
## Consistency Audit: [batch title]
**Pages Reviewed**: [count]
**Reference Docs**: CONTENT_VOICE_GUIDE.md, EXPERIENCE_PRINCIPLES.md

### Voice/Tone
- [page]: Deviates at [section] — [describe deviation]

### Discernment Badges
- [page]: Missing badge on [claim]
- [page]: Badge should be [X] not [Y] because [reason]

### Structural Completeness
- [page]: Missing "Sources" section
- [page]: Missing "Questions This Raises" section
- [page]: No contemplation prompt included

### Cross-Link Issues
- [page] references [entity] but no link exists
- [page] links to [page] which doesn't exist yet
```

---

## V. CONFLICT RESOLUTION

When agents disagree (most commonly: Gemini flags something Claude wrote as inaccurate):

1. **Claude reviews Gemini's correction** — is the correction valid? Does it have a better source?
2. **If Claude agrees**: Correction is incorporated. No human needed.
3. **If Claude disagrees**: Both positions are documented and sent to Human.
4. **Human decides**: The decision is logged in DECISION_LOG.md.
5. **The losing position may still be noted**: If both positions are scholarly defensible, the content may present both as competing views (using the Discernment System).

**Principle**: Agent disagreements are valuable. They often surface genuine scholarly disputes that should be reflected in the content rather than artificially resolved.

---

## VI. AGENT ONBOARDING

When starting a new conversation with any agent, include in the system prompt or first message:

```
You are working on ENOCHIAN: THE CELESTIAL ARCHIVE.
Your role is: [role from Section II]
Governing documents (in priority order):
1. PHASE_1_MASTER_BLUEPRINT.md (master plan)
2. EXPERIENCE_PRINCIPLES.md (UX constitution)
3. PRODUCT_VISION.md (north star)
4. [role-specific doc: DATA_MODEL.md for Cursor, etc.]

Key constraints:
- Never present speculation as fact
- Always use epistemic status badges
- The human is the final authority on all decisions
- Check MVP_SCOPE.md before building anything not listed
```

---

*The orchestra produces beautiful music only when every instrument knows its part, its timing, and its conductor.*
