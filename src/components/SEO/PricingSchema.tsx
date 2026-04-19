// src/components/SEO/PricingSchema.tsx
// Product + AggregateOffer schema for the pricing page.
// Signals to Google that HamroLink is a SaaS product with tiered pricing.

export default function PricingSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "HamroLink Website Builder",
    "alternateName": "हाम्रोलिङ्क वेबसाइट बिल्डर",
    "description": ne
      ? "नेपाली व्यवसायहरूका लागि AI-संचालित वेबसाइट बिल्डर। ई-सेवा/खल्ती भुक्तानी र २४/७ AI सहायक सहित।"
      : "AI-powered website builder for Nepali businesses. Includes eSewa/Khalti payments and 24/7 AI assistant.",
    "url": "https://hamrolink.com",
    "image": "https://hamrolink.com/og-image.png",
    "brand": {
      "@type": "Brand",
      "name": "HamroLink",
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "NPR",
      "lowPrice": "0",
      "highPrice": "2500",
      "offerCount": "5",
      "offers": [
        {
          "@type": "Offer",
          "name": ne ? "निःशुल्क" : "Free",
          "price": "0",
          "priceCurrency": "NPR",
          "description": ne ? "सुरु गर्नुहोस् — कुनै कार्ड नचाहिने।" : "Get started — no card needed.",
          "url": "https://app.hamrolink.com",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "name": "Local Start",
          "price": "199",
          "priceCurrency": "NPR",
          "description": ne ? "स्थानीय पसलहरूका लागि।" : "Perfect for local shops.",
          "url": "https://app.hamrolink.com",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "name": "Business",
          "price": "399",
          "priceCurrency": "NPR",
          "description": ne ? "गम्भीर व्यवसायका लागि सबै कुरा।" : "Everything a serious business needs.",
          "url": "https://app.hamrolink.com",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "name": ne ? "संस्था स्ट्यान्डर्ड" : "Institution Standard",
          "price": "899",
          "priceCurrency": "NPR",
          "description": ne ? "स्कूल र संस्थाका लागि।" : "For schools and institutions.",
          "url": "https://app.hamrolink.com",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "name": ne ? "संस्था प्रो" : "Institution Pro",
          "price": "2500",
          "priceCurrency": "NPR",
          "description": ne ? "पूर्ण स्कूल OS र AI सिस्टम।" : "Full School OS and custom AI system.",
          "url": "https://hamrolink.com/contact",
          "availability": "https://schema.org/InStock",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
