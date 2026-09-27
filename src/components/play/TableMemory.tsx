import { Link } from "@tanstack/react-router";
import type { TableMemory as Memory } from "@/lib/play/types";

type Props = {
  gameId: string;
  memory: Memory;
};

export function TableMemory({ gameId, memory }: Props) {
  return (
    <section className="mt-6 border border-line bg-panel px-4 py-4">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">Table Memory</p>
      <p className="mt-1 text-sm text-muted">What happened here.</p>
      {memory.image ? (
        <img
          src={memory.image}
          alt={memory.caption}
          className="mt-3 w-full rounded-md border border-line"
        />
      ) : null}
      <p className="mt-3 text-sm text-fg">
        {gameId} · {memory.date}
      </p>
      <p className="mt-1 text-base text-fg">{memory.caption}</p>
      <p className="mt-1 text-sm text-muted">{memory.context}</p>
      <p className="mt-3 text-sm text-fg">If you cannot see the drawing:</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{memory.seen_without_image}</p>
      {memory.feel ? (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Puck’s feel</p>
          <p className="mt-1 text-sm text-fg">{memory.feel.title}</p>
          <p className="mt-0.5 text-sm text-muted">
            {memory.feel.by} · {memory.feel.date}
          </p>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg">{memory.feel.text}</p>
        </div>
      ) : null}
      {memory.technical_note ? (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Technical note</p>
          <p className="mt-1 text-base text-fg">{memory.technical_note.title}</p>
          <p className="mt-1 text-sm text-muted">What broke on the path. Not the memory of the moment.</p>
          <Link
            to="/notes/$noteId"
            params={{ noteId: memory.technical_note.id }}
            className="mt-2 inline-block text-sm text-fg underline-offset-2 hover:underline"
          >
            Read {memory.technical_note.title}
          </Link>
        </div>
      ) : null}
      {memory.cph_note ? (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">CPH field note</p>
          <p className="mt-1 text-base text-fg">{memory.cph_note.title}</p>
          <p className="mt-1 text-sm text-muted">
            An observation from this game. Not a change to CPH v0.1.0.
          </p>
          <Link
            to="/notes/$noteId"
            params={{ noteId: memory.cph_note.id }}
            className="mt-2 inline-block text-sm text-fg underline-offset-2 hover:underline"
          >
            Read {memory.cph_note.title}
          </Link>
        </div>
      ) : null}
      <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-muted whitespace-pre">
        {aiBlock(gameId, memory)}
      </pre>
    </section>
  );
}

function aiBlock(gameId: string, memory: Memory) {
  const lines = [
    "TABLE MEMORY",
    `memory_id: ${memory.id}`,
    `game_id: ${gameId}`,
    `date: ${memory.date}`,
    "type: commemorative_image",
    `caption: ${memory.caption}`,
    `context: ${memory.context}`,
    `seen_without_image: ${memory.seen_without_image}`,
    "participants:",
    ...memory.participants.map((name) => `  ${name}`),
  ];
  if (memory.feel) {
    lines.push(
      "",
      "PUCK FEEL",
      `title: ${memory.feel.title}`,
      `by: ${memory.feel.by}`,
      `date: ${memory.feel.date}`,
      `text: ${memory.feel.text.replace(/\n/g, " / ")}`,
    );
  }
  if (memory.technical_note) {
    lines.push(
      "",
      "TECHNICAL NOTE",
      `note_id: ${memory.technical_note.id}`,
      `title: ${memory.technical_note.title}`,
      `path: ${memory.technical_note.path}`,
    );
  }
  if (memory.cph_note) {
    lines.push(
      "",
      "CPH FIELD NOTE",
      `note_id: ${memory.cph_note.id}`,
      `title: ${memory.cph_note.title}`,
      `path: ${memory.cph_note.path}`,
      "status: observation. Not a change to CPH v0.1.0.",
    );
  }
  return lines.join("\n");
}
