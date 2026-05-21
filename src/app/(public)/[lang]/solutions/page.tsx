import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShoppingCart, Briefcase, UtensilsCrossed, GraduationCap,
  Users, Building2, User, Heart, ArrowRight, Globe, Sparkles,
  MapPin, Zap, Bot, CheckCircle2, ChevronRight
} from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import { Location } from "@/models/Location";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/landing/Navbar";
import { JsonLdScript } from "@/components/JsonLdScript";

export const revalidate = 86400; // 24-hr ISR — city counts update when new locations are added

export async function generateStaticParams() {
  // Pre-build both en and ne variants.
  // /ne/solutions shows English content (effectiveLang fallback).
  // Canonical in metadata always points to /solutions (no prefix) so no duplicate indexing.
  return [{ lang: "en" }, { lang: "ne" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://hamrolink.com";
  const canonical = `${baseUrl}/solutions`;
  return {
    metadataBase: new URL(baseUrl),
    title: "Website Builder for Nepal Businesses — All Industries | HamroLink",
    description:
      "Create a professional website for your business in Nepal. HamroLink offers AI-powered website solutions for ecommerce, restaurants, schools, consultancies, clubs, and more. eSewa, Khalti & Fonepay payments built-in. No coding required.",
    alternates: { canonical },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
    openGraph: {
      title: "Professional Website Builder for Nepal Businesses | HamroLink Solutions",
      description: "AI-powered websites for every industry in Nepal. Local payments, free domain, AI chatbot. Launch in 5 minutes.",
      url: canonical,
      siteName: "HamroLink",
      type: "website",
      images: [{ url: "https://hamrolink.com/og-image.png", width: 1200, height: 630, alt: "HamroLink Solutions Hub" }],
    },
  };
}

const INDUSTRY_CONFIG = [
  { id: "ecommerce",    label: "E-Commerce",         Icon: ShoppingCart,    tagline: "Online stores with eSewa & Khalti built-in",               iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", border: "hover:border-emerald-500/40", shadow: "hover:shadow-emerald-500/5",  accent: "text-emerald-400", pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { id: "consultancy",  label: "Consultancy",         Icon: Briefcase,       tagline: "Professional presence for consulting firms",               iconBg: "bg-sky-500/10",     iconColor: "text-sky-400",     border: "hover:border-sky-500/40",     shadow: "hover:shadow-sky-500/5",     accent: "text-sky-400",     pill: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  { id: "restaurant",   label: "Restaurant",          Icon: UtensilsCrossed, tagline: "Digital menus, online orders & table bookings",           iconBg: "bg-amber-500/10",   iconColor: "text-amber-400",   border: "hover:border-amber-500/40",   shadow: "hover:shadow-amber-500/5",   accent: "text-amber-400",   pill: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { id: "school",       label: "School",              Icon: GraduationCap,   tagline: "Admission portals, notice boards & parent updates",       iconBg: "bg-violet-500/10",  iconColor: "text-violet-400",  border: "hover:border-violet-500/40",  shadow: "hover:shadow-violet-500/5",  accent: "text-violet-400",  pill: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { id: "club",         label: "Club / Organization", Icon: Users,           tagline: "Events, membership management & announcements",           iconBg: "bg-rose-500/10",    iconColor: "text-rose-400",    border: "hover:border-rose-500/40",    shadow: "hover:shadow-rose-500/5",    accent: "text-rose-400",    pill: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  { id: "business",     label: "Business",            Icon: Building2,       tagline: "Corporate websites with CRM & lead capture tools",        iconBg: "bg-indigo-500/10",  iconColor: "text-indigo-400",  border: "hover:border-indigo-500/40",  shadow: "hover:shadow-indigo-500/5",  accent: "text-indigo-400",  pill: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  { id: "portfolio",    label: "Portfolio",           Icon: User,            tagline: "Showcase your work and attract clients online",           iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400", border: "hover:border-fuchsia-500/40", shadow: "hover:shadow-fuchsia-500/5", accent: "text-fuchsia-400", pill: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20" },
  { id: "health",       label: "Health & Clinic",     Icon: Heart,           tagline: "Appointments, patient inquiries & trust-building pages",  iconBg: "bg-teal-500/10",    iconColor: "text-teal-400",    border: "hover:border-teal-500/40",    shadow: "hover:shadow-teal-500/5",    accent: "text-teal-400",    pill: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose Your Industry", desc: "Select from 8 industry-specific templates designed for Nepali business contexts — ecommerce, restaurants, schools, clinics, and more.", Icon: ChevronRight },
  { step: "02", title: "Pick Your City", desc: "Every page is localized with hyper-specific market insights, nearby hubs, and local landmarks for your exact city in Nepal.", Icon: MapPin },
  { step: "03", title: "Launch in 5 Minutes", desc: "Enter your business name, connect eSewa/Khalti payments, link your domain, and go live. No coding or technical skills needed.", Icon: Zap },
];

const FAQ_ITEMS = [
  { q: "What types of businesses can create websites with HamroLink?", a: "HamroLink supports 8 industry categories: e-commerce stores, consultancy firms, restaurants, schools, clubs and organizations, general businesses, personal portfolios, and health clinics. Each category has purpose-built templates and features." },
  { q: "Do I need to know how to code to build a website in Nepal?", a: "No coding skills are required. HamroLink's AI-powered website builder guides you through the entire setup — from choosing a template to connecting your custom domain and eSewa/Khalti payment gateways — in under 5 minutes." },
  { q: "Which Nepali payment gateways are supported?", a: "HamroLink natively integrates eSewa, Khalti, and Fonepay — Nepal's three most widely used digital payment platforms. You can start accepting payments immediately without any third-party setup or developer assistance." },
  { q: "Can I use my own domain name with HamroLink?", a: "Yes. You can connect any custom domain (e.g., yourbusiness.com) to your HamroLink website. We also offer a free .com.np Nepali domain for businesses that don't have a domain yet." },
  { q: "How is HamroLink different from Wix or Squarespace for Nepal businesses?", a: "Unlike global builders, HamroLink is built specifically for Nepal: local payment gateways (eSewa/Khalti) are pre-integrated, CDN delivery is optimized for Ncell and NTC networks, Nepali (.com.np) domain support is included, and every template includes industry-specific AI chatbot tools trained for Nepali customer queries." },
];

export default async function SolutionsHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const effectiveLang = lang === "ne" ? "en" : lang;
  const dict = await getDictionary(effectiveLang as any);
  const nav = dict.nav;

  // Fetch all locations to compute live city counts per industry
  await connectDB();
  const locations = await Location.find({}).select("industries_data city_name").lean() as any[];

  const cityCounts: Record<string, number> = {};
  let totalRoutes = 0;
  for (const loc of locations) {
    const industries = Object.keys(loc.industries_data || {});
    for (const ind of industries) {
      cityCounts[ind] = (cityCounts[ind] || 0) + 1;
      totalRoutes++;
    }
  }

  const totalCities = locations.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://hamrolink.com/solutions/#page",
        "name": "HamroLink Solutions — Website Builder for Nepal Businesses",
        "description": "AI-powered website solutions for all business types in Nepal. eSewa, Khalti & Fonepay built-in.",
        "url": "https://hamrolink.com/solutions",
        "provider": { "@type": "Organization", "name": "HamroLink", "url": "https://hamrolink.com" },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hamrolink.com" },
          { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://hamrolink.com/solutions" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <JsonLdScript data={jsonLd} />
      <Navbar lang={lang} accent="#6366f1" nav={nav} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <header className="relative w-full pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-30" />
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] rounded-full bg-indigo-500/8 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nepal&apos;s #1 AI Website Builder</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-5xl mx-auto">
            Build Your Business Website{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              in Nepal
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            AI-powered, locally optimized websites for every industry. Built-in eSewa, Khalti & Fonepay.
            Free .com.np domain. No coding required.
          </p>

          {/* Live Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12">
            {[
              { value: `${totalRoutes}+`, label: "Live Landing Pages" },
              { value: `${totalCities}+`, label: "Cities Covered" },
              { value: "8", label: "Industries Supported" },
              { value: "5 min", label: "Launch Time" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-black text-white">{stat.value}</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.hamrolink.com/signup"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02] flex items-center gap-2 text-sm"
            >
              Create Your Website Free <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#industries" className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-black rounded-2xl transition-all text-sm">
              Browse Industries ↓
            </a>
          </div>
        </div>
      </header>

      {/* ── INDUSTRY CARDS GRID ───────────────────────────────────── */}
      <section id="industries" className="w-full py-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full text-slate-400 text-xs font-black uppercase tracking-widest mb-6">
              <Globe className="w-3.5 h-3.5" /> 8 Industry Solutions
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Choose Your Industry
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Every template is pre-configured with industry-specific features, Nepali payment gateways, and AI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRY_CONFIG.map(({ id, label, Icon, tagline, iconBg, iconColor, border, shadow, pill }) => {
              const count = cityCounts[id] || 0;
              return (
                <Link
                  key={id}
                  href={`/${lang}/solutions/${id}`}
                  className={`group relative flex flex-col gap-4 p-6 bg-slate-950 border border-slate-800/80 ${border} rounded-3xl transition-all duration-300 hover:shadow-xl ${shadow} hover:-translate-y-0.5`}
                >
                  <div className={`w-12 h-12 ${iconBg} border border-white/5 rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>

                  <div>
                    <h3 className="font-black text-white text-base mb-1 group-hover:text-slate-100 transition-colors">{label}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{tagline}</p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800/60">
                    {count > 0 ? (
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${pill}`}>
                        {count} {count === 1 ? "city" : "cities"}
                      </span>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-slate-800/40 text-slate-600 border-slate-800">
                        Coming Soon
                      </span>
                    )}
                    <span className={`${iconColor} opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0`}>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="w-full py-24 border-b border-slate-900 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Launch in 3 Simple Steps
            </h2>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">No developer. No agency. No waiting weeks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="relative flex flex-col gap-5 p-8 bg-slate-950 border border-slate-800/80 rounded-3xl">
                <div className="text-6xl font-black text-slate-800/60 leading-none select-none">{step}</div>
                <div>
                  <h3 className="text-white font-black text-lg mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <section className="w-full py-16 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { Icon: Zap, title: "5-Minute Setup", desc: "From signup to live website — no developer or designer needed." },
              { Icon: Bot, title: "24/7 AI Chatbot", desc: "Built-in AI assistant answers customer queries in your local language." },
              { Icon: CheckCircle2, title: "eSewa & Khalti Built-In", desc: "Accept digital payments from day one — no third-party integration." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-6 bg-slate-950 border border-slate-800/80 rounded-2xl">
                <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="font-black text-white text-sm mb-1">{title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed font-medium">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="w-full py-24 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Common Questions About Building a Website in Nepal
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group border border-slate-800/80 rounded-2xl bg-slate-950 open:border-indigo-500/30">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-white text-sm sm:text-base">
                  <span>{item.q}</span>
                  <span className="ml-4 shrink-0 w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 group-open:border-indigo-500/40 group-open:text-indigo-400 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 group-open:rotate-90 transition-transform" />
                  </span>
                </summary>
                <p className="px-6 pb-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/40 font-medium">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="w-full py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[60%] h-[60%] rounded-full bg-indigo-500/6 blur-[120px]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Start Building Your Website Today
          </h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
            Choose your industry above, pick your city, and launch in 5 minutes.
            No credit card required.
          </p>
          <Link
            href="https://app.hamrolink.com/signup"
            className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all hover:scale-[1.02] text-sm"
          >
            Create Your Free Website <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="w-full py-10 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href={`/${lang}`}>
            <img src="/logo.png" alt="HamroLink — AI Website Builder Nepal" className="h-8 w-auto" />
          </Link>
          <p className="text-slate-600 text-xs font-bold">© 2026 HamroLink. Pakhribas-04, Dhankuta, Koshi Province, Nepal.</p>
          <div className="flex gap-5">
            <Link href="/terms" className="text-slate-600 hover:text-slate-400 text-xs font-bold transition-colors">Terms</Link>
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 text-xs font-bold transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
