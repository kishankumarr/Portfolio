/**
 * Skills, grouped by what they're used for. Only technologies from the
 * résumé appear here. `core` marks the ones used most across projects.
 */

export type Skill = { name: string; core?: boolean };

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "Typed by default.",
    skills: [
      { name: "TypeScript", core: true },
      { name: "JavaScript", core: true },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Component systems, state and theming.",
    skills: [
      { name: "React 18", core: true },
      { name: "Redux", core: true },
      { name: "Redux Toolkit" },
      { name: "Redux-Persist" },
      { name: "Material UI" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Responsive design" },
      { name: "Cross-browser compatibility" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile & devices",
    blurb: "One codebase, two platforms, real hardware.",
    skills: [
      { name: "React Native", core: true },
      { name: "iOS" },
      { name: "Android" },
      { name: "BLE" },
    ],
  },
  {
    id: "realtime",
    title: "Real-time",
    blurb: "Live media, messaging and events.",
    skills: [
      { name: "WebRTC", core: true },
      { name: "Socket.io", core: true },
      { name: "SIP" },
      { name: "MQTT over WebSockets" },
    ],
  },
  {
    id: "ai",
    title: "AI",
    blurb: "Agentic, voice-first interfaces.",
    skills: [
      { name: "Generative AI", core: true },
      { name: "Agentic AI integration" },
      { name: "OpenAI API" },
    ],
  },
  {
    id: "data",
    title: "Data & integration",
    blurb: "APIs, client storage and the Microsoft ecosystem.",
    skills: [
      { name: "RESTful APIs", core: true },
      { name: "Microsoft Graph", core: true },
      { name: "IndexedDB" },
      { name: "Node.js" },
      { name: "Azure (Teams app hosting)" },
    ],
  },
  {
    id: "quality",
    title: "Testing & performance",
    blurb: "Verified, then measured.",
    skills: [
      { name: "Jest", core: true },
      { name: "React Testing Library" },
      { name: "Enzyme" },
      { name: "Lighthouse" },
      { name: "Core Web Vitals" },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & workflow",
    blurb: "Build pipelines and team practice.",
    skills: [
      { name: "Vite" },
      { name: "Webpack" },
      { name: "Babel" },
      { name: "Git" },
      { name: "GitLab" },
      { name: "Bitbucket" },
      { name: "Jira" },
      { name: "Agile Scrum" },
    ],
  },
];

export type Capability = {
  title: string;
  body: string;
  /** Where it was applied, as project names. */
  evidence: string[];
};

/** Broader engineering capabilities, each backed by specific projects. */
export const capabilities: Capability[] = [
  {
    title: "Real-time interfaces",
    body: "Live video rooms, pub/sub session state, push-based order updates and SIP-backed messaging. UIs that reflect the world as it changes.",
    evidence: ["Cybersecurity Training Platform", "Granite Block Mart", "Teams Messaging"],
  },
  {
    title: "AI & voice-first products",
    body: "Clients for Generative AI agents, where speech replaces taps and the agent drives real actions like joining, muting or sharing.",
    evidence: ["Agentic AI Voice Assistant"],
  },
  {
    title: "Data-heavy UI performance",
    body: "Large client-side datasets kept fast with IndexedDB persistence and list virtualisation, with Lighthouse and Core Web Vitals as the check.",
    evidence: ["Teams Contacts (~50k records)"],
  },
  {
    title: "Microsoft 365 integration",
    body: "Teams-embedded apps hosted on Azure, using Microsoft Graph for directories, meetings and user context.",
    evidence: ["Teams Contacts & Messaging", "Agentic AI Voice Assistant"],
  },
  {
    title: "Cross-platform & device apps",
    body: "React Native for iOS and Android, from meeting-room tablets to apps reading live vehicle sensor data.",
    evidence: ["Agentic AI Voice Assistant", "Vehicle Load Monitoring"],
  },
  {
    title: "Frontend architecture",
    body: "Shared component systems and theming across multi-portal products, predictable Redux state, and unit tests on the pieces everything depends on.",
    evidence: ["Granite Block Mart", "Task Management System"],
  },
];
