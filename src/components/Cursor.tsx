import React, { useEffect, useRef, useState } from 'react';

/** Minimal dot + trailing ring cursor. Desktop / fine-pointer only. */
export const Cursor: React.FC = () => {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('no-cursor');

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const rp = { ...pos };
    let raf = 0;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [data-cursor]');
      setLabel(interactive?.getAttribute('data-cursor') ?? (interactive ? '' : null));
    };
    const loop = () => {
      rp.x += (pos.x - rp.x) * 0.15;
      rp.y += (pos.y - rp.y) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rp.x}px, ${rp.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('no-cursor');
    };
  }, []);

  if (!enabled) return null;
  const active = label !== null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <div
        ref={ring}
        className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border border-peach/70 transition-[width,height,background-color] duration-300"
        style={{
          width: active ? 64 : 40,
          height: active ? 64 : 40,
          left: active ? -32 : -20,
          top: active ? -32 : -20,
          backgroundColor: active ? 'rgba(249,210,186,0.12)' : 'transparent',
        }}
      >
        {label ? (
          <span className="t-eyebrow text-[9px] text-peach">{label}</span>
        ) : null}
      </div>
      <div ref={dot} className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-peach" />
    </div>
  );
};
