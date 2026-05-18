import React from "react";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { getMainTemplates } from "@/lib/templates";
import { TemplatesClient } from "./TemplatesClient";

// --- Next.js Static Generation Parameters ---
export const revalidate = 604800; // Cache pages for 1 week (Incremental Static Regeneration)

type Params = Promise<{ lang: string }>;

interface PageProps {
  params: Params;
}

export function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "ne" }
  ];
}

// --- Dynamic Metadata & SEO Tag Generator ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  
  const isNe = lang === "ne";
  const title = isNe 
    ? "उत्कृष्ट रेडी-मेड वेबसाइट टेम्प्लेटहरू | HamroLink" 
    : "Explore Premium Website Design Templates | HamroLink";
    
  const description = isNe
    ? "हाम्रो १२०+ रेडी-मेड वेबसाइट डिजाइनहरू हेर्नुहोस्। ई-सेवा/खल्ती भुक्तानी र २४/७ AI कर्मचारी सुविधाहरू सहित मिनेटमै सुरु गर्नुहोस्।"
    : "Browse our 120+ professional pre-designed layouts. Select your themed template, integrate digital payments, and launch your business presence in 15 minutes.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hamrolink.com/${lang === "en" ? "templates" : `${lang}/templates`}`,
      type: "website",
      images: [
        {
          url: "https://hamrolink.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "HamroLink Premium Design Showcase",
        },
      ],
    },
  };
}

export default async function TemplatesPage({ params }: PageProps) {
  const { lang } = await params;
  
  // 1. Fetch translation dictionaries on the server
  const dict = await getDictionary(lang as any);
  
  // 2. Fetch all normalized template catalog items
  const templates = getMainTemplates();

  // 3. Render client UI wrapper
  return (
    <TemplatesClient 
      templates={templates} 
      lang={lang} 
      dict={dict} 
    />
  );
}
