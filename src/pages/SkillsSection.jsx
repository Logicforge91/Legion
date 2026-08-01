import { skills } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';

export default function SkillsSection() {
  return <section id="skills" className="skills-section" aria-labelledby="skillsTitle"><div className="site-container"><SectionHeading eyebrow="Stack" id="skillsTitle" title="A stack organized by responsibility—not by logo count.">Tools matter. Knowing which boundary, query, queue, or failure mode deserves attention matters more.</SectionHeading><div className="stack-board">{skills.map(([icon, title, text]) => <Reveal key={title}><Spotlight className="stack-card"><i className={`bi ${icon}`} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></Spotlight></Reveal>)}</div></div></section>;
}
