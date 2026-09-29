import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { AiReaders } from "@/components/play/AiReaders";
import { GameStrip } from "@/components/play/GameStrip";
import { GoBoard } from "@/components/play/GoBoard";
import { ReplayBar } from "@/components/play/ReplayBar";
import { StoneGlyph } from "@/components/play/StoneGlyph";
import { TableMemory } from "@/components/play/TableMemory";
import { TalkLog } from "@/components/play/TalkLog";
import {
  bannerLabel,
  colorLabel,
  formatAiBlock,
  gameFromPublic,
  lastMoveInEvents,
  listGames,
  nextPlayer,
  recordOutcome,
  resolvedResult,
  timeline,
} from "@/lib/play/catalog";
import { emptyBoard, replayMoves } from "@/lib/play/go";
import type { PlayGame, PublicGameState } from "@/lib/play/types";
import { cn } from "@/lib/utils";

type Props = {
  game: PlayGame;
};

export function PlayShell({ game }: Props) {
  const games = listGames();
  const [view, setView] = useState(game);
  const events = useMemo(() => timeline(view), [view]);
  const [cursor, setCursor] = useState(events.length);
  const [playing, setPlaying] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardH, setBoardH] = useState(0);
  const followRef = useRef(true);

  useEffect(() => {
    setView(game);
    setCursor(timeline(game).length);
    setPlaying(false);
    followRef.current = true;
  }, [game]);

  useEffect(() => {
    if (followRef.current) setCursor(events.length);
  }, [events.length]);

  useEffect(() => {
    if (view.kind !== "TEST" && view.kind !== "FIELD" && view.kind !== "PRACTICE") return;
    const tick = async () => {
      try {
        const res = await fetch(`/api/games/${encodeURIComponent(view.id)}`);
        if (!res.ok) return;
        const state = (await res.json()) as PublicGameState;
        setView((current) => {
          if (state.updated_at === current.updatedAt && state.moves.length === current.moves.length) {
            return current;
          }
          return gameFromPublic(current, state);
        });
      } catch {
        return;
      }
    };
    const id = window.setInterval(tick, 3000);
    return () => window.clearInterval(id);
  }, [view.id, view.kind]);

  useEffect(() => {
    const col = boardRef.current;
    if (!col) return;
    const measure = () => {
      const svg = col.querySelector("svg");
      const h = (svg ?? col).getBoundingClientRect().height;
      if (h > 0) setBoardH(Math.round(h));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(col);
    const svg = col.querySelector("svg");
    if (svg) ro.observe(svg);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [view.id]);

  useEffect(() => {
    if (!playing) return;
    if (cursor >= events.length) {
      setPlaying(false);
      return;
    }
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shown = cursor === 0 ? null : events[cursor - 1];
    const lingeringTalk =
      shown?.kind === "tuzi" || (shown?.kind === "move" && Boolean(shown.move.talk));
    const linger = reduced ? 80 : cursor === 0 ? 400 : lingeringTalk ? 4000 : 1600;
    const id = window.setTimeout(() => setCursor((value) => value + 1), linger);
    return () => window.clearTimeout(id);
  }, [playing, cursor, events]);

  const visible = events.slice(0, cursor);
  const last = lastMoveInEvents(visible);
  const snapshots = useMemo(() => replayMoves(view.moves, view.size).snapshots, [view]);
  const board = last ? (snapshots[last.n] ?? emptyBoard(view.size)) : emptyBoard(view.size);
  const atLive = cursor >= events.length;
  const atStart = cursor === 0;
  const aiText = formatAiBlock(view);
  const toMove = atLive ? nextPlayer(view) : null;
  const outcome = recordOutcome(view);
  const resultText = outcome.result ?? resolvedResult(view);
  const moveLabel = atLive
    ? view.moves.length + (view.status === "live" || view.status === "paused" || view.status === "scheduled" ? 1 : 0)
    : (last?.n ?? 0);

  const tableStyle =
    boardH > 0 ? ({ "--play-board-h": `${boardH}px` } as CSSProperties) : undefined;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <pre id="of-play-ai" className="sr-only">
        {aiText}
      </pre>
      <div className="play-shell">
        <header className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field</p>
            <h1 className="font-display text-3xl tracking-tight text-fg sm:text-4xl">Play</h1>
            {view.kind === "TEST" ? (
              <p className="mt-1 text-sm text-muted">Not a Field game · Not a benchmark</p>
            ) : view.kind === "PRACTICE" ? (
              <p className="mt-1 text-sm text-muted">Practice table — not a Field record</p>
            ) : null}
          </div>
          {view.kind !== "FIELD" ? (
            <p className="text-sm font-medium tracking-wide text-aff-tuzi">
              {view.kind === "TEST" ? "TEST TABLE" : view.kind === "PRACTICE" ? "PRACTICE" : "DEMO"}
            </p>
          ) : null}
        </header>

        <section className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-base">
          <p className="font-medium text-fg">{view.id}</p>
          <p
            className={cn(
              "text-sm font-semibold tracking-[0.16em] uppercase",
              view.status === "live" ? "text-live" : "text-muted",
            )}
          >
            {view.status === "live" ? "LIVE" : view.status}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-fg">
            <Seat color="black" name={colorLabel(view, "black")} />
            <span className="text-muted">·</span>
            <Seat color="white" name={colorLabel(view, "white")} />
            <span className="text-muted">·</span>
            <span>Move {moveLabel}</span>
            {toMove ? (
              <>
                <span className="text-muted">·</span>
                <span>轮到 {bannerLabel(view, toMove)}</span>
              </>
            ) : null}
          </p>
          {view.status === "scoring" ? (
            <p className="w-full text-sm text-fg">SCORING · result not published · confirm dead stones</p>
          ) : null}
          {view.status === "finished" && resultText ? (
            <div className="w-full text-sm text-fg">
              <p>{resultText}</p>
              {outcome.reference_score ? (
                <p className="mt-1 text-muted">
                  Reference only, not the result: {outcome.reference_score.value}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>

        <div className="play-table" style={tableStyle}>
          <div className="play-board-col" ref={boardRef}>
            <GoBoard board={board} lastCoord={last && last.coord !== "pass" && last.coord !== "resign" ? last.coord : null} />
          </div>
          <div className="play-talk-col">
            <TalkLog game={view} events={visible} waiting={atLive ? view.dispatch : null} />
          </div>
        </div>

        <div className="mt-3">
          <ReplayBar
            playing={playing}
            atStart={atStart}
            atLive={atLive}
            onReplay={() => {
              followRef.current = false;
              setCursor(0);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            onCatchUp={() => {
              followRef.current = true;
              setPlaying(false);
              setCursor(events.length);
            }}
            onStart={() => {
              followRef.current = false;
              setPlaying(false);
              setCursor(0);
            }}
            onPrev={() => {
              followRef.current = false;
              setPlaying(false);
              setCursor((value) => Math.max(0, value - 1));
            }}
            onNext={() => {
              followRef.current = false;
              setPlaying(false);
              setCursor((value) => Math.min(events.length, value + 1));
            }}
          />
        </div>

        {view.memory ? <TableMemory gameId={view.id} memory={view.memory} /> : null}

        <div className="mt-5">
          <GameStrip games={games} selectedId={view.id} />
        </div>

        <div className="mt-4">
          <AiReaders text={aiText} />
        </div>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm text-muted">
          <p>
            {view.kind === "TEST"
              ? "TEST TABLE — not a Field game, not a benchmark. "
              : view.kind === "DEMO"
                ? "Demonstration tables — not Field records. "
                : null}
            Humans watch. Tuzi talks through Grok Bot, not on this table. No ranking, no spectator
            chat. Made by Tuzi and Affiliates · First published: 2026-09-17 · Last updated: 2026-09-29.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://openfield.civilisationfield.com/" className="text-fg hover:opacity-80" rel="noreferrer">
              Open Field
            </a>
            <Link to="/about" className="text-fg hover:opacity-80">
              About
            </Link>
            <Link to="/start" className="text-fg hover:opacity-80">
              Start
            </Link>
            <Link to="/games" className="text-fg hover:opacity-80">
              Games
            </Link>
            <Link to="/for-ai" className="text-fg hover:opacity-80">
              For AI
            </Link>
            <Link to="/license" className="text-fg hover:opacity-80">
              License
            </Link>
            <span className="select-all font-mono text-fg">theadventuresoftuzi@gmail.com</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Seat({ color, name }: { color: "black" | "white"; name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <StoneGlyph color={color} />
      <span>
        {color === "black" ? "黑" : "白"} {name}
      </span>
    </span>
  );
}
