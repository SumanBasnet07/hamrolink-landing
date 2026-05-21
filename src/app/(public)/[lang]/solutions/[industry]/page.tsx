import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ShoppingCart, Briefcase, UtensilsCrossed, GraduationCap,
  Users, Building2, User, Heart, ArrowRight, MapPin, ChevronRight,
  Zap, Bot, CreditCard, Globe, Sparkles
} from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import { Location } from "@/models/Location";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/landing/Navbar";

export const revalidate = 86400;
export const dynamicParams = true; // Allow /ne/ variants on demand — content falls back to English

export async function generateStaticParams() {
  // Pre-build both en and ne for all 8 industries at deploy time.
  // /ne/solutions/[industry] shows English content (effectiveLang fallback) but
  // canonical in metadata always points to the no-prefix URL, so no duplicate indexing.
  const langs = ["en", "ne"];
  const industries = ["ecommerce", "consultancy", "restaurant", "school", "club", "business", "portfolio", "health"];
  return langs.flatMap((lang) => industries.map((industry) => ({ lang, industry })));
}

// ─── Per-Industry Configuration ──────────────────────────────────────────────
const INDUSTRY_CONFIG: Record<string, {
  label: string; pluralLabel: string; icon: React.ElementType;
  h1: string; subtitle: string;
  heroBg: string; accent1: string; accent2: string; textGradient: string;
  iconBg: string; iconColor: string;
  pillBg: string; pillText: string; pillBorder: string;
  cardBorder: string; cardAccent: string;
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  keywords: string; metaDesc: string;
}> = {
  ecommerce: {
    label: "E-Commerce", pluralLabel: "E-Commerce Stores",
    icon: ShoppingCart,
    h1: "Create an E-Commerce Website for Any City in Nepal",
    subtitle: "Launch your online store with eSewa, Khalti & Fonepay built-in. Product catalogs, digital cart, automated order receipts — all ready in under 5 minutes.",
    heroBg: "from-slate-950 via-slate-900 to-emerald-950/40",
    accent1: "bg-emerald-500/8", accent2: "bg-teal-500/6",
    textGradient: "from-emerald-400 via-teal-300 to-emerald-400",
    iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400",
    pillBg: "bg-emerald-500/10", pillText: "text-emerald-400", pillBorder: "border-emerald-500/20",
    cardBorder: "hover:border-emerald-500/30", cardAccent: "text-emerald-400",
    keywords: "ecommerce website Nepal, create online store Nepal, online shop Nepal, ecommerce website builder Nepal",
    metaDesc: "Create a professional ecommerce website for your business in Nepal. Built-in eSewa, Khalti & Fonepay payments, product catalogs, and AI chatbot. Launch in 5 minutes. No coding required.",
    features: [
      { title: "eSewa, Khalti & Fonepay Built-In", desc: "Accept Nepal's three major digital wallets instantly — no third-party integration or developer needed." },
      { title: "Product Catalog & Digital Cart", desc: "List unlimited products with images, variants, and prices. Customers add to cart and checkout in seconds." },
      { title: "Automated Order Management", desc: "Auto-generate order receipts, send WhatsApp confirmations, and track delivery status from your dashboard." },
    ],
    faqs: [
      { q: "How do I create an ecommerce website in Nepal?", a: "Sign up on HamroLink, choose an ecommerce template, add your products, connect eSewa or Khalti, and your store is live — all in under 5 minutes. No coding or technical skills required." },
      { q: "How much does an ecommerce website cost in Nepal?", a: "HamroLink's ecommerce plan starts at NPR 199/month. This includes a custom domain, eSewa/Khalti integration, unlimited product listings, and the AI chatbot. A free plan is also available to get started." },
      { q: "Can I accept eSewa payments on my online store?", a: "Yes — eSewa, Khalti, and Fonepay are natively integrated into every HamroLink ecommerce website. No developer setup required. Payments go directly to your registered merchant wallet." },
      { q: "Can I run an online store without a business registration in Nepal?", a: "Yes. You can launch your HamroLink ecommerce store as an individual seller without formal business registration. Simply connect your eSewa/Khalti personal account and start selling." },
    ],
  },
  consultancy: {
    label: "Consultancy", pluralLabel: "Consultancy Firms",
    icon: Briefcase,
    h1: "Build a Professional Consultancy Website in Any City in Nepal",
    subtitle: "Establish credibility online. Showcase your expertise, capture client leads, and book appointments — all from a professionally designed consultancy website.",
    heroBg: "from-slate-950 via-slate-900 to-sky-950/50",
    accent1: "bg-sky-500/8", accent2: "bg-blue-500/6",
    textGradient: "from-sky-400 via-blue-300 to-sky-400",
    iconBg: "bg-sky-500/10", iconColor: "text-sky-400",
    pillBg: "bg-sky-500/10", pillText: "text-sky-400", pillBorder: "border-sky-500/20",
    cardBorder: "hover:border-sky-500/30", cardAccent: "text-sky-400",
    keywords: "consultancy website Nepal, professional website Nepal, consulting firm website Nepal, business consulting website Nepal",
    metaDesc: "Create a professional consultancy website in Nepal. Showcase services, capture client leads, and book appointments. AI chatbot, eSewa/Khalti payments, custom domain. No coding required.",
    features: [
      { title: "Service Showcase & Lead Capture", desc: "Present your consulting services professionally and collect client inquiry forms that go straight to your CRM." },
      { title: "Appointment Booking System", desc: "Let clients schedule consultations directly from your website — no back-and-forth WhatsApp messages." },
      { title: "Trust-Building Testimonials", desc: "Display client testimonials, case studies, and credentials to build credibility with prospective clients." },
    ],
    faqs: [
      { q: "How do I create a consultancy website in Nepal?", a: "With HamroLink, choose a consultancy template, add your services and credentials, and go live in 5 minutes. The AI chatbot handles initial client inquiries automatically." },
      { q: "What should a consultancy website in Nepal include?", a: "A professional consultancy website should include a services overview, about/credentials section, client inquiry form, testimonials, and contact details. HamroLink's templates include all of these by default." },
      { q: "Can clients book appointments through my website?", a: "Yes. HamroLink includes an appointment booking system for consultancy websites. Clients can select available slots and you receive automatic notifications." },
      { q: "How much does a professional consultancy website cost in Nepal?", a: "HamroLink plans start at NPR 199/month, including custom domain, AI chatbot, and lead capture forms. A free plan is available for getting started." },
    ],
  },
  restaurant: {
    label: "Restaurant", pluralLabel: "Restaurants & Cafés",
    icon: UtensilsCrossed,
    h1: "Create a Restaurant Website for Any City in Nepal",
    subtitle: "Digital menus, online orders, table bookings, and eSewa payments. Give your restaurant the online presence it deserves — and never miss a customer again.",
    heroBg: "from-slate-950 via-slate-900 to-amber-950/40",
    accent1: "bg-amber-500/8", accent2: "bg-orange-500/6",
    textGradient: "from-amber-400 via-orange-300 to-amber-400",
    iconBg: "bg-amber-500/10", iconColor: "text-amber-400",
    pillBg: "bg-amber-500/10", pillText: "text-amber-400", pillBorder: "border-amber-500/20",
    cardBorder: "hover:border-amber-500/30", cardAccent: "text-amber-400",
    keywords: "restaurant website Nepal, online food order Nepal, digital menu Nepal, restaurant website builder Nepal",
    metaDesc: "Create a restaurant website in Nepal with digital menus, online ordering, and eSewa/Khalti payments. Table booking, AI chatbot, custom domain. Launch in 5 minutes.",
    features: [
      { title: "Digital Menu & Online Ordering", desc: "List your full menu with photos, prices, and categories. Customers order directly from your website — no commission to third-party apps." },
      { title: "Table Booking System", desc: "Let customers reserve tables in advance with automated confirmation messages and booking management." },
      { title: "eSewa & Khalti Checkout", desc: "Accept digital payments for orders instantly. No cash-handling delays — payments go directly to your restaurant's account." },
    ],
    faqs: [
      { q: "How do I create a restaurant website in Nepal?", a: "Choose a HamroLink restaurant template, upload your menu, connect eSewa/Khalti, and your website is live in 5 minutes. The AI chatbot handles reservation and order inquiries 24/7." },
      { q: "Can customers order food online through my restaurant website?", a: "Yes. HamroLink restaurant websites include a built-in online ordering system with eSewa and Khalti payment integration. No commission fees — all revenue goes directly to you." },
      { q: "How much does a restaurant website cost in Nepal?", a: "Plans start at NPR 199/month including digital menu, online ordering, AI chatbot, and custom domain. Start free and upgrade as your restaurant grows." },
      { q: "Can I accept eSewa payments for food delivery orders?", a: "Yes — eSewa, Khalti, and Fonepay are integrated into HamroLink restaurant websites. Customers pay at checkout and you receive instant payment confirmation." },
    ],
  },
  school: {
    label: "School", pluralLabel: "Schools & Colleges",
    icon: GraduationCap,
    h1: "Create a School Website for Any City in Nepal",
    subtitle: "Digital admission portals, parent notice boards, school event calendars, and staff directories — everything a modern Nepali school website needs, built in minutes.",
    heroBg: "from-slate-950 via-slate-900 to-violet-950/40",
    accent1: "bg-violet-500/8", accent2: "bg-purple-500/6",
    textGradient: "from-violet-400 via-purple-300 to-violet-400",
    iconBg: "bg-violet-500/10", iconColor: "text-violet-400",
    pillBg: "bg-violet-500/10", pillText: "text-violet-400", pillBorder: "border-violet-500/20",
    cardBorder: "hover:border-violet-500/30", cardAccent: "text-violet-400",
    keywords: "school website Nepal, school website builder Nepal, college website Nepal, admission portal Nepal",
    metaDesc: "Create a professional school website in Nepal with digital admission forms, notice boards, event calendars, and parent notifications. No coding required. Launch in 5 minutes.",
    features: [
      { title: "Online Admission & Inquiry Forms", desc: "Accept student applications digitally. Auto-organize inquiries and send confirmation emails to applicants automatically." },
      { title: "Digital Notice Board", desc: "Publish notices, exam schedules, and announcements instantly. Parents receive updates without needing WhatsApp groups." },
      { title: "School Calendar & Events", desc: "Display academic calendars, cultural events, and parent-teacher meetings — always up to date with one-click edits." },
    ],
    faqs: [
      { q: "How do I create a school website in Nepal?", a: "With HamroLink, choose a school template, add your school's details, upload your logo, and your website is live in 5 minutes. Parents can find notices, events, and admission information online immediately." },
      { q: "Can parents submit admission forms online through the school website?", a: "Yes. HamroLink school websites include a digital admission inquiry form. Submissions are organized automatically in your dashboard and applicants receive instant confirmation." },
      { q: "How much does a school website cost in Nepal?", a: "School websites on HamroLink start at NPR 199/month, including a digital notice board, admission forms, event calendar, and custom domain. A free plan is available." },
      { q: "Can I post school notices and updates on my website?", a: "Yes — HamroLink includes a built-in digital notice board where you can publish notices, exam results, and announcements that parents and students can access anytime from their phones." },
    ],
  },
  club: {
    label: "Club / Organization", pluralLabel: "Clubs & Organizations",
    icon: Users,
    h1: "Create a Club or Organization Website in Any City in Nepal",
    subtitle: "Event pages, membership management, announcements, and photo galleries — everything your club or community organization needs to build an online presence.",
    heroBg: "from-slate-950 via-slate-900 to-rose-950/40",
    accent1: "bg-rose-500/8", accent2: "bg-pink-500/6",
    textGradient: "from-rose-400 via-pink-300 to-rose-400",
    iconBg: "bg-rose-500/10", iconColor: "text-rose-400",
    pillBg: "bg-rose-500/10", pillText: "text-rose-400", pillBorder: "border-rose-500/20",
    cardBorder: "hover:border-rose-500/30", cardAccent: "text-rose-400",
    keywords: "club website Nepal, organization website Nepal, NGO website Nepal, community website Nepal",
    metaDesc: "Create a club or organization website in Nepal. Event pages, membership management, announcements, and photo galleries. eSewa/Khalti donations and registration. No coding required.",
    features: [
      { title: "Event Pages & RSVP", desc: "Create event landing pages with RSVP forms, ticket information, and attendance tracking — all in one place." },
      { title: "Membership & Registration", desc: "Accept membership registrations and fees through eSewa or Khalti directly from your club website." },
      { title: "Announcements & Photo Gallery", desc: "Publish news, updates, and event photo galleries to keep members engaged and informed." },
    ],
    faqs: [
      { q: "How do I create a club website in Nepal?", a: "Choose a HamroLink club template, add your organization's details and events, and go live in 5 minutes. Accept membership fees via eSewa or Khalti directly from your website." },
      { q: "Can I accept membership fees online through my club website?", a: "Yes — HamroLink integrates eSewa, Khalti, and Fonepay for collecting membership fees, event registrations, and donations directly through your club website." },
      { q: "How much does a club or NGO website cost in Nepal?", a: "Club and organization websites start at NPR 199/month, including event management, online payments, and custom domain. A free plan is available to get started." },
      { q: "Can I post event announcements and photos on my website?", a: "Yes. HamroLink includes an announcement system and photo gallery feature so you can publish events, news, and photo albums that members can access at any time." },
    ],
  },
  business: {
    label: "Business", pluralLabel: "Businesses",
    icon: Building2,
    h1: "Build a Professional Business Website for Any City in Nepal",
    subtitle: "Corporate websites with lead capture forms, CRM integration, and AI chatbot tools. Establish your brand online and convert visitors into clients automatically.",
    heroBg: "from-slate-950 via-slate-900 to-indigo-950/50",
    accent1: "bg-indigo-500/8", accent2: "bg-slate-500/6",
    textGradient: "from-indigo-400 via-violet-300 to-indigo-400",
    iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400",
    pillBg: "bg-indigo-500/10", pillText: "text-indigo-400", pillBorder: "border-indigo-500/20",
    cardBorder: "hover:border-indigo-500/30", cardAccent: "text-indigo-400",
    keywords: "business website Nepal, professional website Nepal, company website Nepal, website for small business Nepal",
    metaDesc: "Create a professional business website in Nepal with lead capture, CRM tools, AI chatbot, and eSewa/Khalti payments. Custom domain and mobile-optimized. Launch in 5 minutes.",
    features: [
      { title: "Lead Capture & CRM", desc: "Collect contact form submissions and automatically organize leads in your dashboard with status tracking." },
      { title: "AI Chatbot Sales Assistant", desc: "Your website's AI chatbot qualifies leads and answers client questions 24/7 — even when you're offline." },
      { title: "Mobile-Optimized & Fast", desc: "Every HamroLink business website loads in under a second on Ncell and NTC networks — ensuring no bounce rate from slow pages." },
    ],
    faqs: [
      { q: "How do I create a business website in Nepal?", a: "Choose a HamroLink business template, add your company details and services, and launch in 5 minutes. Lead capture forms and the AI chatbot activate automatically." },
      { q: "What should a business website include in Nepal?", a: "A professional business website should include a services/products section, about page, contact form, testimonials, and a CTA. HamroLink templates include all of these with AI chatbot integration." },
      { q: "How much does a professional website for a small business cost in Nepal?", a: "Business websites on HamroLink start at NPR 199/month, including a custom domain, lead capture CRM, AI chatbot, and mobile-optimized design. A free plan is available." },
      { q: "Can my business website work without internet for customers with slow connections?", a: "Yes — HamroLink websites are served via globally distributed CDNs optimized for Ncell and NTC mobile networks in Nepal, ensuring fast load times even in areas with limited bandwidth." },
    ],
  },
  portfolio: {
    label: "Portfolio", pluralLabel: "Portfolios",
    icon: User,
    h1: "Create a Portfolio Website for Professionals in Any City in Nepal",
    subtitle: "Showcase your work, attract clients, and build your personal brand online. Designed for freelancers, designers, photographers, and creative professionals in Nepal.",
    heroBg: "from-slate-950 via-slate-900 to-fuchsia-950/40",
    accent1: "bg-fuchsia-500/8", accent2: "bg-violet-500/6",
    textGradient: "from-fuchsia-400 via-violet-300 to-fuchsia-400",
    iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400",
    pillBg: "bg-fuchsia-500/10", pillText: "text-fuchsia-400", pillBorder: "border-fuchsia-500/20",
    cardBorder: "hover:border-fuchsia-500/30", cardAccent: "text-fuchsia-400",
    keywords: "portfolio website Nepal, freelancer website Nepal, personal website Nepal, photographer website Nepal",
    metaDesc: "Create a professional portfolio website in Nepal. Showcase your work, attract clients, and accept payments via eSewa/Khalti. Perfect for freelancers, photographers, and designers.",
    features: [
      { title: "Work Gallery & Case Studies", desc: "Display your projects, photography, or design work in a visually stunning gallery that loads instantly on mobile." },
      { title: "Client Inquiry & Contact Forms", desc: "Capture leads from potential clients directly from your portfolio — all organized in your dashboard automatically." },
      { title: "Accept Payments for Services", desc: "Connect eSewa or Khalti so clients can pay for your services or project deposits directly from your portfolio website." },
    ],
    faqs: [
      { q: "How do I create a portfolio website in Nepal?", a: "With HamroLink, choose a portfolio template, upload your work samples and bio, and your website is live in 5 minutes. Clients can view your work and send inquiries directly." },
      { q: "Can I accept project payments through my portfolio website?", a: "Yes — eSewa, Khalti, and Fonepay are integrated into HamroLink portfolio websites. Clients can pay project deposits or service fees directly through your website." },
      { q: "How much does a portfolio website cost in Nepal?", a: "Portfolio websites on HamroLink start at NPR 199/month, including a work gallery, contact forms, custom domain, and AI chatbot. A free plan is also available." },
      { q: "What types of professionals use HamroLink portfolio websites in Nepal?", a: "HamroLink portfolio websites are used by photographers, graphic designers, web developers, writers, video editors, architects, and other freelancers and creative professionals across Nepal." },
    ],
  },
  health: {
    label: "Health & Clinic", pluralLabel: "Health Clinics",
    icon: Heart,
    h1: "Create a Health Clinic Website for Any City in Nepal",
    subtitle: "Online appointment booking, patient inquiry forms, doctor profiles, and service listings. Build trust with patients and reduce front-desk workload — automatically.",
    heroBg: "from-slate-950 via-slate-900 to-teal-950/40",
    accent1: "bg-teal-500/8", accent2: "bg-emerald-500/6",
    textGradient: "from-teal-400 via-emerald-300 to-teal-400",
    iconBg: "bg-teal-500/10", iconColor: "text-teal-400",
    pillBg: "bg-teal-500/10", pillText: "text-teal-400", pillBorder: "border-teal-500/20",
    cardBorder: "hover:border-teal-500/30", cardAccent: "text-teal-400",
    keywords: "clinic website Nepal, hospital website Nepal, doctor website Nepal, health website Nepal, appointment booking Nepal",
    metaDesc: "Create a health clinic website in Nepal with online appointment booking, patient inquiry forms, and doctor profiles. eSewa/Khalti payments. Professional and trustworthy design.",
    features: [
      { title: "Online Appointment Booking", desc: "Patients book appointments directly from your website. You receive instant notifications and can confirm or reschedule with one click." },
      { title: "Doctor Profiles & Services", desc: "Showcase your medical team's credentials, specializations, and consultation fees to build patient trust before they visit." },
      { title: "Patient Inquiry Management", desc: "All patient inquiries are collected and organized in your dashboard — reducing front desk phone calls significantly." },
    ],
    faqs: [
      { q: "How do I create a clinic website in Nepal?", a: "With HamroLink, choose a health clinic template, add your doctors and services, and your website is live in 5 minutes. Patients can book appointments and send inquiries immediately." },
      { q: "Can patients book appointments online through my clinic website?", a: "Yes. HamroLink health clinic websites include an appointment booking system. Patients select available slots and receive automatic confirmation. You get notified instantly." },
      { q: "How much does a clinic or hospital website cost in Nepal?", a: "Health clinic websites on HamroLink start at NPR 199/month including appointment booking, patient forms, doctor profiles, and a custom domain. A free plan is also available." },
      { q: "Can I accept consultation fees online through my clinic website?", a: "Yes — eSewa, Khalti, and Fonepay are integrated into HamroLink clinic websites. Patients can pay consultation fees or appointment deposits online before they visit." },
    ],
  },
};

