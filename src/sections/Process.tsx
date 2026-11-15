import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { SectionHeading } from '../components/Decor';
import { Reveal } from '../lib/anim';

export const Process: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="u-container relative z-10">
        <SectionHeading
          eyebrow="How we work"
          title="Six steps from"
          accent="idea to operating."
          lead="The same sequence on every engagement, scaled to the size of the problem. You always know which step you are in and what comes out of it."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* Progress rail */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-mist/10 md:left-[15px]" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-signal-bright to-signal"
              style={{ scaleY }}
            />
          </div>

          <ol className="space-y-12 md:space-y-16">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={0.04} y={20}>
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10">
                    <span
                      className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-signal/40 bg-ink text-[10px] font-bold text-signal-bright md:h-8 md:w-8 md:text-xs"
                      aria-hidden="true"
                    >
                      +
                    </span>

                    <div className="grid gap-4 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:gap-12">
                      <div>
                        <span className="t-mono text-xs text-mist/35">{step.index}</span>
                        <h3 className="t-h3 mt-2 text-mist">{step.title}</h3>
                        <span className="t-eyebrow mt-3 inline-block text-signal-bright/80">
                          {step.marker}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-mist/60 md:text-base md:leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="ml-12 mt-12 h-px bg-mist/[0.07] md:ml-[72px] md:mt-16" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
