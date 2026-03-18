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
                src="/og-image.png"
                alt="HamroLink"
                className="h-12 w-auto transition-all"
              />
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

        {/* Business Details Section */}
        <div className="border-t border-white/5 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">{d.footer.businessName}</h4>
            <p className="text-xs text-white/45">{d.footer.address}</p>
            <p className="text-xs text-white/35">
              {d.footer.proprietorLabel}: {d.footer.proprietorValue} | {d.footer.founderLabel}: {d.footer.founderValue}
            </p>
            <p className="text-xs text-white/25">
              {d.footer.regIdLabel}: {d.footer.regIdValue}  | {d.footer.panLabel}: {d.footer.panValue}
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center space-y-2">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Hamrolink. {d.footer.copyright}
            </p>
            <div className="flex items-center gap-5">
              <a
                href={ctaHref("/signup")}
                className="flex items-center gap-1 text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {PRE_LAUNCH
                  ? d.footer.cta
                  : (d.footer.ctaPostLaunch ?? (lang === "ne" ? "सुरु गर्नुहोस्" : "Get Started"))}
              </a>
              <a
                href="mailto:support@hamrolink.com"
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                support@hamrolink.com
              </a>
              <span className="text-xs text-white/10">|</span>
              <a
                href="tel:+9779713101957"
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                +977-9713101957
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
