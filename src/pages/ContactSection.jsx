import { Reveal, Spotlight } from '../components/ui';

const values = [
  ['bi-shield-check', 'Strong validation, auth, and permission boundaries that keep business rules predictable.'],
  ['bi-speedometer2', 'Service and query design shaped around real user behavior, failures, and scale.'],
  ['bi-diagram-3', 'Integration flows that stay observable, resilient, and easier to maintain over time.'],
];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Laravel-first. Java-forward. Built for real products, not just demos.</h2><p>I am Suman K S, a backend engineer focused on the systems behind product growth: APIs, integrations, data flows, operational reliability, and the calm that comes from a well-structured backend.</p><p>I work best at the point where product intent meets implementation detail—turning business rules into clean services, efficient queries, retry-safe integrations, and operations that are easy to understand when the product is under pressure.</p><div className="value-list">{values.map(([icon, text]) => <div key={text}><i className={`bi ${icon}`} aria-hidden="true" /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Backend engineer for workflow-heavy product teams. I help turn complexity into maintainable systems with clear boundaries and resilient execution.</p><dl className="profile-facts"><div><dt>Focus</dt><dd>API design, database integrity, integrations, workflow orchestration</dd></div><div><dt>Stack</dt><dd>Laravel, Java, Spring Boot, MySQL, Redis, Docker, REST, queues</dd></div><div><dt>Location</dt><dd>Bengaluru, India</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
