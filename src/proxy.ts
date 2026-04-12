// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    // Run on every route EXCEPT _next, api, static files, and already-prefixed paths
    "/((?!_next|api|ai|admin|images|favicon|icon|apple-touch|site.webmanifest|robots|sitemap|og-image|logo|hero|whatsapp|youtube|.*?\\.[\\w]+$).*)",
  ],
};

const SUPPORTED_LANGS = ["en", "ne"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const DEFAULT_LANG: Lang = "en";

/** Detect language based on location (Nepal) and browser headers */
function detectLang(req: NextRequest): Lang {
  // 1. Check for Country Header (Vercel)
  const country = req.headers.get("x-vercel-ip-country");
  if (country === "NP") return "ne";

  // 2. Fallback to Accept-Language headers
  const acceptLang = req.headers.get("accept-language");
  if (!acceptLang) return DEFAULT_LANG;

  // Split by comma and then semicolon to get just the language codes
  const langs = acceptLang.split(',').map(part => part.split(';')[0].trim().split('-')[0].toLowerCase());
  
  for (const lang of langs) {
    if (SUPPORTED_LANGS.includes(lang as Lang)) return lang as Lang;
  }

  return DEFAULT_LANG;
}

export function proxy(req: NextRequest) {
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
