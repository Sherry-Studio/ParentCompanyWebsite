import React, { useEffect, useRef, useState } from 'react';

const WORDS = ['Apps', 'Games', 'Platforms', 'Experiences'];

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
    const step = window.setInterval(() => setI((v) => Math.min(v + 1, WORDS.length - 1)), 300);
    const end = window.setTimeout(() => {
      window.clearInterval(step);
      finish();
    }, 300 * WORDS.length + 260);
    return () => {
      window.clearInterval(step);
      window.clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (removed) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: leaving ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="u-container flex items-baseline justify-between">
        <span className="t-eyebrow text-peach/70">Septima Group</span>
        <span className="t-serif overflow-hidden text-right text-4xl italic text-cream sm:text-6xl">
          {WORDS[Math.min(i, WORDS.length - 1)]}
        </span>
      </div>
    </div>
  );
};
