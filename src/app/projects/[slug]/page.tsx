import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { Reveal } from "@/components/ui/reveal";
import { TagList } from "@/components/ui/tag";
import { profile } from "@/data/profile";
import { featuredProjects, getProject } from "@/data/projects";
import { withBasePath } from "@/lib/base-path";
import { jsonLdString, projectJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: withBasePath(`/projects/${project.slug}`) },
    openGraph: {
      type: "article",
      url: withBasePath(`/projects/${project.slug}`),
      title: project.name,
      description: project.summary,
      images: [ogImage],
    },
    twitter: { title: project.name, description: project.summary, images: [ogImage] },
  };
}

// A page-level `openGraph` replaces the inherited one, so re-attach the site card.
const ogImage = {
  url: withBasePath("/opengraph-image.png"),
  width: 1200,
  height: 630,
  alt: `${profile.name}, ${profile.headline}`,
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "built", label: "What I built" },
  { id: "decisions", label: "Engineering decisions" },
  { id: "outcome", label: "Outcome" },
  { id: "stack", label: "Stack" },
];

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = featuredProjects.findIndex((p) => p.slug === project.slug);
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const sections = toc.filter((t) => t.id !== "architecture" || project.architecture);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(projectJsonLd(project)) }}
      />
      <article className="pt-28 pb-24 md:pt-36">
        <div className="container-page">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted uppercase hover:text-fg"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            All work
          </Link>

          <header className="mt-10 border-b border-line pb-12">
            <p className="enter flex items-center gap-3 font-mono text-xs text-subtle" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="text-accent">Case study {String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="uppercase tracking-wide">{project.kind}</span>
            </p>
            <h1
              className="enter mt-5 max-w-4xl text-4xl leading-[1.04] font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {project.name}
            </h1>
            <p
              className="enter mt-6 max-w-3xl text-lg leading-relaxed text-muted text-pretty md:text-xl"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {project.tagline}
            </p>

            <dl
              className="enter mt-10 grid gap-6 text-sm sm:grid-cols-3"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <div>
                <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Role</dt>
                <dd className="mt-1.5 leading-relaxed">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Platforms</dt>
                <dd className="mt-1.5">{project.platforms.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase">Core stack</dt>
                <dd className="mt-1.5">{project.stack.slice(0, 4).join(", ")}</dd>
              </div>
            </dl>
          </header>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
              <ul className="sticky top-28 space-y-2.5 border-l border-line text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-muted transition-colors hover:border-fg hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 space-y-20 lg:col-span-9">
              <CaseSection id="overview" title="Overview">
                <p className="text-lg leading-relaxed text-pretty md:text-xl">{project.summary}</p>
              </CaseSection>

              <CaseSection id="problem" title="Problem">
                <p className="text-lg leading-relaxed text-muted text-pretty">{project.problem}</p>
              </CaseSection>

              {project.architecture ? (
                <CaseSection id="architecture" title="Architecture">
                  <p className="mb-6 max-w-2xl leading-relaxed text-muted">
                    How the pieces fit together. Hover or focus any component to see its role.
                  </p>
                  <ArchitectureDiagram layers={project.architecture} title={project.name} size="lg" />
                </CaseSection>
              ) : null}

              <CaseSection id="built" title="What I built">
                <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                  {project.modules.map((mod) => (
                    <div key={mod.name} className="bg-bg p-6">
                      <h3 className="font-semibold tracking-tight">{mod.name}</h3>
                      <ul className="mt-3 space-y-2.5">
                        {mod.points.map((pt) => (
                          <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CaseSection>

              <CaseSection id="decisions" title="Engineering decisions">
                <ol className="space-y-8">
                  {project.decisions.map((d, i) => (
                    <li key={d.title} className="grid gap-2 border-t border-line pt-6 sm:grid-cols-[3rem_1fr]">
                      <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">{d.title}</h3>
                        <p className="mt-1.5 leading-relaxed text-muted">{d.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CaseSection>

              <CaseSection id="outcome" title="Outcome">
                <ul className="space-y-4">
                  {project.outcomes.map((o) => (
                    <li key={o} className="flex gap-4 text-lg leading-relaxed">
                      <span aria-hidden="true" className="mt-3.5 h-px w-5 shrink-0 bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
              </CaseSection>

              <CaseSection id="stack" title="Stack">
                <TagList items={project.stack} label={`${project.name} technologies`} />
              </CaseSection>
            </div>
          </div>
        </div>
      </article>

      <nav aria-label="Next case study" className="border-t border-line">
        <Link
          href={`/projects/${next.slug}`}
          className="group container-page flex flex-col gap-2 py-14 md:flex-row md:items-end md:justify-between md:py-20"
        >
          <span>
            <span className="font-mono text-xs tracking-wider text-subtle uppercase">Next case study</span>
            <span className="mt-3 block text-3xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-accent md:text-5xl">
              {next.name}
            </span>
          </span>
          <ArrowRight
            className="size-8 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent md:size-10"
            aria-hidden="true"
          />
        </Link>
      </nav>
    </>
  );
}

function CaseSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
        <h2 id={`${id}-heading`} className="mb-6 font-mono text-xs tracking-wider text-subtle uppercase">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}
