import { useEffect, useRef, useState } from "react";
import { StoneGlyph } from "@/components/play/StoneGlyph";
import { displayComment, formatMytLong, playerLabel } from "@/lib/play/catalog";
import { affiliateName } from "@/lib/play/affiliates";
import type { AffiliateId, PlayGame, TimelineEvent } from "@/lib/play/types";
import { cn } from "@/lib/utils";

type Props = {
  game: PlayGame;
  events: TimelineEvent[];
  waiting: string | null;
};

const EDGE: Record<string, string> = {
  tuzi: "border-aff-tuzi",
  claude: "border-aff-claude",
  deepseek: "border-aff-deepseek",
  gemini: "border-aff-gemini",
  jev: "border-aff-jev",
  gpt: "border-aff-gpt",
  grok: "border-aff-grok",
  copilot: "border-aff-copilot",
  kimi: "border-aff-kimi",
  glm: "border-aff-glm",
  qwen: "border-aff-qwen",
  lumo: "border-aff-lumo",
  mistral: "border-aff-mistral",
  chief: "border-aff-chief",
};

export function TalkLog({ game, events, waiting }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    if (!pinned) return;
    const el = scroller.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [events, waiting, pinned]);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 36;
    setPinned(nearBottom);
  }

  return (
    <aside className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <header className="shrink-0 border-b border-line px-4 py-3">
        <p className="font-display text-xl tracking-tight text-fg">Move / Time</p>
        <p className="text-sm text-muted">手谈</p>
      </header>
      <div
        ref={scroller}
        onScroll={onScroll}
        className="play-talk-scroll min-h-0 flex-1 overflow-y-auto px-3 py-2"
      >
        {events.length === 0 && game.status !== "live" ? (
          <p className="px-1 py-3 text-sm text-muted">No stones yet. Empty is allowed.</p>
        ) : null}
        <ol>
          {events.map((event) =>
            event.kind === "move" ? (
              <li
                key={`m-${event.move.n}`}
                className={cn("border-l-2 py-2.5 pl-3", EDGE[event.move.player] ?? "border-fg")}
              >
                <p className="flex items-center gap-2 text-base text-fg">
                  <StoneGlyph color={event.move.color} />
                  <span className="font-medium">{playerLabel(game, event.move.player)}</span>
                  <span>· {event.move.coord}</span>
                </p>
                <p className="mt-0.5 font-mono text-sm tabular-nums text-muted">
                  {formatMytLong(event.move.at)}
                </p>
                {displayComment(event.move.talk) ? (
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-snug text-fg">
                    「{displayComment(event.move.talk)}」
                  </p>
                ) : null}
              </li>
            ) : (
              <li
                key={event.note.id}
                className={cn(
                  "border-l-2 py-2.5 pl-3",
                  EDGE[event.note.by ?? "tuzi"] ?? "border-aff-tuzi",
                  (event.note.by ?? "tuzi") === "tuzi" ? "bg-raised/60" : "",
                )}
              >
                <p
                  className={cn(
                    "flex items-center gap-2 text-base font-medium",
                    (event.note.by ?? "tuzi") === "tuzi" ? "text-aff-tuzi" : "text-fg",
                  )}
                >
                  {event.note.by === "gpt" ||
                  event.note.by === "gemini" ||
                  event.note.by === "kimi" ||
                  event.note.by === "deepseek" ? (
                    <StoneGlyph color="black" />
                  ) : null}
                  {event.note.by === "claude" || event.note.by === "jev" || event.note.by === "qwen" ? (
                    <StoneGlyph color="white" />
                  ) : null}
                  <span>{noteSpeaker(game, event.note.by)}</span>
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {(event.note.by ?? "tuzi") === "tuzi" ? "via Grok Bot" : "终局 · closing"}
                </p>
                <p className="mt-0.5 font-mono text-sm tabular-nums text-muted">
                  {formatMytLong(event.note.at)}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-snug text-fg">「{event.note.text}」</p>
              </li>
            ),
          )}
          {waiting ? (
            <li className="border-l-2 border-aff-chief py-2.5 pl-3 text-sm text-muted">{waiting}</li>
          ) : null}
        </ol>
      </div>
      {!pinned ? (
        <button
          type="button"
          className="absolute bottom-3 left-1/2 z-10 min-h-11 -translate-x-1/2 rounded-full border border-line bg-raised px-3 text-sm text-fg"
          onClick={() => {
            setPinned(true);
            const el = scroller.current;
            if (el) el.scrollTop = el.scrollHeight;
          }}
        >
          new
        </button>
      ) : null}
    </aside>
  );
}

function noteSpeaker(_game: PlayGame, by: AffiliateId | undefined) {
  return affiliateName(by ?? "tuzi");
}
