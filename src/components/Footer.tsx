import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO } from '../data/companyData';

const COLS = [
  { title: 'Explore', links: [['Products', '#products'], ['Games', '#games'], ['Custom', '#custom'], ['Studio', '#studio']] },
  { title: 'Company', links: [['What we build', '#build'], ['How we build', '#process'], ["What's next", '#next'], ['Contact', '#contact']] },
];

export const Footer: React.FC = () => (
  <footer className="relative bg-ink text-cream/70">
    <div className="u-container border-t border-cream/12 py-16">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandLogo variant="light" showSubtitle />
          <p className="mt-5 max-w-xs text-sm text-cream/55">
            {COMPANY_INFO.overview}
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <span className="t-eyebrow text-cream/40">{c.title}</span>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="link-underline text-sm text-cream/70 hover:text-cream">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/12 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {COMPANY_INFO.legalName} All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href={COMPANY_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cream">LinkedIn</a>
          <a href={COMPANY_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cream">GitHub</a>
          <a href={COMPANY_INFO.socials.x} target="_blank" rel="noopener noreferrer" className="hover:text-cream">X</a>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-cream">
            Top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
