import { ArrowDownToLine, ArrowUpRight, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { getSocialLinks, profile } from "@/data/profile";
import { CopyEmail } from "./copy-email";

export function ContactSection() {
  const socials = getSocialLinks();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent_70%)]"
      />
      <div className="container-page relative">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-subtle uppercase">
            <span className="text-accent">06</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-8 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-7xl"
          >
            Building something live, AI-driven or data-heavy?{" "}
            <span className="text-muted">Let&apos;s make it feel effortless.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Whether it&apos;s a role, a product or a question about the work above, email is the
            quickest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-12">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex max-w-full items-center gap-3 border-b-2 border-fg pb-2 text-lg font-medium tracking-tight break-all transition-colors hover:border-accent hover:text-accent min-[400px]:text-xl sm:text-3xl md:text-4xl"
          >
            {profile.email}
            <ArrowUpRight
              className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:size-8"
              aria-hidden="true"
            />
          </a>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CopyEmail email={profile.email} />
            <a
              href={profile.resume.href}
              download={profile.resume.fileName}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-fg"
            >
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              Download résumé (PDF)
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-fg"
              >
                <SocialIcon label={s.label} className="size-4" />
                {s.label}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
            <span className="inline-flex items-center gap-1.5 px-2 text-sm text-subtle">
              <MapPin className="size-4" aria-hidden="true" />
              {profile.location}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
