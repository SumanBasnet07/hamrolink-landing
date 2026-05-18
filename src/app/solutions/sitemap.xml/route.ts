import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Location } from "@/models/Location";

export async function GET() {
  try {
    // 1. Ensure active database connection
    await connectDB();

    // 2. Fetch all locations and project target fields
    const locations = await Location.find({}).lean();
    
    const baseUrl = "https://hamrolink.com";
    const sitemapItems: string[] = [];

    // 3. Compile sitemap items dynamically for all location and industry pairs
    for (const loc of locations as any[]) {
      if (loc.industries_data) {
        const industries = Object.keys(loc.industries_data);
        for (const industry of industries) {
          const url = `${baseUrl}/solutions/${industry.toLowerCase()}/${loc.slug.toLowerCase()}`;
          const lastmod = new Date(loc.updatedAt || new Date()).toISOString();
          
          sitemapItems.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.70</priority>
  </url>`);
        }
      }
    }

    // 4. Wrap elements inside full valid standard schema
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems.join("\n")}
</urlset>`;

    // 5. Stream response with application/xml headers and smart CDN caching
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Failed to generate solutions sitemap.xml:", error);
    return new NextResponse("Failed to compile sitemap.xml", { status: 500 });
  }
}
