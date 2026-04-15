import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';

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
    openGraph: {
      title: cp.title,
      description: cp.description,
      url: `https://hamrolink.com/${lang}/contact`,
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/contact`,
      languages: {
        en: "https://hamrolink.com/en/contact",
        ne: "https://hamrolink.com/ne/contact",
        "x-default": "https://hamrolink.com/en/contact",
      },
    }
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
