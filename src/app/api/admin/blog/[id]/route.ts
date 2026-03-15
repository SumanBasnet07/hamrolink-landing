// app/api/admin/blog/[id]/route.ts — get, update, delete single post

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify, estimateReadTime } from "@/lib/slugify";

export const runtime = "nodejs";

// ─── GET ─────────────────────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const post = await BlogPost.findById(id).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post: { ...(post as any), _id: (post as any)._id.toString() } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── PUT — update ─────────────────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const data = await req.json();
    const { id } = await params;

    if (data.slug) data.slug = slugify(data.slug);
    if (data.body_en && !data.readTime_en) data.readTime_en = estimateReadTime(data.body_en, "en");
    if (data.body_ne && !data.readTime_ne) data.readTime_ne = estimateReadTime(data.body_ne, "ne");
    if (data.published && !data.publishedAt) data.publishedAt = new Date();

    const post = await BlogPost.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // On-demand revalidation
    try {
      revalidatePath("/en/blog");
      revalidatePath("/ne/blog");
      revalidatePath(`/en/blog/${(post as any).slug}`);
      revalidatePath(`/ne/blog/${(post as any).slug}`);
    } catch (e) {
      console.error("Revalidation failed:", e);
    }

    return NextResponse.json({ post: { ...(post as any), _id: (post as any)._id.toString() } });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "Slug already in use." }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const post = await BlogPost.findByIdAndDelete(id).lean();
    
    if (post) {
      try {
        revalidatePath("/en/blog");
        revalidatePath("/ne/blog");
        revalidatePath(`/en/blog/${(post as any).slug}`);
        revalidatePath(`/ne/blog/${(post as any).slug}`);
      } catch (e) {
        console.error("Revalidation failed:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── PATCH — comment moderation (approve / delete) ───────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { action, commentId } = await req.json();

    if (action === "approve_comment") {
      await BlogPost.findOneAndUpdate(
        { _id: id, "comments._id": commentId },
        { $set: { "comments.$.approved": true } }
      );
      return NextResponse.json({ success: true });
    }

    if (action === "delete_comment") {
      await BlogPost.findByIdAndUpdate(id, {
        $pull: { comments: { _id: commentId } },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
