// app/[lang]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import {
  Clock, Building2, Calendar, ArrowRight,
  ChevronDown, Globe, Star, Sparkles, ThumbsUp, Edit3,
} from "lucide-react";
import { resolveHref } from "@/lib/seo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import LikeCommentSection from "@/components/blog/LikeCommentSection";
import { BlogPageSchema } from "@/components/SEO/Schema";

// ─── Types ─────────────────────────────────────────────────────────────
type Lang = "en" | "ne";
interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// ─── Fetch helpers (identical to original) ───────────────────────────
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

// ─── generateStaticParams (same) ─────────────────────────────────────
export async function generateStaticParams() {
  await connectDB();
  const posts = await BlogPost.find({ published: true }).select("slug").lean();
  const langs = ["en", "ne"];
  return (posts as any[]).flatMap((p) =>
    langs.map((lang) => ({ lang, slug: p.slug }))
  );
}

// ─── generateMetadata (same) ─────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  const ne = lang === "ne";

  const title       = ne ? (post.metaTitle_ne || post.title_ne) : (post.metaTitle_en || post.title_en);
  const description = ne ? (post.metaDescription_ne || post.excerpt_ne) : (post.metaDescription_en || post.excerpt_en);
  const keywords    = ne ? (post.schema?.keywords_ne || post.tags_ne?.join(", ")) : (post.schema?.keywords_en || post.tags_en?.join(", "));
  const images      = post.featuredImage
    ? [{ url: post.featuredImage, width: 1200, height: 630, alt: ne ? post.featuredImageAlt_ne : post.featuredImageAlt_en }]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: ne ? `https://hamrolink.com/ne/blog/${post.slug}` : `https://hamrolink.com/blog/${post.slug}`,
      languages: {
        en:          `https://hamrolink.com/blog/${post.slug}`,
        ne:          `https://hamrolink.com/ne/blog/${post.slug}`,
        "x-default": `https://hamrolink.com/blog/${post.slug}`,
      },
    },
    openGraph: {
      type:        "article",
      locale:      ne ? "ne_NP" : "en_US",
      siteName:    "HamroLink",
      title,
      description,
      url:         ne ? `https://hamrolink.com/ne/blog/${post.slug}` : `https://hamrolink.com/blog/${post.slug}`,
      ...(images ? { images } : {}),
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
    },
  };
}


// ─── Color map (same) ─────────────────────────────────────────────────
const CM: Record<string, { bg: string; border: string; text: string; ibg: string }> = {
  blue:    { bg:"bg-blue-50",    border:"border-blue-100",    text:"text-blue-700",    ibg:"bg-blue-100"    },
  violet:  { bg:"bg-violet-50",  border:"border-violet-100",  text:"text-violet-700",  ibg:"bg-violet-100"  },
  emerald: { bg:"bg-emerald-50", border:"border-emerald-100", text:"text-emerald-700", ibg:"bg-emerald-100" },
  orange:  { bg:"bg-orange-50",  border:"border-orange-100",  text:"text-orange-700",  ibg:"bg-orange-100"  },
  pink:    { bg:"bg-pink-50",    border:"border-pink-100",    text:"text-pink-700",    ibg:"bg-pink-100"    },
  indigo:  { bg:"bg-indigo-50",  border:"border-indigo-100",  text:"text-indigo-700",  ibg:"bg-indigo-100"  },
  teal:    { bg:"bg-teal-50",    border:"border-teal-100",    text:"text-teal-700",    ibg:"bg-teal-100"    },
};

