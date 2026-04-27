import { Metadata } from "next";
import { getAlternates } from "@/lib/seo";
import HomeClient from "./HomeClient";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: getAlternates("/", lang),
  };
}

// ─── Home-page schema helpers ─────────────────────────────────────────────────
function HomePageSchemas({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const siteUrl = "https://hamrolink.com";
  const pageUrl = ne ? `${siteUrl}/ne` : siteUrl;

  // ── WebPage ──────────────────────────────────────────────────────────────
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    "name": ne
      ? "हाम्रोलिङ्क — नेपाली व्यवसायका लागि AI वेबसाइट बिल्डर"
      : "HamroLink — AI Website Builder for Nepali Businesses",
    "description": ne
      ? "१५ मिनेटमा प्रोफेसनल वेबसाइट बनाउनुहोस्। eSewa, Khalti, AI च्याटबोट र अनलाइन स्टोर सहित।"
      : "Build a professional website in 15 minutes. Includes eSewa/Khalti payments, AI chatbot, and online store — built for Nepal.",
    "url": pageUrl,
    "inLanguage": ne ? "ne" : "en",
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "about": { "@id": `${siteUrl}/#organization` },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2"]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "HamroLink",
          "item": siteUrl,
        },
      ],
    },
  };

  // ── FAQPage — mirrors the FAQ section on the home page ───────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ne
      ? [
          {
            "@type": "Question",
            "name": "सुरु गर्न कति समय लाग्छ (Setup Time)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "मात्र १५ मिनेट। साइन-अप गर्नुहोस्, डिजाइन रोज्नुहोस् र आफ्नो सामग्री थप्नुहोस्।",
            },
          },
          {
            "@type": "Question",
            "name": "के म मेरो आफ्नै Domain जोड्न सक्छु?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "हो, सशुल्क प्लानहरूमा तपाईंले आफ्नो .com वा .com.np डोमेन जोड्न सक्नुहुन्छ।",
            },
          },
          {
            "@type": "Question",
            "name": "नि:शुल्क प्लान (Free Plan) मा के पाइन्छ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "आफ्नै .hamrolink.com सब-डोमेन, कोर पेजहरू र व्यवसाय सुरु गर्न आवश्यक सबै आधारभूत सुविधाहरू।",
            },
          },
          {
            "@type": "Question",
            "name": "के यसमा इमेल मार्केटिङ सुविधाहरू छन्?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "हो, हाम्रा पेड प्लानहरूमा इन-बिल्ट इमेल सिस्टम समावेश छ जसबाट तपाईंले सिधै अफर र अपडेटहरू पठाउन सक्नुहुन्छ।",
            },
          },
          {
            "@type": "Question",
            "name": "HamroLink Business प्लान को मूल्य कति हो?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Business प्लान NPR ३९९/महिना मा उपलब्ध छ जसमा AI च्याटबोट, अनलाइन स्टोर, कस्टम डोमेन र eSewa/Khalti भुक्तानी समावेश छ।",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            "name": "How fast can I launch my website with HamroLink?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can go from zero to a live professional website in about 15 minutes — no coding required.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I connect my own .com.np domain?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We support custom domains on all paid plans and can help you set them up.",
            },
          },
          {
            "@type": "Question",
            "name": "What is included in the free plan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You get a yourbusiness.hamrolink.com subdomain, up to 5 pages, basic templates, and all core features to start for free — no card required.",
            },
          },
          {
            "@type": "Question",
            "name": "Is there a built-in email system?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our platform includes an integrated email system so you can send offers and invoices directly from your dashboard.",
            },
          },
          {
            "@type": "Question",
            "name": "How much does HamroLink Business plan cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Business plan is NPR 399/month and includes an AI chatbot, online store with up to 80 products, custom domain, and eSewa/Khalti/Fonepay payment integration.",
            },
          },
          {
            "@type": "Question",
            "name": "Does HamroLink support eSewa and Khalti payments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All paid HamroLink plans include built-in eSewa, Khalti, and Fonepay payment integration at no additional cost.",
            },
          },
        ],
  };

  // ── HowTo — the 3-step process shown on the home page ───────────────────
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": ne
      ? "HamroLink मा वेबसाइट कसरी बनाउने"
      : "How to Build a Business Website with HamroLink",
    "description": ne
      ? "कुनै कोडिङ बिना नेपाली व्यवसायको वेबसाइट बनाउने चरण-दर-चरण निर्देशन।"
      : "Step-by-step guide to building a professional Nepali business website without any coding.",
    "totalTime": "PT15M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": ne ? "इन्टरनेट जडान" : "Internet connection",
      },
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "HamroLink",
        "url": siteUrl,
      },
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": ne ? "साइन अप गर्नुहोस्" : "Sign Up",
        "text": ne
          ? "app.hamrolink.com मा नि:शुल्क अकाउन्ट बनाउनुहोस्। कुनै कार्ड आवश्यक छैन।"
          : "Create your free account at app.hamrolink.com. No credit card required.",
        "url": "https://app.hamrolink.com",
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": ne ? "डिजाइन छान्नुहोस्" : "Choose Your Design",
        "text": ne
          ? "आफ्नो व्यवसायको प्रकारका लागि उपयुक्त टेम्पलेट छान्नुहोस् र सामग्री थप्नुहोस्।"
          : "Pick a template suited to your business type and add your content — logo, products, hours.",
        "url": siteUrl,
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": ne ? "प्रकाशित गर्नुहोस्" : "Publish & Go Live",
        "text": ne
          ? "आफ्नो साइट प्रकाशित गर्नुहोस् र ग्राहकहरूले खोज्दा तपाईंको वेबसाइट देख्न सक्छन्।"
          : "Publish your site and start receiving customers. Your site will appear on Google searches.",
        "url": "https://app.hamrolink.com",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  return (
    <>
      <HomePageSchemas lang={lang} />
      <HomeClient params={Promise.resolve({ lang })} />
    </>
  );
}
