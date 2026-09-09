import { DeveloperItem, NavItem, ProductItem } from '../types';

export const COMPANY_INFO = {
  name: 'Septima Group',
  legalName: 'Septima Group Holdings Ltd.',
  tagline: 'We build digital products.',
  subTagline: 'Apps, games, platforms and experiences — built from idea to launch.',
  overview:
    'Septima Group is an independent digital product and technology company. We design, build and operate our own products — and take selected client ideas from concept to production.',
  contactEmail: 'contact@septimagroup.com',
  corporateAddress: 'Registry District — Digital Product & Engineering Operations',
  socials: {
    linkedin: 'https://linkedin.com/company/septima-group',
    github: 'https://github.com/septima-group',
    x: 'https://x.com/septimagroup',
  },
  foundedYear: '2024',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Studio', href: '#top', id: 'top' },
  { label: 'What We Build', href: '#build', id: 'build' },
  { label: 'Products', href: '#products', id: 'products' },
  { label: 'Games', href: '#games', id: 'games' },
  { label: 'Custom', href: '#custom', id: 'custom' },
  { label: 'Team', href: '#studio', id: 'studio' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

/** The four things Septima Group builds. */
export const BUILD_CATEGORIES = [
  {
    id: 'products',
    index: '01',
    title: 'Products',
    blurb: 'Our own digital products — designed, built and operated in-house.',
    detail: 'Long-lived platforms and tools we own end to end, from roadmap to infrastructure.',
  },
  {
    id: 'games',
    index: '02',
    title: 'Games',
    blurb: 'Interactive experiences for mobile and web.',
    detail: 'Real-time mechanics, physics-driven multiplayer and proprietary worldbuilding toolsets.',
  },
  {
    id: 'apps',
    index: '03',
    title: 'Apps',
    blurb: 'Useful consumer and business applications.',
    detail: 'Focused mobile and web apps that solve one problem exceptionally well.',
  },
  {
    id: 'custom',
    index: '04',
    title: 'Custom',
    blurb: 'Digital products and software built with selected clients.',
    detail: 'We embed as a product team and ship — strategy, design, engineering, launch.',
  },
];

/**
 * Products Septima Group builds and owns.
 * Scalable: append a new object to extend the portfolio.
 */
export const SUB_BRANDS: ProductItem[] = [
  {
    id: 'septima-gaming',
    name: 'Septima Interactive',
    type: 'gaming',
    categoryLabel: 'Games & Interactive Entertainment',
    shortTagline: 'Next-generation games and immersive real-time narrative worlds.',
    description:
      'Our interactive entertainment studio, focused on high-fidelity game mechanics, physics-driven multiplayer and proprietary creative toolsets.',
    externalUrl: 'https://interactive.septimagroup.com',
    logoPlaceholder: {
      symbol: 'SI',
      bgStyle: 'bg-[#1D4533] text-[#F9D2BA]',
      accentColor: '#1D4533',
    },
    keyHighlights: ['Multiplatform Gameplay', 'Proprietary Worldbuilding', 'Live-Ops Infrastructure'],
    status: 'Active',
    platform: 'Mobile · Web · PC',
    year: '2024',
  },
  {
    id: 'septima-services',
    name: 'Septima Digital Solutions',
    type: 'service',
    categoryLabel: 'Platforms & Enterprise Software',
    shortTagline: 'Modern software engineering, cloud platforms and product consulting.',
    description:
      'The team that partners with growth organisations to architect resilient distributed systems, enterprise web platforms and automated workflow pipelines.',
    externalUrl: 'https://solutions.septimagroup.com',
    logoPlaceholder: {
      symbol: 'SDS',
      bgStyle: 'bg-[#5E3122] text-[#F7EAE0]',
      accentColor: '#5E3122',
    },
    keyHighlights: ['Full-Stack Cloud Architecture', 'System Modernization', 'Custom Enterprise APIs'],
    status: 'Active',
    platform: 'Web · Cloud · API',
    year: '2024',
  },
];

/** Custom development capabilities. */
export const SERVICES = [
  { index: '01', title: 'Product Strategy', hint: 'Positioning, roadmap, scope and the shape of v1.' },
  { index: '02', title: 'UI / UX Design', hint: 'Systems, prototypes and interface craft.' },
  { index: '03', title: 'Mobile Development', hint: 'Native and cross-platform apps for iOS and Android.' },
  { index: '04', title: 'Web Development', hint: 'Fast, accessible web apps and marketing surfaces.' },
  { index: '05', title: 'Backend & APIs', hint: 'Distributed services, data models and integrations.' },
  { index: '06', title: 'Game Development', hint: 'Real-time engines, multiplayer and tooling.' },
  { index: '07', title: 'AI Integration', hint: 'Model-backed features, pipelines and evaluation.' },
  { index: '08', title: 'Cloud & Deployment', hint: 'Infrastructure, CI/CD and live-ops.' },
];

/** How we build. */
export const PROCESS_STEPS = [
  { index: '01', title: 'Idea', body: 'We pressure-test the concept, the audience and the smallest version worth shipping.' },
  { index: '02', title: 'Design', body: 'Flows, interface systems and prototypes you can hold before a line of production code.' },
  { index: '03', title: 'Build', body: 'Small senior teams shipping in short cycles against a real roadmap.' },
  { index: '04', title: 'Test', body: 'Automated coverage, real-device QA and usability sessions with real users.' },
  { index: '05', title: 'Launch', body: 'Store submission, infrastructure, analytics and a day-one operations plan.' },
  { index: '06', title: 'Iterate', body: 'We stay on. Products are operated, measured and improved release over release.' },
];

/** Forward-looking work. */
export const WHATS_NEXT = [
  { tag: 'In Design', title: 'A creator toolset for Septima Interactive worlds', note: 'Bringing proprietary worldbuilding tools to external studios.' },
  { tag: 'In Build', title: 'Shared product infrastructure layer', note: 'One identity, billing and analytics spine across every Septima product.' },
  { tag: 'Exploration', title: 'AI-assisted production pipeline', note: 'Model-backed tooling for asset, content and QA workflows.' },
];

/**
 * The studio — the people behind the products.
 * Each entry links directly to that person's personal portfolio / repositories.
 */
export const DEVELOPERS_DIRECTORY: DeveloperItem[] = [
  {
    id: 'dev-1',
    name: 'Alexander Chen',
    role: 'Principal Systems Architect',
    portfolioUrl: 'https://github.com/alexanderchen-dev',
    handle: '@alexanderchen',
    avatarInitials: 'AC',
    accentBg: 'bg-[#1D4533]',
    specialty: 'Distributed Engines & Low-Latency Systems',
  },
  {
    id: 'dev-2',
    name: 'Elena Rostova',
    role: 'Lead Graphics & Gameplay Engineer',
    portfolioUrl: 'https://github.com/erostova-portfolio',
    handle: '@erostova',
    avatarInitials: 'ER',
    accentBg: 'bg-[#5E3122]',
    specialty: 'Shader Pipelines & Realtime Rendering',
  },
  {
    id: 'dev-3',
    name: 'Marcus Vance',
    role: 'Senior Cloud & Platform Specialist',
    portfolioUrl: 'https://github.com/marcusvance',
    handle: '@mvance',
    avatarInitials: 'MV',
    accentBg: 'bg-[#1D4533]',
    specialty: 'Infrastructure Automation & Microservices',
  },
  {
    id: 'dev-4',
    name: 'Sophia Lindqvist',
    role: 'Head of Interaction & Interface Engineering',
    portfolioUrl: 'https://github.com/sophialindqvist',
    handle: '@sophialind',
    avatarInitials: 'SL',
    accentBg: 'bg-[#5E3122]',
    specialty: 'Design Systems & Frontend Architecture',
  },
  {
    id: 'dev-5',
    name: 'Devon Patel',
    role: 'Backend & Data Protocol Engineer',
    portfolioUrl: 'https://github.com/devonpatel-dev',
    handle: '@devonpatel',
    avatarInitials: 'DP',
    accentBg: 'bg-[#1D4533]',
    specialty: 'State Synchronization & API Gateways',
  },
  {
    id: 'dev-6',
    name: 'Claire Moreau',
    role: 'Security & Operations Engineer',
    portfolioUrl: 'https://github.com/clairemoreau',
    handle: '@cmoreau',
    avatarInitials: 'CM',
    accentBg: 'bg-[#5E3122]',
    specialty: 'Zero-Trust Architecture & Threat Modeling',
  },
];

export const PILLARS = [
  {
    title: 'We own what we build',
    description:
      'Most of our work is our own. Products are designed, operated and improved in-house — not handed off.',
  },
  {
    title: 'Small senior teams',
    description:
      'Focused groups of principal engineers and designers, shipping in short cycles without layers in between.',
  },
  {
    title: 'Built to last',
    description:
      'Decade-scale commitment to the products and the platforms underneath them.',
  },
];
