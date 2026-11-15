import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { SectionHeading, SignalGlow } from '../components/Decor';
import { Reveal } from '../lib/anim';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section id="services" className="relative overflow-hidden bg-navy py-24 md:py-36">
      <SignalGlow className="right-[-10%] top-1/4 h-[40vw] w-[40vw]" intensity={0.12} />

      <div className="u-container relative z-10">
        <SectionHeading
          eyebrow="Services"
          title="Everything a product"
          accent="needs, in one studio."
          lead="Eight capabilities that work as one engagement — so strategy, build, launch and growth are not three different conversations."
        />

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* List */}
          <div className="border-t border-mist/10">
            {SERVICES.map((service, i) => {
              const isActive = service.id === activeId;
              return (
                <Reveal key={service.id} delay={Math.min(i * 0.04, 0.24)} y={16}>
                  <div className="border-b border-mist/10">
                    <button
                      type="button"
                      onClick={() => setActiveId(service.id)}
                      onMouseEnter={() => setActiveId(service.id)}
                      aria-expanded={isActive}
                      aria-controls={`service-panel-${service.id}`}
                      className="group flex w-full items-center gap-5 py-6 text-left transition-colors md:py-7"
                    >
                      <span
                        className={`t-mono text-xs transition-colors ${
                          isActive ? 'text-signal-bright' : 'text-mist/35'
                        }`}
                      >
                        {service.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`t-h3 block transition-colors duration-300 ${
                            isActive ? 'text-signal-bright' : 'text-mist group-hover:text-mist'
                          }`}
                        >
                          {service.title}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-mist/50">
                          {service.summary}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'translate-x-0 text-signal-bright opacity-100'
                            : '-translate-x-2 text-mist/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Inline detail on small screens */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`service-panel-${service.id}`}
                          className="overflow-hidden lg:hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                        >
                          <div className="pb-7">
                            <p className="text-sm leading-relaxed text-mist/70">{service.detail}</p>
                            <ul className="mt-5 space-y-2.5">
                              {service.deliverables.map((d) => (
                                <li key={d} className="flex items-start gap-2.5 text-sm text-mist/60">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-bright" aria-hidden="true" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Sticky detail panel on large screens */}
          <div className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-3xl border border-mist/10 bg-ink/70 p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className="t-mono text-xs text-signal-bright">{active.index} / 08</span>
                  <h3 className="t-h3 mt-5 text-mist">{active.title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-mist/65">{active.detail}</p>

                  <span className="t-eyebrow mt-9 block text-mist/40">What you get</span>
                  <ul className="mt-5 space-y-3">
                    {active.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-mist/75">
                        <span className="mt-[3px] text-signal-bright" aria-hidden="true">
                          +
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    data-cursor="Talk"
                    className="t-eyebrow link-underline mt-10 inline-flex items-center gap-2 text-signal-bright"
                  >
                    Discuss this service
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
