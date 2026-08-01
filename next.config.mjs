import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot
  },
  async redirects() {
    return [
      { source: "/instrumentarium", destination: "/admin", permanent: true },
      { source: "/instrumentarium/gate", destination: "/admin/gate", permanent: true }
    ];
  },
};

export default nextConfig;
