import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/salon/dust-out")({
  component: DustOutLayout,
});

function DustOutLayout() {
  return <Outlet />;
}
