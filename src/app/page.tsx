import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/Skills';
import Header from '@/components/layout/Header';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-gray-900 text-gray-100">
        <Hero />
        <Projects />
        <SkillsSection />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
