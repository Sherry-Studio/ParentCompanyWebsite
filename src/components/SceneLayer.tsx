import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { LatticeFallback } from './3d/LatticeFallback';

const PlusLattice = lazy(() =>
  import('./3d/PlusLattice').then((m) => ({ default: m.PlusLattice })),
);

class SceneBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <LatticeFallback /> : this.props.children;
  }
}

/**
 * One persistent 3D layer behind the page. Opaque sections cover it; the hero
 * and final CTA let it through. A single scroll-normalised value drives it.
 */
export const SceneLayer: React.FC = () => {
  const progressRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(${progressRef.current * -3}vh)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(125% 95% at 62% 8%, #1b2a36 0%, #111e28 42%, #070d13 100%)',
      }}
      aria-hidden="true"
    >
      <div className="grain absolute inset-0" />
      {/* The scene is atmosphere, never the subject: held well back from the type. */}
      <div className="absolute inset-0 opacity-55">
        <SceneBoundary>
          <Suspense fallback={<LatticeFallback />}>
            <PlusLattice progressRef={progressRef} />
          </Suspense>
        </SceneBoundary>
      </div>
      {/* Legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
    </div>
  );
};
