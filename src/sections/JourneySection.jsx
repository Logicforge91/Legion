import { journey } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import './JourneySection.css';

export default function JourneySection() {
  return <section id="journey" className="journey-section" aria-labelledby="journeyTitle"><div className="site-container"><SectionHeading eyebrow="Journey" id="journeyTitle" title="Built in layers: from fundamentals to production ownership.">A career progression shaped by systems, constraints, and real product pressure.</SectionHeading><div className="timeline">{journey.map((item) => <Reveal key={`${item.period}-${item.title}`}><Spotlight className="timeline-item"><span className="timeline-year">{item.period}</span><div><h3>{item.title}</h3>{item.company && <a href={item.companyUrl} target="_blank" rel="noreferrer" className="company-link">{item.company}</a>}<p>{item.text}</p></div></Spotlight></Reveal>)}</div></div></section>;
}
