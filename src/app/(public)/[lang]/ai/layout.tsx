import type { Metadata } from "next";
import { getAlternates, getOgUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: "en" | "ne" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  const title = ne
    ? "AI Chatbot | HamroLink २४/७ ग्राहक सहायक"
    : "AI Chatbot | HamroLink 24/7 Customer Assistant";
  const description = ne
    ? "HamroLink AI chatbot ले तपाईंको वेबसाइटमा २४/७ ग्राहक प्रश्नहरूको जवाफ दिई बढी लिड र बिक्रीमा मद्दत गर्छ।"
    : "Add HamroLink AI chatbot to answer customer questions instantly, improve lead conversion, and keep your business responsive 24/7.";
  const path = lang === "en" ? `https://hamrolink.com/ai` : `https://hamrolink.com/ne/ai`;

  return {
    title,
    description,
    alternates: getAlternates("/ai", lang),
    openGraph: {
      title,
      description,
      url: getOgUrl("/ai", lang),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}