import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NAV_ITEMS } from '../data/companyData';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 transition-all duration-300 border-b-4 border-[#F9D2BA] shadow-lg ${
        scrolled
          ? 'bg-[#1D4533]/98 backdrop-blur-md py-3 sm:py-3.5'
          : 'bg-[#1D4533] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brandmark */}
          <a
            href="#overview"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9D2BA] rounded-md p-1 -m-1"
            id="nav-logo-link"
            aria-label="Septima Group Home"
          >
            <BrandLogo variant="light" showSubtitle={true} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[#F9D2BA] text-xs font-bold uppercase tracking-widest" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  id={`nav-link-${item.id}`}
                  className={`py-1 relative transition-colors duration-150 ${
                    isActive
                      ? 'text-white font-extrabold'
                      : 'text-[#F9D2BA] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F9D2BA] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              id="header-cta-button"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-widest font-black rounded bg-[#F9D2BA] text-[#1D4533] hover:bg-[#f7c0a0] active:scale-95 transition-all shadow-sm"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#F9D2BA] hover:text-white hover:bg-[#255741] focus:outline-none focus:ring-2 focus:ring-[#F9D2BA]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="md:hidden border-t border-[#2a6148] mt-3 pt-3 pb-4 space-y-2 animate-fadeIn"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  id={`mobile-nav-link-${item.id}`}
                  className={`block px-3 py-2 rounded-md text-xs uppercase tracking-widest font-bold transition-colors ${
                    isActive
                      ? 'bg-[#255741] text-white'
                      : 'text-[#F9D2BA] hover:bg-[#255741] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={handleNavClick}
                id="mobile-cta-button"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest rounded bg-[#F9D2BA] text-[#1D4533] hover:bg-[#f7c0a0]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
