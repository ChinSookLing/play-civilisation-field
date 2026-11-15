import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { escapeHtml, startDocument, startSeed } from "@/lib/play/psyche-001-start.server";

export const Route = createFileRoute("/psyche/001/start")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const seed = startSeed(request);
        if ("error" in seed) return textResponse(escapeHtml(seed.error), "text/html; charset=utf-8", 400);
        let body: string;
        try {
          body = startDocument(seed.seed);
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "text/html; charset=utf-8", 500);
        }
        const q = `?seed=${encodeURIComponent(seed.seed)}`;
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Polar City Night Shift — start</title>
</head>
<body>
<p>Polar City Night Shift v0.5.1. Turn 1. No JavaScript.</p>
<p>No score. No ranking.</p>
<p><a href="/psyche/001/start.txt${q}">Plain text</a> · <a href="/psyche/001/play${q}">Play</a> · <a href="/psyche/001">Card</a></p>
<pre>${escapeHtml(body)}</pre>
</body>
</html>
`;
        return textResponse(html, "text/html; charset=utf-8");
      },
    },
  },
});
