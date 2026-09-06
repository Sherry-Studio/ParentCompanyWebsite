import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Controller3D } from './Controller3D';
import { ServicesCore3D } from './ServicesCore3D';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';
import { Gamepad2, Layers, Cpu, Sparkles } from 'lucide-react';

interface Hero3DCanvasProps {
  scrollProgress?: number;
}

// Fallback UI when WebGL is unsupported or user requested reduced motion
export const HeroFallbackUI: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[460px] flex items-center justify-center p-6">
      <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1D4533] via-[#163628] to-[#122b20] p-8 text-white shadow-2xl border-4 border-[#F9D2BA] overflow-hidden flex flex-col justify-between">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#F9D2BA 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F9D2BA]">
            <Sparkles className="w-4 h-4" />
            <span>Ventures In Focus</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F9D2BA] text-[#1D4533] uppercase">
            Holding Architecture
          </span>
        </div>

        {/* Visual Representations */}
        <div className="relative z-10 grid grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F9D2BA] text-[#1D4533] flex items-center justify-center mb-2 shadow-sm font-black">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#F9D2BA] uppercase tracking-wider">Gaming</span>
            <span className="text-[11px] text-white/80">Septima Interactive</span>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-[#F9D2BA] text-[#1D4533] flex items-center justify-center mb-2 shadow-sm font-black">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#F9D2BA] uppercase tracking-wider">Services</span>
            <span className="text-[11px] text-white/80">Digital Solutions</span>
          </div>
        </div>

        <div className="relative z-10 text-center text-xs text-[#F7EAE0]/80">
          Autonomous studios guided by unified capital & governance.
        </div>
      </div>
    </div>
  );
};

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = () => {
  const { webglSupported, prefersReducedMotion, isMobile } = useDevicePerformance();
  const [scrollNorm, setScrollNorm] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the hero section (Apple-style storytelling)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = containerRef.current?.parentElement?.offsetHeight || 800;
          const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.5);
          setScrollNorm(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!webglSupported) {
    return <HeroFallbackUI />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[520px] rounded-2xl overflow-hidden select-none"
      id="hero-3d-stage"
    >
      {/* Subtle contextual hint badge */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4533]/80 backdrop-blur-md border border-[#F9D2BA]/30 text-[10px] font-black uppercase tracking-widest text-[#F9D2BA] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Live 3D Storytelling</span>
      </div>

      {/* R3F Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: isMobile ? 55 : 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      >
        {/* Soft Ambient Light with warm peach tone */}
        <ambientLight intensity={0.7} color="#fff6ed" />

        {/* Directional Key Light */}
        <directionalLight position={[5, 6, 5]} intensity={1.4} color="#ffffff" />

        {/* Rim Light from back for dramatic edge definition */}
        <directionalLight position={[-6, -4, -4]} intensity={0.9} color="#F9D2BA" />

        {/* Point light accenting the center */}
        <pointLight position={[0, 1, 2]} intensity={0.8} color="#F9D2BA" distance={8} />

        {/* Venture 1: 3D Gaming Controller */}
        <Controller3D
          scrollProgress={scrollNorm}
          reducedMotion={prefersReducedMotion}
        />

        {/* Venture 2: 3D Abstract Enterprise Services Core */}
        <ServicesCore3D
          scrollProgress={scrollNorm}
          reducedMotion={prefersReducedMotion}
        />
      </Canvas>

      {/* Bottom captions indicating what each 3D entity represents */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] uppercase font-black tracking-widest pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/85 backdrop-blur-xs text-[#1D4533] border border-[#1D4533]/15 shadow-xs">
          <Gamepad2 className="w-3.5 h-3.5 text-[#1D4533]" />
          <span>Septima Interactive</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/85 backdrop-blur-xs text-[#1D4533] border border-[#1D4533]/15 shadow-xs">
          <Layers className="w-3.5 h-3.5 text-[#1D4533]" />
          <span>Digital Solutions</span>
        </div>
      </div>
    </div>
  );
};
