import React from 'react';

interface BrandLogoProps {
  /**
   * Set this to an image URL/path (e.g. '/logo.svg') to swap in a final graphic logo in one line.
   */
  imageSrc?: string;
  className?: string;
  variant?: 'light' | 'dark' | 'default';
  showSubtitle?: boolean;
}

/**
 * BrandLogo: Text-based corporate wordmark for Septima Group.
 * Swapping in a final logo image is a one-line change by providing `imageSrc`.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  imageSrc,
  className = '',
  variant = 'default',
  showSubtitle = false,
}) => {
  // If an image asset is supplied in the future, render it directly
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt="Septima Group"
        className={`h-8 w-auto object-contain ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Wordmark color configurations based on theme context
  const isDarkContext = variant === 'light'; // e.g. white/cream text on dark green header
  const titleColor = isDarkContext ? 'text-[#F9D2BA]' : 'text-[#1D4533]';
  const subtitleColor = isDarkContext ? 'text-[#F9D2BA]/80' : 'text-[#5E3122]/80';
  const markBg = isDarkContext ? 'bg-[#F9D2BA] text-[#1D4533]' : 'bg-[#1D4533] text-[#F9D2BA]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Modern geometric corporate mark */}
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm tracking-tight shadow-xs transition-transform duration-200 group-hover:scale-105 border border-[#F9D2BA]/30 ${markBg}`}
        aria-hidden="true"
      >
        <span>SG</span>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-black tracking-tighter text-xl sm:text-2xl uppercase ${titleColor}`}>
          Septima <span className="font-light opacity-90">Group</span>
        </span>
        {showSubtitle && (
          <span className={`text-[10px] tracking-[0.25em] uppercase font-bold mt-1 ${subtitleColor}`}>
            Foundational Holding Entity
          </span>
        )}
      </div>
    </div>
  );
};
