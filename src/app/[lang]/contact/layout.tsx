import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  const cp = d.contactPage;

  return {
    title: cp.title,
    description: cp.description,
    openGraph: {
      title: cp.title,
      description: cp.description,
      type: "website",
    },
  };
}

export default async function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const d = getDictionary(lang);
  const cp = d.contactPage;

  // Schema.org LocalBusiness + ContactPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: cp.title,
        description: cp.description,
      },
      {
        "@type": "LocalBusiness",
        name: cp.businessInfo.name,
        image: "https://hamrolink.com/og-image.png",
        telephone: cp.businessInfo.phone,
        email: cp.businessInfo.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Pakhribas-04",
          addressLocality: "Dhankuta",
          addressRegion: "Koshi Province",
          postalCode: "56800",
          addressCountry: "NP",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "27.0456",
          longitude: "87.2882",
        },
        url: `https://hamrolink.com/${lang}/contact`,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
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
