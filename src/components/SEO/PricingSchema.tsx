// src/components/SEO/PricingSchema.tsx
// SoftwareApplication schema for the pricing page.
// Uses real plan prices — Google can use this for rich snippets in SERPs.

export default function PricingSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HamroLink",
    "alternateName": "हाम्रोलिङ्क",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Website Builder",
    "operatingSystem": "Web",
    "url": "https://hamrolink.com",
    "description": ne
      ? "नेपाली व्यवसायहरूका लागि AI-संचालित वेबसाइट बिल्डर। eSewa/Khalti भुक्तानी र २४/७ AI सहायक सहित।"
      : "AI-powered website builder for Nepali businesses. Includes eSewa/Khalti payments and 24/7 AI assistant.",
    "offers": [
      {
        "@type": "Offer",
        "name": ne ? "निःशुल्क" : "Free",
        "price": "0",
        "priceCurrency": "NPR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "0",
          "priceCurrency": "NPR",
          "unitText": "MONTH",
        },
        "description": ne
          ? "सुरु गर्नुहोस् — कुनै कार्ड नचाहिने। ५ पेज, .hamrolink.com सब-डोमेन।"
          : "Get started — no card needed. 5 pages, .hamrolink.com subdomain.",
        "url": "https://app.hamrolink.com",
        "availability": "https://schema.org/InStock",
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
          "unitText": "MONTH",
        },
        "description": ne
          ? "स्थानीय पसलहरूका लागि। AI च्याटबोट, ३० उत्पादन, कस्टम डोमेन।"
          : "Perfect for local shops. AI chatbot, 30 products, custom domain.",
        "url": "https://app.hamrolink.com",
        "availability": "https://schema.org/InStock",
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
          "unitText": "MONTH",
        },
        "description": ne
          ? "गम्भीर व्यवसायका लागि सबै कुरा। ८० उत्पादन, AI च्याटबोट, ५०० इमेल/महिना।"
          : "Everything a serious business needs. 80 products, AI chatbot, 500 emails/month.",
        "url": "https://app.hamrolink.com",
        "availability": "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        "name": ne ? "संस्था स्ट्यान्डर्ड" : "Institution Standard",
        "price": "899",
        "priceCurrency": "NPR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "899",
          "priceCurrency": "NPR",
          "unitText": "MONTH",
        },
        "description": ne
          ? "स्कूल र संस्थाका लागि। १०० पेज, AI च्याटबोट, SSL कस्टम डोमेन, Sandbox School OS।"
          : "For schools and institutions. 100 pages, AI chatbot, SSL custom domain, Sandbox School OS.",
        "url": "https://app.hamrolink.com",
        "availability": "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        "name": ne ? "संस्था प्रो" : "Institution Pro",
        "price": "2500",
        "priceCurrency": "NPR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "2500",
          "priceCurrency": "NPR",
          "unitText": "MONTH",
        },
        "description": ne
          ? "पूर्ण School OS, रिजल्ट चेकर, मार्कशीट, AI रिमार्क्स र CRM सिन्क।"
          : "Full School OS with result checker, marksheet generation, AI remarks, and CRM sync.",
        "url": "https://hamrolink.com/contact",
        "availability": "https://schema.org/InStock",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
