// app/api/blog/route.ts — public: list published posts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit    = Number(searchParams.get("limit"))    || 20;
    const page     = Number(searchParams.get("page"))     || 1;
    const category = searchParams.get("category")         || "";

    const filter: Record<string, any> = { published: true };
    if (category) filter.category_en = new RegExp(category, "i");

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select(
          "slug title_en title_ne excerpt_en excerpt_ne category_en category_ne " +
          "categoryColor tags_en tags_ne featuredImage emoji likes publishedAt " +
          "readTime_en readTime_ne createdAt comments"
        )
        .lean(),
      BlogPost.countDocuments(filter),
    ]);

    // Compute commentCount from approved comments only
    const mapped = (posts as any[]).map((p) => ({
      ...p,
      _id: p._id.toString(),
      commentCount: (p.comments ?? []).filter((c: any) => c.approved).length,
      comments: undefined,
    }));

    return NextResponse.json({ posts: mapped, total, page, limit });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
