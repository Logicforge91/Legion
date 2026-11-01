const technologies = [
  'Laravel', 'PHP', 'Spring Boot', 'Java', 'MySQL', 'Redis',
  'Docker', 'REST APIs', 'React', 'AWS', 'PostgreSQL', 'Webhooks'
];

export default function TechMarquee() {
  return (
    <div className="tech-marquee-section" role="region" aria-label="Core technologies">
      <div className="site-container">
        <p className="visually-hidden">{technologies.join(', ')}</p>
        <div className="tech-marquee-shell">
          <div className="tech-marquee-track" aria-hidden="true">
            {[...technologies, ...technologies].map((item, index) => (
              <span className="tech-chip" key={`${item}-${index}`}>
                <span className="tech-chip-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
