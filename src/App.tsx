import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { DevelopersSection } from './components/DevelopersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Lazy-load global 3D background particles
const Ambient3DBackground = lazy(() =>
  import('./components/3d/Ambient3DBackground').then((module) => ({
    default: module.Ambient3DBackground,
  }))
);

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  // Smooth scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds = ['overview', 'about', 'products', 'developers', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F7EAE0] text-[#5E3122] selection:bg-[#F9D2BA] selection:text-[#1D4533]">
      {/* Top Apple-style Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1D4533] via-[#F9D2BA] to-[#5E3122] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Global Interactive 3D Ambient Dust & Geometric Constellation */}
      <Suspense fallback={null}>
        <Ambient3DBackground />
      </Suspense>

      {/* Fixed/Sticky Top Navigation Header */}
      <Header activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1">
        {/* 1. Home / Hero with 3D interactive stage and snapshot previews */}
        <Hero />

        {/* 2. About / Our Story with holding model & placeholder founding history */}
        <AboutSection />

        {/* 3. Products with interactive 3D artifacts for Gaming & Digital Services */}
        <ProductsSection />

        {/* 4. Developers & Specialist Directory linking to external personal sites */}
        <DevelopersSection />

        {/* 5. Contact Section powered by Formspree client-side with backup channels */}
        <ContactSection />
      </main>

      {/* Corporate Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
