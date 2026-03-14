// lib/slugify.ts — generate URL-safe slugs from English titles

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // remove non-word chars
    .replace(/[\s_-]+/g, "-")   // spaces/underscores → dashes
    .replace(/^-+|-+$/g, "");   // trim leading/trailing dashes
}

/**
 * Estimate read time from HTML body content.
 * Average reading speed: 200 words/min.
 */
export function estimateReadTime(html: string, lang: "en" | "ne" = "en"): string {
  const text       = html.replace(/<[^>]+>/g, " ");
  const wordCount  = text.trim().split(/\s+/).length;
  const minutes    = Math.max(1, Math.round(wordCount / 200));
  return lang === "ne" ? `${minutes} मिनेट पढाइ` : `${minutes} min read`;
}
