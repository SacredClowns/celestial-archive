"use client";

import { CandlelightCard } from "@/components/motion/candlelight-card";
import { useTraditionSettings } from "@/lib/settings/tradition-settings-context";

function Toggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-gold-dim/20 bg-ink/15 p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-amber"
      />
      <span>
        <span className="font-display text-sm text-gold-light">{label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-gold-dim">{description}</span>
      </span>
    </label>
  );
}

export function TraditionSettingsPanel() {
  const { settings, setSetting, resetSettings } = useTraditionSettings();

  return (
    <CandlelightCard className="space-y-4 rounded-sm border border-gold-dim/25 bg-ink/20 p-6">
      <div>
        <h2 className="font-display text-lg text-gold">Source tradition visibility</h2>
        <p className="mt-2 text-sm leading-relaxed text-gold-dim">
          Hide lenses you are not ready to read. Historical material always remains visible. Settings
          apply on this device only.
        </p>
      </div>
      <div className="space-y-3">
        <Toggle
          label="Traditional occult interpretations"
          description="Named practitioner traditions (○) — attributed, not endorsed as fact."
          checked={settings.showOccultLens}
          onChange={(v) => setSetting("showOccultLens", v)}
        />
        <Toggle
          label="Later traditions (Golden Dawn, Crowley, Regardie)"
          description="Post-Dee elaborations and reorganizations (△) — clearly marked as later."
          checked={settings.showLaterTraditions}
          onChange={(v) => setSetting("showLaterTraditions", v)}
        />
        <Toggle
          label="Speculative readings"
          description="Explicit conjecture (~) — imagination framed as hypothesis."
          checked={settings.showSpeculativeLens}
          onChange={(v) => setSetting("showSpeculativeLens", v)}
        />
      </div>
      <button
        type="button"
        onClick={resetSettings}
        className="font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
      >
        Reset to show all lenses
      </button>
    </CandlelightCard>
  );
}
