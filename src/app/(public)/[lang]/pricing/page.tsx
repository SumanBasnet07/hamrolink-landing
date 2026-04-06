"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Check,
  Zap,
  Star,
  ArrowRight,
  Infinity as InfinityIcon,
  Globe,
  Bot,
  ShoppingCart,
  Crown,
  Rocket,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Info,
  X,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/landing/Navbar";

// --- Types ---
interface PlanFeat {
  readonly t: string;
  readonly ok: boolean;
}

interface DictionaryPlan {
  readonly name: string;
  readonly desc: string;
  readonly feats: readonly PlanFeat[];
}

interface FeatureComparisonRow {
  readonly label: string;
  readonly values: readonly (string | number | boolean)[];
}

type Params = Promise<{ lang: string }>;

const PLANS = [
  {
    _id: "507f1f77bcf86cd799439018",
    name: "institution_standard",
    monthlyCredits: 899,
    yearlyCredits: 8990,
    highlight: false,
    icon: Globe,
    color: "from-indigo-600 to-violet-700",
    shadow: "shadow-indigo-200",
    sites: 1,
    pagesPerSite: 100,
    blogPages: 250,
    ecommerceSites: 1,
    maxProductsPerEcommerce: 200,
    noticeLimit: 100,
    notesLimit: 100,
    monthlyEmailLimit: 1000,
    chatbot: "true",
    customDomain: "true",
    removeBranding: "true",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "business",
    monthlyCredits: 399,
    yearlyCredits: 3990,
    highlight: true,
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-200",
    sites: 1,
    pagesPerSite: 40,
    blogPages: 100,
    ecommerceSites: 1,
    maxProductsPerEcommerce: 80,
    noticeLimit: 25,
    notesLimit: 50,
    monthlyEmailLimit: 500,
    chatbot: "true",
    customDomain: "true",
    removeBranding: "true",
  },
  {
    _id: "507f1f77bcf86cd799439015",
    name: "free",
    monthlyCredits: 0,
    yearlyCredits: 0,
    icon: Rocket,
    color: "from-slate-500 to-slate-700",
    shadow: "shadow-slate-100",
    sites: 1,
    pagesPerSite: 5,
    blogPages: 0,
    ecommerceSites: 0,
    maxProductsPerEcommerce: 0,
    noticeLimit: 0,
    notesLimit: 15,
    monthlyEmailLimit: 50,
    chatbot: "false",
    customDomain: "false",
    removeBranding: "false",
  },
  {
    _id: "507f1f77bcf86cd799439999",
    name: "institution_pro",
    monthlyCredits: 2500,
    yearlyCredits: 25000,
    highlight: false,
    icon: Crown,
    color: "from-violet-700 to-purple-800",
    shadow: "shadow-violet-300",
    sites: 1,
    pagesPerSite: 200,
    blogPages: 500,
    ecommerceSites: 1,
    maxProductsPerEcommerce: 500,
    noticeLimit: 500,
    notesLimit: 500,
    monthlyEmailLimit: 10000,
    chatbot: "true",
    customDomain: "true",
    removeBranding: "true",
  },
  {
    _id: "69b8ede40f1a11aa60811df8",
    name: "local_start",
    monthlyCredits: 199,
    yearlyCredits: 1990,
    icon: Star,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-100",
    fullWidth: true,
    sites: 1,
    pagesPerSite: 20,
    blogPages: 30,
    ecommerceSites: 1,
    maxProductsPerEcommerce: 30,
    noticeLimit: 20,
    notesLimit: 30,
    monthlyEmailLimit: 250,
    chatbot: "true",
    customDomain: "true",
    removeBranding: "false",
  },
];

