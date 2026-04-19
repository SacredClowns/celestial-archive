# Student Rank — Editorial Style Guide

For all future writing, editing, and expansion of Stage 2 content.

---

## Voice

The Student-rank voice is the same voice as the rest of the Archive — a careful person in a candlelit study, turning pages of something extraordinary. At Student rank, the voice becomes more precise, more structural, and slightly more demanding. It assumes the reader has already learned to hold uncertainty. It no longer introduces the concept of ambiguity; it practices it.

**Preferred tone:** Calm. Exact. Unhurried. Structurally attentive. Willing to sit with a difficult question for several paragraphs without resolving it.

**Forbidden tone:** Guru-like ("you are now ready to see..."). Mystery-box ("what you are about to discover will change..."). Congratulatory ("well done for reaching this level"). Sensational ("the shocking truth about..."). Apologetic ("this may seem complex, but..."). The material is complex. Say so plainly.

---

## Badge Discipline

### What earns a badge

**◆ Historical Evidence.** The claim can be traced to a specific primary source — a named manuscript, a dated artifact, a document in an identified collection. If you cannot point to the object, the claim is not ◆.

**◇ Strong Scholarly Consensus.** Two or more modern scholars support the claim based on their examination of the primary sources. A single scholar's opinion, however authoritative, should be attributed by name ("Asprem argues," "Laycock found") rather than badged ◇ without attribution.

**○ Traditional Occult Claim.** The claim belongs to a named tradition or practitioner. It is presented as what the tradition holds, not as what the Archive endorses. Always name the tradition.

**△ Later Interpretation.** The element was added by identifiable later hands. Name who, name when, name the grounds if known.

**◎ Parallel.** The resemblance meets all four criteria: specificity (not "religions have rituals" but a named structural pattern), documentary presence (visible in the lesson), scholarly recognition (a scholar has noted the resemblance in print), and epistemic humility (the lesson does not claim influence or shared origin). Most resemblances do not qualify. Leave them as unbadged prose.

### What should remain unbadged

Structural observations ("the Calls bridge the Watchtower system and the Aethyr cosmology"). Pedagogical framing ("this lesson exists to deliver the following sentence"). Aesthetic responses described in the reader's voice ("the words have a cadence"). Comparisons that are interesting but do not meet ◎ criteria. Anything speculative that is not explicitly marked ~.

### The cardinal rule

When in doubt, lower the badge. A ◇ that should have been ○ is a small error. A ◆ that should have been ◇ is a systemic failure. The Archive earns trust by refusing to overclaim.

---

## Handling Ambiguity

The Archive does not solve the material. It presents the material with enough clarity that the reader can see the shape of what is not known.

**Do:** State the ambiguity plainly. Name the competing positions. Badge each position. Let the reader hold the tension.

**Do not:** Resolve the ambiguity in a closing sentence. Hint at a secret answer the Archive will reveal later. Frame one position as obviously correct through rhetorical emphasis. Use the Speculative Lens to smuggle in a preferred reading.

**The test:** If a reader with strong prior commitments — a devout practitioner or a committed skeptic — feels that the Archive secretly agrees with them, the writing has failed. Both should feel slightly uncomfortable. Both should feel fairly treated.

---

## Source Strips

Every lesson ends with a `:::source-strip` directive. The source strip contains two elements:

1. **Epistemic status statement.** One sentence naming all badges used in the lesson and what they cover. This is a compressed version of the lesson's entire epistemic posture.

2. **Sources cited.** Organized by type: primary manuscripts, early printed sources, modern critical editions, modern scholarly sources, parallel/precedent sources, practitioner-scholar sources. Each entry follows standard bibliographic format. Include publisher and date. Do not invent citations.

---

## Closing Passages

Every lesson ends with a `:::closing-passage` directive. The closing passage is not a summary. It is a composed posture — a way of standing at the end of the lesson that holds everything the lesson covered without resolving it.

**Do:** Use the room metaphor (each lesson is a room in the Student's corridor). Reference the specific quality of the room (light, dark, voiced, mapped, completed, intense). Echo the central sentence. Bridge to the next lesson in one or two sentences.

**Do not:** Summarize the lesson's content in bullet-point form. Congratulate the reader. Promise revelations in the next lesson. Use the word "journey." End with a rhetorical question designed to produce awe.

---

## "Under Review" Material

If content has not completed the full pipeline (lesson → source pack → verification pass → badge audit), mark it clearly in the YAML frontmatter:

```yaml
status: draft
```

In the source strip, add: "This lesson has not yet completed the full verification pipeline. Badge placements are provisional."

Do not publish unverified content as if it were verified. The status labels are not bureaucracy. They are promises.

---

## Avoiding Mystery-Box Language

The Archive contains genuinely mysterious material. The temptation to amplify that mystery through language is constant and must be resisted.

**Forbidden constructions:**
- "What you are about to see will..."
- "The truth is stranger than..."
- "Few people realize that..."
- "Hidden within this system is..."
- "The real secret of..."
- "If you look carefully, you will notice..."
- "This changes everything."

**Preferred approach:** Describe the material. Badge the claims. Let the reader's own response to the material do the work. The Enochian system is strange enough without help.

---

## Preserving Restraint

Restraint is not the absence of feeling. It is the refusal to let feeling substitute for evidence. The Archive's most powerful moments are its most restrained — a sentence that states a fact plainly and lets the reader feel its weight without rhetorical assistance.

The test: read the sentence aloud. If it sounds like a sermon, cut it. If it sounds like a sales pitch, cut it. If it sounds like someone saying something true to someone who is listening carefully, keep it.

---

*This guide governs all Student-rank content. It supplements the master Content Voice Guide (docs/CONTENT_VOICE_GUIDE.md) and the CLAUDE.md operating rules. Where this guide and the master guide conflict, the master guide governs.*
