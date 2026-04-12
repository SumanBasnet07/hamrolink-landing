import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: "en" | "ne" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  const title = ne
    ? "सेवा सर्तहरू | HamroLink कानुनी जानकारी"
    : "Terms of Use | HamroLink Legal Information";
  const description = ne
    ? "HamroLink सेवा प्रयोगका नियम, भुक्तानी, खाता, प्रतिबन्धित सामग्री र कानुनी दायित्वबारे सर्तहरू पढ्नुहोस्।"
    : "Review HamroLink terms for account usage, payments, prohibited content, and legal responsibilities before using the platform.";
  const path = `https://hamrolink.com/${lang}/terms`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "https://hamrolink.com/en/terms",
        ne: "https://hamrolink.com/ne/terms",
        "x-default": "https://hamrolink.com/en/terms",
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function TermsLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}