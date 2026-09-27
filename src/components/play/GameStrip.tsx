import { Link } from "@tanstack/react-router";
import { colorLabel } from "@/lib/play/catalog";
import { CURRENT_GAME_ID } from "@/lib/play/games";
import type { PlayGame } from "@/lib/play/types";
import { cn } from "@/lib/utils";

type Props = {
  games: PlayGame[];
  selectedId: string;
};

export function GameStrip({ games, selectedId }: Props) {
  const field = games.filter((game) => game.kind !== "PRACTICE");
  const practice = games.filter((game) => game.kind === "PRACTICE");
  return (
    <nav aria-label="Games" className="border-t border-line pt-4">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {field.map((game) => chip(game, selectedId))}
        <Link
          to="/about"
          className="flex min-h-11 min-w-[5.5rem] shrink-0 items-center justify-center rounded-md border border-line px-3 text-sm text-muted hover:border-line-strong hover:text-fg"
        >
          About
        </Link>
      </div>
      {practice.length ? (
        <div className="mt-2">
          <p className="mb-1 text-xs tracking-wide text-muted uppercase">Practice — not a Field record</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {practice.map((game) => chip(game, selectedId))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

function chip(game: PlayGame, selectedId: string) {
  const selected = game.id === selectedId;
  const body = (
    <>
      <span className="text-sm font-medium tracking-wide text-fg">{game.id}</span>
      <span className="text-sm text-muted">{pair(game)}</span>
      <span className="text-xs uppercase tracking-wide text-faint">{statusLabel(game)}</span>
    </>
  );
  return game.id === CURRENT_GAME_ID ? (
    <Link key={game.id} to="/" className={chipClass(selected)}>
      {body}
    </Link>
  ) : (
    <Link key={game.id} to="/go/$gameId" params={{ gameId: game.id }} className={chipClass(selected)}>
      {body}
    </Link>
  );
}

function chipClass(selected: boolean) {
  return cn(
    "flex min-h-11 min-w-[11rem] shrink-0 flex-col justify-center rounded-md border px-3 py-2 transition-colors duration-150",
    selected
      ? "border-fg bg-raised text-fg"
      : "border-line text-muted hover:border-line-strong hover:text-fg",
  );
}

function pair(game: PlayGame): string {
  if (game.status === "waiting") return "empty";
  return `${colorLabel(game, "black")} · ${colorLabel(game, "white")}`;
}

function statusLabel(game: PlayGame): string {
  const kind = `${game.kind} · `;
  if (game.status === "live") return `${kind}LIVE`;
  if (game.status === "scheduled") return `${kind}scheduled`;
  if (game.status === "waiting") return `${kind}empty`;
  if (game.status === "paused") return `${kind}paused`;
  if (game.status === "abandoned") return `${kind}abandoned`;
  return `${kind}Finished`;
}
