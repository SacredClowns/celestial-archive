-- Grants for CRM / marketing tables (service role bypasses RLS; authenticated limited)

grant select, insert, update, delete on table public.celestial_crm_contacts to authenticated;
grant select, insert, update, delete on table public.celestial_newsletter_subscribers to authenticated;
grant select, insert, update, delete on table public.celestial_course_enrollments to authenticated;
grant select, insert on table public.celestial_marketing_events to authenticated;
grant select, insert, update, delete on table public.celestial_agent_jobs to authenticated;
grant select, insert, update, delete on table public.celestial_content_pieces to authenticated;

notify pgrst, 'reload schema';
