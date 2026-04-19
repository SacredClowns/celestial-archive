# LESSON MARKDOWN AUTHORING GUIDE
## Enochian: The Celestial Archive
### v1.0 — April 18, 2026

> *This is a practical authoring manual. It tells you how to write lesson files using the canonical directive syntax. For the Archive's voice, see `/docs/CONTENT_VOICE_GUIDE.md`. For the epistemic system, see `/docs/GPT_ARCHITECT_BRIEF.md` §III–IV.*

---

## 1. QUICK START

Below is a correctly formatted lesson skeleton. Every lesson file follows this structure. Copy it, fill in the blanks, delete what doesn't apply.

```markdown
---
id: seeker-1-1
slug: the-lost-language
title: The Lost Language
stage: seeker
order: 1
lessonNumber: "Lesson 1.1"
duration: "18–25 minutes"
sourcePackId: SOURCE_PACK_1_LESSON_1_1
status: open
previousLessonId: null
nextLessonId: seeker-1-2
---

# ENOCHIAN: THE CELESTIAL ARCHIVE
## Stage 1 — Seeker
### Lesson 1.1: The Lost Language
#### v1.0 — April 18, 2026

---

# ═══════════════════════════════════════════════
# LESSON HEADER
# ═══════════════════════════════════════════════

| Field | Detail |
|-------|--------|
| **Title** | The Lost Language |
| **Stage** | 1 — Seeker |
| **Lesson Number** | 1.1 |
| **Estimated Duration** | 18–25 minutes |
| **Emotional Tone** | Wonder, arrival, grounding |
| **Required Prior Knowledge** | None |
| **Epistemic Status** | Mixed: ◆ / ◇ / ○ |
| **Content Intensity** | Level 1 — Orientation |

### Learning Goals

By the end of this lesson, the seeker will be able to:

1. [Goal one]
2. [Goal two]
3. [Goal three]

---

# ═══════════════════════════════════════════════
# OPENING SEQUENCE
# ═══════════════════════════════════════════════

[Composed image. Not a thesis. Not a summary. A scene the reader can see.]

:::notice

[Contextual frame the reader needs before proceeding.]

:::

---

# ═══════════════════════════════════════════════
# CORE LESSON CONTENT
# ═══════════════════════════════════════════════

## I. [First Section Title]

[Prose with inline badges: ◆ ◇ ○ △ ◎ ~ ? ⚠]

:::warning

[Material requiring care — a disputed claim, a sensitive topic.]

:::

## II. [Second Section Title]

[More prose.]

---

# ═══════════════════════════════════════════════
# LENSES
# ═══════════════════════════════════════════════

## ◆ Historical Lens

[Reportorial. Dates, names, manuscripts.]

## ○ Traditional Occult Lens

[Attributed. Named tradition. Never endorsed as fact.]

## △ Psychological Lens

[Respectful. Analytical. Never reductive.]

## ~ Symbolic Lens

[Structural. Conditional framing.]

## ~ Speculative Lens

[Explicitly labeled conjecture.]

---

# ═══════════════════════════════════════════════
# DISCERNMENT PRACTICE
# ═══════════════════════════════════════════════

:::discernment

[The practice. A named tool the reader is being taught or reminded of.]

:::

---

# ═══════════════════════════════════════════════
# REFLECTION PROMPTS
# ═══════════════════════════════════════════════

:::reflection

*These prompts are for your journal. There are no right answers.*

**1.** [Prompt]

:::

**2.** [Prompt]

**3.** [Prompt]

---

# ═══════════════════════════════════════════════
# KNOWLEDGE CHECK
# ═══════════════════════════════════════════════

:::knowledge-check

## Multiple Choice

**1. [Question]**
- A) [Wrong]
- B) [Correct] ✓
- C) [Wrong]
- D) [Wrong]

*[Explanation.]*

:::

---

:::multiple-interpretations

## Multiple Interpretations Exercise

**Passage**: *"[Quoted passage from the lesson.]"*

- **From the Historical Lens**: [Prompt]
- **From the Traditional Occult Lens**: [Prompt]
- **From the Psychological Lens**: [Prompt]
- **From the Speculative Lens**: [Prompt]

:::

---

# ═══════════════════════════════════════════════
# UNLOCKS
# ═══════════════════════════════════════════════

:::unlocks

## What This Lesson Opens

### Next Lesson
**Lesson X.Y: [Title]** — [One-sentence description.]

### New Glossary Terms
- **[Term]** — [Brief definition]

### New Archive Sections
- **Archive → [Section]** — [What opened]

### Skill Gained
**[Skill name]** — [One-sentence description.]

:::

---

# ═══════════════════════════════════════════════
# CLOSING PASSAGE
# ═══════════════════════════════════════════════

:::closing-passage

[Composed posture. Not a summary. Not a quiz. An image or a position the reader is left standing in.]

:::

---

:::source-strip

*Epistemic status of this lesson: ◆ Historical Evidence for verifiable events; ◇ Strong Scholarly Consensus where indicated; ○ Traditional Occult Claims clearly attributed. This lesson was reviewed against the Content Voice Guide v1.0.*

---

**Sources cited in this lesson:**

*Primary manuscript sources*

- [Source]

*Modern scholarly sources*

- [Source]

:::
```

