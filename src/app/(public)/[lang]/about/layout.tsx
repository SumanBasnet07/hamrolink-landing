import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const ap = d.aboutPage;

  return buildMetadata({
    title: ap.title,
    description: ap.description,
    path: "/about",
    lang,
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
