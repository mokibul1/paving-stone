-- ============ ENUMS ============
create type public.app_role as enum ('admin', 'user');

-- ============ PROFILES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles viewable by owner" on public.profiles for select using (auth.uid() = id);
create policy "Profiles updatable by owner" on public.profiles for update using (auth.uid() = id);
create policy "Profiles insertable by owner" on public.profiles for insert with check (auth.uid() = id);

-- ============ USER ROLES ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles for select using (auth.uid() = user_id);
create policy "Admins can view all roles" on public.user_roles for select using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can manage roles" on public.user_roles for all using (public.has_role(auth.uid(), 'admin'));

-- ============ TRIGGER: auto-create profile ============
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ updated_at helper ============
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- ============ CATEGORIES ============
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.categories enable row level security;
create trigger trg_categories_updated before update on public.categories for each row execute function public.touch_updated_at();

create policy "Categories public read" on public.categories for select using (true);
create policy "Categories admin write" on public.categories for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ PRODUCTS ============
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  base_price numeric(10,2),
  price_label text,
  main_image_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
create trigger trg_products_updated before update on public.products for each row execute function public.touch_updated_at();
create index on public.products (category_id);

create policy "Products public read" on public.products for select using (true);
create policy "Products admin write" on public.products for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ PRODUCT VARIANTS ============
create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  color text,
  material text,
  image_url text not null,
  price numeric(10,2),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.product_variants enable row level security;
create trigger trg_variants_updated before update on public.product_variants for each row execute function public.touch_updated_at();
create index on public.product_variants (product_id);

create policy "Variants public read" on public.product_variants for select using (true);
create policy "Variants admin write" on public.product_variants for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ WORKFLOW STEPS ============
create table public.workflow_steps (
  id uuid primary key default gen_random_uuid(),
  step_number int not null,
  title text not null,
  description text not null,
  image_url text,
  duration_label text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.workflow_steps enable row level security;
create trigger trg_workflow_updated before update on public.workflow_steps for each row execute function public.touch_updated_at();

create policy "Workflow public read" on public.workflow_steps for select using (true);
create policy "Workflow admin write" on public.workflow_steps for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ REVIEWS ============
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  rating int not null default 5 check (rating between 1 and 5),
  content text not null,
  avatar_url text,
  featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create trigger trg_reviews_updated before update on public.reviews for each row execute function public.touch_updated_at();

create policy "Reviews public read" on public.reviews for select using (true);
create policy "Reviews admin write" on public.reviews for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ INQUIRIES ============
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  product_id uuid references public.products(id) on delete set null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;

create policy "Anyone can submit inquiry" on public.inquiries for insert with check (true);
create policy "Admins can read inquiries" on public.inquiries for select using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update inquiries" on public.inquiries for update using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete inquiries" on public.inquiries for delete using (public.has_role(auth.uid(), 'admin'));

-- ============ STORAGE BUCKET ============
insert into storage.buckets (id, name, public) values ('stone-images', 'stone-images', true)
on conflict (id) do nothing;

create policy "Stone images public read" on storage.objects for select using (bucket_id = 'stone-images');
create policy "Admins upload stone images" on storage.objects for insert with check (bucket_id = 'stone-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update stone images" on storage.objects for update using (bucket_id = 'stone-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete stone images" on storage.objects for delete using (bucket_id = 'stone-images' and public.has_role(auth.uid(), 'admin'));