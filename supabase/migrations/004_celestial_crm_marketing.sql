-- Celestial Archive migration 004 — CRM, newsletter, course, marketing events, agent jobs

-- CRM contacts (students / leads — may link to auth user)
create table if not exists public.celestial_crm_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  display_name text,
  stage text not null default 'lead',
  source text,
  tags jsonb not null default '[]'::jsonb,
  notes text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email)
);

create index if not exists celestial_crm_contacts_stage_idx on public.celestial_crm_contacts (stage);
create index if not exists celestial_crm_contacts_user_id_idx on public.celestial_crm_contacts (user_id);

-- Newsletter subscribers (may overlap CRM; kept separate for list hygiene)
create table if not exists public.celestial_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'active',
  source text,
  tags jsonb not null default '[]'::jsonb,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create index if not exists celestial_newsletter_status_idx on public.celestial_newsletter_subscribers (status);

-- Course / app access tracking
create table if not exists public.celestial_course_enrollments (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.celestial_crm_contacts (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  product text not null default 'celestial-archive-course',
  status text not null default 'active',
  access_tier text not null default 'seeker',
  enrolled_at timestamptz not null default now(),
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists celestial_course_enrollments_email_idx on public.celestial_course_enrollments (email);
create index if not exists celestial_course_enrollments_status_idx on public.celestial_course_enrollments (status);

-- Marketing / product analytics events
create table if not exists public.celestial_marketing_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  user_id uuid references auth.users (id) on delete set null,
  contact_id uuid references public.celestial_crm_contacts (id) on delete set null,
  session_id text,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists celestial_marketing_events_name_idx on public.celestial_marketing_events (event_name);
create index if not exists celestial_marketing_events_created_idx on public.celestial_marketing_events (created_at desc);

-- Agent jobs (Hermes and other social / content agents)
create table if not exists public.celestial_agent_jobs (
  id uuid primary key default gen_random_uuid(),
  agent_id text not null default 'hermes',
  job_type text not null,
  status text not null default 'queued',
  payload jsonb not null default '{}'::jsonb,
  result jsonb,
  scheduled_for timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists celestial_agent_jobs_status_idx on public.celestial_agent_jobs (status);
create index if not exists celestial_agent_jobs_agent_idx on public.celestial_agent_jobs (agent_id);

-- Content factory pieces (drafts for social / lesson promos)
create table if not exists public.celestial_content_pieces (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  channel text not null default 'generic',
  status text not null default 'draft',
  formula_id text,
  tags jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: no direct client access — admin API uses service role
alter table public.celestial_crm_contacts enable row level security;
alter table public.celestial_newsletter_subscribers enable row level security;
alter table public.celestial_course_enrollments enable row level security;
alter table public.celestial_marketing_events enable row level security;
alter table public.celestial_agent_jobs enable row level security;
alter table public.celestial_content_pieces enable row level security;

-- Allow authenticated users to insert their own marketing events (analytics beacon)
create policy "marketing_events_insert_authenticated"
  on public.celestial_marketing_events for insert
  to authenticated
  with check (auth.uid() = user_id or user_id is null);

-- Newsletter: public can subscribe via API (service role) — no anon insert policy

notify pgrst, 'reload schema';
