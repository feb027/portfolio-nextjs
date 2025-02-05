'use client';

import { useEffect } from 'react';
import { GridBackground } from '@/components/layout/GridBackground';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative">
      <GridBackground />
      {children}
    </div>
  );
}
