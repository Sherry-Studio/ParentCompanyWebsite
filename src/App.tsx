import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SmoothScroll } from './lib/SmoothScroll';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { SceneLayer } from './components/SceneLayer';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { CapabilityStrip } from './sections/CapabilityStrip';
import { Approach } from './sections/Approach';
import { Services } from './sections/Services';
import { WhyUs } from './sections/WhyUs';
import { Process } from './sections/Process';
import { Engagement } from './sections/Engagement';
import { Contact } from './sections/Contact';
import { FinalCTA } from './sections/FinalCTA';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <SmoothScroll>
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />

      <motion.div
        className="fixed left-0 top-0 z-[95] h-[2px] w-full origin-left bg-signal-bright"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <SceneLayer />
      <Nav />

      <main
        className="relative z-10"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <Hero />
        <CapabilityStrip />
        <Approach />
        <Services />
        <WhyUs />
        <Process />
        <Engagement />
        <Contact />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
