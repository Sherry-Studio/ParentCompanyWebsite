import {
  EngagementModel,
  FaqItem,
  NavItem,
  Pillar,
  ProcessStep,
  ServiceItem,
  StackGroup,
} from '../types';

/**
 * Byesplus — company facts.
 *
 * Everything here comes from the company's own brand assets and the confirmed
 * service range. No clients, awards, metrics, case studies or team members are
 * claimed. Add them here when they are verified and the sections will pick
 * them up — nothing is invented in the UI layer.
 */
export const COMPANY_INFO = {
  name: 'Byesplus',
  wordmark: 'byes',
  tagline: 'Less complexity. Plus intelligence.',
  positioning: 'AI, automation and software engineering studio',
  overview:
    'Byesplus is a software and AI studio. We design, build and automate the systems businesses run on — web platforms, mobile apps, intelligent workflows and the brand presence around them.',
  shortOverview:
    'A software and AI studio building web platforms, mobile apps and intelligent automation.',
  /** Primary address — shown first and used for the copy button. */
  contactEmail: 'sadiqamin324@gmail.com',
  /**
   * Every address enquiries should reach. Swap these for a branded address
   * (e.g. hello@byesplus.com) once the domain mailbox exists — the UI reads
   * this list, so nothing else needs changing.
   */
  contactEmails: ['sadiqamin324@gmail.com', 'shehryarnasir89@gmail.com'],
  /** Change this one line when the production domain is final. */
  siteUrl: 'https://byesplus.sherryswebsite.store',
  socials: {
    linkedin: 'https://www.linkedin.com/company/byesplus/',
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#top', id: 'top' },
  { label: 'Approach', href: '#approach', id: 'approach' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Why us', href: '#why', id: 'why' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'Engagement', href: '#engagement', id: 'engagement' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

/** Capability strip — the offering as stated on the company's own brand material. */
export const CAPABILITY_STRIP = [
  'AI & Automation',
  'Software Development',
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Video Editing',
  'Social Media Marketing',
  'SEO',
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-automation',
    index: '01',
    title: 'AI & Automation',
    summary: 'Intelligent workflows that take the manual work out of your operation.',
    detail:
      'We map the processes your team repeats every week, then replace the repetition with model-backed automation — document and data extraction, assisted drafting, routing, classification and internal copilots wired into the tools you already use.',
    deliverables: [
      'Workflow audit and automation map',
      'LLM-backed features and internal copilots',
      'Document, data and intake pipelines',
      'Evaluation, guardrails and human review steps',
    ],
  },
  {
    id: 'software',
    index: '02',
    title: 'Software Development',
    summary: 'Custom systems built for how your business actually works.',
    detail:
      'When off-the-shelf software stops fitting, we build the system that does — internal platforms, dashboards, integrations and the APIs and data models underneath them, designed to be maintained long after launch.',
    deliverables: [
      'Architecture and technical discovery',
      'Backend services, APIs and integrations',
      'Internal tools and admin platforms',
      'Migration away from legacy systems',
    ],
  },
  {
    id: 'web',
    index: '03',
    title: 'Web Development',
    summary: 'Fast, accessible web platforms and sites that convert.',
    detail:
      'From a high-performance marketing site to a full web application: modern frameworks, real performance budgets, semantic accessible markup and a content model your team can run without calling a developer.',
    deliverables: [
      'Web applications and SaaS front-ends',
      'Marketing and conversion-focused sites',
      'Headless CMS and content modelling',
      'Core Web Vitals and performance work',
    ],
  },
  {
    id: 'mobile',
    index: '04',
    title: 'Mobile App Development',
    summary: 'iOS and Android products, from first build to store release.',
    detail:
      'Cross-platform and native mobile apps — offline-first data, push, payments and device integrations — taken through store submission, release management and the analytics you need from day one.',
    deliverables: [
      'iOS and Android applications',
      'Offline-first sync and device integrations',
      'App Store and Play Store release',
      'Crash reporting and release analytics',
    ],
  },
  {
    id: 'design',
    index: '05',
    title: 'UI/UX & Brand Design',
    summary: 'Interface systems and identity that make complex products feel simple.',
    detail:
      'Research, flows and prototypes before production code, then a design system your engineers can build against — plus the brand surface around the product: identity, graphics and presentation assets.',
    deliverables: [
      'UX research, flows and prototypes',
      'Design systems and component libraries',
      'Brand identity and visual direction',
      'Design-to-code handoff',
    ],
  },
  {
    id: 'media',
    index: '06',
    title: 'Video & Content Production',
    summary: 'Product video and editorial content that explains what you built.',
    detail:
      'Edited product demos, explainers, launch films and short-form social cuts — scripted, edited, colour-graded and delivered in the formats each channel needs.',
    deliverables: [
      'Product demos and explainer videos',
      'Short-form social edits and reels',
      'Motion graphics and titling',
      'Multi-format channel delivery',
    ],
  },
  {
    id: 'growth',
    index: '07',
    title: 'Social Media Marketing',
    summary: 'Channel strategy and content that compounds instead of burning budget.',
    detail:
      'Positioning, content calendars and creative production run as one system — with reporting that ties activity back to pipeline rather than vanity metrics.',
    deliverables: [
      'Channel strategy and positioning',
      'Content calendars and production',
      'Paid and organic campaign management',
      'Performance reporting',
    ],
  },
  {
    id: 'seo',
    index: '08',
    title: 'SEO & Technical Growth',
    summary: 'Technical foundations and content that earn durable search traffic.',
    detail:
      'Technical audits, structured data, information architecture and content strategy — built into the site rather than bolted on, so performance and discoverability move together.',
    deliverables: [
      'Technical SEO audits and fixes',
      'Structured data and indexation',
      'Keyword and content strategy',
      'Analytics and search reporting',
    ],
  },
];

export const PILLARS: Pillar[] = [
  {
    title: 'One team, end to end',
    description:
      'Strategy, design, engineering and content sit in the same studio. Nothing is handed between agencies, and nothing is lost in the gap between them.',
  },
  {
    title: 'Intelligence where it pays off',
    description:
      'We apply AI where it removes real cost or real waiting — not as a label on a homepage. If the simpler system wins, we build the simpler system.',
  },
  {
    title: 'Built to be maintained',
    description:
      'Clear architecture, documented decisions and code your own team can pick up. You own everything we build, on your infrastructure and your accounts.',
  },
  {
    title: 'Senior people on the work',
    description:
      'Small focused teams who do the work themselves. You talk to the people building your product, not to a layer in between.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discovery',
    marker: 'Understand',
    body: 'We dig into the business, the users and the constraints — what the system has to do, what it costs you today, and what success looks like in numbers.',
  },
  {
    index: '02',
    title: 'Strategy',
    marker: 'Define',
    body: 'Scope, architecture and a sequenced plan. We agree what ships first, what it will cost, and what is deliberately left for later.',
  },
  {
    index: '03',
    title: 'Design',
    marker: 'Shape',
    body: 'Flows, interface systems and clickable prototypes you can use and react to before a line of production code is written.',
  },
  {
    index: '04',
    title: 'Development',
    marker: 'Build',
    body: 'Short build cycles with working software at the end of each one. You see progress continuously, in a real environment, not in a status report.',
  },
  {
    index: '05',
    title: 'Testing',
    marker: 'Prove',
    body: 'Automated coverage, real-device QA, accessibility checks and performance budgets enforced before anything reaches your users.',
  },
  {
    index: '06',
    title: 'Launch & Support',
    marker: 'Operate',
    body: 'Deployment, monitoring, analytics and a support arrangement that matches how critical the system is. We stay on after release.',
  },
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: 'project',
    name: 'Fixed-scope project',
    bestFor: 'A defined build with a clear outcome',
    description:
      'We scope the work, agree a price and a timeline, and ship it. Best when you know what you need and want certainty on cost.',
    includes: [
      'Scoped statement of work',
      'Fixed price and timeline',
      'Staged delivery and review',
      'Handover and documentation',
    ],
  },
  {
    id: 'partner',
    name: 'Ongoing product team',
    bestFor: 'A product that keeps evolving',
    description:
      'A dedicated team working to your roadmap month by month — design, engineering and automation capacity you can redirect as priorities move.',
    includes: [
      'Dedicated senior team',
      'Monthly roadmap planning',
      'Continuous release cycles',
      'Direct access to the builders',
    ],
  },
  {
    id: 'sprint',
    name: 'Discovery sprint',
    bestFor: 'An idea that needs shaping first',
    description:
      'A short, focused engagement that turns an idea into a validated plan: scope, architecture, prototype and a realistic estimate to build it.',
    includes: [
      'Stakeholder and user research',
      'Technical feasibility review',
      'Clickable prototype',
      'Costed build plan',
    ],
  },
];

export const STACK_GROUPS: StackGroup[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'REST & GraphQL', 'Redis'] },
  { label: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { label: 'AI & Data', items: ['LLM APIs', 'RAG pipelines', 'Vector search', 'Workflow automation'] },
  { label: 'Cloud & Ops', items: ['AWS', 'Vercel', 'Docker', 'CI/CD', 'Observability'] },
  { label: 'Design & Content', items: ['Figma', 'Design systems', 'Premiere Pro', 'After Effects'] },
];

/** Questions a prospective client actually asks before getting in touch. */
export const FAQS: FaqItem[] = [
  {
    q: 'How does a project usually start?',
    a: 'With a short call. We talk through the problem, what you already have, and the outcome you need. If it is a fit, we follow up with a scoped proposal — there is no charge and no obligation for that conversation.',
  },
  {
    q: 'Who owns the code and the accounts?',
    a: 'You do. Work is built in your repositories and deployed to your infrastructure and accounts. There is no lock-in, and handover is part of the engagement rather than an extra.',
  },
  {
    q: 'Can you work alongside our existing team?',
    a: 'Yes. We work with in-house developers, designers and marketing teams — either taking a defined workstream or embedding into the process you already run.',
  },
  {
    q: 'What does an AI project actually involve?',
    a: 'It starts with the workflow, not the model. We map where time and cost are going, identify what can be automated safely, then build and evaluate it with a human review step wherever the stakes justify one.',
  },
];
