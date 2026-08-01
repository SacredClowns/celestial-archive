"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { Inscribe } from "@/components/motion/inscribe";
import { InstrumentariumChrome } from "@/components/instrumentarium/instrumentarium-chrome";
import { INSTRUMENTARIUM_DOMAINS } from "@/lib/instrumentarium/domains";
import type { InstrumentariumStatus } from "@/lib/instrumentarium/gather-status";
import { useAuth } from "@/lib/auth/auth-context";

type StatusPayload = InstrumentariumStatus & {
  viewer?: { email: string | null; id: string | null };
};

type SessionLogEntry = {
  at: string;
  action: string;
};

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${ok ? "bg-gold/80 shadow-[0_0_8px_rgba(201,168,76,0.5)]" : "bg-red-400/70"}`}
      aria-hidden
    />
  );
}

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gold-dim/15 py-2 text-sm last:border-0">
      <dt className="text-gold-dim">{label}</dt>
      <dd className="font-mono text-gold-light">{value}</dd>
    </div>
  );
}

function DomainPanel({
  domainId,
  children
}: {
  domainId: (typeof INSTRUMENTARIUM_DOMAINS)[number]["id"];
  children: ReactNode;
}) {
  const domain = INSTRUMENTARIUM_DOMAINS.find((d) => d.id === domainId)!;
  return (
    <CandlelightCard className="h-full rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">
            {domain.sysadminAnalogue}
          </p>
          <h2 className="mt-1 font-display text-lg text-gold">
            <span className="mr-2 opacity-60">{domain.glyph}</span>
            {domain.title}
          </h2>
        </div>
      </div>
      <p className="mb-4 text-xs italic text-gold-dim/80">{domain.description}</p>
      {children}
    </CandlelightCard>
  );
}

export function InstrumentariumDashboard() {
  const { user, loading, configured, signOut } = useAuth();
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [fetchState, setFetchState] = useState<"idle" | "loading" | "forbidden" | "error">("idle");
  const [sessionLog, setSessionLog] = useState<SessionLogEntry[]>([]);

  const log = useCallback((action: string) => {
    setSessionLog((prev) => [
      { at: new Date().toISOString(), action },
      ...prev.slice(0, 24)
    ]);
  }, []);

  const refresh = useCallback(async () => {
    setFetchState("loading");
    log("Invoked status oracle");
    try {
      const res = await fetch("/api/instrumentarium/status", { cache: "no-store" });
      if (res.status === 403) {
        setFetchState("forbidden");
        setStatus(null);
        return;
      }
      if (!res.ok) {
        setFetchState("error");
        return;
      }
      const data = (await res.json()) as StatusPayload;
      setStatus(data);
      setFetchState("idle");
      log("Measures received");
    } catch {
      setFetchState("error");
      log("Oracle failed");
    }
  }, [log]);

  useEffect(() => {
    if (!loading && user && configured) {
      void refresh();
    }
  }, [loading, user, configured, refresh]);

  if (!configured) {
    return (
      <InstrumentariumChrome title="Instrumentarium" subtitle="Keeper's chamber — configuration required.">
        <p className="text-gold-pale/80">Supabase is not configured on this deployment.</p>
      </InstrumentariumChrome>
    );
  }

  if (loading) {
    return (
      <InstrumentariumChrome title="Instrumentarium" subtitle="The measures are being read…">
        <p className="animate-pulse font-display text-sm uppercase tracking-[0.3em] text-gold-dim">Aligning…</p>
      </InstrumentariumChrome>
    );
  }

  if (!user) {
    return (
      <InstrumentariumChrome title="Instrumentarium" subtitle="No seal presented.">
        <p className="mb-6 text-gold-pale/80">The chamber is closed until you cross the Gate of Measures.</p>
        <Link
          href="/instrumentarium/gate?next=/instrumentarium"
          className="inline-block rounded-sm border border-gold/40 px-6 py-2 font-display text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold/10"
        >
          Go to the Gate
        </Link>
      </InstrumentariumChrome>
    );
  }

  if (fetchState === "forbidden") {
    return (
      <InstrumentariumChrome
        title="Sealed Chamber"
        subtitle="Your seal is recognized by the vault, but not inscribed on the keeper's roll."
      >
        <div className="mx-auto max-w-lg space-y-6 text-center">
          <p className="leading-relaxed text-gold-pale/85">
            Signed in as <span className="text-gold">{user.email}</span>. Access to the Instrumentarium requires{" "}
            <code className="text-gold-light">CELESTIAL_ADMIN_EMAILS</code> on the server.
          </p>
          <p className="text-sm text-gold-dim">
            You may still walk the Seeker&apos;s path — this room is for those who tend the machine.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link href="/path" className="text-sm text-gold hover:underline">
              Initiation Path
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="text-sm text-gold-dim hover:text-gold"
            >
              Withdraw seal
            </button>
          </div>
        </div>
      </InstrumentariumChrome>
    );
  }

  const allTablesOk = status?.supabase.tables.every((t) => t.reachable) ?? false;

  return (
    <InstrumentariumChrome
      title="Instrumentarium"
      subtitle="The Celestial Archive — systems tending chamber. Inspired by the keeper's craft; not a generic dashboard."
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gold-dim/20 pb-6">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">Active keeper</p>
          <p className="font-mono text-sm text-gold-light">{status?.viewer?.email ?? user.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={fetchState === "loading"}
            className="rounded-sm border border-gold-dim/40 px-4 py-2 font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim hover:border-gold/50 hover:text-gold disabled:opacity-50"
          >
            {fetchState === "loading" ? "Reading…" : "Refresh measures"}
          </button>
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-sm border border-gold-dim/25 px-4 py-2 font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim/70 hover:text-gold"
          >
            Withdraw
          </button>
        </div>
      </div>

      {fetchState === "error" ? (
        <p className="mb-6 text-sm text-red-300/90">The status oracle did not answer. Check session and server logs.</p>
      ) : null}

      {status ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Inscribe>
            <DomainPanel domainId="vigil">
              <dl className="space-y-0">
                <MetricRow label="Environment" value={status.environment} />
                <MetricRow label="Node" value={status.nodeVersion} />
                <MetricRow label="Package" value={`v${status.packageVersion}`} />
                <MetricRow
                  label="Supabase"
                  value={status.supabase.configured ? "Configured" : "Absent"}
                />
                <MetricRow
                  label="Overall"
                  value={allTablesOk && status.supabase.configured ? "Vigilant" : "Attention"}
                />
              </dl>
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={60}>
            <DomainPanel domainId="measures">
              <dl className="space-y-0">
                <MetricRow label="Seeker folios" value={status.content.seekerLessons} />
                <MetricRow label="Student folios" value={status.content.studentLessons} />
                <MetricRow label="Curriculum .md" value={status.content.curriculumMarkdown} />
                <MetricRow label="Archive .md" value={status.content.archiveMarkdown} />
                <MetricRow
                  label="Search index"
                  value={status.content.searchIndexEntries ?? "—"}
                />
              </dl>
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={120}>
            <DomainPanel domainId="vault">
              <ul className="space-y-2">
                {status.supabase.tables.map((t) => (
                  <li key={t.name} className="flex items-center gap-3 font-mono text-xs text-gold-pale">
                    <StatusDot ok={t.reachable} />
                    {t.name}
                  </li>
                ))}
              </ul>
              {status.supabase.projectHost ? (
                <p className="mt-4 text-xs text-gold-dim">Host: {status.supabase.projectHost}</p>
              ) : null}
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={180}>
            <DomainPanel domainId="seals">
              <dl className="space-y-0">
                <MetricRow
                  label="Admin allowlist"
                  value={status.admin.allowlistConfigured ? "Inscribed" : "Not set"}
                />
                <MetricRow label="Viewer id" value={status.viewer?.id?.slice(0, 8) ?? "—"} />
              </dl>
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={240}>
            <DomainPanel domainId="glyphs">
              <dl className="space-y-0">
                <MetricRow
                  label="NEXT_PUBLIC_SUPABASE_URL"
                  value={status.supabase.configured ? "Present" : "Missing"}
                />
                <MetricRow label="CELESTIAL_ADMIN_EMAILS" value={status.admin.allowlistConfigured ? "Set" : "Missing"} />
                <MetricRow label="Generated" value={new Date(status.generatedAt).toLocaleString()} />
              </dl>
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={300}>
            <DomainPanel domainId="constellation">
              <ul className="space-y-2 text-sm">
                {status.constellation.map((c) => (
                  <li key={c.href}>
                    {c.kind === "external" ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline"
                      >
                        {c.label} ↗
                      </a>
                    ) : (
                      <Link href={c.href} className="text-gold hover:underline">
                        {c.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={360}>
            <DomainPanel domainId="rites">
              <ul className="space-y-3">
                {status.rites.map((r) => (
                  <li key={r.id} className="rounded-sm border border-gold-dim/20 bg-deep/40 px-3 py-2">
                    <code className="text-xs text-gold-light">{r.command}</code>
                    <p className="mt-1 text-xs text-gold-dim">{r.note}</p>
                  </li>
                ))}
              </ul>
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={420}>
            <DomainPanel domainId="scrolls">
              <p className="mb-3 text-xs text-gold-dim">Session echoes (this browser)</p>
              <ul className="max-h-48 space-y-1 overflow-y-auto font-mono text-[10px] text-gold-pale/80">
                {sessionLog.length === 0 ? (
                  <li className="text-gold-dim">No rites logged yet.</li>
                ) : (
                  sessionLog.map((e, i) => (
                    <li key={`${e.at}-${i}`}>
                      <span className="text-gold-dim/60">{e.at.slice(11, 19)}</span> — {e.action}
                    </li>
                  ))
                )}
              </ul>
            </DomainPanel>
          </Inscribe>

          <Inscribe delay={480}>
            <DomainPanel domainId="lenses">
              <ul className="space-y-2 text-sm text-gold-pale">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      log("Copied verify command");
                      void navigator.clipboard?.writeText("npm run verify:supabase");
                    }}
                    className="text-left text-gold hover:underline"
                  >
                    Copy: npm run verify:supabase
                  </button>
                </li>
                <li>
                  <Link href="/auth/login?next=/instrumentarium" className="text-gold hover:underline">
                    Re-authenticate via public login
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/awesome-foss/awesome-sysadmin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    awesome-sysadmin reference ↗
                  </a>
                </li>
              </ul>
            </DomainPanel>
          </Inscribe>
        </div>
      ) : (
        <p className="text-gold-dim">Awaiting measures…</p>
      )}
    </InstrumentariumChrome>
  );
}
