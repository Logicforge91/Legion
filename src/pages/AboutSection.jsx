import { Reveal, Spotlight } from '../components/ui';

const values = [
  ['bi-shield-check', 'Make authorization and validation part of the workflow—not decoration around it.'],
  ['bi-speedometer2', 'Shape schemas, queries, indexes, and caches around how real products use data.'],
  ['bi-diagram-3', 'Keep integrations isolated, observable, and safe to retry under imperfect conditions.'],
];

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="aboutTitle">
    <div className="site-container split-layout">
      <Reveal className="section-copy">
        <p className="eyebrow"><span />Profile</p>
        <h2 id="aboutTitle">Laravel-first. Java-forward. Grounded in production reality.</h2>
        <p>I’m Suman K S, a backend engineer based in Bengaluru who turns business complexity into calm, dependable systems.</p>
        <p>I work across APIs, data design, workflow logic, and integrations—building the layer that keeps products moving without breaking under pressure.</p>

        <div className="value-list">
          {values.map(([icon, text]) => (
            <div key={text} className="value-item">
              <i className={`bi ${icon}`} aria-hidden="true" />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <Spotlight as="aside" className="profile-card" aria-label="Developer profile summary">
          <div className="profile-ring"><span>SK</span></div>
          <h3>Suman K S</h3>
          <p>Senior backend engineer focused on product reliability, API clarity, and operational resilience.</p>
          <ul className="profile-points">
            <li>Laravel + Java backend systems</li>
            <li>Reliable APIs and real-world data paths</li>
            <li>Integrations and production ownership</li>
          </ul>
        </Spotlight>
      </Reveal>
    </div>
  </section>;
}
