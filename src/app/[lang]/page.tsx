// app/[lang]/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDictionary } from "@/lib/dictionaries";

// ─── Pre-launch flag — flip to false after go-live ────────────────────────────
const PRE_LAUNCH = true;

// ─── Scroll helper: every CTA scrolls to #waitlist during pre-launch ──────────
function ctaHref(href: string) {
  return PRE_LAUNCH ? "#waitlist" : href;
}

// ─── Waitlist form — sends via Amazon SES directly (no API route) ─────────────
//
// Add these to .env.local:
//   NEXT_PUBLIC_AWS_REGION=ap-south-1
//   NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxxxxx
//   NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
// IAM policy for that key (least-privilege):
//   { "Effect":"Allow", "Action":"ses:SendEmail",
//     "Resource":"*",
//     "Condition":{"StringEquals":{"ses:FromAddress":"noreply@hamrolink.com"}} }
//
// SES setup: verify noreply@hamrolink.com as a sender identity in your AWS console.
// Notification goes to hamrolink@gmail.com.

import { sendWaitlistSES } from "@/app/actions";

// ─── Business type options ────────────────────────────────────────────────────
const BUSINESS_TYPES = [
  { emoji: "🍛", label: "Restaurant / Café" },
  { emoji: "🛍", label: "Retail / Shop" },
  { emoji: "🎓", label: "School / Academy" },
  { emoji: "✈️", label: "Consultancy / Travel" },
  { emoji: "💼", label: "Professional / Freelance" },
  { emoji: "🏥", label: "Health / Clinic" },
  { emoji: "🏠", label: "Real Estate" },
  { emoji: "🎨", label: "Creative / Portfolio" },
  { emoji: "📦", label: "Other" },
];

