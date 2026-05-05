/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: process.env.SYSTEM_PREVIEW_DIST_DIR || "../.next-system",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    externalDir: true
  }
};

export default nextConfig;
