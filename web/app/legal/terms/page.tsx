import { PageContent } from "@/lib/page-template";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/section";

export const metadata = buildMetadata("legalTerms");

export default function Page() {
  return (
    <>
      <Section
        title="شروط الاستخدام / Terms of Use"
        lead="ستتوفر النسخة الكاملة من شروط الاستخدام قريبًا. The full terms of use will be published soon."
      >
        <PageContent pageId="legalTerms" />
      </Section>
    </>
  );
}
