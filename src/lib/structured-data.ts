import { education, experience } from "@/data/experience";
import { getSocialLinks, profile } from "@/data/profile";
import type { Project } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { siteUrl } from "./site";

export function personJsonLd() {
  const current = experience.find((r) => r.current);
  const sameAs = getSocialLinks().map((l) => l.href);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteUrl,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: profile.headline,
      description: profile.seoDescription,
      email: `mailto:${profile.email}`,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mangaluru",
        addressCountry: "IN",
      },
      ...(current
        ? { worksFor: { "@type": "Organization", name: current.company } }
        : {}),
      alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
      knowsLanguage: profile.spokenLanguages,
      knowsAbout: skillGroups.flatMap((g) => g.skills.filter((s) => s.core).map((s) => s.name)),
      ...(sameAs.length ? { sameAs } : {}),
    },
  };
}

export function projectJsonLd(project: Project) {
  const url = `${siteUrl}/projects/${project.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.summary,
      url,
      keywords: project.stack.join(", "),
      creator: { "@id": `${siteUrl}/#person`, "@type": "Person", name: profile.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/#work` },
        { "@type": "ListItem", position: 3, name: project.name, item: url },
      ],
    },
  ];
}

/** Serialises JSON-LD safely for an inline <script>. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
