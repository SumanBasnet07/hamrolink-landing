"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Star, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  Utensils, 
  GraduationCap,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Camera,
  Search
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/Footer";

const businessIcons: Record<string, any> = {
  "Photographer, Kathmandu": Camera,
  "Café, Pokhara": Utensils,
  "Consultancy, Butwal": Briefcase,
  "फोटोग्राफर, काठमाडौं": Camera,
  "क्याफे, पोखरा": Utensils,
  "कन्सल्टेन्सी, बुटवल": Briefcase,
};

const templateIcons: Record<string, any> = {
  ShoppingBag: ShoppingBag,
  GraduationCap: GraduationCap,
  Utensils: Utensils,
};

export default function StoriesSitePage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const t = d.transformation;
  const ex = d.examples;
  const accent = "#6366f1";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar lang={lang} accent={accent} nav={d.nav} forceScrolled={true} />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px] opacity-40" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-100 blur-[100px] opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-black uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t.badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-950 leading-[1.1] mb-6 tracking-tight"
            >
              {t.heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-xl md:text-2xl font-medium leading-relaxed"
            >
              {t.subtext}
            </motion.p>
          </div>

          {/* Scenario Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
            {t.items.map((item: any, i: number) => {
              const Icon = businessIcons[item.business] || Briefcase;
              return (
                <motion.div
                  key={item.business}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col hover:border-indigo-200 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.business}</p>
                      <h3 className="text-xl font-bold text-slate-950 leading-tight">{item.outcome}</h3>
                    </div>
                  </div>

                  <div className="space-y-8 flex-1">
                    {/* Before */}
                    <div>
                      <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <XCircle className="w-3.5 h-3.5" />
                        Before
                      </h4>
                      <ul className="space-y-2">
                        {item.before.map((point: string, pi: number) => (
                          <li key={pi} className="text-slate-500 text-sm font-medium leading-relaxed flex gap-2">
                            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After */}
                    <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        After
                      </h4>
                      <ul className="space-y-2">
                        {item.after.map((point: string, pi: number) => (
                          <li key={pi} className="text-indigo-900 text-sm font-bold leading-relaxed flex gap-2">
                            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcome */}
                    <div className="pt-2">
                      <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Result
                      </h4>
                      <ul className="space-y-2">
                        {item.result.map((point: string, pi: number) => (
                          <li key={pi} className="text-slate-800 text-sm font-bold leading-relaxed flex gap-2">
                            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Emotional Story: Imagine This */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-950 rounded-[4rem] p-10 md:p-20 relative overflow-hidden text-center mb-32 shadow-3xl"
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-indigo-600/20 rounded-full blur-[120px]" />
              <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-sm mb-8">
                {t.imagineThis.heading}
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-[1.2] tracking-tight italic opacity-90">
                &quot;{t.imagineThis.story}&quot;
              </h2>
              <div className="h-px w-24 bg-indigo-500/30 mx-auto mb-10" />
              <p className="text-white text-2xl md:text-3xl font-black mb-12">
                {t.imagineThis.question}
              </p>
              <div className="flex flex-col items-center gap-8">
                <p className="text-indigo-200/60 text-lg font-bold">
                  {t.imagineThis.alternative}
                </p>
                <Link
                  href={`/${lang}#waitlist`}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl text-lg font-black hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-600/40"
                >
                  <Sparkles className="w-5 h-5" />
                  {t.imagineThis.cta}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Template Showcase */}
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-tight">{ex.heading}</h2>
            <p className="text-slate-500 text-xl font-medium">{ex.subtext}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {ex.items.map((item: any, i: number) => {
              const Icon = templateIcons[item.icon] || ShoppingBag;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-900 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 mb-6">{item.name}</h3>
                  
                  <ul className="space-y-4 mb-8">
                    {item.feats.map((feat: string, fi: number) => (
                      <li key={fi} className="flex items-center gap-3 text-slate-600 font-bold text-base">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <div className="w-full h-48 bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-100">
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Search className="w-10 h-10 text-slate-300 opacity-50 group-hover:scale-110 transition-transform" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Final Social Proof Line */}
          <div className="text-center bg-white border border-slate-200 p-8 rounded-3xl max-w-2xl mx-auto shadow-sm">
             <p className="text-slate-500 font-bold italic">
               &ldquo;Join over 240+ Nepali businesses who are already making the switch.&rdquo;
             </p>
          </div>
        </div>
      </main>

      <Footer lang={lang} d={d} PRE_LAUNCH={true} ctaHref={(href: string) => `/${lang}#waitlist`} />
    </div>
  );
}
