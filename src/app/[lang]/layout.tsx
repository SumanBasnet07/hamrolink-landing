// app/[lang]/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Noto_Sans_Devanagari } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import "../globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Noto Sans Devanagari covers Nepali script beautifully
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ─── Statics ──────────────────────────────────────────────────────────────────
export const dynamic = "force-static";
const SITE_URL  = "https://hamrolink.com";
const SITE_NAME = "HamroLink";
const SUPPORTED = ["en", "ne"] as const;
type  Lang      = (typeof SUPPORTED)[number];

// ─── Per-language metadata strings ────────────────────────────────────────────
const META: Record<Lang, { title: string; desc: string; keywords: string[] }> = {
  en: {
    title:    `${SITE_NAME} — Build Your Website in Nepal, Free`,
    desc:     "Nepal's fastest-growing website builder. Create professional websites for your business, school, consultancy or store — no coding required. Free plan with eSewa & Khalti payments.",
    keywords: [
      "website builder Nepal","free website Nepal","create website Nepal",
      "Nepali website builder","hamrolink","HamroLink",
      "website for school Nepal","ecommerce Nepal","eSewa website",
      "Khalti payment website","small business website Nepal",
      "consultancy website Nepal","study abroad Nepal website",
      "professional website Nepal","no code website Nepal",
    ],
  },
  ne: {
    title:    `${SITE_NAME} — नेपालमा नि:शुल्क वेबसाइट बनाउनुहोस्`,
    desc:     "नेपालको सबैभन्दा तीव्र गतिले बढ्दो वेबसाइट बिल्डर। व्यवसाय, विद्यालय, परामर्श वा स्टोरका लागि पेशेवर वेबसाइट बनाउनुहोस् — कुनै कोडिङ आवश्यक छैन। eSewa र Khalti भुक्तानीसहित नि:शुल्क योजना।",
    keywords: [
      "वेबसाइट बिल्डर नेपाल","नि:शुल्क वेबसाइट नेपाल","वेबसाइट बनाउने",
      "हाम्रोलिंक","HamroLink","नेपाली वेबसाइट बिल्डर",
      "विद्यालय वेबसाइट नेपाल","ई-कमर्स नेपाल","eSewa वेबसाइट",
      "Khalti भुक्तानी","साना व्यवसाय वेबसाइट","परामर्श वेबसाइट",
      "विदेश अध्ययन वेबसाइट नेपाल","कोड बिना वेबसाइट",
    ],
  },
};

// ─── generateStaticParams ─────────────────────────────────────────────────────
export function generateStaticParams() {
  return SUPPORTED.map((lang) => ({ lang }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (SUPPORTED.includes(rawLang as Lang) ? rawLang : "en") as Lang;
  const m    = META[lang];
  const pageUrl = `${SITE_URL}/${lang}`;

  const jsonLd = buildJsonLd(lang, m.desc);

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default:  m.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: m.desc,
    keywords:    m.keywords,

    authors:   [{ name: SITE_NAME, url: SITE_URL }],
    creator:   SITE_NAME,
    publisher: SITE_NAME,

    alternates: {
      canonical:  pageUrl,
      languages: {
        "en": `${SITE_URL}/en`,
        "ne": `${SITE_URL}/ne`,
        "x-default": `${SITE_URL}/en`,
      },
    },

    openGraph: {
      type:            "website",
      locale:          lang === "ne" ? "ne_NP" : "en_US",
      alternateLocale: lang === "ne" ? ["en_US"] : ["ne_NP"],
      url:             pageUrl,
      siteName:        SITE_NAME,
      title:           m.title,
      description:     m.desc,
      images: [
        { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: `${SITE_NAME} — Nepal's Website Builder`, type: "image/png" },
        { url: `${SITE_URL}/og-image-square.png`, width: 600, height: 600, alt: SITE_NAME, type: "image/png" },
      ],
    },

    twitter: {
      card:        "summary_large_image",
      site:        "@hamrolink",
      creator:     "@hamrolink",
      title:       m.title,
      description: m.desc,
      images:      [`${SITE_URL}/og-image.png`],
    },

    robots: {
      index:     true,
      follow:    true,
      googleBot: {
        index:                 true,
        follow:                true,
        "max-video-preview":   -1,
        "max-image-preview":   "large",
        "max-snippet":         -1,
      },
    },

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    },

    applicationName: SITE_NAME,
    appleWebApp:     { capable: true, title: SITE_NAME, statusBarStyle: "default" },
    formatDetection: { telephone: false },
    category:        "technology",
    icons: {
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon-32x32.png",
      other: [
        { rel: "icon", url: "/favicon.svg" },
        { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon-96x96.png" },
      ],
    },
    appLinks: {
      web: { url: "https://app.hamrolink.com", should_fallback: true },
    },

    other: {
      // Inject JSON-LD via <head> other meta — layout renders the <script> tag
      "json-ld": JSON.stringify(jsonLd),
    },
  };
}

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f172a" },
  ],
};

