"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LangSwitcher({
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
    <div
      className={`flex items-center gap-1 rounded-lg p-1 ${scrolled ? "bg-gray-100" : "bg-white/10"}`}
    >
      {(["en", "ne"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          className={`px-2.5 py-1 rounded-md text-sm font-bold transition-all ${
            lang === l
              ? "text-white shadow-sm"
              : scrolled
                ? "text-gray-800 hover:text-gray-800"
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
