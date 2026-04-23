import Link from "next/link";
import { azriContent, DEFAULT_LOCALE, pick } from "@azri/content";

export function Footer() {
  const f = azriContent.footer;
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1 text-start">
          <div className="text-lg font-bold">
            {pick(f.brand, DEFAULT_LOCALE)}
          </div>
          <div className="text-sm text-muted mt-1">
            {pick(f.tagline, DEFAULT_LOCALE)}
          </div>
          <p className="text-sm text-muted mt-4 leading-relaxed">
            {pick(f.description, DEFAULT_LOCALE)}
          </p>
        </div>

        {f.groups.map((group) => (
          <div key={group.id} className="text-start">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {pick(group.title, DEFAULT_LOCALE)}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {pick(link.label, DEFAULT_LOCALE)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-start md:col-span-1">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {pick(f.contact.title, DEFAULT_LOCALE)}
          </h3>
          <address className="not-italic text-sm text-muted space-y-1">
            <div>{pick(f.contact.address, DEFAULT_LOCALE)}</div>
            <div>
              <a
                href={`mailto:${f.contact.email}`}
                className="hover:text-accent"
              >
                {f.contact.email}
              </a>
            </div>
            <div dir="ltr" className="text-start">
              <a href={`tel:${f.contact.phone}`} className="hover:text-accent">
                {f.contact.phone}
              </a>
            </div>
          </address>
        </div>
      </div>
    </footer>
  );
}
