import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:scale-[0.97] disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-accent hover:text-accent-fg h-11 px-5 shadow-soft",
  secondary:
    "border border-line-strong bg-surface/60 text-fg hover:border-fg h-11 px-5",
  ghost: "text-muted hover:text-fg h-11 px-3",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/**
 * Link styled as a button. Uses next/link for in-app routes and a plain
 * anchor for hashes, files and external URLs.
 */
export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);
  const isInternalRoute = href.startsWith("/") && !href.includes(".");

  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
