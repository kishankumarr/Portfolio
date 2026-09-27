/**
 * Personal profile — the single source of truth for identity, positioning
 * and contact details. Everything here is taken from the résumé
 * (public/resume/Kishan-Kumar-A-Resume.pdf). Edit this file to update the site.
 */

import { withBasePath } from "@/lib/base-path";

export type SocialLink = {
  label: string;
  href: string;
  /** Short handle shown in the UI, e.g. "in/kishan". */
  display?: string;
};

export const profile = {
  name: "Kishan Kumar A",
  shortName: "Kishan",
  initials: "KK",
  headline: "Senior Frontend Developer",
  location: "Mangaluru, India",
  email: "kishankumar12324@gmail.com",

  /** Start of professional experience. Used to compute "years of experience". */
  careerStart: "2021-03-01",

  /** Hero positioning statement. */
  positioning:
    "I build fast, real-time frontends for web and mobile: Microsoft Teams apps, multi-portal commerce, live training platforms and AI voice assistants.",
  intro:
    "React and React Native engineer who cares about the parts users feel: interfaces that stay smooth under heavy data, update live, and work the same on every screen.",

  /** Used for <meta name="description"> and social cards. */
  seoDescription:
    "Kishan Kumar A is a Senior Frontend Developer in Mangaluru, India, building responsive, real-time web and mobile applications with React, React Native, TypeScript, Microsoft Graph, WebRTC and Generative AI.",

  resume: {
    href: withBasePath("/resume/Kishan-Kumar-A-Resume.pdf"),
    fileName: "Kishan-Kumar-A-Resume.pdf",
  },

  /**
   * Professional links. The résumé doesn't list any, so these are empty.
   * Fill in a URL and the link appears in the hero, contact section,
   * footer and structured data. Empty entries are hidden.
   */
  social: {
    github: "", // e.g. "https://github.com/<username>"
    linkedin: "", // e.g. "https://www.linkedin.com/in/<username>"
  },

  spokenLanguages: ["English", "Kannada", "Hindi"],
  interests: ["Travelling", "Community blood donation drives"],
} as const;

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (profile.social.github) {
    links.push({ label: "GitHub", href: profile.social.github });
  }
  if (profile.social.linkedin) {
    links.push({ label: "LinkedIn", href: profile.social.linkedin });
  }
  return links;
}

/** Whole years since `careerStart`, computed at build time. */
export function getYearsOfExperience(now = new Date()): number {
  const start = new Date(profile.careerStart);
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) years -= 1;
  return years;
}
