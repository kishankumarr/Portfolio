import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { featuredProjects, otherProjects, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ArchitectureDiagram } from "./architecture-diagram";

export function ProjectsSection() {
  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected work"
      title={
        <>
          Case studies <span className="text-muted">in real-time, AI and data-heavy frontends.</span>
        </>
      }
      lead="The problem, the architecture around my code, and the decisions that made it work."
    >
      <ol className="flex flex-col">
        {featuredProjects.map((project, i) => (
          <li key={project.slug} className="border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20">
            <CaseStudy project={project} index={i} />
          </li>
        ))}
      </ol>

      <div className="mt-8 border-t border-line pt-14">
        <Reveal>
          <h3 className="font-mono text-xs tracking-wider text-subtle uppercase">Also built</h3>
        </Reveal>
        <ul className="mt-8 grid overflow-hidden rounded-lg border border-line md:grid-cols-2">
          {otherProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i} className="flex flex-col gap-4 border-line p-6 not-first:border-t md:p-8 md:not-first:border-t-0 md:not-first:border-l">
              <div>
                <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">
                  {p.kind} · {p.platforms.join(" / ")}
                </p>
                <h4 className="mt-2 text-xl font-semibold tracking-tight">{p.name}</h4>
                <p className="mt-2 leading-relaxed text-muted">{p.tagline}</p>
              </div>
              <ul className="space-y-1.5 text-sm text-muted">
                {p.modules[0]?.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <TagList items={p.stack} label={`${p.name} technologies`} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <article aria-labelledby={`${project.slug}-name`} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={cn("flex flex-col lg:col-span-5", reversed && "lg:order-2 lg:col-start-8")}>
        <p className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="uppercase tracking-wide">{project.kind}</span>
        </p>
        <h3 id={`${project.slug}-name`} className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance md:text-4xl">
          <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
            {project.name}
          </Link>
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{project.tagline}</p>

        <dl className="mt-8 space-y-5 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Problem</dt>
            <dd className="mt-1.5 leading-relaxed text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Key decisions</dt>
            <dd className="mt-2">
              <ul className="space-y-2">
                {project.decisions.map((d) => (
                  <li key={d.title} className="flex gap-2.5 leading-relaxed">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    <span>
                      <span className="font-medium text-fg">{d.title}.</span>{" "}
                      <span className="text-muted">{d.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <TagList items={project.stack.slice(0, 8)} label={`${project.name} technologies`} />
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="group mt-8 inline-flex w-fit items-center gap-1.5 border-b border-line-strong pb-1 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Read the case study<span className="sr-only">: {project.name}</span>
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </Reveal>

      {project.architecture ? (
        <Reveal delay={1} className={cn("lg:col-span-7", reversed && "lg:order-1 lg:col-start-1")}>
          <div className="lg:sticky lg:top-24">
            <ArchitectureDiagram layers={project.architecture} title={project.name} />
          </div>
        </Reveal>
      ) : null}
    </article>
  );
}
