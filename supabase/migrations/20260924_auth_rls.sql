-- Apply in the Supabase SQL editor after confirming the listed tables/columns exist.
-- Auth users receive a basic profile; role always comes from this trusted trigger.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();

-- Safe recovery for an existing Auth user if the profile row was absent before
-- this migration. The caller cannot provide a role or another user's ID.
create or replace function public.ensure_current_profile()
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  current_profile public.profiles;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  insert into public.profiles (id, full_name, role)
  values (
    auth.uid(),
    coalesce(auth.jwt() -> 'user_metadata' ->> 'full_name', auth.jwt() -> 'user_metadata' ->> 'name', ''),
    'user'
  )
  on conflict (id) do nothing
  returning * into current_profile;
  if not found then
    select * into current_profile from public.profiles where id = auth.uid();
  end if;
  return current_profile;
end;
$$;
revoke all on function public.ensure_current_profile() from public;
grant execute on function public.ensure_current_profile() to authenticated;

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.is_cano_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$ select coalesce(public.current_profile_role() = 'admin', false) $$;

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' and new.role <> 'user' and auth.uid() is not null and not public.is_cano_admin() then
    raise exception 'Only an administrator can assign an elevated profile role';
  end if;
  if tg_op = 'UPDATE' and new.role is distinct from old.role and not public.is_cano_admin() then
    raise exception 'Only an administrator can change profile roles';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role_trigger on public.profiles;
create trigger protect_profile_role_trigger before insert or update of role on public.profiles
for each row execute procedure public.protect_profile_role();

alter table public.profiles enable row level security;
alter table public.disciplines enable row level security;
alter table public.fee_plans enable row level security;
alter table public.memberships enable row level security;
alter table public.membership_invoices enable row level security;
alter table public.payments enable row level security;
alter table public.schedules enable row level security;
alter table public.gallery enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists profiles_read_self_or_admin on public.profiles;
create policy profiles_read_self_or_admin on public.profiles for select using (id = auth.uid() or public.is_cano_admin());
drop policy if exists profiles_update_self_no_role_escalation on public.profiles;
create policy profiles_update_self_no_role_escalation on public.profiles for update using (id = auth.uid() or public.is_cano_admin()) with check (public.is_cano_admin() or (id = auth.uid() and role = public.current_profile_role()));
drop policy if exists profiles_admin_insert on public.profiles;
create policy profiles_admin_insert on public.profiles for insert with check (public.is_cano_admin());
drop policy if exists profiles_admin_delete on public.profiles;
create policy profiles_admin_delete on public.profiles for delete using (public.is_cano_admin());

drop policy if exists disciplines_public_read on public.disciplines;
create policy disciplines_public_read on public.disciplines for select using (active or public.is_cano_admin());
drop policy if exists disciplines_admin_all on public.disciplines;
create policy disciplines_admin_all on public.disciplines for all using (public.is_cano_admin()) with check (public.is_cano_admin());

drop policy if exists fee_plans_public_active_read on public.fee_plans;
create policy fee_plans_public_active_read on public.fee_plans for select using (active or public.is_cano_admin());
drop policy if exists fee_plans_admin_all on public.fee_plans;
create policy fee_plans_admin_all on public.fee_plans for all using (public.is_cano_admin()) with check (public.is_cano_admin());

drop policy if exists memberships_owner_read on public.memberships;
create policy memberships_owner_read on public.memberships for select using (user_id = auth.uid() or public.is_cano_admin());
drop policy if exists memberships_admin_all on public.memberships;
create policy memberships_admin_all on public.memberships for all using (public.is_cano_admin()) with check (public.is_cano_admin());
drop policy if exists invoices_owner_read on public.membership_invoices;
create policy invoices_owner_read on public.membership_invoices for select using (user_id = auth.uid() or public.is_cano_admin());
drop policy if exists invoices_admin_all on public.membership_invoices;
create policy invoices_admin_all on public.membership_invoices for all using (public.is_cano_admin()) with check (public.is_cano_admin());
drop policy if exists payments_owner_read on public.payments;
create policy payments_owner_read on public.payments for select using (user_id = auth.uid() or public.is_cano_admin());
drop policy if exists payments_admin_all on public.payments;
create policy payments_admin_all on public.payments for all using (public.is_cano_admin()) with check (public.is_cano_admin());

drop policy if exists schedules_public_read on public.schedules;
create policy schedules_public_read on public.schedules for select using (true);
drop policy if exists schedules_admin_all on public.schedules;
create policy schedules_admin_all on public.schedules for all using (public.is_cano_admin()) with check (public.is_cano_admin());
drop policy if exists gallery_public_active_read on public.gallery;
create policy gallery_public_active_read on public.gallery for select using (active or public.is_cano_admin());
drop policy if exists gallery_admin_all on public.gallery;
create policy gallery_admin_all on public.gallery for all using (public.is_cano_admin()) with check (public.is_cano_admin());
drop policy if exists events_public_active_read on public.events;
create policy events_public_active_read on public.events for select using (active or public.is_cano_admin());
drop policy if exists events_admin_all on public.events;
create policy events_admin_all on public.events for all using (public.is_cano_admin()) with check (public.is_cano_admin());
drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read on public.testimonials for select using (true);
drop policy if exists testimonials_admin_all on public.testimonials;
create policy testimonials_admin_all on public.testimonials for all using (public.is_cano_admin()) with check (public.is_cano_admin());

-- Storage stays in the existing public cano-team bucket. Public can view assets;
-- writes and deletes require the database-backed admin role.
drop policy if exists cano_team_public_read on storage.objects;
create policy cano_team_public_read on storage.objects for select using (bucket_id = 'cano-team');
drop policy if exists cano_team_admin_insert on storage.objects;
create policy cano_team_admin_insert on storage.objects for insert with check (bucket_id = 'cano-team' and public.is_cano_admin());
drop policy if exists cano_team_admin_update on storage.objects;
create policy cano_team_admin_update on storage.objects for update using (bucket_id = 'cano-team' and public.is_cano_admin()) with check (bucket_id = 'cano-team' and public.is_cano_admin());
drop policy if exists cano_team_admin_delete on storage.objects;
create policy cano_team_admin_delete on storage.objects for delete using (bucket_id = 'cano-team' and public.is_cano_admin());

-- Promote the first administrator only from a trusted SQL editor after validating identity:
-- update public.profiles set role = 'admin' where id = '<auth.users UUID>';
