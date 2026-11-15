import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { MaskLine, Reveal } from '../lib/anim';
import { PlusField, SignalGlow } from '../components/Decor';
import { MagneticButton } from '../components/MagneticButton';

export const FinalCTA: React.FC = () => (
  <section className="relative overflow-hidden bg-ink py-28 md:py-40">
    <PlusField opacity={0.1} size={72} />
    <SignalGlow className="left-1/2 top-1/2 h-[50vw] w-[70vw] -translate-x-1/2 -translate-y-1/2" intensity={0.16} />

    <div className="u-container relative z-10 text-center">
      <Reveal>
        <span className="t-eyebrow inline-flex items-center gap-2.5 text-signal-bright">
          <span className="plus-mark text-sm leading-none">+</span>
          Start here
        </span>
      </Reveal>

      <h2 className="t-h2 mx-auto mt-7 max-w-4xl text-mist">
        <MaskLine text="Let us take the" className="text-center" />
        <MaskLine text="complexity off your plate." delay={0.07} className="text-center text-signal-bright" />
      </h2>

      <Reveal delay={0.12}>
        <p className="t-lead mx-auto mt-8 max-w-xl text-mist/60">
          Tell us the problem in a few sentences. We will come back with how we would
          approach it, what it would take, and whether we are the right team for it.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="#contact" data-cursor="Talk" className="btn-signal t-eyebrow">
            Start a project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <a
            href={`mailto:${COMPANY_INFO.contactEmail}`}
            data-cursor="Email"
            className="btn-ghost t-mono text-xs tracking-[0.06em] text-mist/85"
          >
            {COMPANY_INFO.contactEmail}
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);
