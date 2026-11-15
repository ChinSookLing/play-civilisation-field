import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/salon/night-shift")({
  component: NightShiftLayout,
});

function NightShiftLayout() {
  return <Outlet />;
}
