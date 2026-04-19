import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

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

  return buildMetadata({ title, description, path: "/ai", lang });
}

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}