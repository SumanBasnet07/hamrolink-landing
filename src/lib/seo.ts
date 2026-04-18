import { Metadata } from "next";

const SITE_URL = "https://hamrolink.com";

/**
 * Generates alternates (canonical and hreflang) for a given path.
 * Ensures English paths are un-prefixed for clean SEO.
 * @param path The path relative to root (e.g., "/pricing" or "pricing"). Should not include language prefix.
 * @param currentLang The current language of the page.
 */
export function getAlternates(path: string, currentLang: string = "en"): Metadata["alternates"] {
  // Normalize path: ensure it starts with / and remove trailing slash
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") cleanPath = "";

  const enUrl = `${SITE_URL}${cleanPath}`;
  const neUrl = `${SITE_URL}/ne${cleanPath}`;

  const canonical = currentLang === "ne" ? neUrl : enUrl;

  return {
    canonical,
    languages: {
      "en": enUrl,
      "ne": neUrl,
      "x-default": enUrl,
    },
  };
}

/**
 * Generates OpenGraph URL for a given path.
 * Consistency with canonical is preferred.
 */
export function getOgUrl(path: string, lang: string): string {
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") cleanPath = "";
  
  return lang === "ne" ? `${SITE_URL}/ne${cleanPath}` : `${SITE_URL}${cleanPath}`;
}
