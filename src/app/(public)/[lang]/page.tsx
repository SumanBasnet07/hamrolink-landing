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

import { HomeSchema, FAQItem } from "@/components/SEO/Schema";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const ne = lang === "ne";

  const faqItems: FAQItem[] = ne
    ? [
        {
          question: "सुरु गर्न कति समय लाग्छ (Setup Time)?",
          answer: "मात्र १५ मिनेट। साइन-अप गर्नुहोस्, डिजाइन रोज्नुहोस् र आफ्नो सामग्री थप्नुहोस्।",
        },
        {
          question: "के म मेरो आफ्नै Domain जोड्न सक्छु?",
          answer: "हो, सशुल्क प्लानहरूमा तपाईंले आफ्नो .com वा .com.np डोमेन जोड्न सक्नुहुन्छ।",
        },
        {
          question: "नि:शुल्क प्लान (Free Plan) मा के पाइन्छ?",
          answer: "आफ्नै .hamrolink.com सब-डोमेन, कोर पेजहरू र व्यवसाय सुरु गर्न आवश्यक सबै आधारभूत सुविधाहरू।",
        },
        {
          question: "के यसमा इमेल मार्केटिङ सुविधाहरू छन्?",
          answer: "हो, हाम्रा पेड प्लानहरूमा इन-बिल्ट इमेल सिस्टम समावेश छ जसबाट तपाईंले सिधै अफर र अपडेटहरू पठाउन सक्नुहुन्छ।",
        },
        {
          question: "HamroLink Business प्लान को मूल्य कति हो?",
          answer: "Business प्लान NPR ३९९/महिना मा उपलब्ध छ जसमा AI च्याटबोट, अनलाइन स्टोर, कस्टम डोमेन र eSewa/Khalti भुक्तानी समावेश छ।",
        },
      ]
    : [
        {
          question: "How fast can I launch my website with HamroLink?",
          answer: "You can go from zero to a live professional website in about 15 minutes — no coding required.",
        },
        {
          question: "Can I connect my own .com.np domain?",
          answer: "Absolutely. We support custom domains on all paid plans and can help you set them up.",
        },
        {
          question: "What is included in the free plan?",
          answer: "You get a yourbusiness.hamrolink.com subdomain, up to 5 pages, basic templates, and all core features to start for free — no card required.",
        },
        {
          question: "Is there a built-in email system?",
          answer: "Yes. Our platform includes an integrated email system so you can send offers and invoices directly from your dashboard.",
        },
        {
          question: "How much does HamroLink Business plan cost?",
          answer: "The Business plan is NPR 399/month and includes an AI chatbot, online store with up to 80 products, custom domain, and eSewa/Khalti/Fonepay payment integration.",
        },
        {
          question: "Does HamroLink support eSewa and Khalti payments?",
          answer: "Yes. All paid HamroLink plans include built-in eSewa, Khalti, and Fonepay payment integration at no additional cost.",
        },
      ];

  return (
    <>
      <HomeSchema faqItems={faqItems} lang={lang} />
      <HomeClient params={Promise.resolve({ lang })} />
    </>
  );
}
