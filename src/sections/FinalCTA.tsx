import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MagneticButton } from '../components/MagneticButton';
import { useReveal } from '../lib/anim';

export const FinalCTA: React.FC = () => {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal();
  return (
    <section className="relative bg-ink text-cream">
      <div className="grain absolute inset-0 opacity-30" />
      <div ref={ref} className="u-container relative py-28 md:py-44">
        <motion.h2
          className="t-display"
          initial={false}
          animate={reduce || shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Have an idea?
          <br />
          <span className="t-serif italic font-normal text-peach">Let&apos;s build it.</span>
        </motion.h2>

        <div className="mt-14 flex flex-wrap gap-5">
          <MagneticButton
            href="#products"
            data-cursor="View"
            className="rounded-full bg-peach px-8 py-4 t-eyebrow text-forest transition-colors hover:bg-cream"
          >
            Explore our products →
          </MagneticButton>
          <MagneticButton
            href="#contact"
            data-cursor="Start"
            className="rounded-full border border-peach/40 px-8 py-4 t-eyebrow text-peach transition-colors hover:bg-peach hover:text-forest"
          >
            Build with us →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
