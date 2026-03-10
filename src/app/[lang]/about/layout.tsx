import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const ap = d.aboutPage;

  return {
    title: ap.title,
    description: ap.description,
    openGraph: {
      title: ap.title,
      description: ap.description,
      type: "website",
      images: ["/og-about.png"], // Suggesting an OG image
    },
    twitter: {
      card: "summary_large_image",
      title: ap.title,
      description: ap.description,
    },
  };
}

export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const d = getDictionary(lang);
  const ap = d.aboutPage;

  // Schema.org Organization + AboutPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: ap.title,
        description: ap.description,
        mainEntity: {
          "@type": "Organization",
          name: "HamroLink",
          url: "https://hamrolink.com",
          logo: "https://hamrolink.com/logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Pakhribas-04",
            addressLocality: "Dhankuta",
            addressRegion: "Koshi Province",
            addressCountry: "NP",
          },
          areaServed: "Nepal",
          description: ap.subheading,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
