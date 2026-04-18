import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { getAlternates, getOgUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const ap = d.aboutPage;

  return {
    title: ap.title,
    description: ap.description,
    alternates: getAlternates("/about", lang),
    openGraph: {
      title: ap.title,
      description: ap.description,
      url: getOgUrl("/about", lang),
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
