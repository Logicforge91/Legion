import { Reveal, Spotlight } from '../components/shared/ui';
import { profile } from '../data/portfolio.js';
import '../styles/sections/AboutSection.css';

const values = [
  [
    'bi-shield-check',
    'Make authorization and validation part of the workflow—not decoration around it.',
  ],
  [
    'bi-speedometer2',
    'Shape schemas, queries, indexes, and caches around homegrown business rules.',
  ],
  [
    'bi-arrows-angle-contract',
    'Design for failure, permissions, and observability before the happy path becomes a release story.',
  ],
];

function EngineerIdentity() {
  return (
    <div className="profile-index" aria-label="The Engineer section">
      <span className="profile-index__number" aria-hidden="true">01</span>
      <span className="profile-index__copy">
        <strong>The Engineer</strong>
        <small>Identity / Backend engineering</small>
      </span>
    </div>
  );
}

function ProfileCard() {
  return (
    <Reveal>
      <Spotlight as="aside" className="profile-card" aria-label="Developer profile summary">
        <div className="profile-card__header">
          <span>IDENTITY / 01</span>
          <span><i aria-hidden="true" />OPEN TO ROLES</span>
        </div>
        <div className="profile-ring"><span>SK</span></div>
        <div className="profile-card__intro">
          <h3>Suman K S</h3>
          <p>{profile.summary}</p>
        </div>
        <dl className="profile-facts">
          <div><dt>Focus</dt><dd>Laravel · Java · APIs · system design</dd></div>
          <div><dt>Location</dt><dd>Bengaluru, India</dd></div>
          <div><dt>Mode</dt><dd>Available for backend roles</dd></div>
        </dl>
      </Spotlight>
    </Reveal>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="aboutTitle">
      <div className="site-container split-layout">
        <Reveal className="section-copy">
          <EngineerIdentity />
          <h2 id="aboutTitle">Laravel-first. Java-forward. Grounded in production reality.</h2>
          <p>
            {profile.introduction}
          </p>
          <p>
            {profile.approach}
          </p>
          <div className="value-list">
            {values.map(([icon, text]) => (
              <div key={text}>
                <i className={`bi ${icon}`} aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <ProfileCard />
      </div>
    </section>
  );
}
