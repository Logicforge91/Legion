import { proof } from '../data/portfolio';
import { Counter, Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import '../styles/sections/AchievementsSection.css';

export default function AchievementsSection() {
  return <section id="achievements" className="achievements-section" aria-labelledby="proofTitle"><div className="site-container"><SectionHeading eyebrow="Proof" id="proofTitle" title="Signals of sustained backend delivery.">Real product patterns, reliability work, and system ownership that show up over time.</SectionHeading><div className="proof-grid">{proof.map(([value, suffix, label, text]) => <Reveal key={label}><Spotlight className="proof-card"><strong className="stat-number"><Counter value={value} suffix={suffix} /></strong><h3>{label}</h3><p>{text}</p></Spotlight></Reveal>)}</div></div></section>;
}
