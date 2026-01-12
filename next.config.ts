import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "support.faceit.com",
      },
      new URL("https://distribution.faceit-cdn.net/images/**"),
    ],
  },
};

export default nextConfig;
