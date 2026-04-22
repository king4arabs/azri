import {
  azriContent,
  DEFAULT_LOCALE,
  pick,
  type ContentSectionKey,
} from "@azri/content";
import { Section } from "@/components/section";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

const L = DEFAULT_LOCALE;

function Hero() {
  const h = azriContent.hero;
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 text-start">
        <p className="text-sm uppercase tracking-wide text-accent font-semibold">
          {pick(h.brand, L)}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight">
          {pick(h.tagline, L)}
        </h1>
        <p className="mt-6 text-lg text-muted max-w-3xl">
          {pick(h.description, L)}
        </p>
        <p className="mt-4 text-base text-foreground font-medium max-w-3xl">
          {pick(h.emphasis, L)}
        </p>
        <p className="mt-4 text-base text-muted max-w-3xl leading-relaxed">
          {pick(h.longDescription, L)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {h.ctas.map((cta) => (
            <a
              key={cta.id}
              href="#"
              className={
                cta.intent === "primary"
                  ? "inline-flex items-center rounded-md bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold hover:opacity-90"
                  : "inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-surface"
              }
            >
              {pick(cta.label, L)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportingNote() {
  const s = azriContent.supportingNote;
  return (
    <Section variant="muted">
      <p className="text-base text-muted text-start max-w-3xl">
        {pick(s.body, L)}
      </p>
    </Section>
  );
}

function WhyAzri() {
  const w = azriContent.whyAzri;
  return (
    <Section title={pick(w.title, L)} lead={pick(w.lead, L)}>
      <p className="text-base text-foreground text-start mb-4">
        {pick(w.body, L)}
      </p>
      <p className="text-sm font-semibold text-foreground text-start mb-2">
        {pick(w.bulletsIntro, L)}
      </p>
      <ul className="list-disc ps-6 space-y-1 text-base text-muted text-start">
        {pick(w.bullets, L).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </Section>
  );
}

function AudienceSegments() {
  const a = azriContent.audienceSegments;
  return (
    <Section title={pick(a.title, L)} variant="muted">
      <div className="grid gap-6 sm:grid-cols-2">
        {a.segments.map((s) => (
          <div
            key={s.id}
            className="rounded-lg border border-border bg-background p-6 text-start"
          >
            <h3 className="text-lg font-semibold">{pick(s.title, L)}</h3>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {pick(s.description, L)}
            </p>
            {s.benefits ? (
              <ul className="list-disc ps-6 mt-3 text-sm text-muted space-y-1">
                {pick(s.benefits, L).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function ValuePropositions() {
  const v = azriContent.valuePropositions;
  return (
    <Section title={pick(v.title, L)}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {v.items.map((card) => (
          <div
            key={card.id}
            className="rounded-lg border border-border p-6 text-start"
          >
            <h3 className="text-base font-semibold">{pick(card.title, L)}</h3>
            {card.description ? (
              <p className="text-sm text-muted mt-2 leading-relaxed">
                {pick(card.description, L)}
              </p>
            ) : null}
            {card.bullets ? (
              <ul className="list-disc ps-6 mt-3 text-sm text-muted space-y-1">
                {pick(card.bullets, L).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProductSuite() {
  const p = azriContent.productSuite;
  return (
    <Section title={pick(p.title, L)} variant="muted">
      <div className="grid gap-6 sm:grid-cols-2">
        {[...p.products]
          .sort((a, b) => a.order - b.order)
          .map((prod) => (
            <div
              key={prod.id}
              className="rounded-lg border border-border bg-background p-6 text-start"
            >
              <h3 className="text-lg font-semibold">{pick(prod.name, L)}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                {pick(prod.description, L)}
              </p>
            </div>
          ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  const h = azriContent.howItWorks;
  return (
    <Section title={pick(h.title, L)}>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...h.steps]
          .sort((a, b) => a.order - b.order)
          .map((step) => (
            <li
              key={step.id}
              className="rounded-lg border border-border p-6 text-start"
            >
              <div className="text-sm font-semibold text-accent">
                {step.order}
              </div>
              <h3 className="text-base font-semibold mt-2">
                {pick(step.title, L)}
              </h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                {pick(step.description, L)}
              </p>
            </li>
          ))}
      </ol>
    </Section>
  );
}

function AppleWatch() {
  const a = azriContent.appleWatch;
  return (
    <Section title={pick(a.title, L)} variant="muted">
      <p className="text-base text-foreground text-start max-w-3xl leading-relaxed">
        {pick(a.description, L)}
      </p>
    </Section>
  );
}

function Benefits() {
  const b = azriContent.benefits;
  return (
    <Section title={pick(b.title, L)}>
      <div className="grid gap-6 sm:grid-cols-2">
        {b.groups.map((group) => (
          <div
            key={group.audienceId}
            className="rounded-lg border border-border p-6 text-start"
          >
            <h3 className="text-base font-semibold">{pick(group.title, L)}</h3>
            <ul className="list-disc ps-6 mt-3 text-sm text-muted space-y-1">
              {pick(group.bullets, L).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pricing() {
  const p = azriContent.pricing;
  return (
    <Section title={pick(p.title, L)} lead={pick(p.lead, L)} variant="muted">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {p.plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg border p-6 text-start bg-background ${
              plan.highlighted ? "border-accent ring-1 ring-accent" : "border-border"
            }`}
          >
            <h3 className="text-lg font-semibold">{pick(plan.name, L)}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">{pick(plan.price, L)}</span>
              {plan.cadence ? (
                <span className="text-sm text-muted ms-1">
                  {pick(plan.cadence, L)}
                </span>
              ) : null}
            </div>
            <p className="text-sm text-muted mt-2">{pick(plan.tagline, L)}</p>
            <ul className="list-disc ps-6 mt-4 text-sm text-muted space-y-1">
              {pick(plan.features, L).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            {plan.cta ? (
              <a
                href="#"
                className="mt-5 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
              >
                {pick(plan.cta.label, L)}
              </a>
            ) : null}
          </div>
        ))}
      </div>
      {p.note ? (
        <p className="text-xs text-muted mt-6 text-start">{pick(p.note, L)}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        {p.ctas.map((cta) => (
          <a
            key={cta.id}
            href="#"
            className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-surface"
          >
            {pick(cta.label, L)}
          </a>
        ))}
      </div>
    </Section>
  );
}

function TrustAndResponsibility() {
  const t = azriContent.trustAndResponsibility;
  return (
    <Section title={pick(t.title, L)}>
      <p className="text-base text-foreground text-start max-w-3xl leading-relaxed">
        {pick(t.body, L)}
      </p>
    </Section>
  );
}

function FinalCTA() {
  const f = azriContent.finalCTA;
  return (
    <Section variant="muted">
      <div className="text-start">
        <h2 className="text-2xl sm:text-3xl font-bold">{pick(f.title, L)}</h2>
        <p className="mt-3 text-base text-muted max-w-3xl">{pick(f.body, L)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {f.ctas.map((cta) => (
            <a
              key={cta.id}
              href="#"
              className={
                cta.intent === "primary"
                  ? "inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
                  : "inline-flex rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-surface"
              }
            >
              {pick(cta.label, L)}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function AboutPageSection() {
  const a = azriContent.aboutPage;
  return (
    <Section title={pick(a.title, L)} lead={pick(a.intro, L)}>
      <p className="text-base text-foreground text-start max-w-3xl leading-relaxed">
        {pick(a.body, L)}
      </p>
      <p className="text-sm font-semibold mt-6 text-start">
        {pick(a.focusAreasIntro, L)}
      </p>
      <ul className="list-disc ps-6 mt-2 text-base text-muted text-start space-y-1">
        {pick(a.focusAreas, L).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="grid gap-6 sm:grid-cols-3 mt-8">
        {[a.mission, a.vision].map((box, i) => (
          <div
            key={i}
            className="rounded-lg border border-border p-6 text-start"
          >
            <h3 className="text-base font-semibold">{pick(box.title, L)}</h3>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {pick(box.body, L)}
            </p>
          </div>
        ))}
        <div className="rounded-lg border border-border p-6 text-start">
          <h3 className="text-base font-semibold">{pick(a.values.title, L)}</h3>
          <ul className="list-disc ps-6 mt-2 text-sm text-muted space-y-1">
            {pick(a.values.items, L).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function SolutionsPageSection() {
  const s = azriContent.solutionsPage;
  return (
    <Section title={pick(s.title, L)}>
      <div className="grid gap-6 sm:grid-cols-2">
        {s.segments.map((seg) => (
          <div
            key={seg.id}
            className="rounded-lg border border-border p-6 text-start"
          >
            <h3 className="text-lg font-semibold">{pick(seg.title, L)}</h3>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {pick(seg.description, L)}
            </p>
            {seg.benefits ? (
              <ul className="list-disc ps-6 mt-3 text-sm text-muted space-y-1">
                {pick(seg.benefits, L).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function PatientsFamiliesPageSection() {
  const p = azriContent.patientsFamiliesPage;
  return (
    <Section title={pick(p.title, L)} lead={pick(p.intro, L)}>
      <h3 className="text-base font-semibold text-start mb-2">
        {pick(p.benefitsTitle, L)}
      </h3>
      <ul className="list-disc ps-6 text-base text-muted text-start space-y-1">
        {pick(p.benefits, L).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="mt-8 rounded-lg border border-border p-6 text-start">
        <h3 className="text-base font-semibold">
          {pick(p.supportLine.title, L)}
        </h3>
        <p className="text-sm text-muted mt-2 leading-relaxed">
          {pick(p.supportLine.body, L)}
        </p>
      </div>
    </Section>
  );
}

function DoctorsPageSection() {
  const d = azriContent.doctorsPage;
  return (
    <Section title={pick(d.title, L)} lead={pick(d.intro, L)}>
      <h3 className="text-base font-semibold text-start mb-2">
        {pick(d.benefitsTitle, L)}
      </h3>
      <ul className="list-disc ps-6 text-base text-muted text-start space-y-1">
        {pick(d.benefits, L).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </Section>
  );
}

function InstitutionsPageSection() {
  const x = azriContent.institutionsPage;
  return (
    <Section title={pick(x.title, L)} lead={pick(x.intro, L)}>
      <h3 className="text-base font-semibold text-start mb-2">
        {pick(x.capabilitiesTitle, L)}
      </h3>
      <ul className="list-disc ps-6 text-base text-muted text-start space-y-1">
        {pick(x.capabilities, L).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href="#"
          className="inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          {pick(x.cta.label, L)}
        </a>
      </div>
    </Section>
  );
}

function TechnologyPageSection() {
  const t = azriContent.technologyPage;
  return (
    <Section title={pick(t.title, L)} lead={pick(t.intro, L)}>
      <h3 className="text-base font-semibold text-start mb-2">
        {pick(t.highlightsTitle, L)}
      </h3>
      <ul className="list-disc ps-6 text-base text-muted text-start space-y-1">
        {pick(t.highlights, L).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </Section>
  );
}

function FaqPageSection() {
  const f = azriContent.faqPage;
  return (
    <Section title={pick(f.title, L)}>
      <div className="space-y-4">
        {f.items.map((item) => (
          <details
            key={item.id}
            className="rounded-lg border border-border p-5 text-start"
          >
            <summary className="font-semibold cursor-pointer">
              {pick(item.question, L)}
            </summary>
            <p className="text-sm text-muted mt-3 leading-relaxed">
              {pick(item.answer, L)}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function ContactPageSection() {
  const c = azriContent.contactPage;
  return (
    <Section title={pick(c.title, L)} lead={pick(c.intro, L)}>
      <dl className="grid gap-4 sm:grid-cols-3 text-start">
        <div>
          <dt className="text-sm font-semibold">
            {pick(c.details.address.label, L)}
          </dt>
          <dd className="text-sm text-muted mt-1">
            {pick(c.details.address.value, L)}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">
            {pick(c.details.email.label, L)}
          </dt>
          <dd className="text-sm text-muted mt-1">
            <a
              href={`mailto:${c.details.email.value}`}
              className="hover:text-accent"
            >
              {c.details.email.value}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">
            {pick(c.details.phone.label, L)}
          </dt>
          <dd className="text-sm text-muted mt-1" dir="ltr">
            <a
              href={`tel:${c.details.phone.value}`}
              className="hover:text-accent"
            >
              {c.details.phone.value}
            </a>
          </dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        {c.ctas.map((cta) => (
          <a
            key={cta.id}
            href="#"
            className={
              cta.intent === "primary"
                ? "inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
                : "inline-flex rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-surface"
            }
          >
            {pick(cta.label, L)}
          </a>
        ))}
      </div>
      {c.note ? (
        <p className="text-xs text-muted mt-6 text-start">{pick(c.note, L)}</p>
      ) : null}
    </Section>
  );
}

function BrandSectionView() {
  const b = azriContent.brand;
  return (
    <Section>
      <div className="text-start">
        <p className="text-3xl font-bold">
          {b.name} / {b.arabicWordmark}
        </p>
        <p className="text-base text-muted mt-2">{pick(b.tagline, L)}</p>
      </div>
    </Section>
  );
}

function BrandMessageSectionView() {
  const b = azriContent.brandMessage;
  return (
    <Section variant="muted">
      <p className="text-base text-foreground text-start max-w-3xl leading-relaxed">
        {pick(b.body, L)}
      </p>
    </Section>
  );
}

function MedicalDisclaimerSectionView() {
  return <MedicalDisclaimer />;
}

const RENDERERS: Partial<Record<ContentSectionKey, () => React.ReactElement>> = {
  brand: BrandSectionView,
  hero: Hero,
  supportingNote: SupportingNote,
  whyAzri: WhyAzri,
  audienceSegments: AudienceSegments,
  valuePropositions: ValuePropositions,
  productSuite: ProductSuite,
  howItWorks: HowItWorks,
  appleWatch: AppleWatch,
  benefits: Benefits,
  pricing: Pricing,
  trustAndResponsibility: TrustAndResponsibility,
  finalCTA: FinalCTA,
  aboutPage: AboutPageSection,
  solutionsPage: SolutionsPageSection,
  patientsFamiliesPage: PatientsFamiliesPageSection,
  doctorsPage: DoctorsPageSection,
  institutionsPage: InstitutionsPageSection,
  technologyPage: TechnologyPageSection,
  faqPage: FaqPageSection,
  contactPage: ContactPageSection,
  brandMessage: BrandMessageSectionView,
  medicalDisclaimer: MedicalDisclaimerSectionView,
};

export function renderSection(key: ContentSectionKey): React.ReactElement | null {
  const Renderer = RENDERERS[key];
  if (!Renderer) return null;
  return <Renderer key={key} />;
}

export function renderSections(
  keys: readonly ContentSectionKey[],
): React.ReactElement[] {
  return keys
    .map((key) => {
      const el = renderSection(key);
      return el ? <div key={key}>{el}</div> : null;
    })
    .filter((x): x is React.ReactElement => x !== null);
}
