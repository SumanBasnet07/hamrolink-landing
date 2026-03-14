// types/blog.ts — shared TypeScript types for the blog system

export type Lang = "en" | "ne";

// ─── Schema.org JSON-LD ───────────────────────────────────────────────────────
export interface ArticleSchemaData {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  keywords?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── MongoDB document types ───────────────────────────────────────────────────
export interface IComment {
  _id?: string;
  name: string;
  email?: string;
  body: string;
  approved: boolean;
  createdAt: Date | string;
}

export interface IFaqItem {
  question_en: string;
  question_ne: string;
  answer_en: string;
  answer_ne: string;
}

export interface ISchemaOverride {
  datePublished?: string;
  keywords_en?: string;
  keywords_ne?: string;
  authorName?: string;
}

export interface IBlogPost {
  _id?: string;
  slug: string;

  // Bilingual fields
  title_en: string;
  title_ne: string;
  excerpt_en: string;
  excerpt_ne: string;
  body_en: string;   // HTML / rich text
  body_ne: string;

  // Meta
  metaTitle_en?: string;
  metaTitle_ne?: string;
  metaDescription_en?: string;
  metaDescription_ne?: string;

  // Taxonomy
  category_en: string;
  category_ne: string;
  categoryColor: "blue" | "violet" | "emerald" | "orange" | "pink" | "indigo" | "teal";
  tags_en: string[];
  tags_ne: string[];

  // Media
  featuredImage?: string;          // Cloudinary URL
  featuredImageAlt_en?: string;
  featuredImageAlt_ne?: string;
  emoji?: string;

  // FAQs
  faqs: IFaqItem[];

  // JSON-LD overrides
  schema: ISchemaOverride;

  // Engagement
  likes: number;
  likedIps: string[];              // track unique likes by IP
  comments: IComment[];

  // Status
  published: boolean;
  publishedAt?: Date | string;
  readTime_en?: string;
  readTime_ne?: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ─── API shapes ───────────────────────────────────────────────────────────────
export interface BlogPostSummary {
  _id: string;
  slug: string;
  title_en: string;
  title_ne: string;
  excerpt_en: string;
  excerpt_ne: string;
  category_en: string;
  category_ne: string;
  categoryColor: IBlogPost["categoryColor"];
  tags_en: string[];
  tags_ne: string[];
  featuredImage?: string;
  emoji?: string;
  likes: number;
  commentCount: number;
  published: boolean;
  publishedAt?: string;
  readTime_en?: string;
  readTime_ne?: string;
  createdAt: string;
}
