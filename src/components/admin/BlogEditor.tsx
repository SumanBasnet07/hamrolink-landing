"use client";
// components/admin/BlogEditor.tsx — full admin editor for blog posts

import { useState, useRef, useCallback } from "react";
import {
  Plus, Trash2, Upload, Eye, EyeOff, Save, Loader2,
  ChevronDown, ChevronUp, GripVertical, X, Check,
  Globe, Languages,
} from "lucide-react";
import type { IBlogPost, IFaqItem } from "@/types/blog";
import { slugify } from "@/lib/slugify";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
  initial?: Partial<IBlogPost>;
  postId?: string;           // if set → edit mode
  onSaved: (post: any) => void;
}

// ─── Initial empty form ───────────────────────────────────────────────────────
const EMPTY_FORM: Partial<IBlogPost> = {
  slug: "",
  title_en: "", title_ne: "",
  excerpt_en: "", excerpt_ne: "",
  body_en: "", body_ne: "",
  metaTitle_en: "", metaTitle_ne: "",
  metaDescription_en: "", metaDescription_ne: "",
  category_en: "", category_ne: "",
  categoryColor: "blue",
  tags_en: [], tags_ne: [],
  featuredImage: "",
  featuredImageAlt_en: "", featuredImageAlt_ne: "",
  emoji: "📝",
  faqs: [],
  schema: { datePublished: "", keywords_en: "", keywords_ne: "", authorName: "HamroLink" },
  published: false,
  readTime_en: "", readTime_ne: "",
};

const EMPTY_FAQ: IFaqItem = {
  question_en: "", question_ne: "",
  answer_en: "",   answer_ne: "",
};

const COLORS = ["blue","violet","emerald","orange","pink","indigo","teal"] as const;

// ─── Small helpers ────────────────────────────────────────────────────────────
function Field({
  label, children, note,
}: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {note && <p className="text-[11px] text-gray-400 mt-1">{note}</p>}
    </div>
  );
}

function Input({
  value, onChange, placeholder = "", className = "", ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & { value: string; onChange: (v: string) => void }) {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${className}`}
    />
  );
}

function Textarea({
  value, onChange, rows = 4, placeholder = "", className = "", ...rest
}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      {...rest}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-y ${className}`}
    />
  );
}

function TagInput({
  tags, onChange, placeholder,
}: { tags: string[]; onChange: (t: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput("");
  };
  return (
    <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-gray-200 rounded-xl min-h-[42px]">
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
          {t}
          <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))}>
            <X className="w-2.5 h-2.5"/>
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
        onBlur={add}
        placeholder={placeholder}
        className="flex-1 min-w-[80px] outline-none text-sm text-gray-700 bg-transparent"
      />
    </div>
  );
}

