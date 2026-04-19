# Stage 2 (Student) — definition of done (controlled preview)

Use this checklist before shipping or sharing a Stage 2 preview build.

---

## Route-level checks

- `/path/student` renders the six-lesson map with consistent labels and wrapping
- `/path/student/[slug]` renders for all six slugs (no 404, no blank reader column)
- Student ribbon reads **“Controlled preview — Student path”**
- Student pages show **“Controlled preview — Student rank”** ribbon
- `robots` remains off for Student routes

---

## Content checks (all six lessons)

- YAML frontmatter is present and matches registry `id` and `slug`
- `### Learning Goals` exists (split-body contract)
- `# COMPANION ELEMENTS` marker exists
- `:::closing-passage` exists
- `:::source-strip` exists
- No unsupported `:::` directive names appear
- No accidental “mystery cult” or “codebreaking app” posture creeps into prose

---

## Source Pack checks

- Each lesson’s `sourcePackFileName` exists on disk
- `sourcePackId` and `sourcePackFileName` are unique across Stage 2
- Source Pack language is honest: verification may be open, but never absent

---

## Registry checks

- Orders are sequential: 1..6
- `previousLessonId` / `nextLessonId` chains are consistent
- `comparisonRequirements` match intended demonstration rhythm
- `relationshipNodeIds` contain no empties or duplicates
- `internalPreviewOnly` is `true` for every Student lesson

---

## Validation checks

Run:

- `npm run validate:student`
- `npm test`
- `npm run build`

No failing tests is the minimum bar for sharing a preview.

---

## Visual / narrow-width checks (no redesign)

At narrow widths (≈375px):

- Index rows wrap without overlapping status labels
- Source Pack id blocks wrap (no overflow)
- Comparison captions wrap and remain readable
- No horizontal scroll appears except within the comparison fragments themselves
- Sidebar blocks stack calmly (no blank titled boxes)

---

## Screenshot checks

Screenshots of:

- Student index
- Lesson 2.2 (comparison surfaces visible)
- Any draft folio (2.3–2.6)
- Sidebar (source pack + demonstrations)

should read as **an archive in controlled preview**, not unfinished software.

