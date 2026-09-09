import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, MaskLine } from '../lib/anim';
import { SUB_BRANDS } from '../data/companyData';

const TILES = ['Real-time', 'Multiplayer', 'Physics', 'Worldbuilding', 'Live-Ops', 'Narrative'];

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState('');
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
        setT(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`);
      }}
      onMouseLeave={() => setT('')}
      className="transition-transform duration-300 ease-out will-change-transform"
      style={{ transform: t }}
    >
      {children}
    </div>
  );
};

export const Games: React.FC = () => {
  const game = SUB_BRANDS.find((s) => s.type === 'gaming')!;
  return (
    <section id="games" className="relative overflow-hidden bg-ink">
      <div className="grain absolute inset-0 opacity-40" />
      <div className="relative border-y border-cream/10 py-4">
        <div className="flex gap-8 whitespace-nowrap will-change-transform animate-marquee">
          {[...TILES, ...TILES, ...TILES, ...TILES].map((w, i) => (
            <span key={i} className="t-serif text-2xl italic text-cream/25">
              {w} <span className="text-peach/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="u-container py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="t-eyebrow text-peach/70">03 — Games</span>
            <h2 className="t-display mt-5 text-cream">
              <MaskLine text="Built to" />
              <span className="t-serif italic font-normal">play.</span>
            </h2>
            <p className="mt-6 max-w-md text-cream/70">{game.description}</p>
            <ul className="mt-8 space-y-3">
              {game.keyHighlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm text-cream/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-peach" />
                  {h}
                </li>
              ))}
            </ul>
            <a
              href={game.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-peach/40 px-6 py-3 t-eyebrow text-peach transition-colors hover:bg-peach hover:text-forest"
            >
              Visit {game.name}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard>
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-peach/20 bg-gradient-to-br from-forest to-ink">
                <div className="grain absolute inset-0 opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-48 w-48">
                    <div className="absolute inset-0 rounded-full border border-peach/30" />
                    <div className="absolute inset-6 rotate-45 rounded-2xl border border-cream/20 bg-forest/40 backdrop-blur-sm" />
                    <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-peach shadow-[0_0_40px_rgba(249,210,186,0.5)]" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="t-eyebrow text-cream/60">{game.platform}</span>
                  <span className="t-eyebrow text-peach/70">Live world · preview</span>
                </div>
              </div>
            </TiltCard>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl border border-cream/12 bg-forest/30"
                  style={{ opacity: 1 - i * 0.22 }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
