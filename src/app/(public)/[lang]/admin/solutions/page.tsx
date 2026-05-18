"use client";

import React, { useEffect, useState } from "react";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Search, 
  Globe, 
  Database, 
  Sparkles, 
  Brain, 
  ChevronRight, 
  RefreshCw, 
  ShieldCheck, 
  ArrowLeft,
  FileText,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminSolutionsPage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [secret, setSecret] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  
  // Search and view states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  
  // Generation & Form States
  const [newCityName, setNewCityName] = useState("");
  const [newProvince, setNewProvince] = useState("");
  const [rawNotes, setRawNotes] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    "ecommerce", "consultancy", "restaurant", "school", "club", "business"
  ]);
  const [generatedPreview, setGeneratedPreview] = useState<any>(null);
  const [editableJson, setEditableJson] = useState("");
  const [previewError, setPreviewError] = useState("");

  const industriesList = [
    { id: "ecommerce", label: "E-Commerce" },
    { id: "consultancy", label: "Consultancy" },
    { id: "restaurant", label: "Restaurant" },
    { id: "school", label: "School" },
    { id: "club", label: "Club" },
    { id: "business", label: "Business" },
    { id: "portfolio", label: "Portfolio" },
    { id: "health", label: "Health" }
  ];

  // Fetch locations from DB
  const fetchData = async (inputSecret?: string) => {
    setLoading(true);
    setError("");
    const sec = inputSecret || secret;
    try {
      const headers: Record<string, string> = {};
      if (sec.trim()) headers["x-admin-secret"] = sec.trim();

      const res = await fetch("/api/admin/solutions", {
        method: "GET",
        headers,
      });
      const data = await res.json();
      
      if (data.error === "Unauthorized") {
        setAuthorized(false);
        setError("Invalid Admin Secret Key");
      } else if (data.success) {
        setLocations(data.locations);
        setAuthorized(true);
      }
    } catch (err) {
      setError("Failed to fetch database locations");
    } finally {
      setLoading(false);
    }
  };

  // Generate location schema using DeepSeek AI
  const handleAiGenerate = async () => {
    if (!newCityName) {
      setPreviewError("City Name is required to run the AI engine.");
      return;
    }
    setGenerating(true);
    setPreviewError("");
    setGeneratedPreview(null);
    try {
      const res = await fetch("/api/admin/solutions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret.trim()
        },
        body: JSON.stringify({
          cityName: newCityName,
          province: newProvince,
          rawText: rawNotes,
          selectedIndustries: selectedIndustries
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setPreviewError(data.error || "Generation failed");
      } else if (data.success) {
        setGeneratedPreview(data.locationData);
        setEditableJson(JSON.stringify(data.locationData, null, 2));
      }
    } catch (err: any) {
      setPreviewError(err.message || "Failed to contact AI generator");
    } finally {
      setGenerating(false);
    }
  };

  // Save the location details to MongoDB
  const handleSaveToDb = async () => {
    setSaving(true);
    setPreviewError("");
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(editableJson);
      } catch (parseErr) {
        setPreviewError("Invalid JSON structure in the editor. Please correct it before saving.");
        setSaving(false);
        return;
      }

      const res = await fetch("/api/admin/solutions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret.trim()
        },
        body: JSON.stringify(parsedData)
      });
      const data = await res.json();

      if (!res.ok) {
        setPreviewError(data.error || "Failed to persist to database");
      } else if (data.success) {
        // Reset states
        setNewCityName("");
        setNewProvince("");
        setRawNotes("");
        setGeneratedPreview(null);
        setEditableJson("");
        setActiveTab("list");
        fetchData();
      }
    } catch (err: any) {
      setPreviewError(err.message || "Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  // Delete a location from MongoDB
  const handleDeleteLocation = async (slug: string) => {
    if (!confirm(`Are you absolutely sure you want to delete the solutions page route for: ${slug}?`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/solutions?slug=${slug}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": secret.trim()
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.error || "Failed to delete location");
      }
    } catch (err) {
      alert("Failed to delete location");
    } finally {
      setLoading(false);
    }
  };

  const toggleIndustry = (id: string) => {
    setSelectedIndustries(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Filtering list
  const filteredLocations = locations.filter(loc => 
    loc.city_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.province.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // total routes count (locations * average configured industries)
  const totalRoutesCount = locations.reduce((sum, loc) => 
    sum + Object.keys(loc.industries_data || {}).length, 0
  );

  // Authenticate Admin Access Form
  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100">
        <div className="max-w-md w-full bg-slate-950 rounded-3xl p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-600/5 blur-[80px] pointer-events-none" />
          <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-black text-center text-white mb-2">SEO Solutions Engine</h1>
          <p className="text-slate-400 text-center mb-8 text-sm">Enter your Admin Secret key to manage localized dynamic landing pages.</p>
          
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
            placeholder="Enter Secret Key"
            className="w-full px-5 py-4 bg-slate-900/60 border-2 border-slate-800 rounded-2xl mb-4 focus:outline-none focus:border-indigo-500 transition-all font-medium text-white placeholder-slate-600"
          />
          
          {error && <p className="text-rose-500 text-sm font-bold text-center mb-4">{error}</p>}
          
          <button 
            onClick={() => fetchData()}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/10 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Access Dashboard"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-900 pb-8">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <MapPin className="w-8 h-8 text-indigo-500" /> Solutions Programmatic SEO
            </h1>
            <p className="text-slate-400 font-medium mt-1">AI-Research and dynamic route generation dashboard.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-5 py-3 bg-slate-950 border border-slate-850 rounded-2xl flex items-center gap-3 shadow-md">
                <Database className="w-5 h-5 text-indigo-400" />
                <div>
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider leading-none mb-0.5">Live Locations</div>
                   <div className="text-lg font-black text-white leading-none">{locations.length}</div>
                </div>
             </div>
             <div className="px-5 py-3 bg-slate-950 border border-slate-850 rounded-2xl flex items-center gap-3 shadow-md">
                <Globe className="w-5 h-5 text-emerald-400" />
                <div>
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider leading-none mb-0.5">Total Live URLs</div>
                   <div className="text-lg font-black text-white leading-none">{totalRoutesCount}</div>
                </div>
             </div>
             <button 
                onClick={() => fetchData()}
                className="p-4 bg-slate-950 border border-slate-850 rounded-2xl hover:bg-slate-900 text-slate-400 hover:text-white transition-all shadow-md"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
             </button>
          </div>
        </header>

        {/* Tab Controls */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${
              activeTab === "list"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10 scale-102"
                : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-750 hover:text-white"
            }`}
          >
            All Live Locations
          </button>
          <button
            onClick={() => {
              setActiveTab("create");
              setGeneratedPreview(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${
              activeTab === "create"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10 scale-102"
                : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-750 hover:text-white"
            }`}
          >
            <Plus className="w-4 h-4" /> AI Location Generator
          </button>
        </div>

        {/* Tab A: Locations List */}
        {activeTab === "list" && (
          <div className="space-y-6">
            
            {/* Search Input */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-3 max-w-md flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-500 shrink-0 ml-1" />
              <input
                type="text"
                placeholder="Filter locations by name, slug, province..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none focus:ring-0 text-sm text-slate-100 w-full placeholder-slate-600"
              />
            </div>

            {/* List View Table */}
            <div className="bg-slate-950 border border-slate-850 rounded-[2rem] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900/40 border-b border-slate-850">
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Location</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Province / Hubs</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Active Solutions</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/60">
                    {filteredLocations.map((loc) => {
                      const activeIndustries = Object.keys(loc.industries_data || {});
                      return (
                        <tr key={loc._id} className="hover:bg-slate-900/10 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center font-bold text-indigo-400">
                                {loc.city_name[0]}
                              </div>
                              <div>
                                <div className="font-extrabold text-white">{loc.city_name}</div>
                                <div className="text-xs text-slate-500 mt-0.5">slug: <span className="font-bold text-slate-400">{loc.slug}</span></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-bold text-slate-350 text-slate-300">{loc.province}</div>
                            <div className="text-xs text-slate-500 mt-1">Nearby: <span className="text-slate-400">{loc.nearby_hubs.join(", ")}</span></div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-wrap gap-1.5 max-w-xs">
                              {activeIndustries.map((ind) => (
                                <a
                                  key={ind}
                                  href={`/solutions/${ind}/${loc.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-[10px] font-black uppercase tracking-wider text-indigo-400 hover:text-white rounded-lg transition-colors group"
                                >
                                  <span>{ind}</span>
                                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                              ))}
                              {activeIndustries.length === 0 && (
                                <span className="text-xs text-slate-600 font-semibold italic">No active pages</span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button
                              onClick={() => handleDeleteLocation(loc.slug)}
                              className="p-3 bg-slate-900 border border-slate-850 rounded-xl text-rose-400 hover:text-white hover:bg-rose-950/20 hover:border-rose-900/40 transition-all active:scale-95 shadow"
                              title="Delete Location"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredLocations.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <MapPin className="w-12 h-12 text-slate-800" />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No locations registered yet</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab B: AI Location Generator (DeepSeek Integration) */}
        {activeTab === "create" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Configuration Column */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-[2.5rem] p-8 shadow-xl space-y-6">
              
              <div className="flex items-center gap-3 border-b border-slate-900 pb-5">
                <Brain className="w-6 h-6 text-indigo-400 animate-pulse" />
                <div>
                  <h2 className="text-lg font-black text-white">DeepSeek Research Assistant</h2>
                  <p className="text-xs text-slate-500">Automate programmatic SEO metrics creation.</p>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">City Name</label>
                  <input
                    type="text"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    placeholder="e.g. Pokhara, Hetauda, Lalitpur"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">Province</label>
                  <input
                    type="text"
                    value={newProvince}
                    onChange={(e) => setNewProvince(e.target.value)}
                    placeholder="e.g. Gandaki Province, Bagmati Province"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white text-sm"
                  />
                </div>

                {/* Industries Selection */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">Selected Industries</label>
                  <div className="flex flex-wrap gap-2">
                    {industriesList.map((ind) => {
                      const selected = selectedIndustries.includes(ind.id);
                      return (
                        <button
                          key={ind.id}
                          type="button"
                          onClick={() => toggleIndustry(ind.id)}
                          className={`px-3 py-1.5 border text-xs font-bold rounded-lg transition-all ${
                            selected 
                              ? "bg-indigo-600/15 border-indigo-500 text-indigo-400 shadow-sm"
                              : "bg-slate-900 border-slate-800 text-slate-450 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          {ind.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Unstructured Raw Notes Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Unstructured notes (Optional)
                    </label>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Enriches AI Output</span>
                  </div>
                  <textarea
                    rows={4}
                    value={rawNotes}
                    onChange={(e) => setRawNotes(e.target.value)}
                    placeholder="Paste raw text here... e.g. 'Pokhara has lakeside markets. Cargo delays on Prithvi highway are common. Demographics target travel agents.'"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white text-sm placeholder-slate-600 resize-none font-sans"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-900">
                <button
                  onClick={handleAiGenerate}
                  disabled={generating}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-750 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      DeepSeek researching local parameters...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Research & Generate solutions data
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right Output Preview Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Generated Result Display */}
              {generatedPreview ? (
                <div className="bg-slate-950 border border-indigo-500/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[500px]">
                  <div className="absolute inset-0 bg-indigo-500/[0.01] pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-slate-900 pb-5 mb-6 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white text-base">Schema Generated Successfully</h3>
                        <p className="text-xs text-slate-500">Edit JSON values directly in the console below before saving.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-black uppercase text-indigo-400 tracking-wider rounded-md">
                         JSON Output Verified
                       </span>
                    </div>
                  </div>

                  {/* Interactive JSON Editor Textarea */}
                  <div className="flex-1 min-h-[380px] bg-slate-900/60 border border-slate-800 rounded-2xl p-4 font-mono text-xs overflow-y-auto mb-6">
                    <textarea
                      value={editableJson}
                      onChange={(e) => setEditableJson(e.target.value)}
                      className="w-full h-full bg-transparent border-0 p-0 text-indigo-300 focus:outline-none focus:ring-0 resize-none leading-relaxed font-mono whitespace-pre scrollbar-none"
                      style={{ minHeight: "360px" }}
                    />
                  </div>

                  {/* Save Persist Panel */}
                  <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-indigo-400" /> Auto-validated MongoDB upsert structure.
                    </span>
                    <button
                      onClick={handleSaveToDb}
                      disabled={saving}
                      className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg shadow-emerald-600/10 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 text-sm disabled:opacity-40"
                    >
                      {saving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save solutions data
                        </>
                      )}
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-850 border-dashed rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center h-full min-h-[500px]">
                  <Brain className="w-16 h-16 text-slate-800 mb-6" />
                  <h3 className="text-xl font-black text-white mb-2">Awaiting Generation Prompt</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed mb-8">
                    Specify the city name, province, and target industries on the left. You can also paste raw, unstructured text note outlines to train the deepseek API specifically!
                  </p>
                  
                  {previewError && (
                    <div className="w-full max-w-md p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-3 text-left mb-6 items-start">
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-extrabold text-rose-500 block mb-0.5">Generation Error</span>
                        <span className="text-slate-400 font-medium leading-relaxed">{previewError}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
