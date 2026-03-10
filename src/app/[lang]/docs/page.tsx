"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookOpen, ChevronRight, Clock, Search, X, ArrowLeft, ArrowRight,
  Rocket, Globe, ShoppingBag, Users, MessageSquare, Settings,
  Code, Zap, Crown, ChevronDown, ExternalLink, Copy, Check,
} from "lucide-react";
import Link from "next/link";

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

// ─── Static fallback content (shown while real docs load / for demo) ──────────

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

// ─── Markdown renderer (lightweight, no external lib required) ────────────────

function renderMarkdown(md: string): string {
  return md
    // H1-H3
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-gray-900 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2 class="text-lg font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-100">$1</h2>')
    .replace(/^# (.+)$/gm,   '<h1 class="text-2xl font-bold text-gray-900 mb-4">$1</h1>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/gm,
      '<pre class="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm my-4 font-mono leading-relaxed"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g,
      '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md text-[13px] font-mono">$1</code>')
    // Bold / italic
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    // Blockquote
    .replace(/^> (.+)$/gm,
      '<blockquote class="border-l-4 border-blue-400 pl-4 py-1 text-gray-600 italic my-3 bg-blue-50 rounded-r-xl">$1</blockquote>')
    // Callouts: > [!NOTE], > [!TIP], > [!WARNING]
    .replace(/^> \[!NOTE\] (.+)$/gm,
      '<div class="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl my-4 text-sm text-blue-800"><span class="font-bold shrink-0">📘 Note:</span><span>$1</span></div>')
    .replace(/^> \[!TIP\] (.+)$/gm,
      '<div class="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl my-4 text-sm text-green-800"><span class="font-bold shrink-0">💡 Tip:</span><span>$1</span></div>')
    .replace(/^> \[!WARNING\] (.+)$/gm,
      '<div class="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl my-4 text-sm text-amber-800"><span class="font-bold shrink-0">⚠️ Warning:</span><span>$1</span></div>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-gray-700"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></span><span>$1</span></li>')
    .replace(/(<li[\s\S]*?<\/li>)+/gm, '<ul class="space-y-1.5 my-3">$&</ul>')
    // Ordered lists  
    .replace(/^\d+\. (.+)$/gm, '<li class="text-gray-700 ml-5 list-decimal">$1</li>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">$1</a>')
    // HR
    .replace(/^---$/gm, '<hr class="my-6 border-gray-200" />')
    // Paragraphs (double newline)
    .replace(/\n\n(?!<)/g, '</p><p class="text-gray-700 leading-relaxed mb-3">')
    .replace(/^(?!<)(.)/gm, (m) => m); // passthrough
}

// ─── Inline markdown component ────────────────────────────────────────────────

