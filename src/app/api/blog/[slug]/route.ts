// app/api/blog/[slug]/route.ts — get post, like, comment

import { NextRequest, NextResponse } from "next/server";
import { createHash, randomUUID } from "crypto";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const runtime = "nodejs";

const LIKE_COOKIE = "hl_like_id";

function getLikeIdentity(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = xff || req.headers.get("x-real-ip") || "unknown";
  const cookieId = req.cookies.get(LIKE_COOKIE)?.value || randomUUID();
  const identity = createHash("sha256").update(`${cookieId}::${ip}`).digest("hex").slice(0, 40);
  return { identity, cookieId, hadCookie: !!req.cookies.get(LIKE_COOKIE)?.value };
}

// ─── GET /api/blog/[slug] ─────────────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const post = await BlogPost.findOne({ slug, published: true }).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const p = post as any;
    // Only return approved comments
    const approvedComments = (p.comments ?? [])
      .filter((c: any) => c.approved)
      .map((c: any) => ({
        _id:       c._id?.toString(),
        name:      c.name,
        body:      c.body,
        createdAt: c.createdAt,
      }));

    return NextResponse.json({
      ...p,
      _id:      p._id.toString(),
      comments: approvedComments,
      likedIps: undefined,    // never expose IPs to client
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── POST /api/blog/[slug] — like or comment ──────────────────────────────────
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const body   = await req.json();
    const action = body.action as "like" | "comment";

    const { identity, cookieId, hadCookie } = getLikeIdentity(req);

    if (action === "like") {
      const post = await BlogPost.findOne({ slug, published: true });
      if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

      const alreadyLiked = post.likedIps.includes(identity);
      if (alreadyLiked) {
        // Toggle off
        post.likedIps = post.likedIps.filter((i: string) => i !== identity);
        post.likes    = Math.max(0, post.likes - 1);
      } else {
        post.likedIps.push(identity);
        post.likes += 1;
      }
      await post.save();
      const response = NextResponse.json({ likes: post.likes, liked: !alreadyLiked });
      if (!hadCookie) {
        response.cookies.set({
          name: LIKE_COOKIE,
          value: cookieId,
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });
      }
      return response;
    }

    if (action === "comment") {
      const { name, email, comment: commentBody } = body;
      if (!name?.trim() || !commentBody?.trim()) {
        return NextResponse.json({ error: "Name and comment are required" }, { status: 400 });
      }
      const post = await BlogPost.findOneAndUpdate(
        { slug, published: true },
        {
          $push: {
            comments: {
              name:     name.trim().slice(0, 120),
              email:    (email ?? "").trim().slice(0, 200),
              body:     commentBody.trim().slice(0, 2000),
              approved: false,
            },
          },
        },
        { new: true }
      ).lean();
      if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true, message: "Comment submitted for review." });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
