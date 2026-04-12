"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock3,
  LayoutGrid,
  MessageSquare,
  PanelsTopLeft,
  PhoneCall,
  Route,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  UtensilsCrossed,
  Users,
  WandSparkles,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/Footer";

type Lang = "en" | "ne";

const pageCopy = {
  en: {
    badge: "HamroLink Chatbot",
    title: "Your 24/7 AI assistant for converting visitors into customers.",
    intro:
      "HamroLink Chatbot gives business landing pages an always-on guide that answers questions, explains your offers, and moves serious visitors toward inquiry, booking, or purchase without waiting for a human reply.",
    highlight: "Built for local businesses, mobile-first traffic, and conversion-focused conversations.",
    primaryCta: "Enable My Chatbot",
    secondaryCta: "See Pricing",
    metricLabel: "What it changes",
    metricValue: "Instant answers, warmer leads, fewer missed customers.",
    whyTitle: "Why add a chatbot to your landing page?",
    whyBody:
      "Most visitors leave when they cannot quickly find pricing, services, contact details, or the next step. A good chatbot closes that gap in real time.",
    benefits: [
      "Respond instantly to visitor questions",
      "Increase leads from contact-ready visitors",
      "Keep your business available after office hours",
      "Reduce repetitive support messages",
      "Help users choose plans, services, or next steps",
    ],
    capabilityTitle: "What the chatbot can do",
    capabilities: [
      {
        title: "Answer visitor questions",
        body: "Handle common questions about services, pricing, contact details, location, availability, and general business info.",
        icon: MessageSquare,
      },
      {
        title: "Recommend next actions",
        body: "Guide people to pricing, service pages, contact forms, inquiry buttons, or booking actions while intent is still high.",
        icon: Route,
      },
      {
        title: "Match your brand voice",
        body: "Choose a professional, friendly, sales-focused, or minimal tone so the assistant feels like part of your business.",
        icon: WandSparkles,
      },
      {
        title: "Start conversations faster",
        body: "Show ready-made prompts that reduce friction and help visitors ask better questions immediately.",
        icon: LayoutGrid,
      },
      {
        title: "Fit your page design",
        body: "Use a circle button, rounded rectangle, or minimal text launcher that feels native to your landing page.",
        icon: PanelsTopLeft,
      },
      {
        title: "Stay business-aware",
        body: "Use your business summary, services, and offer context so answers stay relevant to what you actually sell.",
        icon: Settings2,
      },
    ],
    bestForTitle: "Best for",
    bestFor: [
      { label: "Small businesses", icon: Store },
      { label: "Agencies", icon: Briefcase },
      { label: "Service providers", icon: Users },
      { label: "Portfolio and freelancer sites", icon: BadgeCheck },
      { label: "Restaurants", icon: UtensilsCrossed },
      { label: "Schools and institutions", icon: Building2 },
      { label: "Ecommerce landing pages", icon: ShoppingBag },
    ],
    flowTitle: "Customer experience flow",
    flow: [
      "Visitor opens your landing page.",
      "Chatbot button appears in the corner.",
      "Visitor taps a starter prompt or types a question.",
      "Chatbot replies with contextual guidance.",
      "Visitor moves toward inquiry, booking, or purchase faster.",
    ],
    glanceTitle: "Features at a glance",
    glance: [
      "Fast AI responses",
      "Conversation starters",
      "Personality controls",
      "Launcher button customization",
      "Mobile-friendly interaction",
      "Site-specific business context",
      "Always-on first-line support",
    ],
    enableTitle: "How to enable HamroLink Chatbot",
    enableSteps: [
      "Log in to your HamroLink dashboard.",
      "Open your site settings or chatbot setup area.",
      "Choose the site where you want chatbot active.",
      "Add or update your business summary.",
      "Configure chatbot style and personality.",
      "Add starter prompts.",
      "Enable chatbot and save.",
      "Visit your landing page and test real questions.",
    ],
    checklistTitle: "Quick setup checklist",
    checklist: [
      "Business name is correct",
      "Contact details are up to date",
      "Pricing and service details are clear",
      "Starter prompts are relevant",
      "Tone matches your brand voice",
      "Chatbot is visible on mobile",
    ],
    pricingTitle: "Pricing and availability",
    pricingBody:
      "Chatbot availability depends on your HamroLink plan. Free plans may have limited or unavailable chatbot access, while paid plans unlock chatbot support with higher limits on stronger tiers.",
    pricingNote: "Check your current pricing page for the latest active limits and plan details.",
    tipsTitle: "Tips for better results",
    tips: [
      "Keep your business summary concise and accurate",
      "Add 3 to 5 high-intent starter prompts",
      "Include pricing-related prompt options",
      "Include a direct contact prompt",
      "Review common customer questions monthly",
      "Update chatbot context when services or prices change",
    ],
    promptTitle: "Example starter prompts",
    promptGroups: [
      {
        title: "Business services",
        prompts: [
          "What services do you provide?",
          "Which package is best for me?",
          "Can I get a custom quote?",
        ],
      },
      {
        title: "Sales conversion",
        prompts: [
          "What is your starting price?",
          "How fast can you deliver?",
          "How do I get started today?",
        ],
      },
      {
        title: "Support",
        prompts: [
          "How can I contact support?",
          "Do you work on weekends?",
          "Where is your office located?",
        ],
      },
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        q: "Is the chatbot hard to set up?",
        a: "No. Most users can configure and launch it in minutes.",
      },
      {
        q: "Can I change the chatbot text and style later?",
        a: "Yes. You can update personality, prompts, and visual settings anytime.",
      },
      {
        q: "Will this work on mobile?",
        a: "Yes. The chatbot is designed for responsive landing page experiences.",
      },
      {
        q: "Does it replace human support?",
        a: "It handles common and early-stage questions, then guides serious leads to your preferred contact channel.",
      },
      {
        q: "Can I use it for lead generation?",
        a: "Yes. It helps qualify visitors and direct them to inquiry or booking actions faster.",
      },
    ],
    pairTitle: "Best landing page sections to pair with chatbot",
    pairings: [
      "Clear headline and value proposition",
      "Services or packages section",
      "Testimonials and trust proof",
      "Pricing summary",
      "Contact or booking CTA",
    ],
    finalTitle: "Ready to turn more visitors into customers?",
    finalBody:
      "Enable HamroLink Chatbot on your landing page and give visitors instant, conversion-focused support 24/7.",
    finalButton: "Launch with Chatbot",
    sampleConversation: {
      user1: "What services do you offer?",
      ai1: "We can explain your services, pricing, contact details, and guide visitors to the best next step based on what they need.",
      user2: "How do I get started today?",
      ai2: "Choose your HamroLink site, add your business summary, turn on the chatbot, and test 3 to 5 starter prompts before publishing.",
    },
  },
  ne: {
    badge: "HamroLink Chatbot",
    title: "तपाईंका भिजिटरलाई ग्राहकमा बदल्ने २४/७ एआई सहायक।",
    intro:
      "HamroLink Chatbot ले तपाईंको landing page मा सधैं उपलब्ध डिजिटल सहायक दिन्छ, जसले प्रश्नको जवाफ दिन्छ, सेवा बुझाउँछ, र तयार भएका भिजिटरलाई inquiry, booking वा purchase तर्फ छिटो लैजान मद्दत गर्छ।",
    highlight: "स्थानीय व्यवसाय, मोबाइल प्रयोगकर्ता, र conversion-focused conversation का लागि बनाइएको।",
    primaryCta: "मेरो Chatbot Enable गर्नुहोस्",
    secondaryCta: "Pricing हेर्नुहोस्",
    metricLabel: "मुख्य फाइदा",
    metricValue: "छिटो जवाफ, तातो leads, कम छुटेका ग्राहक।",
    whyTitle: "Landing page मा chatbot किन चाहिन्छ?",
    whyBody:
      "धेरै भिजिटरले मूल्य, सेवा, सम्पर्क वा next step तुरुन्तै नभेटेपछि साइट छोड्छन्। राम्रो chatbot ले यही gap real time मा पुरा गर्छ।",
    benefits: [
      "भिजिटरका प्रश्नको तुरुन्तै जवाफ दिन्छ",
      "तयार भएका भिजिटरबाट बढी leads ल्याउँछ",
      "office hours पछि पनि व्यवसाय उपलब्ध राख्छ",
      "बारम्बार दोहोरिने support message घटाउँछ",
      "plan, service वा next step छान्न मद्दत गर्छ",
    ],
    capabilityTitle: "Chatbot ले के गर्न सक्छ",
    capabilities: [
      {
        title: "प्रश्नहरूको जवाफ दिन्छ",
        body: "service, price, contact detail, location, availability र business info जस्ता common प्रश्न सम्हाल्छ।",
        icon: MessageSquare,
      },
      {
        title: "अर्को कदम सिफारिस गर्छ",
        body: "pricing, service page, contact form, inquiry button वा booking action तर्फ user लाई पुर्‍याउँछ।",
        icon: Route,
      },
      {
        title: "ब्रान्डको tone मिलाउँछ",
        body: "professional, friendly, sales-focused वा minimal tone छानेर chatbot लाई तपाईंको ब्रान्डजस्तै बनाइन्छ।",
        icon: WandSparkles,
      },
      {
        title: "छिटो conversation सुरु गराउँछ",
        body: "ready-made prompt ले friction घटाउँछ र भिजिटरलाई तुरुन्तै useful प्रश्न सोध्न सजिलो बनाउँछ।",
        icon: LayoutGrid,
      },
      {
        title: "डिजाइनसँग मिल्छ",
        body: "circle button, rounded launcher, वा minimal text style बाट page design सँग मिल्ने launcher छान्न सकिन्छ।",
        icon: PanelsTopLeft,
      },
      {
        title: "तपाईंको business बुझेर बोल्छ",
        body: "business summary, services र offer context प्रयोग गरेर relevant जवाफ दिन्छ।",
        icon: Settings2,
      },
    ],
    bestForTitle: "कसका लागि उपयुक्त",
    bestFor: [
      { label: "सानो व्यवसाय", icon: Store },
      { label: "एजेन्सी", icon: Briefcase },
      { label: "service provider", icon: Users },
      { label: "portfolio र freelancer site", icon: BadgeCheck },
      { label: "restaurant", icon: UtensilsCrossed },
      { label: "school र institution", icon: Building2 },
      { label: "ecommerce landing page", icon: ShoppingBag },
    ],
    flowTitle: "Customer experience flow",
    flow: [
      "भिजिटरले तपाईंको landing page खोल्छ।",
      "कुना भागमा chatbot button देखिन्छ।",
      "भिजिटरले starter prompt छान्छ वा message लेख्छ।",
      "chatbot ले contextual guidance दिन्छ।",
      "भिजिटर inquiry, booking वा purchase तर्फ छिटो जान्छ।",
    ],
    glanceTitle: "मुख्य feature हरू",
    glance: [
      "छिटो AI responses",
      "conversation starters",
      "personality control",
      "launcher customization",
      "mobile-friendly interaction",
      "site-specific business context",
      "always-on first-line support",
    ],
    enableTitle: "HamroLink Chatbot कसरी enable गर्ने",
    enableSteps: [
      "HamroLink dashboard मा log in गर्नुहोस्।",
      "site settings वा chatbot setup area खोल्नुहोस्।",
      "chatbot चलाउन चाहेको site छान्नुहोस्।",
      "business summary add वा update गर्नुहोस्।",
      "chatbot style र personality सेट गर्नुहोस्।",
      "starter prompts थप्नुहोस्।",
      "chatbot enable गरेर save गर्नुहोस्।",
      "landing page मा गएर real questions ले test गर्नुहोस्।",
    ],
    checklistTitle: "Quick setup checklist",
    checklist: [
      "business name सही छ",
      "contact details updated छन्",
      "pricing र service details clear छन्",
      "starter prompts relevant छन्",
      "tone brand voice सँग मिल्छ",
      "mobile मा chatbot clearly देखिन्छ",
    ],
    pricingTitle: "Pricing र availability",
    pricingBody:
      "Chatbot access तपाईंको HamroLink plan मा निर्भर हुन्छ। Free plan मा limit वा access नहुन सक्छ, paid plan मा chatbot support र higher limits खुल्छ।",
    pricingNote: "नयाँ plan limits र details का लागि pricing page हेर्नुहोस्।",
    tipsTitle: "राम्रो result का लागि tips",
    tips: [
      "business summary छोटो र accurate राख्नुहोस्",
      "3 देखि 5 high-intent starter prompts राख्नुहोस्",
      "pricing related prompt थप्नुहोस्",
      "direct contact prompt पनि राख्नुहोस्",
      "common customer questions हरेक महिना review गर्नुहोस्",
      "service वा price change हुँदा chatbot context update गर्नुहोस्",
    ],
    promptTitle: "Starter prompt examples",
    promptGroups: [
      {
        title: "Business services",
        prompts: [
          "तपाईंले कुन services दिनुहुन्छ?",
          "मेरो लागि कुन package राम्रो हुन्छ?",
          "custom quote पाउन सक्छु?",
        ],
      },
      {
        title: "Sales conversion",
        prompts: [
          "starting price कति हो?",
          "कति छिटो delivery हुन्छ?",
          "आजै कसरी सुरु गर्ने?",
        ],
      },
      {
        title: "Support",
        prompts: [
          "support सँग कसरी contact गर्ने?",
          "weekend मा पनि काम गर्नुहुन्छ?",
          "office कहाँ छ?",
        ],
      },
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        q: "यो setup गर्न गाह्रो हुन्छ?",
        a: "हुँदैन। धेरै प्रयोगकर्ताले केही मिनेटमै configure गरेर launch गर्न सक्छन्।",
      },
      {
        q: "पछि text र style change गर्न मिल्छ?",
        a: "मिल्छ। personality, prompts र visual settings जुनसुकै बेला update गर्न सकिन्छ।",
      },
      {
        q: "mobile मा काम गर्छ?",
        a: "गर्छ। chatbot responsive landing page experience का लागि बनाइएको हो।",
      },
      {
        q: "यसले human support replace गर्छ?",
        a: "यसले common र early-stage question सम्हाल्छ, त्यसपछि serious leads लाई तपाईंको preferred contact channel मा लैजान्छ।",
      },
      {
        q: "lead generation का लागि प्रयोग गर्न मिल्छ?",
        a: "मिल्छ। यसले visitor qualify गरेर inquiry वा booking तर्फ छिटो डोर्‍याउँछ।",
      },
    ],
    pairTitle: "Chatbot सँग राम्रो काम गर्ने landing page sections",
    pairings: [
      "स्पष्ट headline र value proposition",
      "services वा packages section",
      "testimonial र trust proof",
      "pricing summary",
      "contact वा booking CTA",
    ],
    finalTitle: "अझ धेरै visitors लाई customer मा बदल्न तयार हुनुहुन्छ?",
    finalBody:
      "HamroLink Chatbot enable गरेर तपाईंको landing page मा २४/७ conversion-focused support दिनुहोस्।",
    finalButton: "Chatbot सहित Launch गर्नुहोस्",
    sampleConversation: {
      user1: "तपाईंले के services दिनुहुन्छ?",
      ai1: "हामी service, pricing, contact details देखाउन सक्छौं र visitor लाई उनीहरूलाई चाहिएको best next step तर्फ लैजान मद्दत गर्छौं।",
      user2: "आजै कसरी सुरु गर्ने?",
      ai2: "तपाईंको HamroLink site छान्नुहोस्, business summary राख्नुहोस्, chatbot enable गर्नुहोस्, अनि publish गर्नु अघि 3 देखि 5 starter prompts test गर्नुहोस्।",
    },
  },
} as const;

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-300/80 mb-4">{eyebrow}</p>
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">{title}</h2>
      {body ? <p className="mt-5 text-lg text-slate-300 leading-relaxed">{body}</p> : null}
    </div>
  );
}

