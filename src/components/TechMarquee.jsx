import { Reveal } from './ui';

const technologies = [
  'Laravel', 'PHP', 'Spring Boot', 'Java', 'MySQL', 'Redis',
  'Docker', 'REST APIs', 'React', 'AWS', 'PostgreSQL', 'Webhooks'
];

export default function TechMarquee() {
  return <div className="tech-marquee-section" aria-label="Core technologies">
    <div className="site-container">
      <Reveal className="tech-marquee-shell">
        <div className="tech-marquee-track">
          {[...technologies, ...technologies].map((item, index) => <span className="tech-chip" key={`${item}-${index}`}><span className="tech-chip-dot" aria-hidden="true" />{item}</span>)}
        </div>
      </Reveal>
    </div>
  </div>;
}
