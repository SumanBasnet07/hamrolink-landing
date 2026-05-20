"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FAQItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto w-full">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen
                ? "bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-950/20"
                : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700/80"
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                {item.question}
              </span>
              <span
                className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <div
              className={isOpen ? "px-6 pb-6 pt-0 text-slate-350 text-sm sm:text-base leading-relaxed border-t border-slate-800/40" : "sr-only"}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
