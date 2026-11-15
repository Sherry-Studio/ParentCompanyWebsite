import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Reveal, MaskLine } from '../lib/anim';
import { PlusField, SignalGlow } from '../components/Decor';

/**
 * The brand idea, made literal: a ledger of what we take out of a business
 * and what we add back. Derived from the tagline rather than decorating it.
 */
const REMOVE = [
  'Manual work that repeats every week',
  'Four vendors who each own one piece',
  'Tooling nobody on your team can change',
  'Roadmaps that stall between hand-offs',
];

const ADD = [
  'Automation that runs the repetition for you',
  'One senior team accountable end to end',
  'Systems documented for your own developers',
  'Working software at the end of every cycle',
];

export const Approach: React.FC = () => (
  <section id="approach" className="relative overflow-hidden bg-ink py-24 md:py-36">
    <PlusField opacity={0.06} size={96} />
    <SignalGlow className="left-1/2 top-0 h-[32vw] w-[60vw] -translate-x-1/2" intensity={0.1} />

    <div className="u-container relative z-10">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="t-eyebrow inline-flex items-center gap-2.5 text-signal-bright">
              <span className="plus-mark text-sm leading-none">+</span>
              The approach
            </span>
          </Reveal>
          <h2 className="t-h2 mt-6 text-mist">
            <MaskLine text="Technology should" />
            <MaskLine text="make the work" delay={0.06} />
            <MaskLine text="smaller." delay={0.12} className="text-signal-bright" />
          </h2>
          <Reveal delay={0.14}>
            <p className="t-lead mt-8 max-w-md text-mist/60">
              Most businesses do not need more software. They need less of it, working
              harder. We start by finding what can be removed — then add intelligence
              only where it earns its place.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-mist/10 bg-navy/40 p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mist/20 text-mist/70">
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="t-eyebrow text-mist/55">Less</span>
              </div>
              <ul className="mt-7 space-y-5">
                {REMOVE.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-mist/50 line-through decoration-mist/25">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="h-full rounded-2xl border border-signal/30 bg-signal/[0.06] p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-signal/40 bg-signal/15 text-signal-bright">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="t-eyebrow text-signal-bright">Plus</span>
              </div>
              <ul className="mt-7 space-y-5">
                {ADD.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-mist/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
