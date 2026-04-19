import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

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

  return buildMetadata({ title, description, path: "/stories", lang });
}

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}