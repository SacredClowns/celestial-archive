-- Celestial Archive tables (shared Supabase project with Old Gods / Roma)
-- Prefix: celestial_ — do not modify Old Gods tables

-- Profile row per auth user (created on first sign-in from the app)
create table if not exists public.celestial_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  rank text not null default 'seeker',
  last_visited_lesson text,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.celestial_journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  entry_type text not null default 'freeform',
  title text not null default '',
  body text not null default '',
  tags jsonb not null default '[]'::jsonb,
  linked_lesson text,
  linked_aethyr text,
  linked_call integer,
  mood text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists celestial_journal_entries_user_id_idx
  on public.celestial_journal_entries (user_id);

create table if not exists public.celestial_user_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.celestial_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  href text not null,
  saved_at timestamptz not null default now(),
  unique (user_id, href)
);

-- RLS
alter table public.celestial_profiles enable row level security;
alter table public.celestial_journal_entries enable row level security;
alter table public.celestial_user_progress enable row level security;
alter table public.celestial_bookmarks enable row level security;

create policy "celestial_profiles_select_own"
  on public.celestial_profiles for select
  using (auth.uid() = user_id);

create policy "celestial_profiles_insert_own"
  on public.celestial_profiles for insert
  with check (auth.uid() = user_id);

create policy "celestial_profiles_update_own"
  on public.celestial_profiles for update
  using (auth.uid() = user_id);

create policy "celestial_journal_select_own"
  on public.celestial_journal_entries for select
  using (auth.uid() = user_id);

create policy "celestial_journal_insert_own"
  on public.celestial_journal_entries for insert
  with check (auth.uid() = user_id);

create policy "celestial_journal_update_own"
  on public.celestial_journal_entries for update
  using (auth.uid() = user_id);

create policy "celestial_journal_delete_own"
  on public.celestial_journal_entries for delete
  using (auth.uid() = user_id);

create policy "celestial_progress_select_own"
  on public.celestial_user_progress for select
  using (auth.uid() = user_id);

create policy "celestial_progress_insert_own"
  on public.celestial_user_progress for insert
  with check (auth.uid() = user_id);

create policy "celestial_progress_delete_own"
  on public.celestial_user_progress for delete
  using (auth.uid() = user_id);

create policy "celestial_bookmarks_select_own"
  on public.celestial_bookmarks for select
  using (auth.uid() = user_id);

create policy "celestial_bookmarks_insert_own"
  on public.celestial_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "celestial_bookmarks_delete_own"
  on public.celestial_bookmarks for delete
  using (auth.uid() = user_id);
