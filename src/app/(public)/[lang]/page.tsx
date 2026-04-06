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
  Users,
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
  UtensilsCrossed,
  Briefcase,
  Hospital,
  Home,
  Palette,
  Package,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDictionary } from "@/lib/dictionaries";

// ─── Pre-launch flag ───────────────────────────────────────────────────────────
const PRE_LAUNCH = true;

function ctaHref(href: string) {
  return PRE_LAUNCH ? "#waitlist" : href;
}

import { sendWaitlistSES } from "@/app/actions";

// ─── Business type options ────────────────────────────────────────────────────
const BUSINESS_TYPES = [
  { icon: UtensilsCrossed, label: "Restaurant / Café" },
  { icon: ShoppingBag, label: "Retail / Shop" },
  { icon: GraduationCap, label: "School / Academy" },
  { icon: Plane, label: "Consultancy / Travel" },
  { icon: Briefcase, label: "Professional / Freelance" },
  { icon: Hospital, label: "Health / Clinic" },
  { icon: Home, label: "Real Estate" },
  { icon: Palette, label: "Creative / Portfolio" },
  { icon: Package, label: "Other" },
];

// ─── WaitlistForm ─────────────────────────────────────────────────────────────
function WaitlistForm({ d }: { d: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("waitlist_joined") === "true"
    ) {
      setStatus("success");
    }
  }, []);

  const submit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || status === "loading") return;
    setStatus("loading");
    try {
      await sendWaitlistSES(trimmedEmail, name.trim(), businessType);
      if (typeof window !== "undefined")
        localStorage.setItem("waitlist_joined", "true");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrMsg(
        d.waitlist?.errorGeneric ?? "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center py-6"
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>
        <h3 className="text-2xl font-black text-gray-900 mb-2">
          {d.waitlist?.successTitle ?? "You're on the list!"}
        </h3>
        <p className="text-gray-800">
          {d.waitlist?.successText ??
            "We'll email you the moment HamroLink goes live."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-black text-gray-950 uppercase tracking-widest mb-1.5">
          Email address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-700 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="you@example.com"
            disabled={status === "loading"}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)] transition-all disabled:opacity-50 font-medium"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm font-bold bg-red-50 border border-red-100 rounded-xl px-4 py-2">
          {errMsg}
        </p>
      )}

      <button
        onClick={submit}
        disabled={status === "loading" || !email.trim()}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-black text-lg transition-all hover:scale-[1.01] hover:shadow-xl active:scale-95 disabled:opacity-40 mt-2"
        style={{
          background: "linear-gradient(135deg,#4f46e5,#9333ea)",
          boxShadow: `0 10px 30px rgba(79,70,229,0.3)`,
        }}
      >
        {status === "loading" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>{" "}
            {d.waitlist?.submitting ?? "Joining…"}
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />{" "}
            {d.waitlist?.cta ?? "Reserve My Spot"} →
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-gray-500 font-medium">
        {(d.waitlist as any).formSub ?? "10 seconds. No credit card required."}
      </p>
    </div>
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
              href="#waitlist"
              className="flex items-center gap-2 px-5 py-2 bg-white text-indigo-700 rounded-xl text-base font-black hover:scale-105 transition-transform shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              {d.video.cta}
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
        alt="Professional Photography Portfolio" 
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
        alt="Modern Nepali Shop Mockup" 
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
        alt="Elite School Website Mockup" 
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
              Explore AI Staff Capabilities
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
                    <h4 className="text-white text-[12px] font-black">AI Business Assistant</h4>
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
                  alt="Real AI Chat Mockup" 
                  className="w-full h-full object-cover rounded-3xl shadow- inner border border-white/5"
                  fill
                  unoptimized
                />
              </div>

              {/* Input Area Overlay */}
              <div className="p-4 bg-white/5 border-t border-white/10">
                 <div className="h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 justify-between">
                    <span className="text-white/40 text-xs font-medium">Type a message...</span>
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
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Built for growth.</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">{f.subtext}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           {f.items.slice(0, 4).map((item: any) => (
             <div key={item.title} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <h3 className="font-black text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-2">{item.desc}</p>
             </div>
           ))}
        </div>
        <Link href={`/${lang}/features`} className="inline-flex items-center gap-2 text-indigo-600 font-black hover:gap-4 transition-all">
           See all 12 platform features <ArrowRight className="w-4 h-4" />
        </Link>
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
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Pricing that scales with you</h2>
          <p className="text-gray-600 text-xl font-medium">From individual creators to large institutions.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl group hover:border-indigo-100 transition-all">
            <h3 className="text-2xl font-black mb-2">Free Forever</h3>
            <p className="text-gray-500 mb-6">Perfect for testing the platform.</p>
            <div className="text-4xl font-black mb-8 text-gray-900">Rs 0</div>
            <Link href={`/${lang}/pricing`} className="block w-full py-4 bg-gray-900 text-white text-center rounded-2xl font-black hover:bg-indigo-600 transition-all">
               View Details
            </Link>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border-2 border-amber-200 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 px-4 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Popular</div>
            <h3 className="text-2xl font-black mb-2">Local Start</h3>
            <p className="text-gray-500 mb-6">Best for small businesses.</p>
            <div className="text-4xl font-black mb-8 text-amber-600">Rs 199<span className="text-sm text-gray-400">/mo</span></div>
            <Link href={`/${lang}/pricing`} className="block w-full py-4 bg-amber-500 text-white text-center rounded-2xl font-black hover:bg-amber-600 transition-all shadow-xl shadow-amber-200">
               Learn More
            </Link>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href={`/${lang}/pricing`} className="text-indigo-600 font-bold hover:underline">Compare all 5 plans →</Link>
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
          Still thinking? <span className="text-red-500">Wait.</span>
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
            <a href="#waitlist" onClick={onClose} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200">{d.exitIntent.cta}</a>
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
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Stop begging for reach.</h2>
          <p className="text-white/70 text-xl leading-relaxed mb-12">Own your audience. 100% reach. 0% algorithms. Build your email list automatically with HamroLink.</p>
          <div className="w-full h-px bg-white/10 mb-12" />
          <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold">
             <Mail className="w-5 h-5" /> Incoming Feature: Hamro Reach
          </div>
       </div>
    </section>
  );
}

