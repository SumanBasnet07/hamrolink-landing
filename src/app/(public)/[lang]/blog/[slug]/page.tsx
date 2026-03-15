// Fetches from MongoDB, shows body HTML, FAQs, likes, comments, JSON-LD schemas
export const revalidate = 60; 

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import {
  Clock, Building2, Users, Camera, ArrowRight,
  ChevronDown, Globe, Star, CheckCircle, Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import LikeCommentSection from "@/components/blog/LikeCommentSection";

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = "en" | "ne";
interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────
async function getPost(slug: string) {
  await connectDB();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  if (!post) return null;
  const p = post as any;
  return {
    ...p,
    _id: p._id.toString(),
    publishedAt: p.publishedAt?.toISOString?.() ?? p.publishedAt ?? null,
    createdAt:   p.createdAt?.toISOString?.()   ?? p.createdAt   ?? null,
    updatedAt:   p.updatedAt?.toISOString?.()   ?? p.updatedAt   ?? null,
    comments: (p.comments ?? [])
      .filter((c: any) => c.approved)
      .map((c: any) => ({
        _id:       c._id?.toString(),
        name:      c.name,
        body:      c.body,
        createdAt: c.createdAt?.toISOString?.() ?? c.createdAt ?? "",
      })),
  };
}

// ─── generateStaticParams ─────────────────────────────────────────────────────
export async function generateStaticParams() {
  await connectDB();
  const posts = await BlogPost.find({ published: true }).select("slug").lean();
  const langs = ["en", "ne"];
  return (posts as any[]).flatMap((p) =>
    langs.map((lang) => ({ lang, slug: p.slug }))
  );
}

// ─── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  const ne = lang === "ne";
  return {
    title:       ne ? (post.metaTitle_ne || post.title_ne) : (post.metaTitle_en || post.title_en),
    description: ne ? (post.metaDescription_ne || post.excerpt_ne) : (post.metaDescription_en || post.excerpt_en),
    keywords:    ne ? (post.schema?.keywords_ne || post.tags_ne?.join(", ")) : (post.schema?.keywords_en || post.tags_en?.join(", ")),
    openGraph: {
      type: "article",
      locale: ne ? "ne_NP" : "en_US",
      siteName: "HamroLink",
      title:       ne ? post.title_ne : post.title_en,
      description: ne ? post.excerpt_ne : post.excerpt_en,
      url: `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${post.slug}`,
      images: post.featuredImage
        ? [{ url: post.featuredImage, width: 1200, height: 630, alt: ne ? post.featuredImageAlt_ne : post.featuredImageAlt_en }]
        : [],
    },
    alternates: {
      canonical: `https://hamrolink.com/en/blog/${post.slug}`,
      languages: {
        en: `https://hamrolink.com/en/blog/${post.slug}`,
        ne: `https://hamrolink.com/ne/blog/${post.slug}`,
      },
    },
  };
}

// ─── JSON-LD components ───────────────────────────────────────────────────────
function ArticleJsonLd({ post, lang }: { post: any; lang: Lang }) {
  const ne = lang === "ne";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline":        ne ? post.title_ne : post.title_en,
    "description":     ne ? post.excerpt_ne : post.excerpt_en,
    "image": post.featuredImage ? {
      "@type": "ImageObject",
      "url":    post.featuredImage,
      "width":  1200,
      "height": 630,
      "caption": ne ? post.featuredImageAlt_ne : post.featuredImageAlt_en,
    } : undefined,
    "author": {
      "@type": "Organization",
      "name":  post.schema?.authorName || "HamroLink",
      "url":   "https://hamrolink.com",
    },
    "publisher": {
      "@type": "Organization",
      "name":  "HamroLink",
      "logo":  { "@type": "ImageObject", "url": "https://hamrolink.com/icons/icon-192.png" },
    },
    "datePublished": post.schema?.datePublished || (post.publishedAt instanceof Date ? post.publishedAt.toISOString().slice(0, 10) : post.publishedAt?.slice(0, 10)) || (post.createdAt instanceof Date ? post.createdAt.toISOString().slice(0, 10) : post.createdAt?.slice(0, 10)),
    "dateModified":  post.updatedAt instanceof Date ? post.updatedAt.toISOString().slice(0, 10) : post.updatedAt?.slice(0, 10),
    "inLanguage":    ne ? "ne" : "en",
    "url":           `https://hamrolink.com/${lang}/blog/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id":   `https://hamrolink.com/${lang}/blog/${post.slug}`,
    },
    "keywords": ne
      ? (post.schema?.keywords_ne || post.tags_ne?.join(", "))
      : (post.schema?.keywords_en || post.tags_en?.join(", ")),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>;
}

