import Link from "next/link";
import { azriContent, DEFAULT_LOCALE, pick } from "@azri/content";

const NAV_LINKS: ReadonlyArray<{ href: string; labelKey: keyof typeof labels }> = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/solutions", labelKey: "solutions" },
  { href: "/patients-families", labelKey: "patients" },
  { href: "/doctors", labelKey: "doctors" },
  { href: "/institutions", labelKey: "institutions" },
  { href: "/technology", labelKey: "technology" },
  { href: "/pricing", labelKey: "pricing" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contact", labelKey: "contact" },
  { href: "/app", labelKey: "patientApp" },
  { href: "/console", labelKey: "console" },
];

const labels = {
  home: { ar: "الرئيسية", en: "Home" },
  about: { ar: "من نحن", en: "About" },
  solutions: { ar: "الحلول", en: "Solutions" },
  patients: { ar: "للمرضى والعائلات", en: "Patients & Families" },
  doctors: { ar: "للأطباء", en: "Doctors" },
  institutions: { ar: "للمنشآت", en: "Institutions" },
  technology: { ar: "التقنية", en: "Technology" },
  pricing: { ar: "الأسعار", en: "Pricing" },
  faq: { ar: "الأسئلة الشائعة", en: "FAQ" },
  contact: { ar: "تواصل", en: "Contact" },
  patientApp: { ar: "التطبيق", en: "App" },
  console: { ar: "لوحة الطبيب", en: "Console" },
} as const;

export function Nav() {
  const brand = azriContent.brand;
  const tagline = pick(brand.tagline, DEFAULT_LOCALE);
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-baseline gap-2 text-start">
          <span className="text-xl font-bold text-foreground">
            {brand.name} / {brand.arabicWordmark}
          </span>
          <span className="text-xs text-muted hidden sm:inline">{tagline}</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {pick(labels[link.labelKey], DEFAULT_LOCALE)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
