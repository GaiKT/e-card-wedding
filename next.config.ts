import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Enable image optimization with better settings
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    // Add loading optimization
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize GIF handling
    unoptimized: false,
    // Add domains if needed for external images
    domains: [],
    // Enable experimental features for better performance
    loader: 'default',
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "swiper",
      "react-intersection-observer",
      "prisma"
    ],
  },
  // Optimize for turbopack
  turbopack: {},
  // Compress output for better performance
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // PWA-like behavior
  poweredByHeader: false,
  // Add headers for better caching
  async headers() {
    return [
      {
        source: '/gallery/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/pre-wedding-no-bg/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/our-story/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
