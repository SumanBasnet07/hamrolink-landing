"use client";
// components/blog/LikeCommentSection.tsx — client-side likes + comments

import { useState, useEffect } from "react";
import { Heart, MessageSquare, Send, Loader2, CheckCircle, AlertCircle, User } from "lucide-react";

type Lang = "en" | "ne";

interface Comment {
  _id: string;
  name: string;
  body: string;
  createdAt: string;
}

interface Props {
  slug:             string;
  lang:             Lang;
  initialLikes:     number;
  initialComments:  Comment[];
}

// ─── Strings ──────────────────────────────────────────────────────────────────
const T = {
  en: {
    likes:           (n: number) => `${n} ${n === 1 ? "like" : "likes"}`,
    like:            "Like this article",
    liked:           "You liked this",
    comments:        "Comments",
    noComments:      "Be the first to leave a comment.",
    pending:         "Your comment has been submitted for review. It will appear once approved.",
    leave:           "Leave a Comment",
    name:            "Your name *",
    email:           "Email (optional, never shown)",
    comment:         "Your comment *",
    submit:          "Submit Comment",
    namePlaceholder: "Aarav Sharma",
    emailPlaceholder:"aarav@example.com",
    commentPlaceholder: "Share your thoughts on this article…",
  },
  ne: {
    likes:           (n: number) => `${n} लाइक`,
    like:            "यो लेख मन पर्यो",
    liked:           "तपाईंले लाइक गर्नुभयो",
    comments:        "टिप्पणीहरू",
    noComments:      "पहिलो टिप्पणी छोड्नुहोस्।",
    pending:         "तपाईंको टिप्पणी समीक्षाका लागि पेश गरिएको छ। स्वीकृत भएपछि देखिनेछ।",
    leave:           "टिप्पणी छोड्नुहोस्",
    name:            "तपाईंको नाम *",
    email:           "इमेल (वैकल्पिक, कहिल्यै देखाइँदैन)",
    comment:         "तपाईंको टिप्पणी *",
    submit:          "टिप्पणी पेश गर्नुहोस्",
    namePlaceholder: "आरव शर्मा",
    emailPlaceholder:"aarav@example.com",
    commentPlaceholder: "यो लेखमा आफ्नो विचार साझा गर्नुहोस्…",
  },
};

// ─── Like button ──────────────────────────────────────────────────────────────
function LikeButton({ slug, lang, initialLikes }: { slug: string; lang: Lang; initialLikes: number }) {
  const t  = T[lang];
  const [likes,   setLikes]   = useState(initialLikes);
  const [liked,   setLiked]   = useState(false);
  const [loading, setLoading] = useState(false);

  // Check localStorage for previously liked
  useEffect(() => {
    const stored = localStorage.getItem(`liked_${slug}`);
    if (stored === "1") setLiked(true);
  }, [slug]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res  = await fetch(`/api/blog/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(data.liked);
      localStorage.setItem(`liked_${slug}`, data.liked ? "1" : "0");
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      title={liked ? t.liked : t.like}
      className={`group flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 font-bold text-sm transition-all
        ${liked
          ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
          : "bg-white border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
        } disabled:opacity-60`}>
      {loading
        ? <Loader2 className="w-5 h-5 animate-spin"/>
        : <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${liked ? "fill-red-500 text-red-500" : ""}`}/>}
      <span>{t.likes(likes)}</span>
    </button>
  );
}

// ─── Comment form ─────────────────────────────────────────────────────────────
function CommentForm({ slug, lang, onSubmitted }: { slug: string; lang: Lang; onSubmitted: () => void }) {
  const t = T[lang];
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "comment", name, email, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDone(true);
      setName(""); setEmail(""); setComment("");
      onSubmitted();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5"/>
      <p className="text-green-700 text-sm font-medium">{t.pending}</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
      <h4 className="font-black text-gray-900">{t.leave}</h4>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">{t.name}</label>
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            required placeholder={t.namePlaceholder}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">{t.email}</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">{t.comment}</label>
        <textarea
          value={comment} onChange={(e) => setComment(e.target.value)}
          required rows={4} placeholder={t.commentPlaceholder}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-y"
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0"/>{error}
        </div>
      )}
      <button type="submit" disabled={loading || !name.trim() || !comment.trim()}
        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50">
        {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
        {t.submit}
      </button>
    </form>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function LikeCommentSection({ slug, lang, initialLikes, initialComments }: Props) {
  const t = T[lang];
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [refreshKey, setRefreshKey] = useState(0);

  // After comment submission, optimistically show the pending message
  // (no need to refetch — admin must approve)

  return (
    <div className="mt-14 space-y-10">

      {/* ── Like bar ── */}
      <div className="flex items-center gap-4 py-6 border-y border-gray-100">
        <LikeButton slug={slug} lang={lang} initialLikes={initialLikes}/>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <MessageSquare className="w-4 h-4"/>
          <span>{comments.length} {lang === "ne" ? "टिप्पणीहरू" : "comments"}</span>
        </div>
      </div>

      {/* ── Comments list ── */}
      <section>
        <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500"/>
          {t.comments} {comments.length > 0 && <span className="text-gray-400 font-normal text-base">({comments.length})</span>}
        </h3>

        {comments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
            <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-2"/>
            <p className="text-gray-400 text-sm">{t.noComments}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-indigo-500"/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-xs">
                        {new Date(c.createdAt).toLocaleDateString(lang === "ne" ? "ne-NP" : "en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Comment form ── */}
      <CommentForm slug={slug} lang={lang} onSubmitted={() => setRefreshKey(k => k + 1)}/>

    </div>
  );
}
