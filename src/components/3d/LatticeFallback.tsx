import React from 'react';

/** CSS stand-in for the 3D plus lattice — no WebGL, no cost. */
export const LatticeFallback: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2">
      {[
        { top: '6%', left: '8%', size: '22%', accent: false, rot: '-14deg' },
        { top: '30%', left: '58%', size: '30%', accent: true, rot: '18deg' },
        { top: '62%', left: '22%', size: '18%', accent: true, rot: '8deg' },
        { top: '14%', left: '70%', size: '14%', accent: false, rot: '-24deg' },
      ].map((n, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: n.top, left: n.left, width: n.size, aspectRatio: '1', transform: `rotate(${n.rot})` }}
        >
          <div
            className="absolute left-1/3 top-0 h-full w-1/3 rounded-[18%]"
            style={{ background: n.accent ? 'rgba(16,160,107,0.5)' : 'rgba(42,62,76,0.55)' }}
          />
          <div
            className="absolute left-0 top-1/3 h-1/3 w-full rounded-[18%]"
            style={{ background: n.accent ? 'rgba(16,160,107,0.5)' : 'rgba(42,62,76,0.55)' }}
          />
        </div>
      ))}
    </div>
  </div>
);
