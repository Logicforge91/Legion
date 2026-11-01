import { useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Counter({ value, decimals = 0, suffix = '' }) {
  const [ref, visible] = useInView({ threshold: 0.35 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return undefined;

    const startedAt = performance.now();
    let frame = 0;

    const draw = (now) => {
      const progress = reducedMotion ? 1 : Math.min((now - startedAt) / 1050, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const shownValue = value * easedProgress;
      const formattedValue = decimals ? shownValue.toFixed(decimals) : Math.round(shownValue);

      if (ref.current) ref.current.textContent = `${formattedValue}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [decimals, reducedMotion, suffix, value, visible]);

  return <span ref={ref}>0{suffix}</span>;
}
