/**
 * @azri/content — Type schema
 *
 * Typed schema for AZRI's bilingual content system. Every section has an
 * Arabic (`ar`) and English (`en`) variant. The schema is intentionally
 * framework-agnostic so it can be consumed by:
 *   - the marketing website (Next.js)
 *   - the patient app (React Native / Expo)
 *   - the doctor dashboard
 *   - the institutional SaaS platform
 *   - wearable companion experiences (via JSON export)
 *
 * Authoring rules:
 *   - Keep medical wording careful: "supports", "helps monitor",
 *     "assists with early awareness", "enables follow-up".
 *   - Never claim diagnosis, cure, guaranteed prediction, or replacement
 *     of a clinician.
 *   - Do not invent partnerships, certifications, or regulatory status.
 *   - Both `ar` and `en` must always be filled in for every visible string.
 */

// ---------------------------------------------------------------------------
// Locale primitives
// ---------------------------------------------------------------------------

/** Supported source locales for bilingual content. */
export type Locale = "ar" | "en";

/** Text direction associated with a locale. */
export type Direction = "rtl" | "ltr";

/** A field that exists in both Arabic and English. */
export interface Bilingual<T = string> {
  ar: T;
  en: T;
}

/** Convenience alias for a bilingual list of strings. */
export type BilingualList = Bilingual<readonly string[]>;

// ---------------------------------------------------------------------------
// Reusable building blocks
// ---------------------------------------------------------------------------

/**
 * A call-to-action button. `id` is a stable key used by both web and app
 * so the same CTA can route differently per surface (e.g. `getStarted` may
 * deep-link in the app and route to `/signup` on the web).
 */
export interface CtaItem {
  /** Stable identifier, surface-agnostic. Use camelCase. */
  id: string;
  /** Visible label, bilingual. */
  label: Bilingual;
  /**
   * Optional intent hint for routers/analytics:
   *  - `primary`: main conversion action
   *  - `secondary`: supporting action
   *  - `tertiary`: low-emphasis link
   *  - `external`: navigates outside the product
   */
  intent?: "primary" | "secondary" | "tertiary" | "external";
}

/** A short feature/benefit/value-proposition card with optional bullets. */
export interface FeatureCard {
  id: string;
  title: Bilingual;
  description?: Bilingual;
  bullets?: BilingualList;
}

/** A numbered step in a "how it works" flow. */
export interface ProcessStep {
  id: string;
  /** 1-based step order. */
  order: number;
  title: Bilingual;
  description: Bilingual;
}

/** An audience segment (patient, family, doctor, institution, ...). */
export interface AudienceSegment {
  id: "patients" | "families" | "doctors" | "institutions";
  title: Bilingual;
  description: Bilingual;
  /** Optional bullet list of benefits for this audience. */
  benefits?: BilingualList;
}

/** A pricing plan. */
export interface PricingPlan {
  id: string;
  name: Bilingual;
  /**
   * Display price string (e.g. "$9", "$19", "Custom"). Kept as a string so
   * locale-formatted prices (e.g. "9$/شهريًا") can be expressed verbatim.
   * Numeric prices for billing logic must live in the billing system, not
   * in marketing content.
   */
  price: Bilingual;
  /** Billing cadence label (e.g. "/month"). Optional for custom plans. */
  cadence?: Bilingual;
  tagline: Bilingual;
  features: BilingualList;
  /** Optional CTA override (otherwise pricing page falls back to defaults). */
  cta?: CtaItem;
  /** Marks the recommended plan visually. */
  highlighted?: boolean;
}

/** A frequently-asked question and its answer. */
export interface FaqItem {
  id: string;
  question: Bilingual;
  answer: Bilingual;
}

/** A grouped link list (used by the footer and the sitemap). */
export interface LinkGroup {
  id: string;
  title: Bilingual;
  links: ReadonlyArray<{
    id: string;
    label: Bilingual;
    /** Surface-agnostic route key; surface routers map this to a real URL. */
    href: string;
  }>;
}

// ---------------------------------------------------------------------------
// Section schemas
// ---------------------------------------------------------------------------

export interface BrandSection {
  name: string; // "AZRI"
  /** Arabic wordmark form (kept separate from `name` for type-setting). */
  arabicWordmark: string; // "أزري"
  tagline: Bilingual; // "AI with Humanity" / "ذكاء اصطناعي بإنسانية"
}

export interface HeroSection {
  brand: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  emphasis: Bilingual;
  longDescription: Bilingual;
  ctas: readonly CtaItem[];
}

export interface SupportingNoteSection {
  body: Bilingual;
}

export interface WhyAzriSection {
  title: Bilingual;
  lead: Bilingual;
  body: Bilingual;
  bulletsIntro: Bilingual;
  bullets: BilingualList;
}

export interface AudienceSegmentsSection {
  title: Bilingual;
  segments: readonly AudienceSegment[];
}

export interface ValuePropositionsSection {
  title: Bilingual;
  items: readonly FeatureCard[];
}

export interface ProductSuiteSection {
  title: Bilingual;
  products: ReadonlyArray<{
    id: "watch" | "patientApp" | "doctorDashboard" | "institutionalPlatform";
    order: number;
    name: Bilingual;
    description: Bilingual;
  }>;
}

