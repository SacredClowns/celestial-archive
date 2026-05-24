"use client";

import type { LoagaethCell, OverlayMode } from "@/lib/observatory/loagaeth-types";

export function overlayEnabled(cells: LoagaethCell[][] | "PENDING_TRANSCRIPTION" | null): cells is LoagaethCell[][] {
  return Array.isArray(cells);
}

export function LoagaethOverlayToolbar({
  overlays,
  disabled,
  onChange
}: {
  overlays: OverlayMode;
  disabled: boolean;
  onChange: (key: keyof OverlayMode) => void;
}) {
  return (
    <div className="inscribed-frame mt-6 flex flex-wrap items-center gap-2 bg-ink/20 px-4 py-3">
      <OverlayButton
        label="Letter frequency"
        pressed={overlays.frequency}
        disabled={disabled}
        onClick={() => onChange("frequency")}
      />
      <OverlayButton
        label="Symmetry analysis"
        pressed={overlays.symmetry}
        disabled={disabled}
        onClick={() => onChange("symmetry")}
      />
      <OverlayButton
        label="Repeated sequences"
        pressed={overlays.repetition}
        disabled={disabled}
        onClick={() => onChange("repetition")}
      />
      {disabled ? (
        <p className="text-xs text-gold-dim">Overlays available when cell data is transcribed.</p>
      ) : null}
    </div>
  );
}

function OverlayButton({
  label,
  pressed,
  disabled,
  onClick
}: {
  label: string;
  pressed: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`border px-3 py-1 font-display text-[10px] uppercase tracking-[0.12em] transition-opacity duration-slow ${
        pressed
          ? "border-gold text-gold-light"
          : "border-gold-dim/45 text-gold-dim"
      } ${disabled ? "cursor-not-allowed opacity-40" : "hover:text-gold-light"}`}
    >
      {label}
    </button>
  );
}
