import type { RelationshipWebEdge, RelationshipWebNode } from "@/lib/relationship-web/types";

/** Canonical nodes referenced across Student rank (extend in one place). */
export const RELATIONSHIP_WEB_NODES: RelationshipWebNode[] = [
  { id: "great-table", label: "Great Table" },
  { id: "seven-kings", label: "Seven Kings" },
  { id: "seven-princes", label: "Seven Princes" },
  { id: "golden-dawn", label: "Golden Dawn" },
  { id: "crowley", label: "Crowley" }
];

/** Structural edges for sidebar / future diagrams — not a claim graph. */
export const RELATIONSHIP_WEB_EDGES: RelationshipWebEdge[] = [
  {
    id: "edge-seven-kings-seven-princes",
    fromNodeId: "seven-kings",
    toNodeId: "seven-princes",
    label: "Associated with"
  },
  {
    id: "edge-seven-kings-great-table",
    fromNodeId: "seven-kings",
    toNodeId: "great-table",
    label: "Associated in later synthesis"
  },
  {
    id: "edge-great-table-golden-dawn",
    fromNodeId: "great-table",
    toNodeId: "golden-dawn",
    label: "Reorganized in published work"
  },
  {
    id: "edge-golden-dawn-crowley",
    fromNodeId: "golden-dawn",
    toNodeId: "crowley",
    label: "Later elaboration"
  }
];

export function getRelationshipWebNodeById(id: string): RelationshipWebNode | undefined {
  return RELATIONSHIP_WEB_NODES.find((n) => n.id === id);
}

/**
 * Nodes and edges visible for a lesson: nodes are those listed; edges are both endpoints in that set.
 */
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
