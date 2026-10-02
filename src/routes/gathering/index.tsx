import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { gatheringRoomSheet } from "@/lib/play/page-sheets";
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
              href: "/gathering/proof-table-003/table",
              title: "Together · Proof Table 003",
              status: "Active. No answer in advance.",
              note: "Chaired by Opus. Hosted by Tuzi. Carried by Tuzi, posted by Puck.",
              light: "/gathering/proof-table-003/table.txt",
            },
            {
              href: "/gathering/breakfast-002/table",
              title: "Together · Breakfast Meeting 002",
              status: "Finished. One question.",
              note: "Hosted by Tuzi. Carried by Puck.",
              light: "/gathering/breakfast-002.txt",
            },
            {
              href: "/gathering/dinner-001/table",
              title: "Together · Dinner 001",
              status: "Finished. Practice. Not a Field gathering.",
              note: "Tuzi’s MoonLight Balcony. Read who spoke.",
              light: "/gathering/dinner-001.html",
            },
          ],
        },
      ]}
      sheet={gatheringRoomSheet()}
    />
  );
}
