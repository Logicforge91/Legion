import { useEffect, useRef } from 'react';
import { Counter, Reveal, Spotlight } from '../components/ui';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ShareProfileButton from '../components/ShareProfileButton';

const metrics = [[50, '+', 'backend systems', 0], [5, '+', 'years in production', 0], [15, '+', 'product contexts', 0], [4, '', 'core concerns', 0]];
const roleText = 'Laravel · Java · APIs · product-ready systems';

export default function HeroSection() {
  const typedTextRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = typedTextRef.current;
    if (!node) return undefined;
    if (reducedMotion) { node.textContent = roleText; return undefined; }
    let index = 0;
    node.textContent = '';
    const timer = window.setInterval(() => {
      index += 1;
      node.textContent = roleText.slice(0, index);
      if (index === roleText.length) window.clearInterval(timer);
    }, 34);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return <section id="hero" className="hero-section hero-studio-section" aria-labelledby="heroTitle">
    <div className="site-container hero-statusbar" aria-label="Portfolio status">
      <span><i />Available for backend roles</span><span>Independent portfolio / {new Date().getFullYear()}</span><span className="hero-statusbar-time">Bengaluru, India</span>
    </div>
    <div className="site-container hero-studio-grid">
      <Reveal className="hero-copy hero-studio-copy">
        <p className="eyebrow"><span />Suman K S / Senior Backend Engineer</p>
        <h1 id="heroTitle">I build backend systems that help products <span className="hero-title-accent">move with confidence.</span></h1>
        <p className="hero-lede">I design backend foundations that keep products reliable as they grow: clean API boundaries, intentional data flows, resilient integrations, and workflows that stay understandable in production.</p>
        <div className="hero-actions"><a href="#projects" className="btn btn-primary">View selected work <i className="bi bi-arrow-down-right" aria-hidden="true" /></a><a href="#contact" className="btn btn-ghost">Hire me <i className="bi bi-arrow-up-right" aria-hidden="true" /></a></div>
        <div className="hero-footer-row"><div className="hero-meta" aria-label="Current availability"><span className="hero-meta-item"><span className="hero-meta-dot" />Open to backend roles</span><span className="hero-meta-item"><span className="hero-meta-dot hero-meta-dot-alt" />Remote-friendly</span></div><ShareProfileButton /></div>
      </Reveal>
      <Reveal className="hero-studio-visual"><Spotlight as="aside" className="studio-card" aria-label="Developer profile overview">
        <div className="studio-orb studio-orb-one" aria-hidden="true" /><div className="studio-orb studio-orb-two" aria-hidden="true" />
        <div className="studio-card-head"><span>Selected practice</span><span className="studio-live"><i />Available now</span></div>
        <div className="studio-monogram" aria-hidden="true">SK</div>
        <div className="studio-copy"><p>Product-ready backend systems built for growth and reliability.</p><div className="studio-role"><i className="bi bi-stars" aria-hidden="true" /><span ref={typedTextRef} aria-live="polite" /></div></div>
        <div className="studio-metrics">{metrics.map(([value, suffix, label, decimals]) => <div key={label}><strong><Counter value={value} suffix={suffix} decimals={decimals} /></strong><span>{label}</span></div>)}</div>
        <a className="studio-resume" href="/assets/resume.pdf" download>Download résumé <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </Spotlight></Reveal>
    </div>
    <div className="site-container hero-scroll-cue" aria-hidden="true"><span>Scroll to explore</span><i className="bi bi-arrow-down" /></div>
  </section>;
}
