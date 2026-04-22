import { webPages, type PageId } from "@azri/content";
import type { PageBinding } from "@azri/content/page-bindings";
import { renderSections } from "@/components/sections";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

export function PageContent({ pageId }: { pageId: PageId }) {
  const binding: PageBinding = webPages[pageId];
  return (
    <>
      {binding.requiresMedicalDisclaimer ? <MedicalDisclaimer /> : null}
      {renderSections(binding.sections)}
    </>
  );
}
