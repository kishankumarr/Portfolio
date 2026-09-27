import type { NextConfig } from "next";

/**
 * GitHub Pages serves plain files from a sub-path (/<repo>), so the Pages
 * workflow sets STATIC_EXPORT=true and NEXT_PUBLIC_BASE_PATH=/Portfolio.
 * Without those variables this is a normal Next.js app (dev, Vercel, next start).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  // Emit /projects/x/index.html so static hosts resolve every route unambiguously.
  trailingSlash: isStaticExport,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
