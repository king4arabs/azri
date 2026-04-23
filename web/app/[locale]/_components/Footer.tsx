import { azriContent, pick, type Locale } from "@azri/content";

export function Footer({ locale }: { locale: Locale }) {
  const { footer, medicalDisclaimer } = azriContent;

  return (
    <footer className="mt-16 border-t border-gray-200 px-6 py-8 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <div>
          <div className="font-semibold text-gray-900">
            {pick(footer.brand, locale)}
          </div>
          <div className="text-gray-500">{pick(footer.tagline, locale)}</div>
          <p className="mt-2 max-w-2xl">{pick(footer.description, locale)}</p>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            {pick(medicalDisclaimer.body, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
