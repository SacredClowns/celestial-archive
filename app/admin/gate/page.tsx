import { Suspense } from "react";
import { AdminGate } from "@/components/admin/admin-gate";

export const metadata = {
  title: "Keeper Threshold · Enochia Admin",
  robots: { index: false, follow: false }
};

export default function AdminGatePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gold-dim">…</div>}>
      <AdminGate />
    </Suspense>
  );
}