type PageProps = { params: Promise<{ lang: string; industry: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry } = await params;
  const cfg = INDUSTRY_CONFIG[industry];
  if (!cfg) return { robots: { index: false, follow: false } };

  const baseUrl = "https://hamrolink.com";
  const canonical = `${baseUrl}/solutions/${industry}`;
  const capitalizedIndustry = cfg.label;

  return {
    metadataBase: new URL(baseUrl),
    title: `${capitalizedIndustry} Website Builder in Nepal — All Cities | HamroLink`,
    description: cfg.metaDesc,
    alternates: { canonical },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
    openGraph: {
      title: `${capitalizedIndustry} Website Builder in Nepal | HamroLink`,
      description: cfg.metaDesc,
      url: canonical,
      siteName: "HamroLink",
      type: "website",
      images: [{ url: "https://hamrolink.com/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function IndustryHubPage({ params }: PageProps) {
  const { lang, industry } = await params;
  const cfg = INDUSTRY_CONFIG[industry];
  if (!cfg) notFound();

  const effectiveLang = lang === "ne" ? "en" : lang;
  const dict = await getDictionary(effectiveLang as any);
  const nav = dict.nav;

  // Fetch all cities that have this industry configured
  await connectDB();
  const rawLocations = await Location.find({
    [`industries_data.${industry}`]: { $exists: true },
  })
    .select(`slug city_name province industries_data.${industry} nearby_hubs`)
    .sort({ city_name: 1 })
    .lean() as any[];

  const locations = rawLocations;
  const { icon: Icon, label, h1, subtitle, heroBg, accent1, accent2, textGradient,
    iconBg, iconColor, pillBg, pillText, pillBorder, cardBorder, cardAccent,
    features, faqs } = cfg;

  const baseUrl = "https://hamrolink.com";
  const pageUrl = `${baseUrl}/solutions/${industry}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}/#page`,
        "name": `${label} Website Builder in Nepal — All Cities | HamroLink`,
        "description": cfg.metaDesc,
        "url": pageUrl,
        "provider": { "@type": "Organization", "name": "HamroLink", "url": baseUrl },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",      "item": baseUrl },
          { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${baseUrl}/solutions` },
          { "@type": "ListItem", "position": 3, "name": label,       "item": pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar lang={lang} accent="#6366f1" nav={nav} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <header className={`relative w-full pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden border-b border-slate-900 bg-gradient-to-br ${heroBg}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-30" />
        <div className={`absolute -top-[10%] left-[10%] w-[40%] h-[60%] rounded-full ${accent1} blur-[130px]`} />
        <div className={`absolute top-[20%] right-[5%] w-[30%] h-[50%] rounded-full ${accent2} blur-[100px]`} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-bold mb-10" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${lang}/solutions`} className="hover:text-slate-300 transition-colors">Solutions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className={pillText}>{label}</span>
          </nav>

          <div className="max-w-4xl">
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${pillBg} border ${pillBorder} rounded-full ${pillText} text-xs font-black uppercase tracking-widest mb-8`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{label} Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              {/* Strip both 'for Any City in Nepal' and 'in Any City in Nepal' so the
                  gradient span always reads correctly regardless of h1 preposition */}
              {h1.replace(/(?:for|in) Any City in Nepal$/, "")}
              <span className={`bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}>in Any City in Nepal</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg font-medium max-w-2xl leading-relaxed mb-10">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="https://app.hamrolink.com/signup"
                className={`px-8 py-4 bg-gradient-to-r ${iconColor === "text-emerald-400" ? "from-emerald-600 to-teal-600 shadow-emerald-600/20" : iconColor === "text-sky-400" ? "from-sky-600 to-blue-600 shadow-sky-600/20" : iconColor === "text-amber-400" ? "from-amber-600 to-orange-600 shadow-amber-600/20" : iconColor === "text-violet-400" ? "from-violet-600 to-purple-600 shadow-violet-600/20" : iconColor === "text-rose-400" ? "from-rose-600 to-pink-600 shadow-rose-600/20" : iconColor === "text-fuchsia-400" ? "from-fuchsia-600 to-violet-600 shadow-fuchsia-600/20" : iconColor === "text-teal-400" ? "from-teal-600 to-emerald-600 shadow-teal-600/20" : "from-indigo-600 to-violet-600 shadow-indigo-600/20"} text-white font-black rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:brightness-110 flex items-center gap-2 text-sm`}
              >
                Create Your {label} Website Free <ArrowRight className="w-4 h-4" />
              </Link>
              <div className={`flex items-center gap-2 text-xs font-black ${pillText}`}>
                <MapPin className="w-3.5 h-3.5" />
                <span>{locations.length} {locations.length === 1 ? "city" : "cities"} covered in Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── CITY GRID ─────────────────────────────────────────────── */}
      <section className="w-full py-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${pillBg} border ${pillBorder} rounded-full ${pillText} text-xs font-black uppercase tracking-widest mb-4`}>
                <Globe className="w-3.5 h-3.5" /> {locations.length} Cities Covered
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {label} Website Solutions by City
              </h2>
              <p className="text-slate-500 font-medium mt-2 text-sm">
                Click any city to view localized {label.toLowerCase()} website options, pricing, and market insights.
              </p>
            </div>
          </div>

          {locations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {locations.map((loc) => {
                const indData = loc.industries_data?.[industry];
                const growthMetric = indData?.growth_metric || "";
                const growthNumber = growthMetric?.match(/^\d+/)?.[0];

                return (
                  <Link
                    key={loc.slug}
                    href={`/${lang}/solutions/${industry}/${loc.slug}`}
                    className={`group flex flex-col gap-4 p-6 bg-slate-950 border border-slate-800/80 ${cardBorder} rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                  >
                    {/* City header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-10 h-10 ${iconBg} border border-white/5 rounded-xl flex items-center justify-center shrink-0`}>
                        <MapPin className={`w-5 h-5 ${iconColor}`} />
                      </div>
                      {growthNumber && (
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${pillBg} ${pillText} border ${pillBorder}`}>
                          +{growthNumber}%
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="font-black text-white text-base leading-tight">{loc.city_name}</div>
                      <div className="text-slate-500 text-xs font-semibold mt-0.5">{loc.province}</div>
                    </div>

                    {indData?.prominent_local_demand && (
                      <p className="text-slate-600 text-[11px] leading-relaxed font-medium line-clamp-2">
                        {indData.prominent_local_demand.split(",")[0].trim()}{" "}
                        {indData.prominent_local_demand.split(",")[1]?.trim() && `& ${indData.prominent_local_demand.split(",")[1].trim()}`}
                      </p>
                    )}

                    <div className="mt-auto flex items-center gap-1.5 pt-3 border-t border-slate-800/60">
                      <span className={`text-xs font-black ${cardAccent} opacity-70 group-hover:opacity-100 transition-opacity`}>
                        View {label} Solutions
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 ${cardAccent} opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className={`w-16 h-16 ${iconBg} border border-white/5 rounded-2xl flex items-center justify-center mb-6`}>
                <Icon className={`w-8 h-8 ${iconColor} opacity-50`} />
              </div>
              <h3 className="text-white font-black text-xl mb-2">Cities Coming Soon</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                We&apos;re adding {label.toLowerCase()} website solutions for cities across Nepal. Check back soon or start with a generic template.
              </p>
              <Link
                href="https://app.hamrolink.com/signup"
                className="mt-8 px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-black rounded-xl text-sm transition-all"
              >
                Create Website Anyway →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── INDUSTRY FEATURES ─────────────────────────────────────── */}
      <section className="w-full py-24 border-b border-slate-900 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Everything Your {label} Website Needs
            </h2>
            <p className="text-slate-500 font-medium max-w-lg mx-auto text-sm">
              Purpose-built features for {label.toLowerCase()} businesses in Nepal — not generic website templates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ title, desc }, i) => (
              <div key={title} className="relative flex flex-col gap-4 p-8 bg-slate-950 border border-slate-800/80 rounded-3xl overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${accent1} rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none`} />
                <div className={`w-10 h-10 ${iconBg} border border-white/5 rounded-xl flex items-center justify-center`}>
                  {i === 0 ? <CreditCard className={`w-5 h-5 ${iconColor}`} /> : i === 1 ? <Zap className={`w-5 h-5 ${iconColor}`} /> : <Bot className={`w-5 h-5 ${iconColor}`} />}
                </div>
                <div>
                  <h3 className="font-black text-white text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Common Questions About {label} Websites in Nepal
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item) => (
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

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="w-full py-28 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${heroBg} opacity-60`} />
        <div className={`absolute left-1/2 -translate-x-1/2 top-0 w-[60%] h-[80%] rounded-full ${accent1} blur-[140px]`} />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${pillBg} border ${pillBorder} rounded-full ${pillText} text-xs font-black uppercase tracking-widest mb-8`}>
            <Sparkles className="w-3.5 h-3.5" /> Launch Today
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Create Your {label} Website in Nepal Today
          </h2>
          <p className="text-slate-400 text-base font-medium leading-relaxed mb-10">
            Choose your city above or start with a template. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.hamrolink.com/signup"
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all hover:scale-[1.02] text-sm flex items-center gap-2"
            >
              Create Your {label} Website Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${lang}/solutions`}
              className="px-8 py-5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-black rounded-2xl text-sm transition-all"
            >
              ← All Industries
            </Link>
          </div>
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
    </>
  );
}
