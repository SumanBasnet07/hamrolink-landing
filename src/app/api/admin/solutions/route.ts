// src/app/api/admin/solutions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Location } from "@/models/Location";
import { requireAdminSessionOrHeaderSecret } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

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
        error: "Missing required fields: slug, city_name, and province are mandatory." 
      }, { status: 400 });
    }

    // 2. Connect DB & Perform Upsert (Create or Update)
    await connectDB();
    
    const slug = locationData.slug.toLowerCase().trim();
    const updatedLocation = await Location.findOneAndUpdate(
      { slug },
      { 
        ...locationData,
        slug
      },
      { upsert: true, new: true }
    );

    // Purge cache to reflect changes immediately on the frontend
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      location: updatedLocation
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

    // 2. Connect DB & Delete Location
    await connectDB();
    const result = await Location.findOneAndDelete({ slug: slug.toLowerCase().trim() });

    if (!result) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    // Purge cache to reflect changes immediately on the frontend
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: `Successfully deleted location: ${slug}`
    });
  } catch (error: any) {
    console.error("DELETE Location API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
