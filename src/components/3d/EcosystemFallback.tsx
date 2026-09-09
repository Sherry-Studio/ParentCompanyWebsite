import React from 'react';

/** Lightweight CSS stand-in for the 3D product ecosystem. */
export const EcosystemFallback: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute left-1/2 top-1/2 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2">
      <div className="absolute inset-0 rounded-[2rem] border border-peach/15 bg-forest/20 blur-[2px]" />
      <div className="absolute left-[8%] top-[14%] h-[64%] w-[34%] rotate-[-8deg] rounded-2xl border border-peach/25 bg-gradient-to-br from-forest/60 to-ink shadow-2xl" />
      <div className="absolute right-[6%] top-[20%] h-[46%] w-[52%] rotate-[6deg] rounded-xl border border-peach/20 bg-gradient-to-br from-cream/10 to-forest/40 shadow-2xl" />
      <div className="absolute bottom-[10%] left-[26%] h-[26%] w-[40%] rounded-lg border border-peach/25 bg-peach/10 shadow-xl" />
    </div>
  </div>
);
