"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mukta } from "next/font/google";
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
  Plus,
  Minus,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { AIChatbot } from "@/components/landing/AIChatbot";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";

const PRE_LAUNCH = false;
const APP_URL = "https://app.hamrolink.com";
const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

function ctaHref(href: string) {
  if (PRE_LAUNCH) return "https://app.hamrolink.com";
  if (href === "/signup") return APP_URL;
  return href;
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
    <section id="demo" className="py-20 bg-slate-950 scroll-mt-24">
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
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute -left-28 top-12 w-[380px] h-[380px] rounded-[45%] bg-violet-100/70 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-0 w-[300px] h-[300px] rounded-[50%] bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 border border-violet-200 rounded-full text-violet-700 text-xs font-bold mb-6">
              <Bot className="w-4 h-4" />
              {ai.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {ai.heading}
            </h2>
            <p className="text-gray-600 text-xl mb-6 leading-relaxed">
              {ai.subtext}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-black mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {ne ? "तपाईं सुत्दा पनि ग्राहकलाई जवाफ दिन्छ" : "Answers customers while you sleep — free staff member"}
            </div>
            <Link href={`/${lang}/ai`} className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-violet-500/20">
              {ne ? "AI क्षमताहरू हेर्नुहोस्" : "Explore AI Staff Capabilities"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#demo" className="inline-flex items-center gap-2 mt-3 text-violet-700 hover:text-violet-600 font-black text-sm">
              <PlayCircle className="w-4 h-4" />
              {ne ? "अटो-प्ले डेमो हेर्नुहोस्" : "Watch autoplay demo"}
            </a>
            <p className="mt-4 text-xs font-bold text-gray-500">
              {ne
                ? "AI सहायकका पूर्ण फिचरहरू पेड प्लानहरूमा उपलब्ध छन्।"
                : "Full AI assistant capabilities are available in paid plans."}
            </p>
          </motion.div>
          
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-violet-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <motion.div 
              initial={{ rotateY: 20, rotateX: 10, opacity: 0 }}
              whileInView={{ rotateY: 0, rotateX: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Fake Menu Bar */}
              <div className="h-14 bg-slate-900 px-6 flex items-center justify-between border-b border-slate-800">
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

              {/* Chat Content — inline Nepali conversation */}
              <div className="flex-1 p-4 overflow-hidden bg-slate-950 space-y-3 flex flex-col justify-end">
                {/* Customer message */}
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-sm shrink-0">👤</div>
                  <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%]">
                    <p className="text-white text-xs font-semibold">{ne ? "डेलिभरी काठमाड़ू भरि छ कि?" : "Do you deliver all over Kathmandu?"}</p>
                    <span className="text-white/30 text-[9px]">9:14 AM</span>
                  </div>
                </div>
                {/* AI reply */}
                <div className="flex items-end gap-2 flex-row-reverse">
                  <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-violet-600/30 border border-violet-500/30 rounded-2xl rounded-br-sm px-3 py-2 max-w-[80%]">
                    <p className="text-white text-xs font-semibold">{ne ? "हजुर! काठमाड़ूभरि डेलिभरी गर्छौं — रु ८०मा। आज नै अर्डर गर्न मिल्छ!" : "Hajur! We deliver across Kathmandu — only Rs 80. Order now!"}</p>
                    <span className="text-white/30 text-[9px]">9:14 AM • AI</span>
                  </div>
                </div>
                {/* Customer follow-up */}
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-sm shrink-0">👤</div>
                  <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%]">
                    <p className="text-white text-xs font-semibold">{ne ? "ठिक छ, अर्डर गर्छु!" : "Perfect, placing my order!"}</p>
                    <span className="text-white/30 text-[9px]">9:15 AM</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {ne ? "AI सहायक टाइप गर्दैछ..." : "AI typing..."}
                </div>
              </div>

              {/* Input Area Overlay */}
                <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <div className="h-11 rounded-2xl bg-slate-800 border border-slate-700 flex items-center px-4 justify-between">
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
  const ne = lang === "ne";
  const cards = ne
    ? [
        {
          title: "सजिलै अर्डर व्यवस्थापन",
          desc: "नयाँ अर्डर आएको सूचना तुरुन्त पाउनुहोस्।",
          Icon: ShoppingCart,
          bg: "from-sky-50 to-indigo-50 border-sky-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(14,165,233,0.85)]",
          light: "bg-sky-500",
          mini: (
            <div className="rounded-xl border border-sky-200 bg-white/90 p-2 shadow-sm">
              <div className="flex items-end gap-1 h-6">
                <span className="w-1.5 h-2 rounded-sm bg-sky-300" />
                <span className="w-1.5 h-3 rounded-sm bg-sky-400" />
                <span className="w-1.5 h-5 rounded-sm bg-sky-500" />
              </div>
            </div>
          ),
          snippet: (
            <div className="rounded-xl bg-white border border-sky-100 p-3 shadow-sm">
              <span className="inline-flex px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-black mb-2">
                1 नयाँ अर्डर!
              </span>
              <p className="text-[10px] font-black text-sky-700">नयाँ अर्डर</p>
              <p className="text-[11px] font-bold text-gray-800">Order #1204 • रु 1,450</p>
              <span className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">भुक्तानी पुष्टि</span>
            </div>
          ),
        },
        {
          title: "Google मा पहिलो प्राथमिकता",
          desc: "ग्राहकले खोज्दा तपाईंको साइट माथि देखिन मद्दत।",
          Icon: Search,
          bg: "from-emerald-50 to-teal-50 border-emerald-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(59,130,246,0.75)]",
          light: "bg-emerald-500",
          mini: (
            <div className="rounded-xl border border-emerald-200 bg-white/90 p-2 shadow-sm">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Search className="w-3.5 h-3.5" />
                <span className="h-1 w-5 rounded-full bg-emerald-300" />
              </div>
            </div>
          ),
          snippet: (
            <div className="rounded-xl bg-white border border-emerald-100 p-3 shadow-sm">
              <p className="text-[10px] text-gray-500 font-bold">google.com</p>
              <p className="text-[11px] font-black text-blue-700 truncate">Everest Kirana | Online Grocery</p>
              <p className="text-[10px] text-emerald-700 truncate">everestkiranastore.com.np</p>
            </div>
          ),
        },
        {
          title: "स्थानीय भुक्तानी सजिलै",
          desc: "eSewa, Khalti, Fonepay बाट पैसा लिने सेटअप।",
          Icon: QrCode,
          bg: "from-violet-50 to-fuchsia-50 border-violet-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(139,92,246,0.8)]",
          light: "bg-violet-500",
          mini: (
            <div className="rounded-xl border border-violet-200 bg-white/90 p-2 shadow-sm">
              <div className="grid grid-cols-3 gap-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <span key={i} className={`h-1.5 w-1.5 rounded-[2px] ${i % 2 === 0 ? "bg-violet-400" : "bg-violet-200"}`} />
                ))}
              </div>
            </div>
          ),
          snippet: (
            <div className="grid grid-cols-3 gap-1.5">
              <span className="rounded-lg bg-emerald-500 text-white text-[9px] font-black px-2 py-1 text-center">eSewa</span>
              <span className="rounded-lg bg-purple-600 text-white text-[9px] font-black px-2 py-1 text-center">Khalti</span>
              <span className="rounded-lg bg-blue-600 text-white text-[9px] font-black px-2 py-1 text-center">Fonepay</span>
            </div>
          ),
        },
        {
          title: "एनालिटिक्स",
          desc: "बिक्रीको ट्रेन्ड बुझेर सही निर्णय लिनुहोस्।",
          Icon: TrendingUp,
          bg: "from-amber-50 to-orange-50 border-amber-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(245,158,11,0.8)]",
          light: "bg-amber-500",
          mini: (
            <div className="rounded-xl border border-amber-200 bg-white/90 p-2 shadow-sm">
              <svg viewBox="0 0 52 20" className="h-5 w-10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 16 L16 12 L28 13 L40 6 L50 4" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          ),
          snippet: (
            <div className="rounded-xl bg-white border border-amber-100 p-3 shadow-sm">
              <div className="flex items-end gap-1.5 h-8">
                <span className="w-2.5 h-3 bg-amber-200 rounded-sm" />
                <span className="w-2.5 h-4 bg-amber-300 rounded-sm" />
                <span className="w-2.5 h-6 bg-amber-400 rounded-sm" />
                <span className="w-2.5 h-8 bg-amber-500 rounded-sm" />
              </div>
              <p className="text-[10px] font-black text-amber-700 mt-1">1 → 1,000 orders</p>
            </div>
          ),
        },
      ]
    : [
        {
          title: "Order Management",
          desc: "Get real-time new-order alerts and stay in control.",
          Icon: ShoppingCart,
          bg: "from-sky-50 to-indigo-50 border-sky-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(14,165,233,0.85)]",
          light: "bg-sky-500",
          mini: (
            <div className="rounded-xl border border-sky-200 bg-white/90 p-2 shadow-sm">
              <div className="flex items-end gap-1 h-6">
                <span className="w-1.5 h-2 rounded-sm bg-sky-300" />
                <span className="w-1.5 h-3 rounded-sm bg-sky-400" />
                <span className="w-1.5 h-5 rounded-sm bg-sky-500" />
              </div>
            </div>
          ),
          snippet: (
            <div className="rounded-xl bg-white border border-sky-100 p-3 shadow-sm">
              <span className="inline-flex px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-black mb-2">
                1 New Order!
              </span>
              <p className="text-[10px] font-black text-sky-700">New Order</p>
              <p className="text-[11px] font-bold text-gray-800">Order #1204 • NPR 1,450</p>
              <span className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">Payment confirmed</span>
            </div>
          ),
        },
        {
          title: "Google SEO",
          desc: "Show up when customers search for your service.",
          Icon: Search,
          bg: "from-emerald-50 to-teal-50 border-emerald-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(59,130,246,0.75)]",
          light: "bg-emerald-500",
          mini: (
            <div className="rounded-xl border border-emerald-200 bg-white/90 p-2 shadow-sm">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Search className="w-3.5 h-3.5" />
                <span className="h-1 w-5 rounded-full bg-emerald-300" />
              </div>
            </div>
          ),
          snippet: (
            <div className="rounded-xl bg-white border border-emerald-100 p-3 shadow-sm">
              <p className="text-[10px] text-gray-500 font-bold">google.com</p>
              <p className="text-[11px] font-black text-blue-700 truncate">Everest Kirana | Online Grocery</p>
              <p className="text-[10px] text-emerald-700 truncate">everestkiranastore.com.np</p>
            </div>
          ),
        },
        {
          title: "Local Payments",
          desc: "Accept eSewa, Khalti, and Fonepay from day one.",
          Icon: QrCode,
          bg: "from-violet-50 to-fuchsia-50 border-violet-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(139,92,246,0.8)]",
          light: "bg-violet-500",
          mini: (
            <div className="rounded-xl border border-violet-200 bg-white/90 p-2 shadow-sm">
              <div className="grid grid-cols-3 gap-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <span key={i} className={`h-1.5 w-1.5 rounded-[2px] ${i % 2 === 0 ? "bg-violet-400" : "bg-violet-200"}`} />
                ))}
              </div>
            </div>
          ),
          snippet: (
            <div className="grid grid-cols-3 gap-1.5">
              <span className="rounded-lg bg-emerald-500 text-white text-[9px] font-black px-2 py-1 text-center">eSewa</span>
              <span className="rounded-lg bg-purple-600 text-white text-[9px] font-black px-2 py-1 text-center">Khalti</span>
              <span className="rounded-lg bg-blue-600 text-white text-[9px] font-black px-2 py-1 text-center">Fonepay</span>
            </div>
          ),
        },
        {
          title: "Analytics",
          desc: "Track your growth with a tiny dashboard snapshot.",
          Icon: TrendingUp,
          bg: "from-amber-50 to-orange-50 border-amber-100",
          glow: "hover:shadow-[0_22px_44px_-28px_rgba(245,158,11,0.8)]",
          light: "bg-amber-500",
          mini: (
            <div className="rounded-xl border border-amber-200 bg-white/90 p-2 shadow-sm">
              <svg viewBox="0 0 52 20" className="h-5 w-10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 16 L16 12 L28 13 L40 6 L50 4" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          ),
          snippet: (
            <div className="rounded-xl bg-white border border-amber-100 p-3 shadow-sm">
              <div className="flex items-end gap-1.5 h-8">
                <span className="w-2.5 h-3 bg-amber-200 rounded-sm" />
                <span className="w-2.5 h-4 bg-amber-300 rounded-sm" />
                <span className="w-2.5 h-6 bg-amber-400 rounded-sm" />
                <span className="w-2.5 h-8 bg-amber-500 rounded-sm" />
              </div>
              <p className="text-[10px] font-black text-amber-700 mt-1">1 → 1,000 orders</p>
            </div>
          ),
        },
      ];

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-5xl font-black text-gray-900 mb-4 ${ne ? "leading-[1.35]" : ""}`}>
          {ne ? "१ बाट १००० अर्डरसम्म स्केल गर्न मद्दत गर्ने टुल्स" : "Tools to help you scale from 1 to 1,000 orders"}
        </h2>
        <p className={`text-gray-600 text-lg mb-12 max-w-2xl mx-auto ${ne ? "leading-[1.9]" : ""}`}>
          {ne ? "फिचर होइन, सीधा बिक्री र वृद्धिमा असर गर्ने सिस्टमहरू।" : "Not filler features. Practical systems that push sales and growth."}
        </p>
          <div className="grid md:grid-cols-2 gap-5 mb-12 text-left">
            {cards.map((item) => {
              const Icon = item.Icon;
              return (
             <div key={item.title} className={`group relative p-6 bg-linear-to-br ${item.bg} rounded-3xl border border-transparent shadow-sm hover:scale-[1.02] hover:-translate-y-1 hover:border-primary ${item.glow} transition-all duration-300`}>
                <div className="absolute top-4 right-4">
                  {item.mini}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="group-hover:-translate-y-px transition-transform duration-300">
                  {item.snippet}
                </div>
             </div>
           );
            })}
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
  const growthSignals = ne
    ? [
        { label: "७ दिनमा लाइभ", Icon: Rocket },
        { label: "स्थानीय पेमेन्ट", Icon: Smartphone },
        { label: "AI सहायक", Icon: Bot },
      ]
    : [
        { label: "Live in 7 days", Icon: Rocket },
        { label: "Local payments", Icon: Smartphone },
        { label: "AI assistant", Icon: Bot },
      ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="absolute inset-x-0 top-24 flex justify-center pointer-events-none">
        <div className="w-[900px] h-[380px] rounded-full bg-radial-[at_center] from-indigo-300/25 via-blue-200/15 to-transparent blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-[0.15em] mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            {ne ? "वृद्धिका लागि बनाइएको" : "Built for Growth"}
          </div>
          <h2 className={`text-4xl md:text-5xl font-black text-gray-900 mb-3 ${ne ? "leading-[1.35]" : ""}`}>{d.pricing.teaser.heading}</h2>
          <p className={`text-gray-600 text-lg md:text-xl font-semibold ${ne ? "leading-[1.9]" : ""}`}>{ne ? "सुरु गर्न सजिलो, बढ्न झन् सजिलो।" : "Easy to start, designed to scale."}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {growthSignals.map((item) => {
              const Icon = item.Icon;
              return (
                <span key={item.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-black">
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl group hover:border-indigo-100 transition-all">
            <h3 className="text-2xl font-black mb-1">{ne ? "सधैं नि:शुल्क" : "Free Forever"}</h3>
            <p className="text-gray-500 mb-5 text-sm font-semibold">{ne ? "लन्च गर्नुहोस् र प्लेटफर्म अनुभूति गर्नुहोस्।" : "Launch fast and test real demand."}</p>
            <div className="text-4xl font-black mb-6 text-gray-900">Rs 0</div>
            <div className="grid grid-cols-2 gap-2 mb-8">
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2 text-[11px] font-black text-gray-700">{ne ? "नो कार्ड" : "No card"}</div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2 text-[11px] font-black text-gray-700">{ne ? "वेबसाइट टेम्पलेट" : "Templates"}</div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2 text-[11px] font-black text-gray-700">{ne ? "बेसिक पेजहरू" : "Core pages"}</div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2 text-[11px] font-black text-gray-700">{ne ? "मोबाइल तयार" : "Mobile-ready"}</div>
            </div>
            <a href={APP_URL} className="block w-full py-4 border-2 border-gray-300 text-gray-800 text-center rounded-2xl font-black hover:border-gray-900 hover:text-gray-900 transition-all bg-white">
              {ne ? "नि:शुल्क सुरु गर्नुहोस्" : "Start for Free"}
            </a>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border-2 border-amber-400 shadow-[0_24px_80px_-30px_rgba(245,158,11,0.85)] relative overflow-hidden group ring-1 ring-amber-200/80">
            <div className="absolute top-0 right-0 z-10">
              <div className="relative px-5 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl shadow-lg">
                {ne ? "स्थानीय पसलका लागि उत्तम" : "Best for Local Shops"}
                <span className="absolute -bottom-2 right-0 w-0 h-0 border-l-10 border-l-transparent border-t-10 border-t-amber-700" />
              </div>
            </div>
            <h3 className="text-2xl font-black mb-2">Local Start</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black mb-3">
              <Check className="w-3 h-3" />
              {ne ? "सानो व्यवसायका लागि सर्वोत्तम" : "Best for Small Businesses"}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-black mb-3 ml-2">
              <Gift className="w-3 h-3" />
              {ne ? "१५ दिन नि:शुल्क ट्रायल" : "15-day free trial"}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-[11px] font-black mb-3 ml-2">
              <Gift className="w-3 h-3" />
              {ne ? "सिनेमा टिकटभन्दा सस्तो" : "Less than a movie ticket"}
            </div>
            <div className="mb-1">
              <p className="text-sm font-black text-gray-400 line-through">Rs 199/month</p>
              <div className="text-4xl font-black text-amber-600">Rs 0<span className="text-base text-gray-500">/15 days</span></div>
            </div>
            <p className="text-[11px] font-black text-gray-500 mb-2">
              {ne ? "१५ दिनपछि रु १९९/महिना" : "Then Rs 199/month after 15 days"}
            </p>
            <p className="text-xs font-black text-emerald-600 mb-4 flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5" />
              {ne ? "चिया खर्च भन्दा पनि कम" : "Less than the cost of one cup of tea per day"}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-black mb-5">
              <Shield className="w-3 h-3" />
              {ne ? "Business PAN & VAT Ready" : "Business PAN & VAT Ready"}
            </div>
            <ul className="mb-8 mt-2 space-y-2">
              <li className="text-sm font-semibold text-gray-700 inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />{ne ? "कस्टम डोमेन सपोर्ट" : "Custom domain support"}</li>
              <li className="text-sm font-black text-gray-900 inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />{ne ? "नि:शुल्क .com.np डोमेन इन्टिग्रेसन सहयोग" : "Free .com.np Domain Integration assistance"}</li>
              <li className="text-sm font-black text-gray-900 inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />{ne ? ".com.np डोमेन इन्टिग्रेसन" : ".com.np Domain Integration"}</li>
              <li className="text-sm font-semibold text-gray-700 inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />{ne ? "eSewa/Khalti पेमेन्ट" : "eSewa/Khalti payments"}</li>
              <li className="text-sm font-semibold text-gray-700 inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />{ne ? "AI सहायक + कम ब्रान्डिङ" : "AI assistant + low branding"}</li>
            </ul>
            <a href={APP_URL} className="block w-full py-4 bg-amber-500 text-white text-center rounded-2xl font-black hover:bg-amber-600 transition-all shadow-xl shadow-amber-200">
              {ne ? "नि:शुल्क ट्रायल सुरु गर्नुहोस्" : "Get Free Trial"}
            </a>
          </div>
        </div>

        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 flex items-center gap-2.5">
            <Rocket className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black text-gray-700">{ne ? "पहिलो बिक्री छिटो" : "Faster first sale"}</span>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black text-gray-700">{ne ? "Google मा देखिने वेबसाइट" : "Google-visible website"}</span>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black text-gray-700">{ne ? "नेपाली सपोर्ट उपलब्ध" : "Nepali support available"}</span>
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

function ConversionBridge({ hero, ne }: { hero: any; ne: boolean }) {
  const pillars = ne
    ? [
        {
          title: "टेक्निकल नभए पनि हुन्छ",
          desc: "यदि फेसबुक चलाउन सक्नुहुन्छ भने HamroLink पनि सहजै चलाउन सक्नुहुन्छ।",
          Icon: Smartphone,
        },
        {
          title: "खर्च बचत, प्रभाव बढत",
          desc: "रु १९९/महिना बनाम रु ३०,०००+ एकपटकको डेभलपमेन्ट खर्च।",
          Icon: TrendingUp,
        },
        {
          title: "छिटो लन्च",
          desc: "करिब १५ मिनेटमै वेबसाइट लाइभ। आजै सुरु गरेर आजै शेयर गर्नुहोस्।",
          Icon: Zap,
        },
      ]
    : [
        {
          title: "No Technical Skills Needed",
          desc: "If you can post on Facebook, you can run HamroLink confidently.",
          Icon: Smartphone,
        },
        {
          title: "Save Cost, Grow Faster",
          desc: "NPR 199/month vs NPR 30,000+ one-time website development.",
          Icon: TrendingUp,
        },
        {
          title: "Launch in Minutes",
          desc: "Go live in about 15 minutes and start sharing your site today.",
          Icon: Zap,
        },
      ];

  return (
    <section className="py-16 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="absolute right-[-140px] top-[-120px] w-[360px] h-[360px] rounded-[40%] bg-amber-100/60 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-[0.15em] mb-4">
            <Zap className="w-3.5 h-3.5" />
            {ne ? "छिटो सुरु गर्नुहोस्" : "Start Fast"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
            {ne ? "जटिल होइन। स्पष्ट। छिटो।" : "Simple. Clear. Fast to Launch."}
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-semibold max-w-3xl mx-auto">
            {ne
              ? "पहिले भ्रम हटाउनुहोस्, त्यसपछि वेबसाइट सुरु गर्नुहोस्।"
              : "Clear your doubts first, then launch your website with confidence."}
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-0 mb-10 max-w-2xl mx-auto">
          {[
            ne ? "Facebook / नाम जडान" : "Connect Facebook",
            ne ? "डिजाइन रोज्नुहोस्" : "Pick a Design",
            ne ? "बेच्न सुरु गर्नुहोस्" : "Start Selling",
          ].map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-lg shadow-lg mb-2">
                  {i + 1}
                </div>
                <p className="text-sm font-black text-gray-900 leading-tight">{label}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block flex-1 h-0.5 bg-amber-200 mt-5 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="rounded-3xl bg-white border border-gray-200 p-6 md:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 font-semibold leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={APP_URL}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-amber-500 text-white font-black hover:bg-amber-600 transition-colors shadow-xl shadow-amber-200"
          >
            {hero.ctaPrimary ?? (ne ? "मेरो नि:शुल्क वेबसाइट बनाउनुहोस्" : "Build My Free Website")}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-gray-900 text-gray-900 font-black hover:bg-gray-900 hover:text-white transition-colors"
          >
            {ne ? "डेमो हेर्नुहोस्" : "Watch Demo"}
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustMarquee({ ne }: { ne: boolean }) {
  const items = ne
    ? ["eSewa", "Khalti", "Fonepay", "Thakali Kitchen - पोखरा", "Sagarmatha Consultancy - काठमाडौं", "Everest Photo Studio - धरान"]
    : ["eSewa", "Khalti", "Fonepay", "Thakali Kitchen - Pokhara", "Sagarmatha Consultancy - Kathmandu", "Everest Photo Studio - Dharan"];
  const loop = [...items, ...items];

  const chipClass = (name: string) => {
    if (name.includes("eSewa")) return "border-emerald-300 text-emerald-700";
    if (name.includes("Khalti")) return "border-fuchsia-300 text-fuchsia-700";
    if (name.includes("Fonepay")) return "border-blue-300 text-blue-700";
    return "border-gray-300 text-gray-700";
  };

  return (
    <section className="py-5 bg-white border-y border-gray-100 overflow-hidden">
      <motion.div
        animate={{ x: [0, -980] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-3 w-max px-6"
      >
        {loop.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className={`px-4 py-2 rounded-full bg-white border text-xs md:text-sm font-black whitespace-nowrap inline-flex items-center gap-2 ${chipClass(item)}`}
          >
            {(item.includes("eSewa") || item.includes("Khalti") || item.includes("Fonepay")) ? (
              <span className="w-2 h-2 rounded-full bg-current opacity-80" />
            ) : null}
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function WhyWebsiteSection({ ne }: { ne: boolean }) {
  const mainTitle = ne ? "Google मा भेटिन्छ" : "Get Found on Google";
  const mainDesc = ne
    ? "Facebook पोस्टभन्दा वेबसाइटले सर्च ट्राफिक ल्याउँछ। तपाईंको ग्राहक खोज्दा, तपाईंलाई पाउँछन् — प्रतिस्पर्धीलाई होइन।"
    : "Websites capture search traffic that Facebook posts completely miss. When customers search for your service, they find you — not a competitor.";

  const sub = ne
    ? [
        { title: "तपाईंको आफ्नै डिजिटल सम्पत्ति", desc: "अकाउन्ट ब्लक वा अल्गोरिदम परिवर्तनको डर हुँदैन। वेबसाइट सधैं तपाईंकै हो।", Icon: Shield },
        { title: "विचलित गर्ने विज्ञापन छैन", desc: "तपाईंको पेजमा प्रतिस्पर्धीको विज्ञापन देखिँदैन; ग्राहकको ध्यान सधैं तपाईंमा।", Icon: TrendingDown },
      ]
    : [
        { title: "Own Your Digital Asset", desc: "No fear of account bans or algorithm changes. Your site is always yours, forever.", Icon: Shield },
        { title: "Zero Competitor Ads", desc: "Your page stays focused on your business and offers — not rival brands.", Icon: TrendingDown },
      ];

  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-[0.15em] mb-4">
            <Globe className="w-3.5 h-3.5" />
            {ne ? "किन वेबसाइट?" : "Why a Website"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            {ne ? "तपाईंको व्यवसायलाई वेबसाइट किन चाहिन्छ" : "Why a Website Wins for Business"}
          </h2>
        </div>

        {/* Z-pattern: big card left (spans both rows), two cards stacked right */}
        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:row-span-2 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-100 p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-72"
          >
            <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 mb-8">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 leading-tight">{mainTitle}</h3>
              <p className="text-gray-600 text-lg font-semibold leading-relaxed">{mainDesc}</p>
            </div>
          </motion.div>

          {sub.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12 }}
                className="rounded-3xl bg-white border border-gray-200 p-8 flex items-start gap-5 hover:border-indigo-200 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-600 font-semibold leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustSignalsSection({ ne }: { ne: boolean }) {
  const integrations = [
    { name: "eSewa", cls: "bg-emerald-500 text-white shadow-emerald-200" },
    { name: "Khalti", cls: "bg-purple-600 text-white shadow-purple-200" },
    { name: "Fonepay", cls: "bg-blue-500 text-white shadow-blue-200" },
    { name: ".np Domains", cls: "bg-amber-500 text-white shadow-amber-200" },
  ];

  const features = ne
    ? [
        { title: "नेपाली भाषा", desc: "तपाईंको साइट नेपाली र English दुवैमा।", Icon: Globe, bg: "bg-indigo-50 border-indigo-100" },
        { title: "मोबाइलबाट सम्पादन", desc: "फोनबाटै साइट अपडेट गर्नुहोस्।", Icon: Smartphone, bg: "bg-sky-50 border-sky-100" },
        { title: "नेपाली सपोर्ट", desc: "हाम्रो टिम सधैं नेपालीमा सहयोग गर्छ।", Icon: MessageSquare, bg: "bg-emerald-50 border-emerald-100" },
        { title: "स्थानीय डेटा", desc: "तपाईंको डेटा नेपाल भित्रै सुरक्षित।", Icon: Shield, bg: "bg-amber-50 border-amber-100" },
      ]
    : [
        { title: "Nepali Language", desc: "Your site in Nepali and English both.", Icon: Globe, bg: "bg-indigo-50 border-indigo-100" },
        { title: "Edit on Mobile", desc: "Update your site from your phone.", Icon: Smartphone, bg: "bg-sky-50 border-sky-100" },
        { title: "Local Support", desc: "Our team helps in Nepali, always.", Icon: MessageSquare, bg: "bg-emerald-50 border-emerald-100" },
        { title: "Data Stays Local", desc: "Your data is kept secure inside Nepal.", Icon: Shield, bg: "bg-amber-50 border-amber-100" },
      ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-[0.15em] mb-4">
            <MapPin className="w-3.5 h-3.5" />
            {ne ? "नेपालका लागि बनेको" : "Built for Nepal"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            {ne ? "नेपालमै बनेको, नेपालकै व्यवसायका लागि" : "Built for Nepali businesses, with local rails"}
          </h2>
        </div>

        {/* Integration Dock — real brand logos */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 p-6 rounded-2xl bg-gray-50 border border-gray-100">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest w-full text-center mb-2">
            {ne ? "स्थानीय इन्टिग्रेसनहरू" : "Integrated with"}
          </p>
          {/* eSewa */}
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-emerald-100 shadow hover:shadow-md hover:scale-105 transition-all cursor-default">
            <svg viewBox="0 0 120 40" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="40" rx="6" fill="#60bb46"/>
              <text x="10" y="28" fontFamily="Arial Black,sans-serif" fontSize="22" fontWeight="900" fill="white">e</text>
              <text x="30" y="28" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="white">Sewa</text>
            </svg>
          </div>
          {/* Khalti */}
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-purple-100 shadow hover:shadow-md hover:scale-105 transition-all cursor-default">
            <svg viewBox="0 0 120 40" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="40" rx="6" fill="#5C2D91"/>
              <circle cx="17" cy="20" r="11" fill="#e91e8c"/>
              <text x="10" y="26" fontFamily="Arial Black,sans-serif" fontSize="18" fontWeight="900" fill="white">K</text>
              <text x="33" y="27" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="white">Khalti</text>
            </svg>
          </div>
          {/* Fonepay */}
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-blue-100 shadow hover:shadow-md hover:scale-105 transition-all cursor-default">
            <svg viewBox="0 0 140 40" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
              <rect width="140" height="40" rx="6" fill="#003087"/>
              <rect x="5" y="8" width="24" height="24" rx="4" fill="#e31837"/>
              <text x="9" y="26" fontFamily="Arial Black,sans-serif" fontSize="18" fontWeight="900" fill="white">F</text>
              <text x="35" y="27" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="white">Fonepay</text>
            </svg>
          </div>
          {/* Facebook */}
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-blue-100 shadow hover:shadow-md hover:scale-105 transition-all cursor-default">
            <svg viewBox="0 0 140 40" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
              <rect width="140" height="40" rx="6" fill="#1877F2"/>
              <text x="10" y="28" fontFamily="Arial Black,sans-serif" fontSize="17" fontWeight="900" fill="white">f</text>
              <text x="24" y="27" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="white">Facebook</text>
            </svg>
          </div>
          {/* .np Domains */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-amber-100 shadow hover:shadow-md hover:scale-105 transition-all cursor-default">
            <Globe className="w-5 h-5 text-amber-500" />
            <span className="text-amber-700 font-black text-sm">.np Domains</span>
          </div>
        </div>

        {/* 2x2 / 4-column visual feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.Icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-3xl border p-5 md:p-6 ${feat.bg} hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
              >
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="text-sm font-black text-gray-900 mb-1">{feat.title}</h3>
                <p className="text-gray-600 text-[11px] font-semibold leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Legal trust badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200">
            <Shield className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-xs font-black text-slate-600">
              {ne
                ? "नेपाल सरकारमा दर्ता • PAN/VAT अनुपालन • डेटा नेपालमै"
                : "Registered in Nepal · PAN/VAT Compliant · Data stays local"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ ne, lang }: { ne: boolean; lang: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = ne
    ? [
        { q: "सुरु गर्न कति समय लाग्छ (Setup Time)?", a: "औसतमा १५ मिनेटभित्र साइट सेटअप सुरु गर्न सकिन्छ।" },
        { q: "के म मेरो आफ्नै Domain जोड्न सक्छु?", a: "हो, पेड प्लानमा तुरुन्त कनेक्ट गर्न सकिन्छ।" },
        { q: "नि:शुल्क प्लान (Free Plan) मा के पाइन्छ?", a: "लन्चका लागि चाहिने बेसिक साइट, पेज र टेम्पलेटहरू।" },
        { q: "समस्या परे नेपाली Support हुन्छ?", a: "हो, नेपालीमा सहायता उपलब्ध छ।" },
      ]
    : [
        { q: "How fast can I launch?", a: "Most businesses can start setup in around 15 minutes." },
        { q: "Can I connect my .com.np domain?", a: "Yes. You can connect it on paid plans right away." },
        { q: "What is in the free plan?", a: "Core pages and templates to launch quickly and validate demand." },
        { q: "Do you offer Nepali support?", a: "Yes. Our team helps in Nepali when you need it." },
      ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-xs font-black uppercase tracking-[0.15em] mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              FAQ
            </span>
            <h2 className={`text-3xl md:text-4xl font-black text-gray-900 mb-4 ${ne ? "leading-[1.35]" : ""}`}>
              {ne ? "छिटो निर्णयका लागि छोटो उत्तरहरू" : "Quick Answers Before You Launch"}
            </h2>
            <p className={`text-gray-600 font-semibold mb-5 ${ne ? "leading-[1.9]" : ""}`}>
              {ne ? "अझै केही डर छ? यहीँबाट क्लियर गर्नुहोस्।" : "Still uncertain? Clear your final doubts here."}
            </p>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-black text-gray-900 mb-2">
                {ne ? "अझै प्रश्न छ?" : "Still have questions?"}
              </p>
              <p className="text-xs font-semibold text-gray-600 mb-4">
                {ne ? "हामीसँग सिधै WhatsApp मा कुरा गर्नुहोस्।" : "Talk to our team directly on WhatsApp."}
              </p>
              <a
                href="https://wa.me/08085424538"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-xl text-sm font-black hover:bg-[#20b858] transition-colors shadow-lg shadow-green-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                {ne ? "WhatsApp मा तुरुन्त सहयोग पाउनुहोस्" : "Get instant help on WhatsApp"}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openIndex === i;
              return (
                <div key={f.q} className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  >
                    <span className="text-gray-900 font-black">{f.q}</span>
                    <span className="w-11 h-11 rounded-xl border border-indigo-100 bg-white flex items-center justify-center shrink-0">
                      {open ? <Minus className="w-5 h-5 text-indigo-700" /> : <Plus className="w-5 h-5 text-indigo-700" />}
                    </span>
                  </button>
                  {open ? <p className="px-5 pb-5 text-gray-600 font-semibold text-sm leading-relaxed">{f.a}</p> : null}
                </div>
              );
            })}
            <Link href={`/${lang}/faqs`} className="inline-flex mt-2 text-indigo-600 font-black hover:underline">
              {ne ? "सबै FAQ हेर्नुहोस्" : "View all FAQs"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocalUsersStrip({ ne }: { ne: boolean }) {
  const users = ne
    ? ["हाम्रो प्रयोगकर्ताहरू", "Kathmandu Boutique", "Dhankuta Grill", "Pokhara Photo Hub", "Biratnagar Traders", "Lalitpur Fashion Studio"]
    : ["Our Users", "Kathmandu Boutique", "Dhankuta Grill", "Pokhara Photo Hub", "Biratnagar Traders", "Lalitpur Fashion Studio"];
  const loop = [...users, ...users];

  return (
    <section className="py-5 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-center gap-2">
        <Shield className="w-4 h-4 text-emerald-600" />
        <p className="text-xs font-black text-emerald-700 uppercase tracking-[0.15em]">
          {ne ? "Nepal Government Registered • VAT/PAN Ready" : "Nepal Government Registered • VAT/PAN Ready"}
        </p>
      </div>
      <motion.div
        animate={{ x: [0, -980] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-3 w-max px-6"
      >
        {loop.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className={`px-4 py-2 rounded-full border text-xs md:text-sm font-black whitespace-nowrap inline-flex items-center gap-2 ${idx % 3 === 0 ? "border-emerald-300 text-emerald-700" : "border-gray-300 text-gray-700"}`}
          >
            {idx % 3 === 0 ? <span className="w-2 h-2 rounded-full bg-current opacity-80" /> : null}
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function FinalPushSection({ ne }: { ne: boolean }) {
  return (
    <section className="relative bg-[#07153a] py-16 border-t border-white/10 overflow-hidden">
      <div className="absolute -top-1 inset-x-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-20 text-white" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[42px_42px]" />
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(96,165,250,0.2) 0, transparent 36%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.15) 0, transparent 40%)" }} />
      <div className="absolute -top-16 inset-x-0 h-24 bg-linear-to-b from-white to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
          {ne ? "आजै राति आफ्नो व्यवसाय अनलाइन लैजान तयार हुनुहुन्छ?" : "Ready to take your business online tonight?"}
        </h2>
        <p className="text-white/75 text-base md:text-lg font-semibold max-w-2xl mx-auto mb-8">
          {ne ? "१५ मिनेटमै सुरु गर्नुहोस् र पहिलो ग्राहकलाई प्रोफेसनल वेबसाइटमार्फत सेवा दिनुहोस्।" : "Start in minutes and welcome customers with a professional website tonight."}
        </p>
        <a
          href={APP_URL}
          className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-lg shadow-[0_22px_55px_-18px_rgba(245,158,11,0.95)] ring-2 ring-amber-300/70 hover:scale-[1.03] transition-all"
        >
          {ne ? "अहिले सुरु गर्नुहोस्" : "Get Started"}
          <ArrowRight className="w-5 h-5" />
        </a>
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
    <div className={`min-h-screen bg-slate-950 flex flex-col font-sans ${ne ? `${mukta.className} leading-relaxed` : ""}`}>
      <Navbar lang={lang} accent={accent} nav={d.nav} preLaunch={PRE_LAUNCH} />

      <section className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0 bg-cover bg-center brightness-50" style={{ backgroundImage: `url(/slide-${idx}.png)` }} />
        </AnimatePresence>
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <motion.div
                  {...fu()}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-300/25 text-emerald-100 text-xs md:text-sm font-black"
                >
                  {hero.topBar ?? (ne ? "सधैं नि:शुल्क प्लान • आफ्नै डोमेन • कार्ड आवश्यक छैन" : "Permanent free plan • your own domain • no card required")}
                </motion.div>

                <motion.h1 {...fu(0.05)} className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.06] tracking-tight whitespace-pre-line">
                  {hero.headline}
                </motion.h1>

                <motion.p {...fu(0.1)} className="text-white/80 text-lg md:text-xl font-semibold max-w-2xl leading-relaxed">
                  {hero.subhead}
                </motion.p>

                <motion.div {...fu(0.15)} className="flex flex-wrap items-center gap-3">
                  <a
                    href={APP_URL}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-amber-500/30 transition-all"
                  >
                    {hero.ctaPrimary ?? (ne ? "नि:शुल्क हेर्नुहोस् — कार्ड चाहिँदैन" : "Try It Free — No Card Needed")}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="#demo"
                    className="inline-flex items-center gap-1 text-white/80 hover:text-white font-black text-base underline underline-offset-4 decoration-white/40"
                  >
                    {ne ? "१ मिनेटमा हेर्नुहोस्" : "See it in 1 minute"}
                  </a>
                </motion.div>

                {/* Social proof */}
                <motion.div {...fu(0.18)} className="flex items-center gap-2.5">
                  <div className="flex -space-x-1.5">
                    {["👨‍💼","👩‍🍳","🧑‍🎨","👨‍💻"].map((e) => (
                      <span key={e} className="w-7 h-7 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-sm">{e}</span>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm font-bold">
                    {ne ? "नेपाली उद्यमीहरूका लागि बनाइएको" : "New sites being created every week"}
                  </p>
                </motion.div>

                <motion.div {...fu(0.2)} className="flex flex-wrap gap-2.5">
                  {(hero.trust ?? []).slice(0, 3).map((item: string) => (
                    <span key={item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                      {item}
                    </span>
                  ))}
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

      <TrustMarquee ne={ne} />

      <ConversionBridge hero={hero} ne={ne} />

      <DemoVideo d={d} />

      <AIStaffTeaser d={d} lang={lang} />
      <LocalUsersStrip ne={ne} />
      <WhyWebsiteSection ne={ne} />
      <TrustSignalsSection ne={ne} />
      <FeaturesTeaser d={d} lang={lang} />
      <PricingTeaser d={d} lang={lang} />
      <FAQSection ne={ne} lang={lang} />
      <FinalPushSection ne={ne} />
      <Footer lang={lang} d={d} PRE_LAUNCH={PRE_LAUNCH} ctaHref={ctaHref} />
      <ExitIntentOverlay d={d} visible={exitVisible} onClose={() => setExitVisible(false)} />
      <AIChatbot ne={ne} />
    </div>
  );
}
