# ANTI_GRAVITY_IMPLEMENTATION_REVIEW_2.md

## Phase 3 Implementation Audit

**Evaluator:** Antigravity (Auditor, Design Critic, Signal Enforcer)  
**Target:** Cursor Build Pass 3 (Knowledge Web, Sidebar, Source Panels)  

---

## 1. Overall Judgment

**Pass 3 is alive, but it is currently too app-like and under-animated.**
The underlying mental model of the knowledge web is brilliant. Conceptually, the Archive is beginning to behave like a true intelligent entity. However, Cursor has defaulted to very standard React state patterns (boolean toggles causing immediate re-renders with zero transitions). The sidebar is textually rich but the interaction physics feel cheap. Rather than an ancient archive slowly yielding its secrets, it feels like clicking links in a modern dashboard.

**Verdict on core feeling:** It is successfully interconnected, but it lacks the necessary gravitational weight and contemplative pacing.

---

## 2. Sidebar Audit

* **Density:** High. The sidebar has a lot of information (`Key Glossary Terms`, `Related People`, `Related Texts`, etc.). It avoids overwhelming the reader only because of the strict `text-gold-dim` coloring, which forces it into the peripheral vision.
* **Hierarchy:** The typographic distinction between section headers (`tracking-[0.12em] text-gold-light`) and list items (`text-gold-pale`) works well. It feels like an index. 
* **Visual Quietness:** Excellent. The inscribed frames and deep backgrounds maintain the solemnity.
* **Shadow Concepts:** The `border-dashed opacity-60` styling is a solid, elegant execution of a "sneak peek" without feeling like a manipulated up-sell, but it currently lacks the explicit UX tooltip/hover ("Available after X condition") that gives it pedagogical framing.

---

## 3. Glossary Interaction Audit

* **Interruption Risk:** The terms in the text use a standard `button` with a `underline decoration-gold-dim`. This is subtly distracting. A `border-b` is better for reading flow than an `underline`. 
* **App-like vs Archival:** The click interaction sets a state which immediately mounts a `fixed inset-0` modal over the entire right side of the screen. **This is too app-like.** The transition is 0ms. It feels harsh. An archive should not instantly slap a panel over the user's view. 
* **Recommendation:** The side panel requires a `400ms ease-in-out` slide-in animation. Furthermore, hovering on the term should ideally show a miniature tooltip definition so the user never has to click to open the panel for basic context.

---

## 4. "Who Says This?" Audit

* **Claim Cards:** The inline listing of claims below the first paragraph works for a prototype, but the inline buttons within the text are the ultimate goal. The `EpistemicBadge` looks beautiful.
* **Panel Triggers:** The interaction shares the exact same modal issue as the Glossary. A harsh `setPanel` state update that covers the screen. 
* **Trustworthiness:** The data being rendered in the panel (`Who made the claim:`, `Confidence level:`, `Competing interpretation:`) is stunningly transparent and builds massive trust. But again, lacking transition physics undercuts the majesty.

---

## 5. Relationship Chain Audit

* **Meaning vs Schematic:** The implementation is extremely minimal (`{lesson.relationshipChain.join(" ? ")}`). Right now, it feels highly schematic and dry. It doesn't tell the user *how* or *why* these items relate, it just dumps a string array with question marks.
* **Subtlety:** It should remain subtle, but it needs to be an interactive path. A user should be able to hover over the connection to see the "predicate" connecting the nodes. 

---

## 6. Mobile Experience Risk

* **Current State:** The mobile implementation is acceptable only as a temporary band-aid. Hiding the entire Knowledge Web inside a generic `<details>` element positioned at the *top* of the aside (which visually ends up below the article) abandons the primary thesis of the Knowledge Web. 
* **Risk:** On mobile, the glossary and sources are virtually inaccessible during the act of reading. 
* **Immediate Fix Needed:** Mobile needs a sticky bottom-bar for currently active sources/terms, or tapping an inline term must trigger an immediate bottom-sheet modal. 

---

## 7. Next Build Priority

Cursor should prioritize **refining current archive behaviors**. Do not move on to new routes or new lessons yet.

The foundational interaction paradigm for the Knowledge Web has been laid out, but the *physics* and *mobile UX* of it are broken. If Cursor continues building forward, it will copy-paste this 0ms modal state logic into the Timeline and the Labyrinth. 

**Cursor's next objective is to polish the UX of the Side Panel and Mobile Web:**
1. Convert the 0ms React state change into a CSS-transitioned side-drawer (Desktop) and bottom-sheet (Mobile).
2. Add hover-tooltips for inline glossary terms so the user isn't forced to open a panel for a single definition.
3. Fix the shadow concept items to include their Unlock Condition on hover.

---

## 8. Final Verdict

**PROCEED WITH CORRECTIONS.** 

Stop expanding breadth. Deepen the quality of the current interactions. The reading experience must be perfected before we build more things to read.

---

# NON-NEGOTIABLES BEFORE PASS 4

1. **NO 0ms STATE CHANGES.** The Source Panel and Glossary Panel must slide in over 400ms (`ease-in-out`). Zero jarring jumps.
2. **HOVER FIRST.** The user must receive a 1-line definition of a Glossary term via hover tooltip before deciding to click and open the full panel.
3. **MOBILE REDESIGN.** The mobile sidebar cannot just be a collapsed `<details>` element at the bottom. It must be accessible while reading the text.
4. **REMOVE DEFAULT UNDERLINES.** Use `border-b` for text links instead of `underline`. `underline` cuts through descendant letters (like 'y' and 'p') and breaks the `Cormorant Garamond` typographic beauty.
