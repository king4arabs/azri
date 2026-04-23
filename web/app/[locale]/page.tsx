import { notFound } from "next/navigation";
import { azriContent, pick } from "@azri/content";
import { isLocale } from "../lib/locale";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { hero, whyAzri, appleWatch } = azriContent;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 py-20 bg-[var(--azri-surface)]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {pick(hero.brand, locale)}
          </h1>
          <p className="mt-2 text-xl text-[var(--azri-accent)]">
            {pick(hero.tagline, locale)}
          </p>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl">
            {pick(hero.description, locale)}
          </p>
          <p className="mt-4 text-base font-medium text-gray-800 max-w-3xl">
            {pick(hero.emphasis, locale)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {hero.ctas.map((cta) => (
              <a
                key={cta.id}
                href={cta.id === "pricing" ? `/${locale}/pricing` : `/${locale}`}
                className={
                  cta.intent === "primary"
                    ? "inline-block rounded-md bg-[var(--azri-accent)] text-white px-5 py-2.5 font-medium hover:opacity-90"
                    : "inline-block rounded-md border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50"
                }
              >
                {pick(cta.label, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why AZRI */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold">{pick(whyAzri.title, locale)}</h2>
          <p className="mt-3 text-lg text-[var(--azri-accent)] max-w-3xl">
            {pick(whyAzri.lead, locale)}
          </p>
          <p className="mt-4 text-gray-700 max-w-3xl">
            {pick(whyAzri.body, locale)}
          </p>
          <p className="mt-6 font-medium">{pick(whyAzri.bulletsIntro, locale)}</p>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {pick(whyAzri.bullets, locale).map((bullet, idx) => (
              <li
                key={idx}
                className="rounded-md bg-gray-50 border border-gray-100 px-4 py-3 text-sm text-gray-800"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Apple Watch section — the Watch companion scaffold ships under ios/. */}
      <section className="px-6 py-16 bg-[var(--azri-surface)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold">
            {pick(appleWatch.title, locale)}
          </h2>
          <p className="mt-3 text-gray-700 max-w-3xl">
            {pick(appleWatch.description, locale)}
          </p>
        </div>
      </section>
    </div>
  );
}
