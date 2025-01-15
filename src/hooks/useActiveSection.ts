import { useState, useEffect } from 'react';

interface UseActiveSectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useActiveSection = (
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove '#' from the section id to match with the actual DOM id
          const sectionId = entry.target.id;
          setActiveSection(`#${sectionId}`);
        }
      });
    };

    const observerOptions = {
      threshold: options.threshold || 0.3,
      rootMargin: options.rootMargin || '-20% 0px -35% 0px'
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      // Remove '#' from the section id to match with the actual DOM id
      const id = sectionId.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    observers.push(observer);

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds, options]);

  return activeSection;
};
