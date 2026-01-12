import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "support.faceit.com",
      },
      new URL("https://distribution.faceit-cdn.net/images/**"),
      new URL("https://assets.faceit-cdn.net/avatars/**"),
    ],
  },
};

export default nextConfig;
