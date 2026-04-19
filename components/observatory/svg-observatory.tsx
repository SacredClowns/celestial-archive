export function SvgObservatory() {
  return (
    <section className="inscribed-frame relative h-[360px] overflow-hidden bg-ink md:h-[440px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.06),transparent_58%)]" />

      <div className="absolute inset-0">
        {Array.from({ length: 90 }).map((_, i) => {
          const left = (i * 37) % 100;
          const top = (i * 53) % 100;
          const delay = (i % 10) * 0.8;
          return (
            <span
              key={i}
              className="absolute h-[2px] w-[2px] animate-twinkle bg-gold-light/50"
              style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
            />
          );
        })}
      </div>

      <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" role="img" aria-label="Observatory geometry">
        <defs>
          <radialGradient id="center-glow">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="250" r="140" fill="url(#center-glow)" />
        <g stroke="#c9a84c" fill="none">
          <circle cx="400" cy="250" r="170" opacity="0.18" />
          <circle cx="400" cy="250" r="130" opacity="0.28" />
          <circle cx="400" cy="250" r="92" opacity="0.35" />
        </g>
        <g stroke="#c9a84c" opacity="0.16">
          <line x1="240" y1="250" x2="560" y2="250" />
          <line x1="400" y1="90" x2="400" y2="410" />
          <line x1="285" y1="135" x2="515" y2="365" />
          <line x1="285" y1="365" x2="515" y2="135" />
        </g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-56 w-56 animate-slow-spin" role="presentation">
          <g stroke="#c9a84c" fill="none" strokeWidth="1" opacity="0.65">
            <polygon points="100,24 156,52 170,112 132,164 68,164 30,112 44,52" />
            <circle cx="100" cy="100" r="56" />
            <circle cx="100" cy="100" r="34" opacity="0.4" />
          </g>
        </svg>
      </div>

      <div className="absolute bottom-4 left-1/2 w-[88%] -translate-x-1/2 border-t border-gold-dim/25 pt-3 text-center">
        <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold-dim/50">Celestial projection</p>
      </div>
    </section>
  );
}
