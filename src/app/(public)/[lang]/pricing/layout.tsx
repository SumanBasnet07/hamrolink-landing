import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  const metadataMap = {
    en: {
      title: 'Pricing Plans & AI Credits | HamroLink Digital Nepal',
      description: 'Find the perfect plan for your business website. Start for free or scale with Pro. Transparent pricing starting at NPR 399/month with AI-powered chatbot included.',
    },
    ne: {
      title: 'मूल्य र योजनाहरू | हाम्रोलिङ्क डिजिटल नेपाल (HamroLink Digital)',
      description: 'आफ्नो व्यवसायिक वेबसाइटका लागि उत्तम प्लान छनोट गर्नुहोस्। रु ३९९/महिनाबाट सुरु हुने सस्तो र सुलभ डिजिटल उपस्थिति—AI च्याटबोट सुविधासहित।',
    }
  };

  const m = metadataMap[lang] || metadataMap.en;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://hamrolink.com/${lang}/pricing`,
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/pricing`,
    }
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
