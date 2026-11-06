import { useEffect, useState } from 'react';
import { observedSectionIds } from '../config/navigation';

const SECTION_OBSERVER_OPTIONS = { rootMargin: '-38% 0px -54%' };

function collectMatchingSections(element, sectionIds) {
  const matches = [];
  if (element.matches?.('section[id]') && sectionIds.has(element.id)) matches.push(element);
  element.querySelectorAll?.('section[id]').forEach((section) => {
    if (sectionIds.has(section.id)) matches.push(section);
  });
  return matches;
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) return undefined;

    const sectionIds = new Set(observedSectionIds);
    const sections = new Map();
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;

      const readingLine = window.innerHeight * 0.42;
      const currentSection = observedSectionIds.map((id) => sections.get(id)).find((section) => {
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      const nextSection = currentSection?.id;

      if (nextSection) {
        setActiveSection((current) => current === nextSection ? current : nextSection);
      }
    }, SECTION_OBSERVER_OPTIONS);

    const observeNode = (element) => {
      collectMatchingSections(element, sectionIds).forEach((section) => {
        if (sections.get(section.id) === section) return;
        sections.set(section.id, section);
        observer.observe(section);
      });
    };

    const unobserveNode = (element) => {
      collectMatchingSections(element, sectionIds).forEach((section) => {
        if (sections.get(section.id) !== section) return;
        sections.delete(section.id);
        observer.unobserve(section);
      });
    };

    const content = document.getElementById('content') ?? document.body;
    observeNode(content);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.removedNodes.forEach((node) => {
          if (node instanceof Element) unobserveNode(node);
        });
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeNode(node);
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
