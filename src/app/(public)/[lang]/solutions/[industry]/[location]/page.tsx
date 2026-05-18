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
import { FaqAccordion, FAQItem } from "@/components/solutions/FaqAccordion";
import { Navbar } from "@/components/landing/Navbar";
import { getDictionary } from "@/lib/dictionaries";

// --- Next.js 16 App Router Configuration ---
export const revalidate = 604800; // Cache pages for 1 week (Incremental Static Regeneration)
export const dynamicParams = true; // Generate pages on demand if slug is not pre-compiled

type Params = Promise<{ lang: string; industry: string; location: string }>;

interface PageProps {
  params: Params;
}

// --- Dynamic Metadata & Schema Generator ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry, location } = await params;
  
  await connectDB();
  const loc = await Location.findOne({ slug: location.toLowerCase().trim() });
  
  if (!loc || !loc.industries_data?.[industry]) {
    return {};
  }

  const industryData = loc.industries_data[industry];
  const cityName = loc.city_name;
  const capitalizedIndustry = industry.charAt(0).toUpperCase() + industry.slice(1);
  
  const title = `AI-Powered ${capitalizedIndustry} Website Builder in ${cityName} | HamroLink`;
  const description = `${industryData.localized_schema_subtext}. Setup instantly in ${cityName} with localized digital payments (eSewa/Khalti) and advanced AI assistant tools.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hamrolink.com/solutions/${industry}/${location}`,
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
  const dict = await getDictionary(lang as any);
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

  // 2. Fetch Curated Category Templates from local templates.json
  const templates = getTemplatesByCategory(industry, 3);
  const mainTemplateId = templates[0]?.id || "light-ecommerce-about-page";

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

  // Determine localized URL paths
  const isNe = lang === "ne";
  const homePath = isNe ? "/ne" : "/";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* ─── Structured SEO Schema Injection ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Header Branding Navigation ─── */}
      <Navbar lang={lang} accent="#6366f1" nav={nav} />

      {/* ─── Hero Section ─── */}
      <header className="relative w-full pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        {/* Visual Grids & Light Ray Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full text-indigo-400 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>AI-Powered Websites for Nepal</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
                Launch Your {capitalizedIndustry} Store in{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                  {cityName}
                </span>{" "}
                Today.
              </h1>
              
              <p className="text-slate-350 text-base sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed mb-8">
                Build a professional, fast, and local payment-connected online hub. Specially tailored to serve{" "}
                <span className="text-white font-semibold">{loc.primary_client_demographic}</span> within the{" "}
                <span className="text-indigo-400 font-semibold">{loc.regional_education_hub || `${cityName} Business Hub`}</span>. No coding or prior technical skills needed.
              </p>

              {/* Dynamic Interactive lead form */}
              <HeroForm 
                templateId={mainTemplateId} 
                placeholderText="Enter your business name..."
                buttonText="Create Website" 
              />

              <p className="text-slate-500 text-xs font-semibold mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> No credit card required
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> 5-Minute Setup
              </p>
            </div>

            {/* Right Interactive Mockup Column */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-[300px] h-[600px] bg-slate-950 rounded-[48px] p-3.5 border-4 border-slate-800 shadow-2xl shadow-indigo-500/10 ring-1 ring-slate-800/50 flex flex-col overflow-hidden group">
                
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
                  <div className="w-10 h-1.5 bg-slate-850 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-slate-850 rounded-full" />
                </div>
                
                {/* Mobile Preview Interface */}
                <div className="flex-1 bg-slate-900 rounded-[36px] overflow-y-auto overflow-x-hidden flex flex-col relative z-10 scrollbar-none">
                  
                  {/* Mock Navbar */}
                  <div className="w-full py-4 px-5 bg-slate-950/80 border-b border-slate-850 flex items-center justify-between sticky top-0 z-30">
                    <span className="text-xs font-bold text-white tracking-wider">E-store</span>
                    <span className="w-6 h-6 rounded-full bg-indigo-600/15 flex items-center justify-center">
                      <ShoppingCart className="w-3.5 h-3.5 text-indigo-400" />
                    </span>
                  </div>

                  {/* Mock Hero Product Card */}
                  <div className="p-4 flex flex-col gap-4">
                    <div className="w-full aspect-[4/5] bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-850">
                      {templates[0] ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={templates[0].thumbnail} 
                          alt="Product mockup" 
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-slate-950 to-indigo-950 flex items-center justify-center text-slate-500">
                          Template Mockup
                        </div>
                      )}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-indigo-600 text-[10px] font-black text-white uppercase rounded-md shadow-md">
                        Featured Design
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                        {industryData.localized_schema_subtext}
                      </span>
                      <h4 className="text-base font-black text-white leading-tight">
                        {templates[0]?.name || "Reshma Boutique"}
                      </h4>
                      <p className="text-slate-440 text-xs font-medium line-clamp-2 text-slate-350">
                        Tailored setup with built-in instant local payment gateways and zero coding setup.
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-white font-extrabold text-sm">NPR 1,500</span>
                        <span className="px-3.5 py-1.5 bg-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider rounded-lg shadow-md shadow-indigo-600/10">
                          Pay Now
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Mobile Footer */}
                  <div className="mt-auto bg-slate-950 border-t border-slate-850 p-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">© 2026 {cityName} Shop</span>
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                  </div>

                </div>
              </div>

              {/* Glowing decorative badges floated around mobile */}
              <div className="hidden sm:flex absolute -left-10 top-12 p-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl items-center gap-3 shadow-2xl shadow-indigo-950/30 hover:scale-105 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Payments</span>
                  <span className="text-white text-xs font-black">eSewa Setup Live</span>
                </div>
              </div>

              <div className="hidden sm:flex absolute -right-6 bottom-16 p-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl items-center gap-3 shadow-2xl shadow-indigo-950/30 hover:scale-105 transition-all">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Globe className="w-4.5 h-4.5 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Domain Connection</span>
                  <span className="text-white text-xs font-black">Free .com.np Setup</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* ─── Local Payment Integration Bar ─── */}
      <section className="w-full py-8 border-b border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
            Accept Nepal&apos;s favorite payments instantly
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
            {/* eSewa Logo */}
            <div className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <span className="w-6 h-6 rounded bg-[#60BB46] flex items-center justify-center text-white text-[10px] font-black">e</span>
              <span className="text-white text-sm font-black tracking-tight">eSewa</span>
            </div>
            {/* Khalti Logo */}
            <div className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <span className="w-6 h-6 rounded bg-[#5C2D91] flex items-center justify-center text-white text-[10px] font-black">K</span>
              <span className="text-white text-sm font-black tracking-tight">khalti</span>
            </div>
            {/* Fonepay Logo */}
            <div className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <span className="w-6 h-6 rounded bg-[#ED1C24] flex items-center justify-center text-white text-[10px] font-black">f</span>
              <span className="text-white text-sm font-black tracking-tight">fonepay</span>
            </div>
            {/* ConnectIPS Logo */}
            <div className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <span className="w-6 h-6 rounded bg-[#0054A6] flex items-center justify-center text-white text-[10px] font-black">c</span>
              <span className="text-white text-sm font-black tracking-tight">connectIPS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Market Intelligence Dashboard ─── */}
      <section className="w-full py-20 md:py-28 border-b border-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_60%,#4338ca/0.05,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold mb-4">
              <LineChart className="w-3.5 h-3.5" />
              <span>Hyper-Local Market Insights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Dynamic Market Dashboard for {cityName}
            </h2>
            <p className="text-slate-450 text-base sm:text-lg font-medium leading-relaxed text-slate-350">
              We compile regional indicators and local growth patterns to build digital features that deliver maximum impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Local Insights */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:border-slate-700/80 transition-all duration-300 group">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                </span>
                <h3 className="text-xl font-black text-white mb-4">Regional Market Discovery</h3>
                <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                  {industryData.market_insight}
                </p>
              </div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-6 block">
                Local Discovery Metric
              </span>
            </div>

            {/* Card 2: Growth Statistics */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-indigo-950/20 hover:border-indigo-500/50 transition-all duration-300 group">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <LineChart className="w-6 h-6 text-violet-400" />
                </span>
                <h3 className="text-xl font-black text-white mb-4">Hyper-Local Growth</h3>
                <div className="bg-indigo-600/15 border border-indigo-500/20 rounded-2xl p-4 my-4">
                  <span className="text-2xl sm:text-3xl font-black text-indigo-400 leading-tight block">
                    {industryData.growth_metric.split(" ")[0]}
                  </span>
                  <span className="text-slate-350 text-[11px] font-bold block mt-1">
                    {industryData.growth_metric.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest mt-6 block">
                Verified Local Metric
              </span>
            </div>

            {/* Card 3: Prominent local demand */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:border-slate-700/80 transition-all duration-300 group">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </span>
                <h3 className="text-xl font-black text-white mb-4">Prominent Local Demand</h3>
                <ul className="space-y-3 mt-4">
                  {industryData.prominent_local_demand.split(",").map((demand, di) => (
                    <li key={di} className="flex gap-2.5 items-start text-slate-350 text-sm sm:text-base leading-relaxed">
                      <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{demand.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-6 block">
                Trending Services
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Curated Template Grid Showcase ─── */}
      <section className="w-full py-20 md:py-28 border-b border-slate-900 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold mb-4">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Premium Pre-Designed Templates</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Tailored {capitalizedIndustry} Designs for {cityName}
            </h2>
            <p className="text-slate-450 text-base sm:text-lg font-medium leading-relaxed text-slate-350">
              Fully customizable layouts optimized for blazing-fast local loading speeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-lg hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/10 hover:scale-[1.01] transition-all duration-300 group flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-950 border-b border-slate-850 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-900/90 text-[10px] font-black text-indigo-400 uppercase rounded-md shadow-md border border-slate-850">
                      {template.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2 leading-snug group-hover:text-indigo-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                      {template.description || "A gorgeous ready-to-launch website layout tailored for local discovery, optimized for payments and super-fast load speeds."}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href="https://app.hamrolink.com"
                      className="flex-1 text-center py-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`https://app.hamrolink.com/signup?template=${template.id}`}
                      className="flex-1 text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02]"
                    >
                      Use This
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Operational Matrix Banner ─── */}
      <section className="w-full py-20 md:py-28 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/5 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-14 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                  <HelpCircle className="w-5 h-5 text-violet-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                  Overcoming the Hurdles of {cityName} Businesses
                </h2>
                <p className="text-slate-350 text-sm sm:text-base leading-relaxed text-slate-350">
                  Local setups are often bogged down by physical processes and administrative friction. Here is how HamroLink completely revolutionizes your operational workflow.
                </p>
              </div>

              {/* Juxtaposition Matrix Cards Column */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                
                {/* Hurdle Column */}
                <div className="p-6 bg-slate-950/80 border border-red-500/20 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase rounded-md tracking-wider">
                      The Operational Hurdle
                    </span>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-bold mt-6 mb-4">
                      &quot;{industryData.common_operational_hurdle}&quot;
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-4">
                    Bottleneck Identified
                  </span>
                </div>

                {/* Resolution Column */}
                <div className="p-6 bg-slate-950/80 border border-emerald-500/20 rounded-2xl flex flex-col justify-between shadow-lg shadow-emerald-950/5">
                  <div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase rounded-md tracking-wider">
                      HamroLink Automation
                    </span>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-bold mt-6 mb-4">
                      {industryData.trust_proof_point}
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-4">
                    Automated Workflow
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Sleek Pricing Cards Section ─── */}
      <section className="w-full py-20 md:py-28 border-b border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Simple, Transparent Pricing</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Tailored Plans for Every Growth Stage
            </h2>
            <p className="text-slate-450 text-base sm:text-lg font-medium leading-relaxed text-slate-350">
              No setup fees, no long-term commitments. Upgrade or downgrade anytime from your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Starter Plan */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
                  <Rocket className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-black text-white mb-2">Starter</h3>
                <p className="text-slate-450 text-xs font-semibold h-10 text-slate-400">
                  Ideal for testing features and creating custom mockups.
                </p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-black text-white">NPR 0</span>
                  <span className="text-slate-400 text-xs font-bold"> / month</span>
                </div>
                <div className="w-full h-px bg-slate-850 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-slate-550 shrink-0 text-slate-400 animate-none" />
                    <span>1 Website Layout</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-slate-550 shrink-0 text-slate-400" />
                    <span>HamroLink Subdomain</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-slate-550 shrink-0 text-slate-400" />
                    <span>5 Pages Max per site</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-slate-550 shrink-0 text-slate-400" />
                    <span>Basic Hosting</span>
                  </li>
                </ul>
              </div>
              <Link
                href="https://app.hamrolink.com"
                className="w-full text-center py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all mt-8"
              >
                Get Started
              </Link>
            </div>

            {/* Local Start Plan - HIGHLIGHTED */}
            <div className="bg-slate-900 border-2 border-indigo-500 rounded-[32px] p-8 flex flex-col justify-between shadow-2xl shadow-indigo-950/20 relative scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
              <div>
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mb-6">
                  <Zap className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-black text-white mb-2">Local Start</h3>
                <p className="text-slate-350 text-xs font-semibold h-10">
                  Perfect setup for local shops, boutiques, and emerging startups.
                </p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-black text-white">NPR 199</span>
                  <span className="text-slate-350 text-xs font-bold"> / month</span>
                </div>
                <div className="w-full h-px bg-slate-800 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>20 Pages Max per site</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Custom Domain Supported</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>1 E-commerce Store Layout</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>30 Products Maximum</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>eSewa & Khalti Setup</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>24/7 AI Chatbot Assistant</span>
                  </li>
                </ul>
              </div>
              <Link
                href="https://app.hamrolink.com/signup"
                className="w-full text-center py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all mt-8"
              >
                Launch Your Shop
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </span>
                <h3 className="text-xl font-black text-white mb-2">Business</h3>
                <p className="text-slate-450 text-xs font-semibold h-10 text-slate-400">
                  Full agency capability with maximum quotas and advanced CRM tools.
                </p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-black text-white">NPR 399</span>
                  <span className="text-slate-400 text-xs font-bold"> / month</span>
                </div>
                <div className="w-full h-px bg-slate-855 my-6 bg-slate-800" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>40 Pages Max per site</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>80 Products Maximum</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Remove HamroLink branding</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Priority Support Response</span>
                  </li>
                </ul>
              </div>
              <Link
                href="https://app.hamrolink.com/signup"
                className="w-full text-center py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all mt-8"
              >
                Go Pro Today
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Local FAQ Accordion Section ─── */}
      <section className="w-full py-20 md:py-28 border-b border-slate-900 relative bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              FAQ regarding {cityName} website creation
            </h2>
            <p className="text-slate-450 text-base sm:text-lg font-medium leading-relaxed text-slate-350">
              Resolve localized queries regarding business setup, digital domains, and regional payment pipelines.
            </p>
          </div>

          <FaqAccordion items={faqItems} />

        </div>
      </section>

      {/* ─── Contextual Footer Regional Interlinking ─── */}
      <footer className="w-full pt-16 pb-12 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start mb-12">
            
            {/* Column 1: Branding */}
            <div className="md:col-span-4 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-sm">
                  <Zap className="w-4.5 h-4.5" />
                </span>
                <span className="text-lg font-black text-white">HamroLink</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-xs">
                Nepal&apos;s first AI-powered presence builder. Complete templates, built-in wallets, and automated CRM tools.
              </p>
            </div>

            {/* Column 2: Regional SEO Interlinks - VERY IMPORTANT */}
            <div className="md:col-span-8 flex flex-col items-start gap-4">
              <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                Explore {capitalizedIndustry} Website Solutions in {loc.province} Hubs
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {loc.nearby_hubs.map((hub) => (
                  <Link
                    key={hub}
                    href={`/solutions/${industry}/${hub.toLowerCase()}`}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-xl text-slate-350 hover:text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.03]"
                  >
                    Create {capitalizedIndustry} Website in <span className="capitalize">{hub}</span> &rarr;
                  </Link>
                ))}
              </div>
            </div>

          </div>

          <div className="w-full h-px bg-slate-900 my-8" />

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-550 text-xs font-bold text-center sm:text-left text-slate-400">
              © 2026 HamroLink SaaS Platform. Lalitpur, Nepal.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-slate-500 hover:text-slate-450 text-xs font-bold transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-slate-500 hover:text-slate-450 text-xs font-bold transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
