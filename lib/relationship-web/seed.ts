import type { RelationshipWebEdge, RelationshipWebNode } from "@/lib/relationship-web/types";

export const RELATIONSHIP_WEB_NODES: RelationshipWebNode[] = [
  { id: "dee", label: "John Dee" },
  { id: "kelley", label: "Edward Kelley" },
  { id: "enochian-system", label: "Enochian System" },
  { id: "sloane-3191", label: "Sloane MS 3191" },
  { id: "great-table", label: "Great Table" },
  { id: "seven-kings", label: "Seven Kings" },
  { id: "seven-princes", label: "Seven Princes" },
  { id: "nineteen-calls", label: "19 Angelic Calls" },
  { id: "thirty-aethyrs", label: "30 Aethyrs" },
  { id: "casaubon", label: "Méric Casaubon" },
  { id: "true-faithful-relation", label: "A True and Faithful Relation" },
  { id: "golden-dawn", label: "Golden Dawn" },
  { id: "mathers", label: "S.L. MacGregor Mathers" },
  { id: "crowley", label: "Aleister Crowley" },
  { id: "regardie", label: "Israel Regardie" },
  { id: "laycock", label: "Donald Laycock" }
];

export const RELATIONSHIP_WEB_EDGES: RelationshipWebEdge[] = [
  { id: "e-dee-kelley", fromNodeId: "dee", toNodeId: "kelley", label: "Associated with" },
  { id: "e-kelley-enochian", fromNodeId: "kelley", toNodeId: "enochian-system", label: "Appears in" },
  { id: "e-dee-enochian", fromNodeId: "dee", toNodeId: "enochian-system", label: "Derived from" },
  { id: "e-enochian-sloane", fromNodeId: "enochian-system", toNodeId: "sloane-3191", label: "Appears in" },
  { id: "e-dee-sloane", fromNodeId: "dee", toNodeId: "sloane-3191", label: "Appears in" },
  { id: "e-enochian-great-table", fromNodeId: "enochian-system", toNodeId: "great-table", label: "Associated with" },
  { id: "e-enochian-calls", fromNodeId: "enochian-system", toNodeId: "nineteen-calls", label: "Associated with" },
  { id: "e-enochian-aethyrs", fromNodeId: "enochian-system", toNodeId: "thirty-aethyrs", label: "Associated with" },
  { id: "e-seven-kings-seven-princes", fromNodeId: "seven-kings", toNodeId: "seven-princes", label: "Associated with" },
  { id: "e-seven-kings-great-table", fromNodeId: "seven-kings", toNodeId: "great-table", label: "Associated in later synthesis" },
  { id: "e-sloane-casaubon", fromNodeId: "sloane-3191", toNodeId: "casaubon", label: "Appears in" },
  { id: "e-casaubon-tfr", fromNodeId: "casaubon", toNodeId: "true-faithful-relation", label: "Derived from" },
  { id: "e-tfr-gd", fromNodeId: "true-faithful-relation", toNodeId: "golden-dawn", label: "Later elaboration" },
  { id: "e-great-table-gd", fromNodeId: "great-table", toNodeId: "golden-dawn", label: "Reorganized by" },
  { id: "e-gd-mathers", fromNodeId: "golden-dawn", toNodeId: "mathers", label: "Associated with" },
  { id: "e-golden-dawn-crowley", fromNodeId: "golden-dawn", toNodeId: "crowley", label: "Later elaboration" },
  { id: "e-crowley-regardie", fromNodeId: "crowley", toNodeId: "regardie", label: "Associated with" },
  { id: "e-laycock-enochian", fromNodeId: "laycock", toNodeId: "enochian-system", label: "Associated with" }
];

export function getRelationshipWebNodeById(id: string): RelationshipWebNode | undefined {
  return RELATIONSHIP_WEB_NODES.find((n) => n.id === id);
}

export function getRelationshipWebSlice(nodeIds: string[]): {
  nodes: RelationshipWebNode[];
  edges: RelationshipWebEdge[];
} {
  const idSet = new Set(nodeIds);
  const nodes = nodeIds
    .map((id) => getRelationshipWebNodeById(id))
    .filter((n): n is RelationshipWebNode => Boolean(n));
  const edges = RELATIONSHIP_WEB_EDGES.filter((e) => idSet.has(e.fromNodeId) && idSet.has(e.toNodeId));
  return { nodes, edges };
}
