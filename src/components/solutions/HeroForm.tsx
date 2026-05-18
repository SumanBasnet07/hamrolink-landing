"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroFormProps {
  templateId: string;
  placeholderText?: string;
  buttonText?: string;
}

export function HeroForm({
  templateId,
  placeholderText = "Enter business name...",
  buttonText = "Create Website",
}: HeroFormProps) {
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    // Direct deep link to app signup flow prefilled with template ID and business name
    const signupUrl = new URL("https://app.hamrolink.com/signup");
    signupUrl.searchParams.append("template", templateId);
    signupUrl.searchParams.append("name", businessName.trim());
    
    // Redirect to the signup flow
    window.location.href = signupUrl.toString();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mt-8 p-1.5 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl shadow-indigo-950/20"
    >
      <div className="relative w-full flex-1">
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder={placeholderText}
          className="w-full bg-transparent px-4 py-3.5 text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-0 rounded-xl"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02] active:scale-95 shrink-0"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}
