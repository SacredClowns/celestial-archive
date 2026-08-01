import { InstrumentariumDashboard } from "@/components/instrumentarium/instrumentarium-dashboard";

export const metadata = {
  title: "Instrumentarium · Keeper's Chamber",
  description: "Systems tending chamber for the Celestial Archive.",
  robots: { index: false, follow: false }
};

export default function InstrumentariumPage() {
  return <InstrumentariumDashboard />;
}
