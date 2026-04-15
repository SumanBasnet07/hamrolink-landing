import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';

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
    openGraph: {
      title: ap.title,
      description: ap.description,
      url: `https://hamrolink.com/${lang}/about`,
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/about`,
      languages: {
        en: "https://hamrolink.com/en/about",
        ne: "https://hamrolink.com/ne/about",
        "x-default": "https://hamrolink.com/en/about",
      },
    }
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
