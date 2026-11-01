import { Reveal, Spotlight } from '../components/ui';

const values = [
  ['bi-shield-check', 'Designing permission models, validation flows, and system boundaries that stay predictable as products grow.'],
  ['bi-speedometer2', 'Shaping query, schema, and service patterns around real usage, operational constraints, and performance needs.'],
  ['bi-diagram-3', 'Building integrations that fail safely, recover predictably, and remain understandable under pressure.'],
];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Senior backend engineering grounded in production reality.</h2><p>I’m Suman K S, a backend engineer focused on building reliable systems that support product growth without creating unnecessary complexity.</p><p>My work sits at the intersection of clean architecture and practical delivery: I design dependable APIs, improve data flows, reduce operational risk, and build integrations that remain smooth as the product matures.</p><div className="value-list">{values.map(([icon, text]) => <div key={text}><i className={`bi ${icon}`} aria-hidden="true" /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Senior backend engineer focused on API reliability, data integrity, workflow systems, and production-grade integrations.</p><dl className="profile-facts"><div><dt>Focus</dt><dd>API design, system boundaries, integration architecture, operational resilience</dd></div><div><dt>Stack</dt><dd>Laravel, Java, Spring Boot, MySQL, Redis, Docker, REST, queues</dd></div><div><dt>Location</dt><dd>Bengaluru, India</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
