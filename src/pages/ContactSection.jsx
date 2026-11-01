import { Reveal, Spotlight } from '../components/ui';

const values = [
  ['bi-shield-check', 'I design auth, validation, and permission boundaries so the business logic stays predictable.'],
  ['bi-speedometer2', 'I optimize schemas, queries, and service flow around real user behavior and production bottlenecks.'],
  ['bi-diagram-3', 'I build integrations that fail safely, retry smartly, and stay understandable when the system is under pressure.'],
];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Laravel-first. Java-forward. Built for real product work.</h2><p>I’m Suman K S, a backend engineer who enjoys the part where product intent meets system detail. I care about APIs that scale, data patterns that hold up, and integrations that stay resilient long after launch.</p><p>My work sits at the intersection of engineering discipline and business clarity: turning messy workflows into structured systems, reducing operational risk, and making the backend feel calm even when the product is growing fast.</p><div className="value-list">{values.map(([icon, text]) => <div key={text}><i className={`bi ${icon}`} aria-hidden="true" /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Backend engineer for workflow-heavy products. I help teams turn complexity into maintainable systems with clean boundaries, strong data logic, and dependable execution.</p><dl className="profile-facts"><div><dt>Focus</dt><dd>API design, data integrity, integrations, workflow orchestration</dd></div><div><dt>Stack</dt><dd>Laravel, Java, Spring Boot, MySQL, Redis, Docker, REST, queues</dd></div><div><dt>Location</dt><dd>Bengaluru, India</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
