import { journey } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';

export default function JourneySection() {
  return <section id="journey" className="journey-section" aria-labelledby="journeyTitle"><div className="site-container"><SectionHeading eyebrow="Journey" id="journeyTitle" title="A Backend Developer journey built around PHP, Laravel, and Java growth.">A steady progression through APIs, integrations, performance, and production support.</SectionHeading><div className="timeline">{journey.map(({ period, title, company, companyUrl, text }) => <Reveal key={period}><Spotlight className="timeline-item"><span className="timeline-year">{period}</span><div>{company && <a className="company-link" href={companyUrl} target="_blank" rel="noreferrer"><span>{company}</span><i className="bi bi-arrow-up-right" aria-hidden="true" /></a>}<h3>{title}</h3><p>{text}</p></div></Spotlight></Reveal>)}</div></div></section>;
}
