const CONSENT_KEY = 'legion-analytics-consent';
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';

export const analyticsConfigured = /^G-[A-Z0-9]+$/i.test(measurementId);

export function getAnalyticsConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

function initializeAnalytics() {
  if (!analyticsConfigured || !getAnalyticsConsent() || typeof window === 'undefined') return false;
  if (typeof window.gtag === 'function') return true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.analytics = 'google-analytics';
  document.head.append(script);
  return true;
}

export function setAnalyticsConsent(enabled) {
  if (!analyticsConfigured || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, enabled ? 'granted' : 'denied');
  } catch {
    return;
  }

  if (enabled) initializeAnalytics();
  else window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
}

export function trackPageView() {
  if (!initializeAnalytics()) return;

  window.gtag('event', 'page_view', {
    page_path: `${window.location.pathname}${window.location.hash}`,
    page_title: document.title,
  });
}
