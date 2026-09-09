import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';
import { EcosystemFallback } from './EcosystemFallback';

const FOREST = '#1d4533';
const INK = '#12241c';
const CREAM = '#f7eae0';
const PEACH = '#f9d2ba';
const CLAY = '#5e3122';

type MotionRef = React.MutableRefObject<number>;

/* ---------- Screen dressing ---------- */
const ScreenBars: React.FC<{ color: string; rows?: number }> = ({ color, rows = 4 }) => (
  <group position={[0, 0, 0.011]}>
    {Array.from({ length: rows }).map((_, i) => (
      <mesh key={i} position={[-0.18 + (i % 2) * 0.04, 0.34 - i * 0.2, 0]}>
        <planeGeometry args={[0.5 - (i % 3) * 0.12, 0.07]} />
        <meshBasicMaterial color={color} transparent opacity={0.85 - i * 0.12} />
      </mesh>
    ))}
  </group>
);

/* ---------- Devices ---------- */
const Phone: React.FC = () => (
  <group>
    <RoundedBox args={[0.92, 1.9, 0.1]} radius={0.11} smoothness={4} castShadow receiveShadow>
      <meshStandardMaterial color={CREAM} roughness={0.45} metalness={0.15} />
    </RoundedBox>
    <mesh position={[0, 0, 0.052]}>
      <planeGeometry args={[0.78, 1.68]} />
      <meshStandardMaterial color={FOREST} roughness={0.3} emissive={FOREST} emissiveIntensity={0.28} />
    </mesh>
    <ScreenBars color={PEACH} rows={5} />
  </group>
);

const Browser: React.FC = () => (
  <group>
    <RoundedBox args={[2.5, 1.7, 0.09]} radius={0.06} smoothness={4} castShadow receiveShadow>
      <meshStandardMaterial color={CREAM} roughness={0.5} metalness={0.1} />
    </RoundedBox>
    <mesh position={[0, 0.72, 0.05]}>
      <planeGeometry args={[2.34, 0.2]} />
      <meshStandardMaterial color={CLAY} roughness={0.6} />
    </mesh>
    {[-1.08, -0.98, -0.88].map((x) => (
      <mesh key={x} position={[x, 0.72, 0.06]}>
        <circleGeometry args={[0.028, 16]} />
        <meshBasicMaterial color={PEACH} />
      </mesh>
    ))}
    <mesh position={[0, -0.08, 0.05]}>
      <planeGeometry args={[2.34, 1.36]} />
      <meshStandardMaterial color={FOREST} roughness={0.35} emissive={FOREST} emissiveIntensity={0.22} />
    </mesh>
    <group position={[0, -0.08, 0.061]}>
      <mesh position={[-0.7, 0.3, 0]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshBasicMaterial color={PEACH} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.55, 0.35, 0]}>
        <planeGeometry args={[0.9, 0.12]} />
        <meshBasicMaterial color={CREAM} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.4, 0.12, 0]}>
        <planeGeometry args={[1.2, 0.1]} />
        <meshBasicMaterial color={CREAM} transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <planeGeometry args={[2, 0.4]} />
        <meshBasicMaterial color={INK} transparent opacity={0.5} />
      </mesh>
    </group>
  </group>
);

const GamePanel: React.FC = () => {
  const s = useRef<THREE.Mesh>(null);
  useFrame((st) => {
    if (s.current) s.current.rotation.z = st.clock.elapsedTime * 0.4;
  });
  return (
    <group>
      <RoundedBox args={[1.9, 1.3, 0.09]} radius={0.07} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={INK} roughness={0.4} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.72, 1.12]} />
        <meshStandardMaterial color={CLAY} roughness={0.3} emissive={CLAY} emissiveIntensity={0.35} />
      </mesh>
      <mesh ref={s} position={[0, 0, 0.07]}>
        <torusGeometry args={[0.32, 0.06, 12, 32]} />
        <meshStandardMaterial color={PEACH} metalness={0.7} roughness={0.25} emissive={PEACH} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color={CREAM} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};