// ─── JSON-LD builder ──────────────────────────────────────────────────────────
function buildJsonLd(lang: Lang, desc: string) {
  const pageUrl = `${SITE_URL}/${lang}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":  "Organization",
        "@id":    `${SITE_URL}/#organization`,
        name:     SITE_NAME,
        url:      SITE_URL,
        logo: {
          "@type": "ImageObject",
          url:     `${SITE_URL}/logo.png`,
          width:   120,
          height:  40,
        },
        sameAs: [
          "https://facebook.com/hamrolink",
          "https://instagram.com/hamrolink",
          "https://twitter.com/hamrolink",
        ],
        contactPoint: {
          "@type":              "ContactPoint",
          email:                "support@hamrolink.com",
          contactType:          "customer support",
          availableLanguage:    ["English", "Nepali"],
        },
      },
      {
        "@type":       "WebSite",
        "@id":         `${SITE_URL}/#website`,
        url:           SITE_URL,
        name:          SITE_NAME,
        description:   desc,
        publisher:     { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type":  "SearchAction",
          target:   { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
        inLanguage: ["en-US", "ne-NP"],
      },
      {
        "@type":               "SoftwareApplication",
        name:                  SITE_NAME,
        operatingSystem:       "Web",
        applicationCategory:   "WebApplication",
        description:           desc,
        url:                   SITE_URL,
        offers: [
          { "@type": "Offer", name: "Free Plan",    price: "0",   priceCurrency: "NPR" },
          { "@type": "Offer", name: "Starter Plan", price: "349", priceCurrency: "NPR", billingIncrement: "P1M" },
          { "@type": "Offer", name: "Pro Plan",     price: "649", priceCurrency: "NPR", billingIncrement: "P1M" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity:
          lang === "ne"
            ? [
                { "@type": "Question", name: "के HamroLink नि:शुल्क छ?", acceptedAnswer: { "@type": "Answer", text: "हो। HamroLink मा सधैँका लागि नि:शुल्क योजना छ — क्रेडिट कार्ड आवश्यक छैन।" }},
                { "@type": "Question", name: "के eSewa वा Khalti बाट भुक्तानी लिन सकिन्छ?", acceptedAnswer: { "@type": "Answer", text: "हो। Starter र Pro योजनामा eSewa र Khalti भुक्तानी समावेश छ।" }},
                { "@type": "Question", name: "के कोडिङ जान्नु पर्छ?", acceptedAnswer: { "@type": "Answer", text: "होइन। HamroLink मा भिजुअल एडिटर र तयार टेम्प्लेटहरू छन्।" }},
              ]
            : [
                { "@type": "Question", name: "Is HamroLink free?", acceptedAnswer: { "@type": "Answer", text: "Yes. HamroLink offers a Free plan forever — no credit card required." }},
                { "@type": "Question", name: "Can I accept eSewa or Khalti payments?", acceptedAnswer: { "@type": "Answer", text: "Yes. eSewa and Khalti are built-in on Starter and Pro plans." }},
                { "@type": "Question", name: "Do I need to know coding?", acceptedAnswer: { "@type": "Answer", text: "No. HamroLink provides a visual editor and ready-made templates." }},
                { "@type": "Question", name: "Can I connect my own domain?", acceptedAnswer: { "@type": "Answer", text: "Yes. Custom domain is available on Starter and Pro plans." }},
              ],
      },
    ],
  };
}

// ─── Layout component ─────────────────────────────────────────────────────────
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  // Guard: reject unknown lang segments with 404
  if (!SUPPORTED.includes(rawLang as Lang)) notFound();

  const lang     = rawLang as Lang;
  const dict     = getDictionary(lang);
  const jsonLd   = buildJsonLd(lang, META[lang].desc);

  // For Nepali use Devanagari font, English uses DM Sans
  const fontClass = lang === "ne"
    ? `${dmSans.variable} ${devanagari.variable} font-devanagari`
    : `${dmSans.variable} font-latin`;

  return (
    <html lang={lang === "ne" ? "ne" : "en"} dir="ltr" className={fontClass}>
      <head>
        {/* ── JSON-LD ─────────────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── hreflang for SEO ─────────────────────────────────────────── */}
        <link rel="alternate" hrefLang="en"        href={`https://hamrolink.com/en`} />
        <link rel="alternate" hrefLang="ne"        href={`https://hamrolink.com/ne`} />
        <link rel="alternate" hrefLang="x-default" href={`https://hamrolink.com/en`} />

        {/* ── Preconnect ───────────────────────────────────────────────── */}
        <link rel="preconnect"  href="https://fonts.googleapis.com" />
        <link rel="preconnect"  href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.hamrolink.com" />

        {/* ── Favicons ─────────────────────────────────────────────────── */}
        <link rel="icon"             href="/favicon.svg"        type="image/svg+xml" />
        <link rel="icon"             href="/favicon-96x96.png"  type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest"         href="/site.webmanifest" />

        {/* ── Geo (Nepal) ──────────────────────────────────────────────── */}
        <meta name="geo.region"    content="NP" />
        <meta name="geo.placename" content="Nepal" />
        <meta name="geo.position"  content="27.7172;85.3240" />
        <meta name="ICBM"          content="27.7172, 85.3240" />

        {/* ── Content language ─────────────────────────────────────────── */}
        <meta httpEquiv="content-language" content={lang === "ne" ? "ne, en" : "en, ne"} />
      </head>
      <body className="antialiased">
        {children}

        {/* ── Google Analytics 4 ───────────────────────────────────────── */}
        {/* Set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX in your .env.local           */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure',
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}