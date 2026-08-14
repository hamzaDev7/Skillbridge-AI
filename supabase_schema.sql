-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extended with role and bio)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role text check (role in ('student', 'recruiter', 'admin')),
  bio text,
  company text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Skills Table
create table if not exists public.skills (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  proficiency integer check (proficiency >= 1 and proficiency <= 100),
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.skills enable row level security;
create policy "Users can manage their own skills." on skills for all using (auth.uid() = user_id);
create policy "Skills are viewable by everyone." on skills for select using (true);


-- 3. Projects Table
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  tech_stack text[], -- Array of strings
  github_url text,
  live_url text,
  status text default 'Planning',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.projects enable row level security;
create policy "Users can manage their own projects." on projects for all using (auth.uid() = user_id);
create policy "Projects are viewable by everyone." on projects for select using (true);


-- 4. Roadmaps Table
create table if not exists public.roadmaps (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'Pending',
  target_date date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.roadmaps enable row level security;
create policy "Users can manage their own roadmaps." on roadmaps for all using (auth.uid() = user_id);
