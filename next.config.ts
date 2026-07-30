import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_PHP_BACKEND_URL: process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "http://localhost:4002",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002/api/admin",
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:4002/api/public",
    GRIP_API_TOKEN: process.env.GRIP_API_TOKEN || "",
  },
};

export default nextConfig;
