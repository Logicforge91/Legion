import { useEffect, useState } from 'react';

export function useMotionVisibility(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => (
    typeof document === 'undefined' || document.visibilityState === 'visible'
  ));

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsOnScreen(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsOnScreen(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  return isOnScreen && pageVisible;
}
