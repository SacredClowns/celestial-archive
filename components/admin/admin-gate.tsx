"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAuth } from "@/lib/auth/auth-context";

export function AdminGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { configured, loading, user, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const next = searchParams.get("next") ?? "/admin";

  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, user, router, next]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { error } = await signInWithEmail(email.trim(), next);
    if (error) {
      setPhase("error");
      setMessage(error);
      return;
    }
    setPhase("sent");
    setMessage("Check your email. Command opens for keepers on the roll.");
  }

  return (
    <AdminShell title="Keeper Threshold">
      <div className="mx-auto max-w-md space-y-8">
        <p className="text-center leading-relaxed text-gold-pale/90">
          Enochia Command — CRM, newsletter, course roster, agents, and the analytics dynamo. Not the Seeker&apos;s
          Grimoire; that chamber is yours at <Link href="/grimoire" className="text-gold hover:underline">/grimoire</Link>.
        </p>
        {!configured ? (
          <CandlelightCard className="p-6 text-sm text-gold-dim">
            Configure Supabase and <code>CELESTIAL_ADMIN_EMAILS</code>.
          </CandlelightCard>
        ) : phase === "sent" ? (
          <CandlelightCard className="p-6 text-center text-gold-pale">{message}</CandlelightCard>
        ) : (
          <CandlelightCard className="p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="keeper@enochia.io"
                className="w-full border-b border-gold-dim/40 bg-transparent py-3 text-gold-pale focus:outline-none"
              />
              {phase === "error" ? <p className="text-sm text-red-300">{message}</p> : null}
              <button
                type="submit"
                className="w-full border border-gold/40 bg-gold/10 py-3 font-display text-xs uppercase tracking-[0.28em] text-gold"
              >
                Send crossing-link
              </button>
            </form>
          </CandlelightCard>
        )}
      </div>
    </AdminShell>
  );
}
