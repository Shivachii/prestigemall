import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
  },

  allowedDevOrigins: ["192.168.100.12"],
};

export default nextConfig;