// ─── Main editor ──────────────────────────────────────────────────────────────
export default function BlogEditor({ initial, postId, onSaved }: Props) {
  const [form, setForm] = useState<Partial<IBlogPost>>({ ...EMPTY_FORM, ...initial });
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "ne">("en");
  const [section, setSection]     = useState<"content"|"seo"|"faqs"|"schema">("content");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = useCallback(<K extends keyof IBlogPost>(key: K, val: IBlogPost[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
  }, []);

  // Auto-slug from EN title
  const handleTitleEn = (v: string) => {
    set("title_en", v);
    if (!form.slug || form.slug === slugify(form.title_en ?? "")) {
      set("slug", slugify(v));
    }
  };

  // Cloudinary upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      set("featuredImage", data.url);
    } catch (err: any) {
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // FAQ helpers
  const addFaq = () => set("faqs", [...(form.faqs ?? []), { ...EMPTY_FAQ }]);
  const updateFaq = (i: number, field: keyof IFaqItem, val: string) => {
    const faqs = [...(form.faqs ?? [])];
    faqs[i] = { ...faqs[i], [field]: val };
    set("faqs", faqs);
  };
  const removeFaq = (i: number) => {
    set("faqs", (form.faqs ?? []).filter((_, idx) => idx !== i));
  };

  // Save
  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        ...form,
        published: publish !== undefined ? publish : form.published,
        publishedAt: (publish || form.published) ? (form.publishedAt ?? new Date().toISOString()) : undefined,
      };

      const url    = postId ? `/api/admin/blog/${postId}` : "/api/admin/blog";
      const method = postId ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSuccess("Saved successfully!");
      onSaved(data.post);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const SECTION_TABS = [
    { id: "content", label: "Content" },
    { id: "seo",     label: "SEO & Meta" },
    { id: "faqs",    label: `FAQs (${form.faqs?.length ?? 0})` },
    { id: "schema",  label: "JSON-LD" },
  ] as const;

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="font-black text-gray-900 text-lg">{postId ? "Edit Post" : "New Post"}</h1>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${form.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
            {form.published ? "Published" : "Draft"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {error && <span className="text-red-500 text-xs font-medium">{error}</span>}
          {success && <span className="text-green-600 text-xs font-medium flex items-center gap-1"><Check className="w-3 h-3"/>{success}</span>}
          <button type="button" onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
            Save Draft
          </button>
          <button type="button" onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-black transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Globe className="w-4 h-4"/>}
            {form.published ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* ── Section tabs ── */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1 w-fit">
          {SECTION_TABS.map((t) => (
            <button key={t.id} type="button" onClick={() => setSection(t.id)}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${section===t.id ? "bg-indigo-600 text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════════ CONTENT ════════════════════ */}
        {section === "content" && (
          <div className="space-y-5">

            {/* Slug + emoji + color row */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-black text-gray-800">Post Identity</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Field label="Slug (URL)" note="Auto-generated from EN title. Edit carefully.">
                    <Input value={form.slug ?? ""} onChange={(v) => set("slug", slugify(v))}
                      placeholder="my-post-slug"/>
                  </Field>
                </div>
                <Field label="Emoji">
                  <Input value={form.emoji ?? ""} onChange={(v) => set("emoji", v)} placeholder="📝"/>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category Color">
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map((c) => (
                      <button key={c} type="button" onClick={() => set("categoryColor", c)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${form.categoryColor === c ? "border-gray-800 scale-110" : "border-transparent hover:scale-105"}`}
                        style={{background: {
                          blue:"#3b82f6",violet:"#7c3aed",emerald:"#059669",
                          orange:"#ea580c",pink:"#ec4899",indigo:"#4f46e5",teal:"#0d9488",
                        }[c]}}
                        title={c}
                      />
                    ))}
                  </div>
                </Field>
                <Field label="Status">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => set("published", !form.published)}
                      className={`w-11 h-6 rounded-full transition-colors ${form.published ? "bg-green-500" : "bg-gray-300"} relative`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-5.5" : "translate-x-0.5"}`}/>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {form.published ? "Published" : "Draft"}
                    </span>
                  </label>
                </Field>
              </div>
            </div>

            {/* Language tab switcher */}
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-gray-400"/>
              <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-0.5">
                {(["en","ne"] as const).map((l) => (
                  <button key={l} type="button" onClick={() => setActiveTab(l)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab===l ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-gray-700"}`}>
                    {l === "en" ? "🇬🇧 English" : "🇳🇵 नेपाली"}
                  </button>
                ))}
              </div>
            </div>

            {/* Bilingual content */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
              {activeTab === "en" ? (
                <>
                  <Field label="Title (English)">
                    <Input value={form.title_en ?? ""} onChange={handleTitleEn}
                      placeholder="Why Every School in Nepal Needs a Website"/>
                  </Field>
                  <Field label="Excerpt (English)" note="Shown on blog index card. Max 500 chars.">
                    <Textarea value={form.excerpt_en ?? ""} onChange={(v) => set("excerpt_en", v)}
                      rows={2} placeholder="Short summary of the article…"/>
                  </Field>
                  <Field label="Category (English)">
                    <Input value={form.category_en ?? ""} onChange={(v) => set("category_en", v)}
                      placeholder="Digital Nepal"/>
                  </Field>
                  <Field label="Tags (English)" note="Press Enter or comma to add">
                    <TagInput tags={form.tags_en ?? []} onChange={(t) => set("tags_en", t)}
                      placeholder="Website, SMB, Nepal…"/>
                  </Field>
                  <Field label="Read Time (English)">
                    <Input value={form.readTime_en ?? ""} onChange={(v) => set("readTime_en", v)}
                      placeholder="7 min read"/>
                  </Field>
                  <Field label="Body (English) — Markdown supported" note="Use Markdown syntax (# Heading, *bold*, etc.). Styling is automatic.">
                    <Textarea value={form.body_en ?? ""} onChange={(v) => set("body_en", v)}
                      rows={16} placeholder="## Introduction\n\nWelcome to our guide..."
                      className="font-mono text-xs"/>
                  </Field>
                </>
              ) : (
                <>
                  <Field label="Title (नेपाली)">
                    <Input value={form.title_ne ?? ""} onChange={(v) => set("title_ne", v)}
                      placeholder="नेपालको हरेक विद्यालयलाई वेबसाइट किन चाहिन्छ"/>
                  </Field>
                  <Field label="Excerpt (नेपाली)">
                    <Textarea value={form.excerpt_ne ?? ""} onChange={(v) => set("excerpt_ne", v)}
                      rows={2} placeholder="लेखको छोटो सारांश…"/>
                  </Field>
                  <Field label="Category (नेपाली)">
                    <Input value={form.category_ne ?? ""} onChange={(v) => set("category_ne", v)}
                      placeholder="डिजिटल नेपाल"/>
                  </Field>
                  <Field label="Tags (नेपाली)">
                    <TagInput tags={form.tags_ne ?? []} onChange={(t) => set("tags_ne", t)}
                      placeholder="वेबसाइट, व्यवसाय…"/>
                  </Field>
                  <Field label="Read Time (नेपाली)">
                    <Input value={form.readTime_ne ?? ""} onChange={(v) => set("readTime_ne", v)}
                      placeholder="७ मिनेट पढाइ"/>
                  </Field>
                  <Field label="Body (नेपाली) — Markdown supported">
                    <Textarea value={form.body_ne ?? ""} onChange={(v) => set("body_ne", v)}
                      rows={16} placeholder="## परिचय\n\nहाम्रो गाइडमा स्वागत छ..."
                      className="font-mono text-xs"/>
                  </Field>
                </>
              )}
            </div>

            {/* Featured image */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-black text-gray-800">Featured Image</h3>
              <div className="flex items-start gap-4">
                {form.featuredImage ? (
                  <div className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.featuredImage} alt="featured"
                      className="w-40 h-24 object-cover rounded-xl border border-gray-200"/>
                    <button type="button" onClick={() => set("featuredImage", "")}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X className="w-3 h-3"/>
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="w-40 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-indigo-400 transition-colors disabled:opacity-60">
                    {uploading
                      ? <Loader2 className="w-5 h-5 animate-spin text-gray-400"/>
                      : <><Upload className="w-5 h-5 text-gray-400"/><span className="text-xs text-gray-400">Upload image</span></>}
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload}/>
                <div className="flex-1 space-y-3">
                  <Field label="Or paste Cloudinary URL">
                    <Input value={form.featuredImage ?? ""} onChange={(v) => set("featuredImage", v)}
                      placeholder="https://res.cloudinary.com/…"/>
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Alt text (EN)">
                      <Input value={form.featuredImageAlt_en ?? ""} onChange={(v) => set("featuredImageAlt_en", v)} placeholder="Alt text"/>
                    </Field>
                    <Field label="Alt text (NE)">
                      <Input value={form.featuredImageAlt_ne ?? ""} onChange={(v) => set("featuredImageAlt_ne", v)} placeholder="वैकल्पिक पाठ"/>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ SEO ════════════════════ */}
        {section === "seo" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
            <h3 className="font-black text-gray-800">SEO & Open Graph</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Meta Title (EN)" note="Max 60 chars">
                <Input value={form.metaTitle_en ?? ""} onChange={(v) => set("metaTitle_en", v)}
                  placeholder="School Website Nepal: Why Every School Should Be Online"/>
              </Field>
              <Field label="Meta Title (NE)">
                <Input value={form.metaTitle_ne ?? ""} onChange={(v) => set("metaTitle_ne", v)}
                  placeholder="नेपालको विद्यालयलाई वेबसाइट किन चाहिन्छ"/>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Meta Description (EN)" note="Max 160 chars">
                <Textarea value={form.metaDescription_en ?? ""} onChange={(v) => set("metaDescription_en", v)}
                  rows={3} placeholder="Discover why a school website matters…"/>
              </Field>
              <Field label="Meta Description (NE)">
                <Textarea value={form.metaDescription_ne ?? ""} onChange={(v) => set("metaDescription_ne", v)}
                  rows={3} placeholder="विद्यालय वेबसाइट किन महत्त्वपूर्ण छ…"/>
              </Field>
            </div>
            {/* Live preview */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Google Preview</p>
              <p className="text-blue-700 text-sm font-medium leading-snug truncate">
                {form.metaTitle_en || form.title_en || "Post Title"}
              </p>
              <p className="text-green-700 text-xs mt-0.5">
                hamrolink.com › blog › {form.slug || "post-slug"}
              </p>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                {form.metaDescription_en || form.excerpt_en || "Post description…"}
              </p>
            </div>
          </div>
        )}

        {/* ════════════════════ FAQs ════════════════════ */}
        {section === "faqs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-gray-800">FAQs</h3>
                <p className="text-xs text-gray-400 mt-0.5">Added to JSON-LD FAQPage schema and shown in the article.</p>
              </div>
              <button type="button" onClick={addFaq}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 transition-colors">
                <Plus className="w-4 h-4"/> Add FAQ
              </button>
            </div>
            {(form.faqs ?? []).length === 0 && (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
                <p className="text-gray-400 text-sm">No FAQs yet. Click "Add FAQ" to get started.</p>
              </div>
            )}
            {(form.faqs ?? []).map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">FAQ {i + 1}</span>
                  <button type="button" onClick={() => removeFaq(i)}
                    className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Question (EN)">
                    <Input value={faq.question_en} onChange={(v) => updateFaq(i, "question_en", v)}
                      placeholder="Can a small school afford a website?"/>
                  </Field>
                  <Field label="Question (NE)">
                    <Input value={faq.question_ne} onChange={(v) => updateFaq(i, "question_ne", v)}
                      placeholder="के सानो विद्यालय वेबसाइट किन्न सक्छ?"/>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Answer (EN)">
                    <Textarea value={faq.answer_en} onChange={(v) => updateFaq(i, "answer_en", v)}
                      rows={3} placeholder="Yes, HamroLink makes it affordable…"/>
                  </Field>
                  <Field label="Answer (NE)">
                    <Textarea value={faq.answer_ne} onChange={(v) => updateFaq(i, "answer_ne", v)}
                      rows={3} placeholder="हो, HamroLink ले यो किफायती बनाउँछ…"/>
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════════════════════ SCHEMA ════════════════════ */}
        {section === "schema" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="font-black text-gray-800">JSON-LD Schema Overrides</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                These fields override auto-generated Article + FAQPage schemas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date Published" note="YYYY-MM-DD format">
                <Input value={form.schema?.datePublished ?? ""}
                  onChange={(v) => set("schema", { ...form.schema, datePublished: v })}
                  placeholder="2026-03-13" type="date"/>
              </Field>
              <Field label="Author Name">
                <Input value={form.schema?.authorName ?? "HamroLink"}
                  onChange={(v) => set("schema", { ...form.schema, authorName: v })}
                  placeholder="HamroLink"/>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Keywords (EN)" note="Comma-separated">
                <Input value={form.schema?.keywords_en ?? ""}
                  onChange={(v) => set("schema", { ...form.schema, keywords_en: v })}
                  placeholder="school website nepal, digital tools for schools"/>
              </Field>
              <Field label="Keywords (NE)">
                <Input value={form.schema?.keywords_ne ?? ""}
                  onChange={(v) => set("schema", { ...form.schema, keywords_ne: v })}
                  placeholder="विद्यालय वेबसाइट नेपाल"/>
              </Field>
            </div>

            {/* Preview generated schema */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Generated JSON-LD Preview</p>
              <pre className="bg-gray-950 text-green-400 text-[10px] p-4 rounded-xl overflow-auto max-h-64 leading-relaxed">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": form.title_en || "Post Title",
  "description": form.metaDescription_en || form.excerpt_en || "",
  "image": form.featuredImage || "",
  "datePublished": form.schema?.datePublished || new Date().toISOString().slice(0,10),
  "author": { "@type": "Organization", "name": form.schema?.authorName || "HamroLink" },
  "keywords": form.schema?.keywords_en || (form.tags_en ?? []).join(", "),
}, null, 2)}
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
