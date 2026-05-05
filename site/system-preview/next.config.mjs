/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: "../.next-system",
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
