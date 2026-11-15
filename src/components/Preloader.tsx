import React, { useEffect, useRef, useState } from 'react';
import { BrandMark } from './BrandLogo';

const WORDS = ['Automation', 'Software', 'Web', 'Mobile', 'Design'];

export const Preloader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
      setLeaving(true);
      onDoneRef.current();
      window.setTimeout(() => setRemoved(true), 900);
    };
    if (reduce) {
      finish();
      return;
    }
    const step = window.setInterval(() => setI((v) => Math.min(v + 1, WORDS.length - 1)), 240);
    const end = window.setTimeout(() => {
      window.clearInterval(step);
      finish();
    }, 240 * WORDS.length + 240);
    return () => {
      window.clearInterval(step);
      window.clearTimeout(end);
    };
  }, []);

  if (removed) return null;

  const pct = Math.round(((i + 1) / WORDS.length) * 100);

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col justify-between bg-ink py-10 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: leaving ? 'translateY(-100%)' : 'translateY(0)' }}
      aria-hidden="true"
    >
      <div className="u-container flex items-center gap-3">
        <BrandMark className="h-9 w-9" />
        <span className="text-2xl font-extrabold tracking-[-0.045em] text-mist">
          byes<span className="plus-mark">+</span>
        </span>
      </div>

      <div className="u-container flex items-end justify-between gap-6">
        <span className="overflow-hidden text-[clamp(2rem,7vw,4.5rem)] font-extrabold tracking-[-0.045em] text-mist">
          {WORDS[Math.min(i, WORDS.length - 1)]}
          <span className="plus-mark">+</span>
        </span>
        <span className="t-mono shrink-0 text-sm text-signal-bright">{pct}%</span>
      </div>

      <div className="u-container">
        <div className="h-px w-full bg-mist/10">
          <div
            className="h-full bg-signal-bright transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};
