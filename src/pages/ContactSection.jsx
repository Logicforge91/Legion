import { Reveal, Spotlight } from '../components/ui';

const values = [
  ['bi-shield-check', 'Clear boundaries for auth, validation, and permissions so business rules stay predictable.'],
  ['bi-speedometer2', 'Strong API, query, and service design tuned for real product usage and performance.'],
  ['bi-diagram-3', 'Resilient integrations that fail safely, recover predictably, and stay easy to reason about.'],
];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Senior backend engineering for modern product teams.</h2><p>I’m Suman K S, a backend engineer focused on creating reliable systems that help products scale without losing clarity or operational confidence.</p><p>I work best where product thinking meets engineering discipline: designing clean APIs, improving data flows, reducing operational risk, and building integrations that remain dependable as the product matures.</p><div className="value-list">{values.map(([icon, text]) => <div key={text}><i className={`bi ${icon}`} aria-hidden="true" /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Senior backend engineer helping product teams build reliable systems with clean architecture, strong data foundations, and sustainable delivery.</p><dl className="profile-facts"><div><dt>Focus</dt><dd>API design, system boundaries, workflow reliability, integration architecture</dd></div><div><dt>Stack</dt><dd>Laravel, Java, Spring Boot, MySQL, Redis, Docker, REST, queues</dd></div><div><dt>Location</dt><dd>Bengaluru, India</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
