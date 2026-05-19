import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Check, 
  CheckCircle2, 
  Globe, 
  Bot, 
  ShoppingCart, 
  Rocket, 
  ShieldCheck, 
  LineChart, 
  HelpCircle, 
  MapPin, 
  Smartphone 
} from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import { Location } from "@/models/Location";
import { getTemplatesByCategory } from "@/lib/templates";
import { HeroForm } from "@/components/solutions/HeroForm";
import { HeroMockup } from "@/components/solutions/HeroMockup";
import { PaymentLogos } from "@/components/solutions/PaymentLogos";
import { ThemeWrapper } from "@/components/solutions/ThemeWrapper";
import { FaqAccordion, FAQItem } from "@/components/solutions/FaqAccordion";
import { Navbar } from "@/components/landing/Navbar";
import { getDictionary } from "@/lib/dictionaries";

// --- Next.js 16 App Router Configuration ---
export const revalidate = 604800; // Cache pages for 1 week (Incremental Static Regeneration)
export const dynamicParams = true; // Allow on-demand generation for slugs not in pre-built set

// --- Pre-build all known location × industry pages at deploy time ---
export async function generateStaticParams() {
  try {
    await connectDB();
    const locations = await Location.find({}).lean();
    const params: { lang: string; industry: string; location: string }[] = [];
    for (const loc of locations as any[]) {
      const industries = Object.keys(loc.industries_data || {});
      for (const industry of industries) {
        // Only generate for 'en' — middleware 301-redirects /en/ to / and rewrites / → /en/ internally.
        // Nepali fallback is handled at runtime via effectiveLang override in the page component.
        params.push({ lang: "en", industry, location: loc.slug });
      }
    }
    return params;
  } catch (err) {
    console.error("generateStaticParams: DB query failed — falling back to empty set.", err);
    return [];
  }
}

type Params = Promise<{ lang: string; industry: string; location: string }>;

interface PageProps {
  params: Params;
}

