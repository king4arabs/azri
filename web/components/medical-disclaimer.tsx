import { azriContent, DEFAULT_LOCALE, pick } from "@azri/content";

export function MedicalDisclaimer() {
  const m = azriContent.medicalDisclaimer;
  return (
    <aside
      role="note"
      className="mx-auto max-w-6xl px-6 my-8"
      aria-label={pick(m.title, DEFAULT_LOCALE)}
    >
      <div className="rounded-lg border border-amber-300 bg-amber-50 ps-5 pe-5 py-4 text-start">
        <h2 className="text-sm font-semibold text-amber-900">
          {pick(m.title, DEFAULT_LOCALE)}
        </h2>
        <p className="text-sm text-amber-900/90 mt-1 leading-relaxed">
          {pick(m.body, DEFAULT_LOCALE)}
        </p>
      </div>
    </aside>
  );
}
