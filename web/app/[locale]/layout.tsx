import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { azriContent, localeAttributes, pick } from "@azri/content";
import { isLocale } from "../lib/locale";
import { LanguageSwitcher } from "./_components/LanguageSwitcher";
import { Footer } from "./_components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const home = azriContent.seo.pages["home"];
  return {
    title: home ? pick(home.title, locale) : azriContent.brand.name,
    description: pick(azriContent.seo.defaultDescription, locale),
  };
}

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const attrs = localeAttributes(locale);

  return (
    <div lang={attrs.lang} dir={attrs.dir} className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <a href={`/${locale}`} className="font-semibold text-lg">
          {locale === "ar" ? azriContent.brand.arabicWordmark : azriContent.brand.name}
        </a>
        <nav className="flex items-center gap-4">
          <a href={`/${locale}`} className="hover:underline">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </a>
          <a href={`/${locale}/pricing`} className="hover:underline">
            {locale === "ar" ? "الأسعار" : "Pricing"}
          </a>
          <LanguageSwitcher currentLocale={locale} />
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <Footer locale={locale} />
    </div>
  );
}
