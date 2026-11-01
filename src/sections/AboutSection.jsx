import { Reveal, Spotlight } from '../components/shared/ui';
import './AboutSection.css';

const values = [['bi-shield-check', 'Make authorization and validation part of the workflow—not decoration around it.'], ['bi-speedometer2', 'Shape schemas, queries, indexes, and caches around homegrown business rules.'], ['bi-arrows-angle-contract', 'Design for failure, permissions, and observability before the happy path becomes a release story.']];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Laravel-first. Java-forward. Grounded in production reality.</h2><p>I am Suman K S, a Bengaluru-based backend engineer building reliable APIs, intentional data flows, and operationally sane systems for real products.</p><p>My work sits at the point where business rules, payments, permissions, and integrations meet production reality. I care about what breaks in the edge cases, how the next engineer understands it, and how the system behaves when traffic, failures, and support questions begin to pile up.</p><div className="value-list">{values.map(([icon, text]) => <div key={text}><i className={`bi ${icon}`} aria-hidden="true" /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Backend engineer for workflow-heavy products, integrations, and data systems that need to hold up under real use.</p><dl className="profile-facts"><div><dt>Focus</dt><dd>Laravel · Java · APIs · system design</dd></div><div><dt>Location</dt><dd>Bengaluru, India</dd></div><div><dt>Mode</dt><dd>Available for backend roles</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
