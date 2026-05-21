import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    // Run on every route EXCEPT _next, api, static files, and already-prefixed paths
    "/((?!_next|api|images|favicon|icon|apple-touch|site.webmanifest|robots|sitemap|og-image|logo|hero|whatsapp|youtube|.*?\\.[\\w]+$).*)",
  ],
};

const SUPPORTED_LANGS = ["en", "ne"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const DEFAULT_LANG: Lang = "en";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const firstSegment = pathname.split("/")[1];

  // If someone explicitly tries to visit /en or /en/pricing, 
  // 301 redirect them to the clean, un-prefixed version to prevent duplicate content SEO penalties.
  if (firstSegment === "en") {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, { status: 301 });
  }

  // Already has a valid language prefix (e.g. /ne) → check for missing /solutions/ segment.
  // Browsers or stale caches may request /ne/school/urlabari instead of /ne/solutions/school/urlabari.
  // Permanently redirect to the correct pSEO URL to fix 404s and preserve link equity.
  if (SUPPORTED_LANGS.includes(firstSegment as Lang)) {
    const pSEO_INDUSTRIES = ["ecommerce", "consultancy", "restaurant", "school", "club", "business", "portfolio", "health"];
    const segments = pathname.split("/").filter(Boolean); // e.g. ["ne", "school", "urlabari"]
    const [langSeg, secondSeg, ...rest] = segments;

    // Pattern: /ne/[industry] or /ne/[industry]/[location] — missing /solutions/
    if (pSEO_INDUSTRIES.includes(secondSeg)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${langSeg}/solutions/${secondSeg}${rest.length ? "/" + rest.join("/") : ""}`;
      return NextResponse.redirect(url, { status: 308 });
    }

    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  
  // Clean SEO Architecture:
  // We explicitly bind all un-prefixed paths directly to English via invisible rewrite.
  url.pathname = `/${DEFAULT_LANG}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}
