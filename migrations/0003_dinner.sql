-- Practice dinner lines. Unowned: the courier key is the only write check.
create table if not exists dinner_lines (
  id text primary key,
  dinner_id text not null,
  n integer not null,
  at timestamptz not null default now(),
  speaker text not null,
  line_type text not null,
  carried_by text not null,
  text text not null,
  relay text
);
