import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as any);
  
  const title = `${d.nav.docs} Hub | HamroLink — Nepal's #1 Website Builder`;
  const description = "Comprehensive documentation, step-by-step guides, and help articles for Hamrolink users in Nepal. Built for creators, shops, and businesses.";
  
  return {
    title,
    description,
    keywords: ["Hamrolink documentation", "Nepali website builder guide", "how to build website Nepal"],
    openGraph: {
      title,
      description,
      url: `https://hamrolink.com/${lang}/docs`,
      siteName: "HamroLink",
      images: [
        {
          url: "https://hamrolink.com/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: lang === "ne" ? "ne_NP" : "en_US",
      type: "website",
    },
  };
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-layout">
      {children}
    </div>
  );
}
