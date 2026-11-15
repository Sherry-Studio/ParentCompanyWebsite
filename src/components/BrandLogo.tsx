import React from 'react';

interface BrandLogoProps {
  /** Supply a path (e.g. '/logo.svg') to swap in a final raster/vector asset in one line. */
  imageSrc?: string;
  className?: string;
  /** 'light' = light text on a dark ground, 'dark' = dark text on a light ground. */
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  /** Renders the mark only, without the wordmark. */
  markOnly?: boolean;
}

/**
 * Byesplus mark: a rounded navy tile holding a white "b" whose counter is
 * filled by the emerald plus — the single idea the whole identity is built on.
 */
export const BrandMark: React.FC<{ className?: string; title?: string }> = ({
  className = '',
  title = 'Byesplus',
}) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="16" fill="#1b2a36" />
    {/* b stem */}
    <rect x="16" y="12" width="8.6" height="40" rx="4.3" fill="#ffffff" />
    {/* b bowl */}
    <circle cx="33.2" cy="38.6" r="15.2" fill="#ffffff" />
    <circle cx="33.2" cy="38.6" r="8.6" fill="#1b2a36" />
    {/* plus inside the counter */}
    <rect x="31.1" y="32.6" width="4.2" height="12" rx="1.4" fill="#10a06b" />
    <rect x="27.2" y="36.5" width="12" height="4.2" rx="1.4" fill="#10a06b" />
  </svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({
  imageSrc,
  className = '',
  variant = 'light',
  showTagline = false,
  markOnly = false,
}) => {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt="Byesplus"
        className={`h-9 w-auto object-contain ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  const onDark = variant === 'light';
  const word = onDark ? 'text-mist' : 'text-navy-soft';
  const tag = onDark ? 'text-mist/55' : 'text-navy-soft/60';

  if (markOnly) {
    return <BrandMark className={`h-9 w-9 ${className}`} />;
  }

  return (
    <span className={`inline-flex select-none items-center gap-3 ${className}`}>
      <BrandMark className="h-9 w-9 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className={`text-2xl font-extrabold tracking-[-0.045em] ${word}`}>
          byes<span className="plus-mark">+</span>
        </span>
        {showTagline && (
          <span className={`t-eyebrow mt-1.5 hidden text-[9px] tracking-[0.18em] sm:block ${tag}`}>
            Less complexity. Plus intelligence.
          </span>
        )}
      </span>
    </span>
  );
};
