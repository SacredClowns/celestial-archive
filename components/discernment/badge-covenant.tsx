/**
 * The covenant the marks make with the reader.
 *
 * The epistemic badges exist to say where a statement gets its warrant —
 * a manuscript, a scholarly consensus, a living tradition, a later reading.
 * Left unexplained, a gold ◆ beside a dim ○ can be misread as a ranking of
 * truth, which is not what the Archive means and not what the badges do.
 * This states the limit of the marks in plain words.
 */
export function BadgeCovenant() {
  return (
    <details className="group mt-3 border-l-2 border-gold-dim/35 pl-4">
      <summary className="cursor-pointer list-none font-display text-[10px] uppercase tracking-[0.18em] text-gold-dim transition-colors hover:text-gold-light">
        How to read these marks
        <span className="ml-2 text-gold-dim/60 transition-transform group-open:inline-block" aria-hidden>
          ▾
        </span>
      </summary>
      <div className="mt-3 space-y-3 text-sm leading-[1.85] text-gold-pale/85">
        <p>
          Each mark names <em className="text-gold-light">the kind of warrant</em> standing behind a statement —
          whether it rests on a surviving manuscript, on sustained agreement among scholars, on a living
          tradition&apos;s own framework, or on a reading made long after Dee laid down his pen.
        </p>
        <p>
          They are <em className="text-gold-light">not</em> a ranking of truth, and they are not a verdict on
          anyone&apos;s experience. A statement marked as tradition is not thereby called false; it is telling you
          where it comes from and what it would take to test it. A statement marked as manuscript evidence is not
          thereby called meaningful; it is telling you that a document survives.
        </p>
        <p className="text-gold-dim italic">
          The Archive holds that the honest thing and the reverent thing are the same thing: say plainly what is
          known, say plainly what is believed, and never dress one as the other.
        </p>
      </div>
    </details>
  );
}
