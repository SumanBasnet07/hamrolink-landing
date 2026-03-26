import type { Metadata, Viewport } from "next";
import { Outfit, Mukta, Sora } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import "@/app/globals.css";
import { Analytics } from "@/components/SEO/Analytics";
import SchemaScripts from "@/components/SEO/Schema";

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Outfit: primary UI font (body, nav, pricing cards, buttons)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Sora: display font — used only for hero h1 headings for premium feel
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["700", "800"],
});

// Mukta: Devanagari font — always loaded so Nepali text renders correctly
// even on English-language pages with mixed content
const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// ─── Statics ──────────────────────────────────────────────────────────────────
export const dynamic = "force-static";
const SITE_URL  = "https://hamrolink.com";
const SITE_NAME = "HamroLink Digital";
const SUPPORTED = ["en", "ne"] as const;
type  Lang      = (typeof SUPPORTED)[number];

// ─── Per-language metadata strings ────────────────────────────────────────────
const META: Record<Lang, { title: string; desc: string; keywords: string[] }> = {
  en: {
    title:    `${SITE_NAME} — Nepal's First AI-Powered Business Presence Platform`,
    desc:     "Move beyond Facebook. Hire a 24/7 AI staff for your business. Build your professional presence in minutes with HamroLink's AI-powered platform & local SEO.",
    keywords: [
      "AI website builder Nepal","AI chatbot for business Nepal","create website Nepal",
      "Nepali website builder","hamrolink","HamroLink",
      "24/7 AI staff Nepal","ecommerce Nepal","eSewa website",
      "Khalti payment website","small business website Nepal",
      "consultancy website Nepal","automated customer support Nepal",
      "professional website Nepal","digital presence platform Nepal",
    ],
  },
  ne: {
    title:    `${SITE_NAME} — नेपालको पहिलो AI-Powered व्यवसायिक डिजिटल प्लेटफर्म`,
    desc:     "फेसबुक मात्र पर्याप्त छैन। आफ्नो व्यवसायका लागि २४/७ AI कर्मचारी राख्नुहोस्। मिनेटमै प्रोफेसनल वेबसाइट बनाउनुहोस्—AI च्याटबोट र ई-सेवा सुविधाहरू सहित।",
    keywords: [
      "AI वेबसाइट बिल्डर नेपाल","AI च्याटबोट व्यवसाय","वेबसाइट बनाउने",
      "हाम्रोलिंक","HamroLink","नेपाली वेबसाइट बिल्डर",
      "डिजिटल व्यवसाय नेपाल","ई-कमर्स नेपाल","eSewa वेबसाइट",
      "Khalti भुक्तानी","साना व्यवसाय वेबसाइट","परामर्श वेबसाइट",
      "स्वचालित ग्राहक सेवा","डिजिटल मार्केटिङ नेपाल",
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
        { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: `${SITE_NAME} — Nepal's AI Business Platform`, type: "image/png" },
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
        'max-video-preview':   -1,
        'max-image-preview':   'large',
        'max-snippet':         -1,
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

// ─── Layout component ─────────────────────────────────────────────────────────
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!SUPPORTED.includes(rawLang as Lang)) notFound();

  const lang     = rawLang as Lang;
  
  // Always include all three font variables so:
  // - Sora is available for .font-display (hero headings)
  // - Mukta renders Devanagari correctly on any page (mixed content)
  // - Outfit is the default UI font
  const fontClass = `${outfit.variable} ${sora.variable} ${mukta.variable} ${
    lang === "ne" ? "font-mukta" : "font-outfit"
  } font-sans`;

  return (
    <html lang={lang === "ne" ? "ne" : "en"} dir="ltr" className={fontClass}>
      <head>
        {/* ── Schema ──────────────────────────────────────────────────── */}
        <SchemaScripts />

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
        <Analytics />
      </body>
    </html>
  );
}