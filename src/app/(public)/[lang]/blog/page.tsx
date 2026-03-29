// Bilingual (EN + NE) blog index — editorial magazine aesthetic
export const revalidate = 3600;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Globe, GraduationCap, Share2,
  Clock, BookOpen, Search, Sparkles, TrendingUp,
  ChevronRight, Rss, Building2,
} from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  return {
    title: ne
      ? "नेपाली व्यवसायका लागि डिजिटल गाइडहरू | HamroLink Digital"
      : "Digital Guides for Nepali Businesses | HamroLink Digital",
    description: ne
      ? "नेपाली व्यवसाय र विद्यालयहरूका लागि वेबसाइट, डिजिटल उपस्थिति र अनलाइन वृद्धिबारे व्यावहारिक गाइडहरू।"
      : "Practical guides on websites, digital presence, and online growth for Nepali businesses and schools.",
    alternates: {
      canonical: `https://hamrolink.com/${lang}/blog`,
      languages: {
        en: "https://hamrolink.com/en/blog",
        ne: "https://hamrolink.com/ne/blog",
        "x-default": "https://hamrolink.com/en/blog",
      }
    },
    openGraph: {
      title: ne
        ? "नेपाली व्यवसायका लागि डिजिटल गाइडहरू | HamroLink Digital"
        : "Digital Guides for Nepali Businesses | HamroLink Digital",
      description: ne
        ? "नेपाली व्यवसाय र विद्यालयहरूका लागि वेबसाइट, डिजिटल उपस्थिति र अनलाइन वृद्धिबारे व्यावहारिक गाइडहरू।"
        : "Practical guides on websites, digital presence, and online growth for Nepali businesses and schools.",
      url: `https://hamrolink.com/${ne ? "ne" : "en"}/blog`,
      siteName: "HamroLink Digital",
      images: [
        {
          url: "https://hamrolink.com/og-image.png",
          width: 1200,
          height: 630,
          alt: ne
            ? "नेपाली व्यवसायका लागि डिजिटल गाइडहरू"
            : "Digital Guides for Nepali Businesses",
        },
      ],
      locale: ne ? "ne_NP" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ne
        ? "नेपाली व्यवसायका लागि डिजिटल गाइडहरू | HamroLink Digital"
        : "Digital Guides for Nepali Businesses | HamroLink Digital",
      description: ne
        ? "नेपाली व्यवसाय र विद्यालयहरूका लागि वेबसाइट, डिजिटल उपस्थिति र अनलाइन वृद्धिबारे व्यावहारिक गाइडहरू।"
        : "Practical guides on websites, digital presence, and online growth for Nepali businesses and schools.",
      images: ["https://hamrolink.com/og-image.png"],
    },
  };
}

// ─── Blog post data ───────────────────────────────────────────────────────────
// ─── Post Mapping ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, any> = {
  blue:    Globe,
  violet:  Share2,
  emerald: GraduationCap,
  orange:  TrendingUp,
  pink:    Building2,
  indigo:  Sparkles,
  teal:    Rss,
};

const ACCENT_MAP: Record<string, string> = {
  blue:    "#3b82f6",
  violet:  "#7c3aed",
  emerald: "#10b981",
  orange:  "#f59e0b",
  pink:    "#ec4899",
  indigo:  "#6366f1",
  teal:    "#14b8a6",
};

const CAT_COLORS: Record<string, { pill: string; pillText: string; border: string; glow: string }> = {
  blue:    { pill:"bg-blue-100",    pillText:"text-blue-700",    border:"border-blue-200",    glow:"shadow-blue-100"    },
  violet:  { pill:"bg-violet-100",  pillText:"text-violet-700",  border:"border-violet-200",  glow:"shadow-violet-100"  },
  emerald: { pill:"bg-emerald-100", pillText:"text-emerald-700", border:"border-emerald-200", glow:"shadow-emerald-100" },
  orange:  { pill:"bg-orange-100",  pillText:"text-orange-700",  border:"border-orange-200",  glow:"shadow-orange-100"  },
  pink:    { pill:"bg-pink-100",    pillText:"text-pink-700",    border:"border-pink-200",    glow:"shadow-pink-100"    },
  indigo:  { pill:"bg-indigo-100",  pillText:"text-indigo-700",  border:"border-indigo-200",  glow:"shadow-indigo-100"  },
  teal:    { pill:"bg-teal-100",    pillText:"text-teal-700",    border:"border-teal-200",    glow:"shadow-teal-100"    },
};

