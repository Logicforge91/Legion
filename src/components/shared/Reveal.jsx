import { useInView } from '../../hooks/useInView';

export function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const [ref, visible] = useInView({ threshold: 0.12 });
  const classes = [className, visible && 'is-visible'].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} data-reveal className={classes} {...props}>
      {children}
    </Tag>
  );
}
