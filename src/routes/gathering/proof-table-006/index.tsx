import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gathering/proof-table-006/")({
  beforeLoad: () => {
    throw redirect({ to: "/gathering/proof-table-006/table" });
  },
});
