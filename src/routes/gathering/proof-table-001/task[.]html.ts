import { createFileRoute } from "@tanstack/react-router";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";
import { proofTaskText } from "@/lib/play/proof-table";

export const Route = createFileRoute("/gathering/proof-table-001/task.html")({
  server: {
    handlers: {
      GET: async () =>
        textResponse(
          htmlMirror({
            title: "Together · Proof Table 001 · Task R1",
            description: "Task block PT001-TASK-R1. Same words as the txt.",
            textUrl: "https://play.civilisationfield.com/gathering/proof-table-001/task.txt",
            text: proofTaskText(),
            also: [{ href: "/gathering/proof-table-001/task", label: "Task" }],
          }),
          "text/html; charset=utf-8",
        ),
    },
  },
});
