"use client";

import { usePathname } from "next/navigation";
import { ReturnToGround } from "@/components/discernment/return-to-ground";
import { RecordDiscoveryButton } from "@/components/discovery/record-discovery-button";
import { getQuadrantGround } from "@/lib/content/return-to-ground-copy";
import type { WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";

const VALID: WatchtowerQuadrant[] = ["air", "water", "earth", "fire"];

export function QuadrantGroundSection() {
  const pathname = usePathname();
  const segment = pathname.split("/").pop() ?? "";
  if (!VALID.includes(segment as WatchtowerQuadrant)) return null;

  const quadrant = segment as WatchtowerQuadrant;
  const ground = getQuadrantGround(quadrant);

  return (
    <>
      <ReturnToGround title={ground.title}>{ground.body}</ReturnToGround>
      <div className="flex flex-wrap items-center gap-4 border-t border-gold-dim/20 pt-6">
        <RecordDiscoveryButton
          kind="pattern"
          title={`${quadrant} tablet — layout or name`}
          note="Recorded while studying the watchtower grid."
          href={`/watchtowers/${quadrant}`}
        />
      </div>
    </>
  );
}
