import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: "en" | "ne" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";

  const title = ne
    ? "सुविधाहरू | HamroLink वेबसाइट र AI टुल्स"
    : "Features | HamroLink Website and AI Tools";
  const description = ne
    ? "HamroLink का वेबसाइट, ई-कमर्स, SEO, QR, एनालिटिक्स र AI chatbot सुविधाहरू एकै ठाउँमा तुलना गरी हेर्नुहोस्।"
    : "Explore HamroLink features including website builder, e-commerce, AI chatbot, SEO tools, QR sharing, and analytics for growth.";

  return buildMetadata({ title, description, path: "/features", lang });
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}