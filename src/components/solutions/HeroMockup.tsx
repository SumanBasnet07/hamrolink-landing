"use client";
import React, { useState, useEffect } from "react";
import { Search, Globe, ChevronRight, Sparkles } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description?: string;
}

export function HeroMockup({ 
  templates, 
  cityName = "Dharan", 
  capitalizedIndustry = "Ecommerce" 
}: { 
  templates: Template[];
  cityName?: string;
  capitalizedIndustry?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!templates || templates.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % templates.length);
        setFade(true);
      }, 300); // Fade transition timing
    }, 4000);

    return () => clearInterval(interval);
  }, [templates]);

  if (!templates || templates.length === 0) {
    return (
      <div className="w-[300px] h-[600px] bg-slate-950 rounded-[48px] p-3.5 border-4 border-slate-800 flex items-center justify-center text-slate-500 font-bold">
        No templates available
      </div>
    );
  }

  const activeTemplate = templates[activeIndex];

  // Dynamic high-trust local business names
  const localMockName = `${cityName} ${
    capitalizedIndustry === "Ecommerce" ? "Mart" 
    : capitalizedIndustry === "School" ? "Academy" 
    : capitalizedIndustry === "Restaurant" ? "Cafe & Resto" 
    : capitalizedIndustry === "Consultancy" ? "Education Hub" 
    : capitalizedIndustry === "Club" ? "Gaming Portal"
    : capitalizedIndustry
  }`;

  return (
    <div className="relative w-[300px] h-[600px] bg-slate-950 rounded-[48px] p-3.5 border-4 border-slate-800 shadow-2xl shadow-indigo-500/10 ring-1 ring-slate-800/50 flex flex-col overflow-hidden group keep-dark">
      
      {/* Phone Speaker & Camera Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
        <div className="w-10 h-1.5 bg-slate-850 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-850 rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="flex-1 bg-slate-900 rounded-[36px] overflow-hidden flex flex-col relative z-10">
        
        {/* Mock Browser URL Bar / Google Search style search box */}
        <div className="p-4 pt-8 bg-slate-950 border-b border-slate-850 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
            <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <div className="text-[10px] text-slate-400 font-bold overflow-hidden whitespace-nowrap text-ellipsis">
              hamrolink.com/templates/{activeTemplate.category}
            </div>
          </div>
        </div>

        {/* Dynamic Slideshow Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-900 p-4 justify-between">
          <div className={`flex-1 flex flex-col justify-between transition-all duration-300 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            
            {/* Live Template Mockup Card */}
            <div className="w-full aspect-[4/3] bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-850 shadow-inner group-hover:scale-[1.02] transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={activeTemplate.thumbnail} 
                alt={activeTemplate.name} 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700" 
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-indigo-600 text-[8px] font-black text-white uppercase rounded shadow">
                {activeTemplate.category}
              </div>
            </div>

            {/* Template Information */}
            <div className="mt-4 flex-1 flex flex-col justify-start">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1 block">
                Click to customize instantly
              </span>
              <h4 className="text-sm font-black text-white leading-tight mb-2 uppercase tracking-wide">
                {localMockName}
              </h4>
              <p className="text-slate-400 text-[11px] font-medium leading-relaxed line-clamp-3">
                {activeTemplate.description || "A gorgeous ready-to-launch website layout tailored for local discovery, optimized for payments and super-fast load speeds."}
              </p>
            </div>

            {/* Micro-interactive dots indicators */}
            <div className="flex justify-center gap-1.5 my-3">
              {templates.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-4 bg-indigo-500" : "w-1.5 bg-slate-700"}`}
                />
              ))}
            </div>

            {/* Local Call-to-action button */}
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-550 text-white rounded-xl font-black text-[11px] transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-1.5">
              <span>Launch This Design</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

        {/* Mock Mobile Footer */}
        <div className="bg-slate-950 border-t border-slate-850 px-4 py-3 flex items-center justify-between">
          <span className="text-[9px] font-bold text-slate-500">Live Preview</span>
          <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
        </div>

      </div>
    </div>
  );
}
