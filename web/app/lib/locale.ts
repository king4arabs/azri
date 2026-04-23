/**
 * Locale plumbing for the web app.
 *
 * Rules:
 *   - Supported locales: "ar" (default, KSA-first) and "en".
 *   - Unknown locale slugs redirect to the default.
 *   - Direction and lang attributes come from @azri/content helpers.
 */

import { isLocale as isContentLocale, LOCALES, DEFAULT_LOCALE, type Locale } from "@azri/content";

export const supportedLocales: readonly Locale[] = LOCALES;
export const defaultLocale: Locale = DEFAULT_LOCALE;

export function isLocale(value: string): value is Locale {
  return isContentLocale(value);
}

export function localeOrDefault(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}
