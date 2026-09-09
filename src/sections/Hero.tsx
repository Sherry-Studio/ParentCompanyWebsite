import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';

const LINES = ['We build', 'digital', 'products.'];
const CSS_EASE = 'cubic-bezier(0.16,1,0.3,1)';

export const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [enter, setEnter] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.2]);

  useEffect(() => {
    const id = window.setTimeout(() => setEnter(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  const on = enter || reduce;

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col justify-between pt-28 pb-10 md:pt-32">
      <motion.div className="u-container flex flex-1 flex-col justify-center" style={{ y, opacity }}>
        <div
          className="flex items-center gap-3 text-peach/80"
          style={{ opacity: on ? 1 : 0, transition: `opacity 0.8s ${CSS_EASE}` }}
        >
          <span className="h-px w-10 bg-peach/60" />
          <span className="t-eyebrow">Independent Digital Product &amp; Technology Company</span>
        </div>

        <h1 className="t-display mt-6 text-cream [text-shadow:0_2px_50px_rgba(0,0,0,0.45)]">
          {LINES.map((line, i) => (
            <span key={line} className="mask-line">
              <span
                className="block"
                style={{
                  transform: on ? 'translateY(0%)' : 'translateY(110%)',
                  transition: `transform 1.1s ${CSS_EASE} ${0.12 + i * 0.11}s`,
                }}
              >
                {i === 1 ? <span className="t-serif italic font-normal">{line}</span> : line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="mt-8 max-w-xl text-base text-cream/75 sm:text-lg"
          style={{
            opacity: on ? 1 : 0,
            transform: on ? 'none' : 'translateY(16px)',
            transition: `opacity 0.9s ${CSS_EASE} 0.55s, transform 0.9s ${CSS_EASE} 0.55s`,
          }}
        >
          {COMPANY_INFO.subTagline} We design, build and operate our own apps, games and
          platforms — and take selected client ideas from concept to production.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-5"
          style={{ opacity: on ? 1 : 0, transition: `opacity 0.8s ${CSS_EASE} 0.75s` }}
        >
          <a
            href="#products"
            data-cursor="View"
            className="rounded-full bg-peach px-7 py-3.5 t-eyebrow text-forest transition-colors hover:bg-cream"
          >
            Explore our products
          </a>
          <a href="#custom" data-cursor="Start" className="t-eyebrow link-underline text-cream/80 hover:text-cream">
            Build with us →
          </a>
        </div>
      </motion.div>

      <div className="u-container flex items-end justify-between text-cream/45">
        <span className="t-eyebrow">Est. {COMPANY_INFO.foundedYear}</span>
        <motion.span
          className="t-eyebrow"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          Scroll ↓
        </motion.span>
      </div>
    </section>
  );
};
