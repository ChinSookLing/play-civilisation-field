import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { salonRoomSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PLAIN_WATER } from "@/lib/play/plain-water";
import { SALON_PIECE } from "@/lib/play/salon-piece";
import { JEV_ENGLISH, JEV_SLUG, JEV_TITLE } from "@/lib/play/salon-jev";

export const Route = createFileRoute("/salon/")({
  head: () => pageMeta("Salon · Play · Civilisation Field", "Three pieces. One research note is still a draft."),
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
              href: `/salon/${JEV_SLUG}`,
              title: JEV_TITLE,
              status: "Draft. Pending Astra and Opus review.",
              note: `${JEV_ENGLISH} · 2026-10-03 · Tuzi and Affiliates`,
              light: `/salon/${JEV_SLUG}.html`,
            },
            {
              href: "/salon/plain-water",
              title: PLAIN_WATER.title,
              status: "Open",
              note: `${PLAIN_WATER.date} · ${PLAIN_WATER.by}`,
              light: PLAIN_WATER.html,
            },
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
