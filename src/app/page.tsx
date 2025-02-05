'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/Skills';
import Header from '@/components/layout/Header';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/About';
import InitialLoadingScreen from '@/components/loading/InitialLoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <InitialLoadingScreen isLoading={isLoading} />
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main className="bg-gray-900 text-gray-100">
          <Hero />
          <AboutSection />
          <Projects />
          <SkillsSection />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
