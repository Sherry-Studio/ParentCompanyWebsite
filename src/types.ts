export type ProductType = 'gaming' | 'service' | 'enterprise' | 'consumer';

export interface ProductItem {
  id: string;
  name: string;
  type: ProductType;
  categoryLabel: string;
  description: string;
  shortTagline: string;
  externalUrl: string;
  logoPlaceholder: {
    symbol: string;
    bgStyle: string;
    accentColor: string;
  };
  keyHighlights: string[];
  status: 'Active' | 'Beta' | 'Scaling';
}

export interface DeveloperItem {
  id: string;
  name: string;
  role: string;
  portfolioUrl: string;
  handle?: string;
  avatarInitials: string;
  accentBg: string;
  specialty: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SubmissionStatus {
  state: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
}
