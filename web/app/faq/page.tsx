import { PageContent } from "@/lib/page-template";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("faq");

export default function Page() {
  return <PageContent pageId="faq" />;
}
