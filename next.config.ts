import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use images.domains in development
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "atlasware.in",
      },
    ],
    domains: ["picsum.photos", "ecom.myitworld.com", "m.media-amazon.com"],
  },
};

//Switch to remotePatterns for production
export default nextConfig;
