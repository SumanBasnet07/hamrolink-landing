"use client";
import React, { useState } from "react";

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
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
      {logos.map((logo) => (
        <LogoItem key={logo.alt} logo={logo} />
      ))}
    </div>
  );
}

function LogoItem({ logo }: { logo: LogoConfig }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center gap-2 hover:opacity-100 transition-opacity">
      {!failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={logo.src}
          alt={logo.alt}
          className="h-15 w-15 object-contain transition-transform"
          onError={() => setFailed(true)}
        />
      ) : null}

      {failed && (
        <div className="flex items-center gap-2">
          <span 
            className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-black shadow-inner"
            style={{ backgroundColor: logo.bgColor }}
          >
            {logo.fallbackChar}
          </span>
          <span className="text-white text-sm font-black tracking-tight">{logo.alt}</span>
        </div>
      )}
    </div>
  );
}
