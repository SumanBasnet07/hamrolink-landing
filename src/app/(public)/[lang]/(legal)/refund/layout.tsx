import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: "en" | "ne" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  const title = ne
    ? "फिर्ता नीति | HamroLink कानुनी जानकारी"
    : "Refund Policy | HamroLink Legal Information";
  const description = ne
    ? "HamroLink सदस्यता र क्रेडिट फिर्ता नीतिबारे स्पष्ट जानकारी पाउनुहोस्, जसमा योग्यता, प्रक्रिया र समयसीमा समावेश छन्।"
    : "Understand HamroLink refund eligibility, credit-based refunds, processing timelines, and cancellation policy for paid plans.";
  const path = lang === "en" ? `https://hamrolink.com/refund` : `https://hamrolink.com/ne/refund`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "https://hamrolink.com/refund",
        ne: "https://hamrolink.com/ne/refund",
        "x-default": "https://hamrolink.com/refund",
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

export default function RefundLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}