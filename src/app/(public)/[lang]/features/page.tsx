"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Globe, ShoppingBag, Bot, Smartphone, Search, QrCode, Inbox, BarChart3, 
  Zap, Shield, Clock, Layout, Sparkles, MapPin, ArrowRight, User 
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/Footer";

export default function FeaturesSitePage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const f = d.features;
  const accent = "#6366f1";

  const FEAT_ICONS = [
    Globe, ShoppingBag, Bot, Smartphone, 
    Search, QrCode, Inbox, BarChart3, 
    Zap, Shield, Clock, Layout
  ];

  const FEAT_GRADS = [
    "from-blue-500 to-cyan-500",
    "from-orange-500 to-red-500",
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-pink-500 to-rose-500",
    "from-amber-500 to-yellow-500",
    "from-sky-500 to-blue-600",
    "from-slate-500 to-gray-600",
    "from-indigo-500 to-violet-600",
    "from-rose-500 to-pink-600",
    "from-teal-500 to-emerald-600",
    "from-blue-600 to-indigo-700",
  ];

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

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold mb-4">
                <Sparkles className="w-3 h-3" />
                {f.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                {f.heading}
              </h1>
              <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                {f.subtext}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {f.items.map((item: any, i: number) => {
              const Icon = FEAT_ICONS[i % FEAT_ICONS.length];
              const grad = FEAT_GRADS[i % FEAT_GRADS.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-indigo-100/30 hover:border-indigo-200 transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Special Feature Highlight */}
          <div className="bg-gray-950 rounded-[4rem] p-8 md:p-20 relative overflow-hidden mb-20">
             <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
             <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                   <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                     {(f as any).items[8]?.title || "Built for the Nepali Context"}
                   </h2>
                   <p className="text-white/80 text-xl leading-relaxed mb-10 font-medium">
                     {(f as any).items[8]?.desc || "Every feature is designed around one goal: making your business look and work more professionally than your competitors."}
                   </p>
                   <Link href={`https://app.hamrolink.com`} className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-lg font-black hover:scale-105 transition-all shadow-xl shadow-indigo-500/20">
                     <Sparkles className="w-5 h-5" />
                     {d.nav.cta}
                   </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {[
                     { icon: Smartphone, label: "Mobile First" },
                     { icon: Globe, label: "SEO Ready" },
                     { icon: QrCode, label: "QR Ready" },
                     { icon: Shield, label: "Secure" }
                   ].map((item, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center">
                        <item.icon className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                        <p className="text-white font-black text-sm uppercase tracking-widest">{item.label}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} d={d} PRE_LAUNCH={false} ctaHref={(href: string) => `https://app.hamrolink.com`} />
    </div>
  );
}
