import { Reveal } from "@/components/ui/reveal";
import { getYearsOfExperience } from "@/data/profile";
import { projects } from "@/data/projects";

/**
 * At-a-glance facts. Each figure is either counted from the data layer
 * or stated in the résumé (the ~50,000 contacts).
 */
export function Snapshot() {
  const stats = [
    {
      value: `${getYearsOfExperience()}+`,
      unit: "years",
      label: "Building production React and React Native apps",
    },
    {
      value: String(projects.length),
      unit: "products",
      label: "Frontends built, from Teams apps to e-commerce",
    },
    {
      value: "~50k",
      unit: "contacts",
      label: "Kept smooth client-side with IndexedDB and virtualisation",
    },
    {
      value: "3",
      unit: "platforms",
      label: "Web with React, iOS and Android with React Native",
    },
  ];

  return (
    <section aria-label="Professional snapshot" className="border-y border-line bg-surface/40">
      <div className="container-page">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.unit}
              delay={i}
              className={[
                "flex flex-col gap-2 py-8 md:py-10",
                i % 2 === 1 ? "border-l border-line pl-5 md:pl-8" : "pr-5 md:pr-8",
                i >= 2 ? "border-t border-line lg:border-t-0" : "",
                i === 2 ? "lg:border-l lg:pl-8" : "",
                i > 0 ? "lg:pl-8" : "",
              ].join(" ")}
            >
              <dt className="order-2 text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="order-1 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{s.value}</span>
                <span className="font-mono text-xs text-subtle uppercase">{s.unit}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
