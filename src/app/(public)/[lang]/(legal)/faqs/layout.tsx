import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: "en" | "ne" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  const title = ne
    ? "बारम्बार सोधिने प्रश्नहरू | HamroLink सहायता"
    : "Frequently Asked Questions | HamroLink Support";
  const description = ne
    ? "HamroLink का योजना, मूल्य, डोमेन, भुक्तानी, सहायता र AI सुविधाबारे धेरै सोधिने प्रश्नहरूको जवाफ एकै ठाउँमा हेर्नुहोस्।"
    : "Find clear answers to common HamroLink questions about pricing, domains, payments, AI chatbot features, support, and account setup.";
  const path = lang === "en" ? `https://hamrolink.com/faqs` : `https://hamrolink.com/ne/faqs`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "https://hamrolink.com/faqs",
        ne: "https://hamrolink.com/ne/faqs",
        "x-default": "https://hamrolink.com/faqs",
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function FaqLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}