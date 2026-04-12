import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Blog posts - we should ideally fetch these from a database or file system
  const blogPosts = [
    '/blog/why-nepali-businesses-dont-have-websites',
    '/blog/facebook-page-vs-website-nepali-businesses',
    '/blog/school-website-nepal-why-every-school-should-be-online',
  ];

  const routes = [...staticRoutes, ...blogPosts];
  const languages = ['en', 'ne'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : route === '/blog' || route === '/docs' ? 0.8 : 0.5,
      });
    }
  }

  return sitemapEntries;
}
