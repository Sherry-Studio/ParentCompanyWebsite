import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { PlusField, SignalGlow } from '../components/Decor';

const CSS_EASE = 'cubic-bezier(0.16,1,0.3,1)';

/** Headline, built as a construction: "Less complexity." then the brand promise. */
const LINE_ONE = ['Less', 'complexity.'];

export const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [enter, setEnter] = useState(false);
  // Driven by absolute scroll position rather than element measurement: the
  // hero always sits at the top of the document, and an element-relative
  // measurement taken while the preloader is still up resolves wrong.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -120]);
  const opacity = useTransform(scrollY, [0, 620], [1, reduce ? 1 : 0.15]);

  useEffect(() => {
    const id = window.setTimeout(() => setEnter(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  const on = enter || reduce;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32 pb-8 md:pt-36"
    >
      <PlusField className="z-0" opacity={0.1} size={80} />
      <SignalGlow className="left-[-10%] top-[10%] h-[45vw] w-[45vw]" intensity={0.16} />
      <SignalGlow className="right-[-5%] bottom-[5%] h-[35vw] w-[35vw]" intensity={0.1} />

      <motion.div className="u-container relative z-10 flex flex-1 flex-col justify-center" style={{ y, opacity }}>
        <div
          className="flex items-center gap-3 text-signal-bright"
          style={{ opacity: on ? 1 : 0, transition: `opacity 0.9s ${CSS_EASE} 0.1s` }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal-bright animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-bright" />
          </span>
          <span className="t-eyebrow">{COMPANY_INFO.positioning}</span>
        </div>

        <h1 className="t-display mt-7 text-mist">
          {LINE_ONE.map((line, i) => (
            <span key={line} className="mask-line">
              <span
                className="block"
                style={{
                  transform: on ? 'translateY(0%)' : 'translateY(110%)',
                  transition: `transform 1.15s ${CSS_EASE} ${0.14 + i * 0.1}s`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
          <span className="mask-line">
            <span
              className="block text-signal-bright"
              style={{
                transform: on ? 'translateY(0%)' : 'translateY(110%)',
                transition: `transform 1.15s ${CSS_EASE} 0.34s`,
              }}
            >
              <span aria-hidden="true" className="mr-[0.08em] font-extrabold">
                +
              </span>
              Plus intelligence.
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p
            className="t-lead max-w-xl text-mist/65"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? 'none' : 'translateY(18px)',
              transition: `opacity 0.9s ${CSS_EASE} 0.6s, transform 0.9s ${CSS_EASE} 0.6s`,
            }}
          >
            {COMPANY_INFO.overview}
          </p>

          <div
            className="flex flex-wrap items-center gap-4"
            style={{ opacity: on ? 1 : 0, transition: `opacity 0.9s ${CSS_EASE} 0.78s` }}
          >
            <a href="#contact" data-cursor="Talk" className="btn-signal t-eyebrow">
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#services" data-cursor="Explore" className="btn-ghost t-eyebrow text-mist/85">
              See what we do
            </a>
          </div>
        </div>
      </motion.div>

      <div className="u-container relative z-10 mt-14 flex items-end justify-between border-t border-mist/10 pt-5 text-mist/40">
        <span className="t-mono text-[11px]">{COMPANY_INFO.tagline}</span>
        <motion.span
          className="t-eyebrow flex items-center gap-2"
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          Scroll <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.span>
      </div>
    </section>
  );
};
