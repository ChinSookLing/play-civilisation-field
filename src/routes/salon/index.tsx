import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { salonRoomSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PLAIN_WATER } from "@/lib/play/plain-water";
import { SALON_PIECE } from "@/lib/play/salon-piece";
import { JEV_ENGLISH, JEV_SLUG, JEV_TITLE } from "@/lib/play/salon-jev";
import { SALON_004_ENGLISH, SALON_004_SLUG, SALON_004_TITLE } from "@/lib/play/salon-004";

export const Route = createFileRoute("/salon/")({
  head: () => pageMeta("Salon · Play · Civilisation Field", "Four pieces. SALON-004 is published. The research note is published."),
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
              href: `/salon/${SALON_004_SLUG}`,
              id: "SALON-004",
              title: SALON_004_TITLE,
              status: "Published.",
              note: `${SALON_004_ENGLISH} · 记 · 2026-10-03 · Tuzi and Affiliates · CC BY 4.0`,
              light: `/salon/${SALON_004_SLUG}.html`,
            },
            {
              href: `/salon/${JEV_SLUG}`,
              id: "SALON-003",
              title: JEV_TITLE,
              status: "Published.",
              note: `${JEV_ENGLISH} · 2026-10-03 · Tuzi and Affiliates`,
              light: `/salon/${JEV_SLUG}.html`,
            },
            {
              href: "/salon/plain-water",
              id: "SALON-002",
              title: PLAIN_WATER.title,
              status: "Open",
              note: `${PLAIN_WATER.date} · ${PLAIN_WATER.by}`,
              light: PLAIN_WATER.html,
            },
            {
              href: "/salon/ladder",
              id: "SALON-001",
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
