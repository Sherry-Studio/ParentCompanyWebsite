import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO, NAV_ITEMS } from '../data/companyData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-[#1D4533] text-[#F7EAE0] pt-14 pb-12 border-t-4 border-[#F9D2BA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#255741]">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <BrandLogo variant="light" showSubtitle={true} />
            <p className="text-xs sm:text-sm text-[#F7EAE0]/80 max-w-md leading-relaxed font-normal">
              Septima Group is a parent company stewarding specialized entities across gaming and enterprise digital services.
              Built on capital discipline, craft autonomy, and generational horizons.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#F9D2BA] font-bold bg-[#255741] px-3.5 py-1.5 rounded border border-[#F9D2BA]/20 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.legalName}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F9D2BA]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[#F7EAE0]/80 hover:text-[#F9D2BA] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Holding Disclaimers */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F9D2BA]">
              Governance & Disclosures
            </div>
            <p className="text-xs text-[#F7EAE0]/75 leading-relaxed font-normal">
              All portfolio brands, trademarks, and associated logos are registered properties of Septima Group Holdings Ltd. or their respective operational subsidiaries.
            </p>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-[#F7EAE0]/80 pt-2">
              <span className="hover:text-[#F9D2BA] cursor-pointer">Privacy Charter</span>
              <span className="w-1 h-1 rounded-full bg-[#F9D2BA]"></span>
              <span className="hover:text-[#F9D2BA] cursor-pointer">Terms of Holding</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-wider text-[#F7EAE0]/80">
          <div>
            Septima Group © {new Date().getFullYear()}. All Holdings Reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#255741] text-[#F9D2BA] hover:bg-[#F9D2BA] hover:text-[#1D4533] transition-colors shadow-xs font-black text-xs"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
