import { describe, expect, it } from "vitest";
import { getGridHighlightMap } from "@/lib/watchtowers/grid-highlights";
import { getTabletByQuadrant } from "@/lib/watchtowers/watchtower-data";

describe("getGridHighlightMap", () => {
  it("marks spirit god-names on the air tablet row 7", () => {
    const tablet = getTabletByQuadrant("air", "golden-dawn");
    const map = getGridHighlightMap("air", tablet.grid, tablet);

    expect(map[6][0].labels.some((l) => l.includes("ORO") || l.includes("Spirit"))).toBe(true);
    expect(map[6][5].labels.some((l) => l.includes("AHAOZPI") || l.includes("Spirit"))).toBe(true);
  });

  it("marks senior cross blocks on rows 3–5", () => {
    const tablet = getTabletByQuadrant("air", "golden-dawn");
    const map = getGridHighlightMap("air", tablet.grid, tablet);

    const crossCell = map[3][1];
    expect(
      crossCell.kind === "senior-cross" ||
        crossCell.labels.some((l) => l.includes("Senior"))
    ).toBe(true);
  });
});