function BreadcrumbJsonLd({ post, lang }: { post: any; lang: Lang }) {
  const ne = lang === "ne";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "HamroLink",         "item": "https://hamrolink.com" },
      { "@type": "ListItem", "position": 2, "name": ne ? "ब्लग" : "Blog", "item": `https://hamrolink.com/${lang}/blog` },
      { "@type": "ListItem", "position": 3, "name": ne ? post.title_ne : post.title_en,
        "item": `https://hamrolink.com/${lang}/blog/${post.slug}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>;
}

function FAQJsonLd({ post, lang }: { post: any; lang: Lang }) {
  const ne   = lang === "ne";
  const faqs = (post.faqs ?? []) as any[];
  if (!faqs.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": ne ? f.question_ne : f.question_en,
      "acceptedAnswer": { "@type": "Answer", "text": ne ? f.answer_ne : f.answer_en },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>;
}

// ─── Color map ────────────────────────────────────────────────────────────────
const CM: Record<string, { bg: string; border: string; text: string; ibg: string }> = {
  blue:    { bg:"bg-blue-50",    border:"border-blue-100",    text:"text-blue-700",    ibg:"bg-blue-100"    },
  violet:  { bg:"bg-violet-50",  border:"border-violet-100",  text:"text-violet-700",  ibg:"bg-violet-100"  },
  emerald: { bg:"bg-emerald-50", border:"border-emerald-100", text:"text-emerald-700", ibg:"bg-emerald-100" },
  orange:  { bg:"bg-orange-50",  border:"border-orange-100",  text:"text-orange-700",  ibg:"bg-orange-100"  },
  pink:    { bg:"bg-pink-50",    border:"border-pink-100",    text:"text-pink-700",    ibg:"bg-pink-100"    },
  indigo:  { bg:"bg-indigo-50",  border:"border-indigo-100",  text:"text-indigo-700",  ibg:"bg-indigo-100"  },
  teal:    { bg:"bg-teal-50",    border:"border-teal-100",    text:"text-teal-700",    ibg:"bg-teal-100"    },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params;
  const lang = (rawLang === "ne" ? "ne" : "en") as Lang;
  const ne   = lang === "ne";

  const post = await getPost(slug);
  if (!post) notFound();

  const col   = CM[post.categoryColor ?? "blue"] ?? CM.blue;
  const faqs  = (post.faqs ?? []) as any[];
  const body  = (ne ? post.body_ne : post.body_en) || "";

  // Build TOC from headers (both <h2> and Markdown ##)
  const h2Matches = [...(body as string).matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
  const mdMatches = [...(body as string).matchAll(/^##\s+(.*)$/gm)];
  
  const toc = [
    ...h2Matches.map(m => m[1]),
    ...mdMatches.map(m => m[1])
  ].map((text) => {
    const label = text.replace(/<[^>]+>/g, "").trim();
    // Match rehype-slug / github-slugger style
    const id = label
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097F]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return { id, label };
  });

  // For HTML bodies, inject IDs into H2s (Markdown doesn't need this as rehype-slug handles it)
  const bodyWithIds = h2Matches.reduce((html, m) => {
    const label = m[1].replace(/<[^>]+>/g, "").trim();
    const id = label
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097F]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return html.replace(m[0], `<h2 id="${id}">${m[1]}</h2>`);
  }, body as string);

  return (
    <>
      <ArticleJsonLd  post={post} lang={lang}/>
      <BreadcrumbJsonLd post={post} lang={lang}/>
      <FAQJsonLd      post={post} lang={lang}/>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">

        {/* ── Sticky top bar ── */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href={`/${lang}`} className="hover:text-gray-700 font-medium transition-colors">HamroLink</Link>
              <span>/</span>
              <Link href={`/${lang}/blog`} className="hover:text-gray-700 transition-colors">{ne ? "ब्लग" : "Blog"}</Link>
              <span>/</span>
              <span className="text-gray-600 font-medium truncate max-w-[200px]">
                {ne ? post.category_ne : post.category_en}
              </span>
            </nav>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(["en","ne"] as const).map((l) => (
                <Link key={l} href={`/${l}/blog/${post.slug}`}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang===l ? "bg-white shadow text-gray-900" : "text-gray-400 hover:text-gray-700"}`}>
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        {post.featuredImage ? (
          /* Featured image hero */
          <div className="relative w-full overflow-hidden">
            <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[520px]">
              <Image
                src={post.featuredImage}
                alt={(ne ? post.featuredImageAlt_ne : post.featuredImageAlt_en) || (ne ? post.title_ne : post.title_en)}
                fill priority sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-700/20"/>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-transparent"/>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="max-w-5xl mx-auto w-full px-6 pb-10 pt-6">
                <HeroContent post={post} lang={lang} ne={ne} col={col}/>
              </div>
            </div>
          </div>
        ) : (
          /* Gradient hero (no image) */
          <div className={`${col.bg} border-b ${col.border}`}>
            <div className="max-w-5xl mx-auto px-6 py-14">
              <HeroContent post={post} lang={lang} ne={ne} col={col} dark={false}/>
            </div>
          </div>
        )}

        {/* Image caption */}
        {post.featuredImage && (
          <div className="max-w-5xl mx-auto px-6 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 italic flex items-center gap-1.5">
              <Camera className="w-3 h-3 shrink-0"/>
              {ne
                ? (post.featuredImageAlt_ne || "माथिको तस्बिर — © HamroLink")
                : (post.featuredImageAlt_en || "Above — © HamroLink")}
            </p>
          </div>
        )}

        {/* ── Two-column layout ── */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex gap-12">

            {/* Sticky TOC sidebar */}
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-20">
                {toc.length > 0 && (
                  <>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                      {ne ? "सामग्री तालिका" : "Contents"}
                    </p>
                    <nav className="space-y-0.5 mb-8">
                      {toc.map((item) => (
                        <a key={item.id} href={`#${item.id}`}
                          className="block text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors leading-snug">
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </>
                )}
                {/* Sidebar CTA */}
                <div className={`p-4 ${col.bg} ${col.border} border rounded-2xl text-center`}>
                  <Sparkles className={`w-5 h-5 mx-auto mb-2 ${col.text}`}/>
                  <p className={`text-xs font-black mb-3 leading-snug ${col.text}`}>
                    {ne ? "HamroLink चाँडै आउँदैछ" : "HamroLink is launching soon"}
                  </p>
                  <a href={`/${lang}/waitlist`}
                    className={`block w-full py-2 ${col.ibg} ${col.text} rounded-xl text-xs font-black hover:opacity-80 transition-opacity`}>
                    {ne ? "प्रतीक्षा सूचीमा सामेल" : "Join Waitlist"}
                  </a>
                </div>
              </div>
            </aside>

            {/* Article body */}
            <article className="flex-1 min-w-0">

              {/* ── Article Body ── */}
              <div className="prose prose-gray max-w-none
                  prose-headings:font-black prose-headings:text-gray-900 prose-headings:scroll-mt-24
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-[17px]
                  prose-a:text-indigo-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                  prose-ul:text-gray-600 prose-ol:text-gray-600 prose-ul:my-6
                  prose-li:mb-2 prose-li:leading-relaxed
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-blockquote:border-l-4 prose-blockquote:border-indigo-400
                  prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-indigo-50/30 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
                  prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-10
                  prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-table:my-10 prose-table:border-collapse prose-table:border prose-table:border-gray-100
                  prose-th:bg-gray-50 prose-th:p-4 prose-th:text-left prose-th:text-xs prose-th:font-black prose-th:uppercase prose-th:tracking-wider prose-th:text-gray-500
                  prose-td:p-4 prose-td:text-sm prose-td:border-t prose-td:border-gray-100 prose-td:text-gray-600">
                <div className="overflow-x-auto">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSlug]}
                  >
                    {bodyWithIds}
                  </ReactMarkdown>
                </div>
              </div>

              {/* ── Tags ── */}
              {((ne ? post.tags_ne : post.tags_en) ?? []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest self-center">
                    {ne ? "ट्यागहरू:" : "Tags:"}
                  </span>
                  {(ne ? post.tags_ne : post.tags_en).map((tag: string) => (
                    <span key={tag} className={`px-3 py-1 ${col.bg} ${col.border} border ${col.text} rounded-full text-xs font-semibold`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ── FAQs ── */}
              {faqs.length > 0 && (
                <section className="mt-14">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-9 h-9 rounded-2xl ${col.ibg} ${col.border} border flex items-center justify-center`}>
                      <Star className={`w-4 h-4 ${col.text}`}/>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                      {ne ? "बारम्बार सोधिने प्रश्नहरू" : "Frequently Asked Questions"}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {faqs.map((faq: any, i: number) => (
                      <details key={i} className="group border border-gray-200 rounded-2xl overflow-hidden">
                        <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                          <span className="font-bold text-gray-900 text-sm leading-relaxed">
                            {ne ? faq.question_ne : faq.question_en}
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform"/>
                        </summary>
                        <div className="px-5 pb-4 pt-1 border-t border-gray-100">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {ne ? faq.answer_ne : faq.answer_en}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* ── CTA ── */}
              <div className="mt-14 bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 rounded-3xl p-8 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
                <div className="relative">
                  <Sparkles className="w-7 h-7 mx-auto mb-3 text-indigo-200"/>
                  <h3 className="text-2xl font-black mb-3">
                    {ne ? "HamroLink — नेपालका लागि बनाइएको" : "HamroLink — Built for Nepal"}
                  </h3>
                  <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
                    {ne
                      ? "कुनै कोडिङ बिना NPR ३९९/महिनाबाट आफ्नो व्यावसायिक वेबसाइट बनाउनुहोस्।"
                      : "Build your professional website from NPR 399/month — no coding required."}
                  </p>
                  <a href={`/${lang}/waitlist`}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-white text-indigo-700 rounded-2xl font-black text-sm hover:scale-105 transition-transform shadow-xl">
                    <Sparkles className="w-4 h-4"/>
                    {ne ? "प्रारम्भिक पहुँचमा सामेल हुनुहोस्" : "Join Early Access — Free"}
                    <ArrowRight className="w-4 h-4"/>
                  </a>
                </div>
              </div>

              {/* ── Likes + Comments (client component) ── */}
              <LikeCommentSection
                slug={post.slug}
                lang={lang}
                initialLikes={post.likes ?? 0}
                initialComments={post.comments ?? []}
              />

              {/* ── Share ── */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {ne ? "साझा गर्नुहोस्" : "Share"}
                </p>
                <div className="flex items-center gap-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://hamrolink.com/${lang}/blog/${post.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">f</a>
                  <a href={`https://twitter.com/intent/tweet?url=https://hamrolink.com/${lang}/blog/${post.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">𝕏</a>
                  <a href={`https://wa.me/?text=https://hamrolink.com/${lang}/blog/${post.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">W</a>
                </div>
              </div>

            </article>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-gray-100 bg-white py-8">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <span>© {new Date().getFullYear()} HamroLink · Built in Nepal 🇳🇵</span>
            <div className="flex gap-6">
              {([
                [ne ? "ब्लग"      : "Blog",    `/${lang}/blog`],
                [ne ? "गोपनीयता" : "Privacy", `/${lang}/privacy`],
                [ne ? "सर्तहरू"  : "Terms",   `/${lang}/terms`],
              ] as [string,string][]).map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-gray-700 transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

// ─── Hero content (shared between image and gradient hero) ────────────────────
function HeroContent({
  post, lang, ne, col, dark = true,
}: { post: any; lang: Lang; ne: boolean; col: any; dark?: boolean }) {
  const textColor = dark ? "text-white" : col.text;
  const subColor  = dark ? "text-white/70" : "text-gray-600";
  const metaColor = dark ? "text-white/50" : "text-gray-400";

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 ${dark ? "bg-white/10 border-white/20" : `${col.ibg} ${col.border}`} border rounded-full text-xs font-semibold backdrop-blur-sm ${textColor}`}>
          <Globe className="w-3.5 h-3.5"/>
          {ne ? post.category_ne : post.category_en}
        </div>
        {dark && (
          <span className="hidden sm:block text-[11px] text-white/35">
            {post.emoji} {post.publishedAt?.slice(0, 10)}
          </span>
        )}
      </div>
      <h1 className={`font-black leading-tight mb-4 drop-shadow-lg ${textColor} text-3xl sm:text-4xl lg:text-5xl`}>
        {ne ? post.title_ne : post.title_en}
      </h1>
      <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-5 drop-shadow ${subColor}`}>
        {ne ? post.excerpt_ne : post.excerpt_en}
      </p>
      <div className={`flex flex-wrap items-center gap-4 text-sm ${metaColor}`}>
        <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4"/>HamroLink</span>
        <span className={`w-px h-3 ${dark ? "bg-white/20" : "bg-gray-200"}`}/>
        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/>{ne ? post.readTime_ne : post.readTime_en}</span>
        {post.publishedAt && (
          <>
            <span className={`w-px h-3 ${dark ? "bg-white/20" : "bg-gray-200"}`}/>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4"/>
              {ne ? "HamroLink द्वारा प्रकाशित" : "Published by HamroLink"}
            </span>
          </>
        )}
      </div>
    </>
  );
}
