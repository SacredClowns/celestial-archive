"use client";

import type { ReactNode } from "react";
import { useId } from "react";

export type InteractiveGridCellStatus =
  | "uncertain"
  | "missing"
  | "reconstructed"
  | "disputed"
  | "comparison";

export type InteractiveGridCell =
  | string
  | {
    char: string;
    /** Epistemic or pedagogical state of identifying the cell */
    status?: InteractiveGridCellStatus;
    /** Legacy fallback (treated as uncertain) */
    muted?: boolean;
  };

export type InteractiveGridProps = {
  rows: number;
  columns: number;
  /** Row-major: length rows, each row length columns */
  cells: InteractiveGridCell[][];
  /**
   * `loagaeth` — muted, no selection affordance that implies a key exists.
   * `comparison` — optional cell focus for structural comparison only.
   */
  variant?: "loagaeth" | "comparison";
  /** When variant is `comparison`, optional keyboard-accessible focus */
  selected?: { row: number; col: number } | null;
  onSelectCell?: (row: number, col: number) => void;
  className?: string;
  "aria-label"?: string;
  /** Optional corner caption (e.g. table index) */
  caption?: ReactNode;
  /**
   * When `variant` is `loagaeth`, subtle border hover on cells (visual only; cells remain `aria-hidden`).
   * No click handlers — not a decryption surface.
   */
  loagaethAmbientHover?: boolean;
};

function cellChar(c: InteractiveGridCell): string {
  if (typeof c === "string") return c;
  return c.char;
}

function getCellStatus(c: InteractiveGridCell, variant: "loagaeth" | "comparison"): InteractiveGridCellStatus | undefined {
  if (variant === "loagaeth") return "uncertain";
  if (typeof c === "object" && c.status) return c.status;
  if (typeof c === "object" && c.muted) return "uncertain";
  return undefined;
}



function getStatusClasses(status?: InteractiveGridCellStatus): string {
  switch (status) {
    case "uncertain":
      return "border-dashed border-gold-dim/30 bg-ink/30 text-gold-dim/60 italic";
    case "missing":
      return "border-dotted border-gold-dim/20 bg-transparent text-transparent/0";
    case "reconstructed":
      return "border-gold-dim/40 bg-parchment/10 text-gold-pale/80";
    case "disputed":
      return "border-gold-dim/30 bg-ink/40 text-gold-dim/70 underline decoration-gold-dim/50 decoration-dotted underline-offset-2";
    case "comparison":
      return "border-gold-dim/30 bg-ink/50 text-gold-dim/80";
    default:
      return "border-gold-dim/45 bg-deep/90 text-gold-pale/90";
  }
}

/**
 * 2D letter grid for Student-rank structural surfaces.
 * No WebGL. Opacity transitions only (Archive motion limits).
 */
export function InteractiveGrid({
  rows,
  columns,
  cells,
  variant = "comparison",
  selected,
  onSelectCell,
  className = "",
  "aria-label": ariaLabel,
  caption,
  loagaethAmbientHover = false
}: InteractiveGridProps) {
  const ro = Math.max(1, rows);
  const co = Math.max(1, columns);
  const isLoagaeth = variant === "loagaeth";
  const uid = useId();
  const gridId = `${uid}-interactive-grid-desc`;

  return (
    <figure className={`space-y-3 ${className}`}>
      {caption ? (
        <figcaption className="max-w-prose text-pretty text-sm leading-relaxed text-gold-dim">{caption}</figcaption>
      ) : null}
      <p id={gridId} className="sr-only">
        {isLoagaeth
          ? "Letter grid shown as manuscript fragment. The Archive does not resolve or decode this grid here."
          : "Structural letter grid for comparison. Cell selection highlights geometry only; it is not evidence of meaning."}
      </p>
      {isLoagaeth ? (
        <div
          role="img"
          aria-label={ariaLabel ?? "Unresolved letter grid fragment"}
          aria-describedby={gridId}
          className={`inline-block border border-gold-dim/20 bg-parchment/40 p-2 opacity-80`}
        >
          <div
            aria-hidden
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${co}, minmax(1.75rem, 2rem))`,
              gridTemplateRows: `repeat(${ro}, minmax(1.75rem, 2rem))`,
              gap: "1px"
            }}
          >
            {cells.slice(0, ro).map((row, r) =>
              row.slice(0, co).map((cell, c) => {
                const ch = cellChar(cell);
                const status = getCellStatus(cell, variant);
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`flex items-center justify-center border font-mono text-[11px] tracking-tight transition-colors duration-slow ease-gravity ${getStatusClasses(status)} ${loagaethAmbientHover ? "hover:border-gold-dim/60 hover:bg-ink/55" : ""}`}
                  >
                    {ch || "\u00a0"}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="inline-block border border-gold-dim/25 bg-parchment/50 p-2">
          <div
            role="grid"
            aria-label={ariaLabel ?? "Letter grid"}
            aria-describedby={gridId}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${co}, minmax(1.75rem, 2rem))`,
              gridTemplateRows: `repeat(${ro}, minmax(1.75rem, 2rem))`,
              gap: "1px"
            }}
          >
            {cells.slice(0, ro).map((row, r) =>
              row.slice(0, co).map((cell, c) => {
                const ch = cellChar(cell);
                const status = getCellStatus(cell, variant);
                const isSelected = selected?.row === r && selected?.col === c;
                const interactive = typeof onSelectCell === "function";
                return (
                  <div
                    key={`${r}-${c}`}
                    role={interactive ? "gridcell" : undefined}
                    tabIndex={interactive ? (isSelected ? 0 : -1) : undefined}
                    aria-selected={interactive ? isSelected : undefined}
                    onClick={interactive ? () => onSelectCell(r, c) : undefined}
                    onKeyDown={
                      interactive
                        ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectCell(r, c);
                          }
                        }
                        : undefined
                    }
                    className={[
                      "flex items-center justify-center border font-mono text-[11px] tracking-tight transition-opacity duration-slow ease-gravity",
                      getStatusClasses(status),
                      isSelected ? "ring-1 ring-gold/50 ring-offset-0" : "",
                      interactive ? "cursor-pointer outline-none hover:border-gold-dim/70" : ""
                    ].join(" ")}
                  >
                    {ch || "\u00a0"}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </figure>
  );
}
