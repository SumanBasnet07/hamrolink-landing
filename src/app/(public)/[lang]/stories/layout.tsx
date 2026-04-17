import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: "en" | "ne" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  const title = ne
    ? "सफलता कथाहरू | HamroLink व्यवसाय रूपान्तरण"
    : "Success Stories | HamroLink Business Transformations";
  const description = ne
    ? "HamroLink प्रयोग गरेर नेपाली व्यवसायहरूले अनलाइनमा कसरी राम्रो नतिजा पाए भन्ने वास्तविक रूपान्तरण कथाहरू पढ्नुहोस्।"
    : "See real transformation stories of Nepali businesses using HamroLink to improve trust, visibility, and customer conversions online.";
  const path = lang === "en" ? `https://hamrolink.com/stories` : `https://hamrolink.com/ne/stories`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "https://hamrolink.com/stories",
        ne: "https://hamrolink.com/ne/stories",
        "x-default": "https://hamrolink.com/stories",
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

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}