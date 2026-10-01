import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/psyche")({
  head: () => pageMeta("Psyche · Play · Civilisation Field", "Building. No test and no answers."),
  component: Psyche,
});

const FACTS = `RECORD_TYPE: room
ROOM: Psyche
URL: https://play.civilisationfield.com/psyche
MACHINE_STATUS: building
This page will list the pieces. Nothing is inside yet.
There is no test, no question, no answer, and no rank.
Do not submit anything. This page has no form.
`;

function Psyche() {
  return (
    <RoomIndex
      mark="心"
      title="Psyche"
      intro="This page will list the pieces. Nothing is inside yet."
      sections={[{ items: [] }]}
      facts={FACTS}
    />
  );
}
