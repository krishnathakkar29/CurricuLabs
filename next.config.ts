import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ["s3.us-west-2.amazonaws.com"],
  },
};

export default nextConfig;
