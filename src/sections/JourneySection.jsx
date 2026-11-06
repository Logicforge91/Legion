import { useMemo, useState } from 'react';
import { journey } from '../data/portfolio';
import { Reveal, SectionHeading } from '../components/shared/ui';
import '../styles/sections/JourneySection.css';

const formatMilestoneNumber = (index) => String(index + 1).padStart(2, '0');
const journeyYears = [...new Set(journey.map(({ period }) => period.match(/\b20\d{2}\b/)?.[0]).filter(Boolean))];
const journeyCompanies = [...new Set(journey.map(({ company }) => company).filter(Boolean))];

export default function JourneySection() {
  const [year, setYear] = useState('all');
  const [company, setCompany] = useState('all');
  const visibleJourney = useMemo(() => journey.filter((item) => (
    (year === 'all' || item.period.includes(year))
    && (company === 'all' || item.company === company)
  )), [company, year]);

  return (
    <section id="journey" className="journey-section" aria-labelledby="journeyTitle">
      <div className="site-container">
        <SectionHeading eyebrow="Career archive" id="journeyTitle" title="From shipping PHP features to shaping Java services.">
          Each chapter added a new layer of ownership, from shipping features to making the whole product more dependable.
        </SectionHeading>

        <div className="journey-archive-heading">
          <span>Career archive</span>
          <span aria-live="polite">{String(visibleJourney.length).padStart(2, '0')} of {String(journey.length).padStart(2, '0')} chapters <i aria-hidden="true" /> 2021—2026</span>
        </div>

        <div className="journey-filters">
          <label>
            <span>Year</span>
            <select value={year} onChange={(event) => setYear(event.target.value)}>
              <option value="all">All years</option>
              {journeyYears.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>Company / chapter</span>
            <select value={company} onChange={(event) => setCompany(event.target.value)}>
              <option value="all">All companies</option>
              {journeyCompanies.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          {(year !== 'all' || company !== 'all') && (
            <button type="button" onClick={() => { setYear('all'); setCompany('all'); }}>Reset filters</button>
          )}
        </div>

        <ol className="journey-archive" aria-label="Career milestones">
          {visibleJourney.map((item) => {
            const index = journey.indexOf(item);
            return (
              <Reveal as="li" className="journey-archive__entry" key={`${item.period}-${item.title}`}>
                <time className="journey-archive__period">{item.period}</time>
                <span className="journey-archive__waypoint" aria-hidden="true">{formatMilestoneNumber(index)}</span>
                <article className="journey-archive__card">
                  <header>
                    <span>CHAPTER / {formatMilestoneNumber(index + 1)}</span>
                    {item.company && (
                      <a href={item.companyUrl} target="_blank" rel="noreferrer" className="journey-archive__company">
                        {item.company}<i className="bi bi-arrow-up-right" aria-hidden="true" />
                      </a>
                    )}
                  </header>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            );
          })}
          {!visibleJourney.length && <li className="journey-archive__empty">No chapters match these filters.</li>}
        </ol>
      </div>
    </section>
  );
}
