import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gathering/breakfast-002/")({
  beforeLoad: () => {
    throw redirect({ to: "/gathering/breakfast-002/table" });
  },
});
