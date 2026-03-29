"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ExternalLink } from "lucide-react";

interface FooterProps {
  lang: string;
  d: any;
  PRE_LAUNCH: boolean;
  ctaHref: (href: string) => string;
}

export function Footer({ lang, d, PRE_LAUNCH, ctaHref }: FooterProps) {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="HamroLink"
                className="h-12 w-auto transition-all"
              />
              <span className="text-white font-black text-xl">HamroLink Digital</span>
            </div>
            <p className="text-base text-white/70 max-w-xs leading-relaxed mb-6 font-medium">
              {PRE_LAUNCH
                ? d.footer.tagline
                : ((d.footer as any).taglinePostLaunch ?? d.footer.tagline)}
            </p>
            <Link
              href={ctaHref("/signup")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4" />
              {PRE_LAUNCH
                ? d.footer.cta
                : ((d.footer as any).ctaPostLaunch ?? d.footer.cta)}
            </Link>
          </div>
          {Object.entries(d.footer.sections).map(([title, links]: any) => (
            <div key={title}>
              <p className="text-sm font-black text-white/90 uppercase tracking-widest mb-6">
                {title}
              </p>
              <ul className="space-y-4">
                {links.map(([label, href]: string[]) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <li key={label}>
                      {isExternal ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-white/60 hover:text-white transition-colors font-medium"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={
                            href.startsWith("/") ? `/${lang}${href}` : href
                          }
                          className="text-base text-white/60 hover:text-white transition-colors font-medium"
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

        {/* Business Details Section */}
        <div className="border-t border-white/10 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <h4 className="text-white font-black text-xl">{d.footer.businessName}</h4>
            <p className="text-lg text-white/95 font-medium">{d.footer.address}</p>
            <div className="text-base text-white/80 font-bold uppercase tracking-wide">
              {d.footer.proprietorLabel}: {d.footer.proprietorValue} | {d.footer.founderLabel}: {d.footer.founderValue}
            </div>
            <div className="text-sm text-white/60 font-black uppercase tracking-widest bg-white/5 py-1.5 px-3 rounded inline-block">
              {d.footer.regIdLabel}: {d.footer.regIdValue}  | {d.footer.panLabel}: {d.footer.panValue}
            </div>
            {d.footer.authorityLabel && (
              <div className="text-xs text-white/40 font-bold uppercase tracking-tight">
                {d.footer.authorityLabel}: {d.footer.authorityValue}
              </div>
            )}
          </div>
          <div className="flex flex-col md:items-end justify-center space-y-4">
            <p className="text-sm text-white/40 font-bold">
              © {new Date().getFullYear()} HamroLink Digital. {d.footer.copyright}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={ctaHref("/signup")}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-black"
              >
                <ExternalLink className="w-4 h-4" />
                {PRE_LAUNCH
                  ? d.footer.cta
                  : (d.footer.ctaPostLaunch ?? (lang === "ne" ? "सुरु गर्नुहोस्" : "Get Started"))}
              </a>
              <a
                href="mailto:support@hamrolink.com"
                className="text-sm text-white/50 hover:text-white transition-colors font-bold"
              >
                support@hamrolink.com
              </a>
              <span className="hidden md:inline text-white/10 text-xl font-thin">|</span>
              <a
                href="tel:+9779816326639"
                className="text-sm text-white/50 hover:text-white transition-colors font-bold"
              >
                +977-9816326639
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
