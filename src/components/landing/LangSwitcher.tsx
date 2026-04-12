"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

function FlagIcon({ code }: { code: "en" | "ne" }) {
  if (code === "en") {
    return (
      <svg viewBox="0 0 24 16" className="w-5 h-3.5 rounded-sm shadow-sm" aria-hidden="true">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.6" />
        <rect y="6.4" width="24" height="3.2" fill="#fff" />
        <rect y="7.2" width="24" height="1.6" fill="#C8102E" />
        <rect x="10.4" width="3.2" height="16" fill="#fff" />
        <rect x="11.2" width="1.6" height="16" fill="#C8102E" />
      </svg>
    );
  }

  // Accurate Nepal flag – single crimson path with blue stroke for perfect corners
  return (
    <img
      src="/Flag_of_Nepal.svg"
      className="w-5 h-3.5 rounded-sm shadow-sm"
      alt="नेपाली"
    />
  );
}

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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const options = [
    { code: "en", label: "English", short: "EN" },
    { code: "ne", label: "नेपाली", short: "ने" },
  ] as const;

  const active = options.find((item) => item.code === lang) ?? options[0];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-bold border transition-all ${
          scrolled
            ? "bg-white border-gray-200 text-gray-800 hover:border-gray-300"
            : "bg-white/10 border-white/20 text-white hover:bg-white/15"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <FlagIcon code={active.code} />
        <span>{active.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      {open ? (
        <div
          className="absolute right-0 mt-2 w-44 rounded-2xl border border-gray-200 bg-white shadow-2xl p-1.5 z-50"
          role="listbox"
          aria-label="Language selector"
        >
          {options.map((item) => {
            const href = `/${item.code}${rest ? `/${rest}` : ""}`;
            const isActive = item.code === lang;

            return (
              <Link
                key={item.code}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="inline-flex items-center gap-2.5 font-semibold">
                  <FlagIcon code={item.code} />
                  <span>{item.label}</span>
                </span>
                {isActive ? <Check className="w-4 h-4" style={{ color: accent }} /> : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
