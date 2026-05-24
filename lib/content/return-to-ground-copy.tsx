import type { ReactNode } from "react";
import type { WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";

export const WATCHTOWER_HUB_GROUND = (
  <>
    <p>
      The Great Table is a large grid of letters recorded in Dee and Kelley&apos;s angelic actions (1584) and preserved
      in manuscript witnesses such as Sloane MS 3191. ◆ The tablets you explore here are <em>derivations</em> from that
      grid — not independent objects that appeared fully formed in a single session.
    </p>
    <p>
      Golden Dawn rearrangements (Mathers, c. 1890) changed elemental quarter assignments and introduced the Tablet of
      Union as a separate spirit bridge. △ When a cell glows with a name, you are seeing a <em>reading rule</em> applied
      to letters — not a photograph of an angel.
    </p>
    <p>
      You may study the structure without treating any extraction as instruction to operate. The historical question
      remains open: who compiled which layer, and what editorial hands shaped the table you are viewing?
    </p>
  </>
);

export const HIERARCHY_GROUND = (
  <>
    <p>
      The hierarchies listed here (Heptarchic kings, Seniors, kerubic angels, governors) come from named manuscript
      traditions and modern compilations — chiefly James&apos;s presentation of Dee&apos;s material and the Golden Dawn
      synthesis. ◆ They are <em>classification systems</em>, not consensus facts about what exists.
    </p>
    <p>
      Cacodemons appear alongside good angels because the source texts list them for completeness. ⚠ Listing is not
      endorsement; the Archive does not recommend invocation of any entity.
    </p>
    <p>
      If the taxonomy feels overwhelming, pause on one entity type and trace it to a single source page. The structure
      will wait.
    </p>
  </>
);

const QUADRANT_GROUND: Record<
  WatchtowerQuadrant,
  { title: string; body: ReactNode }
> = {
  air: {
    title: "The Air tablet in history",
    body: (
      <>
        <p>
          In Dee&apos;s original assignments, the eastern quarter is associated with Air. ◆ The Golden Dawn witness you
          see by default may follow Mathers&apos;s rearrangement — check the version picker before comparing to
          scholarship that cites Sloane 3191 directly.
        </p>
        <p>
          Spirit names ORO, IBAH, and AOZPI on the spirit row belong to the holy-table tradition, not to casual
          invention. ◆ They appear in the fundamental obeisance material alongside other elemental trinities.
        </p>
      </>
    )
  },
  water: {
    title: "The Water tablet in history",
    body: (
      <>
        <p>
          Western quarter tablets carry the largest editorial dispute: Dee&apos;s witnesses, Casaubon&apos;s printed
          Relation, and Golden Dawn quarter swaps do not always agree. ◆ Use version comparison before arguing from a
          single grid.
        </p>
        <p>
          Seniors read from the horizontal cross of the tablet — six names per quarter, each six letters. The highlighted
          blocks show <em>where</em> readers extract them, not proof that Kelley saw them as names in that moment.
        </p>
      </>
    )
  },
  earth: {
    title: "The Earth tablet in history",
    body: (
      <>
        <p>
          North-quarter assignments vary between traditions (Earth vs. Fire in later occult maps). △ The Archive shows
          the Golden Dawn layout by default and flags disputes in the hierarchy notes.
        </p>
        <p>
          Medicine, Stones, and Transformation angel groups in the hierarchy panel come from Book Five compilations. ◆
          Treat them as structured lists within a named source — not as independent verification of each angel&apos;s
          office.
        </p>
      </>
    )
  },
  fire: {
    title: "The Fire tablet in history",
    body: (
      <>
        <p>
          The southern quarter in Dee&apos;s framework is Fire; some printed traditions invert south and north elements. △
          Read the badge on the version you selected before importing the map into practice.
        </p>
        <p>
          The king row at the base of the tablet is one extraction among several proposed in the literature. ◆ If the
          king name does not appear as a contiguous string in this witness, the metadata still records the received
          name from the quarter summary — compare witnesses rather than assuming error.
        </p>
      </>
    )
  }
};

export function getQuadrantGround(quadrant: WatchtowerQuadrant) {
  return QUADRANT_GROUND[quadrant];
}
