-- Fira CG portfolio — CRM schema.
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create extension if not exists "pgcrypto";

-- ── Works (portfolio pieces) ────────────────────────────────────────────
create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  project text not null default '',
  category text not null check (category in ('plarium', 'early', 'pet-projects')),
  image_url text not null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.works enable row level security;

create policy "Public can read works"
  on public.works for select
  using (true);

create policy "Authenticated users can insert works"
  on public.works for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update works"
  on public.works for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete works"
  on public.works for delete
  using (auth.role() = 'authenticated');

-- Storage bucket for work images.
insert into storage.buckets (id, name, public)
values ('works', 'works', true)
on conflict (id) do nothing;

create policy "Public can view work images"
  on storage.objects for select
  using (bucket_id = 'works');

create policy "Authenticated users can upload work images"
  on storage.objects for insert
  with check (bucket_id = 'works' and auth.role() = 'authenticated');

create policy "Authenticated users can delete work images"
  on storage.objects for delete
  using (bucket_id = 'works' and auth.role() = 'authenticated');

-- ── Commission requests (lead pipeline) ─────────────────────────────────
create table if not exists public.commission_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  brief text not null,
  budget text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'delivered', 'paid')),
  created_at timestamptz not null default now()
);

alter table public.commission_requests enable row level security;

create policy "Anyone can submit a commission request"
  on public.commission_requests for insert
  with check (true);

create policy "Authenticated users can read commission requests"
  on public.commission_requests for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update commission requests"
  on public.commission_requests for update
  using (auth.role() = 'authenticated');

-- ── Articles (blog) ──────────────────────────────────────────────────────
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  body text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy "Public can read published articles"
  on public.articles for select
  using (published = true);

create policy "Authenticated users can read all articles"
  on public.articles for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert articles"
  on public.articles for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update articles"
  on public.articles for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete articles"
  on public.articles for delete
  using (auth.role() = 'authenticated');
