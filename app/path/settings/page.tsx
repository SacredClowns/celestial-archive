import Link from "next/link";
import { TraditionSettingsPanel } from "@/components/settings/tradition-settings-panel";
import { PathProgressDashboard } from "@/components/path/path-progress-dashboard";

export const metadata = {
  title: "Settings · Initiation Path",
  description: "Rank, progress, and how much later tradition material to show in lessons."
};

export default function PathSettingsPage() {
  return (
    <section className="page-enter mx-auto max-w-[720px] space-y-10">
      <header className="space-y-3 border-b border-gold-dim/35 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">Initiation Path</p>
        <h1 className="font-display text-4xl text-gold">Settings</h1>
        <p className="leading-[1.9] text-gold-pale">
          Your rank and lesson progress, plus which interpretive lenses appear in curriculum pages.
        </p>
        <Link
          href="/path"
          className="inline-block font-display text-xs uppercase tracking-[0.14em] text-gold-dim hover:text-gold"
        >
          ← Back to path
        </Link>
      </header>

      <PathProgressDashboard />
      <TraditionSettingsPanel />
    </section>
  );
}
