'use client';

import { useEffect, useState } from 'react';
import { GridBackground } from '@/components/layout/GridBackground';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Immediately disable scroll
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    // Disable browser's scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Wait for content to be ready
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.style.overflow = '';
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={isLoading ? 'h-screen overflow-hidden' : ''}>
      <GridBackground />
      {children}
    </div>
  );
}
