import { ArrowDownToLine, ArrowRight, Mail, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/brand-icons";
import { experience } from "@/data/experience";
import { getSocialLinks, profile } from "@/data/profile";
import { ProfileCard } from "./profile-card";

export function Hero() {
  const current = experience.find((r) => r.current);
  const socials = getSocialLinks();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Grid backdrop, faded toward the edges */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_35%,black,transparent_75%)]"
      />

      <div className="container-page relative grid grid-cols-1 items-end gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          {current ? (
            <p className="enter flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-wide text-muted" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="inline-flex items-center gap-2.5">
                <span className="relative flex size-2 shrink-0" aria-hidden="true">
                  <span className="status-ping absolute inset-0 rounded-full bg-emerald-500" />
                  <span className="relative size-2 rounded-full bg-emerald-500" />
                </span>
                <span>
                  {current.title} at{" "}
                  <span className="text-fg">{current.company.replace(" Private Limited", "")}</span>
                </span>
              </span>
              <span aria-hidden="true" className="hidden text-line-strong sm:inline">/</span>
              <span className="inline-flex items-center gap-1 pl-[1.125rem] sm:pl-0">
                <MapPin className="size-3" aria-hidden="true" />
                {profile.location}
              </span>
            </p>
          ) : null}

          <h1
            id="hero-title"
            className="enter mt-7 text-[2.45rem] leading-[1.03] font-semibold tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl lg:text-[3.6rem] xl:text-[4.35rem]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <span className="block text-muted">{profile.name}</span>
            <span className="block">
              <span className="text-accent">Real-time</span> interfaces for web, mobile{" "}
              <span className="whitespace-nowrap">
                &amp; AI.
                <span aria-hidden="true" className="caret ml-2 inline-block h-[0.78em] w-[0.07em] translate-y-[0.06em] bg-accent" />
              </span>
            </span>
          </h1>

          <p
            className="enter mt-8 max-w-2xl text-lg leading-relaxed text-muted text-pretty md:text-xl"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <span className="text-fg">{profile.headline}.</span> {profile.positioning}
          </p>

          <div className="enter mt-10 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <ButtonLink href="#work">
              View case studies
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={profile.resume.href} variant="secondary" download={profile.resume.fileName}>
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              Download résumé
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} variant="ghost">
              <Mail className="size-4" aria-hidden="true" />
              Contact me
            </ButtonLink>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <SocialIcon label={s.label} className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="enter hidden min-w-0 sm:block lg:col-span-5 lg:pl-3 xl:pl-10" style={{ "--i": 4 } as React.CSSProperties}>
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
