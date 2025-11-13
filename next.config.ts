import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable Turbopack temporarily if SWC issues occur
  // The dev server will fall back to webpack
};

export default nextConfig;
