import { Reveal } from './Reveal';

export function SectionHeading({ eyebrow, id, title, children, compact = false }) {
  return (
    <Reveal className={`section-heading${compact ? ' compact' : ''}`}>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2 id={id} className="text-balance">{title}</h2>
      {children && <p>{children}</p>}
    </Reveal>
  );
}
