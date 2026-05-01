-- Restrict permissive inquiry insert (still allows public submission via anon role)
drop policy if exists "Anyone can submit inquiry" on public.inquiries;
create policy "Public can submit inquiry" on public.inquiries
  for insert to anon, authenticated
  with check (length(name) > 0 and length(email) > 0 and length(message) > 0);

-- Lock down SECURITY DEFINER helpers
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;

-- Restrict bucket listing: drop overly broad SELECT, add admin-only listing.
-- Individual file URLs from a public bucket still work for public viewing.
drop policy if exists "Stone images public read" on storage.objects;
create policy "Stone images admin list" on storage.objects
  for select to authenticated
  using (bucket_id = 'stone-images' and public.has_role(auth.uid(), 'admin'));