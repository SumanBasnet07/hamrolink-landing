export type KnowledgeLocale = "en" | "ne";

type KnowledgeSection = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
};

const PRODUCT_DOC_EN = "HamroLiDigital.md";
const CHATBOT_DOC_EN = "HamroLinkChatbot.md";

const EN_SECTIONS: KnowledgeSection[] = [
  {
    id: "product-overview",
    title: "What HamroLink is",
    keywords: ["hamrolink", "platform", "builder", "website", "tenant", "what is"],
    answer:
      "HamroLink is a multi-tenant website builder for Nepal-market use cases. Users can create websites on subdomains, build pages from templates, manage content/media, enable AI tools (editor AI + chatbot), and upgrade plans with platform credits.",
  },
  {
    id: "public-experience",
    title: "Public website experience",
    keywords: ["public", "visitor", "subdomain", "route", "page", "template"],
    answer:
      "Visitors access published sites by subdomain and path-based routing. Dynamic rendering supports business, ecommerce, school, portfolio, restaurant, and related categories.",
  },
  {
    id: "creator-dashboard",
    title: "Creator dashboard",
    keywords: ["dashboard", "creator", "manage", "site", "account", "protected"],
    answer:
      "Authenticated users manage sites, pages, plans, chatbot settings, and account resources through protected create/dashboard flows.",
  },
  {
    id: "auth",
    title: "Authentication",
    keywords: ["auth", "login", "google", "credentials", "session", "jwt", "suspended"],
    answer:
      "HamroLink supports Google OAuth and credentials login. Sign-in can create first-time Google users and block suspended accounts.",
  },
  {
    id: "site-creation",
    title: "Site creation flow",
    keywords: ["create site", "subdomain", "template", "branding", "favicon", "social"],
    answer:
      "Site creation flow: choose template, enter site name/subdomain, validate availability, then submit setup details like branding, favicon, company identity, social links, and category.",
  },
  {
    id: "page-editing",
    title: "Page editing and publishing",
    keywords: ["create page", "edit", "section", "publish", "slug", "content"],
    answer:
      "Pages are created with template categories and route slugs, then edited with section-based structured data, media/style settings, and plan-limited capabilities. Saved content is served on public routes.",
  },
  {
    id: "chatbot-setup",
    title: "Chatbot setup",
    keywords: ["chatbot setup", "personality", "button", "starter prompt", "summary", "enable"],
    answer:
      "Per-site chatbot setup includes enable/disable, knowledge summary, personality + UI settings, launcher button style/label, starter prompts, and optional ecommerce/reservation helper enhancements.",
  },
  {
    id: "chatbot-flow",
    title: "Chatbot response pipeline",
    keywords: ["chatbot", "pipeline", "history", "siteid", "context", "response"],
    answer:
      "Pipeline: frontend sends message, site context, and history; backend validates request and plan allowances; backend loads site summary context; model generates response; optional tools run for booking/product logic; frontend receives response and metadata.",
  },
  {
    id: "pricing-table",
    title: "Plans and pricing",
    keywords: ["price", "pricing", "plan", "free", "local start", "business", "institution", "cost"],
    answer:
      "Seeded plans: free (Rs 0), local_start (Rs 199/mo, Rs 1990/yr), business (Rs 399/mo, Rs 3990/yr), institution_standard (Rs 899/mo, Rs 8990/yr), institution_pro (Rs 2500/mo, Rs 25000/yr). Free has no chatbot/custom domain. Paid tiers include chatbot and custom domain with higher limits.",
  },
 
  {
    id: "subscription",
    title: "Subscription and billing logic",
    keywords: ["subscribe", "renew", "credit", "downgrade", "billing", "yearly", "monthly"],
    answer:
      "Subscriptions are credit-based: choose plan + billing cycle, backend validates session/plan, computes required credits, applies plan with expiration, deducts credits, and invalidates plan cache. Downgrade to free is immediate and may warn if resources exceed free limits.",
  },
  {
    id: "chatbot-benefits",
    title: "Why use HamroLink Chatbot",
    keywords: ["benefit", "why", "lead", "24/7", "conversion", "after hours"],
    answer:
      "HamroLink Chatbot responds instantly, captures more contact-ready leads, keeps business available after office hours, reduces repetitive support, and helps visitors choose plans/services/next steps.",
  },
  {
    id: "chatbot-capabilities",
    title: "Chatbot capabilities",
    keywords: ["can do", "feature", "prompts", "personality", "button style", "context"],
    answer:
      "Capabilities include answering visitor FAQs, recommending next actions, brand-matched personality, pre-built starter prompts, launcher style customization, and responses grounded in business summary context.",
  },
  {
    id: "chatbot-quick-setup",
    title: "How to enable chatbot",
    keywords: ["how to enable", "setup", "steps", "dashboard", "save", "test"],
    answer:
      "Quick setup: open dashboard, go to site settings/chatbot setup, choose site, update business summary, configure style/personality, add starter prompts, enable + save, then test with real questions.",
  },
  {
    id: "chatbot-faq",
    title: "Chatbot FAQ",
    keywords: ["hard", "mobile", "replace support", "lead generation", "change style"],
    answer:
      "FAQ: setup is quick, text/style can be updated anytime, mobile is supported, chatbot handles early/common questions and routes serious leads to contact channels, and it supports lead generation.",
  },
 
];

function scoreSection(query: string, section: KnowledgeSection) {
  const q = query.toLowerCase();
  let score = 0;

  for (const keyword of section.keywords) {
    if (q.includes(keyword)) score += keyword.length > 6 ? 3 : 2;
  }

  const titleParts = section.title.toLowerCase().split(/\s+/);
  for (const part of titleParts) {
    if (part.length > 3 && q.includes(part)) score += 1;
  }

  return score;
}

export function getRelevantKnowledgeSnippets(input: {
  message: string;
  lang?: KnowledgeLocale;
  maxSnippets?: number;
}) {
  const { message, lang = "en", maxSnippets = 4 } = input;

  if (lang === "ne") {
    // Keep source of truth in English docs and let the model answer in Nepali when requested.
    // This avoids maintaining duplicated structured knowledge for each locale.
  }

  const ranked = EN_SECTIONS.map((section) => ({
    section,
    score: scoreSection(message, section),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(maxSnippets, 1));

  const picked = ranked.some((r) => r.score > 0)
    ? ranked
      .filter((r) => r.score > 0)
      .slice(0, Math.max(maxSnippets, 1))
    : [
        { section: EN_SECTIONS[0], score: 0 },
        { section: EN_SECTIONS[12], score: 0 },
        { section: EN_SECTIONS[9], score: 0 },
      ];

  const snippets = picked.map(({ section }) => `${section.title}: ${section.answer}`);
  const topScore = ranked[0]?.score ?? 0;
  const hasKnowledgeMatch = topScore >= 2;

  return {
    sourceDocuments: [PRODUCT_DOC_EN, CHATBOT_DOC_EN],
    snippets,
    topScore,
    hasKnowledgeMatch,
  };
}
