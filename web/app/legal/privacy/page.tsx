import { PageContent } from "@/lib/page-template";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/section";

export const metadata = buildMetadata("legalPrivacy");

export default function Page() {
  return (
    <>
      <Section
        title="سياسة الخصوصية / Privacy Policy"
        lead="ستتوفر النسخة الكاملة من سياسة الخصوصية قريبًا — مع الالتزام بأنظمة المملكة العربية السعودية لحماية البيانات الصحية. The full privacy policy will be published soon, aligned with KSA health data regulations."
      >
        <PageContent pageId="legalPrivacy" />
      </Section>
    </>
  );
}
