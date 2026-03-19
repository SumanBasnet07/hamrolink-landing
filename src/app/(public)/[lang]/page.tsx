"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("waitlist_joined") === "true") {
      setStatus("success");
    }
  }, []);

  const submit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || status === "loading") return;
    setStatus("loading");
    try {
      await sendWaitlistSES(trimmedEmail, name.trim(), businessType);
      if (typeof window !== "undefined") localStorage.setItem("waitlist_joined", "true");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrMsg(d.waitlist?.errorGeneric ?? "Something went wrong. Please try again.");
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
          {d.waitlist?.successText ?? "We'll email you the moment HamroLink goes live."}
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
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            placeholder="you@example.com"
            disabled={status === "loading"}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)] transition-all disabled:opacity-50 font-medium"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm font-bold bg-red-50 border border-red-100 rounded-xl px-4 py-2">{errMsg}</p>
      )}

      <button
        onClick={submit}
        disabled={status === "loading" || !email.trim()}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-black text-lg transition-all hover:scale-[1.01] hover:shadow-xl active:scale-95 disabled:opacity-40 mt-2"
        style={{ background: "linear-gradient(135deg,#4f46e5,#9333ea)", boxShadow: `0 10px 30px rgba(79,70,229,0.3)` }}
      >
        {status === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{d.video.heading}</h2>
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
                  <span className="text-white font-semibold text-base">{steps[step]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <Clock className="w-3 h-3" />
                ~9s
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
            <p className="text-white font-black text-base">{d.video.finalFrame}</p>
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

// ─── Phone screens ────────────────────────────────────────────────────────────
function CreatorScreen() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-white shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-black text-[9px]">S</span>
          </div>
          <span className="text-gray-900 font-bold text-[11px]">Sara</span>
        </div>
        <div className="flex gap-2.5">
          {["Travel", "Vlogs", "Contact"].map((t) => (
            <span key={t} className="text-[8px] text-gray-800 font-medium">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 pt-3 pb-2">
        <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-black text-lg border-2 border-orange-300 shadow-md shrink-0">S</div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-black text-gray-900 text-[13px]">Sara Shrestha</span>
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center">
              <Check className="w-2 h-2 text-white" strokeWidth={3} />
            </div>
          </div>
          <p className="text-[9px] text-gray-800">Digital Creator · Vlogger</p>
          <span className="text-[8px] text-blue-500 font-medium">sara.hamrolink.com</span>
        </div>
      </div>
      <div className="mx-3 mb-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-200 rounded-xl p-2.5">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-900">Travel With Me</div>
            <div className="text-[8px] text-gray-800">Explore destinations</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[["24", "Districts"], ["125", "Vlogs"], ["240k", "Views"]].map(([v, l]) => (
            <div key={l} className="bg-white/70 rounded-lg py-1.5 text-center">
              <div className="text-[10px] font-black text-gray-900">{v}</div>
              <div className="text-[7px] text-gray-800">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mx-3 mb-2">
        <button className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-2 text-[10px] font-bold">
          <Phone className="w-3 h-3" /> Contact
        </button>
        <button className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl py-2 text-[10px] font-bold">
          <Camera className="w-3 h-3" /> Watch
        </button>
      </div>
      <div className="mt-auto border-t border-gray-100 mx-3 py-2 flex items-center justify-between">
        {[["48", "Videos"], ["156", "Posts"], ["24", "Collabs"]].map(([v, l]) => (
          <div key={l} className="text-center">
            <div className="text-[10px] font-black text-gray-900">{v}</div>
            <div className="text-[7px] text-gray-700">{l}</div>
          </div>
        ))}
        <div className="text-[7px] text-gray-300">© Sara</div>
      </div>
    </div>
  );
}

function ShopScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <div className="px-3 py-2 bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-between">
        <span className="text-white font-black text-[12px]">🛍 Hamro Pasal</span>
        <div className="relative">
          <ShoppingCart className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full text-[6px] font-black text-gray-900 flex items-center justify-center">2</span>
        </div>
      </div>
      <div className="mx-3 my-2 bg-gray-100 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
        <svg className="w-3 h-3 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-[9px] text-gray-700">Search products…</span>
      </div>
      <div className="flex gap-1.5 px-3 mb-2">
        {["All", "Bags", "Shawls", "Crafts"].map((c, i) => (
          <span key={c} className={`px-2 py-0.5 rounded-full text-[8px] font-bold shrink-0 ${i === 0 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>{c}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 flex-1">
        {[
          { n: "Handmade Bag", p: "Rs 1,200", e: "👜", tag: "Bestseller", tc: "bg-orange-500" },
          { n: "Pashmina Shawl", p: "Rs 2,500", e: "🧣", tag: "New", tc: "bg-blue-500" },
          { n: "Dhaka Fabric", p: "Rs 850", e: "🎀", tag: "Sale", tc: "bg-rose-500" },
          { n: "Clay Pot", p: "Rs 600", e: "🏺", tag: "Craft", tc: "bg-amber-500" },
        ].map((p) => (
          <div key={p.n} className="rounded-xl border border-orange-100 bg-orange-50 p-2">
            <div className="text-2xl mb-1 text-center">{p.e}</div>
            <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full ${p.tc} text-white`}>{p.tag}</span>
            <div className="text-[9px] font-bold text-gray-900 mt-1 leading-tight">{p.n}</div>
            <div className="text-[10px] font-black text-orange-600">{p.p}</div>
            <button className="w-full mt-1 py-0.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-md text-[7px] font-bold">Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-1.5 mb-2 flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2 py-1">
        <div className="w-4 h-4 rounded bg-green-600 flex items-center justify-center text-white font-black text-[7px]">E</div>
        <span className="text-[8px] text-green-700 font-semibold">eSewa & Khalti accepted</span>
      </div>
    </div>
  );
}

function SchoolScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-[10px] border border-white/30">VA</div>
          <div>
            <div className="text-white font-black text-[12px]">Valley Academy</div>
            <div className="text-emerald-100 text-[8px]">Est. 1995 · Kathmandu</div>
          </div>
        </div>
        <div className="bg-yellow-400 text-yellow-900 text-[8px] font-black px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          🎓 Admissions Open 2025–26
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-3 mt-2.5 mb-2">
        {[["1,200", "Students"], ["98%", "Pass Rate"], ["30 yrs", "Experience"]].map(([v, l]) => (
          <div key={l} className="bg-emerald-50 border border-emerald-100 rounded-xl py-2 text-center">
            <div className="text-[11px] font-black text-emerald-700">{v}</div>
            <div className="text-[7px] text-gray-800">{l}</div>
          </div>
        ))}
      </div>
      <div className="px-3 mb-2 flex-1">
        {[
          [<BookOpen key="a" className="w-3.5 h-3.5 text-emerald-600" />, "Nursery – Grade 5", "Primary"],
          [<BookOpen key="b" className="w-3.5 h-3.5 text-blue-600" />, "Grade 6 – 10", "Secondary"],
          [<GraduationCap key="c" className="w-3.5 h-3.5 text-orange-600" />, "Grade 11 – 12", "Higher Sec."],
        ].map(([e, n, d]) => (
          <div key={n as string} className="flex items-center gap-2 py-1.5 border-b border-gray-50">
            <span>{e}</span>
            <div>
              <div className="text-[9px] font-bold text-gray-900">{n as string}</div>
              <div className="text-[7px] text-gray-700">{d as string}</div>
            </div>
            <ArrowRight className="w-3 h-3 text-gray-300 ml-auto" />
          </div>
        ))}
      </div>
      <div className="px-3 mt-auto mb-3">
        <button className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-[10px] font-black">Apply for Admission →</button>
      </div>
    </div>
  );
}

function ConsultancyScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <div className="bg-gradient-to-br from-violet-700 to-indigo-800 px-3 pt-3 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Plane className="w-4 h-4 text-violet-300" />
          <span className="text-white font-black text-[12px]">Nepal Abroad</span>
        </div>
        <div className="text-violet-200 text-[8px] mb-2">abroad.hamrolink.com</div>
        <div className="text-white font-bold text-[11px] leading-snug">Study in UK, USA, Canada & Australia</div>
        <div className="flex gap-1 mt-2 text-lg">🇬🇧🇺🇸🇨🇦🇦🇺</div>
      </div>
      <div className="px-3 pt-2.5 space-y-1.5 flex-1">
        {[
          [<CheckCircle key="a" className="w-4 h-4 text-violet-600" />, "Visa Processing", "Expert guidance"],
          [<GraduationCap key="b" className="w-4 h-4 text-violet-600" />, "University Match", "200+ universities"],
          [<MessageSquare key="c" className="w-4 h-4 text-violet-600" />, "Free Counseling", "Book today"],
        ].map(([e, t, d]) => (
          <div key={t as string} className="flex items-center gap-2 p-2 bg-violet-50 rounded-xl border border-violet-100">
            <span>{e}</span>
            <div>
              <div className="text-[9px] font-bold text-gray-900">{t as string}</div>
              <div className="text-[7px] text-gray-800">{d as string}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 mt-2 mb-3">
        <button className="w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-700 text-white rounded-xl text-[10px] font-black mb-1.5">Get Free Counseling →</button>
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[8px] text-gray-800">AI Chatbot available 24/7</span>
        </div>
      </div>
    </div>
  );
}

function RestaurantScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-3 pt-3 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-white font-black text-[13px]">Thakali Kitchen</div>
            <div className="text-amber-100 text-[8px]">Authentic Nepali Cuisine</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5 bg-amber-50 border-b border-amber-100">
        <div className="flex items-center gap-1 text-[8px] text-green-600 font-bold">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />Open Now
        </div>
        <div className="flex items-center gap-0.5">
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          <span className="text-[8px] text-gray-600">4.9 (320)</span>
        </div>
      </div>
      <div className="px-3 pt-2 flex-1">
        {[
          { icon: <UtensilsCrossed className="w-4 h-4 text-amber-600" />, name: "Dal Bhat Set", price: "Rs 350" },
          { icon: <UtensilsCrossed className="w-4 h-4 text-orange-600" />, name: "Thakali Thali", price: "Rs 550" },
          { icon: <UtensilsCrossed className="w-4 h-4 text-amber-600" />, name: "Gundruk Soup", price: "Rs 180" },
          { icon: <Coffee className="w-4 h-4 text-amber-600" />, name: "Sel Roti + Tea", price: "Rs 120" },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-2 py-1.5 border-b border-gray-50">
            <span>{item.icon}</span>
            <span className="flex-1 text-[9px] font-bold text-gray-900">{item.name}</span>
            <span className="text-[10px] font-black text-amber-600">{item.price}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5 px-3 mt-2 mb-3">
        <button className="py-2 bg-amber-500 text-white rounded-xl text-[9px] font-black">Calendar Reserve</button>
        <button className="py-2 border border-amber-400 text-amber-600 rounded-xl text-[9px] font-black">Menu List</button>
      </div>
    </div>
  );
}

const SLIDES = [
  { id: "creator", accent: "#3B82F6", grad: "from-[#07102e] via-[#0c1c5e] to-[#130428]", glow: "#3B82F6", Screen: CreatorScreen },
  { id: "shop", accent: "#F97316", grad: "from-[#1c0800] via-[#2d1200] to-[#1a0505]", glow: "#F97316", Screen: ShopScreen },
  { id: "school", accent: "#10B981", grad: "from-[#001a0d] via-[#012e19] to-[#001220]", glow: "#10B981", Screen: SchoolScreen },
  { id: "consultancy", accent: "#8B5CF6", grad: "from-[#0d0020] via-[#1a0038] to-[#080820]", glow: "#8B5CF6", Screen: ConsultancyScreen },
  { id: "restaurant", accent: "#F59E0B", grad: "from-[#1c0e00] via-[#2d1800] to-[#1a0f00]", glow: "#F59E0B", Screen: RestaurantScreen },
];

const FEAT_ICONS = [Globe, ShoppingBag, Bot, Smartphone, Search, QrCode, Inbox, BarChart3];
const FEAT_GRADS = [
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-yellow-500",
  "from-sky-500 to-blue-600",
  "from-slate-500 to-gray-600",
];
const PLAN_ICONS = [Globe, Zap, Crown];
const PLAN_GRADS = [
  "from-slate-400 to-slate-600",
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-700",
];

// ─── Browser frame ────────────────────────────────────────────────────────────
function BrowserFrame({ url, children, accent }: { url: string; children: React.ReactNode; accent: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="bg-gray-900 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 bg-gray-700/60 rounded-md px-2.5 py-1 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
          <span className="text-[9px] text-gray-300 truncate">{url}</span>
        </div>
        <div className="w-3 h-3 rounded-sm border border-gray-600" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}

// ─── Template previews (reused from original) ────────────────────────────────
const TEMPLATES = [
  {
    name: "Everest Portfolio", cat: "Portfolio", accent: "#3b82f6", url: "sara.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-[8px]">S</div>
            <span className="text-white font-bold text-[10px]">Sara.dev</span>
          </div>
          <div className="flex gap-3">
            {["Work", "About", "Blog", "Contact"].map((t) => (<span key={t} className="text-[8px] text-white/90">{t}</span>))}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 px-4">
          <div className="flex-1">
            <div className="text-[8px] text-blue-400 font-bold mb-1 uppercase tracking-widest">UI/UX Designer</div>
            <h2 className="text-white font-black text-base leading-tight mb-2">Crafting digital<br />experiences <Palette className="inline w-3.5 h-3.5" /></h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-[8px] font-bold">View Work</button>
              <button className="px-3 py-1.5 border border-white/20 text-white/70 rounded-lg text-[8px]">Contact</button>
            </div>
          </div>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shrink-0">S</div>
        </div>
      </div>
    ),
  },
  {
    name: "Bazaar Commerce", cat: "E-Commerce", accent: "#f97316", url: "bazaar.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-2 flex items-center justify-between">
          <span className="text-white font-black text-[11px]">🛍 Bazaar Store</span>
          <ShoppingCart className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-1.5 p-2">
          {[{ e: "👜", n: "Bag", p: "Rs 1,200" }, { e: "🧣", n: "Shawl", p: "Rs 2,500" }, { e: "🏺", n: "Pot", p: "Rs 800" }].map((item) => (
            <div key={item.n} className="rounded-lg border border-orange-100 bg-orange-50/50 p-1.5 flex flex-col items-center gap-1">
              <div className="text-xl">{item.e}</div>
              <div className="text-[8px] font-bold text-gray-800">{item.n}</div>
              <div className="text-[8px] font-black text-orange-600">{item.p}</div>
            </div>
          ))}
        </div>
        <div className="px-2 pb-2 flex items-center gap-1.5 bg-green-50 mx-2 rounded-lg py-1 border border-green-100">
          <div className="w-3 h-3 rounded bg-green-600 flex items-center justify-center text-white font-black text-[6px]">E</div>
          <span className="text-[7px] text-green-700 font-semibold">eSewa & Khalti</span>
        </div>
      </div>
    ),
  },
  {
    name: "Scholar Academy", cat: "Education", accent: "#10b981", url: "valley.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2.5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-black text-[9px]">VA</div>
          <div><div className="text-white font-black text-[11px]">Valley Academy</div><div className="text-emerald-100 text-[7px]">Est. 1995</div></div>
          <div className="ml-auto bg-yellow-400 text-yellow-900 text-[7px] font-black px-1.5 py-0.5 rounded-full">Open</div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-2.5 pt-2">
          {[["1,200", "Students"], ["98%", "Pass"], ["30", "Years"]].map(([v, l]) => (
            <div key={l} className="bg-emerald-50 border border-emerald-100 rounded-lg py-1.5 text-center">
              <div className="text-[10px] font-black text-emerald-700">{v}</div>
              <div className="text-[7px] text-gray-800">{l}</div>
            </div>
          ))}
        </div>
        <div className="px-2.5 pb-2 mt-auto">
          <button className="w-full py-1.5 bg-emerald-600 text-white rounded-lg text-[8px] font-black">Apply Now →</button>
        </div>
      </div>
    ),
  },
  {
    name: "Voyage Consultancy", cat: "Consultancy", accent: "#8b5cf6", url: "abroad.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-br from-violet-700 to-indigo-800 px-3 py-3">
          <div className="flex items-center gap-2 mb-1"><Plane className="w-3 h-3 text-violet-300" /><span className="text-white font-black text-[12px]">Nepal Abroad</span></div>
          <div className="text-white font-bold text-[10px]">UK · USA · Canada · Australia</div>
        </div>
        <div className="flex-1 px-2.5 pt-2 space-y-1.5">
          {[["Visa Processing", "✓"], ["University Match", "✓"], ["Free Counseling", "✓"]].map(([t, i]) => (
            <div key={t} className="flex items-center gap-2 p-1.5 bg-violet-50 rounded-lg border border-violet-100">
              <CheckCircle className="w-3 h-3 text-violet-600" />
              <span className="text-[8px] font-bold text-gray-800">{t}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 pt-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[7px] text-gray-800">AI Chatbot 24/7</span>
          </div>
        </div>
        <div className="px-2.5 pb-2"><button className="w-full py-1.5 bg-violet-600 text-white rounded-lg text-[8px] font-black">Book Free Session →</button></div>
      </div>
    ),
  },
  {
    name: "Thakali Kitchen", cat: "Restaurant", accent: "#f59e0b", url: "thakali.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2 flex items-center gap-2">
          <UtensilsCrossed className="w-6 h-6 text-white" />
          <div><div className="text-white font-black text-[11px]">Thakali Kitchen</div><div className="text-amber-100 text-[7px]">Authentic Nepali</div></div>
        </div>
        <div className="flex-1 px-2.5 pt-1.5">
          {[{ n: "Dal Bhat", p: "Rs 350" }, { n: "Thali", p: "Rs 550" }, { n: "Gundruk", p: "Rs 180" }, { n: "Sel Roti", p: "Rs 120" }].map((item) => (
            <div key={item.n} className="flex items-center gap-1.5 border-b border-gray-50 py-1">
              <UtensilsCrossed className="w-3 h-3 text-amber-600" />
              <span className="flex-1 text-[8px] font-semibold text-gray-800">{item.n}</span>
              <span className="text-[8px] font-black text-amber-600">{item.p}</span>
            </div>
          ))}
        </div>
        <div className="px-2.5 pb-2 mt-1">
          <button className="w-full py-1.5 bg-amber-500 text-white rounded-lg text-[8px] font-black">Reserve Table →</button>
        </div>
      </div>
    ),
  },
  {
    name: "Nova Startup", cat: "Business", accent: "#ec4899", url: "nova.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-br from-pink-600 via-rose-600 to-orange-500 px-3 py-3 text-center">
          <div className="text-white font-black text-[13px] mb-1"><Rocket className="w-4 h-4 text-white mr-1 inline" /> Nova Tech</div>
          <button className="px-3 py-1 bg-white text-pink-600 rounded-full text-[8px] font-black">Get Early Access</button>
        </div>
        <div className="flex-1 px-2.5 pt-2">
          {[["SaaS Products", Zap], ["Mobile Apps", Smartphone], ["Web Platforms", Globe]].map(([t, Icon]: any) => (
            <div key={t} className="flex items-center gap-2 py-1.5 border-b border-gray-50">
              <Icon className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-[8px] font-medium text-gray-700">{t}</span>
            </div>
          ))}
        </div>
        <div className="px-2.5 pb-2">
          <button className="w-full py-1.5 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-lg text-[8px] font-black">Partner With Us</button>
        </div>
      </div>
    ),
  },
];

// ─── Language switcher ────────────────────────────────────────────────────────
function LangSwitcher({ lang, accent, scrolled = false }: { lang: string; accent: string; scrolled?: boolean }) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const rest = segments.slice(2).join("/");
  return (
    <div className={`flex items-center gap-1 rounded-lg p-1 ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
      {(["en", "ne"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          className={`px-2.5 py-1 rounded-md text-sm font-bold transition-all ${lang === l ? "text-white" : scrolled ? "text-gray-800 hover:text-gray-800" : "text-white/60 hover:text-white"}`}
          style={lang === l ? { background: accent } : {}}
        >
          {l === "en" ? "EN" : "नेपाली"}
        </Link>
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ accent, lang, nav }: { accent: string; lang: string; nav: any }) {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${sc ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className={`font-black flex items-center text-xl tracking-tight transition-colors duration-500 ${sc ? "text-gray-900" : "text-white"}`}>
          <img src="/logo.png" className="w-8 h-8 mr-2" alt="HamroLink Logo" />
          Hamro<span style={{ color: accent }}>Link</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[
            ["#ai-staff", nav.templates],
            ["#features", nav.features],
            [`/${lang}/pricing`, nav.pricing],
            ["#stories", nav.docs],
            [`/${lang}/contact`, nav.contact],
          ].map(([href, label]) => (
            <Link key={label} href={href} className={`text-base font-medium transition-colors ${sc ? "text-gray-600 hover:text-gray-900" : "text-white/70 hover:text-white"}`}>{label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher lang={lang} accent={accent} scrolled={sc} />
          <a
            href={ctaHref("/signup")}
            className="flex items-center gap-1.5 px-4 py-2 text-white text-base font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
            style={{ background: accent }}
          >
            <Sparkles className="w-3.5 h-3.5" /> {PRE_LAUNCH ? nav.cta : (nav.ctaPostLaunch ?? nav.cta)}
          </a>
        </div>
        <button onClick={() => setOpen((p) => !p)} className={`md:hidden p-2 ${sc ? "text-gray-700" : "text-white"}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2"
          >
            <div className="pb-2"><LangSwitcher lang={lang} accent={accent} scrolled={true} /></div>
            {[
              ["#ai-staff", nav.templates],
              ["#features", nav.features],
              [`/${lang}/pricing`, nav.pricing],
              ["#stories", nav.docs],
              [`/${lang}/contact`, nav.contact],
            ].map(([href, label]) => (
              <Link key={label} href={href} onClick={() => setOpen(false)} className="block py-2 text-base font-medium text-gray-700">{label}</Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <a href={ctaHref("/signup")} className="block py-2.5 text-center text-white rounded-xl text-base font-bold" style={{ background: accent }} onClick={() => setOpen(false)}>
                {nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────────
function ProcessSection({ lang, hero }: { lang: string; hero: any }) {
  if (!hero.process) return null;
  const icons = [MessageSquare, Maximize2, Rocket];
  const colors = [
    "bg-blue-50 text-blue-600 border-blue-100",
    "bg-purple-50 text-purple-600 border-purple-100",
    "bg-emerald-50 text-emerald-600 border-emerald-100"
  ];
  
  return (
    <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-base font-semibold mb-4">
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {lang === 'ne' ? 'छिटो र सजिलो' : 'Fast & Simple'}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {hero.process.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gray-100" />
          
          {hero.process.steps.map((s: any, i: number) => {
            const Icon = icons[i];
            const colorClass = colors[i];
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className={`w-24 h-24 rounded-[32px] ${colorClass} border-2 flex items-center justify-center mb-8 shadow-xl shadow-gray-200/50 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}>
                  <Icon className="w-10 h-10" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-base shadow-lg border-4 border-white">
                    0{i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{s.title}</h3>
                <p className="text-gray-800 text-lg leading-relaxed max-w-[300px]">
                  {s.desc}
                </p>
                
                {/* Mobile connector */}
                {i < hero.process.steps.length - 1 && (
                  <div className="md:hidden w-px h-12 bg-gray-100 my-8" />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-10 border-t border-gray-50 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl text-gray-700 font-bold border border-gray-100">
            <Sparkles className="w-5 h-5 text-blue-500" />
            {hero.process.footer}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NEW: "The Problem" Section (replaces generic "Who it's for") ────────────
function TheProblemSection({ d }: { d: any }) {
  const who = d.who;
  if (!who) return null;
  const cardConfig = [
    { border: "border-gray-200 hover:border-gray-400", bg: "bg-gray-50", icon: <AlertTriangle className="w-6 h-6 text-gray-800" />, iconBg: "bg-gray-100" },
    { border: "border-red-200 hover:border-red-400", bg: "bg-red-50", icon: <Search className="w-6 h-6 text-red-500" />, iconBg: "bg-red-100" },
    { border: "border-orange-200 hover:border-orange-400", bg: "bg-orange-50", icon: <Moon className="w-6 h-6 text-orange-500" />, iconBg: "bg-orange-100" },
    { border: "border-green-200 hover:border-green-400", bg: "bg-green-50", icon: <Trophy className="w-6 h-6 text-green-600" />, iconBg: "bg-green-100" },
    { border: "border-purple-200 hover:border-purple-400", bg: "bg-purple-50", icon: <Shield className="w-6 h-6 text-purple-600" />, iconBg: "bg-purple-100" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full text-red-600 text-base font-semibold mb-4">
            <AlertTriangle className="w-4 h-4" />
            {who.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight whitespace-pre-line mb-4">
            {who.heading}
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto text-lg leading-relaxed">{who.subtext}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {who.cards.map((card: any, i: number) => {
            const cfg = cardConfig[i % cardConfig.length];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-2xl p-6 border-2 ${cfg.border} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                  <div className={`w-14 h-14 rounded-2xl ${cfg.iconBg} flex items-center justify-center mb-6`}>
                    {cfg.icon}
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest text-gray-700 mb-2">{card.label}</p>
                  <h3 className="font-black text-gray-950 text-xl mb-4 leading-tight">{card.title}</h3>
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            Fix this for your business
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NEW: AI Staff Section ────────────────────────────────────────────────────
function AIStaffSection({ d, lang }: { d: any; lang: string }) {
  const ai = d.aiStaff;
  if (!ai) return null;
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
    <section id="ai-staff" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle,#8b5cf6,transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[80px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-base font-semibold mb-4">
            <Bot className="w-4 h-4" />
            {ai.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight whitespace-pre-line mb-4">
            {ai.heading}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">{ai.subtext}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ai.features.map((feat: any, i: number) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/8 hover:border-white/15 transition-all duration-300 hover:-translate-y-2 shadow-2xl"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center mb-6 shadow-xl`}>
                  {iconMap[feat.icon]}
                </div>
                <h3 className="font-black text-white mb-3 text-xl tracking-tight">{feat.title}</h3>
                <p className="text-white/85 text-lg leading-relaxed font-medium">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            {/* Right: Live chatbot mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-5"
            >
              {/* Phone mockup with chat UI */}
              <div className="bg-gray-900 rounded-3xl p-1 border border-white/10 shadow-2xl max-w-sm mx-auto w-full">
                <div className="bg-slate-800 rounded-[20px] overflow-hidden">
                  {/* Chat header */}
                  <div className="bg-violet-600 px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base">Hamro Assistant</div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-violet-200 text-[10px]">Online 24/7</span>
                      </div>
                    </div>
                  </div>
                  {/* Chat messages */}
                  <div className="p-4 space-y-3 bg-slate-900/50 min-h-[220px]">
                    {/* Customer message */}
                    <div className="flex justify-end">
                      <div className="bg-violet-600 text-white text-sm rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%] whitespace-pre-wrap">
                        {ai.mockup.user1}
                      </div>
                    </div>
                    {/* AI reply */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-violet-400" />
                      </div>
                      <div className="bg-white/10 text-white/90 text-base rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] whitespace-pre-wrap font-medium">
                        {ai.mockup.ai1}
                      </div>
                    </div>
                    {/* Customer */}
                    <div className="flex justify-end">
                      <div className="bg-violet-600 text-white text-base rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%] whitespace-pre-wrap font-bold shadow-lg">
                        {ai.mockup.user2}
                      </div>
                    </div>
                    {/* AI reply with Booking Slots */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-violet-400" />
                      </div>
                      <div className="space-y-3 flex-1 min-w-0">
                        <div className="bg-white/10 text-white/90 text-base rounded-2xl rounded-tl-sm px-4 py-3 whitespace-pre-wrap leading-relaxed font-medium">
                          {ai.mockup.ai2}
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {ai.mockup.slots.map((time: string) => (
                              <div key={time} className="bg-white/5 border border-white/10 rounded-lg py-1.5 px-2 text-center text-[10px] font-bold text-white/90 hover:bg-violet-500 transition-colors cursor-default">
                                {time}
                              </div>
                            ))}
                          </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white text-[10px] font-bold rounded-xl px-3 py-2 hover:bg-violet-500 transition-colors shadow-lg shadow-violet-500/20">
                          <CheckCircle className="w-3 h-3" /> {ai.mockup.cta}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Input bar */}
                  <div className="px-3 py-2 bg-slate-800 flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-xl px-3 py-1.5 text-[10px] text-white/30">Message…</div>
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat callout */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white/60 text-base leading-relaxed">{ai.stat}</p>
                </div>
              </div>

              {/* Tagline + CTA */}
              <div className="space-y-6">
                <div className="bg-violet-600/10 border border-violet-500/20 rounded-[28px] p-6 text-center md:text-left">
                  <p className="text-white font-black text-lg leading-tight">
                    {ai.tagline}
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <a
                    href="#waitlist"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-black text-base transition-all hover:scale-105 shadow-2xl shadow-violet-500/30"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                  >
                    <Bot className="w-5 h-5" />
                    {ai.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2 AM Customer Narrative */}
        {ai.twoAm && (
          <div className="mt-12 p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group max-w-4xl mx-auto">
            <div className="absolute top-0 right-0 p-6 opacity-20 transition-opacity group-hover:opacity-40">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h4 className="text-white text-xl font-black mb-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              {lang === 'ne' ? '२ बजेको ग्राहकको कथा' : '2 AM Customer Stories'}
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              {ai.twoAm.map((story: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <p className="text-white/70 text-base leading-relaxed">
                    {story}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Before Bed Checklist */}
        {ai.beforeBed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-3xl mx-auto p-10 rounded-[40px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
            
            <h3 className="text-3xl font-black text-white mb-8 relative z-10">{ai.beforeBed.heading}</h3>
            <div className="grid sm:grid-cols-2 gap-5 relative z-10">
              {ai.beforeBed.points.map((p: string, i: number) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                  className="flex items-center gap-4 text-white/80 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-base font-medium leading-snug">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── NEW: Transformation / Before-After Section ───────────────────────────────
function TransformationSection({ d, lang }: { d: any; lang: string }) {
  const t = d.transformation;
  if (!t) return null;
  const accents = [
    { light: "bg-blue-50 border-blue-200", metric: "bg-blue-600", dot: "bg-blue-500" },
    { light: "bg-amber-50 border-amber-200", metric: "bg-amber-600", dot: "bg-amber-500" },
    { light: "bg-emerald-50 border-emerald-200", metric: "bg-emerald-600", dot: "bg-emerald-500" },
  ];
  return (
    <section id="stories" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full text-green-600 text-base font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.heading}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.items.map((item: any, i: number) => {
            const acc = accents[i % accents.length];
            return (
              <motion.div
                key={item.business}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Metric banner */}
                <div className={`${acc.metric} px-5 py-3 flex items-center justify-between`}>
                  <span className="text-white text-sm font-semibold">{item.business}</span>
                  <span className="text-white font-black text-base">{item.metric}</span>
                </div>
                <div className="p-5 space-y-4">
                  {/* Before */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-sm font-bold text-red-500 uppercase tracking-wide">Before</span>
                    </div>
                    <p className="text-base text-gray-800 leading-relaxed">{item.before}</p>
                  </div>
                  <div className="border-t border-dashed border-gray-200" />
                  {/* After */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${acc.dot}`} />
                      <span className="text-sm font-bold text-green-600 uppercase tracking-wide">After HamroLink</span>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed font-medium">{item.after}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lost Client Story Narrative */}
        {t.lostClient && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white border border-gray-200 rounded-[40px] p-8 md:p-12 shadow-sm max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-6xl text-gray-50 font-black leading-none select-none">
              ?
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full text-red-500 text-sm font-bold uppercase tracking-tight">
                  {lang === 'ne' ? 'सावधानी' : 'Reality Check'}
                </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight italic">
                  "{t.lostClient.story}"
                </h3>
                <p className="text-gray-800 text-base leading-relaxed">
                  {t.lostClient.moral}
                </p>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <div className="text-4xl font-black text-red-500 mb-1">NPR 1,20,000</div>
                <div className="text-sm font-bold text-gray-700 uppercase tracking-widest">{lang === 'ne' ? 'गुमेको व्यवसाय' : 'Estimated Loss'}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── NEW: Objection Handling / FAQ Section ──────────────────────────────────
function ObjectionSection({ d }: { d: any }) {
  const obj = d.objections;
  if (!obj || !obj.questions) return null;
  const icons = [Clock, User, TrendingUp, Home];
  const keys = ['tooBusy', 'notTechSavvy', 'expensive', 'alreadyOnFacebook'];
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center mb-16 text-gray-900 leading-tight">
          Still thinking? <br className="md:hidden" />
          <span className="text-red-500">Wait.</span> We heard this before:
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
            {keys.map((key, i) => {
              const Icon = icons[i];
              const text = (obj as any)[key];
              const question = (obj.questions as any)[key];
              return (
                <motion.div 
                  key={key} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[32px] bg-indigo-50/30 border border-indigo-100 relative group hover:border-indigo-300 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-gray-950 text-lg">{question}</h3>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed italic font-medium">
                    "{text}"
                  </p>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

// ─── NEW: Exit Intent Overlay ────────────────────────────────────────────────
function ExitIntentOverlay({ d, visible, onClose }: { d: any; visible: boolean; onClose: () => void }) {
  const exit = d.exitIntent;
  
  if (!exit || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="bg-white rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl relative border border-gray-100"
        >
          <div className="p-6 md:p-8 text-center space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-gray-900 leading-tight">
                {exit.heading}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed max-w-[280px] mx-auto">
                {exit.subheading}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2.5 py-1 text-gray-700">
              <Clock className="w-3.5 h-3.5" />
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded text-gray-800">Remaining</span>
                <WaitlistCountdown />
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
              <button 
                onClick={onClose}
                className="text-gray-700 font-bold text-base hover:text-gray-600 transition-colors uppercase tracking-wider"
              >
                {exit.alternative}
              </button>
              <a 
                href="#waitlist" 
                onClick={onClose}
                className="text-blue-600 font-black text-base hover:text-blue-700 transition-all uppercase tracking-wider"
              >
                {exit.cta}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── NEW: Email Marketing Education Strip ─────────────────────────────────────
function EmailMarketingStrip({ d }: { d: any }) {
  const em = d.emailMarketing;
  if (!em) return null;
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-base font-semibold">
            <Mail className="w-4 h-4" />
            Coming Soon: Hamro Reach
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Stop begging for reach on Facebook.
          </h2>
          <p className="text-white/80 text-xl leading-relaxed font-medium">
            When you post on Facebook, only 2% of your followers see it. 
            With HamroLink's email engine, you own the list. 100% reach. 0% algorithms.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <p className="text-white/70 text-base leading-relaxed">
                <span className="text-white font-black">Build your own asset.</span> Every visitor becomes an email subscriber you can reach anytime for FREE.
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="text-white font-bold">Email Subscribers</span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-black rounded-full">LIVE GROWTH</span>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 ${i === 1 ? 'opacity-100 scale-100 shadow-xl border-indigo-500/30 bg-indigo-500/10' : 'opacity-40 scale-95'}`}>
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-24 bg-white/20 rounded" />
                    <div className="h-1.5 w-16 bg-white/10 rounded" />
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-900 to-transparent flex items-center justify-center pt-10 px-6 text-center">
              <p className="text-white text-sm font-bold bg-indigo-600 px-4 py-2 rounded-full shadow-xl">
                Automatic collection from your website
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Schema ───────────────────────────────────────────────────────────────────
// ─── Live Waitlist Countdown ──────────────────────────────────────────────────
function WaitlistCountdown() {
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

  useEffect(() => {
    // Target date: 10 days from March 15 (March 25, 2026)
    const target = new Date("2026-03-25T00:00:00").getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-2 items-center whitespace-nowrap">
      <div className="flex items-baseline gap-0.5">
        <span className="text-sm font-black text-gray-900">{timeLeft.d}</span>
        <span className="text-[8px] font-bold text-gray-700 uppercase">d</span>
      </div>
      <span className="text-sm font-black text-gray-200">:</span>
      <div className="flex items-baseline gap-0.5">
        <span className="text-sm font-black text-gray-900">{timeLeft.h.toString().padStart(2, '0')}</span>
        <span className="text-[8px] font-bold text-gray-700 uppercase">h</span>
      </div>
      <span className="text-sm font-black text-gray-200">:</span>
      <div className="flex items-baseline gap-0.5">
        <span className="text-sm font-black text-gray-900">{timeLeft.m.toString().padStart(2, '0')}</span>
        <span className="text-[8px] font-bold text-gray-700 uppercase">m</span>
      </div>
      <span className="text-sm font-black text-gray-200">:</span>
      <div className="flex items-baseline gap-0.5">
        <span className="text-sm font-black text-blue-600">{timeLeft.s.toString().padStart(2, '0')}</span>
        <span className="text-[8px] font-bold text-blue-400 uppercase">s</span>
      </div>
    </div>
  );
}

function HomeFAQSchema({ lang }: { lang: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lang === "ne"
      ? [
          { "@type": "Question", name: "के HamroLink नि:शुल्क छ?", acceptedAnswer: { "@type": "Answer", text: "हो। HamroLink मा सधैँका लागि नि:शुल्क योजना छ।" } },
          { "@type": "Question", name: "के eSewa वा Khalti बाट भुक्तानी लिन सकिन्छ?", acceptedAnswer: { "@type": "Answer", text: "हो। Starter र Pro योजनामा eSewa र Khalti भुक्तानी समावेश छ।" } },
          { "@type": "Question", name: "AI chatbot के हो?", acceptedAnswer: { "@type": "Answer", text: "तपाईंको website मा २४/७ ग्राहकको प्रश्नहरूको जवाफ दिने AI assistant।" } },
        ]
      : [
          { "@type": "Question", name: "Is HamroLink free?", acceptedAnswer: { "@type": "Answer", text: "Yes. HamroLink offers a free plan forever — no credit card required." } },
          { "@type": "Question", name: "Can I accept eSewa or Khalti payments?", acceptedAnswer: { "@type": "Answer", text: "Yes. eSewa and Khalti are built-in on Starter and Pro plans." } },
          { "@type": "Question", name: "What is the AI chatbot?", acceptedAnswer: { "@type": "Answer", text: "A 24/7 AI assistant on your website that answers customer questions automatically — prices, hours, location — and routes serious leads to your WhatsApp." } },
          { "@type": "Question", name: "Do I need coding knowledge?", acceptedAnswer: { "@type": "Answer", text: "No. HamroLink provides a visual editor and ready-made templates. You can go live in under 15 minutes." } },
        ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = React.use(params).lang ?? "en";
  const d = getDictionary(lang);

  const [idx, setIdx] = useState(0);
  const [bill, setBill] = useState<"monthly" | "yearly">("monthly");
  const [anim, setAnim] = useState(false);
  const [exitShow, setExitShow] = useState(false);
  const [exitFired, setExitFired] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const shown = localStorage.getItem("exit_intent_shown");
      const joined = localStorage.getItem("waitlist_joined");
      if (shown || joined) setExitFired(true);
    }
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitFired) {
        setExitShow(true);
        setExitFired(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("exit_intent_shown", "true");
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [exitFired]);

  const slide = SLIDES[idx];

  const goTo = (i: number) => {
    if (anim) return;
    setAnim(true);
    setTimeout(() => { setIdx(i); setAnim(false); }, 250);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => goTo((i + 1) % SLIDES.length), 5000);
  };

  useEffect(() => {
    timer.current = setInterval(() => setIdx((p) => (p + 1) % SLIDES.length), 5000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const hero = d.hero;
  const fu = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.4, delay },
  });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HomeFAQSchema lang={lang} />
      <Navbar accent={slide.accent} lang={lang} nav={d.nav} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "HamroLink",
            operatingSystem: "Web",
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "NPR" },
            publisher: { "@type": "Organization", name: "HamroLink", logo: { "@type": "ImageObject", url: "https://hamrolink.com/logo.png" } },
          }),
        }}
      />

      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${slide.grad} transition-all duration-1000`}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none" style={{ background: slide.glow }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ background: slide.accent }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div className="space-y-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-base font-semibold"
              >
                <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                {hero.badge}
              </motion.div>

              <div>
                <h1 className={`font-black tracking-tight ${lang === "ne" ? "text-5xl sm:text-6xl leading-[1.15] mb-2" : "text-5xl lg:text-6xl xl:text-7xl leading-[0.95]"}`}>
                  <motion.span initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="block">
                    {hero.line1}
                  </motion.span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                      className="block mt-1"
                      style={{ color: slide.accent }}
                    >
                      {hero.slideLabels[idx]}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="block mt-1">
                    {hero.line3}
                  </motion.span>
                </h1>
                {hero.generationalHook && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 text-white/90 text-base italic font-medium"
                  >
                    "{hero.generationalHook}"
                  </motion.div>
                )}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className={`text-white/95 max-w-lg leading-relaxed font-bold ${lang === "ne" ? "text-xl sm:text-2xl leading-loose" : "text-lg sm:text-xl"}`}
              >
                {hero.subtext}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="space-y-8">
                <div className="flex flex-wrap gap-4">
                  <a
                    href={ctaHref("/signup")}
                    className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white shadow-2xl transition-all hover:scale-105 hover:brightness-110"
                    style={{ background: slide.accent, boxShadow: `0 20px 50px ${slide.accent}55` }}
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {PRE_LAUNCH ? hero.ctaPrimary : ((hero as any).ctaPrimaryPostLaunch ?? hero.ctaPrimary)}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#examples"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                  >
                    {hero.ctaSecondary}
                  </a>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-5">
                    {hero.trust.map((t: string) => (
                      <div key={t} className="flex items-center gap-2 text-base text-white/90 font-bold">
                        <Check className="w-5 h-5 text-green-400 shrink-0 stroke-[3px]" />
                        {t}
                      </div>
                    ))}
                  </div>

                  {/* Fear callout box */}
                  <div className="p-5 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-md max-w-lg shadow-2xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                      <p className="text-white/80 text-base leading-relaxed">
                        {lang === "ne"
                          ? "तपाईंको प्रतिस्पर्धी अहिले पनि डिजिटल भइरहेको छ। पहिले लन्च गर्नेले अनलाइन ग्राहक जित्छन्।"
                          : "Your competitor is going digital right now. Whoever launches first wins the online customers."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Phone mockup */}
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: -5 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                style={{ perspective: "1200px" }}
                className="relative"
              >
                <div className="absolute -top-7 -left-10 z-20 bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl px-3.5 py-2.5 shadow-2xl hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: slide.accent }}>
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] text-white/55">{hero.floatingClicks}</div>
                    <div className="text-base font-black text-white">+127%</div>
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-8 z-20 bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl px-3.5 py-2.5 shadow-2xl hidden sm:flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
                  <div>
                    <div className="text-[9px] text-white/55">{hero.floatingSites}</div>
                    <div className="text-base font-black text-white">{PRE_LAUNCH ? "240+" : "5,000+"}</div>
                  </div>
                </div>

                <div className="relative w-[250px]" style={{ filter: "drop-shadow(0 55px 90px rgba(0,0,0,0.75))" }}>
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[44px] p-[9px] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <div className="absolute -left-[3px] top-20 w-[3px] h-7 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-32 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-48 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-gray-700 rounded-r-sm" />
                    <div className="bg-black rounded-[36px] overflow-hidden relative" style={{ height: 460 }}>
                      <div className="absolute top-0 inset-x-0 h-9 z-20 flex items-center justify-between px-5 pt-1.5">
                        <span className="text-[10px] text-white font-semibold">9:41</span>
                        <div className="absolute left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-[18px]" />
                        <div className="flex items-center gap-1">
                          <Signal className="w-3 h-3 text-white" />
                          <Wifi className="w-3 h-3 text-white" />
                          <Battery className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="absolute inset-0 top-9 overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={idx}
                            className="w-full h-full"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.35 }}
                          >
                            <slide.Screen />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Slide nav */}
              <div className="flex items-center gap-4">
                <button onClick={() => goTo((idx - 1 + SLIDES.length) % SLIDES.length)} className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {SLIDES.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === idx ? 32 : 6, background: i === idx ? slide.accent : "rgba(255,255,255,0.3)" }} />
                  ))}
                </div>
                <button onClick={() => goTo((idx + 1) % SLIDES.length)} className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {SLIDES.map((s, i) => (
                  <button key={i} onClick={() => goTo(i)} className="px-3 py-1.5 rounded-full text-sm font-semibold border transition-all hover:scale-105"
                    style={i === idx
                      ? { borderColor: s.accent, background: s.accent + "22", color: s.accent }
                      : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.38)" }
                    }
                  >
                    {hero.slideLabels[i]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ opacity: [0.3, 0.9, 0.3], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">{hero.scrollLabel}</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

      </section>

      <ProcessSection lang={lang} hero={hero} />

      {/* ══ DEMO VIDEO ══════════════════════════════════════════════════════ */}
      <DemoVideo d={d} />

      {/* ══ STATS ═══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-950 py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {(PRE_LAUNCH ? ((d as any).preLaunchStats ?? d.stats) : d.stats).map((s: any, i: number) => (
            <motion.div key={s.label} {...fu(i * 0.1)} className="text-center">
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-base text-white/35">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ THE PROBLEM (was "Who it's for") ════════════════════════════════ */}
      <TheProblemSection d={d} />

      {/* ══ WAITLIST ════════════════════════════════════════════════════════ */}
      <section id="waitlist" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle,#6366f1,transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fu()} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-50 rounded-full text-red-600 text-sm font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {d.waitlist.launchLabel}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {(d.waitlist as any).heading ?? "Don't let your\ncompetitor launch first."}
              </h2>
              <p className="text-gray-800 text-xl leading-relaxed font-medium max-w-md">
                {(d.waitlist as any).subheading ?? "240+ Nepali businesses have already claimed their spot."}
              </p>
              
              <div className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                      <User className="w-4.5 h-4.5" />
                    </div>
                  ))}
                </div>
                <p className="text-base text-gray-800 font-bold">
                  {((d.waitlist as any).limitedSpot || "").replace("{n}", "3")}
                </p>
              </div>
            </motion.div>

            <motion.div {...fu(0.15)} className="w-full max-w-lg mx-auto lg:ml-auto">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-6 md:p-10">
                <WaitlistForm d={d} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ MICRO PROOF ═════════════════════════════════════════════════════ */}
      <section id="examples" className="bg-white border-b border-gray-100 py-10">
        <motion.div {...fu()} className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
          <span className="text-base font-bold text-gray-700 shrink-0">{d.microProof.eyebrow}</span>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {d.microProof.domains.map((domain: string) => {
              const imgName = domain.split(".")[0];
              return (
                <Dialog key={domain}>
                  <DialogTrigger asChild>
                    <button className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-base font-mono text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-zoom-in">
                      <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 group-hover:scale-125 transition-transform" />
                      {domain}
                      <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden bg-slate-50 border-none shadow-2xl flex flex-col">
                    <DialogHeader className="p-4 bg-white border-b shrink-0">
                      <DialogTitle className="flex items-center gap-2 text-gray-900">
                        <Globe className="w-4 h-4 text-blue-500" />{domain}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                      <div className="max-w-4xl mx-auto bg-white rounded-t-xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/20" />
                          </div>
                          <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-gray-700 font-mono">https://{domain}</div>
                        </div>
                        <img src={`/${imgName}.png`} alt={`${domain} preview`} className="w-full h-auto block" loading="lazy" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
          <Link href={ctaHref("/signup")} className="shrink-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-xl transition-all hover:scale-105 whitespace-nowrap">
            {d.microProof.cta} →
          </Link>
        </motion.div>
      </section>

      {/* ══ AI STAFF (NEW) ══════════════════════════════════════════════════ */}
      <AIStaffSection d={d} lang={lang} />

      {/* ══ CAMPAIGN HIGHLIGHT (NEW) ═════════════════════════════════════════ */}
      {d.campaign && (
        <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                {d.campaign.name}
              </div>
              <h3 className="text-2xl font-black text-white">{d.campaign.hook}</h3>
            </div>
            <a href="#waitlist" className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-transform shrink-0">
              {d.campaign.cta}
            </a>
          </div>
        </section>
      )}

      {/* ══ TRANSFORMATION / BEFORE-AFTER (NEW) ════════════════════════════ */}
      <TransformationSection d={d} lang={lang} />

      {/* ══ EMAIL MARKETING STRIP (NEW) ═════════════════════════════════════ */}
      <EmailMarketingStrip d={d} />

      {/* ══ OBJECTION HANDLING (NEW) ═════════════════════════════════════════ */}
      <ObjectionSection d={d} />

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-950" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-base font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              {d.features.badge}
            </div>
            <h2 className="text-4xl font-black text-white mb-3 whitespace-pre-line">{d.features.heading}</h2>
            <p className="text-white/80 max-w-xl mx-auto text-lg font-medium">{d.features.subtext}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.features.items.map((item: any, i: number) => {
              const Icon = FEAT_ICONS[i % FEAT_ICONS.length];
              return (
                <motion.div
                  key={item.title}
                  {...fu(i * 0.06)}
                  className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${FEAT_GRADS[i % FEAT_GRADS.length]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1.5 text-lg">{item.title}</h3>
                  <p className="text-base text-white/70 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ TEMPLATES ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fu()} className="flex items-end justify-between mb-4 flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-base font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                {d.templates.badge}
              </div>
              <h2 className="text-4xl font-black text-white whitespace-pre-line">{d.templates.heading}</h2>
            </div>
            <Link href="#examples" className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-white text-base font-bold transition-colors">
              {d.templates.browseAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <p className="text-white/80 mb-10 text-lg font-medium">{d.templates.subtext}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t, i) => (
              <motion.div
                key={t.name}
                {...fu(i * 0.08)}
                className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                style={{ background: "#0d1117" }}
                whileHover={{ boxShadow: `0 30px 60px ${t.accent}25` }}
              >
                <BrowserFrame url={t.url} accent={t.accent}>{t.preview}</BrowserFrame>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 backdrop-blur-sm rounded-2xl">
                  <p className="text-white font-black text-base mb-1">{t.name}</p>
                  <p className="text-base mb-4" style={{ color: t.accent }}>{t.cat}</p>
                  <Link href="#waitlist" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-base font-bold hover:scale-105 transition-transform shadow-lg" style={{ background: t.accent }}>
                    {d.templates.hoverCta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-white text-base font-bold">{t.name}</p>
                    <p className="text-sm" style={{ color: t.accent }}>{t.cat}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full" style={{ background: t.accent }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXAMPLES ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" id="examples">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-base font-semibold mb-4">
              <Globe className="w-4 h-4" />
              {d.examples.badge}
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">{d.examples.heading}</h2>
            <p className="text-gray-700 max-w-xl mx-auto">{d.examples.subtext}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {d.examples.items.map((item: any, i: number) => (
              <motion.div
                key={item.name}
                {...fu(i * 0.1)}
                className="group rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-3xl mb-4">{item.emoji}</div>
                  <h3 className="font-black text-gray-900 text-base mb-1">{item.name}</h3>
                  <p className="text-base text-gray-800 leading-relaxed mb-4">{item.desc}</p>
                  {PRE_LAUNCH ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-mono text-gray-300 cursor-default select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      {item.url}
                    </span>
                  ) : (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-mono text-blue-500 hover:text-blue-700 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {item.url}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fu(0.2)} className="text-center">
            <p className="text-gray-800 mb-5 text-base">{d.examples.closing}</p>
            <Link href="#waitlist" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
              {d.examples.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ FOUNDER ═════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/90 text-base font-semibold mb-6">
              <Users className="w-4 h-4" />
              {d.founder.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-10 whitespace-pre-line">{d.founder.heading}</h2>
          </motion.div>

          <motion.div {...fu(0.15)} className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="absolute -top-5 left-10 text-7xl text-white/10 font-black leading-none select-none">"</div>
            <div className="space-y-5 mb-8">
              {d.founder.paragraphs.map((p: string, i: number) => (
                <p key={i} className={`leading-relaxed ${i === 0 ? "text-lg text-white/80" : "text-base text-white/55"}`}>{p}</p>
              ))}
            </div>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shrink-0">S</div>
              <div>
                <div className="text-white font-black">{d.founder.signature}</div>
                <div className="text-white/80 text-base">{d.founder.role}</div>
              </div>
              <Link href="#waitlist" className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 text-base font-black rounded-xl hover:scale-105 transition-transform shadow-lg shrink-0 hidden sm:flex">
                {d.founder.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PRICING ═════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full text-green-600 text-base font-semibold mb-4">
              <Check className="w-4 h-4" />
              {d.pricing.badge}
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-3 whitespace-pre-line">{d.pricing.heading}</h2>
            <div className="mb-6 px-4 py-2 bg-blue-50 border border-blue-100 rounded-2xl inline-block">
              <p className="text-blue-700 font-bold text-base tracking-tight">
                {(d.pricing as any).anchoring}
              </p>
            </div>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">{d.pricing.subtext}</p>
            <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl mb-8">
              {(["monthly", "yearly"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBill(b)}
                  className={`px-5 py-2 rounded-lg text-base font-bold transition-all flex items-center gap-2 ${bill === b ? "bg-white shadow text-gray-900" : "text-gray-700"}`}
                >
                  {b === "yearly" ? (
                    <>{d.pricing.yearly} <span className="px-1.5 py-0.5 bg-green-100 text-green-600 text-[9px] font-black rounded-full">{d.pricing.save}</span></>
                  ) : d.pricing.monthly}
                </button>
              ))}
            </div>

            {/* Price Metaphor Callout */}
            {d.pricing.priceMetaphor && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-md mx-auto mb-12 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center gap-3"
              >
                <Coffee className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-amber-800 text-base font-bold">
                  {bill === 'yearly' ? d.pricing.priceMetaphor.weekly : d.pricing.priceMetaphor.daily}
                </p>
              </motion.div>
            )}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {d.pricing.plans.slice(0, 3).map((plan: any, i: number) => {
              const prices = [
                { monthly: 0, yearly: 0 }, 
                { monthly: 399, yearly: 4213 }, 
                { monthly: 899, yearly: 9493 }
              ];
              const price = bill === "yearly" ? prices[i % prices.length].yearly : prices[i % prices.length].monthly;
              const Icon = PLAN_ICONS[i % PLAN_ICONS.length];
              const hot = i === 1;
              return (
                <motion.div
                  key={plan.name}
                  {...fu(i * 0.1)}
                  className={`relative rounded-3xl p-7 border-2 flex flex-col transition-all ${hot ? "border-blue-500 shadow-2xl shadow-blue-500/10 scale-[1.03]" : "border-gray-100 hover:shadow-xl hover:border-gray-200"}`}
                >
                  {hot && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 text-white text-sm font-black rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${PLAN_GRADS[i % PLAN_GRADS.length]} flex items-center justify-center shadow`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-lg">{plan.name}</div>
                      <div className="text-sm text-gray-700">{plan.desc}</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    {price === 0 ? (
                      <div className="text-4xl font-black text-gray-900">{d.pricing.free}</div>
                    ) : (
                      <div className="flex items-end gap-1">
                        <div className="text-4xl font-black text-gray-900">NPR {price.toLocaleString()}</div>
                        <div className="text-gray-700 text-base pb-1.5">{bill === "yearly" ? d.pricing.perYear : d.pricing.perMonth}</div>
                      </div>
                    )}
                    {bill === "yearly" && price > 0 && (
                      <p className="text-sm text-green-600 font-semibold mt-0.5">
                        {d.pricing.approxMonth.replace("{n}", Math.round(price / 12).toLocaleString())}
                      </p>
                    )}
                  </div>
                  <a
                    href={PRE_LAUNCH ? "#waitlist" : i === 0 ? ctaHref("/signup") : ctaHref("/signup?plan=" + plan.name.toLowerCase())}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-base font-black mb-6 transition-all ${hot ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl hover:scale-105" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                  >
                    {PRE_LAUNCH ? d.pricing.ctaFree : i === 0 ? d.pricing.ctaFree : d.pricing.ctaPaid}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <ul className="space-y-2.5 flex-1">
                    {plan.feats.map((f: any) => (
                      <li key={f.t} className={`flex items-start gap-2.5 text-base ${f.ok ? "text-gray-700" : "text-gray-300"}`}>
                        {f.ok ? <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-gray-200 shrink-0 mt-0.5" />}
                        {f.t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Local Starter for Home Page */}
          {d.pricing.plans[3] && (
            <motion.div
              {...fu()}
              className="relative rounded-3xl p-8 border-2 border-amber-100 bg-amber-50/10 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-xl"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow text-white">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-xl">{d.pricing.plans[3].name}</div>
                    <div className="text-base text-amber-700 font-medium tracking-tight">Special local business plan</div>
                  </div>
                </div>
                <p className="text-gray-800 mb-6 max-w-xl text-base leading-relaxed">{d.pricing.plans[3].desc}</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {d.pricing.plans[3].feats.slice(0, 4).map((f: any, fi: number) => (
                    <div key={fi} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                      <div className="p-0.5 rounded-full bg-amber-100 text-amber-600">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      {f.t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center md:text-right border-t md:border-t-0 md:border-l border-amber-100 pt-6 md:pt-0 md:pl-8">
                <div className="mb-4">
                  <div className="text-3xl font-black text-gray-900 leading-none">
                    NPR {bill === "yearly" ? 1990 : 199}
                  </div>
                  <div className="text-gray-700 text-sm font-bold mt-1 uppercase tracking-wider">
                    {bill === "yearly" ? d.pricing.perYear : d.pricing.perMonth}
                  </div>
                </div>
                <Link
                  href={PRE_LAUNCH ? "#waitlist" : ctaHref("/signup?plan=local_starter")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white font-black rounded-xl hover:scale-105 transition-transform shadow-lg"
                >
                  {d.pricing.ctaPaid}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          <p className="text-center text-base font-bold text-gray-700 mt-10">{d.pricing.footer}</p>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <motion.div className="absolute w-96 h-96 rounded-full blur-[120px] opacity-30 top-0 right-0" style={{ background: "#a78bfa" }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.94 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tighter">
            {d.cta.line1}
            <br />
            <span className="text-yellow-300">{d.cta.line2}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-bold">
            {d.cta.subtext}
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="#waitlist" className="flex items-center gap-2 px-10 py-5 bg-white text-indigo-700 rounded-2xl text-xl font-black hover:scale-105 transition-transform shadow-2xl">
              <Sparkles className="w-6 h-6" />
              {d.cta.primary}
            </Link>
          </div>
          <p className="text-white/60 text-base mt-10 font-bold uppercase tracking-widest">{d.cta.disclaimer}</p>
        </motion.div>
      </section>

      <Footer lang={lang} d={d} PRE_LAUNCH={PRE_LAUNCH} ctaHref={ctaHref} />
      <ExitIntentOverlay d={d} visible={exitShow} onClose={() => setExitShow(false)} />
    </div>
  );
}