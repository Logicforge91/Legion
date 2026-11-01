import { journey } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import './JourneySection.css';

const nodePositions = ['top', 'right', 'lower-right', 'lower-left', 'left'];

function JourneyLoop() {
  return (
    <div className="journey-loop" aria-hidden="true">
      <svg className="journey-loop__graphic" viewBox="0 0 320 320" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="journey-loop-gradient" x1="36" y1="50" x2="282" y2="270" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-secondary, var(--accent))" />
          </linearGradient>
          <marker id="journey-loop-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M1 1 7 4.5 1 8" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <circle className="journey-loop__track" cx="160" cy="160" r="118" />
        <path className="journey-loop__direction" d="M160 42a118 118 0 1 1-83.44 34.56" markerEnd="url(#journey-loop-arrow)" />
        <g className="journey-loop__nodes" fill="var(--surface, #fff)">
          <circle cx="160" cy="42" r="7" />
          <circle cx="271.9" cy="123.3" r="7" />
          <circle cx="229.3" cy="254.3" r="7" />
          <circle cx="90.7" cy="254.3" r="7" />
          <circle cx="48.1" cy="123.3" r="7" />
        </g>
      </svg>

      <div className="journey-loop__center">
        <span className="journey-loop__eyebrow">Journey</span>
        <strong>Career in<br />motion</strong>
      </div>

      {journey.map((item, index) => (
        <div className={`journey-loop__node journey-loop__node--${nodePositions[index]}`} key={`${item.period}-${item.title}`}>
          <span className="journey-loop__node-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="journey-loop__node-year">{item.period}</span>
          <span className="journey-loop__node-title">{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default function JourneySection() {
  return (
    <section id="journey" className="journey-section" aria-labelledby="journeyTitle">
      <div className="site-container">
        <SectionHeading eyebrow="Journey" id="journeyTitle" title="Built in layers: from fundamentals to production ownership.">
          A career progression shaped by systems, constraints, and real product pressure.
        </SectionHeading>
        <div className="journey-layout">
          <JourneyLoop />
          <div className="timeline" role="list" aria-label="Career milestones">
            {journey.map((item, index) => (
              <Reveal key={`${item.period}-${item.title}`} role="listitem">
                <Spotlight className="timeline-item">
                  <div>
                    <h3><span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>{item.title}</h3>
                    <span className="timeline-year">{item.period}</span>
                    {item.company && (
                      <a href={item.companyUrl} target="_blank" rel="noreferrer" className="company-link">
                        {item.company}
                      </a>
                    )}
                    <p>{item.text}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
