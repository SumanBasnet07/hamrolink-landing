import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

// ─── Font ──────────────────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ─── Site constants ────────────────────────────────────────────────────────────
const SITE_URL = "https://hamrolink.com";
const SITE_NAME = "HamroLink";
const SITE_DESC =
  "Nepal's fastest-growing website builder. Create professional websites for your business, school, consultancy or store — no coding required. Free plan available with eSewa & Khalti payment integration.";

// ─── Root metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Base ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),

  // ── Title template – pages override the segment ──────────────────────────
  title: {
    default: `${SITE_NAME} — Build Your Website in Nepal, Free`,
    template: `%s | ${SITE_NAME}`,
  },

  // ── Description ──────────────────────────────────────────────────────────
  description: SITE_DESC,

  // ── Keywords (Nepali market + English) ───────────────────────────────────
  keywords: [
    "website builder Nepal",
    "free website Nepal",
    "create website Nepal",
    "Nepali website builder",
    "hamrolink",
    "HamroLink",
    "website for school Nepal",
    "ecommerce Nepal",
    "eSewa website",
    "Khalti payment website",
    "small business website Nepal",
    "consultancy website Nepal",
    "study abroad Nepal website",
    "professional website Nepal",
    "subdomain Nepal",
    "create website free Nepal",
    "website builder no coding",
    "AI chatbot website Nepal",
    "online store Nepal",
    "portfolio website Nepal",
  ],

  // ── Authors / creator ─────────────────────────────────────────────────────
  authors: [{ name: "HamroLink", url: SITE_URL }],
  creator: "HamroLink",
  publisher: "HamroLink",

  // ── Canonical / alternates ────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "ne-NP": `${SITE_URL}/ne`,
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      // Favicon for Google Search Results (Must be multiple of 48x48)
      {
        rel: "icon",
        url: "/favicon.svg", // If this file contains multiple sizes, use it
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon-96x96.png", // If you have a high-res version
      },
    ],
  },
  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ne_NP"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Build Your Website in Nepal, Free`,
    description: SITE_DESC,
    images: [
      {
        url: `${SITE_URL}/og-image.png`, // 1200×630 recommended
        width: 1200,
        height: 630,
        alt: "HamroLink — Nepal's Website Builder",
        type: "image/png",
      },
      {
        url: `${SITE_URL}/og-image-square.png`, // 1:1 for some platforms
        width: 600,
        height: 600,
        alt: "HamroLink",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@hamrolink",
    creator: "@hamrolink",
    title: `${SITE_NAME} — Build Your Website in Nepal, Free`,
    description: SITE_DESC,
    images: [`${SITE_URL}/og-image.png`],
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (replace values with real codes) ─────────────────────────
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
    // yandex: "YOUR_YANDEX_CODE",
    // bing: "YOUR_BING_CODE",
  },

  // ── App / PWA metadata ────────────────────────────────────────────────────
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },

  // ── App links (deep-link to app.hamrolink.com) ────────────────────────────
  appLinks: {
    web: {
      url: "https://app.hamrolink.com",
      should_fallback: true,
    },
  },

  // ── Category ─────────────────────────────────────────────────────────────
  category: "technology",
};

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 120,
        height: 40,
      },
      sameAs: [
        "https://facebook.com/hamrolink",
        "https://instagram.com/hamrolink",
        "https://twitter.com/hamrolink",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@hamrolink.com",
        contactType: "customer support",
        availableLanguage: ["English", "Nepali"],
      },
    },

    // WebSite — enables Google Sitelinks search box
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["en-US", "ne-NP"],
    },

    // SoftwareApplication
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      operatingSystem: "Web",
      applicationCategory: "WebApplication",
      description: SITE_DESC,
      url: SITE_URL,
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "NPR",
          description: "1 website, 5 pages, hamrolink.com subdomain",
        },
        {
          "@type": "Offer",
          name: "Starter Plan",
          price: "399",
          priceCurrency: "NPR",
          billingIncrement: "P1M",
          description:
            "20 pages, custom domain, AI chatbot, e-commerce, 1,500 chatbot msgs/mo",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "899",
          priceCurrency: "NPR",
          billingIncrement: "P1M",
          description:
            "50 pages, 300 products, 3,000 chatbot msgs/mo, analytics, code injection",
        },
      ],
    },

    // FAQPage — boosts FAQ rich results
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is HamroLink free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. HamroLink offers a Free plan forever that includes 1 website, 5 pages and a hamrolink.com subdomain — no credit card required.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use eSewa or Khalti on my HamroLink website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. HamroLink has built-in integration for eSewa and Khalti on Starter and Pro plans, so you can accept payments from your customers without any technical setup.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to know coding to build a website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No coding is required. HamroLink provides a visual drag-and-drop editor and ready-made templates for portfolios, e-commerce stores, schools, consultancies and restaurants.",
          },
        },
        {
          "@type": "Question",
          name: "Can I connect my own domain to HamroLink?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Custom domain connection is available on the Starter and Pro plans. Simply point your DNS CNAME to HamroLink and your site goes live on your own domain.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of websites can I build with HamroLink?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "HamroLink supports personal portfolios, online stores with eSewa/Khalti payments, school and college sites with enrollment forms, study-abroad consultancy pages, restaurant menus and reservation systems, and general business landing pages.",
          },
        },
      ],
    },
  ],
};

// ─── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        {/* ── JSON-LD structured data ─────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── Preconnect / DNS prefetch for performance ───────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://app.hamrolink.com" />

        {/* ── Favicons (generate from realfavicongenerator.net) ────────── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Geo targeting ────────────────────────────────────────────── */}
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Nepal" />
        <meta name="geo.position" content="27.7172;85.3240" />
        <meta name="ICBM" content="27.7172, 85.3240" />

        {/* ── Language ─────────────────────────────────────────────────── */}
        <meta httpEquiv="content-language" content="en, ne" />
      </head>
      <body className={`${dmSans.className} antialiased`}>{children}</body>
    </html>
  );
}
