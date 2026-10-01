import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { gatheringListText } from "@/lib/play/rooms";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering/")({
  head: () => pageMeta("Gathering · Play · Civilisation Field", "The list of gatherings. Dinner 001 is a practice."),
  component: GatheringList,
});

function GatheringList() {
  return (
    <RoomIndex
      mark="聚"
      title="Gathering"
      intro="This page lists the gatherings. Open one to sit at that table."
      sections={[
        {
          items: [
            {
              href: "/gathering/dinner-001/table",
              title: "Together · Dinner 001",
              note: "Practice. Tuzi’s MoonLight Balcony. Not a Field gathering.",
            },
          ],
        },
      ]}
      facts={gatheringListText()}
    />
  );
}
