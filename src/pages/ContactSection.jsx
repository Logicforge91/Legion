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

  return (
    <section id="hero" className="hero-section hero-studio-section relative isolate overflow-hidden pb-16 pt-8 md:pt-12" aria-labelledby="heroTitle">
      <div className="site-container hero-statusbar mb-8 rounded-full border border-white/10 bg-slate-900/50 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-slate-300 shadow-[0_10px_30px_rgba(2,6,23,0.25)]" aria-label="Portfolio status">
        <span><i />Available for selected backend roles</span>
        <span>Independent portfolio / {new Date().getFullYear()}</span>
        <span className="hero-statusbar-time">Bengaluru, India</span>
      </div>

      <div className="site-container hero-studio-grid">
        <Reveal className="hero-copy hero-studio-copy">
          <p className="eyebrow"><span />Suman K S / Backend Engineer</p>
          <h1 id="heroTitle" className="max-w-[14ch] text-5xl font-black tracking-[-0.08em] text-white md:text-6xl lg:text-7xl">
            Systems that feel <span className="hero-title-accent text-lime-300">effortless.</span>
          </h1>
          <p className="hero-lede max-w-xl text-base leading-7 text-slate-300 md:text-lg">
            I turn complex business rules into calm, dependable backend experiences—clear APIs, intentional data, resilient integrations, and workflows that stay understandable as products grow.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn btn-primary inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_15px_35px_rgba(214,247,106,0.35)] transition hover:-translate-y-0.5 hover:bg-lime-200">
              View selected work <i className="bi bi-arrow-down-right" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-300/50 hover:bg-sky-400/10">
              Get in touch
            </a>
          </div>
          <div className="hero-footer-row mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="hero-meta flex flex-wrap items-center gap-3 text-sm text-slate-300" aria-label="Current availability">
              <span className="hero-meta-item inline-flex items-center gap-2"><span className="hero-meta-dot" />Open to backend roles</span>
              <span className="hero-meta-item">Remote / hybrid · India</span>
            </div>
            <ShareProfileButton />
          </div>
        </Reveal>

        <Reveal className="hero-studio-visual">
          <Spotlight as="aside" className="studio-card relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/75 p-6 shadow-[0_25px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl" aria-label="Developer profile overview">
            <div className="studio-orb studio-orb-one" aria-hidden="true" />
            <div className="studio-orb studio-orb-two" aria-hidden="true" />
            <div className="studio-card-head flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.14em] text-slate-300">
              <span>Selected practice</span>
              <span className="studio-live inline-flex items-center gap-2"><i />Currently available</span>
            </div>
            <div className="studio-monogram mt-6 text-5xl font-black tracking-[-0.08em] text-white">SK</div>
            <div className="studio-copy mt-5">
              <p className="text-base text-slate-200">Building reliable foundations for workflow-heavy products.</p>
              <div className="studio-role mt-4 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/8 px-3 py-2 text-sm text-lime-200">
                <i className="bi bi-stars" aria-hidden="true" />
                <span ref={typedTextRef} />
              </div>
            </div>
            <div className="studio-metrics mt-6 grid grid-cols-2 gap-4">
              {metrics.map(([value, suffix, label, decimals]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                  <strong className="block text-2xl font-black tracking-[-0.06em] text-white">
                    <Counter value={value} suffix={suffix} decimals={decimals} />
                  </strong>
                  <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.12em] text-slate-400">{label}</span>
                </div>
              ))}
            </div>
            <a className="studio-resume mt-6 inline-flex w-full items-center justify-between rounded-2xl border border-sky-300/20 bg-sky-400/8 px-4 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-300/50 hover:bg-sky-400/12" href="/assets/resume.pdf" download>
              Download résumé <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          </Spotlight>
        </Reveal>
      </div>

      <div className="site-container hero-scroll-cue mt-10 flex items-center justify-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-slate-400" aria-hidden="true">
        <span>Scroll to explore</span>
        <i className="bi bi-arrow-down" />
      </div>
    </section>
  );
}