const Module: React.FC = () => {
  const g = useRef<THREE.Group>(null);
  useFrame((st) => {
    if (g.current) g.current.rotation.y = st.clock.elapsedTime * 0.25;
  });
  return (
    <group ref={g}>
      <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial color={FOREST} roughness={0.3} metalness={0.5} />
      </RoundedBox>
      <mesh scale={1.28}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={PEACH} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

/* ---------- Rig ---------- */
const Rig: React.FC<{ progress: MotionRef; mobile: boolean; reduced: boolean }> = ({
  progress,
  mobile,
  reduced,
}) => {
  const group = useRef<THREE.Group>(null);
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const spread = mobile ? 0.6 : 1;

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const k = Math.min(1, delta * 3);
    const t = reduced ? 0 : state.clock.elapsedTime;

    if (group.current) {
      // Elements drift apart and the whole system turns as you scroll.
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.5 + p * 1.15 + Math.sin(t * 0.1) * 0.05, k);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.05 + p * 0.25, k);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, p * 0.6, k);
      const g = group.current;
      g.children.forEach((child, i) => {
        const dir = [-1, 1, -1, 1, 0][i] ?? 0;
        const baseX = ([-2.1, 1.9, -1.4, 2.2, 0][i] ?? 0) * spread;
        child.position.x = THREE.MathUtils.lerp(child.position.x, baseX + dir * p * 1.6 * spread, k);
      });
    }
    if (cam.current) {
      cam.current.position.z = THREE.MathUtils.lerp(cam.current.position.z, (mobile ? 9.6 : 8.2) + p * 1.4, k);
      cam.current.position.y = THREE.MathUtils.lerp(cam.current.position.y, 0.3 - p * 0.5, k);
      cam.current.lookAt(0, 0, 0);
    }
  });

  const Wrap: React.FC<{ children: React.ReactNode; speed?: number; y?: number }> = ({ children, speed = 1, y = 0.2 }) =>
    reduced ? <group position-y={y}>{children}</group> : <Float speed={speed} rotationIntensity={0.25} floatIntensity={0.5}>{children}</Float>;

  return (
    <>
      <PerspectiveCamera ref={cam} makeDefault position={[0, 0.3, mobile ? 9.6 : 8.2]} fov={38} />
      <ambientLight intensity={0.75} color="#fff4ea" />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, -2, -4]} intensity={0.6} color={PEACH} />
      <pointLight position={[0, 1.5, 3]} intensity={22} color={PEACH} distance={12} />

      <group ref={group} position={[0, 0, 0]}>
        <group position={[-2.1 * spread, 0.1, 0]}><Wrap speed={1.1}><Phone /></Wrap></group>
        <group position={[1.9 * spread, -0.1, -0.6]}><Wrap speed={0.8}><Browser /></Wrap></group>
        <group position={[-1.4 * spread, -0.9, 0.9]}><Wrap speed={1.3}><GamePanel /></Wrap></group>
        <group position={[2.2 * spread, 1.0, 0.4]}><Wrap speed={1.5}><Module /></Wrap></group>
        <group position={[0, 0.2, -1.4]} scale={0.7}><Wrap speed={0.9}><Module /></Wrap></group>
      </group>

      <ContactShadows position={[0, -2.6, 0]} opacity={0.35} scale={16} blur={2.6} far={6} color={INK} />
    </>
  );
};

/* ---------- Public canvas ---------- */
export const ProductEcosystem: React.FC<{ progressRef: MotionRef }> = ({ progressRef }) => {
  const { webglSupported, prefersReducedMotion, isMobile, isLowPower } = useDevicePerformance();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!webglSupported || (isLowPower && isMobile)) return <EcosystemFallback />;

  return (
    <div
      className="absolute inset-0"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }}
    >
      {!ready && <EcosystemFallback />}
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.4] : [1, 1.8]}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Rig progress={progressRef} mobile={isMobile} reduced={prefersReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};
