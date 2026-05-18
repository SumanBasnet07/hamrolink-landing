"use client";
import React, { useState, useEffect } from "react";

export default function AdminAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      setMounted(true);
      try {
        const res = await fetch(`/api/admin/auth?t=${Date.now()}`, { method: "GET", cache: "no-store" });
        const data = await res.json();
        if (!active) return;
        setIsAuthenticated(Boolean(data?.authenticated));
        if (!res.ok && data?.error) setError(data.error);
      } catch {
        if (active) setError("Unable to verify admin session");
      } finally {
        if (active) setChecking(false);
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password: pass }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Invalid ID or Password");
        return;
      }

      setIsAuthenticated(true);
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (checking) {
    return (
      <div className="bg-[#0b0f1a] text-white flex items-center justify-center min-h-screen p-6 font-sans">
        <div className="text-sm font-black text-white/70">Checking admin session...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-[#0b0f1a] text-white flex items-center justify-center min-h-screen p-6 font-sans">
        <div className="bg-[#111827] p-8 sm:p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/5 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"/>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"/>
          
          <div className="relative">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl shadow-indigo-900/40">
              <span className="text-4xl">🔒</span>
            </div>
            
            <h1 className="text-3xl font-black mb-2 text-center text-white">Admin Access</h1>
            <p className="text-white/40 text-sm text-center mb-8">Please enter your credentials to continue</p>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-white/30 mb-2 ml-1">Admin ID</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-white/30 mb-2 ml-1">Password</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2">
                  <span className="text-base">⚠️</span>
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-900/20 mt-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Verifying..." : "Verify Identity"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
