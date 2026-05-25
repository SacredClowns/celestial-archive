-- PostgREST roles for celestial_* tables (shared Old Gods / Roma project)
grant usage on schema public to authenticated, anon;

grant select, insert, update, delete on table public.celestial_profiles to authenticated;
grant select, insert, update, delete on table public.celestial_journal_entries to authenticated;
grant select, insert, update, delete on table public.celestial_user_progress to authenticated;
grant select, insert, update, delete on table public.celestial_bookmarks to authenticated;

grant select on table public.celestial_profiles to anon;
grant select on table public.celestial_journal_entries to anon;
grant select on table public.celestial_user_progress to anon;
grant select on table public.celestial_bookmarks to anon;

notify pgrst, 'reload schema';
