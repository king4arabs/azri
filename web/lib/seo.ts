import type { Metadata } from "next";
import {
  azriContent,
  DEFAULT_LOCALE,
  pick,
  webPages,
  type PageId,
} from "@azri/content";
import type { PageBinding } from "@azri/content/page-bindings";

export function buildMetadata(pageId: PageId): Metadata {
  const binding: PageBinding = webPages[pageId];
  const seoKey = binding.seoKey;
  const description = pick(azriContent.seo.defaultDescription, DEFAULT_LOCALE);
  if (seoKey && azriContent.seo.pages[seoKey]) {
    const entry = azriContent.seo.pages[seoKey];
    return {
      title: pick(entry.title, DEFAULT_LOCALE),
      description: entry.description
        ? pick(entry.description, DEFAULT_LOCALE)
        : description,
    };
  }
  return { description };
}
