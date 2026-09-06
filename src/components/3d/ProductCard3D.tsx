import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';

interface ProductCard3DProps {
  type: 'gaming' | 'service';
  productName: string;
}

// Gaming 3D Object: Interactive Arcade Crystal & Console Cartridge
const GamingObject: React.FC<{ hover: boolean; reducedMotion: boolean }> = ({ hover, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      const speed = hover ? 1.8 : 0.8;
      meshRef.current.rotation.y = t * speed;
      meshRef.current.rotation.x = Math.sin(t * 1.2) * 0.25;
      meshRef.current.position.y = Math.sin(t * 2) * 0.08;

      if (ringRef.current) {
        ringRef.current.rotation.z = -t * (speed * 0.9);
        ringRef.current.rotation.x = Math.cos(t * 1.5) * 0.3;
      }
    } else {
      meshRef.current.rotation.y = 0.4;
      meshRef.current.rotation.x = 0.2;
    }
  });

  return (
    <group scale={1.2}>
      {/* Faceted Gaming Core */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#1D4533"
          roughness={0.25}
          metalness={0.65}
          emissive="#1D4533"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Orbiting Golden Arcade Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.35, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#F9D2BA"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

// Services 3D Object: Dynamic Enterprise Data Monolith & Orbital Shield
const ServiceObject: React.FC<{ hover: boolean; reducedMotion: boolean }> = ({ hover, reducedMotion }) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!cubeRef.current || !octaRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      const speed = hover ? 1.6 : 0.7;
      cubeRef.current.rotation.y = -t * speed;
      cubeRef.current.rotation.z = Math.cos(t * 1.1) * 0.2;
      cubeRef.current.position.y = Math.cos(t * 1.8) * 0.08;

      octaRef.current.rotation.x = t * (speed * 1.2);
      octaRef.current.rotation.y = t * speed;
    } else {
      cubeRef.current.rotation.y = 0.5;
      cubeRef.current.rotation.x = 0.2;
      octaRef.current.rotation.y = 0.2;
    }
  });

  return (
    <group scale={1.15}>
      {/* Outer Enterprise Framework (Transparent Wireframe Cube) */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[1.35, 1.35, 1.35]} />
        <meshStandardMaterial
          color="#1D4533"
          wireframe
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Inner Glowing Data Core (Octahedron in Peach) */}
      <mesh ref={octaRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#F9D2BA"
          emissive="#F9D2BA"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

export const ProductCard3D: React.FC<ProductCard3DProps> = ({ type, productName }) => {
  const { webglSupported, prefersReducedMotion, isMobile } = useDevicePerformance();
  const [isHovered, setIsHovered] = useState(false);

  // Fallback if WebGL isn't supported or on ultra-low specs
  if (!webglSupported) {
    return (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#F7EAE0] border-2 border-[#1D4533]/20 flex items-center justify-center text-[#1D4533] font-black text-xl shadow-xs">
        {type === 'gaming' ? '🎮' : '⚡'}
      </div>
    );
  }

  return (
    <div
      className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`Interactive 3D representation of ${productName} (Hover to interact)`}
      aria-label={`Interactive 3D model for ${productName}`}
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.9} color="#fff4eb" />
        <directionalLight position={[3, 4, 3]} intensity={1.3} color="#ffffff" />
        <directionalLight position={[-3, -2, -2]} intensity={0.7} color="#F9D2BA" />

        {type === 'gaming' ? (
          <GamingObject hover={isHovered} reducedMotion={prefersReducedMotion} />
        ) : (
          <ServiceObject hover={isHovered} reducedMotion={prefersReducedMotion} />
        )}
      </Canvas>

      {/* Subtle indicator ring on hover */}
      <div
        className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 border-2 border-[#F9D2BA] ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