// ─── WaitlistForm — zero animation, always visible ───────────────────────────
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
      if (typeof window !== "undefined") {
        localStorage.setItem("waitlist_joined", "true");
      }
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
          className="text-5xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          🎉
        </motion.div>
        <h3 className="text-2xl font-black text-gray-900 mb-2">
          {d.waitlist?.successTitle ?? "You're on the list!"}
        </h3>
        <p className="text-gray-500">
          {d.waitlist?.successText ??
            "We'll email you the moment HamroLink goes live."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
          Your name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Binod Shrestha"
            className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
          Email address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="you@example.com"
            disabled={status === "loading"}
            className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Business type */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
          Type of business
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {BUSINESS_TYPES.map((bt) => (
            <button
              key={bt.label}
              onClick={() =>
                setBusinessType(businessType === bt.label ? "" : bt.label)
              }
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border text-center transition-all text-xs font-medium ${
                businessType === bt.label
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
              }`}
            >
              <span className="text-base">{bt.emoji}</span>
              <span className="leading-tight">{bt.label.split(" / ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">
          {errMsg}
        </p>
      )}

      {/* Submit */}
      <button
        onClick={submit}
        disabled={status === "loading" || !email.trim()}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-black text-base transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          boxShadow: "0 12px 32px rgba(99,102,241,0.4)",
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
            Joining waitlist…
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />{" "}
            {d.waitlist?.cta ?? "Join the Waitlist"} →
          </>
        )}
      </button>
    </div>
  );
}

// ─── Demo video ───────────────────────────────────────────────────────────────
// Place your finished demo.mp4 at /public/demo.mp4 (≤ 1.5 MB, h.264, no audio)
function DemoVideo({ d }: { d: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [step, setStep] = useState(0);
  const steps: string[] = [...d.video.steps];
  // Cycle step label every 1.8 s to match a ~9-second video
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-4">
            <PlayCircle className="w-4 h-4" />
            {d.video.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {d.video.heading}
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">{d.video.subtext}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
        >
          {/* Fallback placeholder shown when video file doesn't exist yet */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <video
              ref={videoRef}
              src={d.video.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => {
                /* video not uploaded yet — placeholder shows */
              }}
            />
            {/* Step caption overlay */}
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
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-black flex items-center justify-center shrink-0">
                    {step + 1}
                  </span>
                  <span className="text-white font-semibold text-sm">
                    {steps[step]}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Clock className="w-3 h-3" />
                ~9s
              </div>
            </div>
          </div>

          {/* Final frame text bar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
            <p className="text-white font-black text-base">
              {d.video.finalFrame}
            </p>
            <a
              href="#waitlist"
              className="flex items-center gap-2 px-5 py-2 bg-white text-indigo-700 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              {d.video.cta}
            </a>
          </div>
        </motion.div>

        {/* Step dots */}
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

const APP = "https://app.hamrolink.com";

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
            <span key={t} className="text-[8px] text-gray-500 font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 pt-3 pb-2">
        <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-black text-lg border-2 border-orange-300 shadow-md shrink-0">
          S
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-black text-gray-900 text-[13px]">
              Sara Shrestha
            </span>
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center">
              <Check className="w-2 h-2 text-white" strokeWidth={3} />
            </div>
          </div>
          <p className="text-[9px] text-gray-500">Digital Creator · Vlogger</p>
          <span className="text-[8px] text-blue-500 font-medium">
            sara.hamrolink.com
          </span>
        </div>
      </div>
      <div className="mx-3 mb-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-200 rounded-xl p-2.5">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-900">
              Travel With Me
            </div>
            <div className="text-[8px] text-gray-500">Explore destinations</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[
            ["24", "Districts"],
            ["125", "Vlogs"],
            ["240k", "Views"],
          ].map(([v, l]) => (
            <div key={l} className="bg-white/70 rounded-lg py-1.5 text-center">
              <div className="text-[10px] font-black text-gray-900">{v}</div>
              <div className="text-[7px] text-gray-500">{l}</div>
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
        {[
          ["48", "Videos"],
          ["156", "Posts"],
          ["24", "Collabs"],
        ].map(([v, l]) => (
          <div key={l} className="text-center">
            <div className="text-[10px] font-black text-gray-900">{v}</div>
            <div className="text-[7px] text-gray-400">{l}</div>
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
        <span className="text-white font-black text-[12px]">
          🛍 Hamro Pasal
        </span>
        <div className="relative">
          <ShoppingCart className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full text-[6px] font-black text-gray-900 flex items-center justify-center">
            2
          </span>
        </div>
      </div>
      <div className="mx-3 my-2 bg-gray-100 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
        <svg
          className="w-3 h-3 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-[9px] text-gray-400">Search products…</span>
      </div>
      <div className="flex gap-1.5 px-3 mb-2">
        {["All", "Bags", "Shawls", "Crafts"].map((c, i) => (
          <span
            key={c}
            className={`px-2 py-0.5 rounded-full text-[8px] font-bold shrink-0 ${i === 0 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 flex-1">
        {[
          {
            n: "Handmade Bag",
            p: "Rs 1,200",
            e: "👜",
            tag: "Bestseller",
            tc: "bg-orange-500",
          },
          {
            n: "Pashmina Shawl",
            p: "Rs 2,500",
            e: "🧣",
            tag: "New",
            tc: "bg-blue-500",
          },
          {
            n: "Dhaka Fabric",
            p: "Rs 850",
            e: "🎀",
            tag: "Sale",
            tc: "bg-rose-500",
          },
          {
            n: "Clay Pot",
            p: "Rs 600",
            e: "🏺",
            tag: "Craft",
            tc: "bg-amber-500",
          },
        ].map((p) => (
          <div
            key={p.n}
            className="rounded-xl border border-orange-100 bg-orange-50 p-2"
          >
            <div className="text-2xl mb-1 text-center">{p.e}</div>
            <span
              className={`text-[7px] font-black px-1.5 py-0.5 rounded-full ${p.tc} text-white`}
            >
              {p.tag}
            </span>
            <div className="text-[9px] font-bold text-gray-900 mt-1 leading-tight">
              {p.n}
            </div>
            <div className="text-[10px] font-black text-orange-600">{p.p}</div>
            <button className="w-full mt-1 py-0.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-md text-[7px] font-bold">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-1.5 mb-2 flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2 py-1">
        <div className="w-4 h-4 rounded bg-green-600 flex items-center justify-center text-white font-black text-[7px]">
          E
        </div>
        <span className="text-[8px] text-green-700 font-semibold">
          eSewa & Khalti accepted
        </span>
      </div>
    </div>
  );
}

function SchoolScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-[10px] border border-white/30">
            VA
          </div>
          <div>
            <div className="text-white font-black text-[12px]">
              Valley Academy
            </div>
            <div className="text-emerald-100 text-[8px]">
              Est. 1995 · Kathmandu
            </div>
          </div>
        </div>
        <div className="bg-yellow-400 text-yellow-900 text-[8px] font-black px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          🎓 Admissions Open 2025–26
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-3 mt-2.5 mb-2">
        {[
          ["1,200", "Students"],
          ["98%", "Pass Rate"],
          ["30 yrs", "Experience"],
        ].map(([v, l]) => (
          <div
            key={l}
            className="bg-emerald-50 border border-emerald-100 rounded-xl py-2 text-center"
          >
            <div className="text-[11px] font-black text-emerald-700">{v}</div>
            <div className="text-[7px] text-gray-500">{l}</div>
          </div>
        ))}
      </div>
      <div className="px-3 mb-2 flex-1">
        {[
          ["📗", "Nursery – Grade 5", "Primary"],
          ["📘", "Grade 6 – 10", "Secondary"],
          ["📙", "Grade 11 – 12", "Higher Sec."],
        ].map(([e, n, d]) => (
          <div
            key={n}
            className="flex items-center gap-2 py-1.5 border-b border-gray-50"
          >
            <span className="text-sm">{e}</span>
            <div>
              <div className="text-[9px] font-bold text-gray-900">{n}</div>
              <div className="text-[7px] text-gray-400">{d}</div>
            </div>
            <ArrowRight className="w-3 h-3 text-gray-300 ml-auto" />
          </div>
        ))}
      </div>
      <div className="px-3 mt-auto mb-3">
        <button className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-[10px] font-black">
          Apply for Admission →
        </button>
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
          <span className="text-white font-black text-[12px]">
            Nepal Abroad
          </span>
        </div>
        <div className="text-violet-200 text-[8px] mb-2">
          abroad.hamrolink.com
        </div>
        <div className="text-white font-bold text-[11px] leading-snug">
          Study in UK, USA, Canada & Australia
        </div>
        <div className="flex gap-1 mt-2 text-lg">🇬🇧🇺🇸🇨🇦🇦🇺</div>
      </div>
      <div className="px-3 pt-2.5 space-y-1.5 flex-1">
        {[
          ["📋", "Visa Processing", "Expert guidance"],
          ["🎓", "University Match", "200+ universities"],
          ["💬", "Free Counseling", "Book today"],
        ].map(([e, t, d]) => (
          <div
            key={t}
            className="flex items-center gap-2 p-2 bg-violet-50 rounded-xl border border-violet-100"
          >
            <span className="text-lg">{e}</span>
            <div>
              <div className="text-[9px] font-bold text-gray-900">{t}</div>
              <div className="text-[7px] text-gray-500">{d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 mt-2 mb-3">
        <button className="w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-700 text-white rounded-xl text-[10px] font-black mb-1.5">
          Get Free Counseling →
        </button>
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[8px] text-gray-500">
            AI Chatbot available 24/7
          </span>
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
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl">
            🍲
          </div>
          <div>
            <div className="text-white font-black text-[13px]">
              Thakali Kitchen
            </div>
            <div className="text-amber-100 text-[8px]">
              Authentic Nepali Cuisine
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5 bg-amber-50 border-b border-amber-100">
        <div className="flex items-center gap-1 text-[8px] text-green-600 font-bold">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Open Now
        </div>
        <div className="flex items-center gap-0.5">
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          <span className="text-[8px] text-gray-600">4.9 (320)</span>
        </div>
      </div>
      <div className="px-3 pt-2 flex-1">
        {[
          ["🍛", "Dal Bhat Set", "Rs 350"],
          ["🥘", "Thakali Thali", "Rs 550"],
          ["🫕", "Gundruk Soup", "Rs 180"],
          ["🍜", "Sel Roti + Tea", "Rs 120"],
        ].map(([e, n, p]) => (
          <div
            key={n}
            className="flex items-center gap-2 py-1.5 border-b border-gray-50"
          >
            <span className="text-base">{e}</span>
            <span className="flex-1 text-[9px] font-bold text-gray-900">
              {n}
            </span>
            <span className="text-[10px] font-black text-amber-600">{p}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5 px-3 mt-2 mb-3">
        <button className="py-2 bg-amber-500 text-white rounded-xl text-[9px] font-black">
          📅 Reserve Table
        </button>
        <button className="py-2 border border-amber-400 text-amber-600 rounded-xl text-[9px] font-black">
          📋 Full Menu
        </button>
      </div>
    </div>
  );
}

// ─── Slide config ─────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "creator",
    accent: "#3B82F6",
    grad: "from-[#07102e] via-[#0c1c5e] to-[#130428]",
    glow: "#3B82F6",
    Screen: CreatorScreen,
  },
  {
    id: "shop",
    accent: "#F97316",
    grad: "from-[#1c0800] via-[#2d1200] to-[#1a0505]",
    glow: "#F97316",
    Screen: ShopScreen,
  },
  {
    id: "school",
    accent: "#10B981",
    grad: "from-[#001a0d] via-[#012e19] to-[#001220]",
    glow: "#10B981",
    Screen: SchoolScreen,
  },
  {
    id: "consultancy",
    accent: "#8B5CF6",
    grad: "from-[#0d0020] via-[#1a0038] to-[#080820]",
    glow: "#8B5CF6",
    Screen: ConsultancyScreen,
  },
  {
    id: "restaurant",
    accent: "#F59E0B",
    grad: "from-[#1c0e00] via-[#2d1800] to-[#1a0f00]",
    glow: "#F59E0B",
    Screen: RestaurantScreen,
  },
];
{
  [
    ["100+", "Menu Items"],
    ["50K+", "Happy Guests"],
    ["15+", "Years"],
    ["12", "Awards"],
  ].map(([v, l]) => (
    <div key={l} className="text-center">
      <div className="text-[9px] font-black text-orange-600">{v}</div>
      <div className="text-[6px] text-gray-400">{l}</div>
    </div>
  ));
}
<div>
  {/* Chef's Specials */}
  <div className="px-2.5 pt-2">
    <div className="text-[8px] font-black text-gray-700 mb-1.5">
      Chef's Specialties
    </div>
    <div className="grid grid-cols-2 gap-1.5">
      {[
        { e: "🍲", n: "Jhal Momo", p: "Rs 280", tag: "Bestseller" },
        { e: "🥘", n: "Khana Set", p: "Rs 450", tag: "Chef's Pick" },
        { e: "🍛", n: "Dal Bhat", p: "Rs 320", tag: "Traditional" },
        { e: "🍜", n: "Sel Roti", p: "Rs 150", tag: "Popular" },
      ].map((i) => (
        <div
          key={i.n}
          className="bg-orange-50 border border-orange-100 rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-orange-200 to-red-100 h-10 flex items-center justify-center text-xl">
            {i.e}
          </div>
          <div className="p-1.5">
            <div className="text-[8px] font-black text-gray-900">{i.n}</div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[8px] font-black text-orange-600">
                {i.p}
              </span>
              <span className="text-[6px] bg-orange-500 text-white px-1 rounded-full font-bold">
                {i.tag}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>;

// ─── Template data ────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    name: "Everest Portfolio",
    cat: "Portfolio",
    accent: "#3b82f6",
    url: "sara.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-[8px]">
              S
            </div>
            <span className="text-white font-bold text-[10px]">Sara.dev</span>
          </div>
          <div className="flex gap-3">
            {["Work", "About", "Blog", "Contact"].map((t) => (
              <span key={t} className="text-[8px] text-white/50">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 px-4">
          <div className="flex-1">
            <div className="text-[8px] text-blue-400 font-bold mb-1 uppercase tracking-widest">
              UI/UX Designer
            </div>
            <h2 className="text-white font-black text-base leading-tight mb-2">
              Crafting digital
              <br />
              experiences 🎨
            </h2>
            <p className="text-[8px] text-white/50 mb-3 leading-relaxed">
              Based in Kathmandu.
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-[8px] font-bold">
                View Work
              </button>
              <button className="px-3 py-1.5 border border-white/20 text-white/70 rounded-lg text-[8px]">
                Contact
              </button>
            </div>
          </div>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shrink-0">
            S
          </div>
        </div>
        <div className="px-4 pb-2 grid grid-cols-3 gap-1.5">
          {["🎨 Branding", "💻 Web Dev", "📱 Mobile"].map((s) => (
            <div
              key={s}
              className="py-1.5 bg-white/5 rounded-lg text-center text-[7px] text-white/60 border border-white/5"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Bazaar Commerce",
    cat: "E-Commerce",
    accent: "#f97316",
    url: "bazaar.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-2 flex items-center justify-between">
          <span className="text-white font-black text-[11px]">
            🛍 Bazaar Store
          </span>
          <div className="relative">
            <ShoppingCart className="w-4 h-4 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full text-[6px] font-black text-gray-900 flex items-center justify-center">
              3
            </span>
          </div>
        </div>
        <div className="flex gap-1.5 px-3 py-1.5 border-b text-[8px] text-gray-500">
          {["All", "Bags", "Shawls", "Pottery"].map((c, i) => (
            <span
              key={c}
              className={`shrink-0 px-1.5 py-0.5 rounded-full ${i === 0 ? "bg-orange-100 text-orange-600 font-bold" : ""}`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-3 gap-1.5 p-2">
          {[
            { e: "👜", n: "Bag", p: "Rs 1,200" },
            { e: "🧣", n: "Shawl", p: "Rs 2,500" },
            { e: "🏺", n: "Pot", p: "Rs 800" },
          ].map((item) => (
            <div
              key={item.n}
              className="rounded-lg border border-orange-100 bg-orange-50/50 p-1.5 flex flex-col items-center"
            >
              <span className="text-xl mb-0.5">{item.e}</span>
              <div className="text-[8px] font-bold text-gray-800 text-center">
                {item.n}
              </div>
              <div className="text-[8px] font-black text-orange-600">
                {item.p}
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 pb-1.5 flex items-center gap-1.5 bg-green-50 mx-2 rounded-lg py-1 border border-green-100 mb-1">
          <div className="w-3 h-3 rounded bg-green-600 flex items-center justify-center text-white font-black text-[6px]">
            E
          </div>
          <div className="w-3 h-3 rounded bg-purple-600 flex items-center justify-center text-white font-black text-[6px]">
            K
          </div>
          <span className="text-[7px] text-green-700 font-semibold">
            eSewa & Khalti
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "Scholar Academy",
    cat: "Education",
    accent: "#10b981",
    url: "valley.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2.5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-black text-[9px]">
            VA
          </div>
          <div>
            <div className="text-white font-black text-[11px]">
              Valley Academy
            </div>
            <div className="text-emerald-100 text-[7px]">
              Est. 1995 · Kathmandu
            </div>
          </div>
          <div className="ml-auto bg-yellow-400 text-yellow-900 text-[7px] font-black px-1.5 py-0.5 rounded-full">
            Open
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-2.5 pt-2">
          {[
            ["1,200", "Students"],
            ["98%", "Pass"],
            ["30", "Years"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="bg-emerald-50 border border-emerald-100 rounded-lg py-1.5 text-center"
            >
              <div className="text-[10px] font-black text-emerald-700">{v}</div>
              <div className="text-[7px] text-gray-500">{l}</div>
            </div>
          ))}
        </div>
        <div className="px-2.5 mt-2 flex-1 space-y-1">
          {[
            ["📗", "Primary (Nur–5)"],
            ["📘", "Secondary (6–10)"],
            ["📙", "Higher Sec (11–12)"],
          ].map(([e, n]) => (
            <div
              key={n}
              className="flex items-center gap-1.5 px-2 py-1.5 bg-emerald-50 rounded-lg"
            >
              <span>{e}</span>
              <span className="text-[8px] font-semibold text-gray-800">
                {n}
              </span>
            </div>
          ))}
        </div>
        <div className="px-2.5 pb-2 mt-1">
          <button className="w-full py-1.5 bg-emerald-600 text-white rounded-lg text-[8px] font-black">
            Apply Now →
          </button>
        </div>
      </div>
    ),
  },
  {
    name: "Voyage Consultancy",
    cat: "Consultancy",
    accent: "#8b5cf6",
    url: "abroad.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-br from-violet-700 to-indigo-800 px-3 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-3 h-3 text-violet-300" />
            <span className="text-white font-black text-[12px]">
              Nepal Abroad
            </span>
          </div>
          <div className="text-white font-bold text-[10px]">
            UK · USA · Canada · Australia
          </div>
          <div className="text-lg mt-1">🇬🇧🇺🇸🇨🇦🇦🇺</div>
        </div>
        <div className="flex-1 px-2.5 pt-2 space-y-1.5">
          {[
            ["📋", "Visa Processing"],
            ["🎓", "University Match"],
            ["💬", "Free Counseling"],
          ].map(([e, t]) => (
            <div
              key={t}
              className="flex items-center gap-2 p-1.5 bg-violet-50 rounded-lg border border-violet-100"
            >
              <span>{e}</span>
              <span className="text-[8px] font-bold text-gray-800">{t}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 pt-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[7px] text-gray-500">AI Chatbot 24/7</span>
          </div>
        </div>
        <div className="px-2.5 pb-2">
          <button className="w-full py-1.5 bg-violet-600 text-white rounded-lg text-[8px] font-black">
            Book Free Session →
          </button>
        </div>
      </div>
    ),
  },
  {
    name: "Thakali Kitchen",
    cat: "Restaurant",
    accent: "#f59e0b",
    url: "thakali.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2 flex items-center gap-2">
          <span className="text-2xl">🍲</span>
          <div>
            <div className="text-white font-black text-[11px]">
              Thakali Kitchen
            </div>
            <div className="text-amber-100 text-[7px]">
              Authentic Nepali Cuisine
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 py-1 bg-amber-50 border-b border-amber-100">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-[7px] text-green-600 font-bold">Open</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
            <span className="text-[7px] text-gray-600">4.9</span>
          </div>
        </div>
        <div className="flex-1 px-2.5 pt-1.5">
          {[
            ["🍛", "Dal Bhat", "Rs 350"],
            ["🥘", "Thali", "Rs 550"],
            ["🫕", "Gundruk", "Rs 180"],
            ["🍜", "Sel Roti", "Rs 120"],
          ].map(([e, n, p]) => (
            <div
              key={n}
              className="flex items-center gap-1.5 border-b border-gray-50 py-1"
            >
              <span>{e}</span>
              <span className="flex-1 text-[8px] font-semibold text-gray-800">
                {n}
              </span>
              <span className="text-[8px] font-black text-amber-600">{p}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1 px-2.5 pb-2 mt-1">
          <button className="py-1.5 bg-amber-500 text-white rounded-lg text-[8px] font-black">
            📅 Reserve
          </button>
          <button className="py-1.5 border border-amber-400 text-amber-600 rounded-lg text-[8px] font-black">
            📋 Menu
          </button>
        </div>
      </div>
    ),
  },
  {
    name: "Nova Startup",
    cat: "Business",
    accent: "#ec4899",
    url: "nova.hamrolink.com",
    preview: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-gradient-to-br from-pink-600 via-rose-600 to-orange-500 px-3 py-3 text-center">
          <div className="text-white font-black text-[13px] mb-0.5">
            🚀 Nova Tech
          </div>
          <div className="text-pink-100 text-[8px] mb-2">
            Building Nepal's digital future
          </div>
          <button className="px-3 py-1 bg-white text-pink-600 rounded-full text-[8px] font-black">
            Get Early Access
          </button>
        </div>
        <div className="flex-1 px-2.5 pt-2">
          {[
            ["💡", "SaaS Products"],
            ["📱", "Mobile Apps"],
            ["🌐", "Web Platforms"],
          ].map(([e, t]) => (
            <div
              key={t}
              className="flex items-center gap-2 py-1.5 border-b border-gray-50"
            >
              <span>{e}</span>
              <span className="text-[8px] font-medium text-gray-700">{t}</span>
            </div>
          ))}
        </div>
        <div className="px-2.5 pb-2">
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {[
              ["24", "Projects"],
              ["5K+", "Users"],
              ["99%", "Uptime"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="bg-pink-50 rounded-lg py-1 text-center border border-pink-100"
              >
                <div className="text-[9px] font-black text-pink-600">{v}</div>
                <div className="text-[7px] text-gray-400">{l}</div>
              </div>
            ))}
          </div>
          <button className="w-full py-1.5 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-lg text-[8px] font-black">
            Partner With Us
          </button>
        </div>
      </div>
    ),
  },
];

const FEAT_ICONS = [
  Globe,
  ShoppingBag,
  GraduationCap,
  Users,
  MessageSquare,
  QrCode,
  BarChart3,
  Code2,
];
const FEAT_GRADS = [
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
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

// ─── Browser frame wrapper ────────────────────────────────────────────────────
function BrowserFrame({
  url,
  children,
  accent,
}: {
  url: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="bg-gray-900 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 bg-gray-700/60 rounded-md px-2.5 py-1 flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: accent }}
          />
          <span className="text-[9px] text-gray-300 truncate">{url}</span>
        </div>
        <div className="w-3 h-3 rounded-sm border border-gray-600" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}

// ─── Language switcher ────────────────────────────────────────────────────────
function LangSwitcher({
  lang,
  accent,
  scrolled = false,
}: {
  lang: string;
  accent: string;
  scrolled?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1 rounded-lg p-1 ${scrolled ? "bg-gray-100" : "bg-white/10"}`}
    >
      {(["en", "ne"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
            lang === l
              ? "text-white"
              : scrolled
                ? "text-gray-500 hover:text-gray-800"
                : "text-white/60 hover:text-white"
          }`}
          style={lang === l ? { background: accent } : {}}
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
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${sc ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className={`font-black flex items-center text-xl tracking-tight transition-colors duration-500 ${sc ? "text-gray-900" : "text-white"}`}
        >
          <img src="/logo.png" className="w-8 h-8 mr-2" alt="" />
          Hamro<span style={{ color: accent }}>Link</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[
            [PRE_LAUNCH ? "#examples" : "/templates", nav.templates],
            [PRE_LAUNCH ? "#features" : "#features", nav.features],
            ["#pricing", nav.pricing],
            ["/docs", nav.docs],
            [`/${lang}/contact`, nav.contact],
          ].map(([href, label]) =>
            href.startsWith("http") ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors ${sc ? "text-gray-600 hover:text-gray-900" : "text-white/70 hover:text-white"}`}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className={`text-sm font-medium transition-colors ${sc ? "text-gray-600 hover:text-gray-900" : "text-white/70 hover:text-white"}`}
              >
                {label}
              </Link>
            ),
          )}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher lang={lang} accent={accent} scrolled={sc} />
          <a
            href={ctaHref("/signup")}
            className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
            style={{ background: accent }}
          >
            <Sparkles className="w-3.5 h-3.5" />{" "}
            {PRE_LAUNCH ? nav.cta : (nav.ctaPostLaunch ?? nav.cta)}
          </a>
        </div>
        <button
          onClick={() => setOpen((p) => !p)}
          className={`md:hidden p-2 ${sc ? "text-gray-700" : "text-white"}`}
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
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2"
          >
            <div className="pb-2">
              <LangSwitcher lang={lang} accent={accent} scrolled={true} />
            </div>
            {[
              [PRE_LAUNCH ? "#examples" : "/templates", nav.templates],
              [PRE_LAUNCH ? "#features" : "#features", nav.features],
              ["#pricing", nav.pricing],
              ["/docs", nav.docs],
              [`/${lang}/contact`, nav.contact],
            ].map(([href, label]) =>
              href.startsWith("http") ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-gray-700"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-gray-700"
                >
                  {label}
                </Link>
              ),
            )}
            <div className="pt-2 border-t border-gray-100">
              <a
                href={ctaHref("/signup")}
                className="block py-2.5 text-center text-white rounded-xl text-sm font-bold"
                style={{ background: accent }}
                onClick={() => setOpen(false)}
              >
                {nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = React.use(params).lang ?? "en";
  const d = getDictionary(lang);

  const [idx, setIdx] = useState(0);
  const [bill, setBill] = useState<"monthly" | "yearly">("monthly");
  const [anim, setAnim] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = SLIDES[idx];

  const goTo = (i: number) => {
    if (anim) return;
    setAnim(true);
    setTimeout(() => {
      setIdx(i);
      setAnim(false);
    }, 250);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => goTo((i + 1) % SLIDES.length), 5000);
  };

  useEffect(() => {
    timer.current = setInterval(
      () => setIdx((p) => (p + 1) % SLIDES.length),
      5000,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const hero = d.hero;
  const fu = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar accent={slide.accent} lang={lang} nav={d.nav} />

      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${slide.grad} transition-all duration-1000`}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{ background: slide.glow }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[80px] opacity-10 pointer-events-none"
          style={{ background: slide.accent }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, delay: 1.5 }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* ── Left: Copy + Form ── */}
            <div className="space-y-8 text-white">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-semibold"
              >
                <motion.span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: slide.accent }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {hero.badge}
              </motion.div>

              {/* Headline */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`font-black tracking-tight ${lang === "ne" ? "text-4xl sm:text-5xl leading-snug" : "text-5xl lg:text-6xl xl:text-7xl leading-[0.95]"}`}
                >
                  {hero.line1}
                </motion.h1>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className={`font-black tracking-tight mt-1 ${lang === "ne" ? "text-4xl sm:text-5xl leading-snug" : "text-5xl lg:text-6xl xl:text-7xl leading-[0.95]"}`}
                    style={{ color: slide.accent }}
                  >
                    {hero.slideLabels[idx]}
                  </motion.h1>
                </AnimatePresence>
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className={`font-black tracking-tight mt-1 ${lang === "ne" ? "text-4xl sm:text-5xl leading-snug" : "text-5xl lg:text-6xl xl:text-7xl leading-[0.95]"}`}
                >
                  {hero.line3}
                </motion.h1>
              </div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className={`text-white/65 max-w-lg leading-relaxed ${lang === "ne" ? "text-base leading-loose" : "text-lg"}`}
              >
                {hero.subtext}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={ctaHref("/signup")}
                  className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white shadow-2xl transition-all hover:scale-105 hover:brightness-110"
                  style={{
                    background: slide.accent,
                    boxShadow: `0 20px 50px ${slide.accent}55`,
                  }}
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  {PRE_LAUNCH
                    ? hero.ctaPrimary
                    : ((hero as any).ctaPrimaryPostLaunch ?? hero.ctaPrimary)}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#examples"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  {hero.ctaSecondary}
                </a>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-5"
              >
                {hero.trust.map((t: string) => (
                  <div
                    key={t}
                    className="flex items-center gap-1.5 text-sm text-white/50"
                  >
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    {t}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Phone mockup ── */}
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: -5 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                style={{ perspective: "1200px" }}
                className="relative"
              >
                {/* Floating badge top-left */}
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-7 -left-10 z-20 bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl px-3.5 py-2.5 shadow-2xl hidden sm:flex items-center gap-2"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: slide.accent }}
                  >
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] text-white/55">
                      {hero.floatingClicks}
                    </div>
                    <div className="text-sm font-black text-white">+127%</div>
                  </div>
                </motion.div>

                {/* Floating badge bottom-right */}
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-5 -right-8 z-20 bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl px-3.5 py-2.5 shadow-2xl hidden sm:flex items-center gap-2"
                >
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div>
                    <div className="text-[9px] text-white/55">
                      {hero.floatingSites}
                    </div>
                    <div className="text-sm font-black text-white">
                      {PRE_LAUNCH ? "240+" : "5,000+"}
                    </div>
                  </div>
                </motion.div>

                {/* Phone shell */}
                <div
                  className="relative w-[250px]"
                  style={{
                    filter: "drop-shadow(0 55px 90px rgba(0,0,0,0.75))",
                  }}
                >
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[44px] p-[9px] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <div className="absolute -left-[3px] top-20 w-[3px] h-7 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-32 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-48 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-gray-700 rounded-r-sm" />
                    <div
                      className="bg-black rounded-[36px] overflow-hidden relative"
                      style={{ height: 460 }}
                    >
                      {/* Status bar */}
                      <div className="absolute top-0 inset-x-0 h-9 z-20 flex items-center justify-between px-5 pt-1.5">
                        <span className="text-[10px] text-white font-semibold">
                          9:41
                        </span>
                        <div className="absolute left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-[18px]" />
                        <div className="flex items-center gap-1">
                          <Signal className="w-3 h-3 text-white" />
                          <Wifi className="w-3 h-3 text-white" />
                          <Battery className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      {/* Screen */}
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
                <button
                  onClick={() =>
                    goTo((idx - 1 + SLIDES.length) % SLIDES.length)
                  }
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-8" : "w-1.5 opacity-30"}`}
                      style={{ background: i === idx ? slide.accent : "white" }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo((idx + 1) % SLIDES.length)}
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide labels */}
              <div className="flex flex-wrap gap-2 justify-center">
                {SLIDES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                    style={
                      i === idx
                        ? {
                            borderColor: s.accent,
                            background: s.accent + "22",
                            color: s.accent,
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.38)",
                          }
                    }
                  >
                    {hero.slideLabels[i]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: [0.3, 0.9, 0.3], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">
            {hero.scrollLabel}
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ══ DEMO VIDEO ═════════════════════════════════════════════════════ */}
      <DemoVideo d={d} />

      {/* ══ WAITLIST ════════════════════════════════════════════════════════ */}
      <section
        id="waitlist"
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Colour blobs */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle,#6366f1,transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle,#3b82f6,transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — social proof + perks */}
            <motion.div {...fu()}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 rounded-full text-indigo-600 text-xs font-bold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                {d.waitlist.launchLabel}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
                {(d.waitlist as any).heading ??
                  "Be the first to\nlaunch on HamroLink."}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {(d.waitlist as any).subheading ??
                  "Join thousands of Nepali businesses getting early access. We'll notify you the moment we go live."}
              </p>

              {/* Perks list */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: "🎁",
                    title:
                      (d.waitlist as any).perk1Title ??
                      "Free 15-day Starter trial",
                    desc:
                      (d.waitlist as any).perk1Desc ??
                      "Early signups get the Starter plan free for 15 days after launch.",
                  },
                  {
                    icon: "⚡",
                    title:
                      (d.waitlist as any).perk2Title ?? "Priority onboarding",
                    desc:
                      (d.waitlist as any).perk2Desc ??
                      "Skip the queue — we'll set up your site personally.",
                  },
                  {
                    icon: "🔒",
                    title:
                      (d.waitlist as any).perk3Title ?? "Locked-in early price",
                    desc:
                      (d.waitlist as any).perk3Desc ??
                      "Your plan price is frozen at launch pricing, forever.",
                  },
                ].map((p) => (
                  <div key={p.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {p.title}
                      </div>
                      <div className="text-gray-500 text-sm leading-relaxed">
                        {p.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["🧑‍💼", "👩‍🍳", "👨‍💻", "👩‍🏫", "🧑‍🎨"].map((e, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm"
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-black text-gray-900">240+</span>{" "}
                  {(d.waitlist as any).socialProof ??
                    "businesses already on the waitlist"}
                </p>
              </div>
            </motion.div>

            {/* Right — form card */}
            <motion.div {...fu(0.15)}>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-indigo-500/10 p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 mb-1">
                    {(d.waitlist as any).formTitle ?? "Reserve your spot"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {(d.waitlist as any).formSub ??
                      "Takes 10 seconds. No credit card needed."}
                  </p>
                </div>

                <WaitlistForm d={d} />

                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-4">
                  {[
                    {
                      icon: "🔒",
                      text: (d.waitlist as any).trust1 ?? "No spam, ever",
                    },
                    {
                      icon: "✅",
                      text: (d.waitlist as any).trust2 ?? "Unsubscribe anytime",
                    },
                    {
                      icon: "🇳🇵",
                      text: (d.waitlist as any).trust3 ?? "Made for Nepal",
                    },
                  ].map((t) => (
                    <div key={t.text} className="flex items-center gap-1.5">
                      <span className="text-sm">{t.icon}</span>
                      <span className="text-xs text-gray-400 font-medium">
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini testimonial under form */}
              <div className="mt-4 p-4 bg-indigo-50 rounded-2xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm shrink-0">
                  👩‍💼
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">
                    {(d.waitlist as any).quote ??
                      '"I\'ve been waiting for something like this — finally a website builder that understands Nepal."'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {(d.waitlist as any).quoteAuthor ??
                      "Sita K., Restaurant owner, Pokhara"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section
        id="examples"
        className="bg-white border-b border-gray-100 py-10"
      >
        <motion.div
          {...fu()}
          className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left"
        >
          <span className="text-sm font-bold text-gray-400 shrink-0">
            {lang === "ne" ? "वेबसाइटका उदाहरणहरू →" : d.microProof.eyebrow}
          </span>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {d.microProof.domains.map((domain: string) => {
              const imgName = domain.split(".")[0]; // "hamrostore", etc
              return (
                <Dialog key={domain}>
                  <DialogTrigger asChild>
                    <button className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-zoom-in">
                      <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 group-hover:scale-125 transition-transform" />
                      {domain}
                      <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden bg-slate-50 border-none shadow-2xl flex flex-col">
                    <DialogHeader className="p-4 bg-white border-b shrink-0">
                      <DialogTitle className="flex items-center gap-2 text-gray-900">
                        <Globe className="w-4 h-4 text-blue-500" />
                        {domain}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                      <div className="max-w-4xl mx-auto bg-white rounded-t-xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Browser-like header */}
                        <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/20" />
                          </div>
                          <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 font-mono">
                            https://{domain}
                          </div>
                        </div>
                        {/* The full-page screenshot */}
                        <img
                          src={`/${imgName}.png`}
                          alt={`${domain} preview`}
                          className="w-full h-auto block"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
          <Link
            href={ctaHref("/signup")}
            className="shrink-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 whitespace-nowrap"
          >
            {d.microProof.cta} →
          </Link>
        </motion.div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-950 py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {(PRE_LAUNCH ? ((d as any).preLaunchStats ?? d.stats) : d.stats).map(
            (s: any, i: number) => (
              <motion.div
                key={s.label}
                {...fu(i * 0.1)}
                className="text-center"
              >
                <div className="text-3xl font-black text-white mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-white/35">{s.label}</div>
              </motion.div>
            ),
          )}
        </div>
      </section>

      {/* ══ WHO IT'S FOR ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4" />
              {d.who.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight whitespace-pre-line mb-4">
              {d.who.heading}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base">
              {d.who.subtext}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                border: "border-orange-200 hover:border-orange-400",
                bg: "bg-orange-50",
                tc: "text-orange-600",
              },
              {
                border: "border-emerald-200 hover:border-emerald-400",
                bg: "bg-emerald-50",
                tc: "text-emerald-600",
              },
              {
                border: "border-violet-200 hover:border-violet-400",
                bg: "bg-violet-50",
                tc: "text-violet-600",
              },
              {
                border: "border-blue-200 hover:border-blue-400",
                bg: "bg-blue-50",
                tc: "text-blue-600",
              },
            ].map((style, i) => {
              const card = d.who.cards[i];
              return (
                <motion.div
                  key={card.title}
                  {...fu(i * 0.1)}
                  className={`rounded-2xl p-6 border-2 ${style.border} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center text-2xl mb-4`}
                  >
                    {card.emoji}
                  </div>
                  <p
                    className={`text-xs font-bold uppercase tracking-wide ${style.tc} mb-1`}
                  >
                    {card.label}
                  </p>
                  <h3 className="font-black text-gray-900 text-lg mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-950" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              {d.features.badge}
            </div>
            <h2 className="text-4xl font-black text-white mb-3">
              {d.features.heading}
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              {d.features.subtext}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.features.items.map((item: any, i: number) => {
              const Icon = FEAT_ICONS[i];
              return (
                <motion.div
                  key={item.title}
                  {...fu(i * 0.06)}
                  className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${FEAT_GRADS[i]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ TEMPLATES ════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fu()}
            className="flex items-end justify-between mb-4 flex-wrap gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                {d.templates.badge}
              </div>
              <h2 className="text-4xl font-black text-white whitespace-pre-line">
                {d.templates.heading}
              </h2>
            </div>
            <Link
              href="#"
              className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-white text-sm font-bold transition-colors"
            >
              {d.templates.browseAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <p className="text-white/40 mb-10">{d.templates.subtext}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t, i) => (
              <motion.div
                key={t.name}
                {...fu(i * 0.08)}
                className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                style={{ background: "#0d1117" }}
                whileHover={{ boxShadow: `0 30px 60px ${t.accent}25` }}
              >
                <BrowserFrame url={t.url} accent={t.accent}>
                  {t.preview}
                </BrowserFrame>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 backdrop-blur-sm rounded-2xl">
                  <p className="text-white font-black text-base mb-1">
                    {t.name}
                  </p>
                  <p className="text-sm mb-4" style={{ color: t.accent }}>
                    {t.cat}
                  </p>
                  <Link
                    href="#waitlist"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:scale-105 transition-transform shadow-lg"
                    style={{ background: t.accent }}
                  >
                    {d.templates.hoverCta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-xs" style={{ color: t.accent }}>
                      {t.cat}
                    </p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: t.accent }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXAMPLES ═════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" id="examples">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" />
              {d.examples.badge}
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              {d.examples.heading}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {d.examples.subtext}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {d.examples.items.map((item: any, i: number) => (
              <motion.div
                key={item.name}
                {...fu(i * 0.1)}
                className="group rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </div>
                  <h3 className="font-black text-gray-900 text-base mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  {PRE_LAUNCH ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 cursor-default select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      {item.url}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {item.url}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fu(0.2)} className="text-center">
            <p className="text-gray-500 mb-5 text-base">{d.examples.closing}</p>
            <Link
              href="#waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-5 h-5" />
              {d.examples.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ FOUNDER ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/50 text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              {d.founder.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-10">
              {d.founder.heading}
            </h2>
          </motion.div>

          <motion.div
            {...fu(0.15)}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            {/* Decorative quote mark */}
            <div className="absolute -top-5 left-10 text-7xl text-white/10 font-black leading-none select-none">
              "
            </div>

            <div className="space-y-5 mb-8">
              {d.founder.paragraphs.map((p: string, i: number) => (
                <p
                  key={i}
                  className={`leading-relaxed ${i === 0 ? "text-lg text-white/80" : "text-base text-white/55"}`}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                S
              </div>
              <div>
                <div className="text-white font-black">
                  {d.founder.signature}
                </div>
                <div className="text-white/40 text-sm">{d.founder.role}</div>
              </div>
              <Link
                href="#waitlist"
                className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 text-sm font-black rounded-xl hover:scale-105 transition-transform shadow-lg shrink-0 hidden sm:flex"
              >
                {d.founder.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fu()} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full text-green-600 text-sm font-semibold mb-4">
              <Check className="w-4 h-4" />
              {d.pricing.badge}
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              {d.pricing.heading}
            </h2>
            <p className="text-gray-400 mb-8">{d.pricing.subtext}</p>
            <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
              {(["monthly", "yearly"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBill(b)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${bill === b ? "bg-white shadow text-gray-900" : "text-gray-400"}`}
                >
                  {b === "yearly" ? (
                    <>
                      {d.pricing.yearly}{" "}
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-600 text-[9px] font-black rounded-full">
                        {d.pricing.save}
                      </span>
                    </>
                  ) : (
                    d.pricing.monthly
                  )}
                </button>
              ))}
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {d.pricing.plans.map((plan: any, i: number) => {
              const prices = [
                { monthly: 0, yearly: 0 },
                { monthly: 399, yearly: 4213 },
                { monthly: 899, yearly: 9493 },
              ];
              const price =
                bill === "yearly" ? prices[i].yearly : prices[i].monthly;
              const Icon = PLAN_ICONS[i];
              const hot = i === 1;
              return (
                <motion.div
                  key={plan.name}
                  {...fu(i * 0.1)}
                  className={`relative rounded-3xl p-7 border-2 flex flex-col transition-all ${hot ? "border-blue-500 shadow-2xl shadow-blue-500/10 scale-[1.03]" : "border-gray-100 hover:shadow-xl hover:border-gray-200"}`}
                >
                  {hot && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 text-white text-xs font-black rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${PLAN_GRADS[i]} flex items-center justify-center shadow`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-lg">
                        {plan.name}
                      </div>
                      <div className="text-xs text-gray-400">{plan.desc}</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    {price === 0 ? (
                      <div className="text-4xl font-black text-gray-900">
                        {d.pricing.free}
                      </div>
                    ) : (
                      <div className="flex items-end gap-1">
                        <div className="text-4xl font-black text-gray-900">
                          NPR {price.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm pb-1.5">
                          {bill === "yearly"
                            ? d.pricing.perYear
                            : d.pricing.perMonth}
                        </div>
                      </div>
                    )}
                    {bill === "yearly" && price > 0 && (
                      <p className="text-xs text-green-600 font-semibold mt-0.5">
                        {d.pricing.approxMonth.replace(
                          "{n}",
                          Math.round(price / 12).toLocaleString(),
                        )}
                      </p>
                    )}
                  </div>
                  <a
                    href={
                      PRE_LAUNCH
                        ? "#waitlist"
                        : i === 0
                          ? ctaHref("/signup")
                          : ctaHref("/signup?plan=" + plan.name.toLowerCase())
                    }
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-black mb-6 transition-all ${hot ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl hover:scale-105" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                  >
                    {PRE_LAUNCH
                      ? d.pricing.ctaFree
                      : i === 0
                        ? d.pricing.ctaFree
                        : d.pricing.ctaPaid}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <ul className="space-y-2.5 flex-1">
                    {plan.feats.map((f: any) => (
                      <li
                        key={f.t}
                        className={`flex items-start gap-2.5 text-sm ${f.ok ? "text-gray-700" : "text-gray-300"}`}
                      >
                        {f.ok ? (
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-gray-200 shrink-0 mt-0.5" />
                        )}
                        {f.t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            {d.pricing.footer}
          </p>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════════════════════ */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-[120px] opacity-30 top-0 right-0"
          style={{ background: "#a78bfa" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.94 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            {d.cta.line1}
            <br />
            <span className="text-yellow-300">{d.cta.line2}</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
            {d.cta.subtext}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#waitlist"
              className="flex items-center gap-2 px-10 py-5 bg-white text-indigo-700 rounded-2xl text-lg font-black hover:scale-105 transition-transform shadow-2xl"
            >
              <Sparkles className="w-5 h-5" />
              {d.cta.primary}
            </Link>
            <Link
              href={ctaHref("#pricing")}
              className="flex items-center gap-2 px-10 py-5 border-2 border-white/30 text-white rounded-2xl text-lg font-bold hover:bg-white/10 transition-colors"
            >
              {d.cta.secondary}
            </Link>
          </div>
          <p className="text-white/35 text-sm mt-8">{d.cta.disclaimer}</p>
        </motion.div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-950 pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="font-black text-2xl text-white mb-3">
                Hamro<span className="text-blue-500">Link</span>
              </div>
              <p className="text-sm text-white/35 max-w-xs leading-relaxed mb-5">
                {PRE_LAUNCH
                  ? d.footer.tagline
                  : ((d.footer as any).taglinePostLaunch ?? d.footer.tagline)}
              </p>
              <Link
                href={ctaHref("/signup")}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {PRE_LAUNCH
                  ? d.footer.cta
                  : ((d.footer as any).ctaPostLaunch ?? d.footer.cta)}
              </Link>
            </div>
            {Object.entries(d.footer.sections).map(([title, links]: any) => (
              <div key={title}>
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-4">
                  {title}
                </p>
                <ul className="space-y-2.5">
                  {links.map(([label, href]: string[]) => {
                    const isExternal = href.startsWith("http");
                    return (
                      <li key={label}>
                        {isExternal ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/45 hover:text-white transition-colors"
                          >
                            {label}
                          </a>
                        ) : (
                          <Link
                            href={
                              href.startsWith("/") ? `/${lang}${href}` : href
                            }
                            className="text-sm text-white/45 hover:text-white transition-colors"
                          >
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Hamrolink. {d.footer.copyright}
            </p>
            <div className="flex items-center gap-5">
              <a
                href={ctaHref("/signup")}
                className="flex items-center gap-1 text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {PRE_LAUNCH ? "Join Early Access" : "Get Started"}
              </a>
              <a
                href="mailto:support@hamrolink.com"
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                support@hamrolink.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
