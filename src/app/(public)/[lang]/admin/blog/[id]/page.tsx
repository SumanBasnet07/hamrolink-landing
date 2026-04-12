"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2, ArrowLeft, Check, Trash2,
  MessageSquare, AlertCircle,
} from "lucide-react";
import BlogEditor from "@/components/admin/BlogEditor";

interface Comment {
  _id: string;
  name: string;
  email?: string;
  body: string;
  approved: boolean;
  createdAt: string;
}

export default function EditPostPage() {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"editor" | "comments">("editor");
  const [moderating, setModerating] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setPost(d.post);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const moderate = async (commentId: string, action: "approve_comment" | "delete_comment") => {
    setModerating(commentId);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, commentId }),
      });
      if (!res.ok) throw new Error("Failed");
      const d = await fetch(`/api/admin/blog/${id}`).then((r) => r.json());
      setPost(d.post);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setModerating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-600 font-bold">{error}</p>
        <Link href={`/${lang}/admin/blog`} className="text-indigo-600 text-sm font-bold hover:underline">← Back to posts</Link>
      </div>
    );
  }

  const comments: Comment[] = post?.comments ?? [];
  const pending = comments.filter((c) => !c.approved);
  const approved = comments.filter((c) => c.approved);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-4">
        <Link href={`/${lang}/admin/blog`} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </Link>
        <div className="flex items-center gap-1 ml-4">
          {(["editor", "comments"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${tab === t ? "bg-indigo-100 text-indigo-700" : "text-gray-400 hover:text-gray-700"}`}
            >
              {t === "editor" ? "Editor" : `Comments (${pending.length} pending)`}
            </button>
          ))}
        </div>
      </div>

      {tab === "editor" ? <BlogEditor initial={post} postId={id} onSaved={(updated) => setPost(updated)} /> : null}

      {tab === "comments" ? (
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <h2 className="font-black text-gray-900">Pending Review ({pending.length})</h2>
            </div>
            {pending.length === 0 ? (
              <p className="text-gray-400 text-sm bg-white rounded-2xl p-6 border border-gray-200 text-center">No pending comments. 🎉</p>
            ) : (
              <div className="space-y-3">
                {pending.map((c) => (
                  <div key={c._id} className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                          {c.email ? <span className="text-gray-400 text-xs">{c.email}</span> : null}
                          <span className="text-gray-400 text-xs ml-auto">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{c.body}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => moderate(c._id, "approve_comment")} disabled={moderating === c._id} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-500 transition-colors disabled:opacity-50">
                          {moderating === c._id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}Approve
                        </button>
                        <button onClick={() => moderate(c._id, "delete_comment")} disabled={moderating === c._id} className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors disabled:opacity-50">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-4 h-4 text-green-500" />
              <h2 className="font-black text-gray-900">Published Comments ({approved.length})</h2>
            </div>
            {approved.length === 0 ? (
              <p className="text-gray-400 text-sm bg-white rounded-2xl p-6 border border-gray-200 text-center">No approved comments yet.</p>
            ) : (
              <div className="space-y-3">
                {approved.map((c) => (
                  <div key={c._id} className="bg-white border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                          {c.email ? <span className="text-gray-400 text-xs">{c.email}</span> : null}
                          <span className="text-gray-400 text-xs ml-auto">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{c.body}</p>
                      </div>
                      <button onClick={() => moderate(c._id, "delete_comment")} disabled={moderating === c._id} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                        {moderating === c._id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4 text-red-400" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
