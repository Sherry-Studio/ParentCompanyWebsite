import React, { Suspense, lazy } from 'react';
import { Layers, Compass, Users, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { HeroFallbackUI } from './3d/Hero3DCanvas';

// Lazy-load 3D Canvas so it does not block initial paint
const Hero3DCanvas = lazy(() =>
  import('./3d/Hero3DCanvas').then((module) => ({ default: module.Hero3DCanvas }))
);

export const Hero: React.FC = () => {
  const snapshotCards = [
    {
      id: 'preview-products',
      title: 'Our Ventures',
      subtitle: 'Sub-Brands & Products',
      description: 'Explore our specialized gaming studio and enterprise digital services firm.',
      href: '#products',
      icon: Layers,
      badge: '2 Portfolio Brands',
      ctaText: 'View Ventures',
    },
    {
      id: 'preview-about',
      title: 'Parent Mandate',
      subtitle: 'About & Vision',
      description: 'Discover the governance principles and long-horizon ethos driving Septima Group.',
      href: '#about',
      icon: Compass,
      badge: 'Holding Structure',
      ctaText: 'Our Story',
    },
    {
      id: 'preview-developers',
      title: 'Talent Network',
      subtitle: 'Developer Directory',
      description: 'Direct links to the engineers, architects, and creators building our ecosystems.',
      href: '#developers',
      icon: Users,
      badge: 'Specialist Directory',
      ctaText: 'Meet Contributors',
    },
    {
      id: 'preview-contact',
      title: 'Corporate Inquiries',
      subtitle: 'Contact & Partnerships',
      description: 'Connect with holding leadership, venture operators, or explore strategic partnerships.',
      href: '#contact',
      icon: Send,
      badge: 'Direct Channels',
      ctaText: 'Initiate Contact',
    },
  ];

  return (
    <section id="overview" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Grid: Left Copy & Right 3D Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Headline, Mission & CTAs */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section Eyebrow with Sophisticated Dark accent bar */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-[#1D4533] mb-5">
              <span className="w-5 h-[2px] bg-[#1D4533]" aria-hidden="true" />
              <ShieldCheck className="w-4 h-4 text-[#1D4533]" />
              <span>Parent & Foundational Holding Entity</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#1D4533] leading-[1.08] mb-5">
              Consolidating Innovation Across Verticals.
            </h1>

            <p className="text-lg sm:text-xl font-bold text-[#5E3122] mb-4 leading-snug">
              {COMPANY_INFO.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#5E3122] font-medium max-w-2xl leading-relaxed mb-7 opacity-90">
              {COMPANY_INFO.overview}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                id="hero-cta-products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#F9D2BA] text-[#1D4533] font-black text-xs uppercase tracking-widest hover:bg-[#f7c0a0] active:scale-[0.98] transition-all shadow-md"
              >
                <span>Explore Sub-Brands</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                id="hero-cta-about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-white border-2 border-[#1D4533]/20 text-[#1D4533] font-black text-xs uppercase tracking-widest hover:bg-[#1D4533] hover:text-[#F9D2BA] hover:border-[#1D4533] active:scale-[0.98] transition-all shadow-sm"
              >
                <span>Holding Philosophy</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Canvas Stage */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full bg-white/40 backdrop-blur-xs rounded-2xl p-2 sm:p-3 border-2 border-[#1D4533]/15 shadow-xl">
              <Suspense fallback={<HeroFallbackUI />}>
                <Hero3DCanvas />
              </Suspense>
            </div>
          </motion.div>
        </div>

        {/* Snapshot Preview Cards with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-t border-[#5E3122]/20 pt-8 mb-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-black text-[#1D4533] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#1D4533]" aria-hidden="true" />
              <span>Navigation Index & Snapshot Directives</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {snapshotCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.id}
                  href={card.href}
                  id={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative flex flex-col justify-between p-6 rounded-xl bg-white shadow-md border-b-4 border-[#1D4533] hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded bg-[#F9D2BA] flex items-center justify-center text-[#1D4533] font-black group-hover:bg-[#1D4533] group-hover:text-[#F9D2BA] transition-colors shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7EAE0] text-[#1D4533] border border-[#1D4533]/15">
                        {card.badge}
                      </span>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1D4533]/80 mb-1">
                      {card.subtitle}
                    </p>
                    <h3 className="text-lg font-bold text-[#1D4533] mb-2 group-hover:text-[#5E3122] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#5E3122]/85 leading-relaxed mb-6 font-medium">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F7EAE0] flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[#1D4533] group-hover:text-[#5E3122]">
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
