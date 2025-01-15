import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-gray-900 text-gray-100">
        <Hero />
        <Projects />
      </main>
    </>
  );
}
