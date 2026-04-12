// app/[lang]/blog/facebook-page-vs-website-nepali-businesses/page.tsx
// Bilingual (EN + NE) blog article — legal-style layout
// JSON-LD: Article + FAQPage + BreadcrumbList schemas
// Deploy: app/[lang]/blog/facebook-page-vs-website-nepali-businesses/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Globe, TrendingUp, Search, ShieldCheck, Share2,
  Sparkles, ArrowRight, ChevronDown, LayoutDashboard,
  Clock, Star, CheckCircle, Building2, Users, Camera,
  AlertTriangle, Zap, Lock,
} from "lucide-react";

// ─── Slug constant ────────────────────────────────────────────────────────────
const SLUG = "facebook-page-vs-website-nepali-businesses";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  return {
    title: ne
      ? "फेसबुक पेज वा वेबसाइट: नेपाली व्यवसायका लागि सही विकल्प"
      : "Facebook Page or Website for Nepali Businesses",
    description: ne
      ? "धेरै नेपाली व्यवसायहरू केवल फेसबुकमा भर पर्छन्। फेसबुक पेज र वेबसाइटको फरक बुझ्नुहोस् — र दुवै किन चाहिन्छ।"
      : "Relying only on Facebook? Learn the key differences between a Facebook page and a website—and why your Nepali business needs both to grow online.",
    keywords: ne
      ? ["फेसबुक पेज बनाम वेबसाइट नेपाल", "नेपाली व्यवसाय अनलाइन", "HamroLink", "साना व्यवसाय वेबसाइट नेपाल"]
      : ["facebook page vs website nepal", "why businesses need websites nepal", "nepali business online presence", "small business website nepal", "facebook business page limitations"],
    openGraph: {
      type: "article",
      locale: ne ? "ne_NP" : "en_US",
      siteName: "HamroLink",
      title: ne
        ? "फेसबुक पेज वा वेबसाइट: नेपाली व्यवसायका लागि सही विकल्प"
        : "Facebook Page or Website for Nepali Businesses",
      description: ne
        ? "फेसबुक पेज र वेबसाइटको फरक बुझ्नुहोस् — र दुवै किन चाहिन्छ।"
        : "Many Nepali businesses rely only on Facebook pages. Learn why that's not enough—and why you need both.",
      url: `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
      images: [
        {
          url: "https://hamrolink.com/website_vs_fb.jpg",
          width: 1200,
          height: 630,
          alt: ne
            ? "फेसबुक पेज बनाम वेबसाइट — नेपाली व्यवसायका लागि"
            : "Facebook Page vs Website — for Nepali businesses",
        },
      ],
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/blog/${SLUG}`,
      languages: {
        "en": `https://hamrolink.com/en/blog/${SLUG}`,
        "ne": `https://hamrolink.com/ne/blog/${SLUG}`,
        "x-default": `https://hamrolink.com/en/blog/${SLUG}`,
      },
    },
  };
}

// ─── JSON-LD: Article ─────────────────────────────────────────────────────────
function ArticleSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ne
      ? "फेसबुक पेज बनाम वेबसाइट: नेपाली व्यवसायलाई दुवै किन चाहिन्छ"
      : "Facebook Page vs Website for Nepali Businesses: Why You Need Both",
    "description": ne
      ? "फेसबुक पेज र वेबसाइटको फरक बुझ्नुहोस् र दुवै किन चाहिन्छ भनी जान्नुहोस्।"
      : "Learn the difference between a Facebook page and a website—and why your Nepali business needs both.",
    "image": {
      "@type": "ImageObject",
      "url": "https://hamrolink.com/website_vs_fb.jpg",
      "width": 1200,
      "height": 630,
      "caption": ne
        ? "फेसबुक पेज बनाम वेबसाइट — नेपाली व्यवसायका लागि"
        : "Facebook Page vs Website — for Nepali businesses",
    },
    "author": {
      "@type": "Organization",
      "name": "HamroLink",
      "url": "https://hamrolink.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "HamroLink",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hamrolink.com/icons/icon-192.png",
      },
    },
    "datePublished": "2026-03-13",
    "dateModified": "2026-03-13",
    "inLanguage": ne ? "ne" : "en",
    "url": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
    },
    "about": {
      "@type": "Thing",
      "name": ne ? "फेसबुक पेज बनाम वेबसाइट नेपाल" : "Facebook Page vs Website Nepal",
    },
    "keywords": ne
      ? "फेसबुक पेज, वेबसाइट, नेपाली व्यवसाय, HamroLink, अनलाइन उपस्थिति"
      : "facebook page vs website, nepali business, HamroLink, online presence nepal",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── JSON-LD: Breadcrumb ──────────────────────────────────────────────────────
function BreadcrumbSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "HamroLink",
        "item": "https://hamrolink.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": ne ? "ब्लग" : "Blog",
        "item": `https://hamrolink.com/${ne ? "ne" : "en"}/blog`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ne
          ? "फेसबुक पेज बनाम वेबसाइट: नेपाली व्यवसायलाई दुवै किन चाहिन्छ"
          : "Facebook Page vs Website for Nepali Businesses: Why You Need Both",
        "item": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── JSON-LD: FAQ ─────────────────────────────────────────────────────────────
function FAQSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const faqs = ne ? FAQ_NE : FAQ_EN;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ_EN = [
  {
    q: "Is a Facebook page enough for a business in Nepal?",
    a: "A Facebook page helps businesses communicate with customers quickly and cheaply, but it does not replace a website. A website provides better search engine visibility, a more professional image, and a platform you fully own and control. For long-term growth, both are important.",
  },
  {
    q: "Why do businesses still need websites if they have Facebook?",
    a: "Websites allow businesses to appear in Google search results, provide detailed information about services, build long-term credibility, and capture customers who search online rather than scroll social media. Facebook reach is also limited by algorithms — your website is always there for anyone who looks.",
  },
  {
    q: "Can small businesses in Nepal easily create websites today?",
    a: "Yes. New platforms like HamroLink make it possible for any small business owner in Nepal to create a professional website in minutes — without coding, without hiring a developer, and without a large budget. Plans at NPR 399 (Starter) and NPR 899 (Pro) per month.",
  },
  {
    q: "What is the main difference between a Facebook page and a website?",
    a: "A Facebook page is a profile on a platform owned by Meta — you do not own it, and you must follow Meta's rules. A website is your own property on the internet. You control the design, content, domain name, and customer experience. Websites also rank on Google, which Facebook pages generally do not.",
  },
  {
    q: "How do Facebook and a website work together for a Nepali business?",
    a: "The best strategy is to use both. Facebook attracts attention — people discover you through posts, shares, and ads. Your website then converts that attention into real customers by providing detailed information, building trust, and making it easy to contact you or place an order. Think of Facebook as the billboard and your website as the shop.",
  },
  {
    q: "Will having a website help me get found on Google?",
    a: "Yes. Google indexes websites and can show them in search results when customers search for your type of business. A well-structured website with the right content can appear for searches like 'restaurant near me', 'school admission Kathmandu', or 'consultancy Nepal' — bringing you customers without any paid advertising.",
  },
];

