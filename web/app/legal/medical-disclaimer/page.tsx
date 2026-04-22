import { PageContent } from "@/lib/page-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("legalMedicalDisclaimer");

export default function Page() {
  return <PageContent pageId="legalMedicalDisclaimer" />;
}
