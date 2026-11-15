import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { TYPE_C_DRAFT } from "@/lib/play/type-c-draft";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export const Route = createFileRoute("/draft/type-c")({
  server: {
    handlers: {
      GET: () => {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DRAFT · Play Type-C</title>
</head>
<body>
<p>DRAFT. Not adopted. <a href="/draft/type-c.txt">Plain text</a>.</p>
<pre>${escapeHtml(TYPE_C_DRAFT)}</pre>
</body>
</html>
`;
        return textResponse(html, "text/html; charset=utf-8");
      },
    },
  },
});
