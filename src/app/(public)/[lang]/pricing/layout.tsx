import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const pp = d.pricing;

  return buildMetadata({
    title: pp.title,
    description: pp.description,
    path: "/pricing",
    lang,
  });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
