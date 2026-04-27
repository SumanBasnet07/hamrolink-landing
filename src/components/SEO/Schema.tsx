// src/components/SEO/Schema.tsx
import React from 'react';

// ─── Organization ─────────────────────────────────────────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HamroLink",
  "alternateName": "हाम्रोलिङ्क",
  "url": "https://hamrolink.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://hamrolink.com/logo.png",
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
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.0310,
    "longitude": 87.3370
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

// ─── WebSite ──────────────────────────────────────────────────────────────────
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "HamroLink",
  "url": "https://hamrolink.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://hamrolink.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// ─── SoftwareApplication (real pricing) ───────────────────────────────────────
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "HamroLink",
  "alternateName": "हाम्रोलिङ्क",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Website Builder",
  "operatingSystem": "Web, iOS, Android",
  "url": "https://hamrolink.com",
  "downloadUrl": "https://app.hamrolink.com",
  "screenshot": "https://hamrolink.com/og-image.png",
  "description": "AI-powered website builder for Nepali businesses. Build your site in minutes with eSewa, Khalti & Fonepay payments, 24/7 AI chatbot, online store, and SEO tools — no coding needed.",
  "featureList": [
    "AI-powered website builder",
    "eSewa & Khalti payment integration",
    "24/7 AI customer chatbot",
    "Online store with product management",
    "Google SEO tools",
    "Custom domain support",
    "Real-time order management",
    "School OS and result checker"
  ],
  "inLanguage": ["en", "ne"],
  "offers": [
    {
      "@type": "Offer",
      "name": "Free",
      "price": "0",
      "priceCurrency": "NPR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "0",
        "priceCurrency": "NPR",
        "unitText": "MONTH"
      },
      "description": "Get started with 1 website, 5 pages, and basic features — no card needed.",
      "url": "https://app.hamrolink.com",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Local Start",
      "price": "199",
      "priceCurrency": "NPR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "199",
        "priceCurrency": "NPR",
        "unitText": "MONTH"
      },
      "description": "Perfect for local shops. Includes AI chatbot, online store (30 products), custom domain, and eSewa/Khalti payments.",
      "url": "https://app.hamrolink.com",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Business",
      "price": "399",
      "priceCurrency": "NPR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "399",
        "priceCurrency": "NPR",
        "unitText": "MONTH"
      },
      "description": "Everything a growing business needs. 40 pages, 80 products, AI chatbot, custom domain, and 500 emails/month.",
      "url": "https://app.hamrolink.com",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Institution Standard",
      "price": "899",
      "priceCurrency": "NPR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "899",
        "priceCurrency": "NPR",
        "unitText": "MONTH"
      },
      "description": "For schools and institutions. 100 pages, 200 products, AI chatbot, custom domain with SSL, and sandbox School OS.",
      "url": "https://app.hamrolink.com",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Institution Pro",
      "price": "2500",
      "priceCurrency": "NPR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "2500",
        "priceCurrency": "NPR",
        "unitText": "MONTH"
      },
      "description": "Full School OS with result checker, marksheet generation, AI remarks, CRM sync, and priority support.",
      "url": "https://hamrolink.com/contact",
      "availability": "https://schema.org/InStock"
    }
  ]
};

// ─── LocalBusiness ────────────────────────────────────────────────────────────
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SoftwareApplication"],
  "name": "HamroLink",
  "alternateName": "हाम्रोलिङ्क",
  "description": "Nepal's AI-powered website builder and business presence platform for small businesses, shops, restaurants, and educational institutions.",
  "url": "https://hamrolink.com",
  "logo": "https://hamrolink.com/logo.png",
  "image": "https://hamrolink.com/og-image.png",
  "telephone": "+977-9816326639",
  "email": "support@hamrolink.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pakhribas-04",
    "addressLocality": "Dhankuta",
    "addressRegion": "Koshi Province",
    "postalCode": "56700",
    "addressCountry": "NP"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.0310,
    "longitude": 87.3370
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "currenciesAccepted": "NPR",
  "paymentAccepted": "eSewa, Khalti, Fonepay, Cash",
  "areaServed": {
    "@type": "Country",
    "name": "Nepal"
  },
  "priceRange": "NPR 0 - NPR 2500/month",
  "applicationCategory": "BusinessApplication",
  "sameAs": [
    "https://facebook.com/hamrolink",
    "https://twitter.com/hamrolink"
  ]
};

// ─── Default export (renders all schemas in <head>) ───────────────────────────
export default function SchemaScripts() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
