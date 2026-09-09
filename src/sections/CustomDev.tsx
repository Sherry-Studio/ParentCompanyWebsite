import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, MaskLine } from '../lib/anim';
import { SERVICES, SUB_BRANDS } from '../data/companyData';

export const CustomDev: React.FC = () => {
  const [hover, setHover] = useState<number | null>(null);
  const partner = SUB_BRANDS.find((s) => s.type === 'service')!;

  return (
    <section id="custom" className="relative bg-paper text-forest">
      <div className="u-container py-24 md:py-36">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="t-eyebrow text-clay/70">04 — Custom development</span>
            <h2 className="t-h2 mt-5">
              <MaskLine text="Your idea." />
              <span className="t-serif italic font-normal">Our build.</span>
            </h2>
            <p className="mt-6 max-w-sm text-clay/80">
              We take a concept from first sketch to production — embedding as a senior product team
              and staying on after launch. Delivered through {partner.name}.
            </p>
            <a
              href={partner.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
              className="group mt-8 inline-flex items-center gap-2 t-eyebrow link-underline"
            >
              {partner.name}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <ul className="border-t border-forest/12">
            {SERVICES.map((s, i) => (
              <li
                key={s.index}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group relative border-b border-forest/12"
              >
                <div className="flex items-center gap-5 py-6">
                  <span className="t-eyebrow w-8 text-clay/50">{s.index}</span>
                  <span className="flex-1 text-2xl font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                    {s.title}
                  </span>
                  <ArrowUpRight className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <AnimatePresence>
                  {hover === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden text-sm text-clay/75"
                    >
                      <span className="block pb-6 pl-[3.25rem]">{s.hint}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