// --- Dynamic Metadata & Schema Generator ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry, location } = await params;
  
  // Canonical URL — no lang prefix (middleware rewrites bare paths → /en internally,
  // and 301-redirects explicit /en/... → /... so the authoritative URL is always prefix-free)
  const canonicalUrl = `https://hamrolink.com/solutions/${industry}/${location}`;

  await connectDB();
  const loc = await Location.findOne({ slug: location.toLowerCase().trim() });
  
  // Guard: explicitly noindex pages with no matching DB record to avoid soft-404 + crawl budget waste
  if (!loc || !loc.industries_data?.[industry]) {
    return {
      robots: { index: false, follow: false },
    };
  }

  const industryData = loc.industries_data[industry];
  const cityName = loc.city_name;
  const capitalizedIndustry = industry.charAt(0).toUpperCase() + industry.slice(1);
  
  const title = `AI-Powered ${capitalizedIndustry} Website Builder in ${cityName} | HamroLink`;
  const description = `${industryData.localized_schema_subtext}. Setup instantly in ${cityName} with localized digital payments (eSewa/Khalti) and advanced AI assistant tools.`;

  return {
    metadataBase: new URL("https://hamrolink.com"),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      // These pages are English-only content — Nepali lang forces English fallback in page render.
      // We expose only the canonical en URL to avoid duplicate indexing under /ne/solutions/...
      languages: {
        en: canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "HamroLink",
      type: "website",
      images: [
        {
          url: "https://hamrolink.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `HamroLink - ${capitalizedIndustry} Website Builder in ${cityName}`,
        },
      ],
    },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { lang, industry, location } = await params;
  
  // Force English fallback if Nepali translations are incomplete for these dynamic pages
  const effectiveLang = lang === "ne" ? "en" : lang;
  const dict = await getDictionary(effectiveLang as any);
  const nav = dict.nav;

  // 1. Establish Database Connection & Perform Query Guard
  await connectDB();
  const loc = await Location.findOne({ slug: location.toLowerCase().trim() });

  if (!loc || !loc.industries_data?.[industry]) {
    return notFound();
  }

  const industryData = loc.industries_data[industry];
  const cityName = loc.city_name;
  const capitalizedIndustry = industry.charAt(0).toUpperCase() + industry.slice(1);

  let industryHubWord = "Hub";
  let heroDescPrefix = "";
  let narrativeParagraph1 = "";
  let narrativeParagraph2 = "";

  switch (industry) {
    case "ecommerce":
    case "restaurant":
      industryHubWord = "Store";
      break;
    case "school":
      industryHubWord = "Platform";
      break;
    case "consultancy":
      industryHubWord = "Portal";
      break;
    case "club":
      industryHubWord = "Network";
      break;
    default:
      industryHubWord = "Hub";
  }

  switch (industry) {
    case "school":
      heroDescPrefix = "Launch a comprehensive, high-speed digital campus with integrated local fee collection. Specifically designed to empower";
      narrativeParagraph1 = `As parents and students in ${cityName} increasingly rely on Google Search to discover and evaluate educational institutions, relying purely on physical noticeboards is no longer sufficient. Progressive schools are adopting structured digital portals.`;
      narrativeParagraph2 = `Depending solely on social media groups leaves critical school announcements disorganized and limits your reach. With the competitive landscape of the ${loc.regional_education_hub || `${cityName} Education Sector`}, providing a centralized hub for digital fee payments, organized circulars, and instant inquiry management is essential for modern educational trust.`;
      break;
    case "consultancy":
      heroDescPrefix = "Develop a professional, ultra-fast online booking and processing portal. Specially tailored to attract";
      narrativeParagraph1 = `In ${cityName}, prospective clients are actively searching for reliable consultancy services online before making life-changing career or travel decisions. Agencies restricted to offline word-of-mouth are losing ground to digitally integrated consultancies.`;
      narrativeParagraph2 = `A fragmented presence on social media makes your consultancy look unprofessional to high-intent clients. Capitalizing on the ${loc.regional_education_hub || `${cityName} Business Corridor`} requires establishing strong digital authority, automated appointment scheduling, and transparent application tracking to stay ahead of regional competition.`;
      break;
    case "club":
      heroDescPrefix = "Create an engaging, fast, and membership-driven community network. Perfectly crafted to unite";
      narrativeParagraph1 = `Community members and event-goers in ${cityName} look online to discover active local clubs and vibrant events. Organizations relying entirely on offline flyers are missing out on connecting with a broader digital-first audience.`;
      narrativeParagraph2 = `Relying purely on Facebook events often results in buried updates and low community engagement. In the growing ${loc.regional_education_hub || `${cityName} Community Scene`}, centralizing membership registrations, event ticketing, and dynamic community noticeboards into a dedicated platform is crucial for long-term growth and visibility.`;
      break;
    case "ecommerce":
      heroDescPrefix = "Build a professional, fast, and local payment-connected online storefront. Specially tailored to serve";
      narrativeParagraph1 = `As shoppers in ${cityName} increasingly compare local retail options through Google Search, brick-and-mortar stores are rapidly expanding into professional, searchable online shopping destinations.`;
      narrativeParagraph2 = `Relying solely on Facebook pages makes your inventory difficult to browse and invisible to high-intent search traffic. With the growing influence of the ${loc.regional_education_hub || `${cityName} Business Corridor`}, offering secure eSewa/Khalti checkouts, organized product catalogs, and automated order tracking is a core competitive necessity.`;
      break;
    case "restaurant":
      heroDescPrefix = "Launch a mouth-watering, fast, and reservation-ready digital dining hub. Perfectly designed to attract";
      narrativeParagraph1 = `Diners in ${cityName} check online menus and reviews before ever stepping foot in a restaurant. Eateries without a professional digital presence are losing hungry customers to competitors who offer seamless online ordering.`;
      narrativeParagraph2 = `Managing orders through messy social media DMs causes delays and frustrated customers. To thrive in the ${loc.regional_education_hub || `${cityName} Culinary Hub`}, implementing automated table reservations, dynamic digital menus, and streamlined takeaway systems is essential to providing a premium dining experience.`;
      break;
    default:
      heroDescPrefix = "Build a professional, fast, and local payment-connected online hub. Specially tailored to serve";
      narrativeParagraph1 = `As more clients and residents in ${cityName} compare local ${industry} operations through Google Search before visiting offices physically, traditional agencies are rapidly shifting from unstructured social media channels toward professional searchable websites.`;
      narrativeParagraph2 = `Relying solely on Facebook pages is making local businesses invisible to high-intent regional traffic. With the growing influence of the ${loc.regional_education_hub || `${cityName} Business Corridor`}, establishing localized digital trust, organized noticeboards, and automated reservation bookings is no longer a luxury—it is a core competitive pressure.`;
  }

  // 2. Fetch Curated Category Templates from local templates.json
  const templates = getTemplatesByCategory(industry, 3);
  const mainTemplateId = templates[0]?.id || "light-ecommerce-about-page";

  // 2b. Determine industry-native features supported by HamroLink:
  let industryFeatures: string[] = [];
  switch (industry) {
    case "consultancy":
      industryFeatures = [
        "24/7 AI Chatbot Assistant for instant student queries",
        "Online counseling appointment booking scheduler",
        "Digital admission and class registration forms",
        "Free local .com.np domain mapping integration",
        "Automated student inquiry tracking CRM system"
      ];
      break;
    case "school":
      industryFeatures = [
        "Digital school Noticeboard & Announcement management",
        "Automated parent email notification system",
        "Direct online admission & intake inquiry forms",
        "School events and activities schedule calendar",
        "Mobile-optimized parent portal connection"
      ];
      break;
    case "ecommerce":
      industryFeatures = [
        "Interactive online product storefront & category catalogs",
        "Dynamic shopping cart & secure instant checkout",
        "Instant eSewa, Khalti & Fonepay wallet integrations",
        "Real-time order delivery receipt generation",
        "Complete automated customer sales analytics dashboard"
      ];
      break;
    case "restaurant":
      industryFeatures = [
        "Beautiful mobile-responsive digital food menu cards",
        "Online table reservation booking scheduler",
        "Takeaway/dine-in order submission portal",
        "Special daily food offers & events highlights boards",
        "Automated kitchen order alert tracking system"
      ];
      break;
    case "club":
      industryFeatures = [
        "Online membership registration & signup forms",
        "Digital event ticket sales & RSVP manager",
        "Direct community noticeboard & announcements log",
        "Animated media gallery showcase for club events",
        "Integrated volunteer & member database tracking"
      ];
      break;
    default:
      industryFeatures = [
        "24/7 Interactive AI Chatbot assistant tools",
        "Free local .com.np Custom Domain connections",
        "Blazing-fast mobile CDN rendering across NTC/Ncell networks",
        "Dynamic digital notice & announcement manager",
        "Automated customer lead collections CRM dashboard"
      ];
  }

  // 3. Dynamic local FAQ definitions derived directly from MongoDB local records
  const faqItems: FAQItem[] = [
    {
      question: `Do I need a formal business registration to launch a ${industry} website in ${cityName}?`,
      answer: `No, formal registration is not required to launch! With HamroLink's built-in local payment tools, independent professionals and startups in ${cityName} can start accepting local payments via eSewa, Khalti, and Fonepay instantly. This is particularly useful for targeting ${loc.primary_client_demographic || 'local clients'}.`,
    },
    {
      question: `How can HamroLink help resolve ${cityName}'s common operational hurdle: "${industryData.common_operational_hurdle}"?`,
      answer: `HamroLink completely automates this. ${industryData.trust_proof_point} This means you no longer lose track of customer requests or experience operational delays, which is a major advantage for businesses in the ${loc.regional_education_hub || cityName}.`,
    },
    {
      question: `Can I connect my own domain and handle local demands like "${industryData.prominent_local_demand}"?`,
      answer: `Yes! HamroLink is built to optimize setups for regional demand like "${industryData.prominent_local_demand}". You can easily map your own custom domain (e.g., .com) or connect a completely free local .com.np domain. Combined with our 24/7 AI chatbot assistant, you will never miss a local lead.`,
    },
    {
      question: `How fast will my ${industry} site load for mobile users in ${cityName}?`,
      answer: `All HamroLink pages are rendered statically and served through globally distributed fast CDNs, optimized specifically for Ncell and NTC mobile networks in Nepal. Even in regions with unstable cellular data, your page loads in under a second, ensuring clients in ${cityName} have a seamless experience.`,
    }
  ];

  // 4. Dynamic Structured JSON-LD JSON markup linking both Service and FAQ schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://hamrolink.com/solutions/${industry}/${location}/#service`,
        "name": `AI-Powered ${capitalizedIndustry} Website Builder in ${cityName}`,
        "serviceType": `${capitalizedIndustry} Digital Agency & Automated Website Builder`,
        "provider": {
          "@type": "Organization",
          "name": "HamroLink",
          "url": "https://hamrolink.com",
          "logo": "https://hamrolink.com/logo.png"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": cityName,
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": loc.province
          }
        },
        "description": industryData.market_insight,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "NPR",
          "lowPrice": "0",
          "highPrice": "399",
          "offerCount": "3"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://hamrolink.com/solutions/${industry}/${location}/#faq`,
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  const isNe = lang === "ne";
  const homePath = isNe ? "/ne" : "/";

  // --- MODULAR RENDER FUNCTIONS ---
  
  const renderHero = (layoutStyle: 'standard' | 'centered' | 'reversed' = 'standard') => {
    // Generate different backgrounds based on industry
    let bgGradient = "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950";
    let accent1 = "bg-indigo-500/10";
    let accent2 = "bg-violet-500/10";
    let textGradient = "from-indigo-400 via-indigo-300 to-violet-400";
    
    if (industry === 'ecommerce' || industry === 'restaurant') {
      bgGradient = "bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/40";
      accent1 = "bg-emerald-500/10";
      accent2 = "bg-teal-500/10";
      textGradient = "from-emerald-400 via-emerald-300 to-teal-400";
    } else if (industry === 'consultancy') {
      bgGradient = "bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950/60";
      accent1 = "bg-sky-500/10";
      accent2 = "bg-blue-500/10";
      textGradient = "from-sky-400 via-sky-300 to-blue-400";
    } else if (industry === 'club') {
      bgGradient = "bg-gradient-to-bl from-slate-950 via-slate-900 to-rose-950/30";
      accent1 = "bg-rose-500/10";
      accent2 = "bg-orange-500/10";
      textGradient = "from-rose-400 via-rose-300 to-orange-400";
    }

    const textColSpan = layoutStyle === 'centered' ? "lg:col-span-12 items-center text-center max-w-4xl mx-auto" : "lg:col-span-7 flex flex-col items-start text-left";
    const mockupColSpan = layoutStyle === 'centered' ? "lg:col-span-12 mt-8" : "lg:col-span-5";

    const TextContent = (
      <div className={textColSpan}>
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full text-white text-xs font-bold mb-6`}>
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AI-Powered Websites for Nepal</span>
        </div>
        
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6 ${layoutStyle === 'centered' ? 'mx-auto' : ''}`}>
          Launch Your {capitalizedIndustry} {industryHubWord} in{" "}
          <span className={`bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}>
            {cityName}
          </span>{" "}
          Today.
        </h1>
        
        <p className={`text-slate-350 text-base sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed mb-8 ${layoutStyle === 'centered' ? 'mx-auto' : ''}`}>
          {heroDescPrefix}{" "}
          <span className="text-white font-semibold">{loc.primary_client_demographic}</span> within the{" "}
          <span className="text-slate-100 font-semibold border-b border-slate-700 pb-0.5">{loc.regional_education_hub || `${cityName} Business Hub`}</span>. No coding or prior technical skills needed.
        </p>

        <HeroForm 
          templateId={mainTemplateId} 
          placeholderText="Enter your business name..."
          buttonText="Create Website" 
        />

        <p className={`text-slate-500 text-xs font-semibold mt-4 flex items-center gap-2 ${layoutStyle === 'centered' ? 'justify-center' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> No credit card required
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> 5-Minute Setup
        </p>
      </div>
    );

    const MockupContent = (
      <div className={`${mockupColSpan} relative w-full flex justify-center`}>
        <HeroMockup 
          templates={templates} 
          cityName={cityName}
          capitalizedIndustry={capitalizedIndustry}
        />
        {layoutStyle !== 'centered' && (
          <>
            <div className="hidden sm:flex absolute -left-10 top-12 p-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl items-center gap-3 shadow-2xl shadow-black/50 hover:scale-105 transition-all">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Check className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Payments</span>
                <span className="text-white text-xs font-black">eSewa Setup Live</span>
              </div>
            </div>
            <div className="hidden sm:flex absolute -right-6 bottom-16 p-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl items-center gap-3 shadow-2xl shadow-black/50 hover:scale-105 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Globe className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Domain Connection</span>
                <span className="text-white text-xs font-black">Free .com.np Setup</span>
              </div>
            </div>
          </>
        )}
      </div>
    );

    return (
      <header className={`relative w-full pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-slate-900 ${bgGradient}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full ${accent1} blur-[120px]`} />
        <div className={`absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full ${accent2} blur-[120px]`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {layoutStyle === 'reversed' ? (
              <>
                {MockupContent}
                {TextContent}
              </>
            ) : (
              <>
                {TextContent}
                {MockupContent}
              </>
            )}
          </div>
        </div>
      </header>
    );
  };

  const renderPaymentLogos = () => (
    <section className="w-full py-8 border-b border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-6 text-center">
          Accept Nepal&apos;s favorite payments instantly
        </p>
        <PaymentLogos />
      </div>
    </section>
  );

  const renderNarrative = (layoutStyle: 'grid' | 'stacked' = 'grid') => (
    <section className="w-full py-20 bg-slate-900/10 border-b border-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,#4f46e5/0.02,transparent_100%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center ${layoutStyle === 'stacked' ? 'mb-16' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-xs font-black uppercase tracking-widest mb-6">
            <Globe className="w-3.5 h-3.5" /> 
            <span>Regional Digital Transition Analysis</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-8 leading-tight max-w-4xl mx-auto">
            Why {capitalizedIndustry} Operations in {cityName} are Transitioning Beyond Facebook Pages
          </h2>
        </div>
        
        {layoutStyle === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left mt-12">
            <div className="lg:col-span-7 text-slate-350 text-sm sm:text-base leading-relaxed space-y-6 font-medium">
              <p>{narrativeParagraph1}</p>
              <p>{narrativeParagraph2}</p>
              {loc.local_landmarks && loc.local_landmarks.length >= 2 ? (
                <p className="text-slate-200 font-semibold border-l-2 border-indigo-500 pl-4 py-1">
                  Whether your business is operating near <span>{loc.local_landmarks[0]}</span>, commercial hubs along <span>{loc.local_landmarks[1]}</span>, or expanding outward, HamroLink establishes instant digital presence for your exact physical neighborhood.
                </p>
              ) : (
                <p className="text-slate-200 font-semibold border-l-2 border-indigo-500 pl-4 py-1">
                  Whether your business is operating in the main commercial hub, busy street corridors, or expanding outward, HamroLink establishes instant digital presence for your exact physical neighborhood.
                </p>
              )}
              {loc.nearby_hubs && loc.nearby_hubs.length > 0 && (
                <p className="text-slate-500 text-xs sm:text-sm italic mt-8 border-t border-slate-800 pt-4">
                  Businesses in {cityName} are increasingly serving customers not only locally, but also from {loc.nearby_hubs.slice(0, 3).join(", ")}, and surrounding districts in {loc.province}.
                </p>
              )}
            </div>
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-base font-black text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
                <span>Tailored {capitalizedIndustry} Features</span>
              </h3>
              <ul className="space-y-4">
                {industryFeatures.map((feat, fi) => (
                  <li key={fi} className="flex gap-3 items-start text-xs sm:text-sm font-semibold text-slate-300">
                    <span className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-4xl mx-auto space-y-12">
            <div className="text-slate-300 text-base sm:text-lg leading-relaxed text-center space-y-6 font-medium">
              <p>{narrativeParagraph1}</p>
              <p>{narrativeParagraph2}</p>
            </div>
            <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black text-white mb-8 text-center border-b border-slate-800 pb-4">
                Essential {capitalizedIndustry} Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {industryFeatures.map((feat, fi) => (
                  <div key={fi} className="flex gap-3 items-start p-4 bg-slate-950 rounded-2xl border border-slate-850">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span className="text-sm font-semibold text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const renderMarketInsights = (layoutStyle: 'grid' | 'cards' = 'grid') => (
    <section className="w-full py-20 md:py-28 border-b border-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_60%,#4338ca/0.05,transparent_100%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-xs font-bold mb-4">
            <LineChart className="w-3.5 h-3.5" />
            <span>Hyper-Local Market Insights</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Dynamic Market Dashboard for {cityName}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
            We compile regional indicators and local growth patterns to build digital features that deliver maximum impact.
          </p>
        </div>

        {layoutStyle === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <div>
                <MapPin className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-black text-white mb-4">Regional Discovery</h3>
                <p className="text-slate-350 text-sm leading-relaxed">{industryData.market_insight}</p>
              </div>
            </div>
            <div className="bg-indigo-950/30 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10"><LineChart className="w-32 h-32 text-indigo-400" /></div>
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-4">Hyper-Local Growth</h3>
                <div className="mt-8">
                  <span className="text-4xl font-black text-indigo-400 block mb-2">{industryData.growth_metric?.split(" ")?.[0] ?? "Growing"}</span>
                  <span className="text-slate-300 text-sm font-bold">{industryData.growth_metric?.split(" ")?.slice(1).join(" ") ?? "Market"}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <div>
                <Sparkles className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-black text-white mb-4">Local Demand</h3>
                <ul className="space-y-3 mt-4">
                  {industryData.prominent_local_demand.split(",").map((demand, di) => (
                    <li key={di} className="flex gap-2 items-start text-slate-350 text-sm leading-relaxed">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{demand.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-8">
                <h3 className="text-2xl font-black text-white mb-4">Regional Discovery</h3>
                <p className="text-slate-300 leading-relaxed">{industryData.market_insight}</p>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                <span className="text-5xl font-black text-white mb-4">{industryData.growth_metric?.split(" ")?.[0] ?? "Growing"}</span>
                <span className="text-indigo-200 text-sm font-bold uppercase tracking-wider">{industryData.growth_metric?.split(" ")?.slice(1).join(" ") ?? "Market"}</span>
              </div>
            </div>
            <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8">
               <h3 className="text-xl font-black text-white mb-6">Prominent Local Demand in {cityName}</h3>
               <div className="flex flex-wrap gap-3">
                 {industryData.prominent_local_demand.split(",").map((demand, di) => (
                    <span key={di} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-sm font-semibold">
                      {demand.trim()}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const renderTemplates = () => (
    <section className="w-full py-20 md:py-28 border-b border-slate-900 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-xs font-bold mb-4">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Premium Pre-Designed Templates</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Tailored {capitalizedIndustry} Designs for {cityName}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
            Fully customizable layouts optimized for blazing-fast local loading speeds.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-lg hover:border-indigo-500/40 transition-all duration-300 flex flex-col">
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-950 border-b border-slate-850">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-4 left-4 px-2.5 py-1 bg-slate-900/90 text-[10px] font-black text-white uppercase rounded-md shadow-md border border-slate-800">
                  {template.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-white mb-2 leading-snug">{template.name}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium line-clamp-3 mb-6">
                    {template.description || "A gorgeous ready-to-launch website layout tailored for local discovery, optimized for payments and super-fast load speeds."}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="https://app.hamrolink.com" className="flex-1 text-center py-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all">
                    Preview
                  </Link>
                  <Link href={`https://app.hamrolink.com/signup?template=${template.id}`} className="flex-1 text-center py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl transition-all">
                    Use This
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderOperationalMatrix = () => (
    <section className="w-full py-20 md:py-28 border-b border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-6">
                <HelpCircle className="w-5 h-5 text-slate-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                Overcoming the Hurdles of {cityName} Businesses
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                Local setups in {cityName} are often bogged down by physical processes and administrative friction. Here is how HamroLink revolutionizes your operational workflow.
              </p>
              <div className="space-y-4 w-full">
                <div className="flex gap-3"><span className="text-rose-500 font-bold">✗</span><span className="text-slate-400 text-xs sm:text-sm font-semibold">Messenger Chaos: Losing hot client inquiries in noisy chats.</span></div>
                <div className="flex gap-3"><span className="text-rose-500 font-bold">✗</span><span className="text-slate-400 text-xs sm:text-sm font-semibold">Physical Notebooks: Relying on paper registers to track schedules.</span></div>
                <div className="flex gap-3"><span className="text-rose-500 font-bold">✗</span><span className="text-slate-400 text-xs sm:text-sm font-semibold">Invisible on Search: Missing out on Google search intent entirely.</span></div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-black uppercase rounded-md tracking-wider">The Operational Hurdle</span>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-bold mt-6 mb-4">&quot;{industryData.common_operational_hurdle}&quot;</p>
                </div>
              </div>
              <div className="p-6 bg-slate-900 border border-indigo-500/30 rounded-2xl flex flex-col justify-between shadow-lg">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-900/30 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase rounded-md tracking-wider">HamroLink Automation</span>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-bold mt-6 mb-4">{industryData.trust_proof_point}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderPricing = () => (
    <section className="w-full py-20 md:py-28 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Tailored Plans for Every Growth Stage</h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">No setup fees, no long-term commitments. Upgrade or downgrade anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 flex flex-col shadow-xl">
            <h3 className="text-xl font-black text-white mb-2">Starter</h3>
            <p className="text-slate-400 text-xs font-semibold h-10 mb-4">Ideal for testing features and creating custom mockups.</p>
            <div className="mb-6"><span className="text-4xl font-black text-white">NPR 0</span><span className="text-slate-500 text-xs font-bold"> / mo</span></div>
            <Link href="https://app.hamrolink.com" className="w-full text-center py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all mb-8">Get Started</Link>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-300 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /><span>1 Website Layout</span></li>
              <li className="flex items-center gap-3 text-slate-300 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /><span>HamroLink Subdomain</span></li>
              <li className="flex items-center gap-3 text-slate-300 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /><span>5 Pages Max per site</span></li>
            </ul>
          </div>
          {/* Pro */}
          <div className="bg-slate-900 border-2 border-indigo-500 rounded-[32px] p-8 flex flex-col shadow-2xl relative scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full">Most Popular</div>
            <h3 className="text-xl font-black text-white mb-2">Local Start</h3>
            <p className="text-slate-300 text-xs font-semibold h-10 mb-4">Perfect setup for local shops, boutiques, and emerging startups.</p>
            <div className="mb-6"><span className="text-4xl font-black text-white">NPR 199</span><span className="text-slate-400 text-xs font-bold"> / mo</span></div>
            <Link href="https://app.hamrolink.com/signup" className="w-full text-center py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg mb-8">Launch Your {industryHubWord}</Link>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-200 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /><span>20 Pages Max per site</span></li>
              <li className="flex items-center gap-3 text-slate-200 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /><span>Custom Domain Supported</span></li>
              <li className="flex items-center gap-3 text-slate-200 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /><span>eSewa & Khalti Setup</span></li>
              <li className="flex items-center gap-3 text-slate-200 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /><span>24/7 AI Chatbot Assistant</span></li>
            </ul>
          </div>
          {/* Business */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 flex flex-col shadow-xl">
            <h3 className="text-xl font-black text-white mb-2">Business</h3>
            <p className="text-slate-400 text-xs font-semibold h-10 mb-4">Full agency capability with maximum quotas and advanced tools.</p>
            <div className="mb-6"><span className="text-4xl font-black text-white">NPR 399</span><span className="text-slate-500 text-xs font-bold"> / mo</span></div>
            <Link href="https://app.hamrolink.com/signup" className="w-full text-center py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all mb-8">Go Pro Today</Link>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-300 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /><span>40 Pages Max per site</span></li>
              <li className="flex items-center gap-3 text-slate-300 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /><span>Advanced Analytics</span></li>
              <li className="flex items-center gap-3 text-slate-300 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /><span>Remove HamroLink branding</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  const renderFaq = () => (
    <section className="w-full py-20 md:py-28 border-b border-slate-900 relative bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Common questions from business owners in {cityName}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
            Resolve localized queries regarding business setup, digital domains, and regional payment pipelines.
          </p>
        </div>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );

  // --- BUILD THE PAGE BASED ON INDUSTRY TO BREAK DOM DUPLICATION ---
  let PageContent;

  switch (industry) {
    case 'school':
      PageContent = (
        <>
          {renderHero('standard')}
          {renderPaymentLogos()}
          {renderOperationalMatrix()}
          {renderNarrative('grid')}
          {renderTemplates()}
          {renderPricing()}
          {renderFaq()}
        </>
      );
      break;
    case 'ecommerce':
      PageContent = (
        <>
          {renderHero('centered')}
          {renderTemplates()}
          {renderPaymentLogos()}
          {renderMarketInsights('grid')}
          {renderNarrative('stacked')}
          {renderPricing()}
          {renderFaq()}
        </>
      );
      break;
    case 'consultancy':
      PageContent = (
        <>
          {renderHero('reversed')}
          {renderNarrative('grid')}
          {renderMarketInsights('cards')}
          {renderTemplates()}
          {renderOperationalMatrix()}
          {renderFaq()}
          {renderPricing()}
        </>
      );
      break;
    default:
      // Club, Restaurant, and other defaults
      PageContent = (
        <>
          {renderHero('standard')}
          {renderMarketInsights('grid')}
          {renderTemplates()}
          {renderNarrative('grid')}
          {renderPaymentLogos()}
          {renderFaq()}
        </>
      );
      break;
  }

  return (
    <ThemeWrapper>
      {/* JSON-LD placed as direct child of ThemeWrapper — outside all layout divs so it renders
          as an unobstructed <script> tag in <body>. Google officially supports JSON-LD in <body>.
          See: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">

      <Navbar lang={lang} accent="#6366f1" nav={nav} />

      {PageContent}

      {/* ─── Final High-Impact CTA Section ─── */}
      <section className="w-full py-20 md:py-32 border-b border-slate-900 relative overflow-hidden bg-gradient-to-t from-slate-950 via-slate-900 to-indigo-950/20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-25" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-[30%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold mb-6">
            <Rocket className="w-3.5 h-3.5" />
            <span>Launch Your Local Presence Today</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.15]">
            Build Your {capitalizedIndustry} Website in{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              {cityName}
            </span>{" "}
            Today.
          </h2>

          <p className="text-slate-350 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Tailored digital infrastructure made specifically for local enterprises. Launch your AI chatbot, list notices, and map custom domains in under 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="https://app.hamrolink.com/signup"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm transition-all hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/templates`}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-2xl font-black text-sm transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              Browse 88+ Designs
            </Link>
          </div>

          <p className="text-slate-550 text-xs font-semibold mt-6 text-slate-500">
            No technical skills or credit card required.
          </p>
        </div>
      </section>

      {/* ─── Contextual Footer Regional Interlinking ─── */}
      <footer className="w-full pt-16 pb-12 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start mb-12">
            <div className="md:col-span-4 flex flex-col items-start gap-4">
              <Link href={`/${lang}`} className="inline-block transition-opacity hover:opacity-90 mb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/og-image.png" alt="HamroLink" className="h-9 w-auto" />
              </Link>
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-xs">
                Nepal&apos;s first AI-powered presence builder. Complete templates, built-in wallets, and automated CRM tools.
              </p>
            </div>

            <div className="md:col-span-8 flex flex-col items-start gap-4">
              <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                Explore {capitalizedIndustry} Website Solutions in {loc.province} Hubs
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {loc.nearby_hubs.map((hub) => (
                  <Link
                    key={hub}
                    href={`/${lang}/solutions/${industry}/${hub.toLowerCase()}`}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-xl text-slate-350 hover:text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.03]"
                  >
                    Create {capitalizedIndustry} Website in <span className="capitalize">{hub}</span> &rarr;
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-900 my-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs font-bold text-center sm:text-left">
              © 2026 HamroLink SaaS Platform. {dict.footer.address || "Pakhribas-04, Dhankuta, Koshi Province, Nepal"}
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-slate-500 hover:text-slate-400 text-xs font-bold transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-slate-500 hover:text-slate-400 text-xs font-bold transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      </div>
    </ThemeWrapper>
  );
}
