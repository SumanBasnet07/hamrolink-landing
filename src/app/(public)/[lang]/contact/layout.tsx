import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { getAlternates, getOgUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const cp = d.contactPage;

  return {
    title: cp.title,
    description: cp.description,
    alternates: getAlternates("/contact", lang),
    openGraph: {
      title: cp.title,
      description: cp.description,
      url: getOgUrl("/contact", lang),
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
