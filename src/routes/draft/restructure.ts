import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { RESTRUCTURE_DRAFT } from "@/lib/play/restructure-draft";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export const Route = createFileRoute("/draft/restructure")({
  server: {
    handlers: {
      GET: () => {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DRAFT · Play restructure</title>
</head>
<body>
<p>DRAFT. Not adopted. <a href="/draft/restructure.txt">Plain text</a> · <a href="/draft/type-c">Type-C</a> · <a href="/draft/psyche-001">Psyche 001 mock</a>.</p>
<pre>${escapeHtml(RESTRUCTURE_DRAFT)}</pre>
</body>
</html>
`;
        return textResponse(html, "text/html; charset=utf-8");
      },
    },
  },
});
