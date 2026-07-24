-- N17 School CMS schema
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/fyhokjafoxwtmnueullc/sql/new

-- News
create table if not exists public.news (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null,
  date date not null,
  image text not null default '',
  image_alt text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_date_idx on public.news (date desc);

-- Teachers
create table if not exists public.teachers (
  id text primary key,
  name text not null,
  subject text not null,
  role text,
  image text not null default '',
  image_alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists teachers_subject_idx on public.teachers (subject);
create index if not exists teachers_sort_idx on public.teachers (sort_order);

-- Gallery
create table if not exists public.gallery (
  id text primary key,
  title text not null,
  category text not null,
  image text not null default '',
  image_alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_category_idx on public.gallery (category);
create index if not exists gallery_sort_idx on public.gallery (sort_order);

-- RLS: public read; writes only via secret key (bypasses RLS)
alter table public.news enable row level security;
alter table public.teachers enable row level security;
alter table public.gallery enable row level security;

drop policy if exists "Public read news" on public.news;
create policy "Public read news" on public.news
  for select to anon, authenticated using (true);

drop policy if exists "Public read teachers" on public.teachers;
create policy "Public read teachers" on public.teachers
  for select to anon, authenticated using (true);

drop policy if exists "Public read gallery" on public.gallery;
create policy "Public read gallery" on public.gallery
  for select to anon, authenticated using (true);

grant select on public.news, public.teachers, public.gallery to anon, authenticated;
grant all on public.news, public.teachers, public.gallery to service_role;

-- Storage bucket for admin uploads
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read uploads" on storage.objects;
create policy "Public read uploads" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'uploads');

drop policy if exists "Service role manage uploads" on storage.objects;
create policy "Service role manage uploads" on storage.objects
  for all to service_role
  using (bucket_id = 'uploads')
  with check (bucket_id = 'uploads');
