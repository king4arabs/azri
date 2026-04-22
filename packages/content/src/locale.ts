/**
 * @azri/content — Locale & RTL/LTR utilities
 *
 * Pure helpers, framework-agnostic. Keep these stable — both web and app
 * surfaces import directly.
 */

import type { Bilingual, Direction, Locale } from "./types.ts";

/** All locales the content schema currently supports. */
export const LOCALES = ["ar", "en"] as const satisfies readonly Locale[];

/** The default locale (Arabic-first per AZRI's I18N_L10N strategy). */
export const DEFAULT_LOCALE: Locale = "ar";

/** Type guard: is the value a supported locale? */
export function isLocale(value: unknown): value is Locale {
  return value === "ar" || value === "en";
}

/** Returns the writing direction for a given locale. */
export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

/** True if the locale uses right-to-left layout. */
export function isRtl(locale: Locale): boolean {
  return getDirection(locale) === "rtl";
}

/**
 * Returns the opposite locale. Useful for language-toggle buttons:
 *   `getAlternateLocale(currentLocale)`.
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

/**
 * Negotiate a supported locale from an arbitrary BCP-47 string or list.
 * Falls back to {@link DEFAULT_LOCALE}. Used by web (Accept-Language) and
 * app (`Intl.getCanonicalLocales`/device language) entry points.
 */
export function resolveLocale(
  candidate: string | readonly string[] | null | undefined,
  fallback: Locale = DEFAULT_LOCALE,
): Locale {
  const candidates = Array.isArray(candidate)
    ? candidate
    : typeof candidate === "string"
      ? [candidate]
      : [];

  for (const raw of candidates) {
    if (typeof raw !== "string") continue;
    const lower = raw.trim().toLowerCase();
    if (!lower) continue;
    // Match the primary language subtag (e.g. `ar-SA` → `ar`).
    const primary = lower.split(/[-_]/)[0];
    if (isLocale(primary)) return primary;
  }
  return fallback;
}

/**
 * Pick the value for the given locale from any {@link Bilingual} field.
 * Falls back to the alternate locale if the requested one is empty —
 * never returns `undefined`, so it is safe to render directly.
 */
export function pick<T>(field: Bilingual<T>, locale: Locale): T {
  const primary = field[locale];
  if (primary !== undefined && primary !== null && primary !== "") {
    return primary;
  }
  return field[getAlternateLocale(locale)];
}

/**
 * Convenience helper for HTML `dir` and `lang` attributes:
 *   <html {...localeAttributes(locale)}>
 */
export function localeAttributes(locale: Locale): {
  lang: Locale;
  dir: Direction;
} {
  return { lang: locale, dir: getDirection(locale) };
}