// ─── Coming-soon topics ───────────────────────────────────────────────────────
const COMING_SOON_EN = [
  { emoji:"🛍", title:"How to Sell Online in Nepal",          tag:"E-Commerce"    },
  { emoji:"📍", title:"Google My Business for Nepali Shops", tag:"Local SEO"     },
  { emoji:"💳", title:"eSewa & Khalti on Your Website",       tag:"Payments"      },
  { emoji:"📸", title:"Best Photos for Your Business Website",tag:"Content"       },
];
const COMING_SOON_NE = [
  { emoji:"🛍", title:"नेपालमा अनलाइन कसरी बेच्ने",           tag:"इ-कमर्स"       },
  { emoji:"📍", title:"नेपाली पसलका लागि Google My Business", tag:"स्थानीय SEO"  },
  { emoji:"💳", title:"तपाईंको वेबसाइटमा eSewa र Khalti",     tag:"भुक्तानी"      },
  { emoji:"📸", title:"व्यवसाय वेबसाइटका लागि राम्रो फोटो",   tag:"सामग्री"       },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "ne" ? "ne" : "en";
  const ne   = lang === "ne";
  const comingSoon = ne ? COMING_SOON_NE : COMING_SOON_EN;

  await connectDB();
  const dbPosts = await BlogPost.find({ published: true })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();

  const posts = (dbPosts as any[]).map(p => ({
    slug: p.slug,
    category: { en: p.category_en, ne: p.category_ne },
    categoryColor: p.categoryColor || "blue",
    icon: ICON_MAP[p.categoryColor || "blue"] || Globe,
    accent: ACCENT_MAP[p.categoryColor || "blue"] || "#3b82f6",
    date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "",
    date_ne: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("ne-NP", { month: "long", year: "numeric" }) : "",
    readTime: { en: p.readTime_en, ne: p.readTime_ne },
    title: { en: p.title_en, ne: p.title_ne },
    excerpt: { en: p.excerpt_en, ne: p.excerpt_ne },
    tags: { en: p.tags_en, ne: p.tags_ne },
    emoji: p.emoji || "📝",
    image: p.featuredImage || "/og-image.png",
  }));

  if (posts.length === 0) {
    // Handle empty state if no posts in DB
    return (
      <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-black text-white mb-4">{ne ? "अझै कुनै लेखहरू छैनन्" : "No articles yet"}</h2>
          <p className="text-white/40 mb-8">{ne ? "चाँडै केही रोचक सामग्री थप्नेछौं।" : "We'll be adding some interesting content soon."}</p>
          <Link href={`/${lang}`} className="text-indigo-400 font-bold hover:underline">{ne ? "गृहपृष्ठ" : "Go Home"}</Link>
        </div>
      </div>
    );
  }

  const featured = posts[0];
  const rest     = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#0b0f1a]">

      {/* ── Sticky nav ──────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[#0b0f1a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${lang}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
              <span className="font-black text-white">HamroLink Digital</span>
              <ChevronRight className="w-3.5 h-3.5"/>
            </Link>
            <span className="text-white text-sm font-black tracking-tight">
              {ne ? "ब्लग" : "Blog"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/8 rounded-lg p-0.5 border border-white/10">
              {(["en","ne"] as const).map(l => (
                <Link key={l} href={`/${l}/blog`}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang===l ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}>
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
            <Link href={`/${lang}/waitlist`}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-lg text-xs font-black text-white">
              <Sparkles className="w-3 h-3"/>
              {ne ? "प्रारम्भिक पहुँच" : "Early Access"}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Masthead ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-20 pb-16">
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"/>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"/>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Overline */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-indigo-400"/>
            <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">
              {ne ? "HamroLink Digital ब्लग" : "HamroLink Digital Blog"}
            </span>
          </div>
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6"
            style={{fontVariantNumeric:"tabular-nums"}}>
            {ne
              ? <><span className="text-white">डिजिटल</span><br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400">नेपाल</span></>
              : <><span className="text-white">Digital</span><br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400">Nepal</span></>}
          </h1>
          <p className="text-white/40 text-lg max-w-xl leading-relaxed">
            {ne
              ? "नेपाली व्यवसाय र विद्यालयहरूका लागि व्यावहारिक गाइडहरू — वेबसाइट, डिजिटल उपस्थिति र अनलाइन वृद्धिबारे।"
              : "Practical guides for Nepali businesses and schools — on websites, digital presence, and growing online."}
          </p>
          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/8">
            {[
              { v: posts.length.toString(), l: ne ? "लेखहरू"   : "Articles"       },
              { v: "2026+", l: ne ? "अपडेट"    : "Always updated" },
              { v: "EN+NE", l: ne ? "द्विभाषिक" : "Bilingual"      },
            ].map(s => (
              <div key={s.l} className="flex items-center gap-2.5">
                <span className="text-white font-black text-lg tabular-nums">{s.v}</span>
                <span className="text-white/30 text-sm">{s.l}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 ml-auto text-white/25 text-xs">
              <Rss className="w-3 h-3"/>
              {ne ? "सदस्यता" : "Subscribe"}
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured article (hero card) ────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <Link href={`/${lang}/blog/${featured.slug}`} className="group block">
          <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-gradient-to-br from-[#111827] to-[#0f172a] hover:border-white/15 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"/>
            {/* Ambient glow */}
            <div className="absolute -top-20 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"/>

            <div className="relative p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="flex-1 max-w-2xl">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/15 border border-blue-500/25 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"/>
                      <span className="text-blue-300 text-[11px] font-black uppercase tracking-widest">
                        {ne ? "फिचर्ड" : "Featured"}
                      </span>
                    </div>
                    <span className="text-white/25 text-xs">·</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-900/30 rounded-full">
                      <Globe className="w-3 h-3 text-blue-400"/>
                      <span className="text-blue-300 text-[11px] font-semibold">
                        {ne ? featured.category.ne : featured.category.en}
                      </span>
                    </div>
                    <span className="text-white/25 text-xs">·</span>
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3"/>
                      {ne ? featured.readTime.ne : featured.readTime.en}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5 group-hover:text-blue-50 transition-colors">
                    {ne ? featured.title.ne : featured.title.en}
                  </h2>
                  <p className="text-white/45 text-base leading-relaxed mb-8 max-w-xl">
                    {ne ? featured.excerpt.ne : featured.excerpt.en}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {(ne ? featured.tags.ne : featured.tags.en).map((tag: string) => (
                      <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-white/40 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0b0f1a] rounded-xl font-black text-sm group-hover:bg-blue-50 transition-colors">
                    {ne ? "पढ्नुहोस्" : "Read Article"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
                </div>

                {/* Big image visual */}
                <div className="lg:shrink-0 flex items-center justify-center">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-blue-500/20 group-hover:scale-105 transition-transform duration-500 shadow-2xl shadow-blue-900/30">
                    <Image
                      src={featured.image!}
                      alt={ne ? featured.title.ne : featured.title.en}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* ── Article grid ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map((post) => {
            const cc    = CAT_COLORS[post.categoryColor];
            const Icon  = post.icon;
            return (
              <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="group block">
                <div
                  className="relative h-full rounded-3xl overflow-hidden border border-white/8 bg-[#111827] hover:border-white/15 transition-all duration-400 hover:shadow-xl flex flex-col"
                  style={{"--post-accent": post.accent} as React.CSSProperties}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-50 transition-opacity group-hover:opacity-100"
                    style={{background:`linear-gradient(90deg, transparent, ${post.accent}, transparent)`}}/>

                  {/* Ambient */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{background:`${post.accent}18`}}/>

                  <div className="relative p-7 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full">
                          <Icon className="w-3 h-3 text-white/50"/>
                          <span className="text-white/50 text-[11px] font-semibold">
                            {ne ? post.category.ne : post.category.en}
                          </span>
                        </div>
                        <span className="text-white/20 text-xs flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5"/>
                          {ne ? post.readTime.ne : post.readTime.en}
                        </span>
                      </div>
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={post.image!}
                          alt={ne ? post.title.ne : post.title.en}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-white/20 text-xs mb-3">{ne ? post.date_ne : post.date}</p>

                    {/* Title */}
                    <h3 className="text-xl font-black text-white leading-snug mb-3 group-hover:text-white/90 transition-colors">
                      {ne ? post.title.ne : post.title.en}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/35 text-sm leading-relaxed flex-1 mb-5">
                      {ne ? post.excerpt.ne : post.excerpt.en}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(ne ? post.tags.ne : post.tags.en).map((tag: string) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded-full text-white/30 text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/6">
                      <span className="text-white/30 text-xs">{ne ? "HamroLink Digital" : "HamroLink Digital"}</span>
                      <div className="flex items-center gap-1.5 text-xs font-black transition-all group-hover:gap-2.5"
                        style={{color: post.accent}}>
                        {ne ? "पढ्नुहोस्" : "Read"}
                        <ArrowRight className="w-3.5 h-3.5"/>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Coming soon strip ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="rounded-3xl border border-white/8 bg-[#0d1117] overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-white/6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"/>
                <span className="text-white/70 text-sm font-black uppercase tracking-widest">
                  {ne ? "आउँदैछ" : "Coming Soon"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-white/30 text-xs border border-white/8">
              <Rss className="w-3 h-3"/>
              {ne ? "सूचना पाउनुहोस्" : "Get notified"}
            </div>
          </div>
          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/6">
            {comingSoon.map((item) => (
              <div key={item.title} className="px-6 py-5 group hover:bg-white/3 transition-colors">
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">{item.emoji}</div>
                <div className="inline-block mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400/70 bg-amber-400/10 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <p className="text-white/50 text-sm font-semibold leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Newsletter / Waitlist CTA ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#0f0f2e] to-violet-950"/>
          <div className="absolute inset-0 opacity-30" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #4f46e5 0%, transparent 50%), radial-gradient(circle at 80% 50%, #7c3aed 0%, transparent 50%)"}}/>
          <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"/>

          <div className="relative px-8 py-12 sm:px-16 sm:py-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full text-xs font-bold text-white/70 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300"/>
              {ne ? "नेपालमा चाँडै सुरु हुँदैछ" : "Launching soon in Nepal"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              {ne
                ? <>आफ्नो व्यवसायको वेबसाइट<br/> आज नै बनाउनुहोस्</>
                : <>Build your business website<br/>before your competitors do</>}
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto mb-8">
              {ne
                ? "HamroLink Digital को प्रारम्भिक पहुँचमा सामेल हुनुहोस् — निःशुल्क ३ महिने Pro परीक्षण र प्राथमिकता अनबोर्डिङसहित।"
                : "Join HamroLink Digital early access and get a free 3-month Pro trial, priority onboarding, and a locked-in launch price."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={`/${lang}/waitlist`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0b0f1a] rounded-2xl font-black text-sm hover:bg-indigo-50 transition-colors shadow-2xl">
                <Sparkles className="w-4 h-4"/>
                {ne ? "प्रारम्भिक पहुँचमा सामेल हुनुहोस्" : "Join Early Access — Free"}
                <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link href={`/${lang}/pricing`}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/60 rounded-2xl font-semibold text-sm hover:border-white/30 hover:text-white/80 transition-colors">
                {ne ? "मूल्य निर्धारण हेर्नुहोस्" : "View Pricing"}
              </Link>
            </div>
            <p className="text-white/20 text-xs mt-5">
              {ne
                ? "सामेल हुन निःशुल्क · क्रेडिट कार्ड आवश्यक छैन · जुनसुकै बेला अनसब्सक्राइब"
                : "Free to join · No credit card · Unsubscribe anytime"}
            </p>
          </div>
        </div>
      </div>

      {/* ── All articles list ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white/30"/>
            <span className="text-white/30 text-xs font-black uppercase tracking-widest">
              {ne ? "सबै लेखहरू" : "All Articles"}
            </span>
          </div>
          <div className="flex-1 h-px bg-white/6"/>
          <span className="text-white/20 text-xs">{posts.length} {ne ? "लेखहरू" : "articles"}</span>
        </div>

        <div className="space-y-2">
          {posts.map((post, i) => {
            const Icon = post.icon;
            return (
              <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-white/8 hover:bg-white/3 transition-all">
                <span className="text-white/20 text-sm font-black w-6 text-right shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-lg"
                  style={{background:`${post.accent}18`}}>
                  {post.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-white/80 text-sm truncate group-hover:text-white transition-colors">
                    {ne ? post.title.ne : post.title.en}
                  </p>
                  <p className="text-white/25 text-xs truncate">{ne ? post.category.ne : post.category.en} · {ne ? post.date_ne : post.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-white/25 text-xs hidden sm:block">
                    {ne ? post.readTime.ne : post.readTime.en}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all"/>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div className="border-t border-white/6 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span className="text-white/25">© {new Date().getFullYear()} HamroLink Digital · Built in Nepal 🇳🇵</span>
          <div className="flex gap-6">
            {([
              [ne ? "गृहपृष्ठ"   : "Home",    `/${lang}`],
              [ne ? "गोपनीयता"  : "Privacy", `/${lang}/privacy`],
              [ne ? "सर्तहरू"   : "Terms",   `/${lang}/terms`],
              [ne ? "सम्पर्क"   : "Contact", `/${lang}#contact`],
            ] as [string, string][]).map(([label, href]) => (
              <Link key={href} href={href} className="text-white/25 hover:text-white/60 transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}