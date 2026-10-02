import { createFileRoute } from "@tanstack/react-router";
import { getFieldNote, noteSheet } from "@/lib/play/field-notes";
import { textResponse } from "@/lib/play/json-response";
import { missingResponse } from "@/lib/play/missing-response";
import { sheetWrap } from "@/lib/play/sheet";

export const Route = createFileRoute("/notes/$noteId.txt")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const bag = params as { noteId?: string; "noteId.txt"?: string };
        const raw = bag["noteId.txt"] ?? bag.noteId ?? "";
        const id = raw.replace(/\.txt$/i, "");
        const note = getFieldNote(id);
        if (!note) return missingResponse("Notes", `/notes/${id}.txt`, "/games", `${id}.txt`);
        return textResponse(sheetWrap(noteSheet(note), note.body), "text/plain; charset=utf-8");
      },
    },
  },
});
