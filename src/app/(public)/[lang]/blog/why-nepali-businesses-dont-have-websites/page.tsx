// app/[lang]/blog/why-nepali-businesses-dont-have-websites/page.tsx
// Bilingual (EN + NE) blog article — legal-style layout
// JSON-LD: Article + FAQPage + BreadcrumbList schemas
// Deploy: app/[lang]/blog/why-nepali-businesses-dont-have-websites/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Globe, TrendingUp, Smartphone, Search, ShieldCheck,
  Sparkles, ArrowRight, ChevronDown, Wifi, DollarSign,
  Clock, Star, CheckCircle, Building2, Users,
} from "lucide-react";
import { resolveHref } from "@/lib/seo";

// ─── Constants & Icon Mapping ────────────────────────────────────────────────
const ICON_MAP: Record<string, any> = {
  globe: Globe,
  trending: TrendingUp,
  smartphone: Smartphone,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  wifi: Wifi,
  dollar: DollarSign,
  clock: Clock,
  star: Star,
  check: CheckCircle,
  building: Building2,
  users: Users,
};

const SEARCH_EXAMPLES = [
  { en: "restaurant near patan",         ne: "पाटन नजिकैको रेस्टुरेन्ट",     volume: "High" },
  { en: "best momo lalitpur",           ne: "ललितपुरको उत्कृष्ट मःम",     volume: "High" },
  { en: "consultancy kathmandu",       ne: "काठमाडौँमा कन्सल्टेन्सी",      volume: "High" },
  { en: "school admission nepal 2026", ne: "नेपाल विद्यालय भर्ना २०२६",    volume: "High" },
  { en: "boutique pokhara",            ne: "पोखरामा बुटिज",              volume: "Medium" },
  { en: "clinic near me kathmandu",    ne: "काठमाडौँमा मेरो नजिकैको क्लिनिक", volume: "High" },
];

const getUpdatedDate = () => {
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  return `${month} ${year}`;
};

