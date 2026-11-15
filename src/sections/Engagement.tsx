import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ENGAGEMENT_MODELS } from '../data/companyData';
import { SectionHeading, PlusField } from '../components/Decor';
import { Reveal } from '../lib/anim';

export const Engagement: React.FC = () => (
  <section id="engagement" className="relative overflow-hidden bg-navy py-24 md:py-36">
    <PlusField opacity={0.05} size={104} />

    <div className="u-container relative z-10">
      <SectionHeading
        eyebrow="Working together"
        title="Three ways to"
        accent="start with us."
        lead="Pick the shape that matches where you are. Most engagements begin small and grow once the first thing ships."
      />

      <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3">
        {ENGAGEMENT_MODELS.map((model, i) => (
          <Reveal key={model.id} delay={i * 0.08} y={22}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mist/10 bg-ink/50 p-8 transition-colors duration-500 hover:border-signal/40">
              <span
                className="pointer-events-none absolute -right-10 -top-10 text-[9rem] font-extrabold leading-none text-mist/[0.03] transition-colors duration-500 group-hover:text-signal/[0.07]"
                aria-hidden="true"
              >
                +
              </span>

              <span className="t-eyebrow text-signal-bright">{model.bestFor}</span>
              <h3 className="t-h3 mt-5 text-mist">{model.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-mist/60">{model.description}</p>

              <ul className="mt-7 space-y-2.5 border-t border-mist/10 pt-6">
                {model.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-mist/70">
                    <span className="mt-[2px] text-signal-bright" aria-hidden="true">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                data-cursor="Talk"
                className="t-eyebrow link-underline mt-auto inline-flex items-center gap-2 pt-8 text-mist/70 transition-colors hover:text-signal-bright"
              >
                Enquire
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
