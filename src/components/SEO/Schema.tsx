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

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Website बनाउन कति पैसा लाग्छ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HamroLink मा तपाईँ ३९९ प्रति महिनाबाट आफ्नो प्रोफेसनल वेबसाइट सुरु गर्न सक्नुहुन्छ। नि:शुल्क योजना पनि उपलब्ध छ।"
      }
    },
    {
      "@type": "Question",
      "name": "eSewa र Khalti बाट भुक्तानी लिन मिल्छ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "हो, HamroLink मा eSewa र Khalti गेटवे पहिले नै जडान गरिएको हुन्छ। तपाईँले सिधै आफ्नो खातामा पैसा लिन सक्नुहुन्छ।"
      }
    },
    {
      "@type": "Question",
      "name": "के मलाई कोडिङ आउनु पर्छ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "बिल्कुलै पर्दैन। HamroLink एक नो-कोड प्लेटफर्म हो। तपाईँले सजिलै ड्र्याग एण्ड ड्रप गरेर वा हाम्रा टेम्प्लेटहरू प्रयोग गरेर वेबसाइट बनाउन सक्नुहुन्छ।"
      }
    },
    {
      "@type": "Question",
      "name": "AI chatbot ले कसरी काम गर्छ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "हाम्रो AI च्याटबोटले तपाईँको व्यवसायको २४/७ हेरचाह गर्छ। यसले ग्राहकका प्रश्नहरूको जवाफ दिन्छ, मूल्य बताउँछ र आवश्यक परे ह्वाट्सएपमा रिडाइरेक्ट गर्छ।"
      }
    }
  ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
