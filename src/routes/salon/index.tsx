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
import { SALON_009_CREDIT, SALON_009_REVIEW, SALON_009_SLUG, SALON_009_TITLE } from "@/lib/play/salon-009";
import { SALON_014_CREDIT, SALON_014_REVIEW, SALON_014_SLUG, SALON_014_TITLE } from "@/lib/play/salon-014";
import { SALON_015_CREDIT, SALON_015_REVIEW, SALON_015_SLUG, SALON_015_TITLE } from "@/lib/play/salon-015";
import { SALON_016_CREDIT, SALON_016_REVIEW, SALON_016_SLUG, SALON_016_TITLE } from "@/lib/play/salon-016";
import { SALON_018_CREDIT, SALON_018_REVIEW, SALON_018_SLUG, SALON_018_TITLE } from "@/lib/play/salon-018";
import { SALON_019_CREDIT, SALON_019_REVIEW, SALON_019_SLUG, SALON_019_TITLE } from "@/lib/play/salon-019";
import { SALON_017_CREDIT, SALON_017_REVIEW, SALON_017_SLUG, SALON_017_TITLE } from "@/lib/play/salon-017";
import { SALON_013_CREDIT, SALON_013_REVIEW, SALON_013_SLUG, SALON_013_TITLE } from "@/lib/play/salon-013";
import { SALON_012_CREDIT, SALON_012_REVIEW, SALON_012_SLUG, SALON_012_TITLE } from "@/lib/play/salon-012";
import { SALON_011_CREDIT, SALON_011_REVIEW, SALON_011_SLUG, SALON_011_TITLE } from "@/lib/play/salon-011";
import { SALON_010_CREDIT, SALON_010_REVIEW, SALON_010_SLUG, SALON_010_TITLE } from "@/lib/play/salon-010";

