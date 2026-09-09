import React, { useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  strength?: number;
}

/** Anchor with a subtle magnetic pull toward the pointer. */
export const MagneticButton: React.FC<Props> = ({ strength = 0.35, className = '', children, ...rest }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
};
