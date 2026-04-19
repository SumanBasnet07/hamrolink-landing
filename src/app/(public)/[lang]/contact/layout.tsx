import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const cp = d.contactPage;

  return buildMetadata({
    title: cp.title,
    description: cp.description,
    path: "/contact",
    lang,
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
