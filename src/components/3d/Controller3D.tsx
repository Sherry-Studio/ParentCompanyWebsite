import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Controller3DProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export const Controller3D: React.FC<Controller3DProps> = ({ scrollProgress, reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftStickRef = useRef<THREE.Mesh>(null);
  const rightStickRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      // Gentle idle floating & breathing
      const idleFloatY = Math.sin(t * 1.4) * 0.12;
      const idleRotY = Math.sin(t * 0.8) * 0.15;
      const idleRotX = Math.cos(t * 1.1) * 0.08;

      // Scroll choreography (Apple-style reaction):
      // As user scrolls, the controller tilts toward the viewer, rotates, and glides
      const targetRotX = 0.25 + idleRotX + scrollProgress * 1.8;
      const targetRotY = -0.35 + idleRotY + scrollProgress * 2.5;
      const targetRotZ = Math.sin(t * 0.6) * 0.05 - scrollProgress * 0.8;
      const targetPosY = 0.2 + idleFloatY - scrollProgress * 1.5;
      const targetPosZ = scrollProgress * 0.5;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.08);

      // Subtle stick reaction
      if (leftStickRef.current && rightStickRef.current) {
        leftStickRef.current.rotation.x = Math.sin(t * 2) * 0.15;
        leftStickRef.current.rotation.z = Math.cos(t * 1.7) * 0.15;
        rightStickRef.current.rotation.x = Math.cos(t * 2.3) * 0.15;
        rightStickRef.current.rotation.z = Math.sin(t * 1.9) * 0.15;
      }
    } else {
      // Reduced motion: static clean orientation
      groupRef.current.rotation.x = 0.2;
      groupRef.current.rotation.y = -0.3;
    }
  });

  return (
    <group ref={groupRef} position={[-1.2, 0.1, 0]} scale={1.25}>
      {/* Main Controller Center Bridge */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.9, 0.35]} />
        <meshStandardMaterial
          color="#1D4533"
          roughness={0.3}
          metalness={0.25}
        />
      </mesh>

      {/* Left Grip */}
      <mesh position={[-0.9, -0.28, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.3, 0.38, 1.2, 24]} />
        <meshStandardMaterial
          color="#163628"
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Right Grip */}
      <mesh position={[0.9, -0.28, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.3, 0.38, 1.2, 24]} />
        <meshStandardMaterial
          color="#163628"
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Top Shoulders / Bumpers */}
      <mesh position={[-0.65, 0.5, -0.05]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.55, 0.14, 0.28]} />
        <meshStandardMaterial color="#5E3122" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0.65, 0.5, -0.05]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.55, 0.14, 0.28]} />
        <meshStandardMaterial color="#5E3122" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Left D-Pad (Cross) */}
      <group position={[-0.55, 0.05, 0.2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.42, 0.14, 0.08]} />
          <meshStandardMaterial color="#F9D2BA" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.42, 0.08]} />
          <meshStandardMaterial color="#F9D2BA" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      {/* Right Action Buttons (Diamond Layout: A, B, X, Y) */}
      <group position={[0.6, 0.12, 0.2]}>
        {/* Top Button (Y) */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
          <meshStandardMaterial color="#F9D2BA" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Bottom Button (A) */}
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
          <meshStandardMaterial color="#F2BD9F" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Left Button (X) */}
        <mesh position={[-0.16, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
          <meshStandardMaterial color="#F9D2BA" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Right Button (B) */}
        <mesh position={[0.16, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
          <meshStandardMaterial color="#F2BD9F" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* Dual Thumbsticks / Analog Sticks */}
      {/* Left Stick Base & Cap */}
      <group position={[-0.26, -0.22, 0.18]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.24, 0.08, 20]} />
          <meshStandardMaterial color="#163628" roughness={0.7} />
        </mesh>
        <mesh ref={leftStickRef} position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#5E3122" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* Right Stick Base & Cap */}
      <group position={[0.26, -0.22, 0.18]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.24, 0.08, 20]} />
          <meshStandardMaterial color="#163628" roughness={0.7} />
        </mesh>
        <mesh ref={rightStickRef} position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#5E3122" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* Center Brand Emblem / Gem Orb */}
      <mesh position={[0, 0.22, 0.19]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color="#F9D2BA"
          emissive="#F9D2BA"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};
