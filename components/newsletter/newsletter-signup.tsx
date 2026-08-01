"use client";

import { FormEvent, useState } from "react";

export function NewsletterSignup({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPhase("idle");
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), source })
    });
    if (!res.ok) {
      setPhase("error");
      return;
    }
    setPhase("sent");
    setEmail("");
  }

  return (
    <div className="mt-8 border-t border-gold-dim/15 pt-8">
      <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">
        Threshold letters
      </p>
      <p className="mt-2 max-w-md text-sm text-gold-dim/70">
        Occasional notes when the instrument grows — no hype, no spam.
      </p>
      {phase === "sent" ? (
        <p className="mt-3 text-sm text-gold-pale/80">Your name is on the roll.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-3 flex max-w-md gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@threshold"
            className="min-w-0 flex-1 border-b border-gold-dim/30 bg-transparent py-2 text-sm text-gold-pale focus:border-gold/40 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
          >
            Subscribe
          </button>
        </form>
      )}
      {phase === "error" ? (
        <p className="mt-2 text-xs text-red-300/80">Could not subscribe yet — try again later.</p>
      ) : null}
    </div>
  );
}
