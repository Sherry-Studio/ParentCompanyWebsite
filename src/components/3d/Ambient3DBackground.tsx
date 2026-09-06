import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';

interface ParticlesProps {
  count: number;
  reducedMotion: boolean;
}

const Particles: React.FC<ParticlesProps> = ({ count, reducedMotion }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions and colors for subtle floating motes
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Tone 1: #1D4533 (forest green), Tone 2: #5E3122 (earth brown), Tone 3: #F9D2BA (peach)
    const colorChoices = [
      new THREE.Color('#1D4533'),
      new THREE.Color('#5E3122'),
      new THREE.Color('#F9D2BA'),
    ];

    for (let i = 0; i < count; i++) {
      // Spread across wide screen space
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const chosen = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();

    // Gentle slow ambient drift
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.03;

    // Slow vertical breathing movement
    const posAttr = pointsRef.current.geometry.attributes.position;
    if (posAttr) {
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.003;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export const Ambient3DBackground: React.FC = () => {
  const { webglSupported, prefersReducedMotion, isLowPower, particleCount } = useDevicePerformance();

  // If user requested reduced motion or WebGL not available, avoid canvas entirely
  if (!webglSupported || (prefersReducedMotion && isLowPower)) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={1} // Cap at 1 for background to ensure ultra-low GPU overhead
        gl={{ antialias: false, powerPreference: 'low-power' }}
      >
        <Particles count={particleCount} reducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
};
