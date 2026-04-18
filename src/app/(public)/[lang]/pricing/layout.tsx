import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { getAlternates, getOgUrl } from "@/lib/seo";

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
    alternates: getAlternates("/pricing", lang),
    openGraph: {
      title: pp.title,
      description: pp.description,
      url: getOgUrl("/pricing", lang),
    },
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
