import { Reveal, Spotlight } from '../components/shared/ui';
import { profile } from '../data/portfolio.js';
import '../styles/sections/AboutSection.css';

function BrandIdentity() {
  return (
    <div className="profile-index" aria-label="QYVERON company identity">
      <span className="profile-index__number" aria-hidden="true">Q</span>
      <span className="profile-index__copy">
        <strong>{profile.name}</strong>
        <small>{profile.tagline}</small>
      </span>
    </div>
  );
}

function CompanyCard() {
  return (
    <Reveal>
      <Spotlight as="aside" className="profile-card" aria-label="QYVERON company profile">
        <div className="profile-card__header">
          <span>COMPANY PROFILE</span>
          <span><i aria-hidden="true" />TECHNOLOGY COMPANY</span>
        </div>
        <div className="profile-ring"><span>Q</span></div>
        <div className="profile-card__intro">
          <h3>{profile.name}</h3>
          <p>{profile.summary}</p>
        </div>
        <dl className="profile-facts">
          <div><dt>Industry</dt><dd>{profile.industry}</dd></div>
          <div><dt>Personality</dt><dd>{profile.personality.join(' · ')}</dd></div>
          <div><dt>Core values</dt><dd>{profile.coreValues.join(' · ')}</dd></div>
          <div><dt>Vision</dt><dd>{profile.vision}</dd></div>
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
          <BrandIdentity />
          <h2 id="aboutTitle">A technology company focused on dependable digital products.</h2>
          <p>{profile.introduction}</p>
          <p>{profile.approach}</p>
          <a className="btn btn-primary" href="#services">
            Explore our services <i className="bi bi-arrow-down-right" aria-hidden="true" />
          </a>
        </Reveal>
        <CompanyCard />
      </div>
    </section>
  );
}