const FAQ_NE = [
  {
    q: "के नेपालमा व्यवसायका लागि फेसबुक पेज पर्याप्त छ?",
    a: "फेसबुक पेजले व्यवसायहरूलाई ग्राहकहरूसँग छिटो र सस्तोमा सञ्चार गर्न मद्दत गर्छ, तर यसले वेबसाइटलाई प्रतिस्थापन गर्दैन। वेबसाइटले राम्रो खोज इन्जिन दृश्यता, अधिक व्यावसायिक छवि र तपाईंको पूर्ण नियन्त्रणमा रहने प्लेटफर्म प्रदान गर्छ।",
  },
  {
    q: "फेसबुक भएपछि पनि व्यवसायहरूलाई वेबसाइट किन चाहिन्छ?",
    a: "वेबसाइटहरूले व्यवसायहरूलाई Google खोज परिणामहरूमा देखिन, सेवाहरूको विस्तृत जानकारी प्रदान गर्न र दीर्घकालीन विश्वसनीयता बनाउन अनुमति दिन्छ। फेसबुकको पहुँच पनि एल्गोरिदमद्वारा सीमित छ — तपाईंको वेबसाइट जुनसुकै बेला उपलब्ध हुन्छ।",
  },
  {
    q: "के आज नेपालमा साना व्यवसायहरूले सजिलैसँग वेबसाइट बनाउन सक्छन्?",
    a: "हो। HamroLink जस्ता नयाँ प्लेटफर्महरूले नेपालका जुनसुकै साना व्यापार मालिकलाई मिनेटमा व्यावसायिक वेबसाइट बनाउन सम्भव बनाउँछ — कोडिङ बिना, डेभलपर भाड्दा बिना, र ठूलो बजेट बिना। योजनाहरू NPR ३९९ (स्टार्टर) र NPR ८९९ (प्रो) प्रति महिना हुन्।",
  },
  {
    q: "फेसबुक पेज र वेबसाइटबीचको मुख्य फरक के हो?",
    a: "फेसबुक पेज Meta स्वामित्वको प्लेटफर्ममा एउटा प्रोफाइल हो — तपाईंको यसमा स्वामित्व छैन। वेबसाइट भनेको इन्टरनेटमा तपाईंको आफ्नै सम्पत्ति हो। तपाईंले डिजाइन, सामग्री, डोमेन नाम र ग्राहक अनुभव नियन्त्रण गर्नुहुन्छ। वेबसाइटहरू Google मा पनि देखिन्छन्।",
  },
  {
    q: "नेपाली व्यवसायको लागि फेसबुक र वेबसाइट कसरी सँगै काम गर्छन्?",
    a: "सर्वोत्तम रणनीति दुवै प्रयोग गर्नु हो। फेसबुकले ध्यान आकर्षित गर्छ — मानिसहरूले पोस्ट, शेयर र विज्ञापनहरू मार्फत तपाईंलाई भेट्टाउँछन्। तपाईंको वेबसाइटले त्यो ध्यानलाई वास्तविक ग्राहकमा रूपान्तरण गर्छ। फेसबुक बिलबोर्ड हो, तपाईंको वेबसाइट पसल हो।",
  },
  {
    q: "के वेबसाइट भएमा Google मा भेटिन मद्दत गर्छ?",
    a: "हो। Google ले वेबसाइटहरू इन्डेक्स गर्छ र ग्राहकहरूले खोज्दा परिणामहरूमा देखाउन सक्छ। राम्रोसँग बनाइएको वेबसाइट 'मेरो नजिकको रेस्टुरेन्ट', 'काठमाडौं विद्यालय भर्ना' जस्ता खोजहरूमा देखिन सक्छ — कुनै पनि सशुल्क विज्ञापन बिना।",
  },
];

// ─── Comparison table data ────────────────────────────────────────────────────
const COMPARISON_EN = [
  { feature: "You own it",             fb: false, web: true  },
  { feature: "Shows on Google",        fb: false, web: true  },
  { feature: "Custom domain name",     fb: false, web: true  },
  { feature: "Full design control",    fb: false, web: true  },
  { feature: "Accept online payments", fb: false, web: true  },
  { feature: "Free to start",          fb: true,  web: false },
  { feature: "Share updates easily",   fb: true,  web: false },
  { feature: "Reach existing fans",    fb: true,  web: false },
  { feature: "Works without internet algorithms", fb: false, web: true  },
  { feature: "Professional credibility",          fb: false, web: true  },
];

const COMPARISON_NE = [
  { feature: "तपाईंको स्वामित्व",         fb: false, web: true  },
  { feature: "Google मा देखिन्छ",         fb: false, web: true  },
  { feature: "कस्टम डोमेन नाम",           fb: false, web: true  },
  { feature: "पूर्ण डिजाइन नियन्त्रण",    fb: false, web: true  },
  { feature: "अनलाइन भुक्तानी स्वीकार",   fb: false, web: true  },
  { feature: "सुरु गर्न निःशुल्क",        fb: true,  web: false },
  { feature: "अपडेट सजिलैसँग साझा",       fb: true,  web: false },
  { feature: "अवस्थित फ्यानहरूमा पहुँच",  fb: true,  web: false },
  { feature: "एल्गोरिदम बिना काम",        fb: false, web: true  },
  { feature: "व्यावसायिक विश्वसनीयता",    fb: false, web: true  },
];

