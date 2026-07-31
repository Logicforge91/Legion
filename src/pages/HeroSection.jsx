import { useEffect, useState } from 'react';
import { Counter, Reveal, Spotlight } from '../components/ui';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ShareProfileButton from '../components/ShareProfileButton';

const metrics = [[50, '+', 'Backend surfaces', 0], [5, '+', 'Production years', 0], [15, '+', 'Product contexts', 0], [4, '', 'System concerns', 0]];
const roleText = 'Backend Developer / PHP Laravel Developer / Java Backend Developer';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) { setTypedText(roleText); return undefined; }
    let index = 0;
    const timer = window.setInterval(() => { index += 1; setTypedText(roleText.slice(0, index)); if (index === roleText.length) clearInterval(timer); }, 38);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return <section id="hero" className="hero-section" aria-labelledby="heroTitle"><div className="site-container hero-grid">
    <Reveal className="hero-copy"><p className="eyebrow"><span />Backend engineering beyond the happy path</p><h1 id="heroTitle">I build the backend layer that <span className="hero-title-accent">keeps products moving.</span></h1><p className="hero-lede">Laravel-first and production-shaped: I translate business rules into APIs, data models, integrations, and operational workflows that remain understandable when traffic, failures, and change arrive.</p><div className="hero-terminal-line" aria-live="polite"><span className="prompt">$</span><span>{typedText}</span></div><div className="hero-actions"><a href="#projects" className="btn btn-primary">Explore systems</a><a href="/assets/resume.pdf" className="btn btn-ghost" target="_blank" rel="noreferrer" download>Download resume</a><ShareProfileButton /></div><div className="hero-meta" aria-label="Current availability"><span className="hero-meta-item"><span className="hero-meta-dot" />Available for backend roles</span><span className="hero-meta-item"><i className="bi bi-geo-alt" aria-hidden="true" />Bengaluru, India</span></div><div className="hero-social" aria-label="Social links"><a href="https://github.com/Logicforge91" target="_blank" rel="noreferrer" aria-label="GitHub profile"><i className="bi bi-github" /></a><a href="https://www.linkedin.com/in/suman-k-s-a55868184/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><i className="bi bi-linkedin" /></a><a href="mailto:sumanks1307@gmail.com" aria-label="Send email"><i className="bi bi-envelope" /></a></div></Reveal>
    <Reveal><Spotlight as="div" className="ops-panel"><div className="panel-topline"><div><span className="panel-kicker">Live system thinking</span><h2>Operational by design</h2></div><span className="status-pill"><span />Ready</span></div><div className="console-card"><div className="console-toolbar"><span /><span /><span /><strong>api-gateway.log</strong></div><pre><code><span className="muted">POST</span>{' /api/v1/orders\n'}<span className="accent">200 OK</span>{' 86ms cache_hit=true\n\nqueue: payments.reconcile\nworker: 8 active / 0 failed\n\nrelease: zero-downtime\nobservability: traces + metrics'}</code></pre></div><div className="metric-grid">{metrics.map(([value, suffix, label, decimals]) => <article className="metric-card" key={label}><strong><Counter value={value} suffix={suffix} decimals={decimals} /></strong><span>{label}</span></article>)}</div></Spotlight></Reveal>
  </div></section>;
}
