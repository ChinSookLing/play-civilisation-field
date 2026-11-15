-- Pending Psyche 001 comments. Unowned: there is no login.
-- A row is not a wall post. The wall changes only when Tuzi or Puck approve.
create table if not exists psyche_pending_comments (
  id text primary key,
  created_at timestamptz not null default now(),
  player_label text not null,
  version text not null,
  replay_code text not null,
  comment_text text not null,
  consent boolean not null,
  ip_hash text not null
);
