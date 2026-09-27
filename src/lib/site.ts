import { profile } from "@/data/profile";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production
 * (e.g. https://kishankumar.dev). On Vercel the production domain is
 * used automatically if the variable isn't set.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteTitle = `${profile.name} · ${profile.headline}`;

export const navItems = [
  { id: "work", label: "Work", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "skills", label: "Skills", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;
