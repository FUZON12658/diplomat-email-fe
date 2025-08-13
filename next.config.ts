import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "ambassadorsclubnepal.com","picsum.photos","irgdd.com","diplomatnepal.com"],
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
