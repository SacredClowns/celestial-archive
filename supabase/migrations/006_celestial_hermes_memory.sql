-- Hermes per-seeker memory — grows with the course and counsel exchanges

create table if not exists public.celestial_hermes_memories (
  user_id uuid primary key references auth.users (id) on delete cascade,
  relationship_summary text not null default '',
  learning_focus text not null default '',
  exchange_count integer not null default 0,
  last_counsel_at timestamptz,
  recent_exchanges jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.celestial_hermes_memories enable row level security;

create policy "hermes_memory_select_own"
  on public.celestial_hermes_memories for select
  using (auth.uid() = user_id);

create policy "hermes_memory_insert_own"
  on public.celestial_hermes_memories for insert
  with check (auth.uid() = user_id);

create policy "hermes_memory_update_own"
  on public.celestial_hermes_memories for update
  using (auth.uid() = user_id);

grant select, insert, update on table public.celestial_hermes_memories to authenticated;

notify pgrst, 'reload schema';
