/**
 * Sub-path the site is served from ("" normally, "/Portfolio" on GitHub Pages).
 * next/link and metadata files add it automatically; plain <a href> to files
 * in /public must go through `withBasePath`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
