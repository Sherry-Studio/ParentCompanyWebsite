import React from 'react';
import { MaskLine, Reveal } from '../lib/anim';

/**
 * A field of plus glyphs — the brand mark used as texture.
 * Purely decorative; always aria-hidden and pointer-events-none.
 */
export const PlusField: React.FC<{
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}> = ({ className = '', size = 72, opacity = 0.14, color = '#1fd394' }) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id={`plus-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <path
            d={`M${size / 2} ${size / 2 - 7}v14M${size / 2 - 7} ${size / 2}h14`}
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#plus-${id})`} />
    </svg>
  );
};

/** Soft emerald bloom used behind key compositions. */
export const SignalGlow: React.FC<{ className?: string; intensity?: number }> = ({
  className = '',
  intensity = 0.3,
}) => (
  <div
    className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
    aria-hidden="true"
    style={{ background: `rgba(31, 211, 148, ${intensity})` }}
  />
);

/** Consistent section heading: mono eyebrow + masked display line + optional lead. */
export const SectionHeading: React.FC<{
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
}> = ({ eyebrow, title, accent, lead, tone = 'dark', align = 'left', className = '' }) => {
  const onDark = tone === 'dark';
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      <Reveal>
        <span
          className={`t-eyebrow inline-flex items-center gap-2.5 ${
            onDark ? 'text-signal-bright' : 'text-signal-deep'
          }`}
        >
          <span className="plus-mark text-sm leading-none">+</span>
          {eyebrow}
        </span>
      </Reveal>
      <h2 className={`t-h2 mt-6 ${onDark ? 'text-mist' : 'text-navy-soft'}`}>
        <MaskLine text={title} />
        {accent && (
          <MaskLine
            text={accent}
            delay={0.08}
            className={onDark ? 'text-signal-bright' : 'text-signal-deep'}
          />
        )}
      </h2>
      {lead && (
        <Reveal delay={0.12}>
          <p
            className={`t-lead mt-7 max-w-2xl ${
              onDark ? 'text-mist/60' : 'text-navy-soft/70'
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
};
