import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const [ref, visible] = useInView({ threshold: 0.12 });
  const reducedMotion = useReducedMotion();
  const classes = [className, (visible || reducedMotion) && 'is-visible'].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} data-reveal className={classes} {...props}>
      {children}
    </Tag>
  );
}
