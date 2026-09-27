import { About } from "@/components/about/about";
import { ContactSection } from "@/components/contact/contact-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { Hero } from "@/components/hero/hero";
import { Snapshot } from "@/components/hero/snapshot";
import { ProjectsSection } from "@/components/projects/projects-section";
import { Capabilities } from "@/components/skills/capabilities";
import { SkillsSection } from "@/components/skills/skills-section";
import { jsonLdString, personJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd()) }}
      />
      <Hero />
      <Snapshot />
      <ProjectsSection />
      <About />
      <Capabilities />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
