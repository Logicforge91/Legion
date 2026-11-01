import { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Spotlight({ as: Tag = 'article', className = '', children, ...props }) {
  const reducedMotion = useReducedMotion();
  const frameRef = useRef(0);
  const pointerRef = useRef(null);

  const handlePointerMove = useCallback((event) => {
    if (reducedMotion) return;

    pointerRef.current = {
      node: event.currentTarget,
      x: event.clientX,
      y: event.clientY,
    };

    if (frameRef.current) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const pointer = pointerRef.current;
      if (!pointer) {
        frameRef.current = 0;
        return;
      }

      const rect = pointer.node.getBoundingClientRect();
      const x = ((pointer.x - rect.left) / Math.max(rect.width, 1)) * 100;
      const y = ((pointer.y - rect.top) / Math.max(rect.height, 1)) * 100;
      pointer.node.style.setProperty('--mx', `${x}%`);
      pointer.node.style.setProperty('--my', `${y}%`);
      frameRef.current = 0;
    });
  }, [reducedMotion]);

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  return (
    <Tag className={`spotlight-card ${className}`.trim()} onPointerMove={handlePointerMove} {...props}>
      {children}
    </Tag>
  );
}
