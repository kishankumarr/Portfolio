import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-start justify-center pt-32 pb-20">
      <p className="font-mono text-xs tracking-wider text-accent uppercase">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The link may be outdated, or the page may have moved.</p>
      <ButtonLink href="/" className="mt-10">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back home
      </ButtonLink>
    </section>
  );
}
