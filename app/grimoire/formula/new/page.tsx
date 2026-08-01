import { Suspense } from "react";
import { FormulaComposer } from "@/components/grimoire/formula-composer";

export const metadata = {
  title: "Inscribe Formula · Grimoire",
  robots: { index: false, follow: false }
};

export default function NewFormulaPage() {
  return (
    <Suspense fallback={<div className="text-gold-dim">…</div>}>
      <FormulaComposer />
    </Suspense>
  );
}