export interface HowItWorksSection {
  title: Bilingual;
  steps: readonly ProcessStep[];
}

export interface AppleWatchSection {
  title: Bilingual;
  description: Bilingual;
}

export interface BenefitsSection {
  title: Bilingual;
  groups: ReadonlyArray<{
    /** Reuses `AudienceSegment["id"]` to keep terminology consistent. */
    audienceId: AudienceSegment["id"];
    title: Bilingual;
    bullets: BilingualList;
  }>;
}

export interface PricingSection {
  title: Bilingual;
  lead: Bilingual;
  plans: readonly PricingPlan[];
  /** Note rendered below the pricing grid (e.g. source disclosure). */
  note?: Bilingual;
  ctas: readonly CtaItem[];
}

export interface TrustAndResponsibilitySection {
  title: Bilingual;
  body: Bilingual;
}

export interface FinalCtaSection {
  title: Bilingual;
  body: Bilingual;
  ctas: readonly CtaItem[];
}

// --- Page-specific sections -------------------------------------------------

export interface AboutPage {
  title: Bilingual;
  intro: Bilingual;
  body: Bilingual;
  focusAreasIntro: Bilingual;
  focusAreas: BilingualList;
  mission: { title: Bilingual; body: Bilingual };
  vision: { title: Bilingual; body: Bilingual };
  values: { title: Bilingual; items: BilingualList };
}

export interface SolutionsPage {
  title: Bilingual;
  segments: readonly AudienceSegment[];
}

export interface PatientsFamiliesPage {
  title: Bilingual;
  intro: Bilingual;
  benefitsTitle: Bilingual;
  benefits: BilingualList;
  supportLine: { title: Bilingual; body: Bilingual };
}

export interface DoctorsPage {
  title: Bilingual;
  intro: Bilingual;
  benefitsTitle: Bilingual;
  benefits: BilingualList;
}

export interface InstitutionsPage {
  title: Bilingual;
  intro: Bilingual;
  capabilitiesTitle: Bilingual;
  capabilities: BilingualList;
  cta: CtaItem;
}

export interface TechnologyPage {
  title: Bilingual;
  intro: Bilingual;
  highlightsTitle: Bilingual;
  highlights: BilingualList;
}

export interface FaqPage {
  title: Bilingual;
  items: readonly FaqItem[];
}

export interface ContactPage {
  title: Bilingual;
  intro: Bilingual;
  details: {
    address: { label: Bilingual; value: Bilingual };
    phone: { label: Bilingual; value: string }; // E.164-friendly, locale-neutral
    email: { label: Bilingual; value: string };
  };
  ctas: readonly CtaItem[];
  /** Source-of-data disclosure, if applicable. */
  note?: Bilingual;
}

// --- Cross-cutting sections ------------------------------------------------

export interface UiMicrocopySection {
  /** Stable keys reused across web and app. */
  labels: Readonly<Record<string, Bilingual>>;
}

export interface SeoEntry {
  title: Bilingual;
  description?: Bilingual;
}

export interface SeoSection {
  /** Default site-wide description. */
  defaultDescription: Bilingual;
  /** Per-page meta titles & descriptions, keyed by page id. */
  pages: Readonly<Record<string, SeoEntry>>;
}

export interface FooterSection {
  brand: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  groups: readonly LinkGroup[];
  contact: {
    title: Bilingual;
    address: Bilingual;
    email: string;
    phone: string;
  };
}

export interface MedicalDisclaimerSection {
  title: Bilingual;
  body: Bilingual;
}

export interface BrandMessageSection {
  body: Bilingual;
}

export interface SitemapEntry {
  id: string;
  label: Bilingual;
  href: string;
}

export interface SitemapSection {
  entries: readonly SitemapEntry[];
}

// ---------------------------------------------------------------------------
// Root content type
// ---------------------------------------------------------------------------

export interface AzriContent {
  brand: BrandSection;
  hero: HeroSection;
  supportingNote: SupportingNoteSection;
  whyAzri: WhyAzriSection;
  audienceSegments: AudienceSegmentsSection;
  valuePropositions: ValuePropositionsSection;
  productSuite: ProductSuiteSection;
  howItWorks: HowItWorksSection;
  appleWatch: AppleWatchSection;
  benefits: BenefitsSection;
  pricing: PricingSection;
  trustAndResponsibility: TrustAndResponsibilitySection;
  finalCTA: FinalCtaSection;
  aboutPage: AboutPage;
  solutionsPage: SolutionsPage;
  patientsFamiliesPage: PatientsFamiliesPage;
  doctorsPage: DoctorsPage;
  institutionsPage: InstitutionsPage;
  technologyPage: TechnologyPage;
  faqPage: FaqPage;
  contactPage: ContactPage;
  uiMicrocopy: UiMicrocopySection;
  seo: SeoSection;
  footer: FooterSection;
  medicalDisclaimer: MedicalDisclaimerSection;
  brandMessage: BrandMessageSection;
  sitemap: SitemapSection;
}

/** Keys of the top-level content sections. */
export type ContentSectionKey = keyof AzriContent;
