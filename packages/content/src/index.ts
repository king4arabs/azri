/**
 * @azri/content — Public entry point
 *
 * Single source of truth for AZRI's bilingual marketing & app content.
 *
 * Usage:
 *   import { azriContent, pick, resolveLocale, getDirection } from "@azri/content";
 *   const locale = resolveLocale(navigator.languages); // "ar" | "en"
 *   const heading = pick(azriContent.hero.tagline, locale);
 *
 * Re-exports keep the public API discoverable and let consumers import
 * subpaths (`@azri/content/types`, `@azri/content/locale`, ...) when they
 * want narrower bundles.
 */

export * from "./types.ts";
export * from "./locale.ts";
export * from "./page-bindings.ts";

export { azriContent, default } from "./data/azri.ts";
