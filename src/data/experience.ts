/** Work history, education and credentials, all from the résumé. */

export type Role = {
  company: string;
  title: string;
  start: string; // display label
  end: string;
  current: boolean;
  summary: string;
  /** Always visible. */
  highlights: string[];
  /** Shown behind a "more" disclosure. */
  more: string[];
  stack: string[];
  /** Slugs of projects from this role that appear on the site. */
  projectSlugs: string[];
};

export const experience: Role[] = [
  {
    company: "Logichive Solutions Private Limited",
    title: "Senior Front End Engineer",
    start: "Mar 2021",
    end: "Present",
    current: true,
    summary:
      "Frontend engineering across web and mobile: Microsoft Teams-integrated apps, a voice-driven meeting assistant and cross-platform React Native products.",
    highlights: [
      "Built a tablet-based virtual assistant with voice-driven interactions, meeting-room assistance, meeting controls and voice commands.",
      "Integrated Microsoft Graph RESTful APIs for meeting and user information in Teams-enabled applications.",
      "Contributed to a Teams messaging app that unifies messaging across multiple platforms, improving collaboration workflows.",
    ],
    more: [
      "Built responsive web applications with React.js, backed by unit tests in Jest, Enzyme and React Testing Library.",
      "Developed cross-platform mobile applications with React Native for iOS and Android.",
      "Took part in Agile Scrum ceremonies: sprint planning, daily stand-ups and retrospectives.",
      "Managed version control with GitLab and Bitbucket.",
    ],
    stack: [
      "React",
      "React Native",
      "TypeScript",
      "Microsoft Graph",
      "Jest",
      "React Testing Library",
      "GitLab",
    ],
    projectSlugs: ["agentic-ai-voice-assistant", "teams-contacts-unified-messaging"],
  },
];

export type JourneyStep = {
  period: string;
  title: string;
  place: string;
  note: string;
};

/** Compact career path shown alongside Experience. */
export const journey: JourneyStep[] = [
  {
    period: "2016 – 2020",
    title: "B.E. Electronics & Telecommunication",
    place: "Visvesvaraya Technological University",
    note: "An engineering foundation in electronics and communication systems.",
  },
  {
    period: "Bootcamp",
    title: "Web Development Bootcamp",
    place: "Newton School",
    note: "Full-stack training in HTML, CSS, JavaScript, React, Node.js, Express and MongoDB, with deployed projects.",
  },
  {
    period: "2021 – now",
    title: "Senior Front End Engineer",
    place: "Logichive Solutions",
    note: "Teams apps, an AI voice assistant and React Native products on the web and mobile.",
  },
];

export const education = [
  {
    degree: "B.E. / B.Tech, Electronics and Telecommunication Engineering",
    institution: "Visvesvaraya Technological University (VTU)",
    period: "2016 – 2020",
  },
];

export const certifications = [{ name: "Web Developer" }];
