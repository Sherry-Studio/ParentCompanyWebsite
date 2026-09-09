import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { MaskLine } from '../lib/anim';
import { PROCESS_STEPS } from '../data/companyData';

export const Process: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.35'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" className="relative bg-forest text-cream">
      <div className="grain absolute inset-0 opacity-20" />
      <div className="u-container relative py-24 md:py-36">
        <span className="t-eyebrow text-peach/70">05 — How we build</span>
        <h2 className="t-h2 mt-5 max-w-2xl">
          <MaskLine text="From a sentence" />
          <span className="t-serif italic font-normal">to a shipped product.</span>
        </h2>

        <div ref={ref} className="mt-16 grid gap-12 md:grid-cols-[1fr_0.8fr] md:gap-20">
          <ol className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-cream/15" />
            <motion.div
              className="absolute left-[7px] top-2 w-px origin-top bg-peach"
              style={{ scaleY: line, height: 'calc(100% - 1rem)' }}
            />
            {PROCESS_STEPS.map((s, i) => {
              const seg = i / PROCESS_STEPS.length;
              const o = useTransform(line, [seg - 0.1, seg + 0.05], [0.3, 1]);
              return (
                <motion.li key={s.index} style={{ opacity: o }} className="relative mb-12 pl-10 last:mb-0">
                  <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-peach bg-forest" />
                  <div className="flex items-baseline gap-3">
                    <span className="t-eyebrow text-peach/60">{s.index}</span>
                    <h3 className="text-2xl font-extrabold md:text-3xl">{s.title}</h3>
                  </div>
                  <p className="mt-2 max-w-sm text-sm text-cream/70">{s.body}</p>
                </motion.li>
              );
            })}
          </ol>

          <div className="hidden md:block">
            <div className="sticky top-32">
              <Assembly progress={line} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Assembly: React.FC<{ progress: ReturnType<typeof useSpring> }> = ({ progress }) => {
  const items = [
    { r: 0, s: 1.4, c: 'border-cream/25' },
    { r: 12, s: 1.1, c: 'border-peach/40' },
    { r: -8, s: 0.85, c: 'bg-forest/60 border-cream/20' },
    { r: 20, s: 0.6, c: 'bg-peach/15 border-peach/30' },
    { r: 0, s: 0.4, c: 'bg-peach shadow-[0_0_50px_rgba(249,210,186,0.4)]' },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      {items.map((it, i) => {
        const seg = i / items.length;
        const opacity = useTransform(progress, [seg - 0.05, seg + 0.15], [0, 1]);
        const scale = useTransform(progress, [seg - 0.05, seg + 0.2], [0.6, 1]);
        return (
          <motion.div
            key={i}
            style={{ opacity, scale, rotate: it.r }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border ${it.c}`}
            initial={false}
          >
            <div style={{ width: `${it.s * 14}rem`, height: `${it.s * 14}rem` }} />
          </motion.div>
        );
      })}
    </div>
  );
};
