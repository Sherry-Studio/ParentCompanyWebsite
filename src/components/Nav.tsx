import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { MagneticButton } from './MagneticButton';
import { COMPANY_INFO, NAV_ITEMS } from '../data/companyData';

export const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#approach"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'py-3' : 'py-6'
        }`}
        style={{
          background: scrolled ? 'rgba(7, 13, 19, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(238,243,241,0.08)' : 'transparent'}`,
        }}
      >
        <div className="u-container flex items-center justify-between gap-6">
          <a href="#top" className="group shrink-0" aria-label="Byesplus — back to top">
            <BrandLogo variant="light" showTagline={!scrolled} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? 'true' : undefined}
                className={`t-eyebrow relative whitespace-nowrap py-1 transition-colors ${
                  active === item.id ? 'text-signal-bright' : 'text-mist/55 hover:text-mist'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-signal-bright"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton
              href="#contact"
              data-cursor="Talk"
              className="hidden whitespace-nowrap rounded-full border border-signal/50 px-5 py-2.5 t-eyebrow text-signal-bright transition-colors hover:bg-signal hover:text-ink md:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-mist/15 xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span
                className={`h-[1.5px] w-5 bg-mist transition-transform duration-300 ${
                  open ? 'translate-y-[6.5px] rotate-45' : ''
                }`}
              />
              <span className={`h-[1.5px] w-5 bg-mist transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span
                className={`h-[1.5px] w-5 bg-mist transition-transform duration-300 ${
                  open ? '-translate-y-[6.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col justify-center bg-ink px-6 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-1 text-[clamp(2rem,10vw,3.2rem)] font-extrabold tracking-[-0.04em] text-mist"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="t-mono text-xs text-signal-bright/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href={`mailto:${COMPANY_INFO.contactEmail}`}
              className="t-mono mt-12 text-sm text-mist/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {COMPANY_INFO.contactEmail}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
