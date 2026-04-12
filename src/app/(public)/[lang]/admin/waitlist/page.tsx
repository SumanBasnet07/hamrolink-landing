"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Mail, 
  Award, 
  Calendar, 
  Search, 
  FileText,
  ShieldCheck,
  RefreshCw,
  Building2,
  GraduationCap
} from "lucide-react";

export default function AdminWaitlistPage({ params }: { params: any }) {
  const { lang } = React.use(params) as any;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, school: 0, shop: 0 });
  const [secret, setSecret] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (inputSecret?: string) => {
    setLoading(true);
    setError("");
    const sec = inputSecret || secret;
    try {
      const headers: Record<string, string> = {};
      if (sec.trim()) headers["x-admin-secret"] = sec.trim();

      const res = await fetch("/api/admin/waitlist", {
        method: "GET",
        headers,
      });
      const data = await res.json();
      
      if (data.error === "Unauthorized") {
        setAuthorized(false);
        setError("Invalid Admin Secret");
      } else if (data.success) {
        setUsers(data.users);
        setAuthorized(true);
        
        // Calculate stats
        const counts = data.users.reduce((acc: any, u: any) => {
          if (u.businessType === "school") acc.school++;
          else if (u.businessType === "shop") acc.shop++;
          return acc;
        }, { total: data.users.length, school: 0, shop: 0 });
        setStats(counts);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-black text-center text-slate-900 mb-2">Admin Access</h1>
          <p className="text-slate-500 text-center mb-8">Enter your secret key to view the waitlist.</p>
          
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
            placeholder="Enter Admin Secret"
            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl mb-4 focus:outline-none focus:border-indigo-500 transition-all font-medium"
          />
          
          {error && <p className="text-red-500 text-sm font-bold text-center mb-4">{error}</p>}
          
          <button 
            onClick={() => fetchData()}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Access Dashboard"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-600" /> Waitlist Management
            </h1>
            <p className="text-slate-500 font-medium">Tracking early access leads and rewards.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                   <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</div>
                   <div className="text-xl font-black text-slate-900">{stats.total}</div>
                </div>
             </div>
             <button 
                onClick={() => fetchData()}
                className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
              >
                <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <StatCard icon={<Building2 />} label="Shops" value={stats.shop} color="orange" />
           <StatCard icon={<GraduationCap />} label="Schools" value={stats.school} color="emerald" />
           <StatCard icon={<Award />} label="Position Limit" value="150" color="indigo" />
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
             <h2 className="text-lg font-black text-slate-800">Email Leads</h2>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input placeholder="Search leads..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Position</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">User Details</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status/Reward</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Signed Up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="text-lg font-black text-slate-900">#{u.position}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${u.businessType === 'school' ? 'bg-emerald-500' : 'bg-orange-500'}`}>
                          {u.email[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{u.name || "Anonymous"}</div>
                          <div className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3.5 h-3.5" /> {u.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider w-fit
                            ${u.rewardType === 'LOCAL_START' ? 'bg-indigo-100 text-indigo-700' : 
                              u.rewardType === '100_CREDITS' ? 'bg-amber-100 text-amber-700' : 
                              'bg-slate-100 text-slate-600'}`}>
                            <Award className="w-3 h-3" /> {u.rewardType.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 px-1">
                             {u.businessType === 'school' ? <GraduationCap className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                             {u.businessType || "N/A"} {u.studentCount ? `(${u.studentCount})` : ''}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-slate-900 font-bold text-sm">{new Date(u.createdAt).toLocaleDateString()}</div>
                      <div className="text-slate-400 text-xs mt-1">{new Date(u.createdAt).toLocaleTimeString()}</div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Users className="w-12 h-12 text-slate-200" />
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No signups found yet</p>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
   const colors: any = {
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      orange: "bg-orange-50 text-orange-600 border-orange-100"
   };
   
   return (
      <div className={`p-8 bg-white border rounded-[2rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-all`}>
         <div className={`absolute top-0 right-0 p-8 text-slate-50 opacity-50 group-hover:scale-110 transition-transform`}>
            {React.cloneElement(icon, { size: 64 })}
         </div>
         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${colors[color]}`}>
            {React.cloneElement(icon, { className: "w-7 h-7" })}
         </div>
         <div className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">{label}</div>
         <div className="text-4xl font-black text-slate-900">{value}</div>
      </div>
   );
}
