-- Public Play tables. Unowned on purpose: the spectator desk has no login.
create table if not exists play_tables (
  id text primary key,
  payload text not null,
  updated_at timestamptz not null default now()
);
