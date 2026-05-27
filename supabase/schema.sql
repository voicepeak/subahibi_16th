create extension if not exists "pgcrypto";

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) <= 48),
  country text,
  content text not null check (char_length(content) <= 500),
  avatar_url text,
  approved boolean not null default false,
  pinned boolean not null default false,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.fanworks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) <= 100),
  author text not null check (char_length(author) <= 80),
  description text not null check (char_length(description) <= 800),
  image_url text,
  source_link text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  nickname text,
  confirmed boolean not null default false,
  unsubscribed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.poll_votes (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  option_name text not null,
  ip_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  option_name text not null,
  votes integer not null default 0,
  unique (category, option_name)
);

alter table public.messages enable row level security;
alter table public.fanworks enable row level security;
alter table public.email_subscriptions enable row level security;
alter table public.poll_votes enable row level security;
alter table public.polls enable row level security;

create policy "Public can read approved messages"
  on public.messages for select
  using (approved = true);

create policy "Public can submit messages"
  on public.messages for insert
  with check (approved = false);

create policy "Public can read approved fanworks"
  on public.fanworks for select
  using (approved = true);

create policy "Public can submit fanworks"
  on public.fanworks for insert
  with check (approved = false);

create policy "Public can submit email subscriptions"
  on public.email_subscriptions for insert
  with check (confirmed = false and unsubscribed = false);

create policy "Public can submit poll votes"
  on public.poll_votes for insert
  with check (true);

create policy "Public can read polls"
  on public.polls for select
  using (true);
