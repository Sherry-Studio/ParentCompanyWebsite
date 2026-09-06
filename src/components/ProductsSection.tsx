import React, { Suspense, lazy } from 'react';
import { ExternalLink, Gamepad2, Briefcase, PlusCircle, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SUB_BRANDS } from '../data/companyData';
import { ProductItem } from '../types';

const ProductCard3D = lazy(() =>
  import('./3d/ProductCard3D').then((module) => ({ default: module.ProductCard3D }))
);

export const ProductsSection: React.FC = () => {
  return (
    <section id="products" className="py-16 md:py-24 border-t border-[#5E3122]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-[#1D4533] mb-4">
              <span className="w-4 h-[1px] bg-[#1D4533]" aria-hidden="true" />
              <span>Strategic Ventures & Holding Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D4533] tracking-tight mb-4">
              Sub-Brands & Products
            </h2>
            <p className="text-base sm:text-lg text-[#5E3122] font-medium leading-relaxed opacity-90">
              Septima Group oversees and capitalizes autonomous ventures. Each brand operates with its own
              specialized engineering standards, dedicated teams, and targeted market presence.
            </p>
          </div>

          <div className="text-xs font-bold text-[#1D4533] bg-white px-4 py-3 rounded-lg shadow-sm border border-[#1D4533]/15 shrink-0 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1D4533]" />
            <span>Interactive 3D Ventures</span>
          </div>
        </motion.div>

        {/* Scalable Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {SUB_BRANDS.map((product: ProductItem, index: number) => {
            const isGaming = product.type === 'gaming';

            return (
              <motion.div
                key={product.id}
                id={`product-card-${product.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-white shadow-md border-b-4 border-[#1D4533] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Card Header: Category & 3D Interactive Model */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      {/* Logo Placeholder */}
                      <div
                        className="w-12 h-12 rounded-lg bg-[#F9D2BA] flex items-center justify-center font-black text-sm tracking-tight text-[#1D4533] shadow-xs border border-[#1D4533]/10 shrink-0"
                        aria-label={`${product.name} Logo Placeholder`}
                      >
                        {product.logoPlaceholder.symbol}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-black text-[#1D4533] uppercase tracking-wider">
                          {isGaming ? (
                            <Gamepad2 className="w-3.5 h-3.5 text-[#1D4533]" />
                          ) : (
                            <Briefcase className="w-3.5 h-3.5 text-[#5E3122]" />
                          )}
                          <span>{product.categoryLabel}</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#1D4533] tracking-tight mt-0.5">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#F7EAE0] text-[#1D4533] border border-[#1D4533]/20 shrink-0">
                      {product.status}
                    </span>
                  </div>

                  {/* 3D Interactive Asset Stage for this product card */}
                  <div className="my-4 p-3 rounded-xl bg-gradient-to-b from-[#F7EAE0]/70 to-[#F9D2BA]/30 border border-[#1D4533]/10 flex items-center justify-between">
                    <div className="pr-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#1D4533] mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#1D4533]" />
                        <span>3D Brand Artifact</span>
                      </div>
                      <p className="text-xs text-[#5E3122] font-semibold">
                        {isGaming ? 'Realtime Game Engine Core' : 'Distributed Cloud Lattice'}
                      </p>
                      <span className="text-[10px] text-[#5E3122]/70">Hover/drag to inspect</span>
                    </div>

                    <div className="shrink-0 flex items-center justify-center">
                      <Suspense
                        fallback={
                          <div className="w-24 h-24 rounded-lg bg-[#F7EAE0] animate-pulse flex items-center justify-center text-xs font-bold text-[#1D4533]">
                            Loading 3D...
                          </div>
                        }
                      >
                        <ProductCard3D
                          type={isGaming ? 'gaming' : 'service'}
                          productName={product.name}
                        />
                      </Suspense>
                    </div>
                  </div>

                  {/* 1-2 line description */}
                  <p className="text-sm sm:text-base text-[#5E3122] font-semibold mb-3 leading-relaxed">
                    {product.shortTagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#5E3122]/85 leading-relaxed mb-6 font-medium">
                    {product.description}
                  </p>

                  {/* Highlights / Features list */}
                  <div className="space-y-2 py-4 border-t border-b border-[#F7EAE0] mb-8">
                    {product.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#5E3122]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1D4533] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA: Visit Site */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#5E3122]/75 font-semibold uppercase tracking-wider">
                    Autonomous Entity
                  </span>

                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-visit-${product.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#F9D2BA] text-[#1D4533] font-black text-[11px] uppercase tracking-widest hover:bg-[#f7c0a0] active:scale-95 transition-all shadow-xs"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future Expansion Indicator / Scalability Showcase */}
        <div className="p-6 rounded-xl bg-white shadow-sm border-2 border-dashed border-[#1D4533]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#F9D2BA] text-[#1D4533]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1D4533] uppercase tracking-wider">Expanding the Septima Roster</h4>
              <p className="text-xs text-[#5E3122]/80 font-medium">
                The product grid utilizes a reusable component registry. Appending new sub-ventures requires zero structural modifications.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-black uppercase tracking-widest text-[#1D4533] hover:text-[#5E3122] whitespace-nowrap px-4 py-2 rounded bg-[#F9D2BA] hover:bg-[#f7c0a0] transition-colors shadow-xs"
          >
            Submit Venture for Incubation →
          </a>
        </div>
      </div>
    </section>
  );
};
