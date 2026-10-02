-- Proof Table 001. Unowned: the courier key is the only write check.
-- Lines and ledger versions are append-only. Nothing in these tables is updated or deleted.
create table if not exists proof_lines (
  id text primary key,
  gathering_id text not null,
  n integer not null,
  at timestamptz not null default now(),
  speaker text not null,
  line_type text not null,
  carried_by text not null,
  relay text,
  text text not null default '',
  round integer,
  turn_n integer,
  seat text,
  item text,
  goal text not null default '',
  action text not null default '',
  result text not null default '',
  check_text text not null default '',
  status_claim text not null default '',
  next_text text not null default '',
  ledger_version_read text not null default '',
  incomplete boolean not null default false,
  corrects text,
  unique (gathering_id, n)
);

create table if not exists proof_ledger (
  id text primary key,
  gathering_id text not null,
  n integer not null,
  version text not null,
  at timestamptz not null default now(),
  as_of text not null,
  open_text text not null default '',
  closed_text text not null default '',
  refuted_text text not null default '',
  dead_ends_text text not null default '',
  sources_text text not null default '',
  unique (gathering_id, n),
  unique (gathering_id, version)
);
