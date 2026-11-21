-- =====================================================================
-- DOLLAR STORE — backend additions (run in the Supabase SQL editor)
-- Column names below were taken from the frontend code:
--   orders(id, user_id, total_egp, status, payment_status)
--   order_items(order_id, seller_id, line_total_egp)
--   vip_partners(seller_id, is_active)    profiles(id, role, status)
-- NOT executed or tested against your database — read it first and run it
-- in a staging project if you can.
-- =====================================================================

-- ---------- 2) Admin account --------------------------------------
-- Sign up asdhossamhassan11@gmail.com on the site first, then run:
update public.profiles
   set role = 'admin'
 where id = (select id from auth.users where lower(email) = 'asdhossamhassan11@gmail.com');
-- If this errors with a "role change" guard, run it as the postgres role from
-- the SQL editor (not through the API).

-- ---------- 4) Clean slate (DESTRUCTIVE — uncomment deliberately) -------
-- Deletes test catalogue data. Order matters because of foreign keys.
-- Your seller-listing / digital-key tables are not visible in the frontend
-- bundle, so add them here by name before running.
-- delete from public.order_items;
-- delete from public.orders;
-- delete from public.product_variants;
-- delete from public.products;
-- delete from public.vip_partners;
-- delete from public.seller_profiles;
-- delete from public.profiles where role = 'seller';

-- ---------- 3) Per-vendor sales totals (admin overview) ------------------
-- Sellers already have an Earnings page (gross / commission / net) via the
-- existing get_seller_earnings RPC. This view only adds a quick admin-side
-- total per vendor.
create or replace view public.vendor_sales_totals as
select oi.seller_id,
       count(distinct o.id)               as orders_count,
       coalesce(sum(oi.line_total_egp),0) as gross_sales_egp
  from public.order_items oi
  join public.orders o on o.id = oi.order_id
 where o.status = 'delivered'
 group by oi.seller_id;
alter view public.vendor_sales_totals set (security_invoker = on);

-- ---------- 5) Automatic 1% cashback into the customer's wallet ----------
create table if not exists public.wallets (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  balance_egp numeric(12,2) not null default 0 check (balance_egp >= 0)
);
create table if not exists public.wallet_transactions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  order_id   uuid references public.orders(id) on delete set null,
  kind       text not null default 'cashback',
  amount_egp numeric(12,2) not null,
  created_at timestamptz not null default now(),
  unique (order_id, kind)               -- an order can only earn cashback once
);
alter table public.wallets enable row level security;
alter table public.wallet_transactions enable row level security;
drop policy if exists "own wallet" on public.wallets;
create policy "own wallet" on public.wallets for select using (user_id = auth.uid());
drop policy if exists "own wallet tx" on public.wallet_transactions;
create policy "own wallet tx" on public.wallet_transactions for select using (user_id = auth.uid());
-- (no insert/update policies: only the trigger below can change balances)

create or replace function public.credit_cashback() returns trigger
language plpgsql security definer set search_path = public as $$
declare amt numeric(12,2);
begin
  if new.user_id is null or new.payment_status is distinct from 'paid' then return new; end if;
  if tg_op = 'UPDATE' and old.payment_status is not distinct from 'paid' then return new; end if;
  amt := round(coalesce(new.total_egp,0) * 0.01, 2);
  if amt <= 0 then return new; end if;
  insert into public.wallet_transactions(user_id, order_id, kind, amount_egp)
       values (new.user_id, new.id, 'cashback', amt)
  on conflict (order_id, kind) do nothing;
  if found then
    insert into public.wallets(user_id, balance_egp) values (new.user_id, amt)
    on conflict (user_id) do update set balance_egp = public.wallets.balance_egp + excluded.balance_egp;
  end if;
  return new;
end $$;
drop trigger if exists trg_cashback on public.orders;
create trigger trg_cashback after insert or update of payment_status on public.orders
  for each row execute function public.credit_cashback();
-- NOTE: checkout currently throws "payment_provider_not_configured", so no
-- order can become 'paid' until a payment provider is connected.

-- ---------- 7) The Creator ideas -----------------------------------------
create table if not exists public.creator_ideas (
  id uuid primary key default gen_random_uuid(),
  name text, contact text, title text, cat text, body text, payout text,
  status text not null default 'pending', reward_egp numeric,
  created_at timestamptz not null default now()
);
alter table public.creator_ideas enable row level security;
drop policy if exists "anyone can submit" on public.creator_ideas;
create policy "anyone can submit" on public.creator_ideas for insert with check (true);
drop policy if exists "admin reads" on public.creator_ideas;
create policy "admin reads" on public.creator_ideas for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
-- To receive ideas from the site, point window.DS_CONFIG.creatorEndpoint at
-- https://<project>.supabase.co/rest/v1/creator_ideas (add the apikey header
-- in a small Edge Function — the overlay posts plain JSON).

-- ---------- 9) Fair VIP ordering (helper only) ----------------------------
-- VIP = active row in vip_partners. For a product query, order by:
--   (seller_id in (select seller_id from vip_partners where is_active)) desc,
--   md5(id::text || current_date::text)          -- daily rotation inside each tier
-- The store page's sorting is inside the compiled frontend and is NOT changed
-- by this file.
create or replace function public.vip_seller_ids() returns setof uuid
language sql stable as $$ select seller_id from public.vip_partners where is_active $$;

-- ---------- 1) Verification photos ------------------------------------------
-- The /sell form uploads its `documents` through the existing application flow.
-- Make sure the bucket that flow writes to is PRIVATE (ID photos must never be public).
