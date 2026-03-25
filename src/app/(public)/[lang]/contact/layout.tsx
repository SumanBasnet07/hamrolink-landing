import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  const metadataMap = {
    en: {
      title: 'Contact HamroLink | Support, Help, Partnership Nepal',
      description: 'Contact HamroLink for support, questions, or partnerships. Located in Dhankuta, Nepal. Phone: +977-9816326639, Email: support@hamrolink.com',
    },
    ne: {
      title: 'हाम्रोलिंक सम्पर्क | सहयोग र साझेदारी',
      description: 'हाम्रोलिंक टोलीसँग सम्पर्क गर्नुहोस्। सहयोग, प्रश्न वा साझेदारीका लागि। धनकुटा, नेपाल। फोन: +९७७-९७१३१०१९५७, इमेल: support@hamrolink.com',
    }
  };

  const m = metadataMap[lang] || metadataMap.en;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://hamrolink.com/${lang}/contact`,
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/contact`,
    }
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