// ─── Article content ──────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    publishedLabel: "Published by HamroLink · Updated March 2026",
    readTime: "7 min read",
    tocTitle: "Table of Contents",
    toc: [
      { id: "intro",          label: "Introduction" },
      { id: "facebook-default", label: "Why Facebook Became the Default" },
      { id: "fb-problems",    label: "The Problem With Relying Only on Facebook" },
      { id: "website-gives",  label: "What a Website Gives Your Business" },
      { id: "comparison",     label: "Side-by-Side Comparison" },
      { id: "best-strategy",  label: "The Best Strategy: Facebook + Website" },
      { id: "hamrolink",      label: "Making Websites Easier for Nepal" },
      { id: "early-access",   label: "Start Building Today" },
      { id: "faq",            label: "Frequently Asked Questions" },
    ],
    intro: {
      id: "intro",
      icon: Globe,
      color: "blue",
      h2: "Why a Facebook Page Is Not a Website",
      paras: [
        "In Nepal, many small businesses run almost entirely through Facebook. Restaurants post menus there. Clothing stores upload product photos. Freelancers promote their services through posts and messages. For many entrepreneurs, Facebook became the easiest way to get online.",
        "But an important question often goes unnoticed: Is a Facebook page really enough for your business? While Facebook helps businesses reach people quickly, it cannot replace having your own website. Understanding the difference can help you build a stronger, more reliable digital presence — one that works for you 24 hours a day, even when you are not online.",
      ],
      highlights: [
        { icon: "📘", text: "Facebook: free, fast, social" },
        { icon: "🌐", text: "Website: owned, searchable, professional" },
        { icon: "🏆", text: "Best strategy: use both together" },
      ],
    },
    sections: [
      {
        id: "facebook-default",
        icon: Share2,
        color: "blue",
        h2: "Why Facebook Became the Default in Nepal",
        paras: [
          "For many businesses in Nepal, Facebook was the first — and often only — step into the digital world. It is easy to understand why it became so popular.",
        ],
        subsections: [
          {
            icon: "⚡",
            h3: "Easy Setup",
            paras: [
              "Creating a Facebook page takes only a few minutes. Businesses can upload photos, add contact information, write a description, and start posting immediately — all without spending a rupee. For a restaurant owner juggling cooking, staff, and customers, that simplicity is genuinely valuable.",
            ],
          },
          {
            icon: "👥",
            h3: "Everyone Is Already on Facebook",
            paras: [
              "Social media adoption in Nepal is very high, particularly on platforms owned by Meta. Nepal has over 14 million Facebook users as of 2024 — more than 45% of the population. Since customers are already there, businesses naturally followed. Why build something new when your audience is already somewhere?",
            ],
          },
          {
            icon: "🧩",
            h3: "No Technical Knowledge Required",
            paras: [
              "Unlike traditional websites, Facebook pages require no coding, no hosting setup, and no design experience. For many business owners who never studied technology, this simplicity made Facebook the obvious choice. The barrier to entry was essentially zero — and that matters enormously for first-time digital entrepreneurs in Nepal.",
            ],
          },
        ],
      },
      {
        id: "fb-problems",
        icon: AlertTriangle,
        color: "orange",
        h2: "The Problem With Relying Only on Facebook",
        paras: [
          "While Facebook pages are genuinely useful, depending on them alone creates serious risks for your business. Here are the three biggest problems with a Facebook-only strategy.",
        ],
        subsections: [
          {
            icon: "🔒",
            h3: "You Don't Own the Platform",
            paras: [
              "When your entire online presence depends on Facebook, you are building your business on land you do not own. Algorithms can change overnight — what reached 2,000 people last month might reach 200 next month. Post reach can drop without warning. Policies can update at any time, and accounts can be restricted, flagged, or permanently banned.",
              "In 2021, a global Facebook outage took the platform offline for six hours. Every business whose only digital presence was Facebook simply vanished from the internet during that time. Because the platform belongs to Meta, businesses must always adapt to its rules — not the other way around.",
            ],
          },
          {
            icon: "🔍",
            h3: "Customers Can't Easily Find You on Google",
            paras: [
              "Many customers begin their search online — not on Facebook, but on Google. When someone types 'best restaurant Thamel' or 'school admission Kathmandu 2026' into Google, the results show websites, not Facebook pages. Without a website, your business is simply absent from that search.",
              "That means every potential customer who searches on Google — and that is millions of searches every day in Nepal — might never find you. They will find your competitor who has a website, instead.",
            ],
          },
          {
            icon: "🏢",
            h3: "Your Business Looks Less Professional",
            paras: [
              "When customers research a business before making a decision — especially for services like schools, consultancies, clinics, or higher-value purchases — they expect to find a proper website. A website communicates services, products, contact details, pricing, and business information in a clear, organised way.",
              "Businesses with websites consistently appear more established and trustworthy than those with only a Facebook page. In competitive categories, this perception gap directly translates to lost customers.",
            ],
          },
        ],
      },
      {
        id: "website-gives",
        icon: LayoutDashboard,
        color: "emerald",
        h2: "What a Website Gives Your Business",
        paras: [
          "A website is not just an online brochure. For a Nepali business, it is a permanent digital asset that works 24 hours a day. Here is what you gain.",
        ],
        benefits: [
          {
            icon: "🎛",
            title: "Full Control",
            desc: "You control the design, content, and exactly how customers experience your business online. No algorithm can limit who sees your page. No policy change can take away your content.",
          },
          {
            icon: "🔍",
            title: "Search Visibility",
            desc: "Websites can appear in Google search results when customers look for services online. This means new customers discover you every day — for free, without any advertising spend.",
          },
          {
            icon: "⭐",
            title: "Stronger Credibility",
            desc: "A dedicated website signals professionalism, stability, and seriousness. Customers trust businesses with websites more than those without — especially for high-value services.",
          },
          {
            icon: "🛒",
            title: "Online Sales & Booking",
            desc: "Accept orders, reservations, and payments directly on your website via eSewa, Khalti, or bank transfer — 24 hours a day, even when your physical shop is closed.",
          },
          {
            icon: "📊",
            title: "Real Analytics",
            desc: "See exactly how many people visit your site, where they come from, and what they look at. Facebook gives vague 'reach' numbers — a website gives you real, actionable data.",
          },
          {
            icon: "🔗",
            title: "One Professional Link",
            desc: "Share a single, branded URL (yourshop.hamrolink.com or yourdomain.com) on business cards, packaging, WhatsApp, and social media — a permanent address your customers always remember.",
          },
        ],
      },
      {
        id: "comparison",
        icon: TrendingUp,
        color: "violet",
        h2: "Side-by-Side: Facebook Page vs Website",
        paras: [
          "Still unsure which matters more? See the full comparison below. The answer, as you will see, is that they are different tools designed for different jobs — and the strongest businesses use both.",
        ],
        hasComparison: true,
      },
      {
        id: "best-strategy",
        icon: Zap,
        color: "indigo",
        h2: "The Best Strategy: Facebook + Website",
        paras: [
          "The smartest digital approach for a Nepali business is not choosing between Facebook and a website. It is using both together — each doing what it does best.",
          "Social media helps businesses reach audiences quickly, share timely updates, run promotions, and interact with customers in a conversational way. Facebook is excellent at building a community around your brand.",
          "A website provides a stable, professional, searchable home base for your business. It is where customers land when they want to learn more, verify your legitimacy, or take a specific action — like placing an order, making a reservation, or getting directions.",
          "In the most successful digital setups, the two platforms work as a funnel: social media attracts attention and awareness, while the website converts that attention into real customers and real revenue. Think of Facebook as the billboard on the road, and your website as the actual shop it points to.",
        ],
        quote: {
          text: "Facebook brings people to your door. Your website is the door.",
          author: "HamroLink",
        },
      },
      {
        id: "hamrolink",
        icon: Sparkles,
        color: "pink",
        h2: "Making Websites Easier for Nepali Businesses",
        paras: [
          "For many small businesses in Nepal, building a website has traditionally been expensive and complicated — custom development costs NPR 30,000–2,00,000 or more, and the technical complexity puts many business owners off before they even start.",
          "That is one of the reasons we built HamroLink. HamroLink helps individuals and small businesses in Nepal create simple, professional websites without needing technical knowledge or large budgets. Choose from templates built for Nepali businesses — restaurants, schools, consultancies, shops, portfolios — fill in your details, and go live.",
          "The goal is straightforward: help Nepali businesses move beyond social media alone and build a real, owned, searchable digital presence. With plans starting at NPR 399 and NPR 899 per month, getting your own website is now within reach for every business in Nepal.",
        ],
        highlights: [
          { icon: "🇳🇵", text: "Built for Nepal" },
          { icon: "⚡", text: "Live in under 60 minutes" },
          { icon: "💰", text: "NPR 399 & 899/month" },
        ],
      },
    ],
    earlyAccess: {
      badge: "🚀 Now Live in Nepal",
      h2: "Start Building Your Online Presence",
      paras: [
        "If your business currently relies only on Facebook, now is a good time to expand your online presence. With a website, customers can discover your business on Google, learn about your services anytime, and contact you with confidence.",
        "Start for free on HamroLink and build your own website — no coding required, no large upfront cost, and no technical team needed.",
      ],
      cta: "Start for Free",
      ctaHref: "https://app.hamrolink.com",
      trust: ["Start for Free", "No credit card required", "Cancel anytime"],
    },
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything Nepali business owners ask about Facebook pages vs websites.",
    shareLabel: "Share this article",
    relatedLabel: "You might also find helpful",
    related: [
      { label: "Why Nepali Businesses Don't Have Websites", href: "/en/blog/why-nepali-businesses-dont-have-websites" },
      { label: "HamroLink Pricing", href: "/en#pricing" },
      { label: "Start for Free", href: "https://app.hamrolink.com" },
    ],
  },

  ne: {
    publishedLabel: "HamroLink द्वारा प्रकाशित · मार्च २०२६ मा अपडेट",
    readTime: "७ मिनेट पढाइ",
    tocTitle: "सामग्री तालिका",
    toc: [
      { id: "intro",            label: "परिचय" },
      { id: "facebook-default", label: "फेसबुक डिफल्ट किन बन्यो" },
      { id: "fb-problems",      label: "केवल फेसबुकमा भर पर्दाका समस्याहरू" },
      { id: "website-gives",    label: "वेबसाइटले व्यवसायलाई के दिन्छ" },
      { id: "comparison",       label: "तुलनात्मक तालिका" },
      { id: "best-strategy",    label: "सर्वोत्तम रणनीति: फेसबुक + वेबसाइट" },
      { id: "hamrolink",        label: "नेपालका लागि वेबसाइट सजिलो बनाउँदै" },
      { id: "early-access",     label: "आज नै सुरु गर्नुहोस्" },
      { id: "faq",              label: "बारम्बार सोधिने प्रश्नहरू" },
    ],
    intro: {
      id: "intro",
      icon: Globe,
      color: "blue",
      h2: "फेसबुक पेज वेबसाइट होइन",
      paras: [
        "नेपालमा, धेरै साना व्यवसायहरू लगभग पूर्ण रूपमा फेसबुकमार्फत चल्छन्। रेस्टुरेन्टहरूले त्यहाँ मेनु पोस्ट गर्छन्। कपडा पसलहरूले उत्पादनका फोटोहरू अपलोड गर्छन्। फ्रिल्यान्सरहरूले पोस्ट र सन्देशहरूमार्फत आफ्नो सेवाहरू प्रवर्द्धन गर्छन्। धेरै उद्यमीहरूका लागि, फेसबुक अनलाइन जाने सबैभन्दा सजिलो तरिका बन्यो।",
        "तर एउटा महत्त्वपूर्ण प्रश्न प्रायः ध्यानमा आउँदैन: के फेसबुक पेज तपाईंको व्यवसायका लागि साँच्चै पर्याप्त छ? फेसबुकले व्यवसायहरूलाई छिटो मानिसहरूसम्म पुग्न मद्दत गर्छ, तर यसले आफ्नै वेबसाइट हुनुलाई प्रतिस्थापन गर्न सक्दैन। फरक बुझ्नाले तपाईंलाई बलियो, भरपर्दो डिजिटल उपस्थिति बनाउन मद्दत गर्छ।",
      ],
      highlights: [
        { icon: "📘", text: "फेसबुक: निःशुल्क, छिटो, सामाजिक" },
        { icon: "🌐", text: "वेबसाइट: स्वामित्व, खोज्न योग्य, व्यावसायिक" },
        { icon: "🏆", text: "सर्वोत्तम रणनीति: दुवै सँगै प्रयोग गर्नुहोस्" },
      ],
    },
    sections: [
      {
        id: "facebook-default",
        icon: Share2,
        color: "blue",
        h2: "नेपालमा फेसबुक डिफल्ट किन बन्यो",
        paras: [
          "नेपालका धेरै व्यवसायहरूका लागि, फेसबुक डिजिटल संसारमा पहिलो — र प्रायः एकमात्र — कदम थियो। यो किन यति लोकप्रिय भयो भनी बुझ्न सजिलो छ।",
        ],
        subsections: [
          {
            icon: "⚡",
            h3: "सजिलो सेटअप",
            paras: [
              "फेसबुक पेज बनाउन केही मिनेट मात्र लाग्छ। व्यवसायहरूले फोटो अपलोड गर्न, सम्पर्क जानकारी थप्न, विवरण लेख्न र एक रुपियाँ नखर्ची तुरुन्त पोस्ट गर्न थाल्न सक्छन्। खाना पकाउने, कर्मचारी र ग्राहकहरू सम्हाल्ने रेस्टुरेन्ट मालिकका लागि, यो सरलता वास्तवमा मूल्यवान छ।",
            ],
          },
          {
            icon: "👥",
            h3: "सबै पहिले नै फेसबुकमा छन्",
            paras: [
              "नेपालमा सामाजिक सञ्जाल अपनाउने दर धेरै उच्च छ। नेपालमा २०२४ सम्म १ करोड ४० लाखभन्दा बढी फेसबुक प्रयोगकर्ताहरू छन् — जनसंख्याको ४५% भन्दा बढी। ग्राहकहरू पहिले नै त्यहाँ भएकाले, व्यवसायहरू स्वाभाविक रूपमा त्यही गए। नयाँ केही किन बनाउने जब तपाईंको दर्शक पहिले नै कतैमा छन्?",
            ],
          },
          {
            icon: "🧩",
            h3: "कुनै प्राविधिक ज्ञान आवश्यक छैन",
            paras: [
              "परम्परागत वेबसाइटहरूको विपरीत, फेसबुक पेजहरूलाई कुनै कोडिङ, होस्टिङ सेटअप वा डिजाइन अनुभव आवश्यक छैन। कहिल्यै प्रविधि नपढेका धेरै व्यापार मालिकहरूका लागि, यो सरलताले फेसबुकलाई स्पष्ट छनोट बनायो। प्रवेश बाधा लगभग शून्य थियो।",
            ],
          },
        ],
      },
      {
        id: "fb-problems",
        icon: AlertTriangle,
        color: "orange",
        h2: "केवल फेसबुकमा भर पर्दाका समस्याहरू",
        paras: [
          "फेसबुक पेजहरू वास्तवमा उपयोगी छन्, तर केवल तिनैमा भर पर्नाले तपाईंको व्यवसायमा गम्भीर जोखिम उत्पन्न हुन्छ। यहाँ तीनवटा सबैभन्दा ठूलो समस्याहरू छन्।",
        ],
        subsections: [
          {
            icon: "🔒",
            h3: "तपाईंको प्लेटफर्ममा स्वामित्व छैन",
            paras: [
              "जब तपाईंको सम्पूर्ण अनलाइन उपस्थिति फेसबुकमा निर्भर हुन्छ, तपाईं आफ्नो नभएको जग्गामा व्यवसाय बनाइरहनुभएको छ। एल्गोरिदमहरू रातोरात बदलिन सक्छन् — गत महिना २,०००  मानिससम्म पुगेको पोस्ट अर्को महिना २०० मा सीमित हुन सक्छ। खाता प्रतिबन्धित वा स्थायी रूपमा बन्द हुन सक्छ।",
              "२०२१ मा, विश्वव्यापी फेसबुक आउटेजले प्लेटफर्मलाई छ घण्टाका लागि अफलाइन राख्यो। जसको एकमात्र डिजिटल उपस्थिति फेसबुक थियो, उनीहरूको व्यवसाय त्यो अवधिमा इन्टरनेटबाट अदृश्य भयो। प्लेटफर्म Meta को भएकाले, व्यवसायहरूले सधैं यसका नियमहरूमा अनुकूलित हुनुपर्छ।",
            ],
          },
          {
            icon: "🔍",
            h3: "ग्राहकहरूले Google मा तपाईंलाई सजिलैसँग भेट्टाउन सक्दैनन्",
            paras: [
              "धेरै ग्राहकहरू फेसबुकमा होइन, Google मा आफ्नो खोज सुरु गर्छन्। जब कोही Google मा 'थमेलको सबैभन्दा राम्रो रेस्टुरेन्ट' वा 'काठमाडौं विद्यालय भर्ना २०२५' टाइप गर्छ, परिणामहरूले वेबसाइटहरू देखाउँछन्, फेसबुक पेजहरू होइन। वेबसाइट बिना, तपाईंको व्यवसाय त्यो खोजबाट पूर्णतः अनुपस्थित छ।",
              "यसको अर्थ Google मा खोज्ने हरेक सम्भावित ग्राहक — र नेपालमा हरेक दिन लाखौं खोजहरू हुन्छन् — तपाईंलाई कहिल्यै नभेट्न सक्छ। उनीहरूले वेबसाइट भएको तपाईंको प्रतिस्पर्धीलाई भेट्टाउनेछन्।",
            ],
          },
          {
            icon: "🏢",
            h3: "तपाईंको व्यवसाय कम व्यावसायिक देखिन्छ",
            paras: [
              "जब ग्राहकहरूले निर्णय गर्नुअघि व्यवसाय अनुसन्धान गर्छन् — विशेष गरी विद्यालय, परामर्श, क्लिनिक जस्ता सेवाहरूका लागि — उनीहरू उचित वेबसाइट भेट्टाउने अपेक्षा गर्छन्। वेबसाइटले सेवाहरू, उत्पादनहरू, सम्पर्क विवरण र व्यावसायिक जानकारी स्पष्ट, व्यवस्थित तरिकामा सञ्चार गर्छ।",
              "वेबसाइट भएका व्यवसायहरू केवल फेसबुक पेज भएकाहरूभन्दा सधैं अधिक स्थापित र भरपर्दो देखिन्छन्। प्रतिस्पर्धी क्षेत्रहरूमा, यो धारणाको अन्तरले सीधै ग्राहक गुमाउन पुर्‍याउँछ।",
            ],
          },
        ],
      },
      {
        id: "website-gives",
        icon: LayoutDashboard,
        color: "emerald",
        h2: "वेबसाइटले तपाईंको व्यवसायलाई के दिन्छ",
        paras: [
          "वेबसाइट केवल अनलाइन पुस्तिका होइन। नेपाली व्यवसायका लागि, यो दिनको २४ घण्टा काम गर्ने स्थायी डिजिटल सम्पत्ति हो।",
        ],
        benefits: [
          {
            icon: "🎛",
            title: "पूर्ण नियन्त्रण",
            desc: "तपाईंले डिजाइन, सामग्री र ग्राहकहरूले कसरी तपाईंको व्यवसाय अनलाइन अनुभव गर्छन् भनी नियन्त्रण गर्नुहुन्छ। कुनै एल्गोरिदमले तपाईंको पेज कसले देख्छ भनी सीमित गर्न सक्दैन।",
          },
          {
            icon: "🔍",
            title: "खोज दृश्यता",
            desc: "ग्राहकहरूले अनलाइन सेवाहरू खोज्दा वेबसाइटहरू Google खोज परिणामहरूमा देखिन सक्छन् — कुनै विज्ञापन खर्च बिना।",
          },
          {
            icon: "⭐",
            title: "बलियो विश्वसनीयता",
            desc: "समर्पित वेबसाइटले व्यावसायिकता र स्थिरताको संकेत दिन्छ। ग्राहकहरूले वेबसाइट भएका व्यवसायहरूलाई नभएकाहरूभन्दा बढी विश्वास गर्छन्।",
          },
          {
            icon: "🛒",
            title: "अनलाइन बिक्री र बुकिङ",
            desc: "eSewa, Khalti वा बैंक ट्रान्सफरमार्फत सीधै अर्डर, आरक्षण र भुक्तानी स्वीकार गर्नुहोस् — दिनको २४ घण्टा, भौतिक पसल बन्द हुँदा पनि।",
          },
          {
            icon: "📊",
            title: "वास्तविक एनालिटिक्स",
            desc: "ठीक कति मानिसहरूले तपाईंको साइट भ्रमण गरे, कहाँबाट आए र के हेरे भनी हेर्नुहोस्। फेसबुकले अस्पष्ट 'पहुँच' संख्या दिन्छ — वेबसाइटले वास्तविक डेटा दिन्छ।",
          },
          {
            icon: "🔗",
            title: "एउटा व्यावसायिक लिङ्क",
            desc: "व्यापार कार्ड, प्याकेजिङ, WhatsApp र सामाजिक सञ्जालमा एकल, ब्रान्डेड URL साझा गर्नुहोस् — तपाईंका ग्राहकहरूले सधैं सम्झने स्थायी ठेगाना।",
          },
        ],
      },
      {
        id: "comparison",
        icon: TrendingUp,
        color: "violet",
        h2: "तुलना: फेसबुक पेज बनाम वेबसाइट",
        paras: [
          "अझै कुन बढी महत्त्वपूर्ण छ भनी अनिश्चित हुनुहुन्छ? तलको पूर्ण तुलना हेर्नुहोस्। जवाफ, जस्तो तपाईंले देख्नुहुनेछ, यो हो कि तिनीहरू फरक-फरक कामका लागि डिजाइन गरिएका फरक उपकरणहरू हुन् — र बलियो व्यवसायहरूले दुवै प्रयोग गर्छन्।",
        ],
        hasComparison: true,
      },
      {
        id: "best-strategy",
        icon: Zap,
        color: "indigo",
        h2: "सर्वोत्तम रणनीति: फेसबुक + वेबसाइट",
        paras: [
          "नेपाली व्यवसायका लागि सबैभन्दा स्मार्ट डिजिटल दृष्टिकोण फेसबुक र वेबसाइटबीच छनोट गर्नु होइन। यो दुवैलाई सँगै प्रयोग गर्नु हो — प्रत्येकले आफू राम्रो गर्ने काम गर्दै।",
          "सामाजिक सञ्जालले व्यवसायहरूलाई छिटो दर्शकहरूमा पुग्न, समयमै अपडेटहरू साझा गर्न, प्रवर्द्धनहरू चलाउन र ग्राहकहरूसँग वार्तालापात्मक तरिकामा अन्तर्क्रिया गर्न मद्दत गर्छ। फेसबुक तपाईंको ब्रान्डवरिपरि समुदाय निर्माण गर्नमा उत्कृष्ट छ।",
          "वेबसाइटले तपाईंको व्यवसायका लागि स्थिर, व्यावसायिक, खोज्न सकिने आधार प्रदान गर्छ। ग्राहकहरूले थप जान्न, तपाईंको वैधता प्रमाणित गर्न वा विशेष कार्य गर्न — जस्तै अर्डर गर्न, आरक्षण गर्न वा दिशा प्राप्त गर्न — आउँदा यहाँ आउँछन्।",
          "सबैभन्दा सफल डिजिटल सेटअपमा, दुई प्लेटफर्महरू फनेलको रूपमा काम गर्छन्: सामाजिक सञ्जालले ध्यान र जागरूकता आकर्षित गर्छ, जबकि वेबसाइटले त्यो ध्यानलाई वास्तविक ग्राहक र वास्तविक राजस्वमा रूपान्तरण गर्छ। फेसबुकलाई सडकमा बिलबोर्ड र तपाईंको वेबसाइटलाई त्यसले औंल्याउने वास्तविक पसल ठान्नुहोस्।",
        ],
        quote: {
          text: "फेसबुकले मानिसहरूलाई तपाईंको ढोकामा ल्याउँछ। तपाईंको वेबसाइट नै ढोका हो।",
          author: "HamroLink",
        },
      },
      {
        id: "hamrolink",
        icon: Sparkles,
        color: "pink",
        h2: "नेपाली व्यवसायका लागि वेबसाइट सजिलो बनाउँदै",
        paras: [
          "नेपालका धेरै साना व्यवसायहरूका लागि, वेबसाइट बनाउनु परम्परागत रूपमा महँगो र जटिल थियो — कस्टम विकास लागत NPR ३०,०००–२,००,००० वा बढी, र प्राविधिक जटिलताले धेरै व्यापार मालिकहरूलाई सुरु गर्नुअघि नै हतोत्साहित पार्छ।",
          "त्यसैले हामीले HamroLink बनायौं। HamroLink ले नेपालका व्यक्ति र साना व्यवसायहरूलाई प्राविधिक ज्ञान वा ठूलो बजेट बिना सरल, व्यावसायिक वेबसाइट बनाउन मद्दत गर्छ। नेपाली व्यवसायका लागि बनाइएका टेम्प्लेटहरू — रेस्टुरेन्ट, विद्यालय, परामर्श, पसल, पोर्टफोलियो — मध्ये छान्नुहोस्, विवरण भर्नुहोस् र लाइभ जानुहोस्।",
          "लक्ष्य सरल छ: नेपाली व्यवसायहरूलाई केवल सामाजिक सञ्जालभन्दा बाहिर गएर वास्तविक, स्वामित्वमा रहेको, खोज्न सकिने डिजिटल उपस्थिति बनाउन मद्दत गर्नु। NPR ३९९ र NPR ८९९ प्रति महिनाका योजनाहरूसँग, आफ्नै वेबसाइट पाउनु नेपालको हरेक व्यवसायको पहुँचभित्र आएको छ।",
        ],
        highlights: [
          { icon: "🇳🇵", text: "नेपालका लागि बनाइएको" },
          { icon: "⚡", text: "६० मिनेटभित्र लाइभ" },
          { icon: "💰", text: "NPR ३९९ र ८९९/महिना" },
        ],
      },
    ],
    earlyAccess: {
      badge: "🚀 अब नेपालमा लाइभ",
      h2: "तपाईंको अनलाइन उपस्थिति निर्माण सुरु गर्नुहोस्",
      paras: [
        "यदि तपाईंको व्यवसाय हाल केवल फेसबुकमा भर पर्छ भने, अहिले तपाईंको अनलाइन उपस्थिति विस्तार गर्ने राम्रो समय हो। वेबसाइटसँग, ग्राहकहरूले Google मा तपाईंको व्यवसाय पत्ता लगाउन सक्छन्, जुनसुकै बेला तपाईंको सेवाहरूबारे जान्न सक्छन् र आत्मविश्वासका साथ सम्पर्क गर्न सक्छन्।",
        "HamroLink मा नि:शुल्क सुरु गर्नुहोस् र आफ्नै वेबसाइट बनाउन सुरु गर्नुहोस् — कुनै कोडिङ आवश्यक छैन, ठूलो अग्रिम लागत छैन र प्राविधिक टोली आवश्यक छैन।",
      ],
      cta: "नि:शुल्क सुरु गर्नुहोस्",
      ctaHref: "https://app.hamrolink.com",
      trust: ["नि:शुल्क सुरु गर्नुहोस्", "क्रेडिट कार्ड आवश्यक छैन", "जुनसुकै बेला रद्द गर्न सकिन्छ"],
    },
    faqTitle: "बारम्बार सोधिने प्रश्नहरू",
    faqSubtitle: "फेसबुक पेज बनाम वेबसाइटबारे नेपाली व्यापार मालिकहरूले सोध्ने सबै कुरा।",
    shareLabel: "यो लेख साझा गर्नुहोस्",
    relatedLabel: "तपाईंलाई उपयोगी लाग्न सक्छ",
    related: [
      { label: "नेपाली व्यवसायसँग वेबसाइट किन छैन", href: "/ne/blog/why-nepali-businesses-dont-have-websites" },
      { label: "HamroLink मूल्य निर्धारण", href: "/ne#pricing" },
      { label: "नि:शुल्क सुरु गर्नुहोस्", href: "https://app.hamrolink.com" },
    ],
  },
};

