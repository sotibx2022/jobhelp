import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    domains:['flagcdn.com','upload.wikimedia.org']
  }
};
export default nextConfig;