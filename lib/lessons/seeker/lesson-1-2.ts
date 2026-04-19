import type { SeekerLessonPack } from "@/lib/lessons/seeker/seeker-lesson-pack";

export const seekerLesson1_2Pack: SeekerLessonPack = {
  duration: "22–28 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "speculative", "disputed"],
  sidebar: {
    glossaryTerms: [
      { term: "Scrying", hoverDefinition: "Gazing into a reflective surface to receive visions", badge: "historical" },
      { term: "Shew-Stone", hoverDefinition: "Crystal or mirror used as the scrying surface", badge: "historical" },
      { term: "Barnabas Saul", hoverDefinition: "Dee's earlier scryer, dismissed in 1582", badge: "historical" },
      { term: "Holy Table", hoverDefinition: "Inscribed wooden table used in session work", badge: "historical" },
      { term: "Sigillum Dei Aemeth", hoverDefinition: "Wax seal beneath the Holy Table", badge: "historical" },
      {
        term: "Altered State of Consciousness",
        hoverDefinition: "Broad category including trance and dissociation",
        badge: "later"
      },
      { term: "Medium", hoverDefinition: "A channel role in traditional interpretive frames", badge: "occult" },
      { term: "Dissociation", hoverDefinition: "Altered self-reference linked to trance states", badge: "later" }
    ],
    relatedPeople: [
      { name: "John Dee", role: "Scholar, recorder, operator", lifespan: "1527–1608/9" },
      { name: "Edward Kelley", role: "Scryer and contested witness", lifespan: "1555–1597" },
      { name: "Elias Ashmole", role: "Later antiquarian source witness", lifespan: "1617–1692" }
    ],
    relatedTexts: [
      { title: "Sloane MS 3188", author: "John Dee", year: "1581–1583", traditionColor: "Gold" },
      { title: "Cotton Appendix XLVI", author: "John Dee", year: "1584", traditionColor: "Gold" },
      { title: "A True & Faithful Relation", author: "Meric Casaubon", year: "1659", traditionColor: "Gold" },
      { title: "John Dee's Conversations with Angels", author: "Deborah Harkness", year: "1999", traditionColor: "Bronze" }
    ],
    relatedSymbols: [{ symbol: "Sigillum Dei Aemeth", description: "Ritual architecture anchor under the table" }],
    relatedLessons: [
      { lesson: "Lesson 1.1: The Lost Language", connection: "Background for the system they produced together." },
      { lesson: "Lesson 1.3: The First Transmissions", connection: "Begins with early outputs of the partnership." }
    ],
    timelineAnchors: [
      { date: "March 8, 1582", event: "Kelley arrives at Mortlake" },
      { date: "March 10, 1582", event: "First formal session with Dee" },
      { date: "April–July 1584", event: "Alphabet, Calls, and Watchtower era" },
      { date: "1587–1589", event: "Partnership rupture and separation" }
    ],
    relatedQuestions: [
      "Can single-witness testimony support a system-level claim?",
      "How should disputed biography affect interpretation of transmitted material?"
    ],
    shadowItems: [
      { concept: "The 1587 Incident", note: "This concept becomes visible at Observer rank." },
      { concept: "Kelley's Alchemical Second Life", note: "This concept becomes visible at Interpreter rank." }
    ]
  },
  glossarySurface: [
    {
      term: "Scrying",
      definition: "Ritualized visionary gazing used to report figures, voices, and symbolic structures.",
      category: "Practice",
      beginnerLevel: "Seeker",
      relatedTerms: ["Enochian", "Watchtower", "Aethyr"],
      badge: "historical"
    },
    {
      term: "Sigillum Dei Aemeth",
      definition: "The wax seal beneath the Holy Table, central to session architecture.",
      category: "Ritual Structure",
      beginnerLevel: "Seeker",
      relatedTerms: ["Scrying", "Watchtower", "Enochian"],
      badge: "historical"
    },
    {
      term: "Watchtower",
      definition: "The letter-grid architecture later received during the Dee–Kelley working years.",
      category: "System Architecture",
      beginnerLevel: "Seeker",
      relatedTerms: ["Enochian", "Aethyr", "Scrying"],
      badge: "historical"
    },
    {
      term: "Aethyr",
      definition: "A region in the Enochian cosmological structure, linked to later visionary mappings.",
      category: "Cosmology",
      beginnerLevel: "Seeker",
      relatedTerms: ["Watchtower", "Enochian", "Scrying"],
      badge: "historical"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-kelley-cropped-ears",
      claimText: "Kelley had cropped ears due to a forgery punishment before meeting Dee.",
      tone: "disputed",
      who: "Later antiquarian and biographical tradition",
      source: "Ashmole notes and downstream accounts; no definitive contemporary court confirmation",
      confidence: "Attested but contested",
      competingInterpretation: "Claim may be hostile gossip hardened into biography over time."
    },
    {
      claimId: "claim-partnership-asymmetry",
      claimText: "The Enochian corpus is structurally single-witness testimony through Kelley's reports.",
      tone: "historical",
      who: "Dee's session records",
      source: "Sloane and Cotton manuscripts documenting recorder-scryer role division",
      confidence: "Historical evidence",
      competingInterpretation: "Interpretive weight of this fact varies by lens, but the structural asymmetry itself is not disputed."
    }
  ],
  relationshipChain: ["Dee's Question", "Kelley's Gaze", "The Stone", "Dee's Pen", "The Archive"]
};
