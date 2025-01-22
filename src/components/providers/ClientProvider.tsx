'use client';

import { useState, useEffect } from 'react';
import { GridBackground } from '@/components/layout/GridBackground';
import LoadingScreen from '@/components/loading/LoadingScreen';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Longer initial loading time for better UX
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Show content after loading screen starts to fade
      const showContentTimer = setTimeout(() => {
        setContentVisible(true);
        document.body.style.overflow = '';
      }, 400);

      return () => clearTimeout(showContentTimer);
    }, 1500); // Slightly longer loading for smoother appearance

    return () => {
      clearTimeout(loadTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div 
        className="flex flex-col min-h-screen"
        style={{ 
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 1000ms ease-out',
        }}
      >
        <Header />
        <main className="flex-grow">
          <div 
            className="transition-all duration-1000 ease-out"
            style={{ 
              transform: `scale(${contentVisible ? 1 : 0.98})`,
              filter: `blur(${contentVisible ? 0 : '8px'})`,
              visibility: contentVisible ? 'visible' : 'hidden',
            }}
          >
            <div className="fixed inset-0 bg-terminal-darker transition-opacity duration-1000"
                style={{ opacity: contentVisible ? 1 : 0 }} />
            <GridBackground />
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
