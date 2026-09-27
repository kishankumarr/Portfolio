import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/cn";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      index="05"
      eyebrow="Toolkit"
      title={
        <>
          Skills, <span className="text-muted">grouped by what they&apos;re for.</span>
        </>
      }
      lead={
        <>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            <span>Highlighted items are the ones I use most.</span>
          </span>
        </>
      }
    >
      <div className="grid gap-x-12 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.id}
            delay={i % 2}
            className="grid grid-cols-1 gap-3 border-t border-line py-6 sm:grid-cols-[11rem_1fr] sm:gap-6"
          >
            <div>
              <h3 className="font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-1 text-sm text-subtle">{group.blurb}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-x-1.5 gap-y-2" aria-label={`${group.title} skills`}>
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
                    skill.core
                      ? "border-fg/80 font-medium text-fg"
                      : "border-line text-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {skill.core ? (
                    <>
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      <span className="sr-only">Primary skill: </span>
                    </>
                  ) : null}
                  {skill.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
