import { useCallback, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const [ref, visible] = useInView({ threshold: 0.12 });
  return <Tag ref={ref} data-reveal className={`${className} ${visible ? 'is-visible' : ''}`.trim()} {...props}>{children}</Tag>;
}

export function Spotlight({ as: Tag = 'article', className = '', children, ...props }) {
  const reducedMotion = useReducedMotion();
  const frameRef = useRef(0);
  const pointerRef = useRef(null);
  const handlePointerMove = useCallback((event) => {
    if (reducedMotion) return;
    pointerRef.current = { node: event.currentTarget, x: event.clientX, y: event.clientY };
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      const { node, x, y } = pointerRef.current;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${((x - rect.left) / rect.width) * 100}%`);
      node.style.setProperty('--my', `${((y - rect.top) / rect.height) * 100}%`);
      frameRef.current = 0;
    });
  }, [reducedMotion]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return <Tag className={`spotlight-card ${className}`.trim()} onPointerMove={handlePointerMove} {...props}>{children}</Tag>;
}

export function Counter({ value, decimals = 0, suffix = '' }) {
  const [ref, visible] = useInView({ threshold: 0.35 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return undefined;
    const startedAt = performance.now();
    let frame;

    const draw = (now) => {
      const progress = reducedMotion ? 1 : Math.min((now - startedAt) / 1050, 1);
      const shown = value * (1 - Math.pow(1 - progress, 3));
      if (ref.current) ref.current.textContent = `${decimals ? shown.toFixed(decimals) : Math.round(shown)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [decimals, reducedMotion, suffix, value, visible]);

  return <span ref={ref}>0{suffix}</span>;
}

export function SectionHeading({ eyebrow, id, title, children, compact = false }) {
  return <Reveal className={`section-heading${compact ? ' compact' : ''}`}>
    <p className="eyebrow"><span />{eyebrow}</p>
    <h2 id={id} className="text-balance">{title}</h2>
    {children && <p>{children}</p>}
  </Reveal>;
}
