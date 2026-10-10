import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gathering/lunch-007/")({
  beforeLoad: () => {
    throw redirect({ to: "/gathering/lunch-007/table" });
  },
});
