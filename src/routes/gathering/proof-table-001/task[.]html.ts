import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gathering/proof-table-001/task.html")({
  server: {
    handlers: {
      GET: () => new Response(null, { status: 308, headers: { location: "/gathering/proof-table-003/task.html" } }),
    },
  },
});