// ─── Color map ────────────────────────────────────────────────────────────────
const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; badgeText: string; icon: string }> = {
  blue:   { bg:"bg-blue-50",   border:"border-blue-100",   text:"text-blue-700",   badge:"bg-blue-100",   badgeText:"text-blue-700",   icon:"bg-blue-100"   },
  orange: { bg:"bg-orange-50", border:"border-orange-100", text:"text-orange-700", badge:"bg-orange-100", badgeText:"text-orange-700", icon:"bg-orange-100" },
  emerald:{ bg:"bg-emerald-50",border:"border-emerald-100",text:"text-emerald-700",badge:"bg-emerald-100",badgeText:"text-emerald-700",icon:"bg-emerald-100" },
  violet: { bg:"bg-violet-50", border:"border-violet-100", text:"text-violet-700", badge:"bg-violet-100", badgeText:"text-violet-700", icon:"bg-violet-100" },
  indigo: { bg:"bg-indigo-50", border:"border-indigo-100", text:"text-indigo-700", badge:"bg-indigo-100", badgeText:"text-indigo-700", icon:"bg-indigo-100" },
  pink:   { bg:"bg-pink-50",   border:"border-pink-100",   text:"text-pink-700",   badge:"bg-pink-100",   badgeText:"text-pink-700",   icon:"bg-pink-100"   },
};

