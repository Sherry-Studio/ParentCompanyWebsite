import { useState, useEffect } from 'react';

export interface DevicePerformance {
  isMobile: boolean;
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  webglSupported: boolean;
  particleCount: number;
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useDevicePerformance(): DevicePerformance {
  const [perf, setPerf] = useState<DevicePerformance>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isLowPower: false,
        prefersReducedMotion: false,
        webglSupported: true,
        particleCount: 40,
      };
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;
    const isMobile = window.innerWidth < 768;
    const webglSupported = checkWebGLSupport();

    // Check concurrency and memory if available
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
    const lowMem = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
    const isLowPower = isMobile || lowCores || lowMem || !webglSupported;

    let particleCount = 45;
    if (isLowPower || isMobile) particleCount = 18;
    if (prefersReducedMotion) particleCount = 8;

    return {
      isMobile,
      isLowPower,
      prefersReducedMotion,
      webglSupported,
      particleCount,
    };
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPerf((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
        particleCount: e.matches ? 8 : prev.isLowPower ? 18 : 45,
      }));
    };

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setPerf((prev) => {
        if (prev.isMobile === isMobile) return prev;
        return {
          ...prev,
          isMobile,
          particleCount: isMobile ? 18 : 45,
        };
      });
    };

    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', handleResize);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return perf;
}
