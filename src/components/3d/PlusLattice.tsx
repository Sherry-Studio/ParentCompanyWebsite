import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';
import { LatticeFallback } from './LatticeFallback';

const NAVY = '#1b2a36';
const NAVY_LIFT = '#2a3e4c';
const SIGNAL = '#10a06b';
const SIGNAL_BRIGHT = '#1fd394';

type MotionRef = React.MutableRefObject<number>;

/** Extruded, rounded plus — the Byesplus mark as a physical object. */
function usePlusGeometry() {
  return useMemo(() => {
    const t = 0.34; // half-thickness of the arm
    const l = 1; // half-length of the arm
    const r = 0.12; // corner radius
    const shape = new THREE.Shape();

    // Walk the 12 corners of a plus, rounding each one.
    const pts: [number, number][] = [
      [-t, -l], [t, -l], [t, -t], [l, -t],
      [l, t], [t, t], [t, l], [-t, l],
      [-t, t], [-l, t], [-l, -t], [-t, -t],
    ];

    shape.moveTo(pts[0][0] + r, pts[0][1]);
    for (let i = 0; i < pts.length; i++) {
      const cur = pts[i];
      const next = pts[(i + 1) % pts.length];
      const dx = next[0] - cur[0];
      const dy = next[1] - cur[1];
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      shape.lineTo(next[0] - ux * r, next[1] - uy * r);
      const after = pts[(i + 2) % pts.length];
      const adx = after[0] - next[0];
      const ady = after[1] - next[1];
      const alen = Math.hypot(adx, ady) || 1;
      shape.quadraticCurveTo(next[0], next[1], next[0] + (adx / alen) * r, next[1] + (ady / alen) * r);
    }

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.05,
      bevelSegments: 3,
      curveSegments: 6,
    });
    geo.center();
    return geo;
  }, []);
}

interface NodeSpec {
  pos: [number, number, number];
  scale: number;
  rot: [number, number, number];
  accent: boolean;
  speed: number;
  drift: number;
}

const NODES: NodeSpec[] = [
  { pos: [-4.3, 1.5, -1.2], scale: 0.62, rot: [0.3, -0.5, 0.2], accent: false, speed: 1.0, drift: -1 },
  { pos: [4.1, -0.6, -2.0], scale: 0.78, rot: [-0.25, 0.6, -0.15], accent: true, speed: 0.8, drift: 1 },
  { pos: [-2.4, -2.6, -0.4], scale: 0.46, rot: [0.5, 0.2, 0.6], accent: true, speed: 1.3, drift: -1 },
  { pos: [2.0, 2.6, -0.8], scale: 0.4, rot: [-0.4, -0.3, 0.1], accent: false, speed: 1.5, drift: 1 },
  { pos: [0.3, 0.1, -4.2], scale: 1.05, rot: [0.15, 0.4, -0.25], accent: false, speed: 0.6, drift: 0 },
  { pos: [5.6, 2.2, -3.0], scale: 0.44, rot: [0.2, -0.7, 0.35], accent: false, speed: 1.1, drift: 1 },
  { pos: [-5.4, -1.8, -2.6], scale: 0.5, rot: [-0.3, 0.35, -0.4], accent: true, speed: 0.95, drift: -1 },
];

/** Minimal drift wrapper — replaces drei's <Float> so drei stays out of the bundle. */
const Drift: React.FC<{ speed: number; children: React.ReactNode }> = ({ speed, children }) => {
  const g = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime * speed + seed;
    g.current.position.y = Math.sin(t * 0.6) * 0.32;
    g.current.rotation.z = Math.sin(t * 0.4) * 0.06;
  });
  return <group ref={g}>{children}</group>;
};

const PlusNode: React.FC<{ spec: NodeSpec; geometry: THREE.BufferGeometry; reduced: boolean }> = ({
  spec,
  geometry,
  reduced,
}) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced || !mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = spec.rot[1] + t * 0.12 * spec.speed;
    mesh.current.rotation.x = spec.rot[0] + Math.sin(t * 0.25 * spec.speed) * 0.12;
  });

  const body = (
    <mesh ref={mesh} geometry={geometry} scale={spec.scale} rotation={spec.rot}>
      <meshStandardMaterial
        color={spec.accent ? SIGNAL : NAVY_LIFT}
        emissive={spec.accent ? SIGNAL_BRIGHT : NAVY}
        emissiveIntensity={spec.accent ? 0.26 : 0.08}
        roughness={spec.accent ? 0.28 : 0.52}
        metalness={spec.accent ? 0.35 : 0.65}
      />
    </mesh>
  );

  return reduced ? body : <Drift speed={spec.speed}>{body}</Drift>;
};

const Rig: React.FC<{ progress: MotionRef; mobile: boolean; reduced: boolean }> = ({
  progress,
  mobile,
  reduced,
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const geometry = usePlusGeometry();
  const spread = mobile ? 0.62 : 1;

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const k = Math.min(1, delta * 2.6);
    const t = reduced ? 0 : state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        -0.35 + p * 1.1 + Math.sin(t * 0.08) * 0.04,
        k,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.04 + p * 0.3, k);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, p * 1.1, k);

      group.current.children.forEach((child, i) => {
        const spec = NODES[i];
        if (!spec) return;
        child.position.x = THREE.MathUtils.lerp(
          child.position.x,
          spec.pos[0] * spread + spec.drift * p * 2.1 * spread,
          k,
        );
      });
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, (mobile ? 13 : 11) + p * 2.4, k);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2 - p * 0.6, k);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} color="#d9f7ec" />
      <directionalLight position={[5, 6, 6]} intensity={1.35} color="#ffffff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.55} color={SIGNAL_BRIGHT} />
      <pointLight position={[0, 1, 4]} intensity={18} color={SIGNAL_BRIGHT} distance={16} />

      <group ref={group}>
        {NODES.map((spec, i) => (
          <group key={i} position={[spec.pos[0] * spread, spec.pos[1], spec.pos[2]]}>
            <PlusNode spec={spec} geometry={geometry} reduced={reduced} />
          </group>
        ))}
      </group>
    </>
  );
};

export const PlusLattice: React.FC<{ progressRef: MotionRef }> = ({ progressRef }) => {
  const { webglSupported, prefersReducedMotion, isMobile, isLowPower } = useDevicePerformance();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!webglSupported || (isLowPower && isMobile)) return <LatticeFallback />;

  return (
    <div className="absolute inset-0" style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }}>
      {!ready && <LatticeFallback />}
      <Canvas
        camera={{ position: [0, 0.2, isMobile ? 13 : 11], fov: 40 }}
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
