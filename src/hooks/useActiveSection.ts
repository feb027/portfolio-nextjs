import { useState, useEffect } from 'react';

interface UseActiveSectionOptions {
  threshold?: number;
  rootMargin?: string;
  defaultSection?: string;
}

export const useActiveSection = (
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
) => {
  const [activeSection, setActiveSection] = useState<string>(options.defaultSection || '#hero');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Force hero section on mount
    setActiveSection('#hero');
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1800); // Slightly longer than the loading screen duration
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries
        .filter(entry => entry.isIntersecting && entry.intersectionRatio >= 0.6)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        setActiveSection(`#${visibleSections[0].target.id}`);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [0.2, 0.4, 0.6, 0.8],
      rootMargin: '-10% 0px -10% 0px'
    });

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId.replace('#', ''));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, options, isInitialized]);

  return activeSection;
};
