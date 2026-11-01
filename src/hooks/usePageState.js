import { useEffect, useState } from 'react';
import { observedSectionIds } from '../config/navigation';

export function usePageState() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let animationFrame = 0;
    const updateScrollState = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextShowScrollTop = window.scrollY > 420;
      const nextHeaderScrolled = window.scrollY > 12;
      setShowScrollTop((current) => current === nextShowScrollTop ? current : nextShowScrollTop);
      setHeaderScrolled((current) => current === nextHeaderScrolled ? current : nextHeaderScrolled);
      const progress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(progress));
    };
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateScrollState();
      });
    };

    updateScrollState();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const sectionIds = new Set(observedSectionIds);
    const observer = new IntersectionObserver((entries) => {
      const activeEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
      const activeEntry = activeEntries[activeEntries.length - 1];

      if (activeEntry) {
        setActiveSection((current) => current === activeEntry.target.id ? current : activeEntry.target.id);
      }
    }, { rootMargin: '-38% 0px -54%' });

    const observeSection = (element) => {
      if (element.matches('section[id]') && sectionIds.has(element.id)) observer.observe(element);
      element.querySelectorAll?.('section[id]').forEach((section) => {
        if (sectionIds.has(section.id)) observer.observe(section);
      });
    };

    const content = document.getElementById('content') ?? document.body;
    observeSection(content);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof Element) observeSection(node);
      }));
    });
    mutations.observe(content, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return { activeSection, headerScrolled, showScrollTop };
}