export default function PricingPage({ params }: { params: Params }) {
  const { lang } = React.use(params);
  const d = getDictionary(lang);
  const p = d.pricing;
  const PRE_LAUNCH = true;
  const accent = "#6366f1";

  const t = (key: string) => {
    const keys = key.split(".");
    let current: any = d.pricing;
    for (const k of keys) {
      if (current[k] === undefined) return key;
      current = current[k];
    }
    return current;
  };

  const getLimit = (planName: string, key: string) => {
    const plan = PLANS.find((p) => p.name === planName);
    return plan ? (plan as any)[key] : "";
  };

  const getCredits = (planName: string) => {
    const plan = PLANS.find((p) => p.name === planName);
    if (!plan) return "0";
    if (plan.name === "free") return "100";
    return plan.monthlyCredits.toLocaleString();
  };

  const rows = React.useMemo(() => {
    return [
      {
        name: t("comparison.websites"),
        free: getLimit("free", "sites"),
        local_start: getLimit("local_start", "sites"),
        business: getLimit("business", "sites"),
        institution_standard: getLimit("institution_standard", "sites"),
        institution_pro: getLimit("institution_pro", "sites"),
      },
      {
        name: t("comparison.pages"),
        free: getLimit("free", "pagesPerSite"),
        local_start: getLimit("local_start", "pagesPerSite"),
        business: getLimit("business", "pagesPerSite"),
        institution_standard: getLimit("institution_standard", "pagesPerSite"),
        institution_pro: getLimit("institution_pro", "pagesPerSite"),
      },
      {
        name: t("comparison.blog_pages"),
        free: getLimit("free", "blogPages"),
        local_start: getLimit("local_start", "blogPages"),
        business: getLimit("business", "blogPages"),
        institution_standard: getLimit("institution_standard", "blogPages"),
        institution_pro: getLimit("institution_pro", "blogPages"),
      },
      {
        name: t("comparison.ecommerce_sites"),
        free: getLimit("free", "ecommerceSites") > 0,
        local_start: getLimit("local_start", "ecommerceSites") > 0,
        business: getLimit("business", "ecommerceSites") > 0,
        institution_standard: getLimit("institution_standard", "ecommerceSites") > 0,
        institution_pro: getLimit("institution_pro", "ecommerceSites") > 0,
      },
      {
        name: t("comparison.max_products"),
        free: getLimit("free", "maxProductsPerEcommerce"),
        local_start: getLimit("local_start", "maxProductsPerEcommerce"),
        business: getLimit("business", "maxProductsPerEcommerce"),
        institution_standard: getLimit("institution_standard", "maxProductsPerEcommerce"),
        institution_pro: getLimit("institution_pro", "maxProductsPerEcommerce"),
      },
      {
        name: t("comparison.notices"),
        free: getLimit("free", "noticeLimit"),
        local_start: getLimit("local_start", "noticeLimit"),
        business: getLimit("business", "noticeLimit"),
        institution_standard: getLimit("institution_standard", "noticeLimit"),
        institution_pro: getLimit("institution_pro", "noticeLimit"),
      },
      {
        name: t("comparison.notes"),
        free: getLimit("free", "notesLimit"),
        local_start: getLimit("local_start", "notesLimit"),
        business: getLimit("business", "notesLimit"),
        institution_standard: getLimit("institution_standard", "notesLimit"),
        institution_pro: getLimit("institution_pro", "notesLimit"),
      },
      {
        name: t("comparison.emails"),
        free: getLimit("free", "monthlyEmailLimit"),
        local_start: getLimit("local_start", "monthlyEmailLimit"),
        business: getLimit("business", "monthlyEmailLimit"),
        institution_standard: getLimit("institution_standard", "monthlyEmailLimit"),
        institution_pro: getLimit("institution_pro", "monthlyEmailLimit"),
      },
      {
        name: t("comparison.image_uploads"),
        free: "250 MB",
        local_start: "1 GB",
        business: "5 GB",
        institution_standard: "15 GB",
        institution_pro: "30 GB",
      },
      {
        name: t("comparison.chatbot"),
        free: getLimit("free", "chatbot") === "true",
        local_start: getLimit("local_start", "chatbot") === "true",
        business: getLimit("business", "chatbot") === "true",
        institution_standard: getLimit("institution_standard", "chatbot") === "true",
        institution_pro: getLimit("institution_pro", "chatbot") === "true",
      },
      {
        name: t("comparison.domain"),
        free: getLimit("free", "customDomain") === "true" ? t("comparison.values.yes") : t("comparison.values.no"),
        local_start: getLimit("local_start", "customDomain") === "true" ? t("comparison.values.yes") : t("comparison.values.no"),
        business: getLimit("business", "customDomain") === "true" ? t("comparison.values.yes") : t("comparison.values.no"),
        institution_standard: getLimit("institution_standard", "customDomain") === "true" ? t("comparison.values.yes_ssl") : t("comparison.values.no"),
        institution_pro: getLimit("institution_pro", "customDomain") === "true" ? t("comparison.values.yes_ssl") : t("comparison.values.no"),
      },
      {
        name: t("comparison.ads"),
        free: getLimit("free", "removeBranding") === "true",
        local_start: getLimit("local_start", "removeBranding") === "true",
        business: getLimit("business", "removeBranding") === "true",
        institution_standard: getLimit("institution_standard", "removeBranding") === "true",
        institution_pro: getLimit("institution_pro", "removeBranding") === "true",
      },
      {
        name: t("comparison.support"),
        free: t("comparison.values.community"),
        local_start: t("comparison.values.email"),
        business: t("comparison.values.email"),
        institution_standard: t("comparison.values.priority"),
        institution_pro: t("comparison.values.priority"),
      },
      {
        name: t("comparison.monthly_credits"),
        free: getCredits("free"),
        local_start: getCredits("local_start"),
        business: getCredits("business"),
        institution_standard: getCredits("institution_standard"),
        institution_pro: getCredits("institution_pro"),
      },
      {
        name: t("comparison.school_os"),
        free: false,
        local_start: false,
        business: false,
        institution_standard: "sandbox",
        institution_pro: true,
      },
      {
        name: t("comparison.result_checker"),
        free: false,
        local_start: false,
        business: false,
        institution_standard: "sandbox",
        institution_pro: true,
      },
      {
        name: t("comparison.marksheet"),
        free: false,
        local_start: false,
        business: false,
        institution_standard: "sandbox",
        institution_pro: true,
      },
      {
        name: t("comparison.ai_remarks"),
        free: false,
        local_start: false,
        business: false,
        institution_standard: "sandbox",
        institution_pro: true,
      },
      {
        name: t("comparison.crm_sync"),
        free: false,
        local_start: false,
        business: false,
        institution_standard: "sandbox",
        institution_pro: true,
      },
    ];
  }, [d]);

  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const gridPlans = PLANS.filter((plan) => plan.name !== "local_start").sort((a, b) => {
    const order: Record<string, number> = { free: 0, business: 1, institution_standard: 2, institution_pro: 3 };
    return (order[a.name] ?? 99) - (order[b.name] ?? 99);
  });

  const localPlan = PLANS.find((plan) => plan.name === "local_start");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar lang={lang} accent={accent} nav={d.nav} forceScrolled={true} />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px] opacity-60" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-100 blur-[100px] opacity-40" />
          <div className="absolute -bottom-[5%] left-1/4 w-[35%] h-[35%] rounded-full bg-violet-100 blur-[110px] opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold mb-4"
            >
              <Sparkles className="w-3 h-3" />
              {p.badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight"
            >
              {p.heading.split("\n").map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {line}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-medium"
            >
              {p.subtext}
            </motion.p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <span className={`text-lg font-black transition-colors ${billing === "monthly" ? "text-gray-950" : "text-gray-500"}`}>
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
                <span className={`text-lg font-black transition-colors ${billing === "yearly" ? "text-gray-950" : "text-gray-500"}`}>
                  {p.yearly}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
                  {p.save}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {gridPlans.map((plan, i) => {
              const dictPlan = p.plans[i] as DictionaryPlan;
              const price = billing === "monthly" ? plan.monthlyCredits : Math.floor(plan.yearlyCredits / 12);
              const Icon = plan.icon;

              return (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
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
                  <p className="text-gray-600 text-base font-medium mb-6 leading-relaxed h-12 overflow-hidden">
                    {dictPlan?.desc}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-950">
                        {price === 0 ? p.free : `NPR ${price}`}
                      </span>
                      {price > 0 && <span className="text-gray-600 text-base font-bold">{p.perMonth}</span>}
                    </div>
                    {billing === "yearly" && price > 0 && (
                      <p className="text-emerald-600 text-xs font-bold mt-1 uppercase tracking-wider">
                        Billed annually (NPR {plan.yearlyCredits}/yr)
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mb-10">
                    {dictPlan?.feats.map((feat, fi) => (
                      <div key={fi} className="flex gap-3 items-start group/feat">
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

          {/* Featured Plan: Local Start */}
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
              <div className="lg:col-span-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-amber-600 text-[10px] font-black uppercase tracking-wider mb-6">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  Special Local Plan
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-amber-200">
                    <Star className="w-8 h-8 fill-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-950">
                      {p.plans[4]?.name || "Local Starter"}
                    </h2>
                    <div className="flex items-baseline justify-center lg:justify-start gap-1 mt-1">
                      <span className="text-2xl font-black text-gray-950">
                        NPR {billing === "monthly" ? localPlan?.monthlyCredits : Math.floor((localPlan?.yearlyCredits || 0) / 12)}
                      </span>
                      <span className="text-gray-600 text-base font-bold">{p.perMonth}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                  {p.plans[4]?.desc}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                  <Link
                    href={`/${lang}#waitlist`}
                    className="px-10 py-5 rounded-2xl bg-gray-900 text-white font-black hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 flex items-center gap-3 group/btn"
                  >
                    {p.ctaPaid}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {p.plans[4]?.feats.map((feat: PlanFeat, fi: number) => (
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

          {/* Comparison Table */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 mb-16"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">
                {p.featureComparison.heading}
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                {p.featureComparison.subtext}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-[48px] blur-2xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="min-w-[900px] bg-white rounded-[32px] md:rounded-[40px] border border-gray-200 shadow-2xl shadow-indigo-100/50 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-gray-100">
                        <th className="p-8 text-xs font-black text-gray-500 uppercase tracking-[0.2em] w-[250px]">
                          {p.featureComparison.labels.features}
                        </th>
                        <th className="p-8 text-sm font-black text-gray-900 uppercase tracking-wider text-center">
                          {p.featureComparison.plans.free}
                        </th>
                        <th className="p-8 text-sm font-black text-emerald-600 uppercase tracking-wider text-center">
                          {p.featureComparison.plans.local}
                        </th>
                        <th className="p-8 text-sm font-black text-blue-600 uppercase tracking-wider text-center">
                          {p.featureComparison.plans.business}
                        </th>
                        <th className="p-8 text-sm font-black text-purple-600 uppercase tracking-wider text-center">
                          {p.featureComparison.plans.standard}
                        </th>
                        <th className="p-8 text-sm font-black text-indigo-700 uppercase tracking-wider text-center">
                          {p.featureComparison.plans.pro}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row: any, ri: number) => {
                        const values = [
                          row.free,
                          row.local_start,
                          row.business,
                          row.institution_standard,
                          row.institution_pro
                        ];
                        return (
                          <tr 
                            key={ri} 
                            className={`
                              group/row border-b border-gray-50 last:border-0 hover:bg-indigo-50/30 transition-all duration-300
                              ${ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                            `}
                          >
                            <td className="p-6 md:p-8 text-base font-bold text-gray-700 group-hover/row:text-gray-950 transition-colors">
                              {row.name}
                            </td>
                            {values.map((val: any, vi: number) => {
                              const isBoolean = val === true || val === false;
                              return (
                                <td key={vi} className="p-6 md:p-8 text-base font-black text-gray-950 text-center">
                                  <div className="flex items-center justify-center">
                                    {val === "sandbox" ? (
                                      <div className="flex flex-col items-center gap-1 group/sandbox cursor-help bg-amber-50/50 px-3 py-1.5 rounded-xl border border-amber-100 hover:bg-amber-50 transition-colors">
                                        <Info className="w-4 h-4 text-amber-600" />
                                        <span className="text-[10px] text-amber-700 uppercase font-black tracking-tighter">Sandbox</span>
                                      </div>
                                    ) : isBoolean ? (
                                      val ? (
                                        <motion.div
                                          initial={{ scale: 0.5, opacity: 0 }}
                                          whileInView={{ scale: 1, opacity: 1 }}
                                          viewport={{ once: true }}
                                          transition={{ delay: vi * 0.05 }}
                                        >
                                          <Check className={`w-6 h-6 ${
                                            vi === 1 ? 'text-emerald-500' : 
                                            vi === 2 ? 'text-blue-500' :
                                            vi === 3 ? 'text-purple-500' : 'text-indigo-600'
                                          }`} strokeWidth={3} />
                                        </motion.div>
                                      ) : (
                                        <X className="w-6 h-6 text-red-300/70" strokeWidth={3} />
                                      )
                                    ) : (
                                      <span className={vi === 0 ? "text-gray-500 font-medium" : ""}>
                                        {val === -1 ? <InfinityIcon className="w-5 h-5 mx-auto text-gray-400" /> : val}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Mobile Hint */}
            <div className="mt-6 md:hidden flex items-center justify-center gap-2 text-gray-400 animate-pulse">
              <ChevronDown className="w-4 h-4 -rotate-90" />
              <span className="text-xs font-bold uppercase tracking-widest">Scroll for more features</span>
              <ChevronDown className="w-4 h-4 rotate-90" />
            </div>
          </motion.section>

          {/* Bottom Trust Line */}
          <div className="mt-24 text-center">
            <p className="text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed italic">
              &quot;{p.footer}&quot;
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
