import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: lang === 'ne' ? 'नीति र सर्तहरू' : 'Policies & Terms',
    description: lang === 'ne' ? 'हाम्रोलिंकका कानुनी सर्त र नीतिहरू।' : 'Legal terms and policies for HamroLink.',
    robots: { index: true, follow: true },
  };
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
