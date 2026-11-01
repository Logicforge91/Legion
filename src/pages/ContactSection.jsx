import { Reveal, Spotlight } from '../components/ui';

const values = [
  ['bi-shield-check', 'Designing auth, validation, and permission boundaries that keep business logic predictable at scale.'],
  ['bi-speedometer2', 'Shaping storage, query, and service patterns around real user behavior and performance constraints.'],
  ['bi-diagram-3', 'Building integration flows that fail safely, recover predictably, and stay observable over time.'],
];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Senior backend engineering grounded in production reality.</h2><p>I’m Suman K S, a backend engineer helping product-focused teams design systems that are reliable under load, understandable in the moment, and maintainable as the business grows.</p><p>My work combines architecture judgment with execution detail: I care about clean contracts, resilient integrations, efficient data paths, and the kind of backend discipline that reduces operational risk without slowing the product down.</p><div className="value-list">{values.map(([icon, text]) => <div key={text}><i className={`bi ${icon}`} aria-hidden="true" /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Senior backend engineer focused on API reliability, data integrity, workflow systems, and production-grade integrations.</p><dl className="profile-facts"><div><dt>Focus</dt><dd>API design, system boundaries, integration architecture, operational resilience</dd></div><div><dt>Stack</dt><dd>Laravel, Java, Spring Boot, MySQL, Redis, Docker, REST, queues</dd></div><div><dt>Location</dt><dd>Bengaluru, India</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
