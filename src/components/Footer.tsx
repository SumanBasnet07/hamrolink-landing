import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Fingerprint,
  User
} from "lucide-react";

interface FooterProps {
  lang: string;
  d: any;
  PRE_LAUNCH: boolean;
  ctaHref: (href: string) => string;
}

export function Footer({ lang, d, PRE_LAUNCH, ctaHref }: FooterProps) {
  return (
    <footer className="bg-[#020617] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-24 bg-blue-500/5 blur-[80px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4">
            <Link href={`/${lang}`} className="inline-block mb-8 transition-opacity hover:opacity-90">
              <img
                src="/og-image.png"
                alt="HamroLink"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-lg text-slate-300 max-w-xs leading-relaxed mb-5 font-semibold">
              {PRE_LAUNCH
                ? d.footer.tagline
                : ((d.footer as any).taglinePostLaunch ?? d.footer.tagline)}
            </p>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300 mb-8">
              Made with love in Nepal
            </p>
            <Link
              href={ctaHref("/signup")}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-black rounded-2xl transition-all hover:scale-105 shadow-xl shadow-amber-500/25 group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              {PRE_LAUNCH
                ? d.footer.cta
                : (lang === "ne" ? "१५ मिनेटमा सुरु गर्नुहोस्" : "Start My 15-Minute Launch")}
            </Link>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {Object.entries(d.footer.sections).map(([title, links]: any) => (
              <div key={title}>
                <p className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-8">
                  {title}
                </p>
                <ul className="space-y-5">
                  {links.map(([label, href]: string[]) => {
                    const isExternal = href.startsWith("http");
                    return (
                      <li key={label}>
                        {isExternal ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-slate-300 hover:text-white transition-colors font-semibold"
                          >
                            {label}
                          </a>
                        ) : (
                          <Link
                            href={href.startsWith("/") ? (lang === "en" ? href : `/${lang}${href}`) : href}
                            className="text-base text-slate-300 hover:text-white transition-colors font-semibold"
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
        </div>

        {/* Structured Business Details */}
        <div className="pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h4 className="text-xl font-black text-white mb-2 leading-tight tracking-tight">
                  {d.footer.businessName}
                </h4>
                <div className="flex items-center gap-2 text-slate-400 font-medium hover:text-slate-200 transition-colors cursor-default">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{d.footer.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/[0.07] transition-colors group">
                  <div className="flex items-center gap-3 text-slate-200 font-bold tracking-tight">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span>Legal Identifiers</span>
                  </div>
                    <div className="space-y-3 text-base">
                    <div className="flex justify-between items-center text-slate-200 pb-2 border-b border-white/10">
                      <span className="font-bold">{d.footer.regIdLabel}</span>
                      <span className="font-black text-white text-lg tracking-wide">{d.footer.regIdValue}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-200 pt-1">
                      <span className="font-bold">{d.footer.panLabel}</span>
                      <span className="font-black text-white text-lg tracking-wide">{d.footer.panValue}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/[0.07] transition-colors group">
                  <div className="flex items-center gap-3 text-slate-200 font-bold tracking-tight">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    <span>E-Commerce Compliance</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                        {d.footer.authorityLabel}
                      </span>
                      <span className="font-black text-white leading-tight">
                        {d.footer.authorityValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-0.5">{d.footer.proprietorLabel}</p>
                    <p className="font-bold text-slate-200">{d.footer.proprietorValue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <Fingerprint className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-0.5">{d.footer.founderLabel}</p>
                    <p className="font-bold text-slate-200">{d.footer.founderValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:text-right flex flex-col lg:items-end">
              <div className="space-y-4 w-full">
                <a
                  href="mailto:support@hamrolink.com"
                  className="flex items-center justify-start lg:justify-end gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="font-bold text-lg">support@hamrolink.com</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-5 h-5 text-slate-200" />
                  </div>
                </a>
                <a
                  href="tel:+9779816326639"
                  className="flex items-center justify-start lg:justify-end gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="font-bold text-lg">+977-9816326639</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-5 h-5 text-slate-200" />
                  </div>
                </a>
              </div>
              
              <div className="pt-8 border-t border-white/5 w-full">
                <p className="text-sm text-slate-400 font-semibold">
                  © {new Date().getFullYear()} HamroLink Digital. {d.footer.copyright}
                </p>
                <Link
                  href={ctaHref("/signup")}
                  className="inline-flex items-center gap-2 mt-4 text-xs font-black text-blue-500 hover:text-blue-400 uppercase tracking-[0.2em] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Empowering Nepal's Digital Future
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
