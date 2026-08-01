-- Celestial Archive migration 003 (Old Gods shared project)
-- RLS updates, discovery log, defense-in-depth grants

-- UPDATE policies (required for upsert on bookmarks + progress)
create policy "celestial_bookmarks_update_own"
  on public.celestial_bookmarks for update
  using (auth.uid() = user_id);

create policy "celestial_progress_update_own"
  on public.celestial_user_progress for update
  using (auth.uid() = user_id);

-- Discovery log
create table if not exists public.celestial_discoveries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null default 'insight',
  title text not null default '',
  note text not null default '',
  href text,
  created_at timestamptz not null default now()
);

create index if not exists celestial_discoveries_user_id_idx
  on public.celestial_discoveries (user_id);

alter table public.celestial_discoveries enable row level security;

create policy "celestial_discoveries_select_own"
  on public.celestial_discoveries for select
  using (auth.uid() = user_id);

create policy "celestial_discoveries_insert_own"
  on public.celestial_discoveries for insert
  with check (auth.uid() = user_id);

create policy "celestial_discoveries_update_own"
  on public.celestial_discoveries for update
  using (auth.uid() = user_id);

create policy "celestial_discoveries_delete_own"
  on public.celestial_discoveries for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.celestial_discoveries to authenticated;

-- Defense in depth: anon cannot read private user tables
revoke select on public.celestial_journal_entries from anon;
revoke select on public.celestial_user_progress from anon;
revoke select on public.celestial_bookmarks from anon;
revoke select on public.celestial_discoveries from anon;

notify pgrst, 'reload schema';
