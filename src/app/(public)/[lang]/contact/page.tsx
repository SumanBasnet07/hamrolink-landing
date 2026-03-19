"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Clock,
  User,
  MessageSquare,
  Globe,
  Send,
  Loader2,
  X,
  Menu,
  Phone,
  Building,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { sendContactEmailSES } from "@/app/actions";
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
            [`/${lang}#ai-staff`, nav.templates],
            [`/${lang}#features`, nav.features],
            [`/${lang}/pricing`, nav.pricing],
            [`/${lang}#stories`, nav.docs],
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
              [`/${lang}#ai-staff`, nav.templates],
              [`/${lang}#features`, nav.features],
              [`/${lang}/pricing`, nav.pricing],
              [`/${lang}#stories`, nav.docs],
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

export default function ContactPage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const d = getDictionary(lang);
  const cp = d.contactPage;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message || status === "loading") return;

    setStatus("loading");
    try {
      await sendContactEmailSES(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const accent = "#6366f1"; // Primary indigo

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar lang={lang} accent={accent} nav={d.nav} />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px] opacity-60" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-100 blur-[100px] opacity-40" />
          <div className="absolute -bottom-[5%] left-1/4 w-[35%] h-[35%] rounded-full bg-violet-100 blur-[110px] opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold mb-4">
              <Sparkles className="w-3 h-3" />
              {cp.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
              {cp.heading}
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              {cp.subheading}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Info Cards */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
                {/* NAP Details */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/70 backdrop-blur-md p-8 rounded-[32px] border border-white shadow-xl shadow-indigo-100/20 col-span-1 md:col-span-2 xl:col-span-1"
                >
                  <div className="flex gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">
                        {cp.businessInfo.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Registered Business in Nepal
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <MapPin className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                      <span className="text-sm text-gray-600 font-medium leading-relaxed">
                        {cp.businessInfo.address}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">
                        {cp.businessInfo.phone}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">
                        {cp.businessInfo.email}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {[
                  {
                    icon: Clock,
                    label: cp.info.hours,
                    value: cp.info.hoursValue,
                    sub: "Nepali Standard Time (GMT+5:45)",
                    color: "bg-orange-50 text-orange-600",
                  },
                  {
                    icon: Globe,
                    label: cp.info.location,
                    value: cp.info.address,
                    sub: "Dhankuta District, Koshi Province",
                    color: "bg-emerald-50 text-emerald-600",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white/70 backdrop-blur-md p-6 rounded-[32px] border border-white shadow-xl shadow-gray-200/20 group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
                  >
                    <div className="flex gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {item.label}
                        </p>
                        <h3 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {item.value}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{item.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-1/4 -translate-y-1/4 scale-150">
                  <Globe className="w-40 h-40" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">
                  Supporting Nepal&apos;s Digital Future
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 relative z-10">
                  Join hundreds of businesses from Dhankuta to Kathmandu who are
                  ready to launch their story online.
                </p>
                <div className="flex -space-x-2">
                  {["🤵", "👩‍🍳", "👨‍💻", "👩‍🏫"].map((e, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-indigo-400 bg-white/10 flex items-center justify-center text-base"
                    >
                      {e}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-12 xl:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                        {cp.form.name}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder={cp.form.placeholderName}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all font-medium text-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                        {cp.form.email}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder={cp.form.placeholderEmail}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all font-medium text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                      {cp.form.subject}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder={cp.form.placeholderSubject}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all font-medium text-gray-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                      {cp.form.message}
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={cp.form.placeholderMessage}
                      rows={5}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all font-medium text-gray-700 resize-none"
                    />
                  </div>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        {cp.form.success}
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        {cp.form.error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {status === "loading" ? cp.form.sending : cp.form.cta}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 rounded-[60px] overflow-hidden border border-gray-100 shadow-2xl h-[500px] relative transition-all duration-700 shadow-indigo-100/30"
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3553.1484384676914!2d87.2730996203742!3d27.057062114790092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sjp!4v1773411467670!5m2!1sen!2sjp"
            ></iframe>
          </motion.div>
        </div>
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
