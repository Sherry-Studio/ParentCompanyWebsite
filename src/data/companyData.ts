import { DeveloperItem, NavItem, ProductItem } from '../types';

export const COMPANY_INFO = {
  name: 'Septima Group',
  legalName: 'Septima Group Holdings Ltd.',
  tagline: 'Strategic Holding & Venture Steward',
  subTagline: 'Empowering specialized teams to engineer groundbreaking interactive media and enterprise digital solutions.',
  overview:
    'Septima Group is a modern parent and holding company providing high-conviction capital, shared operational infrastructure, and strategic direction to focused technology ventures and creative studios.',
  contactEmail: 'contact@septimagroup.com',
  corporateAddress: 'Corporate Headquarters — Registry District & Digital Operations',
  socials: {
    linkedin: 'https://linkedin.com/company/septima-group',
    github: 'https://github.com/septima-group',
    x: 'https://x.com/septimagroup',
  },
  foundedYear: '2024',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#overview', id: 'overview' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Ventures', href: '#products', id: 'products' },
  { label: 'Directory', href: '#developers', id: 'developers' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

/**
 * Sub-brands showcased under Septima Group umbrella.
 * Scalable: To add a 3rd or 4th product, simply append a new object to this array.
 */
export const SUB_BRANDS: ProductItem[] = [
  {
    id: 'septima-gaming',
    name: 'Septima Interactive',
    type: 'gaming',
    categoryLabel: 'Gaming & Interactive Entertainment',
    shortTagline: 'Next-generation games and immersive real-time narrative worlds.',
    description:
      'Our dedicated interactive entertainment studio focuses on high-fidelity game mechanics, physics-driven multiplayer experiences, and proprietary creative toolsets.',
    externalUrl: 'https://interactive.septimagroup.com',
    logoPlaceholder: {
      symbol: 'SI',
      bgStyle: 'bg-[#1D4533] text-[#F9D2BA]',
      accentColor: '#1D4533',
    },
    keyHighlights: ['Multiplatform Gameplay', 'Proprietary Worldbuilding', 'Live-Ops Infrastructure'],
    status: 'Active',
  },
  {
    id: 'septima-services',
    name: 'Septima Digital Solutions',
    type: 'service',
    categoryLabel: 'Enterprise Digital Services & Advisory',
    shortTagline: 'Modern software engineering, cloud transformation, and strategic digital consulting.',
    description:
      'A specialized digital consultancy partnering with growth organizations to architect resilient distributed systems, enterprise web platforms, and automated workflow pipelines.',
    externalUrl: 'https://solutions.septimagroup.com',
    logoPlaceholder: {
      symbol: 'SDS',
      bgStyle: 'bg-[#5E3122] text-[#F7EAE0]',
      accentColor: '#5E3122',
    },
    keyHighlights: ['Full-Stack Cloud Architecture', 'System Modernization', 'Custom Enterprise APIs'],
    status: 'Active',
  },
];

/**
 * Developer & Contributor Directory.
 * Scalable: Each entry links directly to external personal portfolio sites.
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
    title: 'Founder Independence',
    description:
      'We preserve the creative vision and velocity of each venture while removing administrative friction through centralized stewardship.',
  },
  {
    title: 'Long-Horizon Capital',
    description:
      'Patient, aligned capitalization without the arbitrary constraints of short-term quarterly cycles.',
  },
  {
    title: 'Shared Infrastructure',
    description:
      'Consolidated legal, engineering standards, infrastructure pipelines, and executive governance across all subsidiaries.',
  },
];
