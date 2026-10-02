import { SiteFooter } from "@/components/play/SiteFooter";
import { sheetLabel, sheetMeta, type Sheet } from "@/lib/play/sheet";

export function SheetTop({ sheet }: { sheet: Sheet }) {
  return <pre className="whitespace-pre-wrap text-sm leading-relaxed text-fg">{sheetLabel(sheet)}</pre>;
}

export function SheetBottom({ sheet }: { sheet: Sheet }) {
  return (
    <>
      <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">{sheetMeta(sheet)}</pre>
      <SiteFooter updated={sheet.asOf} />
    </>
  );
}
