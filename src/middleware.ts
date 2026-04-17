import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    // Run on every route EXCEPT _next, api, static files, and already-prefixed paths
    "/((?!_next|api|admin|images|favicon|icon|apple-touch|site.webmanifest|robots|sitemap|og-image|logo|hero|whatsapp|youtube|.*?\\.[\\w]+$).*)",
  ],
};

const SUPPORTED_LANGS = ["en", "ne"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const DEFAULT_LANG: Lang = "en";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already has a valid language prefix → do nothing
  const firstSegment = pathname.split("/")[1];
  if (SUPPORTED_LANGS.includes(firstSegment as Lang)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  
  // Clean SEO Architecture:
  // We explicitly bind all un-prefixed paths directly to English via invisible rewrite.
  // We no longer use 307 dynamic language detection redirects to ensure a 100% stable structure for Google.
  url.pathname = `/${DEFAULT_LANG}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}
