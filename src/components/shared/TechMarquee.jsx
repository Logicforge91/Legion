import { useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import '../../styles/sections/TechIndex.css';

const technologyGroups = [
  {
    number: '01',
    name: 'Languages',
    summary: 'Primary languages used across application and data layers',
    icon: 'bi-braces',
    technologies: ['PHP 8.x', 'Java 17', 'JavaScript', 'SQL'],
  },
  {
    number: '02',
    name: 'Frameworks',
    summary: 'Backend frameworks and application foundations',
    icon: 'bi-boxes',
    technologies: ['Laravel', 'Lumen', 'Core PHP', 'Spring Boot', 'Spring MVC', 'Spring Security'],
  },
  {
    number: '03',
    name: 'Backend engineering',
    summary: 'Service design, APIs, and secure application access',
    icon: 'bi-hdd-network',
    technologies: ['REST APIs', 'API Integration', 'JSON', 'MVC', 'OOP', 'Microservices', 'Authentication', 'Authorization', 'JWT'],
  },
  {
    number: '04',
    name: 'Data & performance',
    summary: 'Reliable persistence and efficient query workloads',
    icon: 'bi-database-check',
    technologies: ['MySQL', 'Eloquent ORM', 'Hibernate/JPA', 'Redis', 'Schema Design', 'Indexing', 'Query Tuning', 'N+1 Query Optimization'],
  },
  {
    number: '05',
    name: 'Cloud',
    summary: 'AWS services used for application infrastructure',
    icon: 'bi-cloud-check',
    technologies: ['AWS S3', 'AWS EC2', 'AWS RDS'],
  },
  {
    number: '06',
    name: 'Tools & practices',
    summary: 'Team workflows, delivery discipline, and production ownership',
    icon: 'bi-kanban',
    technologies: ['Git', 'GitHub', 'GitLab', 'Composer', 'Maven', 'Postman', 'Jira', 'Agile/Scrum', 'SDLC', 'Code Review', 'Production Support'],
  },
];

const technologyCount = technologyGroups.reduce(
  (count, group) => count + group.technologies.length,
  0,
);

const technologyLanes = [
  {
    label: 'Build',
    direction: 'forward',
    items: technologyGroups.slice(0, 3).flatMap((group) => group.technologies),
  },
  {
    label: 'Operate',
    direction: 'reverse',
    items: technologyGroups.slice(3).flatMap((group) => group.technologies),
  },
];

export default function TechMarquee() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const isPaused = paused || reducedMotion;

  return (
    <section className="tech-index-section" aria-labelledby="techIndexTitle">
      <div className="site-container">
        <div className="tech-index-heading">
          <div>
            <div className="tech-index-edition" aria-label="Technology index, 2026 edition">
              <span className="tech-index-edition__prompt" aria-hidden="true">$</span>
              <span className="tech-index-edition__command" aria-hidden="true">tech-index</span>
              <span className="tech-index-edition__flag" aria-hidden="true">--edition</span>
              <strong className="tech-index-edition__year" aria-hidden="true">2026</strong>
              <span className="tech-index-edition__cursor" aria-hidden="true" />
            </div>
            <h2 id="techIndexTitle">Tools chosen for the work.</h2>
          </div>
          <p>Grouped by where they create value, from application logic to delivery.</p>
        </div>

        <div className="tech-index-meta">
          <span><strong>{String(technologyCount).padStart(2, '0')}</strong> technologies</span>
          <span><strong>{String(technologyGroups.length).padStart(2, '0')}</strong> domains</span>
          <span className="tech-index-status"><i aria-hidden="true" /> Production-minded stack</span>
        </div>

        <div className="tech-flow" data-paused={isPaused} role="region" aria-label="Continuous technology index">
          <div className="tech-flow__toolbar">
            <span><i aria-hidden="true" /> Continuous index</span>
            {reducedMotion ? (
              <span className="tech-flow__motion-note">Motion minimized</span>
            ) : (
              <button
                className="tech-flow__toggle"
                type="button"
                aria-pressed={paused}
                onClick={() => setPaused((current) => !current)}
              >
                <i className={`bi ${paused ? 'bi-play-fill' : 'bi-pause-fill'}`} aria-hidden="true" />
                {paused ? 'Resume flow' : 'Pause flow'}
              </button>
            )}
          </div>

          <div className="tech-flow__viewport" data-static={isPaused}>
            {technologyLanes.map(({ label, direction, items }) => (
              <div className="tech-flow__lane" key={label}>
                <span className="tech-flow__lane-label">{label}</span>
                <div className="tech-flow__clip" tabIndex={isPaused ? 0 : undefined} aria-label={`${label} technologies`}>
                  <div className={`tech-flow__track${direction === 'reverse' ? ' is-reversed' : ''}`} aria-hidden="true">
                    {[false, true].map((isClone) => (
                      <div className="tech-flow__group" key={`${label}-${isClone ? 'clone' : 'main'}`}>
                        {items.map((technology, index) => (
                          <span className="tech-flow__item" key={`${technology}-${index}`}>
                            <i aria-hidden="true" />{technology}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="visually-hidden">
            {technologyGroups.map((group) => (
              <div key={group.number}>
                <h3>{group.name}</h3>
                <ul>{group.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
