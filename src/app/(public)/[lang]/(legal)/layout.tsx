import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: 'en' | 'ne' }>;
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
