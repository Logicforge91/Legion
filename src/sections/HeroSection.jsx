import { Reveal, Spotlight } from '../components/shared/ui';
import ShareProfileButton from '../components/shared/ShareProfileButton';
import { projects, services } from '../data/portfolio';
import '../styles/sections/HeroSection.css';

const portfolioFacts = [
  { value: String(projects.length).padStart(2, '0'), label: 'Reference systems', detail: 'Across product domains' },
  { value: String(services.length).padStart(2, '0'), label: 'Core services', detail: 'Designed around your needs' },
  { value: 'API · DATA · BACKEND', label: 'Engineering focus', detail: 'Reliable by design' },
];

export default function HeroSection() {
  return (
    <section id="hero" className="hero-section hero-studio-section" aria-labelledby="heroTitle">
      <div className="site-container hero-statusbar">
        <span><i />Available for freelance projects</span>
        <span>QYVERON TECHNOLOGIES / {new Date().getFullYear()}</span>
        <span>IT &amp; Software Development</span>
      </div>

      <div className="site-container hero-studio-grid">
        <Reveal className="hero-copy hero-studio-copy">
          <p className="eyebrow"><span />QYVERON TECHNOLOGIES</p>
          <h1 id="heroTitle">Systems that feel <span className="hero-title-accent">effortless.</span></h1>
          <p className="hero-lede">QYVERON is an independent software development studio building thoughtful digital products, dependable backend systems, and clear API integrations for growing teams.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">Explore the systems <i className="bi bi-arrow-down-right" aria-hidden="true" /></a>
            <a href="#contact" className="btn btn-ghost">Start a project</a>
          </div>
          <div className="hero-footer-row">
            <div className="hero-meta"><span><i />Available for freelance work</span><span>Quality · Trust · Innovation</span></div>
            <ShareProfileButton />
          </div>
        </Reveal>

        <Reveal className="hero-studio-visual">
          <Spotlight as="aside" className="studio-card" aria-label="Backend engineering practice">
            <div className="studio-card-head"><span>Backend / Practice</span><span className="studio-live">Selected principles</span></div>
            <div className="studio-visual-label"><span>Request lifecycle</span><span>Designed for reliability</span></div>
            <div className="studio-flow" role="img" aria-label="Requests move from a client through API validation and authorization, then persist to data storage.">
              <div className="studio-flow-node"><i className="bi bi-window" aria-hidden="true" /><span>Client</span><small>request</small></div><i className="bi bi-arrow-right studio-flow-arrow" aria-hidden="true" />
              <div className="studio-flow-node studio-flow-core"><i className="bi bi-hdd-network" aria-hidden="true" /><span>API</span><small>validate · authorize</small></div><i className="bi bi-arrow-right studio-flow-arrow" aria-hidden="true" />
              <div className="studio-flow-node"><i className="bi bi-database-check" aria-hidden="true" /><span>Data</span><small>persist · respond</small></div>
            </div>
            <div className="studio-system-readout"><div><span>01 / Protect</span><strong>Validate every boundary</strong></div><div><span>02 / Preserve</span><strong>Keep state transitions explicit</strong></div><div className="studio-signal"><i />03 / Operate — make failures diagnosable</div></div>
            <div className="studio-tagline">Engineering Tomorrow, Today</div>
          </Spotlight>
        </Reveal>
      </div>

      <div className="site-container hero-facts" aria-label="QYVERON at a glance">
        {portfolioFacts.map(({ value, label, detail }, index) => (
          <div className="hero-fact" key={label}>
            <span className="hero-fact-index">0{index + 1}</span>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
