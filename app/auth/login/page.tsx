"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/path";
  const { configured, signInWithEmail, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");
    const { error } = await signInWithEmail(email.trim(), next);
    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }
    setStatus("sent");
    setMessage("Check your email for a sign-in link. The same account works across Old Gods and the Archive.");
  }

  if (!configured) {
    return (
      <main className="mx-auto max-w-md px-6 py-16 text-gold-pale">
        <h1 className="font-display text-2xl text-gold">Sign in</h1>
        <p className="mt-4 text-gold-pale/80">
          Supabase is not configured yet. Add your Old Gods project URL and anon key to{" "}
          <code className="text-gold-light">.env.local</code>, then restart the dev server.
        </p>
        <p className="mt-4 text-sm text-gold-dim">
          See <code>docs/SUPABASE_SETUP.md</code> for steps.
        </p>
        <Link href="/" className="mt-8 inline-block text-gold hover:text-gold-light">
          Return home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-gold-pale">
      <h1 className="font-display text-2xl text-gold">Sign in</h1>
      <p className="mt-2 text-gold-pale/70">
        Uses your existing Old Gods Supabase account. Journal, progress, and bookmarks sync when
        signed in.
      </p>

      {status === "sent" ? (
        <p className="mt-6 rounded border border-gold-dim/30 bg-deep/60 p-4 text-gold-pale">
          {message}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-gold-dim">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-gold-dim/25 bg-deep/80 px-3 py-2 text-gold-pale"
              disabled={loading}
            />
          </label>
          {status === "error" && (
            <p className="text-sm text-red-300" role="alert">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded border border-gold-dim/50 bg-gold/10 px-4 py-2 font-display text-gold hover:bg-gold/20 disabled:opacity-50"
          >
            Send magic link
          </button>
        </form>
      )}

      <Link href="/" className="mt-8 inline-block text-sm text-gold-dim hover:text-gold-light">
        Continue without signing in (local only)
      </Link>
    </main>
  );
}
