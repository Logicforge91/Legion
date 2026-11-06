import { Reveal } from '../components/shared/ui';
import ShareProfileButton from '../components/shared/ShareProfileButton';
import '../styles/sections/HeroSection.css';

const capabilities = [
  { icon: 'bi-hdd-network', title: 'Backend systems', detail: 'Reliable application foundations' },
  { icon: 'bi-diagram-3', title: 'API platforms', detail: 'Connected products and services' },
  { icon: 'bi-database', title: 'Data architecture', detail: 'Clear, dependable information flows' },
];

export default function HeroSection() {
  return (
    <section id="hero" className="hero-section hero-company-section" aria-labelledby="heroTitle">
      <div className="site-container hero-company-layout">
        <Reveal className="hero-company-copy">
          <p className="hero-company-eyebrow"><span aria-hidden="true" />Software for what comes next</p>
          <h1 id="heroTitle">Technology that <span>moves business forward.</span></h1>
          <p className="hero-company-lede">QYVERON TECHNOLOGIES designs dependable software, backend systems, and APIs to help organizations do their best work.</p>
          <div className="hero-company-actions">
            <a href="#projects" className="btn btn-primary">Explore solutions <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
            <a href="#contact" className="hero-company-contact">Talk to our team <i className="bi bi-arrow-right" aria-hidden="true" /></a>
          </div>
          <div className="hero-company-trust">
            <span><i className="bi bi-shield-check" aria-hidden="true" />Quality by design</span>
            <span><i className="bi bi-link-45deg" aria-hidden="true" />Built to work together</span>
            <ShareProfileButton />
          </div>
        </Reveal>

        <Reveal className="hero-company-visual">
          <div className="hero-visual-orbit hero-visual-orbit--outer" aria-hidden="true" />
          <div className="hero-visual-orbit hero-visual-orbit--inner" aria-hidden="true" />
          <div className="hero-visual-glow" aria-hidden="true" />
          <div className="hero-visual-brand" aria-hidden="true">Q</div>
          <div className="hero-visual-panel">
            <div className="hero-visual-heading">
              <span>QYVERON TECHNOLOGIES</span>
              <span className="hero-visual-status"><i aria-hidden="true" />Connected by design</span>
            </div>
            <div className="hero-visual-message">
              <span>One clear direction</span>
              <h2>Systems that work as one.</h2>
              <p>Software <i aria-hidden="true" /> APIs <i aria-hidden="true" /> Data</p>
            </div>
            <div className="hero-visual-modules" aria-label="Connected software capabilities">
              <div><i className="bi bi-window-stack" aria-hidden="true" /><span>Products</span></div>
              <i className="bi bi-arrow-right" aria-hidden="true" />
              <div className="hero-visual-module--active"><i className="bi bi-diagram-3" aria-hidden="true" /><span>Services</span></div>
              <i className="bi bi-arrow-right" aria-hidden="true" />
              <div><i className="bi bi-database" aria-hidden="true" /><span>Data</span></div>
            </div>
            <div className="hero-visual-footer"><span>Thoughtful engineering</span><span>Made for real-world work</span></div>
          </div>
          <div className="hero-visual-caption"><span>Engineering Tomorrow, Today.</span><span>Software · APIs · Data</span></div>
        </Reveal>
      </div>

      <div className="site-container hero-capabilities" aria-label="QYVERON capabilities">
        {capabilities.map(({ icon, title, detail }) => (
          <article className="hero-capability" key={title}>
            <span className="hero-capability-icon"><i className={`bi ${icon}`} aria-hidden="true" /></span>
            <span className="hero-capability-copy"><strong>{title}</strong><small>{detail}</small></span>
            <i className="bi bi-arrow-up-right hero-capability-arrow" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
