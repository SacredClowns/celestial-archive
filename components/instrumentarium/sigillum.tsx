/** Heptagonal seal motif — echoes Sigillum Dei without claiming historical accuracy. */
export function Sigillum({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`instrumentarium-sigil ${className}`}
      aria-hidden
    >
      <polygon
        points="60,8 102,32 102,88 60,112 18,88 18,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.5"
      />
      <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.6" />
      {[0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 60 + 44 * Math.cos(rad - Math.PI / 2);
        const y = 60 + 44 * Math.sin(rad - Math.PI / 2);
        return <circle key={deg} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.45" />;
      })}
      <text
        x="60"
        y="64"
        textAnchor="middle"
        className="fill-gold font-display text-[7px] tracking-[0.2em]"
        opacity="0.7"
      >
        AEMETH
      </text>
    </svg>
  );
}
