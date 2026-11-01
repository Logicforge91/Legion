import { journey } from '../data/portfolio';
import { Reveal, SectionHeading } from '../components/shared/ui';
import '../styles/sections/JourneySection.css';

const formatMilestoneNumber = (index) => String(index + 1).padStart(2, '0');

export default function JourneySection() {
  return (
    <section id="journey" className="journey-section" aria-labelledby="journeyTitle">
      <div className="site-container">
        <SectionHeading eyebrow="Career archive" id="journeyTitle" title="From shipping PHP features to shaping Java services.">
          Each chapter added a new layer of ownership, from shipping features to making the whole product more dependable.
        </SectionHeading>

        <div className="journey-archive-heading" aria-hidden="true">
          <span>Career archive</span>
          <span>{String(journey.length).padStart(2, '0')} chapters <i /> 2021—2026</span>
        </div>

        <ol className="journey-archive" aria-label="Career milestones">
          {journey.map((item, index) => (
            <Reveal as="li" className="journey-archive__entry" key={`${item.period}-${item.title}`}>
              <time className="journey-archive__period">{item.period}</time>
              <span className="journey-archive__waypoint" aria-hidden="true">{formatMilestoneNumber(index)}</span>
              <article className="journey-archive__card">
                <header>
                  <span>CHAPTER / {formatMilestoneNumber(index + 1)}</span>
                  {item.company ? (
                    <a href={item.companyUrl} target="_blank" rel="noreferrer" className="journey-archive__company">
                      {item.company}<i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </a>
                  ) : <span className="journey-archive__company">Engineering growth</span>}
                </header>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
