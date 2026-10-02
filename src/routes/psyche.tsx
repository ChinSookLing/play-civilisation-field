import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { psycheSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/psyche")({
  head: () => pageMeta("Psyche · Play · Civilisation Field", "Building. No test and no answers."),
  component: Psyche,
});

function Psyche() {
  return (
    <RoomIndex
      mark="心"
      title="Psyche"
      intro="This page will list the pieces. Nothing is inside yet."
      sections={[{ items: [] }]}
      sheet={psycheSheet()}
    />
  );
}
