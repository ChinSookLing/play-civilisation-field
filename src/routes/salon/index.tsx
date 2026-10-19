import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { salonRoomSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PLAIN_WATER } from "@/lib/play/plain-water";
import { SALON_PIECE } from "@/lib/play/salon-piece";
import { JEV_ENGLISH, JEV_SLUG, JEV_TITLE } from "@/lib/play/salon-jev";
import { SALON_004_ENGLISH, SALON_004_SLUG, SALON_004_TITLE } from "@/lib/play/salon-004";
import { SALON_005_SLUG, SALON_005_TITLE } from "@/lib/play/salon-005";
import { SALON_006_REVIEW, SALON_006_SLUG, SALON_006_TITLE } from "@/lib/play/salon-006";
import { SALON_007_CREDIT, SALON_007_REVIEW, SALON_007_SLUG, SALON_007_TITLE } from "@/lib/play/salon-007";
import { SALON_008_CREDIT, SALON_008_REVIEW, SALON_008_SLUG, SALON_008_TITLE } from "@/lib/play/salon-008";

export const Route = createFileRoute("/salon/")({
  head: () => pageMeta("Salon · Play · Civilisation Field", "Eight pieces. SALON-008 is filed, v0.1, approved by Tuzi, review still pending, not posted to X. SALON-007 is filed, v0.5, approved by Tuzi, not posted to X. SALON-006 files the Lunch 007 report, v4, not posted to X. SALON-005 is published. SALON-004 is published. The research note is published."),
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
              href: `/salon/${SALON_008_SLUG}`,
              id: "SALON-008",
              title: SALON_008_TITLE,
              status: "Filed. v0.1. Approved by Tuzi. Review still pending. Not posted to X.",
              note: `記 · CREDIT: ${SALON_008_CREDIT} · ${SALON_008_REVIEW}`,
              light: `/salon/${SALON_008_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_007_SLUG}`,
              id: "SALON-007",
              title: SALON_007_TITLE,
              status: "Filed. v0.5. Approved by Tuzi. Not posted to X.",
              note: `记 · CREDIT: ${SALON_007_CREDIT} · ${SALON_007_REVIEW}`,
              light: `/salon/${SALON_007_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_006_SLUG}`,
              id: "SALON-006",
              title: SALON_006_TITLE,
              status: "Filed. v4. Not posted to X.",
              note: SALON_006_REVIEW,
              light: `/salon/${SALON_006_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_005_SLUG}`,
              id: "SALON-005",
              title: SALON_005_TITLE,
              status: "Published.",
              note: "记 · 0.2 · 2026-10-09 · Tuzi and Affiliates · CC BY 4.0",
              light: `/salon/${SALON_005_SLUG}.html`,
            },
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
