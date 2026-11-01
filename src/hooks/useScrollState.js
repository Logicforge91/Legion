import { useEffect, useState } from 'react';

function getScrollState() {
  return {
    headerScrolled: window.scrollY > 12,
    showScrollTop: window.scrollY > 420,
  };
}

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0
    ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
    : 0;

  document.documentElement.style.setProperty('--scroll-progress', String(progress));
}

export function useScrollState() {
  const [scrollState, setScrollState] = useState({
    headerScrolled: false,
    showScrollTop: false,
  });

  useEffect(() => {
    let animationFrame = 0;

    const update = () => {
      setScrollState((current) => {
        const next = getScrollState();
        return current.headerScrolled === next.headerScrolled
          && current.showScrollTop === next.showScrollTop
          ? current
          : next;
      });
      updateScrollProgress();
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        update();
      });
    };

    const pageContent = document.querySelector('.site-shell');
    const resizeObserver = typeof window.ResizeObserver === 'function' && pageContent
      ? new window.ResizeObserver(scheduleUpdate)
      : null;

    update();
    resizeObserver?.observe(pageContent);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return scrollState;
}
