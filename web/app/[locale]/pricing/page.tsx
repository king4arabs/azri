import { notFound } from "next/navigation";
import { azriContent, pick } from "@azri/content";
import { isLocale } from "../../lib/locale";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { pricing } = azriContent;

  return (
    <div className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">{pick(pricing.title, locale)}</h1>
        <p className="mt-3 text-gray-700 max-w-3xl">{pick(pricing.lead, locale)}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricing.plans.map((plan) => (
            <section
              key={plan.id}
              className={
                plan.highlighted
                  ? "rounded-xl border-2 border-[var(--azri-accent)] bg-white p-6 shadow-sm"
                  : "rounded-xl border border-gray-200 bg-white p-6"
              }
              aria-label={pick(plan.name, locale)}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">
                  {pick(plan.name, locale)}
                </h2>
                {plan.highlighted ? (
                  <span className="text-xs uppercase tracking-wide text-[var(--azri-accent)]">
                    {locale === "ar" ? "الأكثر شيوعًا" : "Most popular"}
                  </span>
                ) : null}
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  {pick(plan.price, locale)}
                </span>
                {plan.cadence ? (
                  <span className="text-gray-500">
                    {" "}
                    {pick(plan.cadence, locale)}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {pick(plan.tagline, locale)}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {pick(plan.features, locale).map((feat, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {pricing.note ? (
          <p className="mt-8 text-xs text-gray-500 max-w-3xl">
            {pick(pricing.note, locale)}
          </p>
        ) : null}
      </div>
    </div>
  );
}
