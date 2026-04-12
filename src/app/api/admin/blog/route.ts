// app/api/admin/blog/route.ts — admin: list all posts, create new

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; 
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify, estimateReadTime } from "@/lib/slugify";
import { requireAdminSession } from "@/lib/adminAuth";

export const runtime = "nodejs";

// ─── GET — list all (incl. drafts) ───────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const authError = requireAdminSession(req);
    if (authError) return authError;

    await connectDB();
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .select(
        "slug title_en title_ne published likes publishedAt createdAt " +
        "category_en categoryColor emoji comments"
      )
      .lean();

    const mapped = (posts as any[]).map((p) => ({
      ...p,
      _id:          p._id.toString(),
      commentCount: (p.comments ?? []).length,
      approvedCount:(p.comments ?? []).filter((c: any) => c.approved).length,
      comments:     undefined,
    }));

    return NextResponse.json({ posts: mapped });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── POST — create new post ───────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const authError = requireAdminSession(req);
    if (authError) return authError;

    await connectDB();
    const data = await req.json();

    // Auto-generate slug from EN title if not provided
    const slug = data.slug
      ? slugify(data.slug)
      : slugify(data.title_en ?? "untitled-post");

    // Estimate read time if not provided
    const readTime_en = data.readTime_en || estimateReadTime(data.body_en ?? "", "en");
    const readTime_ne = data.readTime_ne || estimateReadTime(data.body_ne ?? "", "ne");

    // Set publishedAt if publishing
    const publishedAt = data.published ? data.publishedAt ?? new Date() : undefined;

    const post = await BlogPost.create({
      ...data,
      slug,
      readTime_en,
      readTime_ne,
      publishedAt,
      likes:    0,
      likedIps: [],
      comments: [],
    });

    // On-demand revalidation for blog index and new post
    try {
      revalidatePath("/en/blog");
      revalidatePath("/ne/blog");
      if (post.published) {
        revalidatePath(`/en/blog/${slug}`);
        revalidatePath(`/ne/blog/${slug}`);
      }
    } catch (e) {
      console.error("Revalidation failed:", e);
    }

    return NextResponse.json({ post: { ...post.toJSON(), _id: post._id.toString() } }, { status: 201 });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