export default function AISitePage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = React.use(params);
  const d = getDictionary(lang);
  const copy = pageCopy[lang] ?? pageCopy.en;
  const accent = "#f59e0b";

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col">
      <Navbar lang={lang} accent={accent} nav={d.nav} forceScrolled={true} />

      <main className="flex-1 pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_50%),radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.12),transparent_35%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 space-y-24">
          <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-200 text-sm font-bold mb-6">
                <Bot className="w-4 h-4" />
                {copy.badge}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight max-w-4xl">
                {copy.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                {copy.intro}
              </p>
              <p className="mt-4 text-base font-semibold text-amber-200/90 max-w-2xl">
                {copy.highlight}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="https://app.hamrolink.com"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-base font-black shadow-[0_18px_60px_rgba(245,158,11,0.28)] transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5" />
                  {copy.primaryCta}
                </Link>
                <Link
                  href={`/${lang}/pricing`}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-white/12 bg-white/5 hover:bg-white/8 text-white text-base font-bold transition-colors"
                >
                  {copy.secondaryCta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_65%)] blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/80 backdrop-blur p-5 shadow-2xl">
                <div className="rounded-[1.6rem] border border-white/8 bg-[#0b1225] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/15 flex items-center justify-center border border-amber-300/15">
                        <Bot className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <p className="text-white font-black leading-none">HamroLink Chatbot</p>
                        <p className="text-xs text-emerald-300 mt-1">Online 24/7</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs font-bold">
                      {copy.metricLabel}
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex justify-end">
                      <div className="max-w-[78%] rounded-[1.25rem] rounded-br-md bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20">
                        {copy.sampleConversation.user1}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-white/6 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="max-w-[82%] rounded-[1.25rem] rounded-tl-md bg-white/8 px-4 py-3 text-sm text-slate-100 leading-relaxed">
                        {copy.sampleConversation.ai1}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[78%] rounded-[1.25rem] rounded-br-md bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20">
                        {copy.sampleConversation.user2}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-white/6 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="max-w-[82%] rounded-[1.25rem] rounded-tl-md bg-white/8 px-4 py-3 text-sm text-slate-100 leading-relaxed">
                        {copy.sampleConversation.ai2}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-black">{copy.metricLabel}</p>
                    <p className="text-white font-black text-lg leading-snug mt-2">{copy.metricValue}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/8 bg-amber-500/10 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-amber-200/80 font-black">24/7</p>
                    <p className="text-white font-black text-lg leading-snug mt-2">
                      {lang === "ne" ? "office बन्द हुँदा पनि business live रहन्छ" : "Your business stays responsive after hours, on weekends, and during rush time."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <SectionHeading eyebrow={copy.badge} title={copy.whyTitle} body={copy.whyBody} />
            <div className="grid sm:grid-cols-2 gap-4">
              {copy.benefits.map((item, index) => (
                <div key={item} className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5 shadow-[0_12px_40px_rgba(2,6,23,0.35)]">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/12 border border-amber-300/15 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                  </div>
                  <p className="text-sm font-black text-slate-500 uppercase tracking-[0.24em] mb-3">0{index + 1}</p>
                  <p className="text-white text-lg font-bold leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <SectionHeading eyebrow={copy.badge} title={copy.capabilityTitle} />
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {copy.capabilities.map(({ title, body, icon: Icon }) => (
                <div key={title} className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 hover:border-amber-300/20 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-300/15 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <h3 className="text-white text-xl font-black tracking-tight mb-3">{title}</h3>
                  <p className="text-slate-300 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <SectionHeading eyebrow={copy.badge} title={copy.bestForTitle} />
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {copy.bestFor.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-3">
                    <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-300" />
                    </div>
                    <span className="text-white font-bold leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0b1328] p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_38%)]" />
              <div className="relative">
                <SectionHeading eyebrow={copy.badge} title={copy.flowTitle} />
                <div className="mt-8 space-y-4">
                  {copy.flow.map((step, index) => (
                    <div key={step} className="flex gap-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 shrink-0 flex items-center justify-center font-black">
                        {index + 1}
                      </div>
                      <p className="text-white font-semibold text-lg leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid xl:grid-cols-[0.95fr_1.05fr] gap-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <SectionHeading eyebrow={copy.badge} title={copy.glanceTitle} />
              <div className="mt-8 grid gap-3">
                {copy.glance.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                    <span className="text-white font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),rgba(15,23,42,0.82))] p-8">
              <SectionHeading eyebrow={copy.badge} title={copy.enableTitle} />
              <div className="mt-8 grid gap-3">
                {copy.enableSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <div className="w-10 h-10 rounded-xl bg-white text-slate-950 shrink-0 flex items-center justify-center font-black text-sm">
                      {index + 1}
                    </div>
                    <p className="text-white font-semibold leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <SectionHeading eyebrow={copy.badge} title={copy.checklistTitle} />
              <div className="mt-8 grid gap-3">
                {copy.checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                    <span className="text-white font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#0a1120] p-8">
              <SectionHeading eyebrow={copy.badge} title={copy.pricingTitle} body={copy.pricingBody} />
              <div className="mt-8 rounded-[1.6rem] border border-white/8 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock3 className="w-5 h-5 text-amber-300" />
                  <p className="text-white font-black text-lg">
                    {lang === "ne" ? "Plan अनुसार chatbot access र limits unlock हुन्छन्" : "Chatbot access unlocks by plan and usage limits."}
                  </p>
                </div>
                <p className="text-slate-300 leading-relaxed">{copy.pricingNote}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/${lang}/pricing`} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-amber-400 transition-colors">
                    {copy.secondaryCta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <SectionHeading eyebrow={copy.badge} title={copy.tipsTitle} />
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {copy.tips.map((tip) => (
                <div key={tip} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                  <PhoneCall className="w-5 h-5 text-cyan-300 mb-4" />
                  <p className="text-white text-lg font-bold leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <SectionHeading eyebrow={copy.badge} title={copy.promptTitle} />
            <div className="grid lg:grid-cols-3 gap-5">
              {copy.promptGroups.map((group) => (
                <div key={group.title} className="rounded-[1.8rem] border border-white/10 bg-[#0b1328] p-6">
                  <h3 className="text-white text-xl font-black tracking-tight mb-5">{group.title}</h3>
                  <div className="space-y-3">
                    {group.prompts.map((prompt) => (
                      <div key={prompt} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-slate-100 font-semibold leading-relaxed">
                        {prompt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid xl:grid-cols-[1.05fr_0.95fr] gap-10">
            <div className="space-y-5">
              <SectionHeading eyebrow={copy.badge} title={copy.faqTitle} />
              {copy.faqs.map((item) => (
                <div key={item.q} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-white text-xl font-black tracking-tight mb-3">{item.q}</h3>
                  <p className="text-slate-300 leading-relaxed text-lg">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(14,165,233,0.14),rgba(15,23,42,0.9))] p-8 h-fit">
              <SectionHeading eyebrow={copy.badge} title={copy.pairTitle} />
              <div className="mt-8 space-y-3">
                {copy.pairings.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                    <BadgeCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                    <span className="text-white font-semibold leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,158,11,0.16),rgba(15,23,42,0.96))] px-8 py-10 md:px-12 md:py-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_44%)]" />
            <div className="relative max-w-3xl mx-auto">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200/80 mb-4">HamroLink Chatbot</p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">{copy.finalTitle}</h2>
              <p className="mt-5 text-lg text-slate-200 leading-relaxed">{copy.finalBody}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="https://app.hamrolink.com"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-black text-slate-950 hover:bg-amber-50 transition-colors"
                >
                  {copy.finalButton}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white hover:bg-white/8 transition-colors"
                >
                  {lang === "ne" ? "टिमसँग कुरा गर्नुहोस्" : "Talk to the Team"}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} d={d} PRE_LAUNCH={false} ctaHref={() => "https://app.hamrolink.com"} />
    </div>
  );
}
