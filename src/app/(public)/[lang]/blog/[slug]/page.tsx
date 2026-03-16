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
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 transition-all">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
              <Link href={`/${lang}`} className="hover:text-indigo-600 font-medium transition-colors">HamroLink</Link>
              <span className="text-gray-300">/</span>
              <Link href={`/${lang}/blog`} className="hover:text-indigo-600 transition-colors">{ne ? "ब्लग" : "Blog"}</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-semibold truncate max-w-[120px] sm:max-w-[200px]">
                {ne ? post.category_ne : post.category_en}
              </span>
            </nav>
            <div className="flex items-center gap-1 bg-gray-100/80 rounded-full p-1 border border-gray-200/50">
              {(["en","ne"] as const).map((l) => (
                <Link key={l} href={`/${l}/blog/${post.slug}`}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all ${lang===l ? "bg-white shadow-sm text-indigo-700" : "text-gray-500 hover:text-gray-900"}`}>
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        {post.featuredImage ? (
          /* Featured image hero */
          <div className="relative w-full overflow-hidden mt-[1px]">
            <div className="relative w-full h-[550px] sm:h-[620px] lg:h-[750px]">
              <Image
                src={post.featuredImage}
                alt={(ne ? post.featuredImageAlt_ne : post.featuredImageAlt_en) || (ne ? post.title_ne : post.title_en)}
                fill priority sizes="100vw"
                className="object-cover object-center scale-105 animate-pulse-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent"/>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent"/>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-16 pt-24">
                <HeroContent post={post} lang={lang} ne={ne} col={col}/>
              </div>
            </div>
          </div>
        ) : (
          /* Gradient hero (no image) */
          <div className={`${col.bg} border-b ${col.border} overflow-hidden relative`}>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/40 rounded-full blur-3xl opacity-50"/>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl opacity-50"/>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
              <HeroContent post={post} lang={lang} ne={ne} col={col} dark={false}/>
            </div>
          </div>
        )}

        {/* Image caption */}
        {post.featuredImage && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-500 italic flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 shrink-0 text-indigo-400"/>
              {ne
                ? (post.featuredImageAlt_ne || "माथिको तस्बिर — © HamroLink")
                : (post.featuredImageAlt_en || "Above — © HamroLink")}
            </p>
          </div>
        )}

        {/* ── Two-column layout ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

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
                  prose-headings:font-black prose-headings:text-slate-950 prose-headings:scroll-mt-32 prose-headings:tracking-tight
                  prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100
                  prose-h3:text-2xl sm:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-6
                  prose-p:text-slate-900 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-lg sm:prose-p:text-xl prose-p:font-normal
                  prose-a:text-indigo-700 prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-indigo-200 hover:prose-a:border-indigo-600 hover:prose-a:bg-indigo-50 transition-all
                  prose-ul:text-slate-900 prose-ol:text-slate-900 prose-ul:my-8 prose-ul:space-y-3
                  prose-li:mb-2 prose-li:leading-relaxed prose-li:text-lg sm:prose-li:text-xl
                  prose-strong:text-black prose-strong:font-black
                  prose-blockquote:border-l-4 prose-blockquote:border-indigo-600
                  prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-950 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-8 prose-blockquote:rounded-r-2xl prose-blockquote:my-10
                  prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:shadow-indigo-950/20 prose-img:my-12
                  prose-code:text-indigo-800 prose-code:bg-indigo-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none
                  prose-table:my-12 prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden prose-table:border prose-table:border-slate-200
                  prose-th:bg-slate-100 prose-th:p-5 prose-th:text-left prose-th:text-xs prose-th:font-black prose-th:uppercase prose-th:tracking-widest prose-th:text-slate-600
                  prose-td:p-5 prose-td:text-base prose-td:border-t prose-td:border-slate-100 prose-td:text-slate-900">
                <div className="antialiased selection:bg-indigo-100 selection:text-indigo-900">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSlug]}
                    components={{
                      table: ({ node, ...props }) => (
                        <div className="my-12 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                          <table {...props} className="min-w-full border-collapse" />
                        </div>
                      ),
                      thead: ({ node, ...props }) => <thead {...props} className="bg-slate-100" />,
                      th: ({ node, ...props }) => (
                        <th {...props} className="p-5 text-left text-xs font-black uppercase tracking-widest text-slate-600 border-b border-slate-200" />
                      ),
                      td: ({ node, ...props }) => (
                        <td {...props} className="p-5 text-base text-slate-900 border-t border-slate-100" />
                      ),
                    }}
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
                <section className="mt-20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl ${col.ibg} ${col.border} border flex items-center justify-center shadow-sm`}>
                      <Star className={`w-6 h-6 ${col.text}`}/>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      {ne ? "बारम्बार सोधिने प्रश्नहरू" : "Frequently Asked Questions"}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq: any, i: number) => (
                      <details key={i} className="group border border-slate-200 rounded-[2rem] overflow-hidden bg-white hover:border-indigo-200 transition-all duration-300">
                        <summary className="flex items-center justify-between gap-4 px-8 py-6 cursor-pointer list-none select-none hover:bg-slate-50/50 transition-colors">
                          <span className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug">
                            {ne ? faq.question_ne : faq.question_en}
                          </span>
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 group-open:rotate-180 transition-transform duration-300"/>
                        </summary>
                        <div className="px-8 pb-6 pt-2 border-t border-slate-100">
                          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                            {ne ? faq.answer_ne : faq.answer_en}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* ── CTA ── */}
              <div className="mt-20 bg-gradient-to-br from-indigo-700 via-violet-800 to-fuchsia-900 rounded-[2.5rem] p-10 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl shadow-indigo-900/20">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
                    <Sparkles className="w-8 h-8 text-indigo-200"/>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight">
                    {ne ? "HamroLink — नेपालका लागि बनाइएको" : "HamroLink — Built for Nepal"}
                  </h3>
                  <p className="text-indigo-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                    {ne
                      ? "कुनै कोडिङ बिना NPR ३९९/महिनाबाट आफ्नो व्यावसायिक वेबसाइट बनाउनुहोस्।"
                      : "Build your professional website from NPR 399/month — no coding required."}
                  </p>
                  <a href={`/${lang}/waitlist`}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-700 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20">
                    <Sparkles className="w-6 h-6"/>
                    {ne ? "प्रारम्भिक पहुँचमा सामेल हुनुहोस्" : "Join Early Access — Free"}
                    <ArrowRight className="w-6 h-6"/>
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
        <div className="border-t border-gray-100 bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-base text-slate-500 font-medium">
            <span>© {new Date().getFullYear()} HamroLink · Built in Nepal 🇳🇵</span>
            <div className="flex gap-8">
              {([
                [ne ? "ब्लग"      : "Blog",    `/${lang}/blog`],
                [ne ? "गोपनीयता" : "Privacy", `/${lang}/privacy`],
                [ne ? "सर्तहरू"  : "Terms",   `/${lang}/terms`],
              ] as [string,string][]).map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-indigo-600 transition-colors">{label}</Link>
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
  const subColor  = dark ? "text-white" : "text-slate-900";
  const metaColor = dark ? "text-indigo-100" : "text-slate-600";

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
      <h1 className={`font-black leading-[1.1] mb-6 drop-shadow-2xl ${textColor} text-4xl sm:text-5xl lg:text-7xl tracking-tighter`}>
        {ne ? post.title_ne : post.title_en}
      </h1>
      <p className={`text-xl sm:text-2xl lg:text-3xl max-w-4xl leading-relaxed mb-10 drop-shadow-lg ${subColor} font-semibold`}>
        {ne ? post.excerpt_ne : post.excerpt_en}
      </p>
      <div className={`flex flex-wrap items-center gap-y-4 gap-x-6 text-base sm:text-lg font-bold ${metaColor}`}>
        <span className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <Building2 className="w-5 h-5 text-indigo-300"/>
          HamroLink
        </span>
        <span className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <Clock className="w-5 h-5 text-emerald-300"/>
          {ne ? post.readTime_ne : post.readTime_en}
        </span>
        {post.publishedAt && (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Users className="w-4 h-4 text-orange-400"/>
            {ne ? "हाम्रोलिंक" : "HamroLink"}
          </span>
        )}
      </div>
    </>
  );
}
