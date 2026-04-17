import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: "en" | "ne" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  const title = ne
    ? "गोपनीयता नीति | HamroLink कानुनी जानकारी"
    : "Privacy Policy | HamroLink Legal Information";
  const description = ne
    ? "HamroLink मा तपाईंको व्यक्तिगत डेटा कसरी सङ्कलन, प्रयोग र सुरक्षित गरिन्छ भन्ने स्पष्ट जानकारी पढ्नुहोस्।"
    : "Read how HamroLink collects, uses, and protects your personal data, including your rights, security practices, and contact options.";
  const path = lang === "en" ? `https://hamrolink.com/privacy` : `https://hamrolink.com/ne/privacy`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "https://hamrolink.com/privacy",
        ne: "https://hamrolink.com/ne/privacy",
        "x-default": "https://hamrolink.com/privacy",
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

export default function PrivacyLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}