// ─── FAQ accordion (HTML details/summary — no JS, SSR-safe) ──────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-gray-200 rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
        <span className="font-bold text-gray-900 text-sm leading-relaxed">{q}</span>
        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200"/>
      </summary>
      <div className="px-6 pb-5 pt-1 border-t border-gray-100">
        <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

// ─── Comparison table ─────────────────────────────────────────────────────────
function ComparisonTable({ lang }: { lang: string }) {
  const ne   = lang === "ne";
  const rows = ne ? COMPARISON_NE : COMPARISON_EN;
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="grid grid-cols-3 bg-gray-900 text-white text-sm font-black">
        <div className="px-4 py-3 text-gray-400">{ne ? "सुविधा" : "Feature"}</div>
        <div className="px-4 py-3 text-center bg-blue-800 flex items-center justify-center gap-1.5">
          <span>📘</span> {ne ? "फेसबुक पेज" : "Facebook Page"}
        </div>
        <div className="px-4 py-3 text-center bg-indigo-700 flex items-center justify-center gap-1.5">
          <span>🌐</span> {ne ? "वेबसाइट" : "Website"}
        </div>
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div key={row.feature} className={`grid grid-cols-3 border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
          <div className="px-4 py-3 text-sm text-gray-700 font-medium">{row.feature}</div>
          <div className="px-4 py-3 flex items-center justify-center">
            {row.fb
              ? <CheckCircle className="w-5 h-5 text-green-500"/>
              : <span className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-gray-300"/></span>
            }
          </div>
          <div className="px-4 py-3 flex items-center justify-center">
            {row.web
              ? <CheckCircle className="w-5 h-5 text-green-500"/>
              : <span className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-gray-300"/></span>
            }
          </div>
        </div>
      ))}
      {/* Footer callout */}
      <div className="bg-indigo-50 border-t border-indigo-100 px-4 py-3 text-xs text-indigo-700 font-semibold text-center">
        {ne
          ? "💡 सर्वोत्तम रणनीति: दुवैलाई सँगै प्रयोग गर्नुहोस् — फेसबुकले ध्यान आकर्षित गर्छ, वेबसाइटले रूपान्तरण गर्छ"
          : "💡 Best strategy: use both together — Facebook attracts, website converts"}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogFacebookVsWebsitePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const ne   = lang === "ne";
  const c    = ne ? CONTENT.ne : CONTENT.en;
  const faqs = ne ? FAQ_NE : FAQ_EN;

  return (
    <>
      {/* ── JSON-LD ─────────────────────────────────────────────────────── */}
      <ArticleSchema lang={lang}/>
      <BreadcrumbSchema lang={lang}/>
      <FAQSchema lang={lang}/>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">

        {/* ── Sticky top bar ──────────────────────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href={`/${lang}`} className="hover:text-gray-700 transition-colors font-medium">HamroLink</Link>
              <span>/</span>
              <Link href={`/${lang}/blog`} className="hover:text-gray-700 transition-colors">{ne ? "ब्लग" : "Blog"}</Link>
              <span>/</span>
              <span className="text-gray-600 font-medium truncate max-w-[180px]">
                {ne ? "फेसबुक बनाम वेबसाइट" : "Facebook vs Website"}
              </span>
            </nav>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(["en","ne"] as const).map(l => (
                <Link key={l} href={`/${l}/blog/${SLUG}`}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang===l ? "bg-white shadow text-gray-900" : "text-gray-400 hover:text-gray-700"}`}>
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cinematic featured image hero ───────────────────────────────── */}
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[520px]">
            <Image
              src="/website_vs_fb.jpg"
              alt={ne
                ? "फेसबुक पेज बनाम वेबसाइट — नेपाली व्यवसायका लागि"
                : "Facebook Page vs Website — for Nepali businesses"}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Gradient overlays for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-700/20"/>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-transparent"/>
          </div>

          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto w-full px-6 pb-10 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/80 backdrop-blur-sm">
                  <Globe className="w-3.5 h-3.5"/>
                  {ne ? "डिजिटल नेपाल" : "Digital Nepal"}
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/35">
                  <Camera className="w-3 h-3"/>
                  {ne ? "तस्बिर: HamroLink" : "Photo: HamroLink"}
                </div>
              </div>

              <h1 className="font-black leading-tight mb-4 text-white drop-shadow-lg text-3xl sm:text-4xl lg:text-5xl">
                {ne
                  ? <>फेसबुक पेज वेबसाइट होइन —<br className="hidden sm:block"/> नेपाली व्यवसायलाई दुवै किन चाहिन्छ</>
                  : <>Why a Facebook Page Is Not a Website —<br className="hidden sm:block"/> And Why Your Business Needs Both</>}
              </h1>

              <p className="text-white/75 text-base sm:text-lg max-w-2xl leading-relaxed mb-5 drop-shadow">
                {ne
                  ? "नेपालका धेरै व्यवसायहरू केवल फेसबुकमा भर पर्छन् — तर यसले पुग्दैन।"
                  : "Many Nepali businesses rely only on Facebook — but that's not enough for long-term growth."}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4"/>
                  <span>HamroLink</span>
                </div>
                <div className="w-px h-3 bg-white/20"/>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4"/>
                  <span>{c.readTime}</span>
                </div>
                <div className="w-px h-3 bg-white/20"/>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4"/>
                  <span>{c.publishedLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image caption strip */}
        <div className="max-w-5xl mx-auto px-6 py-3 border-b border-gray-100">
          <p className="text-xs text-gray-400 italic flex items-center gap-1.5">
            <Camera className="w-3 h-3 shrink-0"/>
            {ne
              ? "माथिको तस्बिर: फेसबुक पेज बनाम वेबसाइट — नेपाली व्यवसायको डिजिटल उपस्थितिको छनोट"
              : "Above: Facebook Page vs Website — the digital presence choice facing Nepali businesses today"}
          </p>
        </div>

        {/* ── Main layout ─────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex gap-12">

            {/* Sticky TOC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-20">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{c.tocTitle}</p>
                <nav className="space-y-1">
                  {c.toc.map(item => (
                    <a key={item.id} href={`#${item.id}`}
                      className="block text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors leading-snug">
                      {item.label}
                    </a>
                  ))}
                </nav>
                {/* Sidebar CTA */}
                <div className="mt-8 p-4 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white text-center">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-80"/>
                  <p className="text-xs font-black mb-3 leading-snug">
                    {ne ? "HamroLink अब लाइभ छ" : "HamroLink is now live"}
                  </p>
                  <a href={c.earlyAccess.ctaHref}
                    className="block w-full py-2 bg-white text-indigo-700 rounded-xl text-xs font-black hover:bg-indigo-50 transition-colors">
                    {ne ? "नि:शुल्क सुरु गर्नुहोस्" : "Start for Free"}
                  </a>
                </div>
              </div>
            </aside>

            {/* Article body */}
            <article className="flex-1 min-w-0 space-y-14">

              {/* ── Inline featured image ── */}
              <figure className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg -mt-2">
                <div className="relative w-full aspect-[16/7]">
                  <Image
                    src="/website_vs_fb.jpg"
                    alt={ne
                      ? "फेसबुक पेज बनाम वेबसाइट — नेपाली व्यवसायको डिजिटल उपस्थिति"
                      : "Facebook Page vs Website — the digital presence choice for Nepali businesses"}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full flex">
                      <div className="flex-1 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end pb-3 pl-4">
                        <span className="text-white text-xs font-black tracking-wide uppercase opacity-90">
                          📘 {ne ? "फेसबुक पेज" : "Facebook Page"}
                        </span>
                      </div>
                      <div className="flex-1 bg-gradient-to-t from-indigo-700/80 to-transparent flex items-end pb-3 pl-4">
                        <span className="text-white text-xs font-black tracking-wide uppercase opacity-90">
                          🌐 {ne ? "वेबसाइट" : "Website"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <figcaption className="bg-gray-50 border-t border-gray-100 px-4 py-2.5 flex items-center gap-2 text-xs text-gray-400 italic">
                  <Camera className="w-3 h-3 shrink-0 text-gray-300"/>
                  {ne
                    ? "फेसबुक पेज बनाम वेबसाइट: नेपाली व्यवसायहरूको डिजिटल उपस्थितिको विकल्प — © HamroLink"
                    : "Facebook Page vs Website: the digital presence choice for Nepali businesses — © HamroLink"}
                </figcaption>
              </figure>

              {/* ── INTRO SECTION ── */}
              {(() => {
                const sec  = c.intro;
                const colors = colorMap[sec.color];
                const Icon   = sec.icon;
                return (
                  <section key={sec.id} id={sec.id} className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${colors.text}`}/>
                      </div>
                      <h2 className="text-2xl font-black text-gray-900">{sec.h2}</h2>
                    </div>
                    <div className="pl-[52px] space-y-4">
                      {sec.paras.map((p: string, i: number) => (
                        <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                      ))}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {sec.highlights.map((h: any) => (
                          <div key={h.text} className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${colors.bg} ${colors.border} border rounded-full text-sm font-semibold ${colors.text}`}>
                            <span>{h.icon}</span> {h.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })()}

              {/* ── MAIN CONTENT SECTIONS ── */}
              {c.sections.map((sec: any) => {
                const colors = colorMap[sec.color] ?? colorMap.blue;
                const Icon   = sec.icon;
                return (
                  <section key={sec.id} id={sec.id} className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${colors.text}`}/>
                      </div>
                      <h2 className="text-2xl font-black text-gray-900">{sec.h2}</h2>
                    </div>
                    <div className="pl-[52px] space-y-4">
                      {sec.paras.map((p: string, i: number) => (
                        <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                      ))}

                      {/* H3 subsections */}
                      {sec.subsections && (
                        <div className="space-y-8 pt-4">
                          {sec.subsections.map((sub: any) => (
                            <div key={sub.h3}>
                              <div className="flex items-center gap-2.5 mb-3">
                                <span className="text-xl">{sub.icon}</span>
                                <h3 className="text-lg font-black text-gray-900">{sub.h3}</h3>
                              </div>
                              <div className="pl-9 space-y-3">
                                {sub.paras.map((p: string, i: number) => (
                                  <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comparison table */}
                      {sec.hasComparison && (
                        <div className="pt-2">
                          <ComparisonTable lang={lang}/>
                        </div>
                      )}

                      {/* Benefits grid */}
                      {sec.benefits && (
                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                          {sec.benefits.map((b: any) => (
                            <div key={b.title} className={`${colors.bg} ${colors.border} border rounded-2xl p-4`}>
                              <div className="text-2xl mb-2">{b.icon}</div>
                              <h4 className="font-black text-gray-900 text-sm mb-1">{b.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Highlight pills */}
                      {sec.highlights && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {sec.highlights.map((h: any) => (
                            <div key={h.text} className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${colors.bg} ${colors.border} border rounded-full text-sm font-semibold ${colors.text}`}>
                              <span>{h.icon}</span> {h.text}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pull quote */}
                      {sec.quote && (
                        <blockquote className="border-l-4 border-indigo-300 pl-5 py-1 mt-4">
                          <p className="text-lg font-bold text-gray-800 italic leading-relaxed mb-1">"{sec.quote.text}"</p>
                          <cite className="text-sm text-gray-400 not-italic">— {sec.quote.author}</cite>
                        </blockquote>
                      )}
                    </div>
                  </section>
                );
              })}

              {/* ── EARLY ACCESS CTA ── */}
              <section id="early-access" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 rounded-3xl p-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-xs font-bold mb-4">
                      {c.earlyAccess.badge}
                    </div>
                    <h2 className="text-3xl font-black mb-4">{c.earlyAccess.h2}</h2>
                    {c.earlyAccess.paras.map((p: string, i: number) => (
                      <p key={i} className="text-white/75 text-base leading-relaxed mb-3 max-w-xl mx-auto">{p}</p>
                    ))}
                    <a href={c.earlyAccess.ctaHref}
                      className="inline-flex items-center gap-2 mt-4 px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-base hover:scale-105 transition-transform shadow-2xl">
                      <Sparkles className="w-5 h-5"/>
                      {c.earlyAccess.cta}
                      <ArrowRight className="w-4 h-4"/>
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
                      {c.earlyAccess.trust.map((t: string) => (
                        <div key={t} className="flex items-center gap-1.5 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-green-400"/>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── FAQ ── */}
              <section id="faq" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-amber-600"/>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{c.faqTitle}</h2>
                    <p className="text-gray-400 text-sm">{c.faqSubtitle}</p>
                  </div>
                </div>
                <div className="pl-[52px] space-y-3 mt-5">
                  {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a}/>)}
                </div>
              </section>

              {/* ── Share + Related ── */}
              <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{c.relatedLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.related.map(r => (
                      <a key={r.href} href={r.href}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-100 transition-colors">
                        {r.label} <ArrowRight className="w-3 h-3"/>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{c.shareLabel}</p>
                  <div className="flex items-center gap-2">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://hamrolink.com/${lang}/blog/${SLUG}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">f</a>
                    <a href={`https://twitter.com/intent/tweet?url=https://hamrolink.com/${lang}/blog/${SLUG}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">𝕏</a>
                    <a href={`https://wa.me/?text=https://hamrolink.com/${lang}/blog/${SLUG}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">W</a>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer className="border-t border-gray-100 bg-white pt-12 pb-8">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="mb-6">
                <img src="/og-image.png" alt="HamroLink" className="h-8 w-auto transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-gray-900 font-bold text-sm">
                  {ne ? "हाम्रोलिङ्क डिजिटल" : "Hamrolink Digital"}
                </h4>
                <p className="text-xs text-gray-500">
                  {ne
                    ? "पाख्रिबास-०४, धनकुटा, कोशी प्रदेश, नेपाल"
                    : "Pakhribas-04, Dhankuta, Koshi Province, Nepal"}
                </p>
                <p className="text-[10px] text-gray-400">
                  {ne
                    ? "प्रोप्राइटर: लिला बस्नेत | संस्थापक: सुमन बस्नेत"
                    : "Proprietor: Lila Basnet | Founder: Suman Basnet"}
                </p>
                <p className="text-[10px] text-gray-400">
                  {ne
                    ? "दर्ता नं: ध-९४५८/०८२/०८३ | प्यान नं: ६२३२५११९१"
                    : "Reg No: ध-९४५८/०८२/०८३ | PAN: ६२३२५११९१"}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:items-end justify-end space-y-4">
              <div className="flex flex-col md:items-end gap-1">
                <div className="flex gap-6 text-sm text-gray-400 mb-2">
                  {([
                    [ne ? "गोपनीयता"  : "Privacy",  "privacy"],
                    [ne ? "सर्तहरू"   : "Terms",    "terms"],
                    [ne ? "FAQ"       : "FAQ",      "faq"],
                  ] as [string,string][]).map(([label, slug]) => (
                    <Link key={slug} href={`/${lang}/${slug}`} className="hover:text-gray-700 transition-colors lowercase">{label}</Link>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <a href="mailto:support@hamrolink.com" className="hover:text-gray-900 transition-colors font-medium">support@hamrolink.com</a>
                  <span className="text-gray-200">|</span>
                  <a href="tel:+9779816326639" className="hover:text-gray-900 transition-colors font-medium">+977-9816326639</a>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} HamroLink · Built with ❤️ in Nepal
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}