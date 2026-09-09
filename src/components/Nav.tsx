import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { MagneticButton } from './MagneticButton';
import { NAV_ITEMS } from '../data/companyData';

export const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          scrolled ? 'py-3 backdrop-blur-md' : 'py-5'
        }`}
        style={{
          background: scrolled ? 'color-mix(in srgb, #12241c 78%, transparent)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(249,210,186,0.14)' : '1px solid transparent',
        }}
      >
        <div className="u-container flex items-center justify-between">
          <a href="#top" className="group" aria-label="Septima Group — top">
            <BrandLogo variant="light" showSubtitle={!scrolled} />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`t-eyebrow link-underline transition-colors ${
                  active === item.id ? 'text-peach' : 'text-cream/65 hover:text-cream'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticButton
              href="#custom"
              data-cursor="Let's build"
              className="hidden rounded-full border border-peach/40 px-5 py-2.5 t-eyebrow text-peach transition-colors hover:bg-peach hover:text-forest sm:inline-flex"
            >
              Build with us
            </MagneticButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className={`h-[2px] w-6 bg-cream transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-[2px] w-6 bg-cream transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] w-6 bg-cream transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col justify-center bg-ink px-6 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="t-h2 py-1 text-cream"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
