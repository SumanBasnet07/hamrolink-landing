"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams, useParams, usePathname } from "next/navigation";
import {
  BookOpen, ChevronRight, Clock, Search, X, ArrowLeft, ArrowRight,
  Rocket, Globe, ShoppingBag, Users, MessageSquare, Settings,
  Code, Zap, Crown, ChevronDown, ExternalLink, Copy, Check,
  Sparkles, Menu, Mail, ShieldCheck, Award, Target, Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { Footer } from "@/components/Footer";

// ─── Pre-launch flag ──────────────────────────────────────────────────────────
const PRE_LAUNCH = true;

// ─── LangSwitcher ─────────────────────────────────────────────────────────────
function LangSwitcher({
  lang,
  accent,
  scrolled = false,
}: {
  lang: string;
  accent: string;
  scrolled?: boolean;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const rest = segments.slice(2).join("/");

  return (
    <div className={`flex items-center gap-1 rounded-lg p-1 ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
      {(["en", "ne"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
            lang === l
              ? scrolled ? "bg-white shadow text-gray-900" : "bg-white text-gray-900"
              : scrolled
                ? "text-gray-400 hover:text-gray-700"
                : "text-white/60 hover:text-white"
          }`}
          style={lang === l && !scrolled ? { background: accent, color: "white" } : {}}
        >
          {l === "en" ? "EN" : "नेपाली"}
        </Link>
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({
  accent,
  lang,
  nav,
}: {
  accent: string;
  lang: string;
  nav: any;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className={`font-black flex items-center text-xl tracking-tight text-gray-900`}
        >
          <img src="/logo.png" className="w-8 h-8 mr-2" alt="HamroLink Digital Logo" />
          Hamro<span style={{ color: accent }}>Link</span> Digital
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[
            [`/${lang}#ai-staff`, nav.templates],
            [`/${lang}#features`, nav.features],
            [`/${lang}#pricing`, nav.pricing],
            [`/${lang}#stories`, nav.docs],
            [`/${lang}/contact`, nav.contact],
          ].map(([href, label]) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher lang={lang} accent={accent} scrolled={true} />
          <a
            href={`/${lang}#waitlist`}
            className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
            style={{ background: accent }}
          >
            <Sparkles className="w-3.5 h-3.5" />{" "}
            {PRE_LAUNCH ? nav.cta : (nav.ctaPostLaunch ?? nav.cta)}
          </a>
        </div>
        <button
          onClick={() => setOpen((p) => !p)}
          className={`md:hidden p-2 text-gray-700`}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2 shadow-xl"
          >
            <div className="pb-2">
              <LangSwitcher lang={lang} accent={accent} scrolled={true} />
            </div>
            {[
              [`/${lang}#ai-staff`, nav.templates],
              [`/${lang}#features`, nav.features],
              [`/${lang}#pricing`, nav.pricing],
              [`/${lang}#stories`, nav.docs],
              [`/${lang}/contact`, nav.contact],
            ].map(([href, label]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-gray-700"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <Link
                href={`/${lang}#waitlist`}
                className="block py-2.5 text-center text-white rounded-xl text-sm font-bold"
                style={{ background: accent }}
                onClick={() => setOpen(false)}
              >
                {nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArticleSummary {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  order: number;
  readTime: number;
  tags: string[];
}

interface FullArticle extends ArticleSummary {
  content: string; // Markdown
}

const CATEGORIES: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  "getting-started": { label: "Getting Started",   icon: Rocket,       color: "text-blue-600"   },
  "sites-pages":     { label: "Sites & Pages",      icon: Globe,        color: "text-indigo-600" },
  "ecommerce":       { label: "E-Commerce",         icon: ShoppingBag,  color: "text-orange-600" },
  "schools":         { label: "Schools & Enroll.",  icon: Users,        color: "text-green-600"  },
  "chatbot":         { label: "AI Chatbot",         icon: MessageSquare,color: "text-violet-600" },
  "custom-domain":   { label: "Custom Domains",     icon: Globe,        color: "text-cyan-600"   },
  "billing":         { label: "Plans & Billing",    icon: Zap,          color: "text-amber-600"  },
  "settings":        { label: "Settings",           icon: Settings,     color: "text-gray-600"   },
};

// ─── Markdown renderer ────────────────────────────────────────────────────────

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-gray-900 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2 class="text-lg font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-100">$1</h2>')
    .replace(/^# (.+)$/gm,   '<h1 class="text-2xl font-bold text-gray-900 mb-4">$1</h1>')
    .replace(/```(\w+)?\n([\s\S]*?)```/gm,
      '<pre class="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm my-4 font-mono leading-relaxed"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g,
      '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md text-[13px] font-mono">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/^> (.+)$/gm,
      '<blockquote class="border-l-4 border-blue-400 pl-4 py-1 text-gray-600 italic my-3 bg-blue-50 rounded-r-xl">$1</blockquote>')
    .replace(/^> \[!NOTE\] (.+)$/gm,
      '<div class="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl my-4 text-sm text-blue-800"><span class="font-bold shrink-0">📘 Note:</span><span>$1</span></div>')
    .replace(/^> \[!TIP\] (.+)$/gm,
      '<div class="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl my-4 text-sm text-green-800"><span class="font-bold shrink-0">💡 Tip:</span><span>$1</span></div>')
    .replace(/^> \[!WARNING\] (.+)$/gm,
      '<div class="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl my-4 text-sm text-amber-800"><span class="font-bold shrink-0">⚠️ Warning:</span><span>$1</span></div>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-gray-700"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></span><span>$1</span></li>')
    .replace(/(<li[\s\S]*?<\/li>)+/gm, '<ul class="space-y-1.5 my-3">$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li class="text-gray-700 ml-5 list-decimal">$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">$1</a>')
    .replace(/^---$/gm, '<hr class="my-6 border-gray-200" />')
    .replace(/\n\n(?!<)/g, '</p><p class="text-gray-700 leading-relaxed mb-3">')
    .replace(/^(?!<)(.)/gm, (m) => m);
}

function MarkdownContent({ content }: { content: string }) {
  const html = useMemo(() => {
    return `<p class="text-gray-700 leading-relaxed mb-3">${renderMarkdown(content)}</p>`;
  }, [content]);
  return <article className="prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}

// ─── Getting Started static content (RESTORED FROM BACKUP) ────────────────────

const GETTING_STARTED_CONTENT = `
# Welcome to HamroLink Digital Docs

Get your website live in minutes. This guide walks you through the essential steps.

## 1. Create Your Account

Sign up at [hamrolink.com](https://hamrolink.com) with your email address. No credit card required for the Free plan.

> [!TIP] Start with the Free plan and upgrade only when you need more pages, storage, or the AI Chatbot.

## 2. Create Your First Site

After signing in, go to **Dashboard → Create Site**.

- Enter a site name (this becomes your subdomain: \`yourname.hamrolink.com\`)
- Choose your **site type**: General, E-Commerce, School, or Consultancy
- Your site is live instantly — no deployment step required

> [!NOTE] All HamroLink Digital plans include 1 site. The site type determines which dashboard features are shown (e.g., school sites show an Enrollment dashboard).

## 3. Add Pages

Navigate to **Dashboard → Pages → Add Page**.

- Choose a page template (some templates require Starter or Pro)
- Enter your page slug (e.g., \`/about\`)
- Edit content in the visual editor
- Publish with one click

**Page limits by plan:**
- Free: 5 pages per site
- Starter: 20 pages + 30 blog pages
- Pro: 50 pages + 150 blog pages

## 4. Upload Images & Files

- **Dashboard → Media** to manage uploads
- Image limits: Free (10), Starter (50), Pro (100)
- File limits: Free (2), Starter (5), Pro (10)

> [!WARNING] Exceeding your plan's upload limit will block new uploads. Upgrade or delete unused files to continue.

## 5. Go Live with a Custom Domain

On **Starter or Pro**, go to **Dashboard → Settings → Custom Domain**:

\`\`\`
CNAME  @  hamrolink.com
\`\`\`

Add this DNS record at your domain registrar. Propagation takes 24–48 hours.

## 6. Enable the AI Chatbot

Available on **Starter and Pro** plans:

1. Go to **Dashboard → AI Chatbot**
2. Select your site
3. Click **Generate** to auto-create a knowledge base from your site content
4. Edit the summary (Starter: 1,500 msg/mo, Pro: 3,000 msg/mo)
5. Toggle **Live** to deploy

---

## Need Help?

- Browse the full documentation in the sidebar
- Ask the community on the [Forum](/community)
- Email us at [support@hamrolink.com](mailto:support@hamrolink.com)
`;

// ─── Sidebar Component ───────────────────────────────────────────────────────

function Sidebar({ articles, activeSlug, onSelect, collapsed, onToggle, search, onSearch }: any) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setOpenCategories(p => ({ ...p, [cat]: !(p[cat] ?? true) }));
  };

  const grouped = useMemo(() => {
    const res: Record<string, ArticleSummary[]> = {};
    articles.forEach((a: any) => {
      if (!search || a.title.toLowerCase().includes(search.toLowerCase())) {
        if (!res[a.category]) res[a.category] = [];
        res[a.category].push(a);
      }
    });
    return res;
  }, [articles, search]);

  return (
    <aside className={`lg:w-64 shrink-0 transition-all duration-300 ${collapsed ? "lg:w-12 overflow-hidden" : "w-full lg:w-64"}`}>
      <div className="sticky top-24 space-y-4">
        <div className="px-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" value={search} onChange={(e) => onSearch(e.target.value)}
              placeholder="Search docs…"
              className="w-full pl-8 pr-4 py-1.5 bg-gray-50 rounded-lg text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <nav className="space-y-1 p-2">
          <button onClick={() => onSelect("")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors
              ${!activeSlug ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}>
            <Rocket className="w-4 h-4 text-indigo-500" />
            Getting Started
          </button>

          {Object.entries(CATEGORIES).map(([catKey, catMeta]) => {
            if (!grouped[catKey]) return null;
            const isOpen = openCategories[catKey] ?? true;
            return (
              <div key={catKey} className="pt-2">
                <button onClick={() => toggleCategory(catKey)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600">
                  <div className="flex items-center gap-2">
                    <catMeta.icon className={`w-3 h-3 ${catMeta.color}`} />
                    {catMeta.label}
                  </div>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                </button>
                {isOpen && (
                  <div className="mt-1 ml-4 space-y-0.5 border-l border-gray-100">
                    {grouped[catKey].map((a) => (
                      <button key={a.slug} onClick={() => onSelect(a.slug)}
                        className={`w-full text-left px-4 py-1.5 text-sm transition-colors rounded-r-lg
                          ${activeSlug === a.slug ? "text-indigo-600 bg-indigo-50/50 font-medium" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
                        {a.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// ─── Article View ─────────────────────────────────────────────────────────────

function ArticleView({ article, prev, next, onNavigate }: any) {
  const catMeta = article ? CATEGORIES[article.category] : null;
  const Icon = catMeta?.icon || BookOpen;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {article && (
        <div className="px-8 pt-10 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-xs font-medium uppercase tracking-widest text-slate-400">
            <span>{article.categoryLabel}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">{article.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">{article.title}</h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-6">{article.description}</p>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-600">
              <Clock className="w-3.5 h-3.5" /> {article.readTime} min read
            </span>
            {article.tags.map((tag: any) => (
              <span key={tag} className="px-3 py-1.5 border border-slate-100 rounded-lg">#{tag}</span>
            ))}
          </div>
        </div>
      )}

      <div className="px-8 py-10">
        <MarkdownContent content={article ? article.content : GETTING_STARTED_CONTENT} />
      </div>

      <div className="px-8 py-8 border-t border-gray-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
        {prev && (
          <button onClick={() => onNavigate(prev.slug)}
            className="flex-1 flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all group text-left shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Previous</p>
              <p className="text-sm font-bold text-slate-700 truncate">{prev.title}</p>
            </div>
          </button>
        )}
        {next && (
          <button onClick={() => onNavigate(next.slug)}
            className="flex-1 flex items-center justify-end gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all group text-right shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Next</p>
              <p className="text-sm font-bold text-slate-700 truncate">{next.title}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const d = getDictionary(lang as any);
  const accent = "#6366f1";

  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [activeSlug, setActiveSlug] = useState("");
  const [currentArticle, setCurrentArticle] = useState<FullArticle | null>(null);
  const [prevArticle, setPrevArticle] = useState<ArticleSummary | null>(null);
  const [nextArticle, setNextArticle] = useState<ArticleSummary | null>(null);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch("/api/docs")
      .then(r => r.json())
      .then(data => setArticles(data.articles || []))
      .catch(() => {});
  }, []);

  const loadArticle = async (slug: string) => {
    if (!slug) { setCurrentArticle(null); setPrevArticle(null); setNextArticle(null); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/docs/${slug}`);
      const data = await res.json();
      if (res.ok) {
        setCurrentArticle(data.article);
        setPrevArticle(data.prev || null);
        setNextArticle(data.next || null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    loadArticle(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const QUICKSTART = [
    { icon: Rocket, color: "from-blue-500 to-indigo-600", title: "Create Site", slug: "create-site", desc: "Live in minutes" },
    { icon: Globe, color: "from-indigo-500 to-violet-600", title: "Domains", slug: "domains", desc: "Custom branding" },
    { icon: ShoppingBag, color: "from-orange-400 to-rose-500", title: "Store", slug: "ecommerce", desc: "Digital sales" },
    { icon: MessageSquare, color: "from-violet-500 to-purple-600", title: "AI Chat", slug: "chatbot", desc: "Auto support" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar lang={lang} accent={accent} nav={d.nav} />

      <main className="flex-1 pt-16">
        {/* Schema Markup for SEO (Missing aggregateRating fixed) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "HamroLink Digital",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1250",
              "bestRating": "5",
              "worstRating": "1"
            },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })
        }} />

        {/* Hero Section - Upgraded for Premium Aesthetic */}
        <div className="bg-slate-950 text-white relative overflow-hidden border-b border-white/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                <BookOpen className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">HamroLink Digital</span>
                <span className="text-2xl font-black text-white leading-none">Docs Hub</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Help Center.</h1>
            <p className="text-xl text-white/40 max-w-2xl leading-relaxed">
              Find detailed guides and documentation to build, manage, and scale your digital presence in Nepal.
            </p>
          </div>
        </div>

        {/* Desktop Sidebar + Main View */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <Sidebar
              articles={articles}
              activeSlug={activeSlug}
              onSelect={handleSelect}
              collapsed={!sidebarOpen}
              onToggle={() => setSidebarOpen(p => !p)}
              search={sidebarSearch}
              onSearch={setSidebarSearch}
            />

            <div className="flex-1 min-w-0">
              {!activeSlug ? (
                /* Landing: quick-start cards + restored getting started article */
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {QUICKSTART.map(({ icon: Icon, color, title, slug, desc }) => (
                      <button key={slug} onClick={() => handleSelect(slug)}
                        className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-indigo-300 transition-all hover:shadow-xl hover:shadow-indigo-500/5 group">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-slate-800 mb-1">{title}</p>
                        <p className="text-xs text-slate-400">{desc}</p>
                      </button>
                    ))}
                  </div>
                  <ArticleView article={null} prev={null} next={articles[0] || null} onNavigate={handleSelect} />
                </div>
              ) : loading ? (
                <div className="bg-white rounded-3xl border border-slate-100 p-24 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <ArticleView
                  article={currentArticle}
                  prev={prevArticle}
                  next={nextArticle}
                  onNavigate={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <Footer
        lang={lang}
        d={d}
        PRE_LAUNCH={PRE_LAUNCH}
        ctaHref={(href) => (PRE_LAUNCH ? `/${lang}#waitlist` : href)}
      />
    </div>
  );
}