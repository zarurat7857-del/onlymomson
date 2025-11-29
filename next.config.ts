import { devIndicatorServerState } from "next/dist/server/dev/dev-indicator-server-state";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this section
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.catbox.moe',
      },
     
      {
        protocol: 'https',
        hostname: 'catbox.moe',
      },
      // Keep your placeholders if needed
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;