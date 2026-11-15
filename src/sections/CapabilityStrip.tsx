import React from 'react';
import { CAPABILITY_STRIP } from '../data/companyData';

/**
 * Edge-to-edge capability marquee. Two rows moving in opposite directions,
 * separated by the brand plus glyph. Decorative repetition is hidden from
 * assistive tech; one readable list is exposed instead.
 */
const Row: React.FC<{ reverse?: boolean }> = ({ reverse }) => (
  <div className="flex w-max" aria-hidden="true">
    {[0, 1].map((dup) => (
      <div
        key={dup}
        className={`flex shrink-0 items-center ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}
      >
        {CAPABILITY_STRIP.map((item) => (
          <span key={item} className="flex items-center">
            <span className="px-7 text-[clamp(1.1rem,2.4vw,2rem)] font-extrabold tracking-[-0.035em] text-mist/80 whitespace-nowrap">
              {item}
            </span>
            <span className="text-[clamp(1rem,2vw,1.6rem)] font-extrabold text-signal-bright">+</span>
          </span>
        ))}
      </div>
    ))}
  </div>
);

export const CapabilityStrip: React.FC = () => (
  <section className="relative overflow-hidden border-y border-mist/10 bg-navy/60 py-10 backdrop-blur-sm">
    <ul className="sr-only">
      {CAPABILITY_STRIP.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <div className="flex flex-col gap-4 overflow-hidden">
      <Row />
      <Row reverse />
    </div>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
  </section>
);
