import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  experimental: { serverActions: true },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};
export default config;
