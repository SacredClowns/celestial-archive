export function ChamberPageHeader({
  kicker,
  title,
  children
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="space-y-4 border-b border-gold-dim/35 pb-10">
      <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">{kicker}</p>
      <h1 className="font-display text-4xl tracking-[0.08em] text-gold">{title}</h1>
      {children}
    </header>
  );
}

export function ChamberSourceNote({ children }: { children: React.ReactNode }) {
  return (
    <footer className="border-t border-gold-dim/35 pt-8 text-sm leading-[1.9] text-gold-dim">
      {children}
    </footer>
  );
}
