import { useEffect, useRef } from 'react';
import { Counter, Reveal, Spotlight } from '../components/ui';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ShareProfileButton from '../components/ShareProfileButton';

const metrics = [[50, '+', 'Backend surfaces', 0], [5, '+', 'Production years', 0], [15, '+', 'Product contexts', 0], [4, '', 'System concerns', 0]];
const systemLayers = [
  ['01', 'Request', 'Authenticated'],
  ['02', 'Domain', 'Validated'],
  ['03', 'Queue', 'Observed'],
  ['04', 'Data', 'Consistent'],
];
const roleText = 'Backend Developer / PHP Laravel Developer / Java Backend Developer';

export default function HeroSection() {
  const typedTextRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const node = typedTextRef.current;
    if (!node) return undefined;
    if (reducedMotion) { node.textContent = roleText; return undefined; }
    let index = 0;
    node.textContent = '';
    const timer = window.setInterval(() => { index += 1; node.textContent = roleText.slice(0, index); if (index === roleText.length) clearInterval(timer); }, 38);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return <section id="hero" className="hero-section" aria-labelledby="heroTitle">
    <div className="site-container hero-statusbar" aria-label="Portfolio status">
      <span><i />System portfolio / {new Date().getFullYear()}</span><span>Laravel + Java engineering</span><span className="hero-statusbar-time">IST / Bengaluru</span>
    </div>
    <div className="site-container hero-grid">
      <Reveal className="hero-copy">
        <p className="eyebrow"><span />Backend engineering beyond the happy path</p>
        <h1 id="heroTitle">I build the backend layer that <span className="hero-title-accent">keeps products moving.</span></h1>
        <p className="hero-lede">Laravel-first and production-shaped: I translate business rules into APIs, data models, integrations, and operational workflows that remain understandable when traffic, failures, and change arrive.</p>
        <div className="hero-terminal-line"><span className="visually-hidden">{roleText}</span><span aria-hidden="true"><span className="prompt">$</span><span ref={typedTextRef} /></span><i className="hero-caret" aria-hidden="true" /></div>
        <div className="hero-actions"><a href="#projects" className="btn btn-primary">Explore systems<i className="bi bi-arrow-down-right" aria-hidden="true" /></a><a href="/assets/resume.pdf" className="btn btn-ghost" download>Download resume</a><ShareProfileButton /></div>
        <div className="hero-footer-row"><div className="hero-meta" aria-label="Current availability"><span className="hero-meta-item"><span className="hero-meta-dot" />Available for backend roles</span><span className="hero-meta-item"><i className="bi bi-geo-alt" aria-hidden="true" />Bengaluru, India</span></div><div className="hero-social" aria-label="Social links"><a href="https://github.com/Logicforge91" target="_blank" rel="noreferrer" aria-label="GitHub profile"><i className="bi bi-github" aria-hidden="true" /></a><a href="https://www.linkedin.com/in/suman-k-s-a55868184/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><i className="bi bi-linkedin" aria-hidden="true" /></a><a href="mailto:sumanks1307@gmail.com" aria-label="Send email"><i className="bi bi-envelope" aria-hidden="true" /></a></div></div>
      </Reveal>
      <Reveal className="hero-dashboard-wrap"><Spotlight as="div" className="ops-panel hero-dashboard">
        <div className="dashboard-grid" aria-hidden="true" />
        <div className="panel-topline"><div><span className="panel-kicker">Architecture monitor</span><h2>Operational by design</h2></div><span className="status-pill"><span />All systems nominal</span></div>
        <div className="architecture-map" aria-label="Backend architecture layers">{systemLayers.map(([number, title, state], index) => <div className="architecture-node" key={title}><span>{number}</span><i className={`bi ${['bi-shield-check', 'bi-braces', 'bi-stack', 'bi-database-check'][index]}`} aria-hidden="true" /><strong>{title}</strong><small>{state}</small></div>)}</div>
        <div className="console-card"><div className="console-toolbar"><span /><span /><span /><strong>runtime / production</strong><em>LIVE</em></div><pre><code><span className="muted">POST</span>{' /api/v1/orders  '}<span className="accent">200 OK</span>{'  86ms\n'}<span className="muted">EVENT</span>{' payment.reconciled  '}<span className="accent">ACK</span>{'\n'}<span className="muted">TRACE</span>{' zero-downtime.release  '}<span className="accent">HEALTHY</span></code></pre></div>
        <div className="metric-grid">{metrics.map(([value, suffix, label, decimals]) => <article className="metric-card" key={label}><strong><Counter value={value} suffix={suffix} decimals={decimals} /></strong><span>{label}</span></article>)}</div>
      </Spotlight></Reveal>
    </div>
    <div className="site-container hero-scroll-cue" aria-hidden="true"><span>Scroll to inspect</span><i className="bi bi-arrow-down" /></div>
  </section>;
}
