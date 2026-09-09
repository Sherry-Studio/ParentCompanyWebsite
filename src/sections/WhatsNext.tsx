import React from 'react';
import { Reveal, MaskLine } from '../lib/anim';
import { WHATS_NEXT } from '../data/companyData';

export const WhatsNext: React.FC = () => (
  <section id="next" className="relative py-24 md:py-40">
    <div className="u-container">
      <Reveal>
        <span className="t-eyebrow text-peach/70">07 — What&apos;s next</span>
        <h2 className="t-display mt-5 text-cream">
          <MaskLine text="Always" />
          <span className="t-serif italic font-normal">building.</span>
        </h2>
      </Reveal>

      <div className="mt-14 max-w-3xl divide-y divide-cream/12 border-y border-cream/12">
        {WHATS_NEXT.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06} className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-8">
            <span className="t-eyebrow shrink-0 text-peach/60 sm:w-28">{w.tag}</span>
            <span className="flex-1">
              <span className="block text-xl font-extrabold text-cream md:text-2xl">{w.title}</span>
              <span className="mt-1 block text-sm text-cream/60">{w.note}</span>
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 max-w-md text-sm text-cream/50">
        No vapourware — when something is real, it moves into Products.
      </Reveal>
    </div>
  </section>
);
