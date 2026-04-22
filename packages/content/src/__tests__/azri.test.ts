/**
 * Sanity tests for @azri/content.
 *
 * Uses Node's built-in test runner (`node --test`) and `node:assert`
 * — no external dependencies.
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { azriContent } from "../data/azri.ts";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getAlternateLocale,
  getDirection,
  isRtl,
  localeAttributes,
  pick,
  resolveLocale,
} from "../locale.ts";
import { appScreens, pageBindings, webPages } from "../page-bindings.ts";
import type { Bilingual, ContentSectionKey, Locale } from "../types.ts";

// ---------------------------------------------------------------------------
// Locale helpers
// ---------------------------------------------------------------------------

test("LOCALES contains exactly ar and en", () => {
  assert.deepEqual([...LOCALES].sort(), ["ar", "en"]);
});

test("DEFAULT_LOCALE is Arabic-first", () => {
  assert.equal(DEFAULT_LOCALE, "ar");
});

test("getDirection / isRtl: ar is RTL, en is LTR", () => {
  assert.equal(getDirection("ar"), "rtl");
  assert.equal(getDirection("en"), "ltr");
  assert.equal(isRtl("ar"), true);
  assert.equal(isRtl("en"), false);
});

test("getAlternateLocale flips locales", () => {
  assert.equal(getAlternateLocale("ar"), "en");
  assert.equal(getAlternateLocale("en"), "ar");
});

test("resolveLocale negotiates BCP-47 inputs", () => {
  assert.equal(resolveLocale("ar-SA"), "ar");
  assert.equal(resolveLocale("en-US"), "en");
  assert.equal(resolveLocale(["fr-FR", "ar-EG", "en"]), "ar");
  assert.equal(resolveLocale(["fr-FR", "de"]), DEFAULT_LOCALE);
  assert.equal(resolveLocale(null), DEFAULT_LOCALE);
  assert.equal(resolveLocale(""), DEFAULT_LOCALE);
});

test("pick returns the requested locale value", () => {
  const field: Bilingual = { ar: "مرحبا", en: "Hello" };
  assert.equal(pick(field, "ar"), "مرحبا");
  assert.equal(pick(field, "en"), "Hello");
});

test("pick falls back to the alternate locale when value is empty", () => {
  const field: Bilingual = { ar: "", en: "Hello" };
  assert.equal(pick(field, "ar"), "Hello");
});

test("localeAttributes returns dir + lang for HTML", () => {
  assert.deepEqual(localeAttributes("ar"), { lang: "ar", dir: "rtl" });
  assert.deepEqual(localeAttributes("en"), { lang: "en", dir: "ltr" });
});

// ---------------------------------------------------------------------------
// Content schema completeness
// ---------------------------------------------------------------------------

const REQUIRED_SECTIONS: readonly ContentSectionKey[] = [
  "brand",
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
  "aboutPage",
  "solutionsPage",
  "patientsFamiliesPage",
  "doctorsPage",
  "institutionsPage",
  "technologyPage",
  "faqPage",
  "contactPage",
  "uiMicrocopy",
  "seo",
  "footer",
  "medicalDisclaimer",
  "brandMessage",
  "sitemap",
];

test("azriContent contains every required top-level section", () => {
  for (const key of REQUIRED_SECTIONS) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(azriContent, key),
      `Missing section: ${key}`,
    );
  }
});

/**
 * Walks the content tree and asserts that every `Bilingual`-shaped object
 * has both `ar` and `en` populated. A "bilingual leaf" is detected by the
 * presence of an `ar` and `en` key on a plain object.
 */
