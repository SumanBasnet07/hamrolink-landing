import { MetadataRoute } from 'next';
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

/**
 * HamroLink Sitemap Generator (2026)
 * This setup ensures English and Nepali pages are linked as alternates
 * to prevent "Crawled - Currently Not Indexed" errors.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hamrolink.com';
  const lastModified = new Date();

  // 1. Define all your path segments (without language prefixes)
  const staticPaths = [
    '',
    '/about',
    '/ai',
    '/contact',
    '/docs',
    '/faqs',
    '/features',
    '/pricing',
    '/privacy',
    '/refund',
    '/stories',
    '/terms',
    '/blog',
  ];

  const hardcodedBlogPaths = [
    '/blog/why-nepali-businesses-dont-have-websites',
    '/blog/facebook-page-vs-website-nepali-businesses',
    '/blog/school-website-nepal-why-every-school-should-be-online',
  ];

  let dynamicBlogPaths: string[] = [];

  // 2. Fetch dynamic slugs from MongoDB
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true }).select("slug").lean();
    dynamicBlogPaths = (posts as any[]).map(post => `/blog/${post.slug}`);
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
  }

  // 3. Combine all paths
  const allPaths = [...staticPaths, ...hardcodedBlogPaths, ...dynamicBlogPaths];

  // 4. Map paths to the Sitemap format with Hreflang Alternates
  return allPaths.map((path) => {
    const enUrl = `${baseUrl}${path}`;
    const neUrl = `${baseUrl}/ne${path === '' ? '' : path}`;

    // Calculate priority based on path importance
    let priority = 0.5;
    if (path === '') priority = 1.0;
    else if (path === '/pricing' || path === '/features') priority = 0.9;
    else if (path.startsWith('/blog')) priority = 0.8;

    return {
      url: enUrl, // Default landing URL for Google
      lastModified,
      changeFrequency: 'weekly',
      priority,
      alternates: {
        languages: {
          en: enUrl,
          ne: neUrl,
        },
      },
    };
  });
}