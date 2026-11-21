import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server from a phone on the same Wi-Fi (LAN IPs).
  // Without this, Next blocks the dev JS chunks, so the page never hydrates
  // (no animations, no swipe/indicator, no menu).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
