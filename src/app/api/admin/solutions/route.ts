// src/app/api/admin/solutions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Location } from "@/models/Location";
import { requireAdminSessionOrHeaderSecret } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

// ─── ISR Cache Strategy (Vercel) ──────────────────────────────────────────────
//
// On Vercel, ISR (Incremental Static Regeneration) does NOT write to the
// filesystem — it writes to Vercel's Data Cache (edge CDN layer).
//
// revalidatePath() triggers an on-demand purge of specific cached paths in that
// edge cache. This is how we ensure pSEO pages reflect DB changes immediately
// without waiting for the 7-day revalidate window.
//
// Strategy used here:
//  - POST (upsert): revalidate only the specific solutions pages for the
//    affected slug + the solutions sitemap (so Google's next crawl gets fresh URLs)
//  - DELETE: same targeted revalidation
//
// We intentionally avoid revalidatePath("/", "layout") because that purges the
// ENTIRE site cache and causes cold-start rendering for all pages on Vercel,
// which is expensive and unnecessary for a single location change.
// ──────────────────────────────────────────────────────────────────────────────

const INDUSTRY_KEYS = ["ecommerce", "consultancy", "restaurant", "school", "club", "business", "portfolio", "health"];

/**
 * Surgically revalidate only the affected ISR paths on Vercel's edge cache.
 * Called after any create/update/delete operation.
 */
function revalidateLocationPaths(slug: string, industries?: string[]) {
  const targetIndustries = industries && industries.length > 0 ? industries : INDUSTRY_KEYS;

  // 1. Revalidate each specific solutions landing page for this slug
  for (const industry of targetIndustries) {
    // Bare path — middleware rewrites /solutions/... → /en/solutions/... internally
    revalidatePath(`/solutions/${industry}/${slug}`);
    // Also revalidate the /ne/ variant in case it was cached
    revalidatePath(`/ne/solutions/${industry}/${slug}`);
  }

  // 2. Revalidate the solutions sitemap so Googlebot gets the updated URL list
  revalidatePath("/solutions/sitemap.xml");
}

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate Request
    const authError = requireAdminSessionOrHeaderSecret(request);
    if (authError) return authError;

    // 2. Fetch Locations
    await connectDB();
    const locations = await Location.find().sort({ city_name: 1 });

    return NextResponse.json({
      success: true,
      count: locations.length,
      locations
    });
  } catch (error: any) {
    console.error("GET Locations API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate Request
    const authError = requireAdminSessionOrHeaderSecret(request);
    if (authError) return authError;

    const locationData = await request.json();

    if (!locationData.slug || !locationData.city_name || !locationData.province) {
      return NextResponse.json({
        error: "Missing required fields: slug, city_name, and province are mandatory.",
      }, { status: 400 });
    }

    // 2. Connect DB & Perform Upsert (Create or Update)
    await connectDB();

    const slug = locationData.slug.toLowerCase().trim();
    const updatedLocation = await Location.findOneAndUpdate(
      { slug },
      { ...locationData, slug },
      { upsert: true, new: true }
    );

    // 3. Targeted ISR revalidation — only purge the affected location's pages
    //    and the sitemap. Does NOT nuke the entire site cache.
    const activeIndustries = Object.keys(locationData.industries_data || {});
    revalidateLocationPaths(slug, activeIndustries);

    return NextResponse.json({
      success: true,
      location: updatedLocation,
    });
  } catch (error: any) {
    console.error("POST Location API Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 1. Authenticate Request
    const authError = requireAdminSessionOrHeaderSecret(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    let slug = searchParams.get("slug");

    if (!slug) {
      const body = await request.json().catch(() => ({}));
      slug = body.slug;
    }

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required to delete." }, { status: 400 });
    }

    // 2. Connect DB & fetch industries before deleting (needed for targeted revalidation)
    await connectDB();
    const existing = await Location.findOne({ slug: slug.toLowerCase().trim() }).lean() as any;
    const activeIndustries = existing ? Object.keys(existing.industries_data || {}) : [];

    const result = await Location.findOneAndDelete({ slug: slug.toLowerCase().trim() });

    if (!result) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    // 3. Targeted ISR revalidation for the deleted location's pages + sitemap
    revalidateLocationPaths(slug.toLowerCase().trim(), activeIndustries);

    return NextResponse.json({
      success: true,
      message: `Successfully deleted location: ${slug}`,
    });
  } catch (error: any) {
    console.error("DELETE Location API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
