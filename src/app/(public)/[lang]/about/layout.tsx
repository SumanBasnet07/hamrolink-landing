import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  const metadataMap = {
    en: {
      title: 'About HamroLink: Nepal ko AI Website Builder | Dhankuta',
      description: 'Find out more about HamroLink, Nepal\'s first AI-powered business platform. Established in Dhankuta. Mission: Making every Nepali business digital.',
    },
    ne: {
      title: 'हाम्रोलिंकको बारेमा: नेपालको पहिलो AI-Powered डिजिटल प्लेटफर्म',
      description: 'हाम्रोलिंकको जानकारी। धनकुटाबाट सुरु भएको नेपालको पहिलो AI-Powered डिजिटल प्लेटफर्म। हाम्रो उद्देश्य: प्रत्येक नेपाली व्यवसायलाई डिजिटल बनाउने।',
    }
  };

  const m = metadataMap[lang] || metadataMap.en;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://hamrolink.com/${lang}/about`,
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/about`,
    }
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
