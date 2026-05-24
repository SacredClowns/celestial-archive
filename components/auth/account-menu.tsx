"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";

export function AccountMenu() {
  const { user, loading, configured, signOut } = useAuth();

  if (!configured) {
    return null;
  }

  if (loading) {
    return <span className="text-xs text-gold-dim/40">…</span>;
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold-light"
      >
        Sign in
      </Link>
    );
  }

  const label = user.email?.split("@")[0] ?? "Account";

  return (
    <div className="flex items-center gap-2">
      <span
        className="hidden max-w-[8rem] truncate font-display text-[10px] uppercase tracking-wider text-gold-dim/70 sm:inline"
        title={user.email ?? undefined}
      >
        {label}
      </span>
      <button
        type="button"
        onClick={() => void signOut()}
        className="font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold-light"
      >
        Sign out
      </button>
    </div>
  );
}
