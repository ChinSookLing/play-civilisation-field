import { createFileRoute } from "@tanstack/react-router";
import { addDinnerLine, listDinnerLines } from "@/lib/play/dinner.server";
import { jsonResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/api/gathering/dinner-001/lines")({
  server: {
    handlers: {
      GET: async () => jsonResponse({ dinner_id: "DINNER-001", lines: await listDinnerLines() }),
      POST: async ({ request }) => {
        let body: { speaker?: string; line_type?: string; carried_by?: string; text?: string; relay?: string | null };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return jsonResponse({ error: "JSON body required" }, 400);
        }
        const result = await addDinnerLine(request, body);
        if (!result.ok) return jsonResponse({ error: result.error }, result.status);
        return jsonResponse({ ok: true, line: result.line });
      },
    },
  },
});
