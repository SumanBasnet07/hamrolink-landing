import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  reactCompiler: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  
  // Add these redirects
  async redirects() {
    return [
      // First: Remove trailing slashes from ALL paths (except root)
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true, // 301 redirect
      },
      // Second: Remove /en/ prefix from all URLs
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;