import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  const metadataMap = {
    en: {
      title: 'HamroLink Digital Blog: Digital Growth Insights for Nepal',
      description: 'Expert advice on building your digital presence in Nepal. AI trends, e-commerce tips, and local business growth stories.',
    },
    ne: {
      title: 'हाम्रोलिङ्क डिजिटल ब्लग: नेपालको लागि डिजिटल वृद्धि अन्तर्दृष्टि',
      description: 'नेपालमा आफ्नो डिजिटल उपस्थितिको लागि विशेषज्ञ सल्लाह। AI ट्रेन्डहरू, ई-कमर्स सुझावहरू, र स्थानीय व्यवसाय वृद्धिका कथाहरू।',
    }
  };

  const m = metadataMap[lang] || metadataMap.en;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://hamrolink.com/${lang}/blog`,
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/blog`,
    }
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
