import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { experience, journey } from "@/data/experience";
import { projects } from "@/data/projects";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Experience"
      title={
        <>
          From electronics to the frontend, <span className="text-muted">shipping on web and mobile since 2021.</span>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Career path */}
        <div className="lg:col-span-4">
          <Reveal>
            <h3 className="font-mono text-xs tracking-wider text-subtle uppercase">Path</h3>
          </Reveal>
          <ol className="relative mt-8 ml-1.5 border-l border-line">
            {journey.map((step, i) => {
              const last = i === journey.length - 1;
              return (
                <Reveal as="li" key={step.title} delay={i} className="relative pb-10 pl-7 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={
                      last
                        ? "absolute top-1 -left-[5px] size-[9px] rounded-full bg-accent ring-4 ring-accent-soft"
                        : "absolute top-1 -left-[5px] size-[9px] rounded-full border border-line-strong bg-bg"
                    }
                  />
                  <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">{step.period}</p>
                  <p className="mt-1.5 font-medium">{step.title}</p>
                  <p className="text-sm text-muted">{step.place}</p>
                  <p className="mt-2 text-sm leading-relaxed text-subtle">{step.note}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/* Roles */}
        <div className="lg:col-span-8">
          {experience.map((role) => {
            const related = projects.filter((p) => role.projectSlugs.includes(p.slug));
            return (
              <Reveal key={role.company}>
                <article
                  aria-labelledby="role-title"
                  className="rounded-lg border border-line bg-surface p-6 shadow-soft md:p-10"
                >
                  <header className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 id="role-title" className="text-2xl font-semibold tracking-tight">
                        {role.title}
                      </h3>
                      <p className="mt-1 text-muted">{role.company}</p>
                    </div>
                    <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                      {role.current ? (
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                      ) : null}
                      <time>{role.start}</time> – <span>{role.end}</span>
                    </p>
                  </header>

                  <p className="mt-6 text-lg leading-relaxed text-pretty">{role.summary}</p>

                  <h4 className="mt-8 font-mono text-[11px] tracking-wider text-subtle uppercase">Highlights</h4>
                  <ul className="mt-3 space-y-3">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3 leading-relaxed text-muted">
                        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <details className="group mt-6 border-t border-line pt-4">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-md text-sm font-medium text-fg select-none [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">Show all responsibilities</span>
                      <span className="hidden group-open:inline">Show fewer</span>
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mt-4 space-y-3">
                      {role.more.map((h) => (
                        <li key={h} className="flex gap-3 leading-relaxed text-muted">
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
                    <div>
                      <h4 className="font-mono text-[11px] tracking-wider text-subtle uppercase">Stack</h4>
                      <div className="mt-3">
                        <TagList items={role.stack} label="Technologies used in this role" />
                      </div>
                    </div>
                    {related.length ? (
                      <div>
                        <h4 className="font-mono text-[11px] tracking-wider text-subtle uppercase">
                          Work from this role
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {related.map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/projects/${p.slug}`}
                                className="group/link inline-flex items-center gap-1 text-sm font-medium hover:text-accent"
                              >
                                {p.name}
                                <ArrowUpRight
                                  className="size-3.5 text-subtle transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-accent"
                                  aria-hidden="true"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
