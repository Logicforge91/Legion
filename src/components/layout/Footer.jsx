import { useEffect, useState } from 'react';
import { usePwaInstall } from '../../hooks/usePwaInstall';
import { navigationItems } from '../../config/navigation';
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
        <div className="footer-outro__copy">
          <span className="footer-outro__eyebrow">
            <i aria-hidden="true" />SOFTWARE FOR WHAT COMES NEXT
          </span>
          <h2>Build for where your business is going.</h2>
        </div>
        <div className="footer-outro__actions">
          <a className="footer-outro__action" href="#contact">
            Open contact channel <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
          <button className="footer-outro__print" type="button" onClick={() => window.print()}>
            <i className="bi bi-printer" aria-hidden="true" /> Print company profile
          </button>
          {canInstall && (
            <button className="footer-outro__install" type="button" onClick={() => { void install(); }}>
              <i className="bi bi-download" aria-hidden="true" /> Install QYVERON
            </button>
          )}
        </div>
      </div>

      <div className="site-container footer-main">
        <div className="footer-intro">
          <a href="#hero" className="footer-logo" aria-label="Back to the top">
            QYVERON<span>.</span>
          </a>
          <p className="footer-tagline">
            Engineering Tomorrow, Today. QYVERON delivers software, API, and data
            solutions for organizations building for what’s next.
          </p>
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
          <p>&copy; {new Date().getFullYear()} QYVERON TECHNOLOGIES. All rights reserved.</p>
          <p>IT &amp; Software Development</p>
          <AnalyticsPreference />
        </div>
        <p className="footer-brand-tagline">Engineering Tomorrow, Today.</p>
      </div>
    </footer>
  );
}
