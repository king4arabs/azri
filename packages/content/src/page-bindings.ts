/**
 * @azri/content — Page bindings
 *
 * Maps surface (web / app) page identifiers to the content sections they
 * render. This lets web and app consume the same source of truth without
 * duplicating "what does the home page show?" logic in two places.
 *
 * To add a new page:
 *   1. Add an entry to `webPages` and/or `appScreens`.
 *   2. List the section keys (typed as `ContentSectionKey`) the page uses.
 *   3. Optionally add an `seoKey` so SEO metadata can be looked up.
 *
 * Surface routers are responsible for translating page ids to URLs / deep
 * links. The content package does not own routing.
 */

import type { ContentSectionKey } from "./types.ts";

/** Identifier shared between web and app for a logical product page. */
export type PageId =
  | "home"
  | "about"
  | "solutions"
  | "patientsFamilies"
  | "doctors"
  | "institutions"
  | "technology"
  | "pricing"
  | "faq"
  | "contact"
  | "legalPrivacy"
  | "legalTerms"
  | "legalMedicalDisclaimer";

/** Description of how a page composes content sections. */
export interface PageBinding {
  /** Sections rendered on this page, in order. */
  sections: readonly ContentSectionKey[];
  /** Key into `seo.pages`, if SEO metadata exists for this page. */
  seoKey?: string;
  /** True if this page must render the medical disclaimer prominently. */
  requiresMedicalDisclaimer?: boolean;
}

/**
 * Web (marketing site) page bindings.
 * Order of `sections` reflects render order top-to-bottom.
 */
export const webPages = {
  home: {
    sections: [
      "hero",
      "supportingNote",
      "whyAzri",
      "audienceSegments",
      "valuePropositions",
      "productSuite",
      "howItWorks",
      "appleWatch",
      "benefits",
      "pricing",
      "trustAndResponsibility",
      "finalCTA",
    ],
    seoKey: "home",
    requiresMedicalDisclaimer: true,
  },
  about: {
    sections: ["aboutPage", "brandMessage", "trustAndResponsibility"],
    seoKey: "about",
  },
  solutions: {
    sections: ["solutionsPage", "valuePropositions", "finalCTA"],
    seoKey: "solutions",
  },
  patientsFamilies: {
    sections: ["patientsFamiliesPage", "benefits", "finalCTA"],
    requiresMedicalDisclaimer: true,
  },
  doctors: {
    sections: ["doctorsPage", "benefits", "finalCTA"],
  },
  institutions: {
    sections: ["institutionsPage", "benefits", "finalCTA"],
  },
  technology: {
    sections: ["technologyPage", "trustAndResponsibility"],
  },
  pricing: {
    sections: ["pricing", "trustAndResponsibility", "finalCTA"],
  },
  faq: {
    sections: ["faqPage", "trustAndResponsibility"],
    requiresMedicalDisclaimer: true,
  },
  contact: {
    sections: ["contactPage"],
    seoKey: "contact",
  },
  legalPrivacy: {
    sections: [],
  },
  legalTerms: {
    sections: [],
  },
  legalMedicalDisclaimer: {
    sections: ["medicalDisclaimer"],
    requiresMedicalDisclaimer: true,
  },
} as const satisfies Readonly<Record<PageId, PageBinding>>;

/**
 * Patient/doctor/institution app screen bindings.
 * Apps only consume the cross-cutting sections plus a few page-specific
 * ones — they get their domain UI from app-specific content, not this
 * marketing-flavored content package.
 */
export type AppScreenId =
  | "appOnboarding"
  | "appHome"
  | "appAlerts"
  | "appReports"
  | "appAbout"
  | "appHelp"
  | "appLegalDisclaimer";

export const appScreens = {
  appOnboarding: {
    sections: ["brand", "hero", "uiMicrocopy"],
  },
  appHome: {
    sections: ["uiMicrocopy", "brandMessage"],
  },
  appAlerts: {
    sections: ["uiMicrocopy"],
  },
  appReports: {
    sections: ["uiMicrocopy"],
  },
  appAbout: {
    sections: ["aboutPage", "brandMessage"],
  },
  appHelp: {
    sections: ["faqPage", "uiMicrocopy"],
    requiresMedicalDisclaimer: true,
  },
  appLegalDisclaimer: {
    sections: ["medicalDisclaimer"],
    requiresMedicalDisclaimer: true,
  },
} as const satisfies Readonly<Record<AppScreenId, PageBinding>>;

/**
 * Cross-surface bindings:
 *  - `web` for the marketing/dashboard sites
 *  - `app` for the patient and clinician native apps
 */
export const pageBindings = {
  web: webPages,
  app: appScreens,
} as const;

export type Surface = keyof typeof pageBindings;
