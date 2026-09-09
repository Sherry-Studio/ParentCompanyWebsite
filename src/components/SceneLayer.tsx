import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { EcosystemFallback } from './3d/EcosystemFallback';

const ProductEcosystem = lazy(() =>
  import('./3d/ProductEcosystem').then((m) => ({ default: m.ProductEcosystem })),
);

interface BoundaryProps {
  children: React.ReactNode;
}
class SceneBoundary extends React.Component<BoundaryProps, { failed: boolean }> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <EcosystemFallback /> : this.props.children;
  }
}

/**
 * One persistent 3D layer behind the whole page.
 * Opaque sections cover it; transparent sections (hero, what's next) reveal it.
 * A single scroll-normalised progress value drives the camera + composition.
 */
export const SceneLayer: React.FC = () => {
  const progressRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      // Gentle idle parallax on the container itself
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(${progressRef.current * -4}vh)`;
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
          'radial-gradient(120% 90% at 50% 12%, #1d4533 0%, #16352a 45%, #0f1f18 100%)',
      }}
      aria-hidden="true"
    >
      <div className="grain absolute inset-0" />
      <SceneBoundary>
        <Suspense fallback={<EcosystemFallback />}>
          <ProductEcosystem progressRef={progressRef} />
        </Suspense>
      </SceneBoundary>
      {/* Legibility scrim: darkens toward the left where headlines sit */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
    </div>
  );
};
