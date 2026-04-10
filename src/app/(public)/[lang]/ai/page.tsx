"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, MessageSquare, Settings, ArrowRight, Globe, PlayCircle, Clock, Sparkles } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/Footer";

export default function AISitePage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const ai = d.aiStaff;
  const accent = "#6366f1";

  const iconMap: Record<string, React.ReactNode> = {
    MessageSquare: <MessageSquare className="w-6 h-6 text-white" />,
    Settings: <Settings className="w-6 h-6 text-white" />,
    ArrowRight: <ArrowRight className="w-6 h-6 text-white" />,
    Globe: <Globe className="w-6 h-6 text-white" />,
  };

  const gradients = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar lang={lang} accent={accent} nav={d.nav} forceScrolled={true} />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#8b5cf6,transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-base font-semibold mb-6">
                <Bot className="w-4 h-4" />
                {ai.badge}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight whitespace-pre-line tracking-tight">
                {ai.heading}
              </h1>
              <p className="text-white/85 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                {ai.subtext}
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ai.features.map((feat: any, i: number) => (
                <motion.div key={feat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 rounded-[2rem] bg-white/5 border border-white/8 hover:border-white/15 transition-all duration-300 hover:-translate-y-2 shadow-2xl">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center mb-6 shadow-xl`}>
                    {iconMap[feat.icon]}
                  </div>
                  <h3 className="font-black text-white mb-3 text-xl tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-white/85 text-base leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <motion.div className="bg-gray-900 rounded-3xl p-1 border border-white/10 shadow-2xl max-w-sm mx-auto w-full">
                <div className="bg-slate-800 rounded-[20px] overflow-hidden">
                  <div className="bg-violet-600 px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base">Hamro Assistant</div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-violet-200 text-[10px]">Online 24/7</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 bg-slate-900/50 min-h-[300px]">
                    <div className="flex justify-end">
                      <div className="bg-violet-600 text-white text-sm rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                        {ai.mockup.user1}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-violet-400" />
                      </div>
                      <div className="bg-white/10 text-white/90 text-sm rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] font-medium leading-relaxed">
                        {ai.mockup.ai1}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-violet-600 text-white text-sm rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%] font-black">
                        {ai.mockup.user2}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-violet-400 font-bold mb-2 uppercase tracking-widest text-xs">{lang === 'ne' ? 'नतिजा' : 'The Result'}</p>
                <p className="text-white text-lg font-black">{ai.stat}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center mb-20 shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Bot className="w-64 h-64" />
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight">
                 {ai.tagline}
               </h2>
               <div className="flex flex-wrap justify-center gap-4 relative z-10">
                 <Link href={`https://app.hamrolink.com`} className="flex items-center gap-2 px-8 py-4 bg-white text-violet-700 rounded-2xl text-lg font-black transition-all hover:scale-105 shadow-xl">
                   <Sparkles className="w-5 h-5" />
                   {ai.cta}
                 </Link>
               </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} d={d} PRE_LAUNCH={false} ctaHref={(href: string) => `https://app.hamrolink.com`} />
    </div>
  );
}
