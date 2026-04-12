"use client";

import React, { useState } from "react";
import { Bot, RefreshCw, ShieldCheck, MessageSquare, Calendar, BarChart3 } from "lucide-react";

type InsightLead = {
  _id: string;
  dayKey: string;
  lang: string;
  page: string;
  planFocus: string;
  businessIntent: string;
  message: string;
  reply: string;
  createdAt: string;
};

type IntentSummary = {
  intent: string;
  count: number;
};

export default function AdminChatInsightsPage() {
  const [secret, setSecret] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<InsightLead[]>([]);
  const [intents, setIntents] = useState<IntentSummary[]>([]);

  async function fetchInsights(nextSecret?: string) {
    setLoading(true);
    setError("");
    const currentSecret = nextSecret ?? secret;

    try {
      const headers: Record<string, string> = {};
      if (currentSecret.trim()) headers["x-admin-secret"] = currentSecret.trim();

      const res = await fetch(`/api/admin/chat-insights?date=${date}&limit=50`, {
        method: "GET",
        headers,
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthorized(false);
        setError(data?.error || "Failed to fetch insights");
        return;
      }

      setAuthorized(true);
      setLeads(data.leads || []);
      setIntents(data.intents || []);
    } catch {
      setError("Failed to fetch insights");
    } finally {
      setLoading(false);
    }
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <ShieldCheck className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-black text-center text-slate-900 mb-2">Admin Chat Insights</h1>
          <p className="text-slate-500 text-center mb-8">Enter your admin secret to inspect chatbot conversations.</p>

          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchInsights()}
            placeholder="Enter Admin Secret"
            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl mb-4 focus:outline-none focus:border-amber-500 transition-all font-medium"
          />

          {error ? <p className="text-red-500 text-sm font-bold text-center mb-4">{error}</p> : null}

          <button
            onClick={() => fetchInsights()}
            disabled={loading}
            className="w-full py-4 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Open Insights"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Bot className="w-8 h-8 text-amber-600" /> Chat Insights
            </h1>
            <p className="text-slate-500 font-medium">Inspect real chatbot questions and intent signals.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-slate-200 bg-white font-semibold"
            />
            <button
              onClick={() => fetchInsights(secret)}
              className="px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center gap-2 font-black"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Messages</p>
            </div>
            <p className="text-4xl font-black text-slate-900">{leads.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-amber-600" />
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Date</p>
            </div>
            <p className="text-2xl font-black text-slate-900">{date}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Top Intent</p>
            </div>
            <p className="text-2xl font-black text-slate-900">{intents[0]?.intent || "none"}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-black text-slate-900 mb-4">Intent Summary</h2>
            <div className="space-y-3">
              {intents.length ? intents.map((item) => (
                <div key={item.intent} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-bold text-slate-700 capitalize">{item.intent}</span>
                  <span className="text-sm font-black text-amber-700">{item.count}</span>
                </div>
              )) : <p className="text-slate-500 font-semibold">No data for this date.</p>}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-black text-slate-900">Conversation Leads</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {leads.length ? leads.map((lead) => (
                <div key={lead._id} className="p-6 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-black uppercase tracking-wider">{lead.businessIntent || "general"}</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-wider">{lead.lang}</span>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-black uppercase tracking-wider">{lead.planFocus}</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">User</p>
                    <p className="text-slate-900 font-semibold leading-relaxed">{lead.message}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Assistant</p>
                    <p className="text-slate-600 font-medium leading-relaxed">{lead.reply}</p>
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center text-slate-500 font-semibold">No conversations found for this date.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
