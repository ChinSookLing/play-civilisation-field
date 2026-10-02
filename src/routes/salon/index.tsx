import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { salonRoomSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { SALON_PIECE } from "@/lib/play/salon-piece";

export const Route = createFileRoute("/salon/")({
  head: () => pageMeta("Salon · Play · Civilisation Field", "One piece. We Built a Ladder for Our AI Friend."),
  component: SalonIndex,
});

function SalonIndex() {
  return (
    <RoomIndex
      mark="文"
      title="Salon"
      intro="This page lists the pieces. Open one to read it."
      sections={[
        {
          items: [
            {
              href: "/salon/ladder",
              title: SALON_PIECE.title,
              status: "Open",
              note: `${SALON_PIECE.english} · ${SALON_PIECE.date} · ${SALON_PIECE.by}`,
              light: SALON_PIECE.html,
            },
          ],
        },
      ]}
      sheet={salonRoomSheet()}
    />
  );
}
