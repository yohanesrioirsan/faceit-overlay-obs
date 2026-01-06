import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "support.faceit.com",
      },
    ],
  },
};

export default nextConfig;
