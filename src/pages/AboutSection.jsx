import { Reveal, Spotlight } from '../components/ui';

const values = [['bi-shield-check', 'Make authorization and validation part of the workflow—not decoration around it.'], ['bi-speedometer2', 'Shape schemas, queries, indexes, and caches around how the product is actually used.'], ['bi-diagram-3', 'Keep controllers thin, contracts explicit, and business behavior readable across Laravel and Spring Boot.']];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Laravel-first. Java-forward. Grounded in production reality.</h2><p>I am Suman K S, a Bengaluru-based backend developer shaped by business software: systems where permissions matter, data outlives screens, and a small integration failure can become an operational problem.</p><p>Laravel is where I have the deepest delivery experience. Java and Spring Boot are where I am expanding that foundation—carrying forward the same habits around boundaries, transactions, observability, and maintainable change.</p><div className="value-list">{values.map(([icon, text]) => <div key={icon}><i className={`bi ${icon}`} /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Backend engineer for workflow-heavy products and connected systems.</p><dl className="profile-facts"><div><dt>Based in</dt><dd>Bengaluru, India</dd></div><div><dt>Deepest experience</dt><dd>Laravel, PHP, MySQL, APIs, integrations</dd></div><div><dt>Expanding into</dt><dd>Java, Spring Boot, Redis, Docker</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
