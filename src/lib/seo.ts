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

/**
 * Single enforced metadata wrapper.
 * Guarantees canonical, hreflang, og:url, and twitter always stay in sync.
 * Use this for all page/layout generateMetadata functions.
 */
export function buildMetadata({
  title,
  description,
  path,
  lang,
  ogType = "website",
  keywords,
  images,
}: {
  title: string;
  description: string;
  path: string;
  lang: string;
  ogType?: "website" | "article";
  keywords?: string | string[];
  images?: { url: string; width?: number; height?: number; alt?: string }[];
}): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: getAlternates(path, lang),
    openGraph: {
      title,
      description,
      url: getOgUrl(path, lang),
      type: ogType,
      siteName: "HamroLink",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
/**
 * Centralized internal link resolver.
 * Ensures English links are clean and Nepali links are prefixed with /ne.
 */
export function resolveHref(path: string, lang: string): string {
  // Normalize: ensure path starts with / and has no trailing slash (unless root)
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // English (clean) vs Nepali (/ne)
  return lang === "en" ? cleanPath : `/ne${cleanPath === "/" ? "" : cleanPath}`;
}
