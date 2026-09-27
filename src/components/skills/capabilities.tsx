import { AudioLines, Boxes, Gauge, Layers, Radio, Smartphone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { capabilities } from "@/data/skills";

const icons: LucideIcon[] = [Radio, AudioLines, Gauge, Boxes, Smartphone, Layers];

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="03"
      eyebrow="Capabilities"
      title={
        <>
          What I bring to a team, <span className="text-muted">beyond a list of libraries.</span>
        </>
      }
    >
      <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal
              as="li"
              key={c.title}
              delay={i % 3}
              className="group relative flex flex-col border-r border-b border-line p-6 transition-colors hover:bg-surface md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
              <Icon className="size-5 text-accent" aria-hidden="true" strokeWidth={1.75} />
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
              <p className="mt-6 pt-2 font-mono text-[11px] leading-relaxed text-subtle md:mt-auto">
                <span className="sr-only">Applied in: </span>
                {c.evidence.join(" · ")}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
