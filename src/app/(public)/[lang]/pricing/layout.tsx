import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const pp = d.pricing;

  return {
    title: pp.title,
    description: pp.description,
    openGraph: {
      title: pp.title,
      description: pp.description,
      url: `https://hamrolink.com/${lang}/pricing`,
    },
    alternates: {
      canonical: lang === "en" ? `https://hamrolink.com/pricing` : `https://hamrolink.com/ne/pricing`,
      languages: {
        en: "https://hamrolink.com/pricing",
        ne: "https://hamrolink.com/ne/pricing",
        "x-default": "https://hamrolink.com/pricing",
      },
    }
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
