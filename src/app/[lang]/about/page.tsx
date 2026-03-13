"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Heart,
  Target,
  Globe,
  MapPin,
  ArrowRight,
  X,
  Menu,
  ShieldCheck,
  Zap,
  Award,
  Mail,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { Footer } from "@/components/Footer";

// ─── Pre-launch flag ──────────────────────────────────────────────────────────
const PRE_LAUNCH = true;

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
              ? scrolled ? "bg-white shadow text-gray-900" : "bg-white text-gray-900"
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
            [`/${lang}#examples`, nav.templates],
            [`/${lang}#features`, nav.features],
            [`/${lang}#pricing`, nav.pricing],
            [`/${lang}/docs`, nav.docs],
            [`/${lang}/contact`, nav.contact],
          ].map(([href, label]) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher lang={lang} accent={accent} scrolled={true} />
          <a
            href={`/${lang}#waitlist`}
            className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
            style={{ background: accent }}
          >
            <Sparkles className="w-3.5 h-3.5" />{" "}
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
              [`/${lang}#examples`, nav.templates],
              [`/${lang}#features`, nav.features],
              [`/${lang}#pricing`, nav.pricing],
              [`/${lang}/docs`, nav.docs],
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

export default function AboutPage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const ap = d.aboutPage;
  const accent = "#6366f1";

  const fu = () => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar lang={lang} accent={accent} nav={d.nav} />

      <main className="flex-1 pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold mb-6">
              <Heart className="w-3 h-3 fill-indigo-600" />
              {ap.badge}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
              {ap.heading}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
              {ap.subheading}
            </p>
          </motion.div>
        </section>

        {/* The Story Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fu()} className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60" />
              <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                <img
                  src="/pakhribas.png"
                  alt="Nepal Dhankuta Landscape"
                  className="w-full h-full object-cover transition-all duration-1000"
                />
              </div>
              {/* Image Credit */}
              <div className="mt-4 flex justify-start px-2">
                <p className="text-[11px] font-medium text-gray-400 tracking-wide bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  Photo by <span className="text-gray-900 font-bold">Bijaya Limbu</span>
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl border border-gray-50 max-w-[240px]">
                <p className="text-sm font-bold text-gray-900 mb-2">
                  Established 2026
                </p>
                <p className="text-xs text-gray-400">
                  Founded in the heart of Pakhribas, Dhankuta.
                </p>
              </div>
            </motion.div>

            <motion.div {...fu()} className="space-y-8">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                {ap.story.title}
              </h2>
              <div className="space-y-6 text-lg text-gray-500 leading-relaxed">
                {ap.story.content
                  .split("\n\n")
                  .map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-slate-50 border-y border-gray-100 py-24 mb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                The principles that guide every feature we build and every
                customer we support.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {ap.values.map((v: any, i: number) => (
                <motion.div
                  key={v.title}
                  {...fu()}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-indigo-500/5 transition-all"
                >
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                    {i === 0 ? (
                      <ShieldCheck className="w-6 h-6" />
                    ) : i === 1 ? (
                      <Zap className="w-6 h-6" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team / Founder Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-gradient-to-r from-indigo-50/50 to-purple-50/50 blur-[120px] -z-10 pointer-events-none" />

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
              {ap.team.title}
            </h2>
            <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto">
            {ap.team.members.map((member: any, i: number) => (
              <motion.div
                key={member.name}
                {...fu()}
                className="relative bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[60px] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none">
                  <Target className="w-64 h-64" />
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-30" />

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start relative z-10">
                  <div className="shrink-0 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-indigo-500 rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                      <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white text-7xl md:text-8xl font-black relative z-10 shadow-2xl">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer">
                        <Mail className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full text-indigo-600 text-sm font-bold mb-6">
                      <Award className="w-4 h-4" />
                      Founder Spotlight
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xl font-bold text-indigo-600 mb-8 flex items-center justify-center lg:justify-start gap-2">
                      <span className="w-8 h-px bg-indigo-200" />
                      {member.role}
                    </p>

                    <div className="relative">
                      <span className="absolute -top-6 -left-4 text-6xl text-indigo-100 font-serif select-none">
                        "
                      </span>
                      <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-medium">
                        {member.bio}
                      </p>
                      <span className="absolute -bottom-10 -right-4 text-6xl text-indigo-100 font-serif select-none">
                        "
                      </span>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center gap-6">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400"
                          >
                            {n === 1 ? "🎓" : n === 2 ? "💻" : "🚀"}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 font-medium">
                        Leading a team of passionate creators in Nepal.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              {...fu()}
              className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                {ap.mission.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-xl">
                {ap.mission.text}
              </p>
            </motion.div>

            <motion.div
              {...fu()}
              className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Globe className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                {ap.vision.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-xl">
                {ap.vision.text}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Location & Map Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="rounded-[60px] bg-slate-900 text-white overflow-hidden relative shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-24 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-indigo-300 text-xs font-bold mb-8 uppercase tracking-widest">
                  <MapPin className="w-3 h-3" />
                  {ap.location.title}
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                  {ap.location.address}
                </h2>
                <p className="text-white/60 text-xl leading-relaxed mb-12">
                  {ap.location.description}
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    <span className="font-bold text-lg">
                      {ap.location.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    <span className="font-bold text-lg">
                      Koshi Province, Nepal
                    </span>
                  </div>
                </div>

                <div className="mt-16">
                  <Link
                    href={`/${lang}/contact`}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-2xl font-black hover:bg-indigo-50 transition-all hover:scale-[1.02] shadow-xl"
                  >
                    Get in touch <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* MAP COMPONENT */}
              <div className="h-[500px] lg:h-auto min-h-[600px] transition-all duration-1000">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3553.1484384676914!2d87.2730996203742!3d27.057062114790092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sjp!4v1773411467670!5m2!1sen!2sjp"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <Footer
        lang={lang}
        d={d}
        PRE_LAUNCH={PRE_LAUNCH}
        ctaHref={(href) => (PRE_LAUNCH ? `/${lang}#waitlist` : href)}
      />
    </div>
  );
}
