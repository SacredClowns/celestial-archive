"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { AdminShell } from "@/components/admin/admin-shell";
import { ADMIN_AGENTS } from "@/lib/admin/agents-registry";
import type { AdminDashboardSnapshot } from "@/lib/admin/crm-types";
import type { CrmContact, CourseEnrollment, NewsletterSubscriber } from "@/lib/admin/crm-types";
import { useAuth } from "@/lib/auth/auth-context";

type Tab = "overview" | "crm" | "newsletter" | "course" | "agents" | "content";

type DashboardPayload = AdminDashboardSnapshot & {
  viewer?: { email: string };
  serviceRoleConfigured?: boolean;
};

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-sm border border-gold-dim/25 bg-deep/40 p-4">
      <p className="font-display text-[10px] uppercase tracking-[0.18em] text-gold-dim">{label}</p>
      <p className="mt-2 font-display text-3xl text-gold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-gold-dim/70">{hint}</p> : null}
    </div>
  );
}

export function AdminDashboard() {
  const { user, loading, configured, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [snapshot, setSnapshot] = useState<DashboardPayload | null>(null);
  const [contacts, setContacts] = useState<CrmContact[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [jobs, setJobs] = useState<Record<string, unknown>[]>([]);
  const [contentPieces, setContentPieces] = useState<Record<string, unknown>[]>([]);
  const [gate, setGate] = useState<"loading" | "ok" | "forbidden" | "unauth" | "error">("loading");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/dashboard", { cache: "no-store" });
      if (res.status === 403) {
        setGate("forbidden");
        return;
      }
      if (res.status === 401) {
        setGate("unauth");
        return;
      }
      if (!res.ok) {
        setGate("error");
        return;
      }
      setSnapshot((await res.json()) as DashboardPayload);
      setGate("ok");

      const [c, n, e, j, p] = await Promise.all([
        fetch("/api/admin/crm/contacts"),
        fetch("/api/admin/newsletter"),
        fetch("/api/admin/enrollments"),
        fetch("/api/admin/agents/jobs"),
        fetch("/api/admin/content")
      ]);
      if (c.ok) setContacts(((await c.json()) as { contacts: CrmContact[] }).contacts);
      if (n.ok) setSubscribers(((await n.json()) as { subscribers: NewsletterSubscriber[] }).subscribers);
      if (e.ok) setEnrollments(((await e.json()) as { enrollments: CourseEnrollment[] }).enrollments);
      if (j.ok) setJobs(((await j.json()) as { jobs: Record<string, unknown>[] }).jobs);
      if (p.ok) setContentPieces(((await p.json()) as { pieces: Record<string, unknown>[] }).pieces);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user && configured) void refresh();
    else if (!loading && !user) setGate("unauth");
  }, [loading, user, configured, refresh]);

  async function addContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/admin/crm/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        displayName: fd.get("name"),
        stage: fd.get("stage"),
        source: "admin"
      })
    });
    e.currentTarget.reset();
    void refresh();
  }

  async function addSubscriber(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/admin/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), source: "admin" })
    });
    e.currentTarget.reset();
    void refresh();
  }

  async function enrollStudent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/admin/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        product: fd.get("product"),
        accessTier: fd.get("tier")
      })
    });
    e.currentTarget.reset();
    void refresh();
  }

  async function queueAgentJob(agentId: string, jobType: string) {
    await fetch("/api/admin/agents/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentId,
        jobType,
        payload: { requestedAt: new Date().toISOString(), channel: "enochia" }
      })
    });
    void refresh();
  }

  async function createContent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: fd.get("title"),
        body: fd.get("body"),
        channel: fd.get("channel")
      })
    });
    e.currentTarget.reset();
    void refresh();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Analytics" },
    { id: "crm", label: "CRM" },
    { id: "newsletter", label: "Newsletter" },
    { id: "course", label: "Course & App" },
    { id: "agents", label: "Agents" },
    { id: "content", label: "Content Factory" }
  ];

  if (gate === "unauth") {
    return (
      <AdminShell>
        <CandlelightCard className="mx-auto max-w-md p-8 text-center">
          <p className="text-gold-pale/85">Present your keeper seal to enter Command.</p>
          <Link
            href="/admin/gate?next=/admin"
            className="mt-6 inline-block border border-gold/40 px-6 py-2 font-display text-xs uppercase tracking-[0.2em] text-gold"
          >
            Sign in
          </Link>
        </CandlelightCard>
      </AdminShell>
    );
  }

  if (gate === "forbidden") {
    return (
      <AdminShell title="Sealed">
        <p className="text-center text-gold-pale">
          Signed in as {user?.email}. Add this email to <code>CELESTIAL_ADMIN_EMAILS</code>.
        </p>
        <Link href="/grimoire" className="mt-4 block text-center text-gold">
          Your Grimoire →
        </Link>
      </AdminShell>
    );
  }

  if (gate === "loading" || !snapshot) {
    return (
      <AdminShell>
        <p className="animate-pulse font-display text-sm uppercase tracking-[0.3em] text-gold-dim">
          Reading the measures…
        </p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-gold-dim">{snapshot.viewer?.email}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={busy}
            className="rounded-sm border border-gold-dim/40 px-3 py-1.5 font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-sm border border-gold-dim/25 px-3 py-1.5 font-display text-[10px] uppercase tracking-wider text-gold-dim/70"
          >
            Sign out
          </button>
        </div>
      </div>

      {!snapshot.serviceRoleConfigured ? (
        <CandlelightCard className="mb-6 border-amber/30 bg-amber/5 p-4">
          <p className="text-sm text-amber">
            Add <code className="text-gold-light">SUPABASE_SERVICE_ROLE_KEY</code> to enable full CRM,
            newsletter, and analytics. Run migration <code>004_celestial_crm_marketing.sql</code>.
          </p>
        </CandlelightCard>
      ) : null}

      <div className="mb-8 flex flex-wrap gap-2 border-b border-gold-dim/20 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-sm px-4 py-2 font-display text-[10px] uppercase tracking-[0.14em] transition-colors ${
              tab === t.id
                ? "border border-gold/50 bg-gold/10 text-gold"
                : "border border-transparent text-gold-dim hover:text-gold"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="CRM contacts" value={snapshot.counts.contacts} />
            <StatCard label="Newsletter active" value={snapshot.counts.newsletterActive} />
            <StatCard label="Course enrolled" value={snapshot.counts.courseActive} />
            <StatCard label="Registered users" value={snapshot.counts.registeredUsers} />
            <StatCard label="Events (7d)" value={snapshot.counts.eventsLast7d} />
            <StatCard label="Agent queue" value={snapshot.counts.agentQueued} />
            <StatCard label="Content drafts" value={snapshot.counts.contentDrafts} />
          </div>
          <CandlelightCard className="p-6">
            <p className="font-display text-xs uppercase tracking-wider text-gold-dim">Funnel</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Leads" value={snapshot.funnel.leads} />
              <StatCard label="Newsletter stage" value={snapshot.funnel.newsletter} />
              <StatCard label="Enrolled" value={snapshot.funnel.enrolled} />
              <StatCard label="Active students" value={snapshot.funnel.activeStudents} />
            </div>
          </CandlelightCard>
          {snapshot.recentEvents.length > 0 ? (
            <CandlelightCard className="p-6">
              <p className="font-display text-xs uppercase tracking-wider text-gold-dim">Top events (7d)</p>
              <ul className="mt-4 space-y-2 font-mono text-sm">
                {snapshot.recentEvents.map((ev) => (
                  <li key={ev.name} className="flex justify-between text-gold-pale">
                    <span>{ev.name}</span>
                    <span className="text-gold">{ev.count}</span>
                  </li>
                ))}
              </ul>
            </CandlelightCard>
          ) : null}
        </div>
      )}

      {tab === "crm" && (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <CandlelightCard className="h-fit p-5">
            <p className="font-display text-xs uppercase tracking-wider text-gold">Add contact</p>
            <form onSubmit={addContact} className="mt-4 space-y-3">
              <input name="email" type="email" required placeholder="email" className="w-full border-b border-gold-dim/30 bg-transparent py-2 text-sm" />
              <input name="name" placeholder="name" className="w-full border-b border-gold-dim/30 bg-transparent py-2 text-sm" />
              <select name="stage" className="w-full rounded-sm border border-gold-dim/30 bg-deep/60 px-2 py-2 text-sm">
                <option value="lead">lead</option>
                <option value="newsletter">newsletter</option>
                <option value="seeker">seeker</option>
                <option value="student">student</option>
                <option value="enrolled">enrolled</option>
              </select>
              <button type="submit" className="w-full border border-gold/40 py-2 font-display text-[10px] uppercase tracking-wider text-gold">
                Save
              </button>
            </form>
          </CandlelightCard>
          <CandlelightCard className="overflow-x-auto p-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gold-dim">
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Stage</th>
                  <th className="pb-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-t border-gold-dim/15">
                    <td className="py-2 text-gold-pale">{c.email}</td>
                    <td className="py-2 capitalize text-gold">{c.stage}</td>
                    <td className="py-2 text-gold-dim">{c.source ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CandlelightCard>
        </div>
      )}

      {tab === "newsletter" && (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <CandlelightCard className="h-fit p-5">
            <p className="font-display text-xs uppercase tracking-wider text-gold">Subscribe</p>
            <form onSubmit={addSubscriber} className="mt-4 space-y-3">
              <input name="email" type="email" required className="w-full border-b border-gold-dim/30 bg-transparent py-2 text-sm" />
              <button type="submit" className="w-full border border-gold/40 py-2 font-display text-[10px] uppercase text-gold">
                Add
              </button>
            </form>
            <p className="mt-4 text-xs text-gold-dim">
              Public API: <code>POST /api/newsletter/subscribe</code>
            </p>
          </CandlelightCard>
          <CandlelightCard className="p-5">
            <p className="mb-4 font-display text-lg text-gold">{subscribers.length} subscribers</p>
            <ul className="max-h-96 space-y-1 overflow-y-auto font-mono text-xs">
              {subscribers.map((s) => (
                <li key={s.id} className="text-gold-pale/80">
                  {s.email} · {s.status}
                </li>
              ))}
            </ul>
          </CandlelightCard>
        </div>
      )}

      {tab === "course" && (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <CandlelightCard className="h-fit p-5">
            <p className="font-display text-xs uppercase tracking-wider text-gold">Grant course access</p>
            <form onSubmit={enrollStudent} className="mt-4 space-y-3">
              <input name="email" type="email" required placeholder="student email" className="w-full border-b border-gold-dim/30 bg-transparent py-2 text-sm" />
              <input name="product" defaultValue="celestial-archive-course" className="w-full border-b border-gold-dim/30 bg-transparent py-2 text-sm" />
              <input name="tier" defaultValue="full" placeholder="access tier" className="w-full border-b border-gold-dim/30 bg-transparent py-2 text-sm" />
              <button type="submit" className="w-full border border-gold/40 py-2 font-display text-[10px] uppercase text-gold">
                Enroll
              </button>
            </form>
          </CandlelightCard>
          <CandlelightCard className="overflow-x-auto p-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gold-dim">
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Tier</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((en) => (
                  <tr key={en.id} className="border-t border-gold-dim/15">
                    <td className="py-2">{en.email}</td>
                    <td className="py-2 text-gold-dim">{en.product}</td>
                    <td className="py-2">{en.accessTier}</td>
                    <td className="py-2 capitalize text-gold">{en.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CandlelightCard>
        </div>
      )}

      {tab === "agents" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {ADMIN_AGENTS.map((agent) => {
              const configured = snapshot.agents.find((a) => a.id === agent.id)?.configured;
              return (
                <CandlelightCard key={agent.id} className="p-5">
                  <p className="font-display text-lg text-gold">{agent.name}</p>
                  <p className="text-xs italic text-gold-dim">{agent.role}</p>
                  <p className="mt-3 text-sm text-gold-pale/80">{agent.description}</p>
                  <p className="mt-2 text-[10px] text-gold-dim">
                    {configured ? "● Webhook configured" : "○ Set " + agent.envKey}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {agent.jobTypes.slice(0, 2).map((jt) => (
                      <button
                        key={jt}
                        type="button"
                        onClick={() => void queueAgentJob(agent.id, jt)}
                        className="rounded-sm border border-gold-dim/30 px-2 py-1 text-[9px] uppercase tracking-wider text-gold-dim hover:text-gold"
                      >
                        {jt.replace(/_/g, " ")}
                      </button>
                    ))}
                  </div>
                </CandlelightCard>
              );
            })}
          </div>
          <CandlelightCard className="p-5">
            <p className="font-display text-xs uppercase text-gold-dim">Recent jobs</p>
            <ul className="mt-3 space-y-2 font-mono text-xs">
              {jobs.map((j) => (
                <li key={j.id as string} className="text-gold-pale/80">
                  {j.agent_id as string} · {j.job_type as string} · {j.status as string}
                </li>
              ))}
            </ul>
          </CandlelightCard>
        </div>
      )}

      {tab === "content" && (
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <CandlelightCard className="h-fit p-5">
            <p className="font-display text-xs uppercase text-gold">New piece</p>
            <form onSubmit={createContent} className="mt-4 space-y-3">
              <input name="title" required placeholder="title" className="w-full border-b border-gold-dim/30 bg-transparent py-2 text-sm" />
              <textarea name="body" rows={4} placeholder="body / caption" className="w-full border border-gold-dim/25 bg-deep/40 p-2 text-sm" />
              <select name="channel" className="w-full rounded-sm border border-gold-dim/30 bg-deep/60 px-2 py-2 text-sm">
                <option value="twitter">twitter</option>
                <option value="bluesky">bluesky</option>
                <option value="linkedin">linkedin</option>
                <option value="newsletter">newsletter</option>
                <option value="generic">generic</option>
              </select>
              <button type="submit" className="w-full border border-gold/40 py-2 font-display text-[10px] uppercase text-gold">
                Save draft
              </button>
            </form>
          </CandlelightCard>
          <CandlelightCard className="p-5">
            <ul className="space-y-3">
              {contentPieces.map((p) => (
                <li key={p.id as string} className="border-b border-gold-dim/15 pb-3">
                  <p className="font-display text-gold">{p.title as string}</p>
                  <p className="text-xs text-gold-dim">
                    {p.channel as string} · {p.status as string}
                  </p>
                </li>
              ))}
            </ul>
          </CandlelightCard>
        </div>
      )}
    </AdminShell>
  );
}
