import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/admin/', '/en/admin/', '/ne/admin/'],
    },
    // Both sitemaps declared — main covers static + blog pages,
    // solutions sitemap covers all dynamically generated pSEO location×industry pages
    sitemap: [
      'https://hamrolink.com/sitemap.xml',
      'https://hamrolink.com/solutions/sitemap.xml',
    ],
  };
}
