import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Page section with a numbered, mono eyebrow ("02 / Work") and a large
 * heading. The heading's id labels the section for assistive tech.
 */
export function Section({ id, index, eyebrow, title, lead, children, className }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-24 md:py-32", className)}>
      <div className="container-page">
        <Reveal>
          <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
            <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-subtle uppercase md:col-span-3 md:pt-3">
              <span className="text-accent">{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              {eyebrow}
            </p>
            <div className="md:col-span-9">
              <h2
                id={headingId}
                className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl"
              >
                {title}
              </h2>
              {lead ? (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted text-pretty md:text-lg">
                  {lead}
                </p>
              ) : null}
            </div>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
