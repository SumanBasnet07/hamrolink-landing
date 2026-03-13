import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hamrolink.com';
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/contact',
    '/docs',
    '/faqs',
    '/privacy',
    '/refund',
    '/terms',
    '/blog',
    '/blog/why-nepali-businesses-dont-have-websites',
    '/blog/facebook-page-vs-website-nepali-businesses',
    '/blog/school-website-nepal-why-every-school-should-be-online',
  ];

  const languages = ['en', 'ne'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : route === '/docs' ? 0.8 : 0.5,
      });
    }
  }

  return sitemapEntries;
}