function MarkdownContent({ content }: { content: string }) {
  const html = useMemo(() => {
    const wrapped = `<p class="text-gray-700 leading-relaxed mb-3">${renderMarkdown(content)}</p>`;
    return wrapped;
  }, [content]);

  return (
    <article
      className="prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── Code copy button enhancement ────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handle}
      className="absolute top-3 right-3 p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-gray-300 hover:text-white">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ─── Getting Started static content (shown when no slug) ─────────────────────

const GETTING_STARTED_CONTENT = `
# Welcome to Hamrolink Docs

Get your website live in minutes. This guide walks you through the essential steps.

## 1. Create Your Account

Sign up at [hamrolink.com](https://hamrolink.com) with your email address. No credit card required for the Free plan.

> [!TIP] Start with the Free plan and upgrade only when you need more pages, storage, or the AI Chatbot.

## 2. Create Your First Site

After signing in, go to **Dashboard → Create Site**.

- Enter a site name (this becomes your subdomain: \`yourname.hamrolink.com\`)
- Choose your **site type**: General, E-Commerce, School, or Consultancy
- Your site is live instantly — no deployment step required

> [!NOTE] All plans include 1 site. The site type determines which dashboard features are shown (e.g., school sites show an Enrollment dashboard).

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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ articles, activeSlug, onSelect, collapsed, onToggle, search, onSearch }: {
  articles: ArticleSummary[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  search: string;
  onSearch: (v: string) => void;
}) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // Open all by default
    const all: Record<string, boolean> = {};
    Object.keys(CATEGORIES).forEach((k) => { all[k] = true; });
    return all;
  });

  const grouped = useMemo(() => {
    const filtered = search
      ? articles.filter((a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.description.toLowerCase().includes(search.toLowerCase())
        )
      : articles;

    const g: Record<string, ArticleSummary[]> = {};
    for (const a of filtered) {
      if (!g[a.category]) g[a.category] = [];
      g[a.category].push(a);
    }
    return g;
  }, [articles, search]);

  const toggleCategory = (cat: string) =>
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <aside className={`${collapsed ? "w-0 overflow-hidden" : "w-64"} shrink-0 transition-all duration-300`}>
      <div className="sticky top-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" value={search} onChange={(e) => onSearch(e.target.value)}
              placeholder="Search docs…"
              className="w-full pl-8 pr-8 py-1.5 bg-gray-50 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200" />
            {search && (
              <button onClick={() => onSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <X className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="p-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Getting started link */}
          <button onClick={() => onSelect("")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors mb-1
              ${!activeSlug ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
            <Rocket className="w-3.5 h-3.5 text-blue-500" />
            Getting Started
          </button>

          {Object.entries(CATEGORIES).map(([catKey, catMeta]) => {
            if (!grouped[catKey] || grouped[catKey].length === 0) return null;
            const Icon = catMeta.icon;
            const isOpen = openCategories[catKey] ?? true;

            return (
              <div key={catKey} className="mb-1">
                <button onClick={() => toggleCategory(catKey)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3 h-3 ${catMeta.color}`} />
                    {catMeta.label}
                  </div>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                </button>
                {isOpen && (
                  <div className="ml-5 space-y-0.5">
                    {grouped[catKey].map((article) => (
                      <button key={article.slug} onClick={() => onSelect(article.slug)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2
                          ${activeSlug === article.slug
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                          }`}>
                        <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
                        <span className="truncate">{article.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {search && Object.keys(grouped).length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">No results for "{search}"</p>
          )}
        </nav>
      </div>
    </aside>
  );
}

// ─── Article View ─────────────────────────────────────────────────────────────

function ArticleView({ article, prev, next, onNavigate }: {
  article: FullArticle | null;
  prev: ArticleSummary | null;
  next: ArticleSummary | null;
  onNavigate: (slug: string) => void;
}) {
  const catMeta = article ? CATEGORIES[article.category] : null;
  const Icon    = catMeta?.icon || BookOpen;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Article header */}
      {article && (
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center`}>
              <Icon className={`w-3.5 h-3.5 ${catMeta?.color || "text-gray-500"}`} />
            </div>
            <span className="text-sm text-gray-400 font-medium">{article.categoryLabel}</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-sm text-gray-600">{article.title}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h1>
          <p className="text-gray-500">{article.description}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime} min read</span>
            {article.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-8 py-6">
        {article ? (
          <MarkdownContent content={article.content} />
        ) : (
          <MarkdownContent content={GETTING_STARTED_CONTENT} />
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="px-8 pb-8 border-t border-gray-100 pt-6 flex gap-4">
        {prev ? (
          <button onClick={() => onNavigate(prev.slug)}
            className="flex-1 flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all group text-left">
            <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400 mb-0.5">Previous</p>
              <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 truncate">{prev.title}</p>
            </div>
          </button>
        ) : <div className="flex-1" />}

        {next && (
          <button onClick={() => onNavigate(next.slug)}
            className="flex-1 flex items-center justify-end gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all group text-right">
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400 mb-0.5">Next</p>
              <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 truncate">{next.title}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [articles,        setArticles]        = useState<ArticleSummary[]>([]);
  const [activeSlug,      setActiveSlug]      = useState("");
  const [currentArticle,  setCurrentArticle]  = useState<FullArticle | null>(null);
  const [prevArticle,     setPrevArticle]     = useState<ArticleSummary | null>(null);
  const [nextArticle,     setNextArticle]     = useState<ArticleSummary | null>(null);
  const [sidebarSearch,   setSidebarSearch]   = useState("");
  const [loading,         setLoading]         = useState(false);
  const [sidebarOpen,     setSidebarOpen]     = useState(true);

  // Fetch sidebar articles on mount
  useEffect(() => {
    fetch("/api/docs")
      .then((r) => r.json())
      .then((d) => setArticles(d.articles || []))
      .catch(() => {}); // silently fail — sidebar still shows categories
  }, []);

  // Fetch a specific article
  const loadArticle = async (slug: string) => {
    if (!slug) { setCurrentArticle(null); setPrevArticle(null); setNextArticle(null); return; }
    setLoading(true);
    try {
      const res  = await fetch(`/api/docs/${slug}`);
      const data = await res.json();
      if (res.ok) {
        setCurrentArticle(data.article);
        setPrevArticle(data.prev   || null);
        setNextArticle(data.next   || null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    loadArticle(slug);
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Quick-start cards (shown on landing)
  const QUICKSTART = [
    { icon: Rocket,       color: "from-blue-500 to-indigo-600",   title: "Create your first site",  slug: "create-your-first-site",  desc: "Live in under 5 minutes" },
    { icon: Globe,        color: "from-indigo-500 to-violet-600", title: "Connect a custom domain", slug: "custom-domain-setup",     desc: "Point your DNS to Hamrolink" },
    { icon: ShoppingBag,  color: "from-orange-400 to-rose-500",   title: "Set up your store",       slug: "ecommerce-getting-started", desc: "Products, zones & orders" },
    { icon: MessageSquare,color: "from-violet-500 to-purple-600", title: "Deploy the AI Chatbot",   slug: "chatbot-setup",           desc: "Automate customer support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-400 text-sm font-medium">Hamrolink</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-slate-300 text-sm">Documentation</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-slate-400 text-sm max-w-lg">
            Everything you need to build, manage, and scale your Hamrolink website.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar
            articles={articles}
            activeSlug={activeSlug}
            onSelect={handleSelect}
            collapsed={!sidebarOpen}
            onToggle={() => setSidebarOpen((p) => !p)}
            search={sidebarSearch}
            onSearch={setSidebarSearch}
          />

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {!activeSlug ? (
              /* Landing: quick-start cards + getting started article */
              <div className="space-y-8">
                {/* Quick start grid */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Start</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {QUICKSTART.map(({ icon: Icon, color, title, slug, desc }) => (
                      <button key={slug} onClick={() => handleSelect(slug)}
                        className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all text-left group">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-sm`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 ml-auto shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Getting started article */}
                <ArticleView
                  article={null}
                  prev={null}
                  next={articles[0] || null}
                  onNavigate={handleSelect}
                />

                {/* Forum CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-bold text-lg mb-1">Can't find what you need?</h3>
                    <p className="text-blue-100 text-sm">Ask the community or reach out to support.</p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/community"
                      className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                      <MessageSquare className="w-4 h-4" /> Visit Forum
                    </Link>
                    <a href="mailto:support@hamrolink.com"
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">
                      Email Support
                    </a>
                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Loading article…</p>
                </div>
              </div>
            ) : (
              <ArticleView
                article={currentArticle}
                prev={prevArticle}
                next={nextArticle}
                onNavigate={handleSelect}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}