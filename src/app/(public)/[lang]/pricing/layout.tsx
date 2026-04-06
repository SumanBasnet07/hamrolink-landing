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
      canonical: `https://hamrolink.com/${lang}/pricing`,
    }
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
