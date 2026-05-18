"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Layers, 
  Layout, 
  Laptop, 
  Bot, 
  ShoppingCart, 
  Briefcase, 
  GraduationCap,
  Gift,
  Utensils,
  Paintbrush,
  BookOpen,
  HeartPulse,
  Trophy,
  Building2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/Footer";
import { Template } from "@/lib/templates";

interface TemplatesClientProps {
  templates: Template[];
  lang: string;
  dict: any;
}

export function TemplatesClient({ templates, lang, dict }: TemplatesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 12;

  // Categories list
  const categories = [
    { id: "all", label: lang === "ne" ? "सबै टेम्प्लेट" : "All Designs", icon: Layout },
    { id: "free", label: lang === "ne" ? "नि:शुल्क" : "Free", icon: Gift },
    { id: "school", label: lang === "ne" ? "स्कुल" : "School", icon: GraduationCap },
    { id: "ecommerce", label: lang === "ne" ? "ई-कमर्स" : "E-Commerce", icon: ShoppingCart },
    { id: "consultancy", label: lang === "ne" ? "परामर्श" : "Consultancy", icon: Briefcase },
    { id: "restaurant", label: lang === "ne" ? "रेष्टुरेन्ट" : "Restaurant", icon: Utensils },
    { id: "portfolio", label: lang === "ne" ? "पोर्टफोलियो" : "Portfolio", icon: Paintbrush },
    { id: "business", label: lang === "ne" ? "व्यापार" : "Business", icon: Building2 },
    { id: "landing", label: lang === "ne" ? "ल्यान्डिङ" : "Landing", icon: Layers },
    { id: "blog", label: lang === "ne" ? "ब्लग" : "Blog", icon: BookOpen },
    { id: "health", label: lang === "ne" ? "स्वास्थ्य" : "Health", icon: HeartPulse },
    { id: "club", label: lang === "ne" ? "क्लब" : "Club", icon: Trophy },
  ];

  // Filtering templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "free"
          ? template.plan && template.plan.includes("free")
          : template.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (template.description && template.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [templates, selectedCategory, searchQuery]);

  const totalItems = filteredTemplates.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTemplates, currentPage]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* ─── Main Premium Navbar ─── */}
      <Navbar lang={lang} accent="#6366f1" nav={dict.nav} />

      {/* ─── Hero Header Showcase ─── */}
      <header className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[130px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full text-indigo-400 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "ne" ? "१२०+ प्रोफेसनल लेआउटहरू" : "120+ Beautiful Ready-Made Designs"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
            {lang === "ne" ? (
              <>
                तपाईंको व्यवसायलाई सुहाउने{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                  उत्कृष्ट डिजाइन
                </span>{" "}
                रोज्नुहोस्।
              </>
            ) : (
              <>
                Pick a Design. Look{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                  Professional
                </span>{" "}
                Immediately.
              </>
            )}
          </h1>

          <p className="text-slate-350 text-base sm:text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed mb-12 text-slate-350">
            {lang === "ne" ? 
              "सबै वेबसाइटहरू मोबाइल-फ्रेन्डली छन्, ई-सेवा/खल्ती भुक्तानी चल्छन् र गुगलमा र्याङ्क हुन तयार छन्। कुनै कोडिङ सीप चाहिँदैन।" : 
              "Every template is highly optimized for fast local loading, responsive on all devices, and includes ready-to-use eSewa, Khalti, and AI tools. Pick your canvas and launch."
            }
          </p>

          {/* Dynamic Search Container */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl blur opacity-25 group-focus-within:opacity-40 transition-opacity duration-300" />
            <div className="relative flex items-center bg-slate-950 border border-slate-850 rounded-2xl p-2 w-full">
              <Search className="w-5 h-5 text-slate-500 ml-4 shrink-0" />
              <input
                type="text"
                placeholder={lang === "ne" ? "व्यवसाय वा कोटी खोज्नुहोस्..." : "Search boutiques, consultancies, menus, schools..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-transparent border-0 outline-none focus:ring-0 text-slate-100 px-3 py-2.5 text-base placeholder-slate-550"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs font-bold text-slate-450 transition-colors text-slate-400"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* ─── Filtering & Showcase Grid ─── */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold border transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10 scale-105"
                    : "bg-slate-950 border-slate-850 text-slate-350 hover:border-slate-750 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Cards Grid */}
        {filteredTemplates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedTemplates.map((template) => {
              // Custom category badges formatting
              let badgeColor = "bg-slate-900 border-slate-800 text-indigo-400";
              const catLower = template.category.toLowerCase();
              if (catLower === "ecommerce") {
                badgeColor = "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
              } else if (catLower === "school" || catLower === "education") {
                badgeColor = "bg-amber-500/10 border-amber-500/20 text-amber-400";
              } else if (catLower === "consultancy") {
                badgeColor = "bg-sky-500/10 border-sky-500/20 text-sky-400";
              } else if (catLower === "restaurant") {
                badgeColor = "bg-rose-500/10 border-rose-500/20 text-rose-400";
              } else if (catLower === "club") {
                badgeColor = "bg-violet-500/10 border-violet-500/20 text-violet-400";
              } else if (catLower === "portfolio") {
                badgeColor = "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400";
              } else if (catLower === "business") {
                badgeColor = "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
              } else if (catLower === "health") {
                badgeColor = "bg-red-500/10 border-red-500/20 text-red-400";
              }

              return (
                <div 
                  key={template.id}
                  className="bg-slate-900/40 border border-slate-850 rounded-[28px] overflow-hidden shadow-lg hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-950/15 hover:scale-[1.01] transition-all duration-500 group flex flex-col"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-950 border-b border-slate-850 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={template.thumbnail || "/og-image.png"}
                      alt={template.name}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg border shadow-sm ${badgeColor}`}>
                        {template.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                        {template.description || 
                          (lang === "ne"
                            ? "व्यवसायको विकासका लागि विशेष रूपमा तयार पारिएको मोबाइल-मैत्री र भुक्तानी एकीकृत टेम्प्लेट।"
                            : "A high-conversion design tailored specifically for fast load speeds, payment integrations, and seamless user experiences.")
                        }
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href="https://app.hamrolink.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-3 bg-slate-950 border border-slate-850 hover:border-slate-750 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all"
                      >
                        {lang === "ne" ? "पूर्वावलोकन" : "Preview"}
                      </a>
                      <a
                        href={`https://app.hamrolink.com/signup?template=${template.id}`}
                        className="flex-1 text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/10 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        {lang === "ne" ? "सुरु गर्नुहोस्" : "Use Design"}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-900 pt-8">
              <p className="text-sm font-semibold text-slate-450 text-slate-400">
                {lang === "ne" ? (
                  <>
                    देखाउँदै <span className="text-white font-extrabold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)}</span> देखि{" "}
                    <span className="text-white font-extrabold">{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}</span> सम्म, जम्मा{" "}
                    <span className="text-white font-extrabold">{totalItems}</span> डिजाइनहरू
                  </>
                ) : (
                  <>
                    Showing <span className="text-white font-extrabold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)}</span> to{" "}
                    <span className="text-white font-extrabold">{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}</span> of{" "}
                    <span className="text-white font-extrabold">{totalItems}</span> designs
                  </>
                )}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2.5 rounded-xl border border-slate-850 bg-slate-950 text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                    currentPage === 1 ? "opacity-40 cursor-not-allowed pointer-events-none" : "hover:border-slate-700 active:scale-95"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all flex items-center justify-center ${
                        isCurrent
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10 scale-105"
                          : "bg-slate-950 border-slate-850 text-slate-350 hover:border-slate-750 hover:text-white active:scale-95"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2.5 rounded-xl border border-slate-850 bg-slate-950 text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                    currentPage === totalPages ? "opacity-40 cursor-not-allowed pointer-events-none" : "hover:border-slate-700 active:scale-95"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
        ) : (
          <div className="text-center py-20 bg-slate-900/20 border border-slate-850 rounded-[32px] max-w-3xl mx-auto">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-black text-white mb-2">No templates found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any designs matching &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category. Try searching another term or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* ─── Unified Corporate Footer ─── */}
      <Footer 
        lang={lang} 
        d={dict} 
        PRE_LAUNCH={false} 
        ctaHref={(href) => href} 
      />

    </div>
  );
}
