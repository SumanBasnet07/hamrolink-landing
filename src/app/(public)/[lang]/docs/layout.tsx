import { Metadata } from 'next';
import { getAlternates, getOgUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  const metadataMap = {
    en: {
      title: 'HamroLink Digital Documentation: Help Center & User Guides',
      description: 'Learn how to use HamroLink Digital, setup your AI chatbot, connect eSewa/Khalti, and add custom domains. Guides and FAQs for your business website.',
    },
    ne: {
      title: 'हाम्रोलिङ्क डिजिटल दस्तावेजीकरण: सहायता केन्द्र र निर्देशिकाहरू',
      description: 'हाम्रोलिङ्क डिजिटल कसरी प्रयोग गर्ने, AI च्याटबोट सेटअप गर्ने, ई-सेवा/खल्ती जडान गर्ने र आफ्नै डोमेन थप्ने तरिकाहरू सिक्नुहोस्।',
    }
  };

  const { title, description } = metadataMap[lang] || metadataMap.en;

  return {
    title,
    description,
    alternates: getAlternates("/docs", lang),
    openGraph: {
      title,
      description,
      url: getOgUrl("/docs", lang),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