// ─── Landing Page Main ────────────────────────────────────────────────────────
export default function LandingPage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const hero = d.hero;
  const accent = "#6366f1";
  const [idx, setIdx] = useState(0);
  const [exitVisible, setExitVisible] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Show only once per user, and only if they haven't joined the waitlist
      const shown = localStorage.getItem("exit_intent_shown");
      const joined = localStorage.getItem("waitlist_joined");
      if (e.clientY < 20 && !shown && !joined) {
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
      <Navbar lang={lang} accent={accent} nav={d.nav} />

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
                <motion.div {...fu(0.2)} className="flex flex-wrap gap-4">
                   <a href="#waitlist" className="px-8 py-5 bg-white text-gray-900 text-lg font-black rounded-2xl hover:scale-105 transition-all shadow-2xl">{d.nav.cta} →</a>
                   <Link href={`/${lang}/features`} className="px-8 py-5 bg-white/10 border border-white/20 text-white text-lg font-black rounded-2xl hover:bg-white/20 transition-all backdrop-blur-md">Explore Features</Link>
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
      <FeaturesTeaser d={d} lang={lang} />
      <StoriesTeaser d={d} lang={lang} />
      
      <section id="waitlist" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-100 shadow-2xl shadow-indigo-100/50">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-4xl font-black text-gray-900 mb-6">{d.waitlist.launchLabel}</h2>
                 <p className="text-gray-600 text-lg leading-relaxed">{d.waitlist.subheading}</p>
                 <div className="mt-8 flex items-center gap-3">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-600 font-bold">U</div>)}
                    </div>
                    <span className="text-gray-900 font-black">240+ Joined</span>
                 </div>
              </div>
              <WaitlistForm d={d} />
           </div>
        </div>
      </section>

      <PricingTeaser d={d} lang={lang} />
      <ObjectionSection d={d} />
      <EmailMarketingStrip d={d} />
      <Footer lang={lang} d={d} PRE_LAUNCH={PRE_LAUNCH} ctaHref={ctaHref} />
      <ExitIntentOverlay d={d} visible={exitVisible} onClose={() => setExitVisible(false)} />
    </div>
  );
}
