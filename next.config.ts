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
      source: '/en/:path*/',
      destination: '/:path*',
      permanent: true,
    },
    {
      source: '/en/:path*',
      destination: '/:path*',
      permanent: true,
    },

    // Then handle trailing slash globally
    {
      source: '/:path*/',
      destination: '/:path*',
      permanent: true,
    },
    ];
  },
};

export default nextConfig;