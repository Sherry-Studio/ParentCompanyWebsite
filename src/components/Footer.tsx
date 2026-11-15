import React from 'react';
import { ArrowUp, Linkedin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO, NAV_ITEMS, SERVICES } from '../data/companyData';

export const Footer: React.FC = () => (
  <footer className="relative border-t border-mist/10 bg-ink text-mist/65">
    <div className="u-container py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
        <div>
          <BrandLogo variant="light" showTagline />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist/50">
            {COMPANY_INFO.shortOverview}
          </p>
          <a
            href={COMPANY_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Byesplus on LinkedIn"
            className="mt-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-mist/15 text-mist/70 transition-colors hover:border-signal hover:bg-signal hover:text-ink"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <nav aria-label="Footer — sections">
          <span className="t-eyebrow text-mist/35">Navigate</span>
          <ul className="mt-5 space-y-3">
            {NAV_ITEMS.slice(1).map((item) => (
              <li key={item.id}>
                <a href={item.href} className="link-underline text-sm text-mist/65 hover:text-mist">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer — services">
          <span className="t-eyebrow text-mist/35">Services</span>
          <ul className="mt-5 space-y-3">
            {SERVICES.slice(0, 6).map((service) => (
              <li key={service.id}>
                <a href="#services" className="link-underline text-sm text-mist/65 hover:text-mist">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-mist/10 pt-6 text-xs text-mist/40 sm:flex-row sm:items-center">
        <span className="t-mono">
          © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <a href={`mailto:${COMPANY_INFO.contactEmail}`} className="hover:text-mist">
            {COMPANY_INFO.contactEmail}
          </a>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-mist">
            Top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