**Key points about the skeleton:**

- YAML frontmatter goes first. Every field is required.
- The `═══` section headers are decorative separators. They mark major structural divisions. They are not directives.
- Directives (`:::name` ... `:::`) wrap special content blocks that the renderer handles differently from normal prose.
- The `:::source-strip` is always the last element in the file.
- Normal Markdown (headings, lists, tables, bold, italic) works everywhere, including inside directives.

---

## 2. FULL DIRECTIVE REFERENCE

The Archive uses nine directives. Each is opened with `:::name` on its own line and closed with `:::` on its own line. Blank lines must appear after the opening tag and before the closing tag.

---

### 2.1 `:::discernment`

**Purpose:** Wraps a formal discernment practice — a named, teachable skill the reader is learning or being reminded to use. The three Seeker practices (Source Discernment, Single-Witness Discernment, The Strange Feeling) are always delivered inside this directive. At higher ranks, existing practices return in this container when cued.

**When to use:**
- When introducing a new discernment practice for the first time
- When an existing practice is being applied to new material ("cued, not re-taught")
- When the lesson calls on the reader to perform a specific act of epistemic self-observation

**When NOT to use:**
- For general advice or tips (use `:::notice` instead)
- For cautionary material about disputed claims (use `:::warning`)
- For reflection prompts (use `:::reflection`)
- As a wrapper for every interesting observation — discernment practices are structural pedagogical tools, not decoration

**Example syntax:**

```markdown
:::discernment

## Your Second Discernment Practice: Judging People vs. Evaluating Evidence

In Lesson 1.1, you practiced separating *evidence* from *interpretation*. That was the first move.

This lesson introduces a subtler one: the separation of *judgment about a person* from *evaluation of what they produced*.

### Two Questions That Are Often Confused

**Question A**: *Was Edward Kelley a trustworthy person?*

**Question B**: *Is the Enochian system coherent, interesting, or valuable?*

[... practice continues ...]

:::
```

**Tone:** Direct, clear, and instructional — but never condescending. The reader is being given a tool, not a lecture. Second person ("you") is appropriate inside discernment blocks.

---

### 2.2 `:::notice`

**Purpose:** A contextual frame the reader needs before proceeding. A librarian's annotation — brief, important, and set apart from the prose. Not a warning; not a discernment practice; a piece of information that shapes how the reader should hold what follows.

**When to use:**
- Before a section where a single structural fact changes everything (e.g., "every letter passed through one man's perception")
- When the reader needs orientation that is not itself part of the lesson's narrative
- When a short framing note prevents a common misreading

**When NOT to use:**
- For disputed claims or sensitive material (use `:::warning`)
- For anything longer than 2–3 short paragraphs — if it's that long, it belongs in the prose
- As emphasis for a point you want to make louder — the directive is structural, not rhetorical

**Example syntax:**

