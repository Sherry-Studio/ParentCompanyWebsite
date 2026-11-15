import React from 'react';
import { PILLARS, STACK_GROUPS } from '../data/companyData';
import { SectionHeading, PlusField } from '../components/Decor';
import { Reveal } from '../lib/anim';

export const WhyUs: React.FC = () => (
  <section id="why" className="relative overflow-hidden bg-mist py-24 text-navy-soft md:py-36">
    <PlusField opacity={0.05} size={88} color="#0b7a51" />

    <div className="u-container relative z-10">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          tone="light"
          eyebrow="Why Byesplus"
          title="Fewer moving parts"
          accent="on your side."
          lead="We are built to be the one technical partner a growing business needs — not another vendor to manage."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl bg-navy-soft/10 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.07} y={18}>
              <div className="group h-full bg-mist p-8 transition-colors duration-500 hover:bg-chalk">
                <span className="t-mono text-xs text-signal-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.025em] text-navy-soft">
                  {pillar.title}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-navy-soft/65">
                  {pillar.description}
                </p>
                <span
                  className="mt-6 block h-px w-10 origin-left bg-signal transition-transform duration-500 group-hover:scale-x-[3]"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Technologies — grouped, not a logo dump. */}
      <div className="mt-20 border-t border-navy-soft/12 pt-14 md:mt-28">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="t-h3 text-navy-soft">What we build with</h3>
            <p className="max-w-md text-sm text-navy-soft/55">
              Chosen per project for fit and longevity — never because it is new.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {STACK_GROUPS.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05} y={14}>
              <div className="border-t border-navy-soft/15 pt-5">
                <span className="t-eyebrow text-signal-deep">{group.label}</span>
                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-navy-soft/15 px-3.5 py-1.5 text-xs font-medium text-navy-soft/75 transition-colors hover:border-signal hover:text-signal-deep"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