// ─── Helper to format date (Nepali or English) ───────────────────────
function formatDate(dateStr: string | null, ne: boolean): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (ne) {
    return date.toLocaleDateString("ne-NP", {
      year: "numeric", month: "long", day: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params;
  const lang = (rawLang === "ne" ? "ne" : "en") as Lang;
  const ne   = lang === "ne";

  const post = await getPost(slug);
  if (!post) notFound();

  const col   = CM[post.categoryColor ?? "blue"] ?? CM.blue;
  const faqs  = (post.faqs ?? []) as any[];
  const body  = (ne ? post.body_ne : post.body_en) || "";

  // Inject IDs into H2s for anchor links (but no TOC)
  const h2Matches = [...body.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
  let bodyWithIds = h2Matches.reduce((html, m) => {
    const label = m[1].replace(/<[^>]+>/g, "").trim();
    const id = label.toLowerCase().replace(/[^a-z0-9\u0900-\u097F]+/g, "-").replace(/^-+|-+$/g, "");
    return html.replace(m[0], `<h2 id="${id}">${m[1]}</h2>`);
  }, body);

  const publishedDate = post.publishedAt || post.createdAt;
  const updatedDate   = post.updatedAt;
  const hasUpdate     = updatedDate && publishedDate && updatedDate !== publishedDate;

  return (
    <>
      <BlogPageSchema post={post} lang={lang} />

      <div className="min-h-screen bg-white">
        {/* Sticky top bar (language switcher + breadcrumbs) */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-1.5 text-sm text-gray-600">
              <Link href={resolveHref("/", lang)} className="hover:text-indigo-600 font-medium">HamroLink</Link>
              <span className="text-gray-300">/</span>
              <Link href={resolveHref("/blog", lang)} className="hover:text-indigo-600 font-medium">{ne ? "ब्लग" : "Blog"}</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium truncate max-w-[150px]">
                {ne ? post.category_ne : post.category_en}
              </span>
            </nav>
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
              {(["en","ne"] as const).map((l) => (
                <Link key={l} href={resolveHref(`/blog/${post.slug}`, l)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${lang===l ? "bg-white shadow text-indigo-700" : "text-gray-600 hover:text-gray-900"}`}>
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main content – no hero image, no TOC */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          {/* Category badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${col.bg} ${col.text} ${col.border} border`}>
              <Globe className="w-3.5 h-3.5" />
              {ne ? post.category_ne : post.category_en}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.2] mb-6">
            {ne ? post.title_ne : post.title_en}
          </h1>

          {/* Excerpt */}
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-8">
            {ne ? post.excerpt_ne : post.excerpt_en}
          </p>

          {/* Publisher + Dates (modern minimal) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 border-b border-gray-100 pb-8 mb-10">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-gray-900">HamroLink</span>
              <span className="text-gray-400">—</span>
              <span>{ne ? "प्रकाशक" : "Publisher"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>{ne ? "प्रकाशित:" : "Published:"}</span>
              <time dateTime={publishedDate?.slice(0,10)} className="font-medium text-gray-700">
                {formatDate(publishedDate, ne)}
              </time>
            </div>
            {hasUpdate && (
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-500" />
                <span>{ne ? "अद्यावधिक:" : "Updated:"}</span>
                <time dateTime={updatedDate?.slice(0,10)} className="font-medium text-gray-700">
                  {formatDate(updatedDate, ne)}
                </time>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{ne ? post.readTime_ne : post.readTime_en}</span>
            </div>
          </div>

          {/* Optional: Featured image (small, inline, not hero) */}
          {post.featuredImage && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={post.featuredImage}
                alt={(ne ? post.featuredImageAlt_ne : post.featuredImageAlt_en) || (ne ? post.title_ne : post.title_en)}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Article body (full prose, modern) */}
          <article className="prose prose-gray max-w-none
              prose-headings:font-black prose-headings:text-gray-900 prose-headings:scroll-mt-24
              prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-[1.75] prose-p:mb-6 prose-p:text-lg
              prose-a:text-indigo-600 prose-a:font-semibold prose-a:border-b prose-a:border-indigo-200 hover:prose-a:border-indigo-600
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-indigo-50/30 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
              prose-img:rounded-xl prose-img:shadow-md prose-img:my-10
              prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0f172a] prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:p-6
              [&_pre_code]:bg-transparent [&_pre_code]:text-slate-100 [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:text-[15px] [&_pre_code]:leading-relaxed
              prose-table:w-full prose-table:border-collapse prose-table:my-8
              prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:text-sm prose-th:font-bold
              prose-td:p-3 prose-td:border-t prose-td:border-gray-100
            ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
            >
              {bodyWithIds}
            </ReactMarkdown>
          </article>

          {/* Engagement row: likes/comments + helpful */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <LikeCommentSection
              slug={post.slug}
              lang={lang}
              initialLikes={post.likes ?? 0}
              initialComments={post.comments ?? []}
            />
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 uppercase tracking-wide">{ne ? "सहयोगी लाग्यो?" : "Was this helpful?"}</span>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-green-100 transition">
                <ThumbsUp className="w-4 h-4 text-gray-500 hover:text-green-600" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition">
                <ThumbsUp className="w-4 h-4 text-gray-500 rotate-180 hover:text-red-600" />
              </button>
            </div>
          </div>

          {/* Tags */}
          {((ne ? post.tags_ne : post.tags_en) ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {(ne ? post.tags_ne : post.tags_en).map((tag: string) => (
                <span key={tag} className={`px-3 py-1 ${col.bg} ${col.border} border ${col.text} rounded-full text-xs font-semibold`}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${col.ibg} flex items-center justify-center`}>
                  <Star className={`w-5 h-5 ${col.text}`} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">{ne ? "बारम्बार सोधिने प्रश्नहरू" : "Frequently Asked Questions"}</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq: any, i: number) => (
                  <details key={i} className="group border border-gray-200 rounded-xl bg-white hover:border-indigo-200 transition">
                    <summary className="flex justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                      <span className="font-bold text-gray-800">{ne ? faq.question_ne : faq.question_en}</span>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition" />
                    </summary>
                    <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                      <p className="text-gray-600">{ne ? faq.answer_ne : faq.answer_en}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <div className="mt-16 bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-8 text-white text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-indigo-200" />
            <h3 className="text-2xl font-black mb-2">{ne ? "आफ्नै वेबसाइट बनाउनुहोस्" : "Build Your Own Website"}</h3>
            <p className="text-indigo-100 mb-5">
              {ne ? "NPR 399/महिना बाट सुरु गर्नुहोस् – कुनै कोडिङ आवश्यक छैन।" : "Starting at NPR 399/month – no coding required."}
            </p>
            <a href="https://app.hamrolink.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold hover:scale-105 transition">
              {ne ? "नि:शुल्क सुरु गर्नुहोस्" : "Start for Free"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Share row */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
            <p className="text-xs text-gray-400">{ne ? "साझा गर्नुहोस्" : "Share"}</p>
            <div className="flex gap-2">
              {[
                ["f", "https://www.facebook.com/sharer/sharer.php?u=", "bg-blue-600"],
                ["𝕏", "https://twitter.com/intent/tweet?url=", "bg-gray-800"],
                ["W", "https://wa.me/?text=", "bg-green-500"]
              ].map(([label, base, bg]) => (
                <a key={label} href={`${base}https://hamrolink.com${resolveHref(`/blog/${post.slug}`, lang)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-white text-sm hover:scale-105 transition`}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} HamroLink · Built in Nepal 🇳🇵</span>
            <div className="flex gap-6">
              <Link href={resolveHref("/privacy", lang)} className="hover:text-indigo-600">Privacy</Link>
              <Link href={resolveHref("/terms", lang)} className="hover:text-indigo-600">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}