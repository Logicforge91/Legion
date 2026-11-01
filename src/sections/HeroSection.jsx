import { Reveal, Spotlight } from '../components/shared/ui';
import ShareProfileButton from '../components/shared/ShareProfileButton';

export default function HeroSection() {
  return <section id="hero" className="hero-section hero-studio-section" aria-labelledby="heroTitle">
    <div className="site-container hero-statusbar"><span><i />Available for selected backend roles</span><span>Independent portfolio / {new Date().getFullYear()}</span><span>Bengaluru, India</span></div>
    <div className="site-container hero-studio-grid">
      <Reveal className="hero-copy hero-studio-copy">
        <p className="eyebrow"><span />Suman K S / Backend Engineer</p>
        <h1 id="heroTitle">Systems that feel <span className="hero-title-accent">effortless.</span></h1>
        <p className="hero-lede">I turn complex business rules into calm, dependable backend experiences: clear APIs, intentional data, resilient integrations, and workflows that stay understandable as products grow.</p>
        <div className="hero-actions"><a href="#projects" className="btn btn-primary">View selected work <i className="bi bi-arrow-down-right" aria-hidden="true" /></a><a href="#contact" className="btn btn-ghost">Get in touch</a></div>
        <div className="hero-footer-row"><div className="hero-meta"><span><i />Open to backend roles</span><span>Remote / hybrid · India</span></div><ShareProfileButton /></div>
      </Reveal>
      <Reveal className="hero-studio-visual"><Spotlight as="aside" className="studio-card" aria-label="Backend engineering practice">
        <div className="studio-card-head"><span>Backend / Practice</span><span className="studio-live">Selected principles</span></div>
        <div className="studio-visual-label"><span>Request lifecycle</span><span>Designed for reliability</span></div>
        <div className="studio-flow" role="img" aria-label="Requests move from a client through API validation and authorization, then persist to data storage.">
          <div className="studio-flow-node"><i className="bi bi-window" aria-hidden="true" /><span>Client</span><small>request</small></div><i className="bi bi-arrow-right studio-flow-arrow" aria-hidden="true" />
          <div className="studio-flow-node studio-flow-core"><i className="bi bi-hdd-network" aria-hidden="true" /><span>API</span><small>validate · authorize</small></div><i className="bi bi-arrow-right studio-flow-arrow" aria-hidden="true" />
          <div className="studio-flow-node"><i className="bi bi-database-check" aria-hidden="true" /><span>Data</span><small>persist · respond</small></div>
        </div>
        <div className="studio-system-readout"><div><span>01 / Protect</span><strong>Validate every boundary</strong></div><div><span>02 / Preserve</span><strong>Keep state transitions explicit</strong></div><div className="studio-signal"><i />03 / Operate — make failures diagnosable</div></div>
        <a className="studio-resume" href="/assets/resume.pdf" download>Download résumé <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </Spotlight></Reveal>
    </div>
  </section>;
}