```markdown
:::notice

Everything you are about to read should be held against a single fact: every letter of the Enochian alphabet, every line of the Calls, every position in the Watchtower tablets — all of it — passed through one man's perception before it reached the page. Dee wrote. Kelley saw. Dee never saw anything.

That is not a reason to dismiss the material. It is a reason to read it carefully.

:::
```

**Tone:** Calm, factual, brief. A librarian placing a card in front of a manuscript before you open it.

---

### 2.3 `:::warning`

**Purpose:** Marks material requiring intellectual, psychological, or ethical care. The `⚠` badge often appears inside these blocks, but the directive itself is the structural container. Used for disputed biographical claims, sensitive historical content, material that is frequently misrepresented, or passages where the study/practice boundary must be named.

**When to use:**
- When presenting a claim that is persistently repeated but not confirmed (e.g., Kelley's cropped ears)
- When material touches altered states, psychological intensity, or the operational dimension
- When the Archive needs to bracket material at the study/practice boundary
- When a common misattribution or distortion needs to be flagged in-place

**When NOT to use:**
- As a fear mechanism — the warning is calm, not alarming
- For general notes or context (use `:::notice`)
- For every disputed claim — only for those where the reader genuinely benefits from being slowed down before proceeding

**Example syntax:**

```markdown
:::warning

**?** A persistent claim, appearing in multiple 17th-century sources but never in Dee's own records, holds that Kelley had been convicted of forgery before meeting Dee and had been punished by having his ears cropped.

The earliest documented statement of this appears in Elias Ashmole's notes, compiled decades after Kelley's death. ◆ Ashmole was a careful antiquarian, but he was writing long after the events, and his sources for Kelley's early life are not clearly cited.

There is no surviving court record of such a conviction. ◆

:::
```

**Tone:** A careful librarian's annotation. Calm, direct, factual. Never fear-based. Never sensational. See Content Voice Guide §5 — Warnings and Discernment Notes.

---

### 2.4 `:::multiple-interpretations`

**Purpose:** A structured exercise in which the reader is given a passage and asked to read it through multiple lenses. This is the Archive's signature pedagogical move in action: the reader practices holding competing frameworks simultaneously.

**When to use:**
- In the Knowledge Check section, after the multiple-choice questions
- When a specific passage from the lesson is rich enough to sustain multi-lens reading
- When the reader has been introduced to enough lenses to make the exercise meaningful

**When NOT to use:**
- As a substitute for the Lens Sections — those present the Archive's own multi-lens analysis; this directive hands the work to the reader
- For every lesson — use it when the material genuinely supports it, not as a formula
- Without a specific quoted passage — the exercise needs a concrete anchor

**Example syntax:**

```markdown
:::multiple-interpretations

## Multiple Interpretations Exercise

Read the following passage and write a short response from each of the five frames:

**Passage**: *"On a single night in April 1584, in Kraków, Edward Kelley dictated the 21 letters of the Enochian alphabet to John Dee in reverse order."*

- **From the Historical Lens**: What does the documentary evidence confirm about this event?
- **From the Traditional Occult Lens**: How would a practitioner interpret the reverse-order transmission?
- **From the Psychological Lens**: How might cognitive performance under trance account for this?
- **From the Speculative Lens**: What does the reverse order suggest about the nature of the transmission?

*There is no single correct answer to this exercise.*

:::
```

**Tone:** Instructional and inviting. The reader is being asked to do intellectual work. Frame it as practice, not as a test.

---

### 2.5 `:::reflection`

**Purpose:** Wraps journal prompts — open-ended questions with no right answers. The Archive does not read, grade, or evaluate what the reader writes. These are invitations to self-observation.

**When to use:**
- In the Reflection Prompts section (every lesson has one)
- Wrapped around the introductory sentence and one or more prompts

**When NOT to use:**
- For knowledge-check questions that have correct answers (use `:::knowledge-check`)
- For discernment exercises that teach a specific skill (use `:::discernment`)

**Structural note:** Reflection prompts may be split across multiple `:::reflection` blocks if you want only the first prompt inside the directive and subsequent prompts outside it, or they may all live in a single block. The canonical pattern in Lesson 1.2 wraps the introductory text and first prompt in the block, with subsequent prompts as regular Markdown. Either approach is valid — pick one per lesson and be consistent.

**Example syntax:**

```markdown
:::reflection

*These prompts are for your journal. There are no right answers. The Archive does not read, grade, or evaluate what you write.*

---

**1.** Dee and Kelley were partners in a years-long working relationship that produced material neither could have produced alone. Think of a partnership you have observed where the two people brought genuinely different capacities. What did the collaboration produce that would have been impossible for either one alone?

:::
```

**Tone:** Gentle, direct, reflective. One question per prompt. Never directive about what the reader should feel or conclude. See Content Voice Guide §8 — Journal Prompts.

---

### 2.6 `:::knowledge-check`

**Purpose:** Wraps the lesson's assessment questions — multiple choice, matching, or deeper contemplation questions that have defensible answers (unlike reflection prompts). The renderer treats these as interactive quiz elements.

**When to use:**
- In the Knowledge Check section (every lesson has one)
- Around multiple-choice questions with a marked correct answer (✓)
- Around deeper contemplation questions that still have evaluable answers

**When NOT to use:**
- For open-ended reflection prompts (use `:::reflection`)
- For multi-lens exercises (use `:::multiple-interpretations`)

**Correct-answer marking:** The correct option is marked with ` ✓` after the text. An explanation follows in italics below the options.

**Example syntax:**

```markdown
:::knowledge-check

## Multiple Choice

**1. On what date did Edward Kelley arrive at Mortlake?**
- A) March 8, 1582 ✓
- B) March 10, 1582
- C) April 1, 1584
- D) July 13, 1527

*Kelley arrived on March 8. The first scrying session occurred two days later, on March 10.*

:::
```

**Tone:** The questions test recall and comprehension but are framed as mirrors, not gatekeepers. Explanations are informative, not corrective.

---

### 2.7 `:::unlocks`

**Purpose:** Declares what completing this lesson opens in the Archive — the next lesson, new glossary terms, new Archive sections, and skills gained. The renderer uses this block to drive the progression system.

**When to use:**
- In the Unlocks section (every lesson has one)
- Always contains four subsections: Next Lesson, New Glossary Terms, New Archive Sections, Skill Gained

**When NOT to use:**
- Anywhere other than the Unlocks section
- Never use gamified language inside this block — no "Congratulations," no "Level up," no XP

**Example syntax:**

```markdown
:::unlocks

## What This Lesson Opens

### Next Lesson
**Lesson 1.3: The First Transmissions** — The Heptarchic System and the opening years of the Enochian corpus.

### New Glossary Terms
- **Shew-Stone** — The crystal or obsidian instrument used as the scrying surface
- **Holy Table** — The inscribed wooden table on which the shew-stone was placed

### New Archive Sections
- **Archive → Figures → Edward Kelley** — Full biography
- **Timeline → Era 3: The Mortlake and Continental Sessions** — Now populated

### Skill Gained
**Reading the ? (Disputed) Badge** — You can now identify the **?** badge and understand its role.

:::
```

**Tone:** Declarative, clean, factual. Describe what opens. Do not celebrate.

---

### 2.8 `:::closing-passage`

**Purpose:** Wraps the lesson's final composed image — the posture the reader is left standing in. This is not a summary, not a conclusion, not a call to action. It is the emotional resolution of the lesson's arc.

**When to use:**
- At the end of every lesson, after the Companion Elements section
- Exactly once per lesson

**When NOT to use:**
- As a wrapper for any other kind of closing content (summaries, next-lesson teasers)
- More than once in a lesson

**Example syntax:**

```markdown
:::closing-passage

On the night of March 10, 1582, Edward Kelley sat down in front of a crystal and began to describe what he saw. John Dee sat a short distance away, pen in hand, and wrote down every word.

[... the composed image continues ...]

The stone is on the table. Kelley is looking into it. Dee is waiting, pen ready.

The next lesson is what came out.

:::
```

**Tone:** Plain language for emotional moments. Restraint carries weight. Beauty comes from specificity, not from adjectives. See Content Voice Guide §4, Principle 11: "Earn Every Emotional Moment."

---

### 2.9 `:::source-strip`

**Purpose:** The lesson's epistemic footer — a summary of which badges were used, followed by a complete bibliography organized by source type. This is always the final element in the file.

**When to use:**
- At the very end of every lesson, after the closing passage
- Exactly once per lesson, as the final block

**When NOT to use:**
- Anywhere other than the end of the file
- Never omit it — every lesson ships with a source strip

**Example syntax:**

```markdown
:::source-strip

*Epistemic status of this lesson: ◆ Historical Evidence for verifiable events; ◇ Strong Scholarly Consensus where indicated; ○ Traditional Occult Claims clearly attributed; △ Later Interpretations named; ~ Speculative readings explicitly marked. This lesson was reviewed against the Content Voice Guide v1.0.*

---

**Sources cited in this lesson:**

*Primary manuscript sources*

- Dee, John. *Mysteriorum Libri Quinti* (Sloane MS 3188), British Library.

*Early printed sources*

- Casaubon, Meric. *A True & Faithful Relation* (London, 1659).

*Modern scholarly sources*

- Harkness, Deborah. *John Dee's Conversations with Angels* (Cambridge University Press, 1999).
- Peterson, Joseph H. *John Dee's Five Books of Mystery* (Weiser Books, 2003).

:::
```

**Source categories** (use all that apply, in this order):
1. Primary manuscript sources
2. Early printed sources
3. Material artifacts
4. Modern scholarly sources
5. Parallel/precedent sources

**Tone:** Scholarly apparatus. No commentary. Just the record.

---

## 3. NESTING RULES

Directives **cannot be nested** inside other directives. The parser reads the first `:::` after an opening `:::name` as the close of that block. Attempting to nest will produce broken output.

**Allowed:**
- Normal Markdown inside any directive (headings, lists, tables, bold, italic, code blocks, horizontal rules)
- Badge glyphs (◆ ◇ ○ △ ◎ ~ ? ⚠) inline in any directive's prose
- Multiple directives in sequence, each opened and closed separately

**Not allowed:**
- `:::warning` inside `:::discernment`
- `:::reflection` inside `:::knowledge-check`
- `:::notice` inside `:::closing-passage`
- Any `:::name` inside any other `:::name`

**What to do instead:** If you need a warning inside a discernment section, close the discernment block, place the warning, then reopen a new discernment block (or fold the warning content into the discernment prose without a directive wrapper).

**Example — wrong:**

```markdown
:::discernment

This practice asks you to hold two questions separately.

:::warning

Be aware that this claim is disputed.

:::

Now continue with the practice.

:::
```

The parser will read the first `:::` (closing the warning) as the close of the discernment block. The remaining `:::` becomes an orphan.

**Example — correct:**

```markdown
:::discernment

This practice asks you to hold two questions separately.

**⚠ Note:** Be aware that this claim is disputed. (See the "Who Says This?" panel below.)

Now continue with the practice.

:::
```

Or, if the warning truly needs its own visual treatment:

```markdown
:::discernment

This practice asks you to hold two questions separately.

:::

---

:::warning

Be aware that this claim is disputed.

:::

---

:::discernment

Now continue with the practice.

:::
```

---

## 4. BADGE RULES INSIDE DIRECTIVES

Epistemic badges appear inline in lesson prose — the same way inside directives as outside them. They are Unicode glyphs placed directly in the text.

### The Eight Badges

| Glyph | Name | Usage |
|:---:|------|-------|
| ◆ | Historical Evidence | After or before a claim citing a primary source |
| ◇ | Strong Scholarly Consensus | After or before a claim supported by 2+ modern scholars |
| ○ | Traditional Occult Claim | After or before a claim attributed to a named tradition |
| △ | Later Interpretation | After or before a claim naming a post-Dee tradition |
| ◎ | Parallel | After or before a structural resemblance meeting the four qualification criteria |
| ~ | Speculative | Before a conjecture or thought experiment |
| ? | Disputed / Contested | Before or after a claim where sources conflict |
| ⚠ | Caution | Before material requiring care |

### Placement Rules

**Rule 1: Every factual claim gets a badge.** No exceptions. Inside or outside a directive.

**Rule 2: Badges go inline, adjacent to the claim they modify.**

Good:
```markdown
Dee recorded sessions in Sloane MS 3188. ◆
```

Good:
```markdown
◆ Dee recorded sessions in Sloane MS 3188.
```

Bad:
```markdown
Dee recorded sessions in Sloane MS 3188.

◆
```

The badge must be on the same line as, or directly adjacent to, the claim. Never on its own line separated by a blank line.

**Rule 3: Badge at sentence end is the default position.** Place the badge after the period when the entire sentence is a single claim. Place the badge mid-sentence only when a sentence contains multiple claims with different badges.

```markdown
He was born in Worcester in 1555, though the exact date is not recorded. ◇ The year is accepted on the basis of later statements by Kelley and by Ashmole.
```

**Rule 4: Leading badges for warnings and disputes.** The `?` and `⚠` badges often appear at the start of their claim, especially when they open a `:::warning` block.

```markdown
:::warning

**?** A persistent claim holds that Kelley had been convicted of forgery.

:::
```

**Rule 5: Bold badges when introducing them for the first time.** When a badge is being taught to the reader (its first appearance in the curriculum), bold it and name it:

```markdown
**?** — **Disputed / Contested Claim**. *This claim is attested but contested.*
```

After introduction, use the bare glyph.

**Rule 6: Badge conservatively.** If uncertain between ◆ and ◇, choose ◇. Between ◇ and ○, choose ○. Never promote a badge without Source Pack justification.

**Rule 7: Badges inside `:::source-strip` are summative.** The source strip names which badges appeared in the lesson. It does not badge individual claims.

---

## 5. MIGRATION EXAMPLES

The Seeker lessons were written across two formatting generations. Lesson 1.1 uses the old style; Lesson 1.2 uses the canonical directive syntax. Here is how to migrate.

### Example A: Reflection Prompts

**Old style (Lesson 1.1):**

```markdown
# ═══════════════════════════════════════════════
# REFLECTION PROMPTS
# ═══════════════════════════════════════════════

*These prompts are for your journal. There are no right answers.*

---

**1.** Before you read this lesson, what did you expect Enochian Magick to be?

**2.** Of the four lenses presented, which did you find most compelling on first reading?
```

**Canonical directive syntax:**

```markdown
# ═══════════════════════════════════════════════
# REFLECTION PROMPTS
# ═══════════════════════════════════════════════

:::reflection

*These prompts are for your journal. There are no right answers.*

---

**1.** Before you read this lesson, what did you expect Enochian Magick to be?

:::

**2.** Of the four lenses presented, which did you find most compelling on first reading?
```

**What changed:** The `:::reflection` / `:::` wrapper was added around the introductory text and first prompt. The `═══` section header stays — it is a structural division, not a directive. Subsequent prompts may remain outside the block.

---

### Example B: Knowledge Check

**Old style (Lesson 1.1):**

```markdown
# ═══════════════════════════════════════════════
# KNOWLEDGE CHECK
# ═══════════════════════════════════════════════

## Multiple Choice

**1. When was John Dee born?**
- A) 1487
- B) 1527 ✓
- C) 1555
- D) 1582

*Dee was born on July 13, 1527, in Tower Ward, London.*
```

**Canonical directive syntax:**

```markdown
# ═══════════════════════════════════════════════
# KNOWLEDGE CHECK
# ═══════════════════════════════════════════════

:::knowledge-check

## Multiple Choice

**1. When was John Dee born?**
- A) 1487
- B) 1527 ✓
- C) 1555
- D) 1582

*Dee was born on July 13, 1527, in Tower Ward, London.*

:::
```

**What changed:** The entire quiz block is wrapped in `:::knowledge-check` / `:::`. All questions and explanations live inside the directive.

---

### Example C: Closing Passage + Source Strip

**Old style (Lesson 1.1):**

```markdown
# ═══════════════════════════════════════════════
# CLOSING PASSAGE
# ═══════════════════════════════════════════════

In 1583, during a scrying session, the angel said to Dee: *"I am the daughter of Fortitude..."*

[... passage continues ...]

---

*Epistemic status of this lesson: ◆ Historical Evidence for all factual claims...*

---

**Sources cited in this lesson:**

- Dee, John. *Mysteriorum Libri Quinti* (Sloane MS 3188), British Library
```

**Canonical directive syntax:**

```markdown
# ═══════════════════════════════════════════════
# CLOSING PASSAGE
# ═══════════════════════════════════════════════

:::closing-passage

In 1583, during a scrying session, the angel said to Dee: *"I am the daughter of Fortitude..."*

[... passage continues ...]

:::

---

:::source-strip

*Epistemic status of this lesson: ◆ Historical Evidence for all factual claims...*

---

**Sources cited in this lesson:**

- Dee, John. *Mysteriorum Libri Quinti* (Sloane MS 3188), British Library

:::
```

**What changed:** The closing passage is wrapped in `:::closing-passage` / `:::`. The epistemic status and bibliography are wrapped together in `:::source-strip` / `:::`. The source strip is now a named block the renderer can locate and style.

---

### Migration Checklist

When converting an old-style lesson to canonical directive syntax:

1. Add `:::notice` around any contextual framing notes that precede core content
2. Add `:::warning` around any `⚠` or `?` flagged material that was previously inline
3. Add `:::discernment` around the formal discernment practice section
4. Add `:::reflection` around the reflection prompts (at minimum the introductory text + first prompt)
5. Add `:::knowledge-check` around all quiz questions
6. Add `:::multiple-interpretations` around any multi-lens reading exercise
7. Add `:::unlocks` around the unlocks section
8. Add `:::closing-passage` around the closing composed image
9. Add `:::source-strip` around the epistemic status line and bibliography
10. Verify no directives are nested inside other directives
11. Verify every directive has both an opening `:::name` and a closing `:::`
12. Leave `═══` section headers untouched — they are not directives

---

## 6. COMMON MISTAKES

### Mistake 1: Forgetting the closing `:::`

```markdown
:::notice

This is important context.

## Next Section

This is regular prose.
```

**Problem:** Without the closing `:::`, everything after the opening tag is consumed by the directive — including the next section header.

**Fix:** Always close every directive with `:::` on its own line.

---

### Mistake 2: Nesting directives

```markdown
:::discernment

Practice this:

:::warning

Note: this claim is disputed.

:::

Continue practicing.

:::
```

**Problem:** The parser reads the warning's `:::` as the close of the discernment block. See §3 Nesting Rules.

**Fix:** Use inline formatting (`**⚠ Note:**`) inside the directive, or break into sequential blocks.

---

### Mistake 3: Missing blank line after opening tag

```markdown
:::notice
This text starts immediately.
:::
```

**Problem:** Some parsers require a blank line after `:::name`. Always include one for safety.

**Fix:**

```markdown
:::notice

This text starts after a blank line.

:::
```

---

### Mistake 4: Using `:::` as a horizontal rule

```markdown
Some text.

:::

More text.
```

**Problem:** An orphaned `:::` that doesn't close any directive is ambiguous. The parser may interpret it as a stray closer or ignore it unpredictably.

**Fix:** Use `---` for horizontal rules. Reserve `:::` exclusively for directive open/close.

---

### Mistake 5: Putting badges on their own line, separated from the claim

```markdown
Dee's diaries record the session format.

◆

This confirms the collaborative nature of the record.
```

**Problem:** The badge is visually detached from the claim it modifies. The renderer cannot associate it with the right sentence.

**Fix:** `Dee's diaries record the session format. ◆`

---

### Mistake 6: Using gamified language inside `:::unlocks`

```markdown
:::unlocks

## Congratulations! You've Unlocked:

🎉 **New Badge: Disputed Claims Master!**

You're now Level 2!

:::
```

**Problem:** Violates the Archive's Ten Commandments (§XI.5 of GPT_ARCHITECT_BRIEF.md). No congratulations, no levels, no celebration emoji.

**Fix:** "You have reached the threshold of Student." / "The following are now available in the Archive."

---

### Mistake 7: Writing a summary instead of a composed image in `:::closing-passage`

```markdown
:::closing-passage

In this lesson, we covered John Dee's background, Edward Kelley's biography, the mechanics of scrying, the asymmetry of the partnership, and five interpretive lenses. In the next lesson, we will examine the first transmissions.

:::
```

**Problem:** This is a summary, not a closing passage. The closing passage is a composed posture — an image the reader is left standing in. See Content Voice Guide §8 and §4 Principle 8: "Let Silence Do Work."

**Fix:** End with a scene, a question, or an image. Not with a recap.

---

### Mistake 8: Omitting the `:::source-strip` entirely

**Problem:** Every lesson ships with a source strip. It is structural, not optional. Without it, the lesson has no epistemic footer and no bibliography.

**Fix:** Always include `:::source-strip` as the final block, even if the source list is short.

---

### Mistake 9: Placing `:::source-strip` before `:::closing-passage`

```markdown
:::source-strip
[sources]
:::

:::closing-passage
[composed image]
:::
```

**Problem:** The source strip is always last. The closing passage is the last piece of *content* the reader encounters; the source strip is the scholarly apparatus that follows it.

**Fix:** `:::closing-passage` → `:::source-strip`. Always in that order.

---

### Mistake 10: Using directives for regular prose sections

```markdown
:::core-content

## I. Who Was Edward Kelley?

The difficulty begins with his name.

:::
```

**Problem:** `:::core-content` is not a recognized directive. The nine directives listed in §2 are the only ones. Core lesson content, lens sections, companion elements, and the "Who Says This?" tables are regular Markdown under `═══` section headers.

**Fix:** Use `═══` section headers and normal Markdown for everything that is not one of the nine directives.

---

### Mistake 11: Using Markdown code fences instead of directive syntax

```markdown
```discernment
Practice separating evidence from interpretation.
```
```

**Problem:** Code fences (triple backtick) render as code blocks, not as styled directive containers. Directives use the `:::name` / `:::` syntax.

**Fix:** `:::discernment` ... `:::` (no backticks).

---

### Mistake 12: Putting the `═══` decorative header inside a directive

```markdown
:::knowledge-check

# ═══════════════════════════════════════════════
# KNOWLEDGE CHECK
# ═══════════════════════════════════════════════

## Multiple Choice
...
:::
```

**Problem:** The `═══` header is a structural division of the lesson file. It lives *outside* the directive — it is the section container, and the directive is the special content block within that section.

**Fix:**

```markdown
# ═══════════════════════════════════════════════
# KNOWLEDGE CHECK
# ═══════════════════════════════════════════════

:::knowledge-check

## Multiple Choice
...
:::
```

---

## QUICK REFERENCE CARD

| Directive | Appears in Section | Once per Lesson? | Contains |
|-----------|-------------------|-----------------|----------|
| `:::notice` | Opening Sequence or Core Content | No (use as needed) | Brief contextual framing |
| `:::warning` | Core Content (disputed/sensitive material) | No (use as needed) | Disputed claims, study/practice boundary |
| `:::discernment` | Discernment Practice | Usually once | Formal pedagogical practice |
| `:::reflection` | Reflection Prompts | Usually once | Journal prompts, no right answers |
| `:::knowledge-check` | Knowledge Check | Once | Quiz questions with correct answers |
| `:::multiple-interpretations` | Knowledge Check (sub-section) | Once | Multi-lens reading exercise |
| `:::unlocks` | Unlocks | Once | Next lesson, glossary, sections, skills |
| `:::closing-passage` | Closing Passage | Once | Composed image, not summary |
| `:::source-strip` | End of file | Once, always last | Epistemic status + bibliography |

---

*This document governs the formatting of all lesson files in the Celestial Archive. It is a practical manual, not a philosophy document. When in doubt, open `STAGE_1_SEEKER_LESSON_2.md` — that file is the canonical reference for directive syntax in action.*
