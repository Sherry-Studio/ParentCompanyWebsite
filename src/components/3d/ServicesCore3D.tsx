import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ServicesCore3DProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export const ServicesCore3D: React.FC<ServicesCore3DProps> = ({ scrollProgress, reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const satellitesGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      // Idle float & breathing
      const idleFloatY = Math.cos(t * 1.2) * 0.12;
      const idleRotY = t * 0.25;

      // Scroll reaction (Apple-style choreography):
      // Moves inward, tilts, and expands its gimbal rings as the user scrolls down
      const targetRotX = 0.2 + scrollProgress * 2.2;
      const targetRotY = idleRotY + scrollProgress * 3.0;
      const targetPosY = -0.1 + idleFloatY + scrollProgress * 0.6;
      const targetPosZ = scrollProgress * 0.4;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.08);

      // Core spinning
      if (coreRef.current) {
        coreRef.current.rotation.y = t * 0.6;
        coreRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
      }

      // Outer wireframe counter-spin
      if (outerCageRef.current) {
        outerCageRef.current.rotation.y = -t * 0.4;
        outerCageRef.current.rotation.x = Math.cos(t * 0.3) * 0.3;
      }

      // Gimbal Rings rotating on independent orbital planes
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x = t * 0.8 + scrollProgress * 1.5;
        ring1Ref.current.rotation.y = t * 0.4;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y = -t * 0.7 - scrollProgress * 1.5;
        ring2Ref.current.rotation.z = t * 0.5;
      }

      // Orbiting satellites
      if (satellitesGroupRef.current) {
        satellitesGroupRef.current.rotation.y = t * 0.9 + scrollProgress * 2;
      }
    } else {
      // Reduced motion: static clean view
      groupRef.current.rotation.x = 0.25;
      groupRef.current.rotation.y = 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[1.2, -0.05, 0]} scale={1.15}>
      {/* Central Multifaceted Core (Prism / Diamond) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#F9D2BA"
          emissive="#F9D2BA"
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Outer Cage Wireframe (Enterprise Security & Framework) */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial
          color="#1D4533"
          wireframe
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Ring 1 (Cloud & Data Flow Orbit) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.28, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#F9D2BA"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Ring 2 (Architecture Orbit) */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.42, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#5E3122"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Orbiting Satellite Data Nodes */}
      <group ref={satellitesGroupRef}>
        <mesh position={[1.6, 0.3, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#F9D2BA"
            emissive="#F9D2BA"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[-1.55, -0.25, 0.4]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#1D4533"
            emissive="#1D4533"
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh position={[0.2, -1.6, -0.3]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#5E3122" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
