"use client";

import { useId, useState } from "react";
import type { DiagramLayer } from "@/data/projects";
import { cn } from "@/lib/cn";

type Props = {
  layers: DiagramLayer[];
  title: string;
  size?: "md" | "lg";
};

/**
 * Layered architecture diagram. Layers stack top to bottom with a connector
 * between each. Hovering or focusing a node highlights it and shows its
 * explanation in the caption. Keyboard users tab through nodes.
 */
export function ArchitectureDiagram({ layers, title, size = "md" }: Props) {
  const allNodes = layers.flatMap((l) => l.nodes);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = allNodes.find((n) => n.id === activeId) ?? null;
  const captionId = useId();

  return (
    <figure
      className="relative overflow-hidden rounded-lg border border-line bg-surface"
      aria-label={`${title} architecture`}
      onMouseLeave={() => setActiveId(null)}
    >
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
        <span>architecture</span>
        <span className="hidden sm:inline">hover or focus a node</span>
      </div>

      <ol className={cn("relative flex flex-col px-4 sm:px-6", size === "lg" ? "py-8 sm:py-10" : "py-6")}>
        {layers.map((layer, li) => (
          <li key={layer.name} className="flex flex-col">
            {li > 0 ? <Connector /> : null}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[6rem_1fr] sm:items-center sm:gap-3">
              <span className="font-mono text-[10px] tracking-wider text-subtle uppercase sm:text-[11px]">
                {layer.name}
              </span>
              <ul className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => {
                  const isActive = node.id === activeId;
                  const dimmed = activeId !== null && !isActive;
                  return (
                    <li key={node.id} className="min-w-0 flex-1 basis-[7.25rem]">
                      <button
                        type="button"
                        aria-describedby={isActive ? captionId : undefined}
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveId(node.id)}
                        onFocus={() => setActiveId(node.id)}
                        onBlur={() => setActiveId(null)}
                        onClick={() => setActiveId(isActive ? null : node.id)}
                        className={cn(
                          "w-full rounded-md border px-3 py-2.5 text-left transition-[border-color,background-color,opacity,transform] duration-200",
                          isActive
                            ? "border-accent bg-accent-soft"
                            : "border-line-strong bg-bg hover:-translate-y-0.5",
                          dimmed && "opacity-45",
                        )}
                      >
                        <span className="block text-[13px] leading-tight font-medium">{node.label}</span>
                        {node.meta ? (
                          <span
                            className={cn(
                              "mt-1 block font-mono text-[10.5px] leading-tight",
                              isActive ? "text-accent" : "text-subtle",
                            )}
                          >
                            {node.meta}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <figcaption
        id={captionId}
        aria-live="polite"
        className="relative min-h-[4.25rem] border-t border-line px-4 py-3 text-sm leading-snug sm:px-6"
      >
        <span key={active?.id ?? "idle"} className="fade-in block">
          {active ? (
            <>
              <span className="font-medium text-fg">{active.label}: </span>
              <span className="text-muted">{active.detail}</span>
            </>
          ) : (
            <span className="text-subtle">{layers.map((l) => l.name).join(" → ")}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

function Connector() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] sm:gap-3" aria-hidden="true">
      <span className="hidden sm:block" />
      <div className="relative ml-4 h-6">
        <span className="absolute inset-y-0 left-0 w-px bg-line-strong" />
        <span className="absolute bottom-0 left-[-3px] size-[7px] rotate-45 border-r border-b border-line-strong" />
      </div>
    </div>
  );
}
