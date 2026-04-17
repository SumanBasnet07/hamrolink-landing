import { MetadataRoute } from 'next';
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hamrolink.com';
  const lastModified = new Date();

  const staticRoutes = [
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

  // Hardcoded static blog posts
  const hardcodedBlogPosts = [
    '/blog/why-nepali-businesses-dont-have-websites',
    '/blog/facebook-page-vs-website-nepali-businesses',
    '/blog/school-website-nepal-why-every-school-should-be-online',
  ];

  let dynamicBlogPosts: string[] = [];
  try {
    // Fetch dynamic blog posts from database
    await connectDB();
    const posts = await BlogPost.find({ published: true }).select("slug").lean();
    dynamicBlogPosts = (posts as any[]).map(post => `/blog/${post.slug}`);
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
  }

  const routes = [...staticRoutes, ...hardcodedBlogPosts, ...dynamicBlogPosts];
  const languages = ['en', 'ne'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    for (const route of routes) {
      sitemapEntries.push({
        url: lang === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${lang}${route}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : route === '/blog' || route === '/docs' ? 0.8 : 0.5,
      });
    }
  }

  return sitemapEntries;
}
