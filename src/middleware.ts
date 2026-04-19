import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next|api|admin|images|favicon|icon|apple-touch|site.webmanifest|robots|sitemap|og-image|logo|hero|whatsapp|youtube|.*?\\.[\\w]+$).*)",
  ],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔥 Redirect ALL /en/* → clean URL
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308); // 308 is fine
  }

  // ✅ Allow everything else (/, /ne/*, etc.)
  return NextResponse.next();
}