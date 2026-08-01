import { Suspense } from "react";
import { GateOfMeasures } from "@/components/instrumentarium/gate-of-measures";

export const metadata = {
  title: "Gate of Measures · Instrumentarium",
  description: "The keeper's threshold into the Celestial Archive Instrumentarium.",
  robots: { index: false, follow: false }
};

export default function GatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center font-display text-gold-dim">
          Opening the gate…
        </div>
      }
    >
      <GateOfMeasures />
    </Suspense>
  );
}
