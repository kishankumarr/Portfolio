import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { certifications, education } from "@/data/experience";
import { getYearsOfExperience, profile } from "@/data/profile";

const principles = [
  {
    title: "Performance is measured",
    body: "Lighthouse and Core Web Vitals decide what gets optimised. Virtualisation and client-side storage do the heavy lifting.",
  },
  {
    title: "Live by default",
    body: "WebRTC, Socket.io, SIP and MQTT: pick the right transport so the UI reflects what's happening now.",
  },
  {
    title: "Systems over screens",
    body: "Reusable, themed components and predictable Redux state, so a second or third portal costs far less than the first.",
  },
  {
    title: "Tested where it counts",
    body: "Jest, Enzyme and React Testing Library on the core components everything else depends on.",
  },
];

export function About() {
  const years = getYearsOfExperience();
  return (
    <Section
      id="about"
      index="02"
      eyebrow="About"
      title={
        <>
          I make complex, live products feel <span className="text-muted">simple to use.</span>
        </>
      }
    >
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted text-pretty md:col-span-7 md:col-start-4 md:text-lg">
          <p>
            For {years}+ years I&apos;ve worked where frontend engineering gets interesting:
            interfaces that talk to live systems. That includes a Teams app holding an entire
            organisation&apos;s directory, a voice assistant that runs meetings on command,
            browser-based security labs with live video, and a three-portal marketplace where every
            order update shows up instantly.
          </p>
          <p>
            <span className="text-fg">{profile.intro}</span> I work across React on the web and
            React Native on iOS and Android, integrating Microsoft Graph, real-time protocols and
            Generative AI agents into products people use every day.
          </p>
          <p>
            I studied Electronics &amp; Telecommunication, which is probably why I&apos;m at home
            with protocols, devices and signals, and I trained in full-stack web development before
            focusing on the frontend.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-x-10 gap-y-12 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <h3 className="font-mono text-xs tracking-wider text-subtle uppercase">How I work</h3>
        </Reveal>
        <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-9">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i} className="border-t border-line pt-5">
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="text-lg font-semibold tracking-tight">{p.title}</span>
              </p>
              <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal className="mt-20 grid gap-y-8 border-t border-line pt-8 text-sm sm:grid-cols-2 md:grid-cols-12">
        <div className="md:col-span-3">
          <h3 className="font-mono text-xs tracking-wider text-subtle uppercase">Education</h3>
        </div>
        <div className="md:col-span-4">
          {education.map((e) => (
            <div key={e.degree}>
              <p className="font-medium">{e.degree}</p>
              <p className="mt-1 text-muted">
                {e.institution} · {e.period}
              </p>
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          <h3 className="sr-only">Certification</h3>
          <p className="font-mono text-xs tracking-wider text-subtle uppercase" aria-hidden="true">
            Certified
          </p>
          {certifications.map((c) => (
            <p key={c.name} className="mt-1 font-medium">
              {c.name}
            </p>
          ))}
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-xs tracking-wider text-subtle uppercase">Beyond work</p>
          <p className="mt-1 text-muted">
            Speaks {profile.spokenLanguages.join(", ")}. Enjoys {profile.interests[0].toLowerCase()}{" "}
            and takes part in {profile.interests[1].toLowerCase()}.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
