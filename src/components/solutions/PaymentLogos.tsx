"use client";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface LogoConfig {
  src: string;
  alt: string;
  bgColor: string;
  fallbackChar: string;
}

export function PaymentLogos() {
  const logos: LogoConfig[] = [
    { src: "/logos/esewa.png", alt: "eSewa", bgColor: "#60BB46", fallbackChar: "e" },
    { src: "/logos/khalti.png", alt: "Khalti", bgColor: "#5C2D91", fallbackChar: "K" },
    { src: "/logos/fonepay.png", alt: "Fonepay", bgColor: "#ED1C24", fallbackChar: "f" },
    { src: "/logos/connectips.png", alt: "connectIPS", bgColor: "#0054A6", fallbackChar: "c" }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 w-full max-w-4xl mx-auto">
      {logos.map((logo) => (
        <LogoItem key={logo.alt} logo={logo} />
      ))}
    </div>
  );
}

function LogoItem({ logo }: { logo: LogoConfig }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-[24px] blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative flex flex-col items-center justify-center bg-white border border-slate-200 shadow-xl shadow-indigo-950/5 rounded-[24px] px-6 py-4 w-32 sm:w-44 h-24 sm:h-28 hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer group-hover:border-indigo-400/50">
        
        {/* Subtle Check animation on hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>

        {!failed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            onError={() => setFailed(true)}
          />
        ) : null}

        {failed && (
          <div className="flex flex-col items-center gap-2">
            <span 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-inner"
              style={{ backgroundColor: logo.bgColor }}
            >
              {logo.fallbackChar}
            </span>
            <span className="text-slate-800 text-xs font-black tracking-tight uppercase">{logo.alt}</span>
          </div>
        )}

        <span className="absolute bottom-2 text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
          Verified
        </span>
      </div>
    </div>
  );
}

