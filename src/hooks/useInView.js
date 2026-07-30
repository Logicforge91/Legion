import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useInView({ rootMargin = '0px', threshold = 0 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window) || reducedMotion) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin, threshold });

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, rootMargin, threshold]);

  return [ref, visible];
}
