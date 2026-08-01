import { GrimoireDashboard } from "@/components/grimoire/grimoire-dashboard";

export const metadata = {
  title: "Your Grimoire",
  description: "Private seeker chamber — hosts, metrics, formulae",
  robots: { index: false, follow: false }
};

export default function GrimoirePage() {
  return <GrimoireDashboard />;
}
