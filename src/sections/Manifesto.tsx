import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const PHRASES = [
  ["We don't", 'just ship'],
  ['software.'],
  ['We build', 'products'],
  ['people', 'actually use.'],
];

export const Manifesto: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="relative py-[16vh]">
      <div className="u-container">
        {PHRASES.map((group, gi) => {
          const total = PHRASES.length;
          const start = gi / (total + 0.5);
          const end = (gi + 1) / (total + 0.5);
          return (
            <Line key={gi} progress={scrollYProgress} start={start} end={end} lines={group} />
          );
        })}
      </div>
    </section>
  );
};

const Line: React.FC<{
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
  lines: string[];
}> = ({ progress, start, end, lines }) => {
  const opacity = useTransform(progress, [start, (start + end) / 2, end, end + 0.12], [0.12, 1, 1, 0.2]);
  const y = useTransform(progress, [start, end], [40, -10]);
  return (
    <motion.div style={{ opacity, y }} className="py-4 md:py-6">
      {lines.map((l, i) => (
        <h2 key={i} className="t-h2 text-cream">
          {i === lines.length - 1 && l.includes('products') ? (
            <span className="t-serif italic font-normal text-peach">{l}</span>
          ) : (
            l
          )}
        </h2>
      ))}
    </motion.div>
  );
};
