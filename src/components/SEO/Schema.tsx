// src/components/SEO/Schema.tsx
import React from 'react';

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HamroLink",
  "alternateName": "हाम्रोलिङ्क",
  "url": "https://hamrolink.com",
  "logo": "https://hamrolink.com/logo.png",
  "description": "Nepal's first AI-powered business presence platform. Website builder with eSewa/Khalti payments, AI chatbot, and professional templates.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pakhribas-04",
    "addressLocality": "Dhankuta",
    "addressRegion": "Koshi Province",
    "addressCountry": "Nepal"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+977-9713101957",
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

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "HamroLink AI Business Platform",
  "description": "AI-powered digital presence platform for Nepali businesses with eSewa/Khalti payments and 24/7 AI staff.",
  "brand": {
    "@type": "Brand",
    "name": "HamroLink"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "899",
    "priceCurrency": "NPR",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250"
  }
};


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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
