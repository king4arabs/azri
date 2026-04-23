import Link from "next/link";
import type { ReactNode } from "react";

const APP_NAV = [
  { href: "/app", label: { ar: "نظرة عامة", en: "Overview" } },
  { href: "/app/episodes", label: { ar: "سجل الأحداث", en: "Episodes" } },
  { href: "/app/trends", label: { ar: "المؤشرات", en: "Trends" } },
  { href: "/app/alerts", label: { ar: "التنبيهات", en: "Alerts" } },
  { href: "/app/caregivers", label: { ar: "مقدمو الرعاية", en: "Caregivers" } },
] as const;

export default function PatientAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-6">
      <nav
        aria-label="Patient app"
        className="mb-6 border-b border-border pb-3"
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {APP_NAV.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-foreground hover:text-accent transition-colors"
              >
                {link.label.ar}
                <span className="text-muted text-xs ms-2">/ {link.label.en}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
}
