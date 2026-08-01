import { proof } from '../data';
import { Counter, Reveal, SectionHeading, Spotlight } from '../components/ui';

export default function AchievementsSection() {
  return <section id="achievements" className="achievements-section" aria-labelledby="proofTitle"><div className="site-container"><SectionHeading eyebrow="Proof" id="proofTitle" title="Signals of sustained delivery, not vanity metrics.">A compact view of the scope, repetition, and production exposure behind the work.</SectionHeading><div className="proof-grid">{proof.map(([value, suffix, title, text]) => <Reveal key={title}><Spotlight className="proof-card"><strong className="proof-number"><Counter value={value} suffix={suffix} /></strong><h3>{title}</h3><p>{text}</p></Spotlight></Reveal>)}</div></div></section>;
}
