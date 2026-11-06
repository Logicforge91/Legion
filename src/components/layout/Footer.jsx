import { useEffect, useState } from 'react';
import { usePwaInstall } from '../../hooks/usePwaInstall';
import { navigationItems } from '../../config/navigation';
import { socialLinks } from '../../config/profileLinks';
import { analyticsConfigured, getAnalyticsConsent, setAnalyticsConsent, trackPageView } from '../../utils/analytics';

function AnalyticsPreference() {
  const [enabled, setEnabled] = useState(getAnalyticsConsent);

  useEffect(() => {
    if (!enabled) return undefined;
    trackPageView();
    window.addEventListener('hashchange', trackPageView);
    return () => {
      window.removeEventListener('hashchange', trackPageView);
    };
  }, [enabled]);

  if (!analyticsConfigured) return null;

  const toggleConsent = () => {
    const next = !enabled;
    setAnalyticsConsent(next);
    setEnabled(next);
  };

  return (
    <button className="footer-analytics" type="button" aria-pressed={enabled} onClick={toggleConsent}>
      <i className={`bi ${enabled ? 'bi-toggle-on' : 'bi-toggle-off'}`} aria-hidden="true" />
      Analytics {enabled ? 'on' : 'off'}
    </button>
  );
}

export default function Footer() {
  const { canInstall, install } = usePwaInstall();

  return (
    <footer>
      <div className="site-container footer-outro">
        <span className="footer-outro__index" aria-hidden="true">END / 01</span>
        <div className="footer-outro__copy">
          <span className="footer-outro__eyebrow">
            <i aria-hidden="true" />~/contact <b>$</b> new-backend-brief
          </span>
          <h2>Bring the workflow. Let’s map the backend.</h2>
        </div>
        <div className="footer-outro__actions">
          <a className="footer-outro__action" href="#contact">
            Open contact channel <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
          <button className="footer-outro__print" type="button" onClick={() => window.print()}>
            <i className="bi bi-printer" aria-hidden="true" /> Print portfolio
          </button>
          {canInstall && (
            <button className="footer-outro__install" type="button" onClick={() => { void install(); }}>
              <i className="bi bi-download" aria-hidden="true" /> Install portfolio
            </button>
          )}
        </div>
      </div>

      <div className="site-container footer-main">
        <div className="footer-intro">
          <a href="#hero" className="footer-logo" aria-label="Back to the top">
            Suman K S<span>.</span>
          </a>
          <p className="footer-tagline">
            Senior backend engineering for product teams that need dependable APIs,
            thoughtful data design, and resilient operational systems.
          </p>
          <a className="footer-availability" href="#contact">
            <i aria-hidden="true" />Open to backend opportunities
          </a>
        </div>

        <nav className="footer-nav footer-nav--quick" aria-label="Quick navigation">
          <p>Quick navigation</p>
          <div className="footer-quick-links">
            {navigationItems.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
          </div>
        </nav>
      </div>

      <div className="site-container footer-bottom">
        <div className="footer-bottom__meta">
          <p>&copy; {new Date().getFullYear()} Suman K S. All rights reserved.</p>
          <p>Built in Bengaluru, India</p>
          <AnalyticsPreference />
        </div>
        <nav className="footer-social" aria-label="Social links">
          {socialLinks.map(({ label, href, icon, external }) => (
            <a href={href} key={label} aria-label={label} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <i className={`bi ${icon}`} aria-hidden="true" />
              <span>{label}</span>
              {external && <i className="bi bi-arrow-up-right" aria-hidden="true" />}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
