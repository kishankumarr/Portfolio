import { experience } from "@/data/experience";
import { getYearsOfExperience, profile } from "@/data/profile";

/**
 * A code-styled summary of the profile, shown beside the hero headline.
 * Every value comes from the data layer, nothing hard-coded.
 */
export function ProfileCard() {
  const current = experience.find((r) => r.current);
  const rows: Array<[string, string | string[]]> = [
    ["role", profile.headline],
    ["company", current?.company.replace(" Private Limited", "") ?? ""],
    ["experience", `${getYearsOfExperience()}+ years`],
    ["platforms", ["web", "ios", "android"]],
    ["realtime", ["WebRTC", "Socket.io", "SIP", "MQTT"]],
    ["ai", ["GenAI", "agentic"]],
  ];

  return (
    <figure
      aria-label="Profile summary"
      className="overflow-hidden rounded-lg border border-line bg-surface/80 shadow-soft backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <figcaption className="font-mono text-[11px] text-subtle">profile.ts</figcaption>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6">
        <code>
          <span className="text-subtle">export const</span> <span className="text-fg">kishan</span>{" "}
          <span className="text-subtle">=</span> {"{"}
          {"\n"}
          {rows.map(([key, value]) => (
            <span key={key}>
              {"  "}
              <span className="text-muted">{key}</span>
              <span className="text-subtle">: </span>
              {Array.isArray(value) ? (
                <>
                  <span className="text-subtle">[</span>
                  {value.map((v, i) => (
                    <span key={v}>
                      <span className="text-accent">&quot;{v}&quot;</span>
                      {i < value.length - 1 ? <span className="text-subtle">, </span> : null}
                    </span>
                  ))}
                  <span className="text-subtle">]</span>
                </>
              ) : (
                <span className="text-accent">&quot;{value}&quot;</span>
              )}
              <span className="text-subtle">,</span>
              {"\n"}
            </span>
          ))}
          {"}"}
        </code>
      </pre>
    </figure>
  );
}
