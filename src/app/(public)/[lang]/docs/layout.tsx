import { Metadata } from 'next';
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";

  const title = ne
    ? 'हाम्रोलिङ्क डिजिटल दस्तावेजीकरण: सहायता केन्द्र र निर्देशिकाहरू'
    : 'HamroLink Digital Documentation: Help Center & User Guides';
  const description = ne
    ? 'हाम्रोलिङ्क डिजिटल कसरी प्रयोग गर्ने, AI च्याटबोट सेटअप गर्ने, ई-सेवा/खल्ती जडान गर्ने र आफ्नै डोमेन थप्ने तरिकाहरू सिक्नुहोस्।'
    : 'Learn how to use HamroLink Digital, setup your AI chatbot, connect eSewa/Khalti, and add custom domains. Guides and FAQs for your business website.';

  return buildMetadata({ title, description, path: "/docs", lang });
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
