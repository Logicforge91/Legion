import { useEffect, useState } from 'react';
import { observedSectionIds } from '../config/navigation';

const SECTION_OBSERVER_OPTIONS = { rootMargin: '-38% 0px -54%' };

function observeMatchingSections(element, sectionIds, observer) {
  if (element.matches('section[id]') && sectionIds.has(element.id)) {
    observer.observe(element);
  }

  element.querySelectorAll?.('section[id]').forEach((section) => {
    if (sectionIds.has(section.id)) observer.observe(section);
  });
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) return undefined;

    const sectionIds = new Set(observedSectionIds);
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;

      const readingLine = window.innerHeight * 0.42;
      const sections = [...document.querySelectorAll('section[id]')]
        .filter((section) => sectionIds.has(section.id));
      const currentSection = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      const nextSection = currentSection?.id;

      if (nextSection) {
        setActiveSection((current) => current === nextSection ? current : nextSection);
      }
    }, SECTION_OBSERVER_OPTIONS);

    const content = document.getElementById('content') ?? document.body;
    observeMatchingSections(content, sectionIds, observer);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeMatchingSections(node, sectionIds, observer);
        });
      });
    });

    mutationObserver.observe(content, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
