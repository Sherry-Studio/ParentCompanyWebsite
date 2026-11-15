export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
}

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
  marker: string;
}

export interface Pillar {
  title: string;
  description: string;
}

export interface EngagementModel {
  id: string;
  name: string;
  bestFor: string;
  description: string;
  includes: string[];
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

export interface SubmissionStatus {
  state: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
}
