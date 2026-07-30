import { journey } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';

export default function JourneySection() {
  return <section id="journey" className="journey-section" aria-labelledby="journeyTitle"><div className="site-container"><SectionHeading eyebrow="Journey" id="journeyTitle" title="A Backend Developer journey built around PHP, Laravel, and Java growth.">A steady progression through APIs, integrations, performance, and production support.</SectionHeading><div className="timeline">{journey.map(([year, title, text]) => <Reveal key={year}><Spotlight className="timeline-item"><span className="timeline-year">{year}</span><div><h3>{title}</h3><p>{text}</p></div></Spotlight></Reveal>)}</div></div></section>;
}
