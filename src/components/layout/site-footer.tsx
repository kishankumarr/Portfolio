import { ArrowUp } from "lucide-react";
import { getSocialLinks, profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    ...getSocialLinks(),
    { label: "Résumé", href: profile.resume.href },
  ];

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {profile.name}. <span className="text-subtle">Built with Next.js.</span>
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer links">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-fg"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-subtle uppercase transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
