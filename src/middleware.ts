// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'experimental-edge';

export const config = {
  matcher: [
    // Run on every route EXCEPT _next, api, static files, and already-prefixed paths
    "/((?!_next|api|favicon|icon|apple-touch|site.webmanifest|robots|sitemap|og-image|logo|hero|whatsapp|youtube|[^/]+\\.[\\w]+$).*)",
  ],
};

const SUPPORTED_LANGS = ["en", "ne"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const DEFAULT_LANG: Lang = "en";

/** Map Accept-Language subtags to supported languages */
function detectLang(req: NextRequest): Lang {
  const acceptLang = req.headers.get("accept-language") ?? "";

  // Parse "ne,en-US;q=0.9,en;q=0.8" → ["ne", "en"]
  const preferred = acceptLang
    .split(",")
    .map((s) => s.split(";")[1]?.includes("q=") ? s.split(";")[0].trim() : s.trim())
    .map((s) => s.toLowerCase().split("-")[0])
    .filter(Boolean);

  for (const lang of preferred) {
    if (SUPPORTED_LANGS.includes(lang as Lang)) return lang as Lang;
  }
  return DEFAULT_LANG;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already has a valid language prefix → do nothing
  const firstSegment = pathname.split("/")[1];
  if (SUPPORTED_LANGS.includes(firstSegment as Lang)) {
    return NextResponse.next();
  }

  // Root "/" or any path without a lang prefix → detect and redirect
  const lang = detectLang(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url, { status: 307 });
}
