import { PageContent } from "@/lib/page-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("contact");

export default function Page() {
  return <PageContent pageId="contact" />;
}
