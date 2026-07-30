import { Reveal, Spotlight } from '../components/ui';

const values = [['bi-shield-check', 'Authentication, validation, permissions, middleware, service classes, and secure workflows.'], ['bi-speedometer2', 'MySQL optimization, clean REST APIs, Redis caching, and performance-focused delivery.'], ['bi-diagram-3', 'Spring Boot, layered services, API contracts, and maintainable backend logic.']];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle"><div className="site-container split-layout">
    <Reveal className="section-copy"><p className="eyebrow"><span />Profile</p><h2 id="aboutTitle">Backend Developer with PHP Laravel strength and Java backend growth.</h2><p>I am Suman K S, a Backend Developer based in Bengaluru with professional experience building PHP, Laravel, MySQL, and API-driven business systems.</p><p>Across roles at SocialBytes Technologies and Swipewire Technologies, I have delivered production applications while strengthening Java, Spring Boot, Redis, Docker, and service-oriented design skills.</p><div className="value-list">{values.map(([icon, text]) => <div key={icon}><i className={`bi ${icon}`} /><span>{text}</span></div>)}</div></Reveal>
    <Reveal><Spotlight as="aside" className="profile-card" aria-label="Developer profile summary"><div className="profile-ring"><span>SK</span></div><h3>Suman K S</h3><p>Backend Developer / PHP Laravel Developer / Java Backend Developer</p><dl className="profile-facts"><div><dt>Location</dt><dd>Bengaluru, India</dd></div><div><dt>Primary Focus</dt><dd>PHP, Laravel, REST APIs, MySQL, integrations</dd></div><div><dt>Java Focus</dt><dd>Java, Spring Boot, service layers, backend APIs</dd></div></dl></Spotlight></Reveal>
  </div></section>;
}
