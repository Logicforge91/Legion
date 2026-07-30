import { skills } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';

export default function SkillsSection() {
  return <section id="skills" className="skills-section" aria-labelledby="skillsTitle"><div className="site-container"><SectionHeading eyebrow="Stack" id="skillsTitle" title="Backend skills for PHP Laravel and Java backend roles.">A focused toolkit for APIs, databases, integrations, performance, and production support.</SectionHeading><div className="stack-board">{skills.map(([icon, title, text]) => <Reveal key={title}><Spotlight className="stack-card"><i className={`bi ${icon}`} /><h3>{title}</h3><p>{text}</p></Spotlight></Reveal>)}</div></div></section>;
}
