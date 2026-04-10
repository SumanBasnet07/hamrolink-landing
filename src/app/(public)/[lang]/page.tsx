"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Globe,
  ShoppingBag,
  GraduationCap,
  MessageSquare,
  QrCode,
  BarChart3,
  Code2,
  ArrowRight,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Crown,
  Menu,
  ExternalLink,
  Shield,
  Rocket,
  Building2,
  Phone,
  Star,
  MapPin,
  Camera,
  ShoppingCart,
  TrendingUp,
  Signal,
  Wifi,
  Battery,
  Plane,
  Mail,
  PlayCircle,
  Clock,
  User,
  Maximize2,
  Home,
  Coffee,
  BookOpen,
  Layout,
  BriefcaseBusiness,
  CheckCircle,
  Gift,
  Lock,
  Calendar,
  Smartphone,
  Settings,
  Bot,
  BrainCircuit,
  Inbox,
  TrendingDown,
  AlertTriangle,
  Trophy,
  Search,
  Moon,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";

const PRE_LAUNCH = false;
const APP_URL = "https://app.hamrolink.com";

function ctaHref(href: string) {
  if (PRE_LAUNCH) return "https://app.hamrolink.com";
  if (href === "/signup") return APP_URL;
  return href;
}

function LaunchCtaCard({ d, selectedPath, lang }: { d: any; selectedPath: string; lang: string }) {
  const schoolMode = selectedPath === "school";
  const bullets = schoolMode
    ? [
        "Launch your school site and notices in minutes",
        "Start free, then unlock School OS when ready",
        "Instant setup on app.hamrolink.com",
      ]
    : [
        "Launch your business site in under 15 minutes",
        "No credit card required to get started",
        "Upgrade only when you are getting results",
      ];

  return (
    <section id="get-started" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-100 shadow-2xl shadow-indigo-100/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              {schoolMode ? "Your school can go live today." : "Your business can go live today."}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {schoolMode
                ? "Admissions, announcements, and your digital presence in one place."
                : "Stop losing customers to competitors with better online presence. Build yours now."}
            </p>
            <div className="space-y-3">
              {bullets.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-800 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl border border-gray-100">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              {d.nav?.ctaPostLaunch ?? "Start for Free"}
            </h3>
            <p className="text-gray-600 font-medium mb-8">
              Launch your first version now at app.hamrolink.com.
            </p>
            <div className="space-y-4">
              <a
                href={APP_URL}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-200"
              >
                <Sparkles className="w-5 h-5" />
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href={`/${lang}/pricing`}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-900 text-gray-900 font-black text-lg hover:bg-gray-900 hover:text-white transition-colors"
              >
                See Pricing Plans
              </Link>
            </div>
            <p className="text-center text-xs text-gray-500 font-bold mt-6">
              Live product. Start free. Upgrade only when you are ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Demo video ───────────────────────────────────────────────────────────────
function DemoVideo({ d }: { d: any }) {
  if (!d.video) return null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [step, setStep] = useState(0);
  const steps: string[] = [...d.video.steps];
  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-base font-semibold mb-4">
            <PlayCircle className="w-4 h-4" />
            {d.video.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {d.video.heading}
          </h2>
          <p className="text-white/80 max-w-lg mx-auto">{d.video.subtext}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
        >
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <video
              ref={videoRef}
              src={d.video.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => {}}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5 flex items-end justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-black flex items-center justify-center shrink-0">
                    {step + 1}
                  </span>
                  <span className="text-white font-semibold text-base">
                    {steps[step]}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <Clock className="w-3 h-3" />
                ~9s
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
            <p className="text-white font-black text-base">
              {d.video.finalFrame}
            </p>
            <a
              href={APP_URL}
              className="flex items-center gap-2 px-5 py-2 bg-white text-indigo-700 rounded-xl text-base font-black hover:scale-105 transition-transform shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              {d.nav?.ctaPostLaunch ?? "Start for Free"}
            </a>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-blue-500" : "w-1.5 bg-white/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Phone screens (Legacy - Keep for Teasers) ────────────────────────────────
// ─── Real Site Mockups ────────────────────────────────────────────────────────
function PhotographyMockup() {
  return (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
      <Image 
        src="/images/mockups/photography.png" 
        alt="HamroLink Photography Site Template" 
        className="w-full h-full object-cover"
        fill
        unoptimized
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-black">S</div>
          <div className="text-white">
            <p className="text-[10px] font-black leading-tight">Sara Shrestha</p>
            <p className="text-[8px] opacity-70">Photographer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopMockup() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden relative">
      <Image 
        src="/images/mockups/shop.png" 
        alt="HamroLink Ecommerce Shop Interface" 
        className="w-full h-full object-cover"
        fill
        unoptimized
      />
    </div>
  );
}

function SchoolMockup() {
  return (
    <div className="w-full h-full bg-emerald-50 flex items-center justify-center overflow-hidden relative">
      <Image 
        src="/images/mockups/school.png" 
        alt="HamroLink Educational Institution Platform" 
        className="w-full h-full object-cover"
        fill
        unoptimized
      />
    </div>
  );
}

const SLIDES = [
  { id: "photography", accent: "#3B82F6", Screen: PhotographyMockup },
  { id: "shop", accent: "#F97316", Screen: ShopMockup },
  { id: "school", accent: "#10B981", Screen: SchoolMockup }
];

// ─── Process Section ──────────────────────────────────────────────────────────
function ProcessSection({ lang, hero }: { lang: string; hero: any }) {
  if (!hero.process) return null;
  const icons = [MessageSquare, Maximize2, Rocket];
  const colors = [
    "bg-blue-50 text-blue-600 border-blue-100",
    "bg-purple-50 text-purple-600 border-purple-100",
    "bg-emerald-50 text-emerald-600 border-emerald-100",
  ];

  return (
    <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-base font-semibold mb-4">
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {lang === "ne" ? "छिटो र सजिलो" : "Fast & Simple"}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {hero.process.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gray-100" />
          {hero.process.steps.map((s: any, i: number) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-[32px] ${colors[i]} border-2 flex items-center justify-center mb-8 bg-white shadow-xl`}>
                  <Icon className="w-10 h-10" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black">
                    0{i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{s.title}</h3>
                <p className="text-gray-800 text-lg leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── The Problem Section ──────────────────────────────────────────────────────
function TheProblemSection({ d }: { d: any }) {
  const who = d.who;
  if (!who) return null;
  const icons = [AlertTriangle, Search, Moon, Trophy, Shield];
  const colors = ["bg-gray-100 text-gray-800", "bg-red-100 text-red-500", "bg-orange-100 text-orange-500", "bg-green-100 text-green-600", "bg-purple-100 text-purple-600"];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full text-red-600 text-base font-semibold mb-4">
            <AlertTriangle className="w-4 h-4" />
            {who.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{who.heading}</h2>
          <p className="text-gray-800 max-w-2xl mx-auto text-lg leading-relaxed">{who.subtext}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {who.cards.slice(0, 4).map((card: any, i: number) => {
            const Icon = icons[i];
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-3xl p-8 border-2 border-gray-100 hover:border-indigo-200 transition-all shadow-sm bg-white">
                <div className={`w-14 h-14 rounded-2xl ${colors[i]} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-black text-gray-950 text-xl mb-4">{card.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── AI Staff Teaser ───────────────────────────────────────────────────────────
function AIStaffTeaser({ d, lang }: { d: any; lang: string }) {
  const ai = d.aiStaff;
  const ne = lang === "ne";
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-bold mb-6">
              <Bot className="w-4 h-4" />
              {ai.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {ai.heading}
            </h2>
            <p className="text-white/70 text-xl mb-10 leading-relaxed">
              {ai.subtext}
            </p>
            <Link href={`/${lang}/ai`} className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-violet-500/20">
              {ne ? "AI क्षमताहरू हेर्नुहोस्" : "Explore AI Staff Capabilities"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-violet-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <motion.div 
              initial={{ rotateY: 20, rotateX: 10, opacity: 0 }}
              whileInView={{ rotateY: 0, rotateX: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square md:aspect-[4/5] bg-white/5 rounded-[3.5rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl"
            >
              {/* Fake Menu Bar */}
              <div className="h-14 bg-white/10 px-6 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-[12px] font-black">{ne ? "AI व्यवसाय सहायक" : "AI Business Assistant"}</h4>
                    <span className="flex items-center gap-1 text-[9px] text-green-400 font-bold uppercase tracking-widest">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                       Active
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 p-4 overflow-hidden bg-slate-900/50 relative">
                <Image 
                  src="/images/mockups/ai-chat.png" 
                  alt="HamroLink AI Chat Assistant Interface" 
                  className="w-full h-full object-cover rounded-3xl shadow- inner border border-white/5"
                  fill
                  unoptimized
                />
              </div>

              {/* Input Area Overlay */}
              <div className="p-4 bg-white/5 border-t border-white/10">
                 <div className="h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 justify-between">
                    <span className="text-white/40 text-xs font-medium">{ne ? "सन्देश लेख्नुहोस्..." : "Type a message..."}</span>
                    <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features Teaser (New) ─────────────────────────────────────────────────────
function FeaturesTeaser({ d, lang }: { d: any; lang: string }) {
  const f = d.features;
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">{d.features.teaser.heading}</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">{d.features.teaser.subtext}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           {f.items.slice(0, 4).map((item: any) => (
             <div key={item.title} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <h3 className="font-black text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-2">{item.desc}</p>
             </div>
           ))}
        </div>
        <Link href={`/${lang}/features`} className="inline-flex items-center gap-2 text-indigo-600 font-black hover:gap-4 transition-all">
           {d.features.teaser.allFeatures} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Facebook Comparison Section ──────────────────────────────────────────────
function ComparisonSection({ d, lang }: { d: any; lang: string }) {
  const c = d.comparison;
  const ne = lang === "ne";
  if (!c) return null;

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            {c.heading}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {c.subheading}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 relative max-w-5xl mx-auto">
          {/* Facebook Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2.5rem] border-2 border-gray-100 bg-gray-50 opacity-80"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <X className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                {c.facebook.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {c.facebook.features.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-gray-500 line-through">
                  <X className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* HamroLink Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2.5rem] border-2 border-indigo-600 bg-indigo-50/30 shadow-2xl shadow-indigo-100 relative z-10"
          >
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
              {ne ? "सिफारिस" : "Recommended"}
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-indigo-950">
                {c.hamrolink.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {c.hamrolink.features.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-indigo-950">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-indigo-600" />
                  <span className="font-bold">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={APP_URL}
              className="mt-10 block w-full py-4 bg-indigo-600 text-white text-center font-black rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-indigo-200"
            >
              {d.nav?.ctaPostLaunch ?? "Start for Free"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Stories Teaser ───────────────────────────────────────────────────────────
function StoriesTeaser({ d, lang }: { d: any; lang: string }) {
  const t = d.transformation;
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-green-600 text-xs font-bold mb-6">
            <Star className="w-4 h-4 fill-green-600" />
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            {t.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            {t.items.slice(0, 2).map((item: any, i: number) => (
              <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <p className="text-indigo-600 font-black mb-2 uppercase tracking-widest text-xs">{item.business}</p>
                <p className="text-gray-800 font-bold italic mb-4 leading-relaxed">"{item.after}"</p>
                <p className="text-green-600 font-black text-sm">{item.metric}</p>
              </div>
            ))}
          </div>
          <Link href={`/${lang}/stories`} className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-2xl font-black hover:bg-gray-900 hover:text-white transition-all">
            Read Real Business Stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing Teaser ─────────────────────────────────────────────────────────
function PricingTeaser({ d, lang }: { d: any; lang: string }) {
  const ne = lang === "ne";
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{d.pricing.teaser.heading}</h2>
          <p className="text-gray-600 text-xl font-medium">{d.pricing.teaser.subheading}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl group hover:border-indigo-100 transition-all">
            <h3 className="text-2xl font-black mb-2">{ne ? "सधैं नि:शुल्क" : "Free Forever"}</h3>
            <p className="text-gray-500 mb-6">{ne ? "प्लेटफर्म सुरु गरेर परीक्षण गर्न उपयुक्त।" : "Perfect for testing the platform."}</p>
            <div className="text-4xl font-black mb-8 text-gray-900">Rs 0</div>
            <Link href={`/${lang}/pricing`} className="block w-full py-4 bg-gray-900 text-white text-center rounded-2xl font-black hover:bg-indigo-600 transition-all">
               {d.pricing.teaser.viewDetails}
            </Link>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border-2 border-amber-200 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 px-4 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">{ne ? "लोकप्रिय" : "Popular"}</div>
            <h3 className="text-2xl font-black mb-2">Local Start</h3>
            <p className="text-gray-500 mb-6">{ne ? "सानो व्यवसायका लागि उत्तम।" : "Best for small businesses."}</p>
            <div className="text-4xl font-black mb-8 text-amber-600">Rs 199<span className="text-sm text-gray-400">/mo</span></div>
            <Link href={`/${lang}/pricing`} className="block w-full py-4 bg-amber-500 text-white text-center rounded-2xl font-black hover:bg-amber-600 transition-all shadow-xl shadow-amber-200">
               {d.pricing.teaser.learnMore}
            </Link>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href={`/${lang}/pricing`} className="text-indigo-600 font-bold hover:underline">{d.pricing.teaser.compareAll} →</Link>
        </div>
      </div>
    </section>
  );
}

// ─── Objection Section ────────────────────────────────────────────────────────
function ObjectionSection({ d }: { d: any }) {
  const obj = d.objections;
  if (!obj) return null;
  const icons = [Clock, User, TrendingUp, Home];
  const keys = ["tooBusy", "notTechSavvy", "expensive", "alreadyOnFacebook"];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center mb-16 text-gray-900">
          {d.pricing?.decisionHelper?.heading || "Still thinking?"}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <div key={key} className="p-8 rounded-[32px] bg-indigo-50/30 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                  <h3 className="font-black text-gray-950">{(obj.questions as any)[key]}</h3>
                </div>
                <p className="text-gray-800 italic leading-relaxed">"{(obj as any)[key]}"</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Exit Intent ──────────────────────────────────────────────────────────────
function ExitIntentOverlay({ d, visible, onClose }: { d: any; visible: boolean; onClose: () => void }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl">
         <h2 className="text-2xl font-black mb-4">{d.exitIntent.heading}</h2>
         <p className="text-gray-600 mb-8">{d.exitIntent.subheading}</p>
         <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 font-bold text-gray-400">{d.exitIntent.alternative}</button>
            <a href={APP_URL} onClick={onClose} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200">{d.nav?.ctaPostLaunch ?? d.exitIntent.cta}</a>
         </div>
      </motion.div>
    </div>
  );
}

// ─── Email Marketing ──────────────────────────────────────────────────────────
function EmailMarketingStrip({ d }: { d: any }) {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden text-center">
       <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{d.emailMarketing.heading}</h2>
          <p className="text-white/70 text-xl leading-relaxed mb-12">{d.emailMarketing.subtext}</p>
          <div className="w-full h-px bg-white/10 mb-12" />
          <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold">
             <Mail className="w-5 h-5" /> {d.emailMarketing.incoming}
          </div>
       </div>
    </section>
  );
}

// ─── Landing Page Main ────────────────────────────────────────────────────────
export default function LandingPage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const ne = lang === "ne";
  const hero = d.hero;
  const accent = "#6366f1";
  const [idx, setIdx] = useState(0);
  const [exitVisible, setExitVisible] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Show only once per user.
      const shown = localStorage.getItem("exit_intent_shown");
      if (e.clientY < 20 && !shown) {
        setExitVisible(true);
        localStorage.setItem("exit_intent_shown", "true");
      }
    };
    document.addEventListener("mouseleave", handler);
    const it = setInterval(() => setIdx(p => (p + 1) % SLIDES.length), 4000);
    return () => {
      document.removeEventListener("mouseleave", handler);
      clearInterval(it);
    };
  }, []);

  const fu = (d = 0) => ({ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: d } });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Navbar lang={lang} accent={accent} nav={d.nav} preLaunch={PRE_LAUNCH} />

      <section className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0 bg-cover bg-center brightness-50" style={{ backgroundImage: `url(/slide-${idx}.png)` }} />
        </AnimatePresence>
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <motion.h1 {...fu()} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight whitespace-pre-line">
                   {hero.line1}<br/>
                   <span style={{ color: SLIDES[idx].accent }}>{hero.slideLabels[idx]}</span><br/>
                   {hero.line3}
                </motion.h1>
                <motion.p {...fu(0.1)} className="text-white/80 text-xl md:text-2xl font-medium max-w-xl leading-relaxed">
                   {hero.subtext}
                </motion.p>
                <motion.div {...fu(0.2)} className="space-y-6">
                   <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">
                      {hero.pathfinder?.heading ?? "Choose your path to professional"}
                   </p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                      <a 
                         href={APP_URL}
                         className="group p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white hover:border-white transition-all text-left"
                      >
                         <div className="w-12 h-12 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500 flex items-center justify-center mb-4 transition-colors">
                            <ShoppingBag className="w-6 h-6 text-orange-500 group-hover:text-white" />
                          </div>
                         <h3 className="text-white group-hover:text-gray-900 font-black text-xl mb-1">{hero.pathfinder?.business || "I am a Shop/Business"}</h3>
                         <p className="text-white/40 group-hover:text-gray-500 text-xs font-bold">{hero.pathfinder?.businessSub || "Retail, food, services"}</p>
                      </a>
                      <a 
                         href={APP_URL}
                         className="group p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white hover:border-white transition-all text-left"
                      >
                         <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 group-hover:bg-emerald-500 flex items-center justify-center mb-4 transition-colors">
                            <GraduationCap className="w-6 h-6 text-emerald-500 group-hover:text-white" />
                         </div>
                         <h3 className="text-white group-hover:text-gray-900 font-black text-xl mb-1">{hero.pathfinder?.school || "I am a School/Org"}</h3>
                         <p className="text-white/40 group-hover:text-gray-500 text-xs font-bold">{hero.pathfinder?.schoolSub || "Advanced institutional tools"}</p>
                      </a>
                   </div>
                   <div className="flex flex-wrap items-center gap-2 pt-2">
                     <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs font-bold">
                       {ne ? "क्रेडिट कार्ड बिना सुरु" : "Start free, no card"}
                     </span>
                     <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs font-bold">
                       {ne ? "नेपाली सपोर्ट उपलब्ध" : "Nepali support available"}
                     </span>
                     <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs font-bold">
                       eSewa + Khalti
                     </span>
                   </div>
                </motion.div>
             </div>
             <div className="hidden lg:block relative group">
                {/* Visual Accent Glow */}
                <div 
                  className="absolute -inset-10 blur-[100px] opacity-20 transition-colors duration-1000"
                  style={{ backgroundColor: SLIDES[idx].accent }}
                />
                
                <div className="relative aspect-square backdrop-blur-3xl bg-white/5 rounded-[5rem] border border-white/10 p-12 overflow-hidden flex items-center justify-center">
                  <motion.div 
                    key={idx}
                    initial={{ y: 40, opacity: 0, rotateY: 10 }}
                    animate={{ y: 0, opacity: 1, rotateY: 0 }}
                    exit={{ y: -40, opacity: 0, rotateY: -10 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="w-72 h-[520px] bg-black rounded-[50px] border-[6px] border-gray-800 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
                  >
                    {/* Phone Features */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 z-20 flex justify-center items-end pb-1">
                      <div className="w-20 h-4 bg-black rounded-full mb-[-10px]" /> {/* Dynamic Island style notch */}
                    </div>
                    <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-20">
                      <div className="w-24 h-1 bg-white/20 rounded-full" />
                    </div>
                    
                    {/* The Screen Component */}
                    <div className="w-full h-full pt-6 pb-2">
                      {React.createElement(SLIDES[idx].Screen)}
                    </div>
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                </div>
             </div>
          </div>
        </div>
      </section>

      <ProcessSection lang={lang} hero={hero} />
      <DemoVideo d={d} />
      <TheProblemSection d={d} />
      
      <AIStaffTeaser d={d} lang={lang} />

      <PricingTeaser d={d} lang={lang} />
        <ComparisonSection d={d} lang={lang} />
      <ObjectionSection d={d} />
      <EmailMarketingStrip d={d} />
      <Footer lang={lang} d={d} PRE_LAUNCH={PRE_LAUNCH} ctaHref={ctaHref} />
      <ExitIntentOverlay d={d} visible={exitVisible} onClose={() => setExitVisible(false)} />
    </div>
  );
}
