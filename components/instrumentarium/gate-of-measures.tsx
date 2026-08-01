"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { Inscribe } from "@/components/motion/inscribe";
import { InstrumentariumChrome } from "@/components/instrumentarium/instrumentarium-chrome";
import { useAuth } from "@/lib/auth/auth-context";

const LINES = [
  "You stand before the inner face of the instrument.",
  "This is not the Seeker's path — it is the chamber where the Archive is tended.",
  "Present the seal that was inscribed for you at the threshold."
];

export function GateOfMeasures() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { configured, loading, user, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const next = searchParams.get("next") ?? "/instrumentarium";

  useEffect(() => {
    if (!loading && user) {
      router.replace(next);
    }
  }, [loading, user, router, next]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPhase("idle");
    const { error } = await signInWithEmail(email.trim(), next);
    if (error) {
      setPhase("error");
      setMessage(error);
      return;
    }
    setPhase("sent");
    setMessage(
      "A link has been sent. When you cross the threshold, you will return to this chamber — if your seal is on the keeper's roll."
    );
  }

  return (
    <InstrumentariumChrome
      title="Gate of Measures"
      subtitle="The wyrd door between the public Archive and the Instrumentarium — for those who tend the machine."
    >
      <div className="mx-auto max-w-lg space-y-10">
        <Inscribe>
          <div className="space-y-4 text-center sm:text-left">
            {LINES.map((line) => (
              <p key={line} className="leading-[1.95] text-gold-pale/90">
                {line}
              </p>
            ))}
          </div>
        </Inscribe>

        {!configured ? (
          <CandlelightCard className="rounded-sm border border-amber/30 bg-amber/5 p-6">
            <p className="font-display text-xs uppercase tracking-[0.16em] text-amber">The vault is not wired</p>
            <p className="mt-3 text-sm leading-relaxed text-gold-pale/80">
              Configure <code className="text-gold-light">NEXT_PUBLIC_SUPABASE_*</code> and{" "}
              <code className="text-gold-light">CELESTIAL_ADMIN_EMAILS</code> before this gate can recognize
              keepers. See <code className="text-gold-dim">docs/INSTRUMENTARIUM.md</code>.
            </p>
          </CandlelightCard>
        ) : phase === "sent" ? (
          <CandlelightCard className="rounded-sm border border-gold-dim/35 p-6 text-center">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">Seal dispatched</p>
            <p className="mt-4 leading-relaxed text-gold-pale">{message}</p>
          </CandlelightCard>
        ) : (
          <Inscribe delay={120}>
            <CandlelightCard className="rounded-sm border border-gold-dim/30 bg-ink/30 p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="keeper-email"
                    className="font-display text-[10px] uppercase tracking-[0.24em] text-gold-dim"
                  >
                    Seal of correspondence
                  </label>
                  <input
                    id="keeper-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="keeper@threshold"
                    className="mt-3 w-full border-b border-gold-dim/40 bg-transparent px-1 py-3 font-body text-lg text-gold-pale placeholder:text-gold-dim/40 focus:border-gold/60 focus:outline-none"
                  />
                </div>
                {phase === "error" ? (
                  <p className="text-sm text-red-300/90" role="alert">
                    {message}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-sm border border-gold/40 bg-gold/10 py-3 font-display text-xs uppercase tracking-[0.28em] text-gold transition-colors hover:bg-gold/20 disabled:opacity-50"
                >
                  {loading ? "Listening…" : "Send the crossing-link"}
                </button>
              </form>
              <p className="mt-6 text-center text-xs text-gold-dim/60">
                Same account as Old Gods · magic link only · no password vault
              </p>
            </CandlelightCard>
          </Inscribe>
        )}

        <p className="text-center text-sm text-gold-dim/50">
          <Link href="/path/seeker/the-lost-language" className="hover:text-gold-dim">
            Continue as Seeker in the public halls
          </Link>
        </p>
      </div>
    </InstrumentariumChrome>
  );
}
