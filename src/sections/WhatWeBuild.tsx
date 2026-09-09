import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal, MaskLine } from '../lib/anim';
import { BUILD_CATEGORIES } from '../data/companyData';

export const WhatWeBuild: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="build" className="relative bg-paper text-forest">
      <div className="u-container py-24 md:py-36">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="t-eyebrow text-clay/70">01 — What we build</span>
            <h2 className="t-h2 mt-5 max-w-3xl">
              <MaskLine text="Four things," />
              <span className="t-serif italic font-normal">one studio.</span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ul className="divide-y divide-forest/12 border-y border-forest/12">
            {BUILD_CATEGORIES.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-5 py-6 text-left md:py-8"
                >
                  <span className="t-eyebrow w-8 shrink-0 pt-2 text-clay/50">{c.index}</span>
                  <span className="flex-1">
                    <span
                      className={`block text-4xl font-extrabold tracking-tight transition-all duration-500 md:text-6xl ${
                        active === i ? 'text-forest' : 'text-forest/30'
                      }`}
                      style={{ transform: active === i ? 'translateX(8px)' : 'none' }}
                    >
                      {c.title}
                    </span>
                    <span className="mt-2 block max-w-md text-sm text-clay/80">{c.blurb}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <Reveal className="relative min-h-[320px] overflow-hidden rounded-3xl border border-forest/15 bg-forest text-cream">
            <div className="grain absolute inset-0 opacity-30" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative flex h-full flex-col justify-between p-8 md:p-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="t-eyebrow text-peach">{BUILD_CATEGORIES[active].index}</span>
                <div>
                  <p className="t-serif text-3xl italic md:text-5xl">{BUILD_CATEGORIES[active].title}</p>
                  <p className="mt-4 max-w-sm text-sm text-cream/75">{BUILD_CATEGORIES[active].detail}</p>
                </div>
                <div className="flex gap-1.5">
                  {BUILD_CATEGORIES.map((_, d) => (
                    <span
                      key={d}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        d === active ? 'w-8 bg-peach' : 'w-3 bg-cream/25'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
