"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@azri/content";

const labelFor: Record<Locale, string> = {
  ar: "English",
  en: "العربية",
};

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() ?? `/${currentLocale}`;
  const alternate: Locale = currentLocale === "ar" ? "en" : "ar";
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = alternate;
  const nextHref = `/${segments.join("/")}`;

  return (
    <a
      href={nextHref}
      className="text-sm text-[var(--azri-accent)] hover:underline"
      aria-label={`Switch to ${labelFor[currentLocale]}`}
    >
      {labelFor[currentLocale]}
    </a>
  );
}
