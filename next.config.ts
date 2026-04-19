import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  reactCompiler: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
