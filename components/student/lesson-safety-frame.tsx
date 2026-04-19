import type { ReactNode } from "react";

export type LessonSafetyFrameProps = {
    title?: string;
    children: ReactNode;
};

/**
 * A compact "how to read this room" header treatment.
 * Establishes the epistemic restraints before a high-risk structural section.
 */
export function LessonSafetyFrame({ title = "How to read this structure", children }: LessonSafetyFrameProps) {
    return (
        <aside className="my-10 border-l-2 border-gold-dim/35 pl-5 py-2" aria-label="How to read this room">
            <p className="font-display text-[9px] uppercase tracking-[0.18em] text-gold-dim/70">
                {title}
            </p>
            <div className="mt-2 max-w-reading text-[14px] italic leading-relaxed text-gold-pale/85">
                {children}
            </div>
        </aside>
    );
}

/**
 * A minimal caption for tables/grids reinforcing that arrangement does not equal proof.
 */
export function ArrangementNotProofCaption() {
    return (
        <p className="mt-3 font-display text-[9px] uppercase tracking-[0.14em] text-gold-dim/50">
            Geometric arrangement is not validation of truth.
        </p>
    );
}
