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
      const activeEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
      const nextSection = activeEntries[activeEntries.length - 1]?.target.id;

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