// ─── Static metadata helper ───────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  return {
    title: ne
      ? "नेपाली व्यवसायहरूसँग वेबसाइट किन छैन? (र यो किन बदल्नुपर्छ)"
      : "Why Nepali Businesses Still Lack Websites",
    description: ne
      ? "नेपालका धेरै व्यवसायहरू अझै फेसबुकमात्र भर पर्छन्। वेबसाइट किन महत्त्वपूर्ण छ र नेपाली व्यवसायहरू कसरी अनलाइन जान सक्छन् भनी जान्नुहोस्।"
      : "Discover why small-business websites in Nepal are essential and how relying only on Facebook can limit trust, visibility, and long-term growth online.",
    keywords: ne
      ? ["नेपाली व्यवसाय वेबसाइट", "नेपालमा वेबसाइट", "HamroLink", "व्यवसाय अनलाइन नेपाल"]
      : ["website for small business Nepal", "business website Nepal", "website builder Nepal", "HamroLink", "small business website Nepal"],
    openGraph: {
      type: "article",
      locale: ne ? "ne_NP" : "en_US",
      siteName: "HamroLink",
      title: ne
        ? "नेपाली व्यवसायहरूसँग वेबसाइट किन छैन?"
        : "Why Nepali Businesses Still Lack Websites",
      description: ne
        ? "नेपालका धेरै व्यवसायहरू अझै फेसबुकमात्र भर पर्छन्।"
        : "Many businesses in Nepal still rely only on Facebook. Here's why that must change for a business website Nepal.",
      url: `https://hamrolink.com/${ne ? "ne" : "en"}/blog/why-nepali-businesses-dont-have-websites`,
      images: [
        {
          url: "https://hamrolink.com/why-no-website.png",
          width: 1200,
          height: 630,
          alt: ne
            ? "नेपाली व्यवसायहरूसँग वेबसाइट किन छैन?"
            : "Why Most Nepali Businesses Still Don't Have Websites",
        },
      ],
    },
    alternates: {
      canonical: lang === "en" ? `https://hamrolink.com/blog/why-nepali-businesses-dont-have-websites` : `https://hamrolink.com/ne/blog/why-nepali-businesses-dont-have-websites`,
      languages: {
        "en": "https://hamrolink.com/blog/why-nepali-businesses-dont-have-websites",
        "ne": "https://hamrolink.com/ne/blog/why-nepali-businesses-dont-have-websites",
        "x-default": "https://hamrolink.com/blog/why-nepali-businesses-dont-have-websites",
      },
    },
  };
}

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────
function ArticleSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ne
      ? "नेपाली व्यवसायहरूसँग वेबसाइट किन छैन? (र यो किन बदल्नुपर्छ)"
      : "Why Most Nepali Businesses Still Don't Have Websites (And Why That Must Change)",
    "description": ne
      ? "नेपालका धेरै व्यवसायहरू अझै फेसबुकमात्र भर पर्छन्। वेबसाइट किन महत्त्वपूर्ण छ भनी जान्नुहोस्।"
      : "Many businesses in Nepal still rely only on Facebook. Learn why websites matter for small business website Nepal.",
    "image": {
      "@type": "ImageObject",
      "url": "https://hamrolink.com/why-no-website.png",
      "width": 1200,
      "height": 630,
      "caption": ne
        ? "नेपाली व्यवसाय र वेबसाइटको अभाव"
        : "Lack of websites for Nepali businesses",
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
    "url": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/why-nepali-businesses-dont-have-websites`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/why-nepali-businesses-dont-have-websites`,
    },
    "about": {
      "@type": "Thing",
      "name": ne ? "नेपाली व्यवसाय वेबसाइट" : "Nepali Business Websites",
    },
    "keywords": ne
      ? "नेपाली व्यवसाय, वेबसाइट, HamroLink, अनलाइन व्यवसाय"
      : "nepali business, website, HamroLink, business website nepal",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

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
          ? "नेपाली व्यवसायहरूसँग वेबसाइट किन छैन?"
          : "Why Most Nepali Businesses Still Don't Have Websites",
        "item": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/why-nepali-businesses-dont-have-websites`,
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

function FAQSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const faqs = ne ? FAQ_NE : FAQ_EN;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
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
    q: "Do Nepali businesses really need a website if they are already on Facebook?",
    a: "Yes. Facebook is rented space — the algorithm controls who sees your posts, and you can be banned or shadowbanned at any time. A business website Nepal is your permanent home on the internet that you fully own and control. Google also indexes websites, not Facebook pages, so a website is essential for search visibility.",
  },
  {
    q: "How much does a website cost in Nepal?",
    a: "A custom website built by a developer in Nepal typically costs NPR 30,000–200,000 or more. With a modern website builder Nepal like HamroLink, you can create a professional website for small business Nepal for as little as NPR 399 and 899 per month.",
  },
  {
    q: "Can I build a website without knowing how to code?",
    a: "Absolutely. Modern website builders are designed for business owners with zero technical background. You can pick a template, add your business details, and publish your business website Nepal in under an hour.",
  },
  {
    q: "Will a website help my business get more customers?",
    a: "Yes. When customers search for 'restaurants near me' or 'consultancy Kathmandu' on Google, only businesses with websites appear. A small business website Nepal also builds trust and makes it easier for customers to contact you.",
  },
  {
    q: "What is HamroLink?",
    a: "HamroLink is a Nepal-built website builder Nepal designed specifically for Nepali businesses and entrepreneurs. It lets you create a professional website without coding and integrates local payments like eSewa and Khalti.",
  },
];

const FAQ_NE = [
  {
    q: "फेसबुक पेज हुँदाहुँदै नेपाली व्यवसायलाई वेबसाइट किन चाहियो?",
    a: "फेसबुक एउटा भाडाको ठाउँ मात्र हो। वेबसाइट भनेको इन्टरनेटमा तपाईंको आफ्नै स्थायी घर हो, जसमा तपाईंको पूर्ण नियन्त्रण हुन्छ। साथै, मानिसहरूले Google मा खोज्दा फेसबुक पेजभन्दा वेबसाइटहरू सजिलै भेटिन्छन्।",
  },
  {
    q: "नेपालमा वेबसाइट बनाउन कति खर्च लाग्छ?",
    a: "नेपालमा डेभलपरमार्फत वेबसाइट बनाउँदा रु. ३०,००० भन्दा बढी पर्न सक्छ। तर HamroLink जस्ता वेबसाइट बिल्डर प्रयोग गरेर तपाईंले महिनाको रु. ३९९ र ८९९ मा आफ्नै व्यावसायिक वेबसाइट तयार पार्न सक्नुहुन्छ।",
  },
  {
    q: "के म कोडिङ नजानिकन पनि वेबसाइट बनाउन सक्छु?",
    a: "पक्कै पनि। HamroLink जस्ता 'नो-कोड' बिल्डरहरू प्राविधिक ज्ञान नभएका व्यवसायीहरूकै लागि बनाइएका हुन्। तपाईंले केवल design छान्ने र १ घण्टाभन्दा कम समयमै वेबसाइट अनलाइन ल्याउन सक्नुहुन्छ।",
  },
  {
    q: "के वेबसाइटले मेरो व्यापार बढाउन साँच्चै मद्दत गर्छ?",
    a: "अवश्य गर्छ। जब ग्राहकले Google मा 'काठमाडौंको उत्कृष्ट कन्सल्टेन्सी' भनेर खोज्छन्, तब वेबसाइट भएका व्यवसायहरू मात्र अगाडि देखिन्छन्। यसले तपाईंको ब्रान्डप्रति ग्राहकको विश्वास पनि बढाउँछ।",
  },
];

// ─── Article content ──────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    publishedLabel: (date: string) => `Published by HamroLink · Updated ${date}`,
    readTime: "8 min read",
    tocTitle: "Table of Contents",
    toc: [
      { id: "digital-gap",         label: "The Digital Gap in Nepal" },
      { id: "case-study",          label: "Real Example: A Local Restaurant" },
      { id: "why-avoid",           label: "Why Businesses Avoid Websites" },
      { id: "customers-searching", label: "But Customers Are Searching Online" },
      { id: "cost-comparison",     label: "Website vs Facebook: The Cost" },
      { id: "why-website",         label: "Why a Website Changes Everything" },
      { id: "simpler-future",      label: "A Simpler Future for Nepali Businesses" },
      { id: "early-access",        label: "Start for Free" },
      { id: "faq",                 label: "Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "digital-gap",
        icon: "globe",
        color: "blue",
        h2: "The Digital Gap in Nepal",
        paras: [
          "Nepal's economy is bustling. From Thamel restaurants to Pokhara consultancies, hundreds of thousands of small businesses serve customers daily. Yet ask nearly any of them: 'Do you have a website?' The answer, most often, is no.",
          "A 2023 survey found that over 78% of small and medium businesses in Nepal have no independent website. Instead, most rely solely on Facebook. While easy to use, Facebook is 'rented space' — you don't own your audience, and an algorithm determines who sees your business website Nepal.",
          "But here is the problem: the world has moved on. In Nepal, more than 90% of internet users start their search on Google. If your business is not there, you are missing out on the primary way customers discover services today.",
        ],
        highlights: [
          { icon: "📊", text: "78% of Nepali SMBs have no website" },
          { icon: "📱", text: "Most rely solely on Facebook" },
          { icon: "🔍", text: "90% of users start searching on Google" },
        ],
      },
      {
        id: "case-study",
        icon: "building",
        color: "indigo",
        h2: "A Simple Example: A Local Restaurant",
        paras: [
          "Imagine two restaurants in Lalitpur. Owner A relies entirely on a Facebook page to reach customers. Owner B has a professional business website Nepal optimized for local search.",
          "When a hungry tourist in Patan picks up their phone and searches for 'best momo Lalitpur' or 'traditional Nepali food near me', Google displays Owner B's website, menu, and location. Owner A, despite having great food, never appears in the search results.",
          "This makes the argument concrete: A website makes your business discoverable precisely when the customer is ready to buy.",
        ],
      },
      {
        id: "why-avoid",
        icon: "shield",
        color: "orange",
        h2: "Why Businesses Avoid Building Websites",
        paras: [
          "If websites are so important, why do so few Nepali businesses have one? The barriers are real, and they are worth understanding.",
        ],
        subsections: [
          {
            icon: "💻",
            h3: "Websites Seem Too Technical",
            paras: [
              "Many owners assume building a website for small business Nepal requires knowing how to code. Terms like 'hosting' and 'DNS' create a wall of fear. But with a modern website builder Nepal, you can launch a site in minutes without coding.",
            ],
          },
          {
            icon: "💸",
            h3: "Developers Are Expensive",
            paras: [
              "Hiring a web development agency in Nepal typically costs NPR 30,000 to 2,00,000. For a neighbourhood grocery store or local tutor, that price is simply out of reach. This is where an affordable website builder Nepal becomes essential.",
            ],
          },
        ],
      },
      {
        id: "customers-searching",
        icon: "search",
        color: "emerald",
        h2: "But Customers Are Searching Online",
        paras: [
          "While many businesses stayed offline, their customers moved firmly online. Smartphone penetration in Nepal is hwaattay (rapidly) increasing. When people need something, they don't open Facebook — they open Google.",
        ],
        subsections: [
          {
            icon: "📍",
            h3: "Why 'Near Me' Searches Matter in Nepal",
            paras: [
              "Local search is the most powerful tool for Nepali businesses. Google's 'near me' searches connect customers to local businesses in seconds Using Google Maps and local SEO, a business website Nepal ensures you show up when someone nearby is looking for your services.",
            ],
          },
        ],
        featuredSnippet: {
          h3: "Why does a small business in Nepal need a website?",
          list: [
            "24/7 Discovery: Your shop never closes on Google.",
            "Professional Trust: Customers trust businesses with websites more than those with only social media.",
            "Data Ownership: You own your customer relationships, not a social media algorithm."
          ]
        },
        paras2: [
          "Consider what people are searching for right now in Nepal:",
        ],
      },
      {
        id: "cost-comparison",
        icon: "dollar",
        color: "orange",
        h2: "Website vs Facebook: The Real Cost",
        table: {
          headers: ["Option", "Visibility", "Ownership", "Cost"],
          rows: [
            ["Facebook only", "Limited to feed", "No control", "Free"],
            ["Developer website", "High (SEO)", "Full Ownership", "NPR 30k–200k"],
            ["HamroLink", "High (SEO)", "Full Ownership", "Affordable Monthly"]
          ]
        }
      },
      {
        id: "why-website",
        icon: "trending",
        color: "violet",
        h2: "Why a Website Changes Everything",
        paras: [
          "A business website Nepal is no longer just an online brochure. It is a 24-hour salesperson and a platform for growth. Here is what changes when you go online.",
        ],
        benefits: [
          { icon: "🔍", title: "Google Visibility", desc: "Your business appears when customers search. This is the single most powerful source of free customers." },
          { icon: "⭐", title: "Business Credibility", desc: "A professional website instantly signals that your business is legitimate and trustworthy." },
          { icon: "🛒", title: "Online Sales", desc: "Accept payments via eSewa or Khalti and sell products even while you sleep." },
        ],
      },
      {
        id: "simpler-future",
        icon: "sparkles",
        color: "indigo",
        h2: "A Simpler Future for Nepali Businesses",
        paras: [
          "The barriers to how to create website in Nepal are disappearing. A new generation of website builder Nepal tools is emerging that strips away tech complexity.",
          "Some are being built specifically for the Nepali market — supporting Nepali language and local payment systems. Now, you don't have to choose between 'can't afford' and 'Facebook only'. Choose a professional small business website Nepal.",
        ],
        quote: { text: "The internet doesn't care how big your business is. It only cares whether you showed up.", author: "HamroLink" },
      },
    ],
    earlyAccess: {
      badge: "🚀 Now Live in Nepal",
      h2: "Create Your Website in Minutes\nStart for Free",
      paras: [
        "HamroLink is Nepal's first website builder designed from the ground up for Nepali businesses.",
        "Businesses across Kathmandu, Pokhara and Butwal are already launching websites with HamroLink. Start now and publish in minutes.",
      ],
      cta: "Start for Free",
      ctaHref: "https://app.hamrolink.com",
      trust: ["Start for Free", "No credit card required", "Cancel anytime"],
    },
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about websites for Nepali businesses.",
    shareLabel: "Share this article",
    relatedLabel: "Related Articles",
    related: [
      { label: "HamroLink Pricing", href: resolveHref("/pricing", "en") },
      { label: "Templates", href: resolveHref("/ai", "en") },
    ],
  },

  ne: {
    publishedLabel: (date: string) => `HamroLink द्वारा प्रकाशित · अपडेट: ${date}`,
    readTime: "८ मिनेटको पढाइ",
    tocTitle: "यस लेखमा समावेश विषयहरू",
    toc: [
      { id: "digital-gap",         label: "नेपालमा देखिएको डिजिटल खाडल" },
      { id: "case-study",          label: "सरल उदाहरण: ललितपुरको रेस्टुरेन्ट" },
      { id: "why-avoid",           label: "व्यवसायीहरू वेबसाइट बनाउन किन हच्किन्छन्?" },
      { id: "customers-searching", label: "ग्राहकहरू अहिले अनलाइनमा छन्" },
      { id: "cost-comparison",     label: "वेबसाइट र फेसबुक: लागतको तुलना" },
      { id: "why-website",         label: "वेबसाइटले व्यापारमा ल्याउने परिवर्तन" },
      { id: "simpler-future",      label: "नेपाली व्यवसायको सहज भविष्य" },
      { id: "early-access",        label: "हाम्रो विशेष सूचीमा सामेल हुनुहोस्" },
      { id: "faq",                 label: "बारम्बार सोधिने प्रश्नहरू" },
    ],
    sections: [
      {
        id: "digital-gap",
        icon: "globe",
        color: "blue",
        h2: "नेपालमा देखिएको डिजिटल खाडल",
        paras: [
          "नेपालको अर्थतन्त्र चलायमान छ। तर अचम्मको कुरा के छ भने नेपालका ७८% साना तथा मझौला उद्योगहरूसँग आफ्नै वेबसाइट छैन। उनीहरू फेसबुकमा मात्र निर्भर छन्।",
          "नेपालमा ९०% भन्दा बढी इन्टरनेट प्रयोगकर्ताहरूले कुनै पनि सेवा खोज्न Google को प्रयोग गर्छन्। यदि तपाईंको व्यवसाय Google मा छैन भने, तपाईंले ठूलो अवसर गुमाइरहनुभएको छ।",
        ],
        highlights: [
          { icon: "📊", text: "७८% व्यवसायको वेबसाइट छैन" },
          { icon: "🔍", text: "९०% प्रयोगकर्ता Google बाट सर्च सुरु गर्छन्" },
        ],
      },
      {
        id: "case-study",
        icon: "building",
        color: "indigo",
        h2: "एउटा सरल उदाहरण: ललितपुरको एउटा रेस्टुरेन्ट",
        paras: [
          "कल्पना गर्नुहोस् ललितपुरमा दुईवटा रेस्टुरेन्ट छन्। एउटा रेस्टुरेन्ट केवल फेसबुकमा छ, अर्कोको आफ्नै व्यावसायिक वेबसाइट छ।",
          "जब ग्राहकले 'ललितपुरको उत्कृष्ट मःम' भनेर Google मा खोज्छन्, वेबसाइट भएको रेस्टुरेन्ट मात्र देखिन्छ। यसले गर्दा वेबसाइट हुनेले बढी ग्राहक पाउँछन्।",
        ],
      },
      {
        id: "why-avoid",
        icon: "shield",
        color: "orange",
        h2: "व्यवसायीहरू वेबसाइट बनाउन किन हच्किन्छन्?",
        paras: [
          "नेपालमा वेबसाइट बनाउन गाह्रो मानिनुको मुख्य कारण प्राविधिक ज्ञानको कमी र महँगो शुल्क हो। एउटा सामान्य वेबसाइटको लागि पनि रु ३०,००० देखि २ लाखसम्म खर्च हुन सक्छ।",
        ],
        subsections: [
          {
            icon: "💻",
            h3: "प्राविधिक झमेला र कोडिङ",
            paras: [
              "धेरैलाई वेबसाइटको लागि कोडिङ जान्नुपर्छ भन्ने लाग्छ। तर अब HamroLink जस्ता प्लेटफर्मले गर्दा कोडिङ बिना नै वेबसाइट बनाउन सकिन्छ।",
            ],
          },
        ],
      },
      {
        id: "customers-searching",
        icon: "search",
        color: "emerald",
        h2: "तर ग्राहकहरू अहिले अनलाइनमा छन्",
        paras: [
          "आज नेपालमा मानिसहरूलाई केही कुरा चाहियो कि उनीहरू फेसबुक होइन, सिधै Google मा जान्छन्। विशेष गरी स्थानीय खोज (Local Search) को महत्त्व निकै बढेको छ।",
        ],
        subsections: [
          {
            icon: "📍",
            h3: "नेपालमा 'नियर मी' (Near Me) सर्च किन महत्त्वपूर्ण छ?",
            paras: [
              "Google Maps र लोकल SEO ले गर्दा ग्राहकले आफ्नो नजिकैको पसल तुरुन्तै भेट्टाउन सक्छन्। वेबसाइट भएमा तपाईंको पसल Google सर्चको पहिलो नम्बरमा देखिन सक्छ।",
            ],
          },
        ],
        featuredSnippet: {
          h3: "नेपालमा साना व्यवसायलाई वेबसाइट किन चाहिन्छ?",
          list: [
            "२४/७ उपस्थिति: तपाईंको पसल Google मा कहिल्यै बन्द हुँदैन।",
            "व्यावसायिक विश्वास: फेसबुक पेजभन्दा वेबसाइट भएको व्यवसायलाई ग्राहकले बढी विश्वास गर्छन्।",
            "निजी स्वामित्व: तपाईंको डेटा र ग्राहकमा तपाईंको आफ्नै नियन्त्रण हुन्छ।"
          ]
        },
        paras2: [ "अहिले नेपालमा मानिसहरूले के-के खोजिरहेका छन्?" ],
      },
      {
        id: "cost-comparison",
        icon: "dollar",
        color: "orange",
        h2: "वेबसाइट र फेसबुक: वास्तविक लागतको तुलना",
        table: {
          headers: ["विकल्प", "दृश्यता", "स्वामित्व", "लागत"],
          rows: [
            ["फेसबुक मात्र", "सीमित", "छैन", "निःशुल्क"],
            ["डेभलपर", "उच्च (SEO)", "पूर्ण", "३० हजार - २ लाख"],
            ["HamroLink", "उच्च (SEO)", "पूर्ण", "किफायती शुल्क"]
          ]
        }
      },
      {
        id: "why-website",
        icon: "trending",
        color: "violet",
        h2: "वेबसाइटले व्यापारमा ल्याउने परिवर्तन",
        paras: [ "वेबसाइटले तपाईंको व्यापारलाई थप व्यावसायिक बनाउँछ र नयाँ ग्राहक ल्याउन मद्दत गर्छ।" ],
        benefits: [
          { icon: "🔍", title: "Google मा सजिलो पहुँच", desc: "नयाँ ग्राहक पाउने यो सबैभन्दा उत्कृष्ट तरिका हो।" },
          { icon: "🛒", title: "अनलाइन भुक्तानी", desc: "eSewa वा Khalti बाट सिधै पैसा लिन सकिन्छ।" },
        ],
      },
      {
        id: "simpler-future",
        icon: "sparkles",
        color: "indigo",
        h2: "नेपाली व्यवसायको सहज भविष्य",
        paras: [
          "नेपालमा वेबसाइट बनाउने झन्झट अब हराउँदैछ। नयाँ पुस्ताका वेबसाइट बिल्डरहरूले प्राविधिक जटिलतालाई हटाउँदैछन्।",
          "विशेष गरी नेपाली बजारका लागि बनाइएका यस्ता टुल्सहरूले नेपाली भाषा र स्थानीय भुक्तानी प्रणालीलाई सहज बनाउँछन्। अब तपाईंले 'फेसबुक मात्र' वा 'वेबसाइट बनाउन सक्दिन' भन्ने बीचमा रोज्नुपर्दैन।",
        ],
        quote: { text: "इन्टरनेटले तपाईंको व्यवसाय कति ठूलो छ भनेर सोध्दैन, यसले केवल तपाईं अनलाइन हुनुहुन्छ कि हुनुहुन्न भनेर हेर्छ।", author: "HamroLink" },
      },
    ],
    earlyAccess: {
      badge: "🚀 नेपालमा चाँडै सुचारु हुँदै",
      h2: "मिनेटभरमै वेबसाइट बनाउनुहोस्\nविशेष सूचीमा सामेल हुनुहोस्",
      paras: [
        "HamroLink विशेष गरी नेपाली व्यवसायीहरूकै लागि बनाइएको हो। पहिलो ५०० व्यवसायहरूका लागि मात्र यो विशेष अर्ली एक्सेस खुला छ।",
        "काठमाडौं, पोखरा र बुटवलका व्यवसायीहरू सामेल भइसकेका छन्। अहिले नै आफ्नो नाम दर्ता गर्नुहोस्।",
      ],
      cta: "अहिले नै सामेल हुनुहोस् — यो निःशुल्क छ",
      ctaHref: "https://app.hamrolink.com",
      trust: ["नि:शुल्क सुरु गर्नुहोस्", "क्रेडिट कार्ड आवश्यक छैन", "जुनसुकै बेला रद्द गर्न सकिन्छ"],
    },
    faqTitle: "बारम्बार सोधिने प्रश्नहरू",
    faqSubtitle: "वेबसाइटका बारेमा बारम्बार सोधिने प्रश्नहरू।",
    shareLabel: "साझा गर्नुहोस्",
    relatedLabel: "सम्बन्धित लेख",
    related: [
      { label: "हाम्रो मूल्य", href: resolveHref("/pricing", "ne") },
      { label: "टेम्प्लटहरू", href: resolveHref("/ai", "ne") },
    ],
  },
};

// ─── Color map ────────────────────────────────────────────────────────────────
const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  blue:   { bg:"bg-blue-50",   border:"border-blue-100",   text:"text-blue-700",   badge:"bg-blue-100",   badgeText:"text-blue-700" },
  orange: { bg:"bg-orange-50", border:"border-orange-100", text:"text-orange-700", badge:"bg-orange-100", badgeText:"text-orange-700" },
  emerald:{ bg:"bg-emerald-50",border:"border-emerald-100",text:"text-emerald-700",badge:"bg-emerald-100",badgeText:"text-emerald-700" },
  violet: { bg:"bg-violet-50", border:"border-violet-100", text:"text-violet-700", badge:"bg-violet-100", badgeText:"text-violet-700" },
  indigo: { bg:"bg-indigo-50", border:"border-indigo-100", text:"text-indigo-700", badge:"bg-indigo-100", badgeText:"text-indigo-700" },
};

// ─── Components ───────────────────────────────────────────────────────────────
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

export default async function BlogWhyNoWebsitesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const ne   = lang === "ne";
  const c    = (ne ? CONTENT.ne : CONTENT.en) as any;
  const faqs = ne ? FAQ_NE : FAQ_EN;
  const updatedDate = getUpdatedDate();

  return (
    <>
      <ArticleSchema lang={lang}/>
      <BreadcrumbSchema lang={lang}/>
      <FAQSchema lang={lang}/>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href={resolveHref("/", lang)} className="hover:text-gray-700 transition-colors">HamroLink</Link>
              <span>/</span>
              <span className="text-gray-500 font-medium">{ne ? "ब्लग" : "Blog"}</span>
            </nav>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(["en","ne"] as const).map(l => (
                <Link key={l} href={resolveHref("/blog/why-nepali-businesses-dont-have-websites", l)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang===l ? "bg-white shadow text-gray-900" : "text-gray-400 hover:text-gray-700"}`}>
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cinematic featured image hero ── */}
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[520px]">
            <Image
              src="/why-no-website.png"
              alt={ne
                ? "नेपाली व्यवसायहरूसँग वेबसाइट किन छैन?"
                : "Why Most Nepali Businesses Still Don't Have Websites"}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-700/20"/>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-transparent"/>
          </div>

          {/* Text overlay content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto w-full px-6 pb-12 pt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/80 backdrop-blur-sm mb-6">
                <Globe className="w-3.5 h-3.5"/>
                {ne ? "डिजिटल नेपाल" : "Digital Nepal"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight drop-shadow-xl text-white">
                {ne ? "नेपाली व्यवसायहरूसँग वेबसाइट किन छैन?" : "Why Most Nepali Businesses Still Don't Have Websites in Nepal"}
              </h1>
              <p className="text-white/75 text-base sm:text-lg max-w-2xl leading-relaxed mb-6 drop-shadow">
                {ne ? "नेपालका धेरै व्यवसायहरू अझै फेसबुकमात्र भर पर्छन् — र यो किन बदल्नुपर्छ।" : "Discover why websites for small business Nepal are essential. Learn how a business website Nepal can double your growth."}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4"/><span>HamroLink</span></div>
                <div className="w-px h-3 bg-white/20"/>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4"/><span>{c.readTime}</span></div>
                <div className="w-px h-3 bg-white/20"/>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4"/><span>{typeof c.publishedLabel === 'function' ? c.publishedLabel(updatedDate) : c.publishedLabel}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex gap-12">
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-20">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{c.tocTitle}</p>
                <nav className="space-y-1">
                  {c.toc?.map((item: any) => (
                    <a key={item.id} href={`#${item.id}`} className="block text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors leading-snug">{item.label}</a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white text-center">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-80"/>
                  <p className="text-xs font-black mb-3 leading-snug">{ne ? "HamroLink अब लाइभ छ" : "HamroLink is now live"}</p>
                  <a href={c.earlyAccess.ctaHref || "https://app.hamrolink.com"} className="block w-full py-2 bg-white text-indigo-700 rounded-xl text-xs font-black hover:bg-indigo-50 transition-colors">{ne ? "नि:शुल्क सुरु गर्नुहोस्" : "Start for Free"}</a>
                </div>
              </div>
            </aside>

            <article className="flex-1 min-w-0 space-y-14">
              {c.sections.map((sec: any) => {
                const colors = colorMap[sec.color] || colorMap.blue;
                const Icon   = ICON_MAP[sec.icon] || Globe;
                return (
                  <section key={sec.id} id={sec.id} className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${colors.text}`}/>
                      </div>
                      <h2 className="text-2xl font-black text-gray-900">{sec.h2}</h2>
                    </div>

                    <div className="pl-[52px] space-y-4">
                      {sec.paras?.map((p: string, i: number) => ( <p key={i} className="text-gray-600 leading-relaxed">{p}</p> ))}
                      
                      {sec.highlights && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {sec.highlights.map((h: any) => (
                            <div key={h.text} className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${colors.bg} ${colors.border} border rounded-full text-sm font-semibold ${colors.text}`}>
                              <span>{h.icon}</span> {h.text}
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.subsections && (
                        <div className="space-y-8 pt-4">
                          {sec.subsections.map((sub: any) => (
                            <div key={sub.h3}>
                              <div className="flex items-center gap-2.5 mb-3">
                                <span className="text-xl">{sub.icon}</span>
                                <h3 className="text-lg font-black text-gray-900">{sub.h3}</h3>
                              </div>
                              <div className="pl-9 space-y-3"> {sub.paras?.map((p: string, i: number) => ( <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p> ))} </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.featuredSnippet && (
                        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 my-6">
                            <h3 className="text-lg font-black text-slate-900 mb-4">{sec.featuredSnippet.h3}</h3>
                            <ul className="space-y-3">
                                {sec.featuredSnippet.list?.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-700">
                                        <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                      )}

                      {sec.id === "customers-searching" && (
                        <div className="pt-2">
                          <div className={`${colors.bg} ${colors.border} border rounded-2xl overflow-hidden`}>
                            <div className={`px-4 py-2.5 border-b ${colors.border} flex items-center gap-2`}>
                              <Search className={`w-4 h-4 ${colors.text}`}/>
                              <span className={`text-xs font-black uppercase tracking-wide ${colors.text}`}> {ne ? "Google मा खोजिँदैछ" : "Being searched on Google"} </span>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {SEARCH_EXAMPLES.map((s: any) => (
                                <div key={s.en} className="flex items-center justify-between px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <Search className="w-3 h-3 text-gray-300"/>
                                    <code className="text-sm text-gray-800 font-medium">{ne ? s.ne : s.en}</code>
                                  </div>
                                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${colors.badge} ${colors.badgeText}`}>{s.volume}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {sec.table && (
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mt-4">
                          <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-100">
                              <tr>
                                {sec.table.headers.map((h: string) => ( <th key={h} className="px-4 py-3 font-black text-gray-900">{h}</th> ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sec.table.rows.map((row: string[], i: number) => (
                                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                  {row.map((cell: string, j: number) => ( <td key={j} className={`px-4 py-3 ${j===0 ? "font-bold text-gray-900" : "text-gray-600"}`}>{cell}</td> ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

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

              <section id="early-access" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 rounded-3xl p-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-xs font-bold mb-4"> {c.earlyAccess?.badge} </div>
                    <h2 className="text-3xl font-black mb-4 whitespace-pre-line">{c.earlyAccess?.h2}</h2>
                    {c.earlyAccess?.paras?.map((p: string, i: number) => ( <p key={i} className="text-white/75 text-base leading-relaxed mb-3 max-w-xl mx-auto">{p}</p> ))}
                    <a href={c.earlyAccess?.ctaHref || "https://app.hamrolink.com"} className="inline-flex items-center gap-2 mt-4 px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-base hover:scale-105 transition-transform shadow-2xl">
                      <Sparkles className="w-5 h-5"/> {c.earlyAccess?.cta} <ArrowRight className="w-4 h-4"/>
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
                      {c.earlyAccess?.trust?.map((t: string) => ( <div key={t} className="flex items-center gap-1.5 text-sm text-white/60"> <CheckCircle className="w-4 h-4 text-green-400"/> {t} </div> ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="faq" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0"> <Star className="w-5 h-5 text-amber-600"/> </div>
                  <div> <h2 className="text-2xl font-black text-gray-900">{typeof c.faqTitle === 'string' ? c.faqTitle : (c as any).faqTitle}</h2> <p className="text-gray-400 text-sm">{(c as any).faqSubtitle}</p> </div>
                </div>
                <div className="pl-[52px] space-y-3 mt-5"> {faqs.map(f => ( <FAQItem key={f.q} q={f.q} a={f.a}/> ))} </div>
              </section>

              <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{(c as any).relatedLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {(c as any).related?.map((r: any) => ( <a key={r.href} href={r.href} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-100 transition-colors"> {r.label} <ArrowRight className="w-3 h-3"/> </a> ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

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