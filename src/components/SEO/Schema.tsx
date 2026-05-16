// src/components/SEO/Schema.tsx
import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── Constants & IDs ──────────────────────────────────────────────────────────
const SITE_URL = "https://hamrolink.com";
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// ─── Shared Base Entities (no @context, used in @graph) ───────────────────────
export const organizationBase = {
  "@type": "Organization",
  "@id": ORG_ID,
  "name": "HamroLink",
  "alternateName": "हाम्रोलिङ्क",
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    "url": `${SITE_URL}/logo.png`,
    "width": 512,
    "height": 512
  },
  "description": "Nepal's first AI-powered business presence platform. Website builder with eSewa/Khalti payments, AI chatbot, and professional templates.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pakhribas-04",
    "addressLocality": "Dhankuta",
    "addressRegion": "Koshi Province",
    "postalCode": "56700",
    "addressCountry": "NP"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+977-9816326639",
      "contactType": "customer support",
      "email": "support@hamrolink.com",
      "availableLanguage": ["Nepali", "English"]
    }
  ],
  "sameAs": [
    "https://facebook.com/hamrolink",
    "https://twitter.com/hamrolink"
  ]
};

export const websiteBase = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  "name": "HamroLink",
  "url": SITE_URL,
  "publisher": { "@id": ORG_ID },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// ─── Component: GlobalSchema (Used in layout.tsx) ──────────────────────────────
export default function GlobalSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationBase,
      websiteBase,
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "HamroLink",
        "url": SITE_URL,
        "image": `${SITE_URL}/og-image.png`,
        "telephone": "+977-9816326639",
        "address": organizationBase.address,
        "priceRange": "NPR 0 - NPR 2500/month"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Component: HomeSchema (Used in page.tsx) ──────────────────────────────────
export function HomeSchema({ faqItems, lang }: { faqItems: FAQItem[]; lang: string }) {
  const isNe = lang === 'ne';
  const pageUrl = isNe ? `${SITE_URL}/ne` : SITE_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": isNe ? "हाम्रोलिङ्क — AI वेबसाइट बिल्डर" : "HamroLink — AI Website Builder",
        "isPartOf": { "@id": WEBSITE_ID },
        "about": { "@id": ORG_ID }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        "isPartOf": { "@id": `${pageUrl}/#webpage` },
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Component: PricingPageSchema (Used in pricing/page.tsx) ──────────────────
export function PricingPageSchema({ faqItems, lang }: { faqItems: FAQItem[]; lang: string }) {
  const pageUrl = `${SITE_URL}/${lang}/pricing`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        "name": "HamroLink",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "author": { "@id": ORG_ID },
        "offers": [
          {
            "@type": "Offer",
            "name": "Local Start",
            "price": "199",
            "priceCurrency": "NPR"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Component: BlogPageSchema (Used in blog/[slug]/page.tsx) ──────────────
export function BlogPageSchema({ post, lang }: { post: any; lang: string }) {
  const isNe = lang === 'ne';
  const canonicalUrl = isNe
    ? `${SITE_URL}/ne/blog/${post.slug}`
    : `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}/#post`,
        "headline": isNe ? post.title_ne : post.title_en,
        "description": isNe ? post.excerpt_ne : post.excerpt_en,
        "datePublished": post.publishedAt || post.createdAt,
        "dateModified": post.updatedAt || post.publishedAt || post.createdAt,
        "author": { "@id": ORG_ID },
        "publisher": { "@id": ORG_ID },
        "image": post.featuredImage ? {
          "@type": "ImageObject",
          "url": post.featuredImage
        } : undefined,
        "isPartOf": { "@id": WEBSITE_ID },
        "mainEntityOfPage": { "@id": canonicalUrl }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "HamroLink", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": isNe ? "ब्लग" : "Blog", "item": `${SITE_URL}${isNe ? '/ne' : ''}/blog` },
          { "@type": "ListItem", "position": 3, "name": isNe ? post.title_ne : post.title_en, "item": canonicalUrl }
        ]
      },
      ...(post.faqs?.length ? [{
        "@type": "FAQPage",
        "@id": `${canonicalUrl}/#faq`,
        "mainEntity": post.faqs.map((f: any) => ({
          "@type": "Question",
          "name": isNe ? f.question_ne : f.question_en,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": isNe ? f.answer_ne : f.answer_en
          }
        }))
      }] : [])
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
