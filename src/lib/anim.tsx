import React, { useEffect, useRef, useState } from 'react';

export const EASE = [0.16, 1, 0.3, 1] as const;
const CSS_EASE = 'cubic-bezier(0.16,1,0.3,1)';

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal-once when scrolled into view.
 * IntersectionObserver + scroll/resize rect-check + a self-terminating poll,
 * so content is revealed reliably and never stays hidden. The animation itself
 * is a CSS transition (compositor-driven), not rAF-based.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown || prefersReduced()) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * (1 - threshold) && r.bottom > 0) {
        setShown(true);
        return true;
      }
      return false;
    };
    if (check()) return;

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => entries.some((e) => e.isIntersecting) && setShown(true),
        { threshold: [0, threshold] },
      );
      io.observe(el);
    }
    const onScroll = () => check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const poll = window.setInterval(() => check() && window.clearInterval(poll), 240);

    return () => {
      io?.disconnect();
      window.clearInterval(poll);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [shown, threshold]);

  return { ref, shown };
}

export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}> = ({ children, delay = 0, y = 28, className }) => {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.9s ${CSS_EASE} ${delay}s, transform 0.9s ${CSS_EASE} ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

/** Word-by-word mask reveal for headline lines. */
export const MaskLine: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className,
  delay = 0,
}) => {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} style={{ display: 'block' }}>
      {words.map((w, i) => (
        <span
          key={i}
          className="mask-line"
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: i < words.length - 1 ? '0.26em' : undefined,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: shown ? 'translateY(0%)' : 'translateY(110%)',
              transition: `transform 1s ${CSS_EASE} ${delay + i * 0.06}s`,
              willChange: 'transform',
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  );
};
