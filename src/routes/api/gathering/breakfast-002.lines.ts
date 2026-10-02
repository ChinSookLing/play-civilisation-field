import { createFileRoute } from "@tanstack/react-router";
import { BREAKFAST_ID } from "@/lib/play/breakfast";
import { addGatheringLine, listGatheringLines } from "@/lib/play/dinner.server";
import { jsonResponse } from "@/lib/play/json-response";

export const Route = createFileRoute("/api/gathering/breakfast-002/lines")({
  server: {
    handlers: {
      GET: async () => jsonResponse({ gathering_id: BREAKFAST_ID, lines: await listGatheringLines(BREAKFAST_ID) }),
      POST: async ({ request }) => {
        let body: { speaker?: string; line_type?: string; carried_by?: string; text?: string; relay?: string | null };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return jsonResponse({ error: "JSON body required" }, 400);
        }
        const result = await addGatheringLine(BREAKFAST_ID, request, body);
        if (!result.ok) return jsonResponse({ error: result.error }, result.status);
        return jsonResponse({ ok: true, line: result.line });
      },
    },
  },
});
