import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  reactCompiler: true,

  images: {
    domains: ["res.cloudinary.com"],
  },

  async redirects() {
    return [
      // ✅ Remove trailing slash (except root)
      {
        source: "/:path*/",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;