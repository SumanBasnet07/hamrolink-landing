"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Globe, MessageSquare,
  Heart, Loader2, RefreshCw, Search, AlertCircle,
} from "lucide-react";

interface PostRow {
  _id: string;
  slug: string;
  title_en: string;
  title_ne: string;
  published: boolean;
  likes: number;
  commentCount: number;
  approvedCount: number;
  category_en: string;
  categoryColor: string;
  emoji: string;
  createdAt: string;
  publishedAt?: string;
}

const COLOR_PILL: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  violet: "bg-violet-100 text-violet-700",
  emerald: "bg-emerald-100 text-emerald-700",
  orange: "bg-orange-100 text-orange-700",
  pink: "bg-pink-100 text-pink-700",
  indigo: "bg-indigo-100 text-indigo-700",
  teal: "bg-teal-100 text-teal-700",
};

export default function AdminBlogListPage() {
  const { lang } = useParams<{ lang: string }>();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data.posts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setPosts((p) => p.filter((x) => x._id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title_en.toLowerCase().includes(search.toLowerCase()) ||
      p.title_ne.includes(search) ||
      p.slug.includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {posts.length} total · {posts.filter((p) => p.published).length} published
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchPosts} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href={`/${lang}/admin/blog/new`}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-500 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 mb-4 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-20 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-20 text-center">
            <p className="text-gray-400">No posts found.</p>
            <Link
              href={`/${lang}/admin/blog/new`}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 transition-colors"
            >
              <Plus className="w-4 h-4" /> Create your first post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Post</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Engagement</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl shrink-0">{post.emoji}</span>
                        <div>
                          <p className="font-bold text-gray-900 leading-snug line-clamp-1">{post.title_en}</p>
                          <p className="text-gray-400 text-xs mt-0.5 font-mono">/blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${COLOR_PILL[post.categoryColor] ?? "bg-gray-100 text-gray-600"}`}>
                        {post.category_en}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {post.published ? <><Eye className="w-3 h-3" />Published</> : <><EyeOff className="w-3 h-3" />Draft</>}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3 text-gray-500 text-xs">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" />{post.likes}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3 text-blue-400" />{post.approvedCount}/{post.commentCount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {post.published ? (
                          <Link href={`/${lang}/blog/${post.slug}`} target="_blank" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="View live">
                            <Globe className="w-4 h-4 text-gray-400" />
                          </Link>
                        ) : null}
                        <Link href={`/${lang}/admin/blog/${post._id}`} className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4 text-indigo-500" />
                        </Link>
                        <button onClick={() => handleDelete(post._id, post.title_en)} disabled={deleting === post._id} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          {deleting === post._id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4 text-red-400" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
