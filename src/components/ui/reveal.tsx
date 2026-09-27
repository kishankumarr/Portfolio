"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index; each step adds 70ms of delay. */
  delay?: number;
  as?: "div" | "li";
};

/** Fades and lifts content into view once. Motion settings respect reduced motion. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay * 0.07 }}
    >
      {children}
    </Comp>
  );
}