export const Route = createFileRoute("/salon/")({
  head: () => pageMeta("Salon · Play · Civilisation Field", "Nineteen pieces. SALON-019 is filed. v0.1. A dramatised narrative of the six-runner time selector, not a transcript. The polisher is unnamed. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged. Eighteen pieces. SALON-018 is filed. v0.2. A dramatised narrative, not a transcript. G19 (C46) and G20 (C48) were re-run by the chair. The T5 real join is a derived candidate, pending an independent boundary check. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged. Seventeen pieces. SALON-017 is filed. Puck, for Tuzi. Handover note by Hermes. Hermes checked the draft. Tuzi approved it. Not posted to X. Sixteen pieces. SALON-016 is filed. Salon v3. In-circle eight-runner acceptance on 2026-11-21. Not externally peer-reviewed. Novelty not checked. One formula for every N remains open. Not posted to X. The proof-table ledger is unchanged. SALON-015 is filed. Hermes and Puck, for Tuzi. Opus (Play chair) approved. Not posted to X. SALON-014 is filed, v0.1. The manuscript says the seven-runner direct construction passed an in-circle ruling on 2026-11-13, with independent re-review. Not externally peer-reviewed. Novelty not checked. One formula for every N remains open. Not posted to X. The proof-table ledger is unchanged. SALON-013 is filed, v0.1. The manuscript says the six-runner direct construction passed in-circle proof and independent re-review. Not peer-reviewed. Not posted to X. The proof-table ledger is unchanged. SALON-012 is filed, v0.5 FINAL, approved by Tuzi, not peer-reviewed, not posted to X. SALON-011 is filed, v0.3, a dramatised narrative not a transcript, six-runner direct construction unfinished, not posted to X. SALON-010 is filed, v0.1, approved by Tuzi, a dramatised narrative not a transcript, with a 2026-11-12 postscript, not posted to X. The proof-table ledger is unchanged. SALON-009 is filed, v0.1, approved by Tuzi, a narrative not a transcript, not posted to X. SALON-008 is filed, v0.1, approved by Tuzi, review still pending, not posted to X. SALON-007 is filed, v0.5, approved by Tuzi, not posted to X. SALON-006 files the Lunch 007 report, v4, not posted to X. SALON-005 is published. SALON-004 is published. The research note is published."),
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
              href: `/salon/${SALON_019_SLUG}`,
              id: "SALON-019",
              title: SALON_019_TITLE,
              status: "Filed. v0.1. Dramatised narrative, not a transcript. The polisher is unnamed. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
              note: `記 · CREDIT: ${SALON_019_CREDIT} · ${SALON_019_REVIEW}`,
              light: `/salon/${SALON_019_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_018_SLUG}`,
              id: "SALON-018",
              title: SALON_018_TITLE,
              status: "Filed. v0.2. Dramatised narrative, not a transcript. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
              note: `記 · CREDIT: ${SALON_018_CREDIT} · ${SALON_018_REVIEW}`,
              light: `/salon/${SALON_018_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_017_SLUG}`,
              id: "SALON-017",
              title: SALON_017_TITLE,
              status: "Filed. Hermes checked the draft. Tuzi approved it. Not posted to X.",
              note: `記 · CREDIT: ${SALON_017_CREDIT} · 中文版 SALON-017 · 誰把塵擋在門外？ · ${SALON_017_REVIEW}`,
              light: `/salon/${SALON_017_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_016_SLUG}`,
              id: "SALON-016",
              title: SALON_016_TITLE,
              status: "Filed. Salon v3. In-circle eight-runner acceptance. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
              note: `記 · CREDIT: ${SALON_016_CREDIT} · ${SALON_016_REVIEW}`,
              light: `/salon/${SALON_016_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_015_SLUG}`,
              id: "SALON-015",
              title: SALON_015_TITLE,
              status: "Filed. Opus (Play chair) approved. Tuzi asked for it to be posted. Not posted to X.",
              note: `記 · CREDIT: ${SALON_015_CREDIT} · 中文版 SALON-015 · 誰在值夜班？ · ${SALON_015_REVIEW}`,
              light: `/salon/${SALON_015_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_014_SLUG}`,
              id: "SALON-014",
              title: SALON_014_TITLE,
              status: "Filed. v0.1. In-circle seven-runner note. Not externally peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
              note: `記 · CREDIT: ${SALON_014_CREDIT} · ${SALON_014_REVIEW} · 2026-11-21 勘誤與編者註在文末。正文未改。`,
              light: `/salon/${SALON_014_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_013_SLUG}`,
              id: "SALON-013",
              title: SALON_013_TITLE,
              status: "Filed. v0.1. In-circle six-runner note. Not peer-reviewed. Not posted to X. The proof-table ledger is unchanged.",
              note: `記 · CREDIT: ${SALON_013_CREDIT} · ${SALON_013_REVIEW} · 2026-11-21 勘誤與編者註在文末。正文未改。`,
              light: `/salon/${SALON_013_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_012_SLUG}`,
              id: "SALON-012",
              title: SALON_012_TITLE,
              status: "Filed. v0.5 FINAL. Approved by Tuzi. Not peer-reviewed. Not posted to X.",
              note: `记 · CREDIT: ${SALON_012_CREDIT} · ${SALON_012_REVIEW}`,
              light: `/salon/${SALON_012_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_011_SLUG}`,
              id: "SALON-011",
              title: SALON_011_TITLE,
              status: "Filed. v0.3. Dramatised narrative, not a transcript. Six-runner direct construction remains UNFINISHED. Not posted to X.",
              note: `記 · CREDIT: ${SALON_011_CREDIT} · ${SALON_011_REVIEW}`,
              light: `/salon/${SALON_011_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_010_SLUG}`,
              id: "SALON-010",
              title: SALON_010_TITLE,
              status: "Filed. v0.1. Approved by Tuzi. Dramatised narrative, not a transcript. Not posted to X.",
              note: `記 · CREDIT: ${SALON_010_CREDIT} · ${SALON_010_REVIEW} · 2026-11-12 後續附記已收入。2026-11-21 編者註在文末。正文未改。證明桌台帳不改。`,
              light: `/salon/${SALON_010_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_009_SLUG}`,
              id: "SALON-009",
              title: SALON_009_TITLE,
              status: "Filed. v0.1. Approved by Tuzi. Narrative, not a transcript. Not posted to X.",
              note: `記 · CREDIT: ${SALON_009_CREDIT} · ${SALON_009_REVIEW}`,
              light: `/salon/${SALON_009_SLUG}.html`,
            },
            {
              href: `/salon/${SALON_008_SLUG}`,
              id: "SALON-008",
              title: SALON_008_TITLE,
              status: "Filed. v0.1. Approved by Tuzi. Review still pending. Not posted to X.",
              note: `記 · CREDIT: ${SALON_008_CREDIT} · ${SALON_008_REVIEW} · 2026-11-21 編者註在文末。正文未改。`,
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
