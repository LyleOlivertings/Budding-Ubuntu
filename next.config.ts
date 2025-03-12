import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Use cautiously
  },
};

export default nextConfig;
