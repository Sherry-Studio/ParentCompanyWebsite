import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, MaskLine } from '../lib/anim';
import { DEVELOPERS_DIRECTORY, PILLARS } from '../data/companyData';

export const Studio: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="studio" className="relative bg-paper text-forest">
      <div className="u-container py-24 md:py-36">
        <Reveal>
          <span className="t-eyebrow text-clay/70">06 — The studio</span>
          <h2 className="t-h2 mt-5 max-w-3xl">
            <MaskLine text="The people" />
            <span className="t-serif italic font-normal">behind the products.</span>
          </h2>
          <p className="mt-6 max-w-lg text-clay/80">
            A small, focused group of principal engineers and designers. Everyone here has shipped and
            operated real products.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 border-t border-forest/12 sm:grid-cols-2">
          {DEVELOPERS_DIRECTORY.map((d) => (
            <a
              key={d.id}
              href={d.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(null)}
              data-cursor="Portfolio"
              className="group flex items-center gap-5 border-b border-forest/12 py-6 transition-colors"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold transition-colors ${
                  hover === d.id ? 'border-forest bg-forest text-cream' : 'border-forest/25 text-forest'
                }`}
              >
                {d.avatarInitials}
              </span>
              <span className="flex-1">
                <span className="block text-lg font-extrabold tracking-tight">{d.name}</span>
                <span className="block text-xs uppercase tracking-widest text-clay/70">{d.role}</span>
                <span className="mt-0.5 block text-xs text-clay/55">{d.specialty}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <span className="t-eyebrow text-clay/40">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-extrabold">{p.title}</h3>
              <p className="mt-2 text-sm text-clay/75">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
