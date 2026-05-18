"use client";
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(false);

  // Synchronize state with custom body styling
  useEffect(() => {
    const el = document.documentElement;
    if (isLight) {
      el.classList.add("light-theme-forced");
    } else {
      el.classList.remove("light-theme-forced");
    }
  }, [isLight]);

  return (
    <div className={isLight ? "theme-light text-slate-900 bg-slate-50" : "theme-dark text-slate-100 bg-[#0B0F19]"}>
      {/* 📜 Injected High-Fidelity Light Theme Overrides */}
      {isLight && (
        <style dangerouslySetInnerHTML={{ __html: `
          .theme-light {
            background-color: #f8fafc !important;
            color: #0f172a !important;
          }
          
          /* Force sections, headers, and footers to pure white backgrounds with light borders */
          .theme-light header, 
          .theme-light section, 
          .theme-light footer {
            background-color: #ffffff !important;
            background-image: none !important;
            border-color: #e2e8f0 !important;
          }
          
          /* Set text colors inside white backgrounds to clear high-contrast slate-900 / black */
          .theme-light h1, 
          .theme-light h2, 
          .theme-light h3, 
          .theme-light h4, 
          .theme-light h5, 
          .theme-light h6,
          .theme-light .text-white {
            color: #0f172a !important;
          }
          
          /* Set descriptive text to readable dark charcoal slate-800 */
          .theme-light p, 
          .theme-light span, 
          .theme-light li,
          .theme-light a {
            color: #1e293b !important;
          }
          
          /* Fix light gray helper texts */
          .theme-light .text-slate-100, 
          .theme-light .text-slate-200 {
            color: #0f172a !important;
          }
          
          .theme-light .text-slate-300, 
          .theme-light .text-slate-350, 
          .theme-light .text-slate-400,
          .theme-light .text-slate-450 {
            color: #334155 !important; /* slate-700 */
          }
          
          .theme-light .text-slate-500,
          .theme-light .text-slate-550,
          .theme-light .text-slate-600 {
            color: #475569 !important; /* slate-600 secondary text */
          }
          
          /* Fix bright neon indigo/violet texts under light background to rich royal indigo */
          .theme-light .text-indigo-350,
          .theme-light .text-indigo-300,
          .theme-light .text-indigo-400,
          .theme-light .text-violet-400 {
            color: #4f46e5 !important; /* indigo-600 */
            font-weight: 750 !important;
          }
          
          /* === RESTORE DARK MODE COLORS FOR .keep-dark ELEMENTS === */
          /* This bulletproof cascade ensures any element inside a .keep-dark container stays highly readable! */
          .theme-light .keep-dark h1,
          .theme-light .keep-dark h2,
          .theme-light .keep-dark h3,
          .theme-light .keep-dark h4,
          .theme-light .keep-dark h5,
          .theme-light .keep-dark h6,
          .theme-light .keep-dark .text-white {
            color: #ffffff !important;
          }
          
          .theme-light .keep-dark p,
          .theme-light .keep-dark span,
          .theme-light .keep-dark li,
          .theme-light .keep-dark a,
          .theme-light .keep-dark .text-slate-300,
          .theme-light .keep-dark .text-slate-350,
          .theme-light .keep-dark .text-slate-400,
          .theme-light .keep-dark .text-slate-450 {
            color: #cbd5e1 !important; /* light slate for paragraphs */
          }
          
          .theme-light .keep-dark .text-indigo-300,
          .theme-light .keep-dark .text-indigo-400,
          .theme-light .keep-dark .text-violet-400 {
            color: #818cf8 !important; /* bring back neon indigo */
            font-weight: inherit !important;
          }
          
          /* Turn dark transparent slate boxes into crisp clean white cards with beautiful shadows */
          /* simple :not(.keep-dark) is supported perfectly by all browsers */
          .theme-light .bg-slate-900:not(.keep-dark),
          .theme-light .bg-slate-950:not(.keep-dark),
          .theme-light .bg-slate-900\\/40:not(.keep-dark),
          .theme-light .bg-slate-900\\/50:not(.keep-dark),
          .theme-light .bg-slate-900\\/60:not(.keep-dark),
          .theme-light .bg-slate-900\\/80:not(.keep-dark),
          .theme-light .bg-slate-950\\/20:not(.keep-dark),
          .theme-light .bg-slate-950\\/40:not(.keep-dark),
          .theme-light .bg-slate-950\\/80:not(.keep-dark),
          .theme-light .bg-slate-950\\/90:not(.keep-dark) {
            background-color: #ffffff !important;
            border-color: #cbd5e1 !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05) !important;
          }
          
          /* Fix all default borders to slate-300 borders */
          .theme-light .border-slate-800:not(.keep-dark),
          .theme-light .border-slate-850:not(.keep-dark),
          .theme-light .border-slate-900:not(.keep-dark),
          .theme-light .border-white\\/5:not(.keep-dark),
          .theme-light .border-white\\/10:not(.keep-dark) {
            border-color: #cbd5e1 !important;
          }
          
          /* Badges background in light mode */
          .theme-light .bg-indigo-500\\/10:not(.keep-dark),
          .theme-light .bg-indigo-600\\/10:not(.keep-dark) {
            background-color: #e0e7ff !important;
            color: #4338ca !important;
            border-color: #c7d2fe !important;
          }
          
          /* FAQ Accordion Buttons - force dark headings */
          .theme-light .faq-question-btn {
            color: #0f172a !important;
          }
          
          /* Search fields & Inputs */
          .theme-light input {
            background-color: #ffffff !important;
            border-color: #94a3b8 !important;
            color: #0f172a !important;
          }
          .theme-light input::placeholder {
            color: #64748b !important;
          }
        `}} />
      )}

      {/* Floating high contrast action trigger */}
      <button
        onClick={() => setIsLight(!isLight)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-slate-950/90 dark:bg-white border border-slate-800 text-yellow-500 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Toggle high contrast visibility"
        title="Toggle high contrast view"
      >
        {isLight ? (
          <Moon className="w-5 h-5 text-indigo-400" />
        ) : (
          <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
        )}
      </button>

      {children}
    </div>
  );
}
