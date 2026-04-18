import { Metadata } from "next";
import { getAlternates } from "@/lib/seo";
import HomeClient from "./HomeClient";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    alternates: getAlternates("/", lang),
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  return <HomeClient params={Promise.resolve({ lang })} />;
}
