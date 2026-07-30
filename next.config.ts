import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_PHP_BACKEND_URL:
      process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://api.gripforum.com",
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://api.gripforum.com/api/admin",
    NEXT_PUBLIC_IMAGE_URL:
      process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.gripforum.com/api/public",
    GRIP_API_TOKEN: process.env.GRIP_API_TOKEN || "",
  },
};

export default nextConfig;
