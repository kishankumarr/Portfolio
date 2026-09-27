"use client";

import { AnimatePresence, m } from "motion/react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/site";

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Tracks which home-page section is currently in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    // "home" is observed too, so returning to the hero clears the highlight.
    const sections = ["home", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolled();
  const active = useActiveSection(isHome);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mobile menu: lock scroll, close on Escape, keep focus inside, restore focus.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = [
        toggle,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // Close the menu when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const elevated = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        elevated
          ? "border-b border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "container-page flex items-center justify-between transition-[height] duration-300",
          elevated ? "h-16" : "h-20",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md"
          aria-label={`${profile.name}, home`}
          onClick={() => setOpen(false)}
        >
          <span className="grid size-8 place-items-center rounded-md bg-fg font-mono text-[11px] font-semibold tracking-tight text-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg">
            {profile.initials}
          </span>
          <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={profile.resume.href}
            download={profile.resume.fileName}
            className="ml-1 hidden h-9 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-fg sm:inline-flex"
          >
            Résumé
            <ArrowDownToLine className="size-3.5" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-full text-fg hover:bg-surface-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={panelRef}
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex h-full flex-col pt-6 pb-10">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={`/#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 text-3xl font-semibold tracking-tight"
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-mono text-xs text-subtle">{item.index}</span>
                    </Link>
                  </m.li>
                ))}
              </ul>
              <a
                href={profile.resume.href}
                download={profile.resume.fileName}
                className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fg text-sm font-medium text-bg"
              >
                <ArrowDownToLine className="size-4" aria-hidden="true" />
                Download résumé (PDF)
              </a>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
