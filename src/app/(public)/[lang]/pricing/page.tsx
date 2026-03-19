"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Check,
  X,
  Menu,
  Zap,
  Crown,
  Globe,
  Rocket,
  Shield,
  Star,
  ArrowRight,
  ChevronDown,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { Footer } from "@/components/Footer";

// ─── Pre-launch flag ──────────────────────────────────────────────────────────
const PRE_LAUNCH = true;

const PLANS = [
  {
    _id: "507f1f77bcf86cd799439018",
    name: "pro",
    limits: {
      sites: 1,
      pagesPerSite: 50,
      blogPages: 150,
      routing: true,
      chatbot: true,
      ecommerceSites: 1,
      maxProductsPerEcommerce: 300,
      customDomain: true,
      removeBranding: true,
      advancedAnalytics: true,
      prioritySupport: true,
      customCodeInjection: true,
      freeAiEditsPerSite: 3,
      aiCostPerEdit: 2,
      imagesUploads: 200,
      fileUploads: 10,
      chatbotMessageLimit: 3000,
      eventsLimit: 25,
      noticeLimit: 50,
      monthlyEmailLimit: 600,
      notesLimit: 25,
      isBlogAllowed: true,
      blogPostsLimit: 150,
    },
    monthlyCredits: 899,
    yearlyCredits: 9493,
    highlight: true,
    icon: Crown,
    color: "from-violet-600 to-indigo-700",
    shadow: "shadow-violet-200",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "starter",
    limits: {
      sites: 1,
      pagesPerSite: 20,
      blogPages: 30,
      routing: true,
      chatbot: true,
      ecommerceSites: 1,
      maxProductsPerEcommerce: 30,
      customDomain: true,
      removeBranding: true,
      advancedAnalytics: false,
      prioritySupport: false,
      customCodeInjection: false,
      freeAiEditsPerSite: 3,
      aiCostPerEdit: 2,
      imagesUploads: 100,
      fileUploads: 5,
      chatbotMessageLimit: 1500,
      eventsLimit: 10,
      noticeLimit: 20,
      monthlyEmailLimit: 250,
      notesLimit: 10,
      isBlogAllowed: true,
      blogPostsLimit: 30,
    },
    monthlyCredits: 399,
    yearlyCredits: 4213,
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-100",
  },
  {
    _id: "507f1f77bcf86cd799439015",
    name: "free",
    limits: {
      sites: 1,
      pagesPerSite: 5,
      blogPages: 0,
      routing: true,
      chatbot: false,
      ecommerceSites: 0,
      maxProductsPerEcommerce: 0,
      customDomain: false,
      removeBranding: false,
      advancedAnalytics: false,
      prioritySupport: false,
      customCodeInjection: false,
      freeAiEditsPerSite: 3,
      aiCostPerEdit: 2,
      imagesUploads: 25,
      fileUploads: 5,
      chatbotMessageLimit: 0,
      eventsLimit: 0,
      noticeLimit: 0,
      monthlyEmailLimit: 50,
      notesLimit: 5,
      isBlogAllowed: false,
      blogPostsLimit: 0,
    },
    monthlyCredits: 0,
    yearlyCredits: 0,
    icon: Rocket,
    color: "from-slate-500 to-slate-700",
    shadow: "shadow-slate-100",
  },
  {
    _id: "507f1f77bcf86cd799439014",
    name: "local_starter",
    limits: {
      sites: 1,
      pagesPerSite: 10,
      blogPages: 10,
      routing: true,
      chatbot: true,
      ecommerceSites: 1,
      maxProductsPerEcommerce: 20,
      customDomain: false,
      removeBranding: false,
      advancedAnalytics: false,
      prioritySupport: false,
      customCodeInjection: false,
      freeAiEditsPerSite: 3,
      aiCostPerEdit: 2,
      imagesUploads: 50,
      fileUploads: 5,
      chatbotMessageLimit: 1000,
      eventsLimit: 5,
      noticeLimit: 10,
      monthlyEmailLimit: 100,
      notesLimit: 5,
      isBlogAllowed: true,
      blogPostsLimit: 10,
    },
    monthlyCredits: 199,
    yearlyCredits: 1990,
    icon: Star,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-100",
    fullWidth: true,
  },
];

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
              ? "bg-white text-gray-900 shadow-sm"
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
  const [scrolled, setScrolled] = useState(true);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className={`font-black flex items-center text-xl tracking-tight text-gray-900`}
        >
          <img src="/logo.png" className="w-8 h-8 mr-2" alt="HamroLink Logo" />
          Hamro<span style={{ color: accent }}>Link</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[
            [`/${lang}#ai-staff`, nav.templates],
            [`/${lang}#features`, nav.features],
            [`/${lang}/pricing`, nav.pricing],
            [`/${lang}#stories`, nav.docs],
            [`/${lang}/contact`, nav.contact],
          ].map(([href, label]) => (
            <Link
              key={label}
              href={href}
              className={`text-base font-bold text-gray-800 hover:text-gray-950 transition-colors`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher lang={lang} accent={accent} scrolled={true} />
          <a
            href={`/${lang}#waitlist`}
            className="flex items-center gap-1.5 px-6 py-2.5 text-white text-base font-black rounded-xl transition-all hover:scale-105 shadow-xl shadow-indigo-100"
            style={{ background: accent }}
          >
            <Sparkles className="w-4 h-4" />{" "}
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
              [`/${lang}/pricing`, nav.pricing],
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

export default function PricingPage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const p = d.pricing;
  const accent = "#6366f1";

  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  // Filter plans for the grid and the full-width one
  const gridPlans = PLANS.filter((plan) => plan.name !== "local_starter").sort((a, b) => {
    // Exact order: free, starter, pro
    const order = { free: 0, starter: 1, pro: 2 };
    return (order as any)[a.name] - (order as any)[b.name];
  });
  const localStarter = PLANS.find((plan) => plan.name === "local_starter");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar lang={lang} accent={accent} nav={d.nav} />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px] opacity-60" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-100 blur-[100px] opacity-40" />
          <div className="absolute -bottom-[5%] left-1/4 w-[35%] h-[35%] rounded-full bg-violet-100 blur-[110px] opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold mb-4">
                <Sparkles className="w-3 h-3" />
                {p.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                {p.heading.split("\n").map((line: string, i: number) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                {p.subtext}
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-6 mb-12">
                <span className={`text-lg font-black ${billing === "monthly" ? "text-gray-950" : "text-gray-500"}`}>
                  {p.monthly}
                </span>
                <button
                  onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                  className="w-16 h-8 bg-gray-300 rounded-full p-1 relative transition-colors duration-300 focus:outline-none ring-2 ring-gray-100"
                >
                  <motion.div
                    animate={{ x: billing === "monthly" ? 0 : 32 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-black ${billing === "yearly" ? "text-gray-950" : "text-gray-500"}`}>
                    {p.yearly}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
                    {p.save}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 1. Grid Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {gridPlans.map((plan, i) => {
              const dictPlan = p.plans[i];
              const Icon = plan.icon;
              const price = billing === "monthly" ? plan.monthlyCredits : Math.floor(plan.yearlyCredits / 12);
              const totalYearly = plan.yearlyCredits;

              return (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative bg-white rounded-[40px] p-8 md:p-10 border transition-all duration-500 ${
                    plan.highlight 
                      ? `border-indigo-300 shadow-2xl ${plan.shadow}/40 scale-105 z-10` 
                      : "border-gray-200 shadow-xl shadow-gray-300/50 hover:border-indigo-200 hover:shadow-2xl"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-700 to-violet-700 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-950 mb-2 capitalize">
                    {dictPlan?.name || plan.name}
                  </h3>
                  <p className="text-gray-600 text-base font-medium mb-6 leading-relaxed">
                    {dictPlan?.desc}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-950">
                        {price === 0 ? p.free : `NPR ${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-gray-600 text-base font-bold">{p.perMonth}</span>
                      )}
                    </div>
                    {billing === "yearly" && price > 0 && (
                      <p className="text-emerald-600 text-xs font-bold mt-1 uppercase tracking-wider">
                        Billed annually (NPR {totalYearly}/yr)
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mb-10">
                    {dictPlan?.feats.map((feat: any, fi: number) => (
                      <div key={fi} className="flex gap-3 items-start">
                        {feat.ok ? (
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-base font-medium leading-relaxed ${feat.ok ? "text-gray-700 font-semibold" : "text-gray-400 line-through"}`}>
                          {feat.t}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/${lang}#waitlist`}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-95 ${
                      plan.highlight
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700"
                        : "bg-gray-50 text-gray-900 border border-gray-100 hover:bg-gray-100"
                    }`}
                  >
                    {price === 0 ? p.ctaFree : p.ctaPaid}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* 2. Full Width Local Starter */}
          {localStarter && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[40px] p-8 md:p-12 border border-amber-100 shadow-2xl shadow-amber-50/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-50 rounded-full blur-3xl -z-10 opacity-40" />

              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-amber-600 text-[10px] font-black uppercase tracking-wider mb-6">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    Special Local Plan
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-amber-200">
                      <Star className="w-8 h-8 fill-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-950">
                        {p.plans[3]?.name || "Local Starter"}
                      </h2>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-black text-gray-950">
                          NPR {billing === "monthly" ? localStarter.monthlyCredits : Math.floor(localStarter.yearlyCredits / 12)}
                        </span>
                        <span className="text-gray-600 text-base font-bold">{p.perMonth}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                    {p.plans[3]?.desc || "Perfect for small local businesses starting their digital journey."}
                  </p>

                  <Link
                    href={`/${lang}#waitlist`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
                  >
                    {p.ctaPaid}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="lg:col-span-7">
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {p.plans[3]?.feats.map((feat: any, fi: number) => (
                      <div key={fi} className="flex gap-3 items-center">
                        <div className={`p-1 rounded-full ${feat.ok ? "bg-amber-100 text-amber-700" : "bg-gray-200 text-gray-400"}`}>
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                        <span className={`text-base font-black ${feat.ok ? "text-gray-800" : "text-gray-400 line-through decoration-gray-300"}`}>
                          {feat.t}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-5 bg-amber-100/50 border border-amber-200 rounded-2xl flex gap-4 items-start">
                    <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900/80 leading-relaxed font-bold">
                      Designed for shops, boutiques, and small services who need a professional presence without the complexity. Includes eSewa/Khalti integration and basic AI chatbot.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pricing Meta block */}
          <div className="mt-20 text-center">
            <p className="text-gray-700 text-lg font-bold max-w-2xl mx-auto leading-relaxed">
              {p.footer}
            </p>
          </div>
        </div>
      </main>

      <Footer
        lang={lang}
        d={d}
        PRE_LAUNCH={PRE_LAUNCH}
        ctaHref={(href) => (PRE_LAUNCH ? `/${lang}#waitlist` : href)}
      />
    </div>
  );
}
