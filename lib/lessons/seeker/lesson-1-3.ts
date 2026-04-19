import type { SeekerLessonPack } from "@/lib/lessons/seeker/seeker-lesson-pack";

export const seekerLesson1_3Pack: SeekerLessonPack = {
  duration: "55–70 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "speculative", "parallel", "disputed"],
  sidebar: {
    glossaryTerms: [
      { term: "Shew-Stone", hoverDefinition: "Crystal or mirror — Kelley's visual focus", badge: "historical" },
      { term: "Holy Table", hoverDefinition: "Inscribed wooden table for the working", badge: "historical" },
      { term: "Sigillum Dei Aemeth", hoverDefinition: "Wax seal beneath the table; nine-inch disc", badge: "historical" },
      { term: "Heptarchic", hoverDefinition: "Early sevenfold hierarchy received before later tablets", badge: "historical" },
      { term: "Angelic Language", hoverDefinition: "The received speech later called Enochian", badge: "historical" },
      { term: "Parallel", hoverDefinition: "Structural resemblance without causal claim", badge: "parallel" }
    ],
    relatedPeople: [
      { name: "John Dee", role: "Recorder, examiner of the visions", lifespan: "1527–1608/9" },
      { name: "Edward Kelley", role: "Scryer", lifespan: "1555–1597" }
    ],
    relatedTexts: [
      { title: "Sloane MS 3188", author: "John Dee", year: "1581–1587", traditionColor: "Gold" },
      { title: "John Dee's Five Books of Mystery", author: "Joseph H. Peterson (ed.)", year: "2003", traditionColor: "Bronze" }
    ],
    relatedSymbols: [{ symbol: "Sigillum Dei Aemeth", description: "First full ◎ application in curriculum" }],
    relatedLessons: [
      { lesson: "Lesson 1.2: The Partnership", connection: "Roles of seer and scribe established." },
      { lesson: "Lesson 1.4: The Enochian Language Emerges", connection: "Moves from testimony to linguistic artifact." }
    ],
    timelineAnchors: [
      { date: "Spring 1582", event: "Mortlake sessions; apparatus described in this lesson" },
      { date: "1582–1583", event: "Liber Primus window in Sloane MS 3188" },
      { date: "1584 onward", event: "Continental phase; expanded transmissions" }
    ],
    relatedQuestions: [
      "Does ritual preparation make deception more or less likely — or neither?",
      "How much of the earliest material reworks manuscripts Dee already owned?"
    ],
    shadowItems: [
      { concept: "Full Heptarchic angelology", note: "Structural treatment deepens at Student rank." },
      { concept: "Solomonic comparative volumes", note: "Expanded archive comparison at Observer rank." }
    ]
  },
  glossarySurface: [
    {
      term: "Shew-Stone",
      definition: "The polished crystal or stone Kelley fixed his gaze upon during sessions.",
      category: "Instrument",
      beginnerLevel: "Seeker",
      relatedTerms: ["Scrying", "Holy Table", "Sigillum Dei Aemeth"],
      badge: "historical"
    },
    {
      term: "Holy Table",
      definition: "The inscribed wooden table on which the shew-stone rested during workings.",
      category: "Ritual furniture",
      beginnerLevel: "Seeker",
      relatedTerms: ["Sigillum Dei Aemeth", "Shew-Stone", "Scrying"],
      badge: "historical"
    },
    {
      term: "Sigillum Dei Aemeth",
      definition: "The large wax seal supporting the Holy Table; design refined across early sessions.",
      category: "Ritual structure",
      beginnerLevel: "Seeker",
      relatedTerms: ["Holy Table", "Shew-Stone", "Parallel"],
      badge: "historical"
    },
    {
      term: "Heptarchic",
      definition: "The early sevenfold angelic hierarchy received before later tablet systems.",
      category: "System phase",
      beginnerLevel: "Seeker",
      relatedTerms: ["Angelic Language", "Enochian", "Scrying"],
      badge: "historical"
    },
    {
      term: "Parallel",
      definition: "Structural similarity to another tradition or source without asserted causal descent.",
      category: "Epistemic badge",
      beginnerLevel: "Seeker",
      relatedTerms: ["Sigillum Dei Aemeth", "Later Interpretation", "Historical"],
      badge: "parallel"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-sigillum-parallel",
      claimText:
        "The Sigillum Dei Aemeth's design has medieval antecedents (e.g. Liber Juratus / Sloane MS 313 parallels).",
      tone: "parallel",
      who: "Manuscript tradition; Dee's library context",
      source: "SOURCE_PACK_3_LESSON_1_3 — parallel qualification audit",
      confidence: "Parallel (structural)",
      competingInterpretation: "Similarity does not establish how much was novelty vs. refinement of inherited forms."
    },
    {
      claimId: "claim-single-witness",
      claimText: "The documentary record of visions is structurally single-witness: Kelley saw; Dee wrote.",
      tone: "historical",
      who: "Session manuscripts",
      source: "Sloane MS 3188 et al.",
      confidence: "Historical evidence",
      competingInterpretation: "Interpretations of what Kelley saw differ; the division of roles does not."
    }
  ],
  relationshipChain: ["Preparation", "Holy Table", "Shew-Stone", "Kelley's Report", "Dee's Pen"]
};
