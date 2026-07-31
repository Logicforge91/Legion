import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const observerPools = new Map();

function observeElement(element, callback, options) {
  const key = `${options.rootMargin}|${options.threshold}`;
  let pool = observerPools.get(key);

  if (!pool) {
    const callbacks = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => callbacks.get(entry.target)?.(entry));
    }, options);
    pool = { callbacks, observer };
    observerPools.set(key, pool);
  }

  pool.callbacks.set(element, callback);
  pool.observer.observe(element);

  return () => {
    pool.observer.unobserve(element);
    pool.callbacks.delete(element);
    if (!pool.callbacks.size) {
      pool.observer.disconnect();
      observerPools.delete(key);
    }
  };
}

export function useInView({ rootMargin = '0px', threshold = 0 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (visible) return undefined;
    if (!node || !('IntersectionObserver' in window) || reducedMotion) {
      setVisible(true);
      return undefined;
    }

    return observeElement(node, (entry) => {
      if (entry.isIntersecting) setVisible(true);
    }, { rootMargin, threshold });
  }, [reducedMotion, rootMargin, threshold, visible]);

  return [ref, visible];
}
