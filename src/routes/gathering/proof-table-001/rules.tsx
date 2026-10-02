import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gathering/proof-table-001/rules")({
  beforeLoad: () => {
    throw redirect({ to: "/gathering/proof-table-003/rules" });
  },
});
