import { webPages } from "@azri/content";
import { renderSections } from "@/components/sections";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function HomePage() {
  const binding = webPages.home;
  return (
    <>
      {binding.requiresMedicalDisclaimer ? <MedicalDisclaimer /> : null}
      {renderSections(binding.sections)}
    </>
  );
}
