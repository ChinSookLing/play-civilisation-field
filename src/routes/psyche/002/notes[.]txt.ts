import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/psyche/002/notes.txt")({
  server: {
    handlers: {
      GET: () => new Response(null, { status: 308, headers: { location: "/psyche/002.txt" } }),
    },
  },
});
