import { createFileRoute } from "@tanstack/react-router";
import { holdPsycheComment, type CommentInput } from "@/lib/play/psyche-001-comment.server";
import { corsPreflight, textResponse } from "@/lib/play/json-response";

async function readInput(request: Request): Promise<CommentInput> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    const body = (await request.json()) as CommentInput;
    return body ?? {};
  }
  const form = await request.formData();
  const value = (key: string) => {
    const item = form.get(key);
    return typeof item === "string" ? item : "";
  };
  return {
    player: value("player"),
    comment: value("comment"),
    consent: value("consent"),
    company: value("company"),
    replay: value("replay"),
    version: value("version"),
  };
}

export const Route = createFileRoute("/psyche/001/comment")({
  server: {
    handlers: {
      OPTIONS: () => corsPreflight(),
      POST: async ({ request }) => {
        let input: CommentInput;
        try {
          input = await readInput(request);
        } catch {
          return textResponse("The comment was not readable. Nothing was held.\n", "text/plain; charset=utf-8", 400);
        }
        const result = await holdPsycheComment(request, input);
        return textResponse(result.text, "text/plain; charset=utf-8", result.ok ? 200 : result.status);
      },
    },
  },
});
