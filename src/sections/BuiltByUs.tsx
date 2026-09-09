import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, MaskLine } from '../lib/anim';
import { SUB_BRANDS } from '../data/companyData';
import { ProductItem } from '../types';

const ProductVisual: React.FC<{ product: ProductItem }> = ({ product }) => {
  const gaming = product.type === 'gaming';
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-peach/20 bg-ink">
      <div className="grain absolute inset-0 opacity-40" />
      <div className="absolute left-4 top-4 flex gap-1.5">
        {['#f9d2ba', '#5e3122', '#1d4533'].map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      {gaming ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-40 w-40 rounded-full border-2 border-peach/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
          />
          <div className="absolute h-24 w-24 rotate-45 rounded-xl border border-cream/30 bg-forest/60" />
          <div className="absolute h-10 w-10 rounded-md bg-peach" />
        </div>
      ) : (
        <div className="absolute inset-6 top-12 grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-lg bg-forest/50" />
          <div className="rounded-lg bg-peach/20" />
          <div className="rounded-lg bg-cream/10" />
          <div className="col-span-2 rounded-lg bg-forest/40" />
          <div className="col-span-3 h-2 rounded bg-cream/15" />
          <div className="col-span-2 h-2 rounded bg-cream/10" />
        </div>
      )}
      <span className="absolute bottom-4 left-4 t-eyebrow text-peach/70">{product.logoPlaceholder.symbol}</span>
    </div>
  );
};

const Showcase: React.FC<{ product: ProductItem; index: number; flip: boolean }> = ({ product, index, flip }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 border-t border-cream/12 py-20 md:grid-cols-2 md:gap-16 md:py-28"
    >
      <div className={flip ? 'md:order-2' : ''}>
        <div className="flex items-center gap-4 text-cream/50">
          <span className="text-5xl font-extrabold text-peach/25">{String(index + 1).padStart(2, '0')}</span>
          <span className="t-eyebrow">{product.categoryLabel}</span>
        </div>
        <h3 className="t-h2 mt-5 text-cream">
          <MaskLine text={product.name} />
        </h3>
        <p className="mt-5 max-w-md text-cream/70">{product.description}</p>

        <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-y border-cream/12 py-6">
          <div>
            <dt className="t-eyebrow text-cream/40">Platform</dt>
            <dd className="mt-1 text-sm text-cream/85">{product.platform}</dd>
          </div>
          <div>
            <dt className="t-eyebrow text-cream/40">Status</dt>
            <dd className="mt-1 text-sm text-cream/85">{product.status} · since {product.year}</dd>
          </div>
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {product.keyHighlights.map((h) => (
            <li key={h} className="rounded-full border border-cream/20 px-3 py-1 text-xs text-cream/70">
              {h}
            </li>
          ))}
        </ul>

        <a
          href={product.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Open"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-peach px-6 py-3 t-eyebrow text-forest transition-colors hover:bg-cream"
        >
          Explore {product.name}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <motion.div style={{ y: visualY }} className={flip ? 'md:order-1' : ''}>
        <ProductVisual product={product} />
      </motion.div>
    </div>
  );
};

export const BuiltByUs: React.FC = () => (
  <section id="products" className="relative bg-forest">
    <div className="grain absolute inset-0 opacity-20" />
    <div className="u-container relative py-24 md:py-36">
      <Reveal>
        <span className="t-eyebrow text-peach/70">02 — Products we own</span>
        <h2 className="t-display mt-5 text-cream">Built by us.</h2>
        <p className="mt-6 max-w-xl text-cream/70">
          We don't only build for clients. These are products Septima Group designs, ships and
          operates itself.
        </p>
      </Reveal>

      <div className="mt-10">
        {SUB_BRANDS.map((p, i) => (
          <Showcase key={p.id} product={p} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);
