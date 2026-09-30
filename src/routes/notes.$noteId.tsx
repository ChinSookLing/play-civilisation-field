import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getFieldNote } from "@/lib/play/field-notes";

export const Route = createFileRoute("/notes/$noteId")({
  loader: ({ params }) => {
    const note = getFieldNote(params.noteId);
    if (!note) throw notFound();
    return note;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} · Play` : "Note · Play" },
      { name: "description", content: "A field note from Play. It is not a game record." },
    ],
  }),
  component: FieldNotePage,
});

function FieldNotePage() {
  const note = Route.useLoaderData();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">
          {note.kind === "self-statement"
            ? "信使的自述 · self-statement · not a table record"
            : note.kind === "observation"
              ? "CPH field note · not a spec change"
              : "Technical note"}{" "}
          · {note.gameId}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">{note.title}</h1>
        <p className="mt-3 text-sm text-muted">
          {note.by} · {note.date}
        </p>
        <div className="mt-8 space-y-5 whitespace-pre-wrap text-base leading-relaxed text-muted">
          {note.body}
        </div>
        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link to="/go/$gameId" params={{ gameId: note.gameId }} className="text-fg hover:opacity-80">
            Back to {note.gameId}
          </Link>
          <Link to="/" className="text-muted hover:text-fg">
            Table
          </Link>
        </div>
      </div>
    </main>
  );
}
