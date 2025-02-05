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
import WhyHireMe from '@/components/sections/WhyHireMe';
import Testimonials from '@/components/sections/Testimonials';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

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
          <ScrollReveal>
            <AboutSection />
          </ScrollReveal>
          <ScrollReveal>
            <WhyHireMe />
          </ScrollReveal>
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
          <ScrollReveal>
            <SkillsSection />
          </ScrollReveal>
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
          <ScrollReveal>
            <Testimonials />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
}
