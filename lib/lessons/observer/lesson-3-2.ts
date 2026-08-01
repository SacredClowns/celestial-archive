import type { ObserverLessonPack } from "@/lib/lessons/observer/observer-lesson-pack";

/** Sidebar, glossary surface and claim panels for Lesson 3.2 — body text lives in markdown only. */
export const observerLesson3_2Pack: ObserverLessonPack = {
  duration: "50–65 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "speculative", "disputed", "caution"],
  verificationNote:
    "Draft folio in controlled preview. The four extracts are composite paraphrase illustrating documented kinds of moment — not folio transcriptions — and the folio-level audit is still open in Source Pack OBSERVER 3.2. Read them as reconstructions, and do not quote them as manuscript text.",
  sidebar: {
    glossaryTerms: [
      { term: "Percipient", hoverDefinition: "The person who perceives — in these sessions, Kelley alone", badge: "historical" },
      { term: "Shew-stone", hoverDefinition: "Dee's usual term for the scrying instrument", badge: "historical" },
      { term: "Two-Witness Interdependence", hoverDefinition: "Two witnesses who continuously shape each other, so neither is an independent check", badge: "consensus" },
      { term: "Interaction Map", hoverDefinition: "A reading tool: who initiates, who redirects, who records", badge: "consensus" },
      { term: "Collaborative Creativity", hoverDefinition: "A psychological framework for material generated jointly and experienced as external", badge: "later" },
      { term: "Single-Witness Discernment", hoverDefinition: "The problem that a claim resting on one observer cannot be independently checked", badge: "consensus" }
    ],
    relatedPeople: [
      { name: "Edward Kelley", role: "The percipient — the only man who reported seeing", lifespan: "1555–1597" },
      { name: "John Dee", role: "The recorder — the only man whose text survives", lifespan: "1527–1608/9" },
      { name: "Jane Dee", role: "The household the sessions were conducted inside", lifespan: "c.1555–1604" },
      { name: "Deborah Harkness", role: "The sessions in their domestic and intellectual world", lifespan: "b. 1965" },
      { name: "Susan Bassnett", role: "Cautious biographical treatment of Kelley", lifespan: "b. 1945" }
    ],
    relatedTexts: [
      { title: "Mysteriorum Libri Quinti (Sloane MS 3188)", author: "John Dee", year: "1581–1583", traditionColor: "Gold" },
      { title: "Working papers (Cotton Appendix XLVI)", author: "John Dee", year: "1583–1587", traditionColor: "Gold" },
      { title: "Private Diary (Ashmole MS 487)", author: "John Dee", year: "1577–1601", traditionColor: "Gold" },
      { title: "John Dee's Five Books of Mystery", author: "Joseph H. Peterson", year: "2003", traditionColor: "Bronze" },
      { title: "John Dee's Conversations with Angels", author: "Deborah Harkness", year: "1999", traditionColor: "Bronze" }
    ],
    relatedSymbols: [
      { symbol: "Sigillum Dei Aemeth", description: "The wax seals beneath the table's feet and under the stone — the apparatus that made a session repeatable" },
      { symbol: "The shew-stone", description: "BM SLCups.232 — the instrument only one man looked into" }
    ],
    relatedLessons: [
      { lesson: "Lesson 1.3: The First Transmissions", connection: "Where Single-Witness Discernment was introduced; here it becomes a dyad." },
      { lesson: "Lesson 3.1: The Ink on the Page", connection: "The surfaces between manuscript and reader; this folio moves to the surfaces between the two men." },
      { lesson: "Lesson 3.3: The Architecture Observed", connection: "The same discipline turned on structures rather than sessions." }
    ],
    timelineAnchors: [
      { date: "March 8, 1582", event: "Kelley arrives at Mortlake — the partnership begins" },
      { date: "1582–1583", event: "The Mortlake sessions: seals, table, Heptarchic material" },
      { date: "1583–1587", event: "The continental years — different room, different pressures" },
      { date: "1659", event: "Casaubon prints the sessions inside his own frame" },
      { date: "2003", event: "Peterson's critical edition supplies the modern apparatus" }
    ],
    relatedQuestions: [
      "What happens in the room when the vision is unclear — and who shapes the answer?",
      "Does a preserved contradiction tell you about the recorder, the percipient, or the source?",
      "Can a procedure improve fidelity and increase entanglement at the same time?"
    ],
    shadowItems: [
      { concept: "The 1587 instruction", note: "Named in this folio; opened in a dedicated node with room to treat it carefully." },
      { concept: "Operative procedure", note: "Described, never instructed — that belongs to a document with a different duty of care." }
    ]
  },
  glossarySurface: [
    {
      term: "Percipient",
      definition: "The person who perceives. In the Enochian sessions the percipient is Kelley, and no one else reports seeing what he reports.",
      category: "Session Study",
      beginnerLevel: "Observer",
      relatedTerms: ["Shew-stone", "Two-Witness Interdependence", "Single-Witness Discernment"],
      badge: "historical"
    },
    {
      term: "Two-Witness Interdependence",
      definition: "The condition in which two witnesses continuously shape each other's contribution, so that neither can serve as an independent check on the other.",
      category: "Discernment",
      beginnerLevel: "Observer",
      relatedTerms: ["Percipient", "Single-Witness Discernment", "Interaction Map"],
      badge: "consensus"
    },
    {
      term: "Interaction Map",
      definition: "A reading tool for session pages: name who initiated an exchange, who redirected it, and who recorded it.",
      category: "Method",
      beginnerLevel: "Observer",
      relatedTerms: ["Two-Witness Interdependence", "Percipient"],
      badge: "consensus"
    },
    {
      term: "Collaborative Creativity",
      definition: "A psychological framework describing material generated jointly by two people in a structured setting and experienced by both as arriving from outside. Offered with named limits, never as diagnosis.",
      category: "Interpretive Framework",
      beginnerLevel: "Observer",
      relatedTerms: ["Two-Witness Interdependence"],
      badge: "later"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-kelley-reluctance",
      claimText: "Kelley repeatedly resisted the work — expressing fear, moral objection, and the claim that the spirits were deceiving them.",
      tone: "historical",
      who: "The session diaries, recorded by Dee",
      source: "Sloane MS 3188; Cotton Appendix XLVI; Peterson (2003); Harkness (1999)",
      confidence: "Historical Evidence — well attested across years",
      competingInterpretation:
        "Read by the tradition as an honest instrument reporting strain, and by sceptics as a performer's hedge. The record shows the resistance; it does not adjudicate the motive."
    },
    {
      claimId: "claim-preserved-contradiction",
      claimText: "The diaries frequently preserve contradictions and corrections rather than deleting them.",
      tone: "historical",
      who: "Observable in the manuscripts and the critical edition",
      source: "Sloane MS 3188; Peterson (2003) apparatus",
      confidence: "Historical Evidence",
      competingInterpretation:
        "Speaks to Dee's diligence as a recorder. It does not transfer to Kelley's sincerity, nor to the reality of the source."
    },
    {
      claimId: "claim-no-direct-vision-record",
      claimText: "No surviving document records a vision directly; the diaries record what Kelley said about what he saw.",
      tone: "historical",
      who: "The documentary situation itself",
      source: "Sloane MS 3188; Cotton Appendix XLVI",
      confidence: "Historical Evidence — structural, not contested",
      competingInterpretation:
        "Equally true whether the visions were exactly as reported or entirely absent; it constrains what any reading can claim."
    },
    {
      claimId: "claim-folie-a-deux-framework",
      claimText: "Folie à deux is used here as a framework for mutually reinforcing belief, explicitly not as a diagnosis of either man.",
      tone: "caution",
      who: "The Archive, about its own method",
      source: "General clinical and historiographical objection to retrospective diagnosis",
      confidence: "Disclosed limitation",
      competingInterpretation:
        "Retrospective diagnosis of historical figures is rejected by clinicians and historians alike; the evidence is textual, partial and four centuries removed."
    }
  ],
  relationshipChain: ["Edward Kelley", "The shew-stone", "John Dee", "Sloane MS 3188", "The Reader"]
};
