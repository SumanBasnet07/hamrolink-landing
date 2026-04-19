"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Menu } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";
import { resolveHref } from "@/lib/seo";

export function Navbar({
  accent,
  lang,
  nav,
  preLaunch = false,
  forceScrolled = false,
}: {
  accent: string;
  lang: string;
  nav: any;
  preLaunch?: boolean;
  forceScrolled?: boolean;
}) {
  const [sc, setSc] = useState(forceScrolled);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (forceScrolled) return;
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [forceScrolled]);

  const ctaHref = preLaunch ? resolveHref("/#waitlist", lang) : "https://app.hamrolink.com";

  const navLinks = [
    { href: resolveHref("/ai"), label: nav.templates },
    { href: resolveHref("/features"), label: nav.features },
    { href: resolveHref("/pricing"), label: nav.pricing },
    { href: resolveHref("/stories"), label: nav.docs },
  ];

  const companyLinks = [
    { href: resolveHref("/about"), label: nav.about },
    { href: resolveHref("/contact"), label: nav.contact },
    { href: resolveHref("/blog"), label: nav.blog },
    { href: `https://app.hamrolink.com/community`, label: nav.community },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        sc
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={resolveHref("/")}
          className={`flex items-center transition-opacity hover:opacity-90`}
        >
          <img
            src="/og-image.png"
            className="h-10 md:h-12 w-auto"
            alt="HamroLink"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={`text-base font-bold transition-colors ${
                sc ? "text-gray-600 hover:text-gray-900" : "text-white/70 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`text-base font-bold flex items-center gap-1 transition-colors ${
                sc ? "text-gray-600 hover:text-gray-900" : "text-white/70 hover:text-white"
              }`}
            >
              {nav.company}
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                >
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher lang={lang} accent={accent} scrolled={sc} />
          <Link
            href={ctaHref}
            className="flex items-center gap-1.5 px-4 py-2 text-white text-base font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
            style={{ background: accent }}
          >
            <Sparkles className="w-3.5 h-3.5" />{" "}
            {preLaunch ? nav.cta : (nav.ctaPostLaunch ?? nav.cta)}
          </Link>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-[11px] font-black shadow-lg"
            style={{ background: accent }}
          >
            <Sparkles className="w-3 h-3" />
            {lang === "ne" ? "Start For Free" : "Start For Free"}
          </Link>
          <button
            onClick={() => setOpen((p) => !p)}
            className={`p-2 ${sc ? "text-gray-700" : "text-white"}`}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
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
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-bold text-gray-700 hover:text-indigo-600"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 py-1">
                {nav.company}
              </p>
              {companyLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base font-bold text-gray-700 hover:text-indigo-600"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100">
              <Link
                href={ctaHref}
                className="block py-2.5 text-center text-white rounded-xl text-base font-bold"
                style={{ background: accent }}
                onClick={() => setOpen(false)}
              >
                {preLaunch ? nav.cta : (nav.ctaPostLaunch ?? nav.cta)}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
