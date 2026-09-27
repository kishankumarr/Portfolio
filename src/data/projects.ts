/**
 * Projects. Every statement here comes from the résumé. The architecture
 * diagrams only show components the résumé names; the layering is how
 * those components relate to each other.
 *
 * Featured projects (`featured: true`) get a full case study on the home
 * page and a detail page at /projects/[slug].
 */

export type DiagramNode = {
  id: string;
  label: string;
  /** Short caption shown under the label. */
  meta?: string;
  /** Explanation revealed when the node is hovered or focused. */
  detail: string;
};

export type DiagramLayer = {
  /** Layer name, e.g. "Client" or "Integrations". */
  name: string;
  nodes: DiagramNode[];
};

export type Decision = {
  title: string;
  body: string;
};

export type ProjectModule = {
  name: string;
  points: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** Short category label, e.g. "Microsoft Teams app". */
  kind: string;
  platforms: string[];
  tagline: string;
  summary: string;
  role: string;
  problem: string;
  modules: ProjectModule[];
  decisions: Decision[];
  outcomes: string[];
  stack: string[];
  architecture?: DiagramLayer[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "teams-contacts-unified-messaging",
    name: "Teams Contacts & Unified Messaging",
    kind: "Microsoft Teams app",
    platforms: ["Web", "Microsoft Teams"],
    tagline:
      "A Teams-embedded app that keeps a ~50,000-person directory fast and brings WhatsApp, WeChat and LINE into one inbox.",
    summary:
      "A responsive web app, hosted on Azure and embedded in Microsoft Teams, built around two modules: an organisation-wide contact directory and a unified messaging interface.",
    role: "Frontend engineer: the contact and messaging modules, Microsoft Graph and third-party API integration, authentication, error handling and performance.",
    problem:
      "Teams users needed the entire organisational contact directory inside Teams, around 50,000 people, plus a way to reach contacts on WhatsApp, WeChat and LINE without leaving the app. A directory that size has to stay usable on the client without freezing the UI.",
    modules: [
      {
        name: "Contacts module",
        points: [
          "Synced and managed the full organisational directory through the Microsoft Graph RESTful API, around 50,000 contacts on the client.",
          "Persisted the dataset in IndexedDB for fast, offline-capable access.",
          "Rendered the directory as a virtualised list so scrolling through tens of thousands of contacts stays smooth.",
        ],
      },
      {
        name: "Messaging module",
        points: [
          "Built a unified messaging interface for WhatsApp, WeChat and LINE through third-party RESTful APIs, alongside native Teams messaging.",
          "Implemented SIP (Session Initiation Protocol) based backend communication for real-time messaging and calling.",
        ],
      },
      {
        name: "Platform",
        points: [
          "Hosted on Azure and embedded as a Teams app, styled with Tailwind CSS with light and dark themes.",
          "Handled authentication, API integration and error handling across both modules.",
          "Used Webpack, Vite and Babel for bundling and transpilation.",
        ],
      },
    ],
    decisions: [
      {
        title: "Keep the directory local",
        body: "Instead of re-querying Graph on every visit, the contact set lives in IndexedDB. Lookups stay fast and the directory still works with a flaky connection.",
      },
      {
        title: "Render only what's on screen",
        body: "A virtualised list keeps the DOM small no matter how many contacts are loaded, which is what keeps a ~50,000-row list from freezing the UI.",
      },
      {
        title: "Measure, then optimise",
        body: "Lighthouse audits and Core Web Vitals guided the performance work, not guesswork.",
      },
    ],
    outcomes: [
      "Scrolling through tens of thousands of contacts stayed smooth without freezing the UI.",
      "Unified messaging across multiple platforms inside Teams, improving collaboration workflows.",
    ],
    stack: [
      "React",
      "Tailwind CSS",
      "Microsoft Graph API",
      "IndexedDB",
      "SIP",
      "RESTful APIs",
      "Azure",
      "Webpack",
      "Vite",
      "Babel",
      "Lighthouse",
    ],
    architecture: [
      {
        name: "Host",
        nodes: [
          {
            id: "teams",
            label: "Microsoft Teams",
            meta: "embedded app",
            detail: "Delivered as a Teams app so the directory and inbox live where people already work.",
          },
          {
            id: "azure",
            label: "Azure",
            meta: "hosting",
            detail: "The web app is hosted on Azure and loaded into Teams.",
          },
        ],
      },
      {
        name: "Client",
        nodes: [
          {
            id: "contacts",
            label: "Contacts module",
            meta: "virtualised list",
            detail: "Renders only visible rows, so ~50,000 contacts scroll smoothly.",
          },
          {
            id: "messaging",
            label: "Messaging module",
            meta: "unified inbox",
            detail: "One interface for WhatsApp, WeChat, LINE and native Teams messaging.",
          },
        ],
      },
      {
        name: "Local data",
        nodes: [
          {
            id: "idb",
            label: "IndexedDB",
            meta: "offline-capable cache",
            detail: "Persists the full contact directory in the browser for fast, offline-capable access.",
          },
        ],
      },
      {
        name: "Integrations",
        nodes: [
          {
            id: "graph",
            label: "Microsoft Graph",
            meta: "REST",
            detail: "Source of truth for the organisational contact directory.",
          },
          {
            id: "thirdparty",
            label: "WhatsApp · WeChat · LINE",
            meta: "REST",
            detail: "Third-party messaging APIs behind the unified inbox.",
          },
          {
            id: "sip",
            label: "SIP backend",
            meta: "real-time",
            detail: "SIP-based communication for real-time messaging and calling.",
          },
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "agentic-ai-voice-assistant",
    name: "Agentic AI Voice Assistant",
    kind: "Device & meeting companion",
    platforms: ["iOS", "Android", "Tablet"],
    tagline:
      "A Generative AI voice assistant that joins and runs meetings by voice: join, mute, share screen, without touching the device.",
    summary:
      "The frontend for a cross-platform, Generative AI-powered agentic voice assistant built in React Native with TypeScript. It cuts down the manual work of joining and managing meetings.",
    role: "Frontend engineer: the cross-platform client, voice-agent SDK integration, the real-time communication module and Microsoft Graph integration.",
    problem:
      "Joining and managing meetings from a meeting-room device means a lot of manual steps. The goal was a tablet-friendly assistant that people talk to instead of tapping through controls.",
    modules: [
      {
        name: "Voice agent client",
        points: [
          "Built the iOS and Android client in React Native with TypeScript, Redux Toolkit for state and Tailwind CSS for styling.",
          "Integrated a real-time voice-agent SDK from the frontend to connect the app to the AI agent.",
        ],
      },
      {
        name: "Meeting controls",
        points: [
          "Added a WebRTC-based communication module on top of the agent for seamless meeting controls.",
          "Implemented voice-triggered join, mute, unmute, audio, video and screen-share.",
          "Integrated Microsoft Graph RESTful APIs for meeting and user context.",
        ],
      },
    ],
    decisions: [
      {
        title: "Voice is the primary input",
        body: "Spoken commands map directly to meeting actions (join, mute, unmute, audio, video, screen-share), so the device works hands-free.",
      },
      {
        title: "Separate agent and media layers",
        body: "The voice-agent SDK handles conversation. A WebRTC-based module layered on top handles the meeting itself.",
      },
      {
        title: "Ground the agent in real context",
        body: "Microsoft Graph supplies meeting and user information, so commands act on the right meeting.",
      },
    ],
    outcomes: [
      "Less manual effort in joining and managing meetings.",
      "One cross-platform React Native client for iOS and Android, including a tablet-based meeting-room assistant.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Generative AI",
      "Agentic AI",
      "WebRTC",
      "Microsoft Graph API",
    ],
    architecture: [
      {
        name: "Device",
        nodes: [
          {
            id: "app",
            label: "React Native app",
            meta: "iOS · Android · tablet",
            detail: "TypeScript client with Redux Toolkit for state and Tailwind CSS for styling.",
          },
        ],
      },
      {
        name: "Voice",
        nodes: [
          {
            id: "sdk",
            label: "Voice-agent SDK",
            meta: "real-time",
            detail: "Integrated from the frontend to connect the app to the agent in real time.",
          },
          {
            id: "agent",
            label: "Generative AI agent",
            meta: "agentic",
            detail: "Understands spoken requests and triggers meeting actions.",
          },
        ],
      },
      {
        name: "Meeting",
        nodes: [
          {
            id: "rtc",
            label: "WebRTC module",
            meta: "meeting controls",
            detail: "Join, mute, unmute, audio, video and screen-share, all triggered by voice.",
          },
          {
            id: "graph",
            label: "Microsoft Graph",
            meta: "REST",
            detail: "Meeting and user information that gives the assistant context.",
          },
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "cybersecurity-training-platform",
    name: "Cybersecurity Training Platform",
    kind: "Virtual education platform",
    platforms: ["Web"],
    tagline:
      "Live, hands-on cybersecurity labs in the browser, with video rooms, on-demand remote VMs and real-time session updates.",
    summary:
      "The frontend of a responsive virtual training platform for cybersecurity labs, where trainers run live sessions and participants practise on remote machines.",
    role: "Frontend engineer: the web client, live-session features, collaborative tools and the real-time and REST integrations.",
    problem:
      "Hands-on security training assumes powerful machines and native Linux. Many learners have neither. Trainers also need live sessions that keep participants engaged.",
    modules: [
      {
        name: "Live sessions",
        points: [
          "Integrated a third-party WebRTC SDK for room creation and joining, and for live audio, video and screen-share.",
          "Used MQTT over WebSockets as a lightweight publish/subscribe channel for low-latency session updates in the browser.",
        ],
      },
      {
        name: "Lab access",
        points: [
          "Implemented remote virtual-machine provisioning, giving participants on low-spec devices on-demand access to high-spec VMs.",
          "Built video assignments so trainers can assign pre-recorded training videos on Windows and Linux, keeping learners without native Linux on track.",
        ],
      },
      {
        name: "Engagement",
        points: [
          "Built an interactive whiteboard, gamification and embedded coding questions for live sessions.",
          "Built on React, Redux and Redux-Persist, with Material UI and light/dark theme switching.",
        ],
      },
    ],
    decisions: [
      {
        title: "Pub/sub for live state",
        body: "Session updates go over MQTT on WebSockets, a lightweight protocol suited to low-latency fan-out. REST APIs handle sessions, users and training content.",
      },
      {
        title: "Move the lab off the laptop",
        body: "Remote VM provisioning means a low-spec device isn't a barrier to hands-on exercises.",
      },
      {
        title: "State that survives a reload",
        body: "Redux-Persist keeps client state across page reloads, which matters in long live sessions.",
      },
    ],
    outcomes: [
      "Learners on low-spec devices get on-demand access to high-spec lab machines.",
      "Continuity for learners without native Linux access through assigned training videos.",
    ],
    stack: [
      "React",
      "Redux",
      "Redux-Persist",
      "Material UI",
      "WebRTC",
      "MQTT (WebSockets)",
      "RESTful APIs",
    ],
    architecture: [
      {
        name: "Client",
        nodes: [
          {
            id: "web",
            label: "Browser client",
            meta: "React · Redux · MUI",
            detail: "Responsive trainer and participant experience, with state persisted via Redux-Persist.",
          },
        ],
      },
      {
        name: "Real-time",
        nodes: [
          {
            id: "webrtc",
            label: "WebRTC SDK",
            meta: "audio · video · screen",
            detail: "Third-party SDK for creating and joining rooms and live media.",
          },
          {
            id: "mqtt",
            label: "MQTT over WebSockets",
            meta: "pub/sub",
            detail: "Low-latency live session updates pushed to the browser.",
          },
        ],
      },
      {
        name: "Services",
        nodes: [
          {
            id: "rest",
            label: "REST APIs",
            meta: "sessions · users · content",
            detail: "Session, user and training-content management.",
          },
          {
            id: "vm",
            label: "Remote VMs",
            meta: "on-demand",
            detail: "High-spec machines provisioned for hands-on labs.",
          },
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "granite-block-mart",
    name: "Granite Block Mart",
    kind: "Multi-portal e-commerce",
    platforms: ["Web"],
    tagline:
      "E-commerce for a stone quarry: separate Buyer, Seller and Admin portals that share one component system and update in real time.",
    summary:
      "The responsive frontend for a multi-portal e-commerce platform for a stone quarry business, with separate portals for buyers, sellers and administrators.",
    role: "Frontend engineer: all three portals, the shared component and theming system, API and real-time integration, and unit tests.",
    problem:
      "Three kinds of users (buyers, sellers and admins) need different tools over the same catalogue and orders, and they all need to see order and inventory changes as they happen.",
    modules: [
      {
        name: "Buyer portal",
        points: ["Product browsing, catalogue search and order placement."],
      },
      {
        name: "Seller portal",
        points: ["Inventory and listing management."],
      },
      {
        name: "Admin portal",
        points: ["Platform oversight plus order and user management."],
      },
      {
        name: "Shared foundation",
        points: [
          "Reusable UI components and a shared light/dark theming system across all three portals.",
          "RESTful APIs for product catalogue, pricing and order management.",
          "Socket.io for real-time order status and inventory updates across portals.",
          "Unit tests on core components.",
        ],
      },
    ],
    decisions: [
      {
        title: "One design system, three products",
        body: "Shared components and theming keep three portals consistent and avoid building the same UI three times.",
      },
      {
        title: "Push, don't poll",
        body: "Socket.io pushes order status and inventory changes, so buyers, sellers and admins all see the same state live.",
      },
      {
        title: "Tests on the foundations",
        body: "Unit tests cover the core components that every portal depends on.",
      },
    ],
    outcomes: [
      "Three role-specific portals on one consistent, themed component system.",
      "Order status and inventory stay in sync across portals in real time.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Material UI",
      "Socket.io",
      "RESTful APIs",
      "Unit testing",
    ],
    architecture: [
      {
        name: "Portals",
        nodes: [
          {
            id: "buyer",
            label: "Buyer",
            meta: "browse · search · order",
            detail: "Product browsing, catalogue search and order placement.",
          },
          {
            id: "seller",
            label: "Seller",
            meta: "inventory · listings",
            detail: "Inventory and listing management.",
          },
          {
            id: "admin",
            label: "Admin",
            meta: "oversight",
            detail: "Platform oversight plus order and user management.",
          },
        ],
      },
      {
        name: "Shared",
        nodes: [
          {
            id: "ui",
            label: "Component system",
            meta: "MUI · light/dark",
            detail: "Reusable, tested components and one theme shared by all portals.",
          },
          {
            id: "state",
            label: "Redux",
            meta: "TypeScript",
            detail: "Typed client state across the portals.",
          },
        ],
      },
      {
        name: "Transport",
        nodes: [
          {
            id: "rest",
            label: "REST APIs",
            meta: "catalogue · pricing · orders",
            detail: "Product catalogue, pricing and order management.",
          },
          {
            id: "socket",
            label: "Socket.io",
            meta: "real-time",
            detail: "Live order status and inventory updates pushed to every portal.",
          },
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "task-management-system",
    name: "Task Management System",
    kind: "Collaboration tool",
    platforms: ["Web"],
    tagline:
      "Drag-and-drop task boards with configurable workflows and live multi-user updates.",
    summary:
      "The responsive frontend of a task management application with drag-and-drop ordering, configurable workflows and real-time collaboration.",
    role: "Frontend engineer",
    problem: "",
    modules: [
      {
        name: "Highlights",
        points: [
          "Drag-and-drop task ordering and configurable workflows.",
          "REST CRUD for tasks, comments and attachments, with Socket.io for live collaboration.",
          "Reusable, accessible Material UI components with a light/dark theming system.",
        ],
      },
    ],
    decisions: [],
    outcomes: [],
    stack: ["React 18", "TypeScript", "Redux", "Material UI", "Socket.io", "RESTful APIs"],
    featured: false,
  },
  {
    slug: "vehicle-load-monitoring",
    name: "Vehicle Load Monitoring",
    kind: "Sensor application",
    platforms: ["iOS", "Android"],
    tagline:
      "Real-time truck and trailer load and centre-of-gravity monitoring from on-vehicle sensors.",
    summary:
      "A cross-platform React Native app that reads real-time sensor data to monitor truck and trailer load and centre of gravity.",
    role: "Mobile engineer",
    problem: "",
    modules: [
      {
        name: "Highlights",
        points: [
          "Reads real-time sensor data to support load and centre-of-gravity monitoring.",
          "Syncs processed sensor and load data to backend services over REST for central monitoring and reporting.",
        ],
      },
    ],
    decisions: [],
    outcomes: [],
    stack: ["React Native", "Android", "iOS", "RESTful APIs"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}
