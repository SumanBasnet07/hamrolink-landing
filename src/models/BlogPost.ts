// models/BlogPost.ts — Mongoose model for blog posts

import mongoose from "mongoose";

// ─── Sub-schemas ──────────────────────────────────────────────────────────────
const CommentSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true, maxlength: 120 },
    email:     { type: String, default: "" },
    body:      { type: String, required: true, maxlength: 2000 },
    approved:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

const FAQItemSchema = new mongoose.Schema({
  question_en: { type: String, required: true },
  question_ne: { type: String, required: true },
  answer_en:   { type: String, required: true },
  answer_ne:   { type: String, required: true },
}, { _id: false });

const SchemaOverrideSchema = new mongoose.Schema({
  datePublished:  { type: String, default: "" },
  keywords_en:    { type: String, default: "" },
  keywords_ne:    { type: String, default: "" },
  authorName:     { type: String, default: "HamroLink" },
}, { _id: false });

// ─── Main schema ──────────────────────────────────────────────────────────────
const BlogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Bilingual content
    title_en:   { type: String, required: true, maxlength: 220 },
    title_ne:   { type: String, required: true, maxlength: 220 },
    excerpt_en: { type: String, required: true, maxlength: 500 },
    excerpt_ne: { type: String, required: true, maxlength: 500 },
    body_en:    { type: String, required: true },
    body_ne:    { type: String, required: true },

    // Meta SEO
    metaTitle_en:       { type: String, default: "" },
    metaTitle_ne:       { type: String, default: "" },
    metaDescription_en: { type: String, default: "" },
    metaDescription_ne: { type: String, default: "" },

    // Taxonomy
    category_en:   { type: String, required: true },
    category_ne:   { type: String, required: true },
    categoryColor: {
      type: String,
      enum: ["blue","violet","emerald","orange","pink","indigo","teal"],
      default: "blue",
    },
    tags_en: { type: mongoose.Schema.Types.Mixed, default: [] },
    tags_ne: { type: mongoose.Schema.Types.Mixed, default: [] },

    // Media
    featuredImage:      { type: String, default: "" },
    featuredImageAlt_en:{ type: String, default: "" },
    featuredImageAlt_ne:{ type: String, default: "" },
    emoji:              { type: String, default: "📝" },

    // FAQs
    faqs: [FAQItemSchema],

    // JSON-LD
    schema: { type: SchemaOverrideSchema, default: () => ({}) },

    // Engagement
    likes:    { type: Number, default: 0 },
    likedIps: { type: mongoose.Schema.Types.Mixed, default: [] },
    comments: [CommentSchema],

    // Status
    published:   { type: Boolean, default: false },
    publishedAt: { type: Date },
    readTime_en: { type: String, default: "5 min read" },
    readTime_ne: { type: String, default: "५ मिनेट पढाइ" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
BlogPostSchema.index({ published: 1, publishedAt: -1 });
BlogPostSchema.index({ category_en: 1 });

// ─── Virtuals ─────────────────────────────────────────────────────────────────
BlogPostSchema.virtual("commentCount").get(function () {
  return (this.comments as any[]).filter((c) => c.approved).length;
});

// ─── Model ────────────────────────────────────────────────────────────────────
const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