function assertBilingualCompleteness(value: unknown, path = "$"): void {
  if (value === null || typeof value !== "object") return;

  // Recurse arrays element by element.
  if (Array.isArray(value)) {
    value.forEach((item, i) =>
      assertBilingualCompleteness(item, `${path}[${i}]`),
    );
    return;
  }

  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj);
  const isBilingualLeaf =
    keys.length >= 2 && "ar" in obj && "en" in obj;

  if (isBilingualLeaf) {
    for (const locale of ["ar", "en"] as const) {
      const v = obj[locale];
      assert.ok(
        v !== undefined && v !== null && v !== "",
        `Missing ${locale} value at ${path}.${locale}`,
      );
      // Recurse into bilingual array values too (e.g. bullet lists).
      if (Array.isArray(v)) {
        v.forEach((item, i) => {
          assert.ok(
            typeof item === "string" && item.length > 0,
            `Empty bilingual list item at ${path}.${locale}[${i}]`,
          );
        });
      }
    }
    // For non-leaf siblings (rare), keep walking.
    for (const k of keys) {
      if (k === "ar" || k === "en") continue;
      assertBilingualCompleteness(obj[k], `${path}.${k}`);
    }
    return;
  }

  for (const k of keys) {
    assertBilingualCompleteness(obj[k], `${path}.${k}`);
  }
}

test("every bilingual field has both ar and en populated", () => {
  assertBilingualCompleteness(azriContent);
});

test("ids inside ordered collections are unique", () => {
  const collections: Array<{ name: string; ids: readonly string[] }> = [
    {
      name: "audienceSegments.segments",
      ids: azriContent.audienceSegments.segments.map((s) => s.id),
    },
    {
      name: "valuePropositions.items",
      ids: azriContent.valuePropositions.items.map((i) => i.id),
    },
    {
      name: "productSuite.products",
      ids: azriContent.productSuite.products.map((p) => p.id),
    },
    {
      name: "howItWorks.steps",
      ids: azriContent.howItWorks.steps.map((s) => s.id),
    },
    {
      name: "pricing.plans",
      ids: azriContent.pricing.plans.map((p) => p.id),
    },
    {
      name: "faqPage.items",
      ids: azriContent.faqPage.items.map((i) => i.id),
    },
    {
      name: "sitemap.entries",
      ids: azriContent.sitemap.entries.map((e) => e.id),
    },
    {
      name: "footer.groups",
      ids: azriContent.footer.groups.map((g) => g.id),
    },
  ];

  for (const { name, ids } of collections) {
    const seen = new Set<string>();
    for (const id of ids) {
      assert.ok(!seen.has(id), `Duplicate id "${id}" in ${name}`);
      seen.add(id);
    }
  }
});

test("medical disclaimer wording is preserved", () => {
  for (const locale of LOCALES as readonly Locale[]) {
    const body = pick(azriContent.medicalDisclaimer.body, locale);
    assert.ok(body.length > 50, `Disclaimer ${locale} text seems too short`);
  }
  // English copy must call out that AZRI is not a substitute for a physician.
  assert.match(
    azriContent.medicalDisclaimer.body.en,
    /not a substitute|emergency/i,
  );
});

// ---------------------------------------------------------------------------
// Page bindings
// ---------------------------------------------------------------------------

test("every page binding references real content sections", () => {
  for (const surface of Object.keys(pageBindings) as Array<
    keyof typeof pageBindings
  >) {
    const pages = pageBindings[surface];
    for (const [pageId, binding] of Object.entries(pages)) {
      for (const section of binding.sections) {
        assert.ok(
          Object.prototype.hasOwnProperty.call(azriContent, section),
          `Page ${surface}.${pageId} references missing section "${section}"`,
        );
      }
      if (binding.seoKey) {
        assert.ok(
          Object.prototype.hasOwnProperty.call(
            azriContent.seo.pages,
            binding.seoKey,
          ),
          `Page ${surface}.${pageId} references missing seoKey "${binding.seoKey}"`,
        );
      }
    }
  }
});

test("home page exposes the full marketing flow", () => {
  assert.ok(webPages.home.sections.includes("hero"));
  assert.ok(webPages.home.sections.includes("pricing"));
  assert.ok(webPages.home.sections.includes("finalCTA"));
});

test("app screens reuse cross-cutting microcopy", () => {
  assert.ok(appScreens.appOnboarding.sections.includes("uiMicrocopy"));
});
